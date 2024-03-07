import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from '../services/version'
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')
const momentTimezone = require('moment-timezone');

@Component({
    selector: 'messageAdmin',
    templateUrl: '../views/messageAdmin.html',
    providers: [UsersService, RequestProcesService]
})

export class MessageAdminComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public inProcessTable
    public inProcess
    public inSolution=[]
    public oldInSolution=[]
    public oldInSolutionCallCenter=[]
    public inSolutionCallCenter=[]
    public sortBy = "dateOfReport";
    public load;
    public oldData
    public oldDataTable
    public search= [];
    public dataMessageAdmin =[]
    public oldDataMessageAdmin=[]
    public dataMessageDepto =[]
    public oldDataMessageDepto=[]
    public dataResponseDepto =[]
    public oldDataResponseDepto=[]
    public table
    public statusEx
    public statusExtype
    public link

    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'NOTIFICACIONES PENDIENTES'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.inSolution = []
        this.load = false
        this.link = RUTA.r
    }

    momentTime(date) {
      if (date)
        return moment(date).format('YYYY-MM-DD / HH:mm')
      else
        return ''
    }
    momentTimeDate(date) {
      if (date)
        return moment(date).format('YYYY-MM-DD')
      else
        return ''
    }

    momentTimeHour(date) {
      if (date)
        return moment(date).format('HH:mm')
      else
        return ''
    }

    ngOnInit(){
      this.table = 2
        this.load = true
        if(this.identity.type == 'callCenter' || ( this.identity.history=='si')){
          this.table = 1
          this._requestProcesService.getMessageAdmin(this.identity).subscribe(
            response=>{
                if(response.length>0){

                    response.forEach((element, indice) => {
                      response[indice].dateOfReport1= response[indice].dateOfReport
                      if(response[indice].dateOfReport1){
                        response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport1)
                      }else{
                        response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport)
                      }
      
                      element.dateOfReport=response[indice].dateOfReport
      
                      if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                        response[indice].dateOfReport = element.dateAssignmentCallCenter
                        element.dateOfReport= element.dateAssignmentCallCenter
                      }
      
                      if(element.notes && element.notes.length>0){
                        // los que tienen mensajes en bitacora
                        var ars =0
                        var ffinal = null
                        var ahora = null
                        var momentDia= null
            
                        element.notes.forEach((elementNote, indiceNote) => {
                          if(elementNote.esperaRespuesta && elementNote.esperaRespuesta==true){
                            // los que tienen minimo un "en espera de respuesta" 
            
                            if(elementNote.noteBy.indexOf("Call")>=0){                  
                              ffinal =momentTimezone().tz('America/Monterrey')
                              ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                              momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                              var momentDia2= parseInt(momentDia)
            
                            }else{
                              if(element.notes[indiceNote+1]){
                                // los que tienen mas mensajes
            
                                var start =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                var end=momentTimezone(element.notes[indiceNote+1].dateOfNote).tz('America/Monterrey')
                                var minutos = end.diff(start, 'minutes')
                                ars = ars+ minutos
                              }else{
                                // --- este es el ultimo mensaje urgente
                                    ffinal =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                    ahora = momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('HH')
                                    momentDia= momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('DD')
                                    var momentDia2= parseInt(momentDia)
                              }
                            }
            
                          }else{
                            // ---- cuando tienen mensajes pero el ultimo es el que no urge
                            ffinal =momentTimezone().tz('America/Monterrey')
                            ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                            momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                            var momentDia2= parseInt(momentDia)
                          }
                        })
                      }else{
                        // ---- los que no tienen ningun mensaje
                        var ffinal =momentTimezone().tz('America/Monterrey')
                        var ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                        var ars =0
                        var momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                        var momentDia2= parseInt(momentDia)
                      }
            
                      var fechaFinal = momentTimezone(element.dateOfReport).tz('America/Monterrey').add(ars, 'minutes');
            
                      if(element.dateOfReport1){
                        element.dateOfReport1= momentTimezone(element.dateOfReport1)
                      }else{
                        element.dateOfReport1= momentTimezone(element.dateOfReport)
                      }
              
                      element.dateOfReport= fechaFinal
      
                      if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                        var fechaFinalCall = momentTimezone(element.dateAssignmentCallCenter).tz('America/Monterrey').add(ars, 'minutes');
                        element.dateOfReport = fechaFinalCall
                        element.dateOfReport= fechaFinalCall
                      }
      
                      var totalHorasRestadas=0
                      var totalMinRestadas =0
                      var finicial =momentTimezone(element.dateOfReport).tz('America/Monterrey')
                      var minutos = ffinal.diff(finicial, 'minutes')
                      var arr= (minutos/60).toString().split(".")
      
                  var ar = parseInt(arr[0])
                  var astring =(ar/24).toString()
                  var totalDias = parseInt(astring,10)
              
                  var puraHora= momentTimezone(element.dateOfReport).tz('America/Monterrey').format('HH')
                  var horario1= momentTimezone('2023-04-26T14:00:00.000+00:00').tz('America/Monterrey').format('HH')
                  var horario2= momentTimezone('2023-04-27T01:00:00.000+00:00').tz('America/Monterrey').format('HH')
                  var horario2Sabado= momentTimezone('2023-04-26T19:00:00.000+00:00').tz('America/Monterrey').format('HH')
              
                  var nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').format('YYYY/MM/DD')
                  var nomFinal =momentTimezone(ffinal).tz('America/Monterrey').format('YYYY/MM/DD')
          
                  var arrDias = []
                  var totalHorasRestadasFinSemana=0
                  for (var i = 1; nombreInicio <= nomFinal; i++) {
                      arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                      nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i, 'day').format('YYYY/MM/DD')
                }
      
                arrDias.forEach((elementDia, indiceDia) => {
                  if(elementDia=='Sun'){
                      // cuando es domingo
                      if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                          // cuando el domingo no se aperturó y no es hoy
                          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                      } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                          // cuando el domingo no se aperturó y es hoy domingo
                          if(ahora >= horario1 && ahora<=horario2){
                              totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                          }
                      }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                          // cuando se levanto el domingo pero hoy no es domingo
                          if(puraHora >= horario1 && puraHora<=horario2){
                              totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
                          }else if(puraHora <= horario1){
                              totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                          }
                      }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                          // cuando se levanto el domingo y hoy es domingo
                          if(ahora >= horario1 && ahora<=horario2){
                              totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                          }
                      }
                  }
                  if(elementDia=='Sat'){
                      // cuando es sabado
                      if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                          // cuando el sabado no se aperturó y no es hoy
                          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                      } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                          // cuando el sabado no se aperturó y es hoy sabado
                          if(ahora >= horario1 && ahora<=horario2){
                              if(ahora >=horario2Sabado){
                                  totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                              }
                          }
                      }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                          // cuando se levanto el sabado pero hoy no es sabado
                          if(puraHora >= horario1 && puraHora<=horario2){
                              if(puraHora >=horario2Sabado){
                                  totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((horario2-puraHora)+2)
                              }
                          }else if(puraHora <= horario1){
                              totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                          }
                      }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                          // cuando se levanto el sabado y hoy es sabado
                          if(ahora >= horario1 && ahora<=horario2){
                              if(ahora >=horario2Sabado){
                                  totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                              }
                          }
                      }
                  }
                  })
    
              if(element.issueMore && !element.issueMore.critico){
                element.issueMore.critico=false
              }
      
                  if(totalDias>=1){
                    // todos los que son mayores a dos dias
                    totalDias=totalDias
                    for(var i=0; i<totalDias; i++ ){
                        totalHorasRestadas=totalHorasRestadas+12
                    }
                    if(totalHorasRestadas==12 && ar<48 ){                  
                        if(puraHora>=horario1 && puraHora<=horario2){ // dentro del horario
                            totalHorasTrabajadas= (ar- (6*(ar/12)))
                        }else{
                          if(puraHora<horario1){
                            if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                              totalHorasTrabajadas= (parseInt(ahora) - parseInt(horario1))
                            }else{
                              totalHorasTrabajadas= totalHorasRestadas+ (parseInt(ahora) - parseInt(horario1))                        }
                          }else{
                            if(puraHora>horario2){
                                if(ahora<"08"){
                                    totalHorasTrabajadas= totalHorasRestadas
                                }else{
                                    if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') ==((momentDia) -1)){
                                        totalHorasTrabajadas= totalHorasRestadas
                                    }else{
                                        totalHorasTrabajadas= totalHorasRestadas + (parseInt(ahora) - parseInt(horario1))
                                    }
                                }
                            }
                          }
                          
                        }
        
                    }else{
                      var cosaRara = (((ar/totalHorasRestadas).toFixed(2)).toString()).split(".")
        
                      if(puraHora<horario1){  // todos los que son menores a las 8am
                        totalHorasRestadas= totalHorasRestadas + ((parseInt(horario1)-parseInt(puraHora)))
                      }else{
                        if(puraHora>horario2){  // todos los que son mayores a las 8am
                          var newss= parseFloat(0+"."+cosaRara[1])
                          totalHorasRestadas= (totalHorasRestadas) + (parseInt(ahora)-parseInt(horario1))
                        }
                      }
        
                      if(puraHora>=horario1 && puraHora<=horario2){
                        if(puraHora>ahora){
                          totalHorasRestadas=totalHorasRestadas+ ((parseInt(horario2)-parseInt(puraHora)) +  parseInt(ahora)-parseInt(horario1))
                        }
                      }
                      // totalHorasRestadas=totalHorasRestadas + ((parseInt(horario2) -parseInt(puraHora))) - (parseInt(ahora)-parseInt(horario1))
                    }
                    
                }else{ // aqui entran los que tienen menos de 24 horas
                    if(puraHora>= horario1 && puraHora<=horario2){
                      if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                        if((parseInt(ahora)) >= ((parseInt(horario2))+1)){
                            totalHorasRestadas = (parseInt(ahora)) - ((parseInt(horario2))+1)
                        }
                      }else{
                        if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                            var totalHorasTrabajadas= ((parseInt(horario2) -parseInt(puraHora)))
                        }else{
                            var totalHorasTrabajadas= ((parseInt(ahora)-parseInt(horario1))+ (parseInt(horario2) -parseInt(puraHora)))
                        }
                      }
                      // son los que se subieron dentro de las hoeas
                    }else{
                        // fuera de hora
            
                        if(puraHora <horario1){
                            totalHorasRestadas= parseInt(horario1)-parseInt(puraHora)
                        }else{
                            if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                                totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T04:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-(parseInt(momentTimezone('2023-04-26T06:00:00.000+00:00').tz('America/Monterrey').format('HH')))))
                                totalHorasRestadas= totalHorasRestadas+8
                            }else{
                                totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T05:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-1))
                                totalHorasRestadas= totalHorasRestadas+8
                            }
                        }
            
                    }
                }
      
                  if(totalHorasTrabajadas){
                    totalMinRestadas= totalHorasTrabajadas*60
                    var newMinutos= totalMinRestadas
                  }else{
                    totalMinRestadas= totalHorasRestadas*60
                    var newMinutos= minutos-totalMinRestadas
                  }
                if(totalHorasRestadasFinSemana > 0){
                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana*60
                    newMinutos = newMinutos-totalHorasRestadasFinSemana
                }
              
                  var arr= (newMinutos/60).toString().split(".")
                  var ar = parseInt(arr[0])
                  var astring =(ar/24).toString()
                  var totalDias = parseInt(astring,10)
      
      
                      var sums= 0
      
                      for (var i = 0; i < parseInt(arr[0]); i++) {
                          var sums=sums+ 60
                      };
      
                      if(element.issue.sla && (element.status=='Nuevo' || element.status=='Pendiente' || element.status=='Asignado' || element.status=='Solucionado')){
                        var menos = element.issue.sla-parseInt(arr[0])
                          if(menos<0){
                            element.pasado = "red"
                          }else{
                            element.pasado = "green"
                          }
                        
                        if(menos > element.issue.sla){
                          element.restantes = element.issue.sla + " h"
                        }else{
                          element.restantes =menos + " h"
                        }
                        
                      }else{
                        if(element.issue.slaCallCenter){
                          var menos = element.issue.slaCallCenter-parseInt(arr[0])
                            if(menos<0){
                              element.pasadoCallCenter = "red"
                              element.pasado = "red"
                            }else{
                              element.pasadoCallCenter = "green"
                              element.pasado = "green"
                            }
                          
                          if(menos > element.issue.slaCallCenter){
                            element.restantes = element.issue.slaCallCenter + " h"
                          }else{
                            element.restantes =menos + " h"
                          }
      
                        }
                      }
      
                      if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                        response[indice].dateOfReport = element.dateAssignmentCallCenter
                        
                        var menos = element.issue.sla-parseInt(arr[0])
      
                        if(menos > element.issue.sla){
                          response[indice].restantes = element.issue.sla + " h"
                        }else{
                          response[indice].restantes =menos + " h"
                        }
      
                      }
      
      
                      if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                      if(element.analyst){
                        element.analyst.fnames = element.analyst.fname + element.analyst.lname
                      }
                      if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[0]){
                        element.analist1 = element.issue.emailToSendAnalist[0].fname+ " "+ element.issue.emailToSendAnalist[0].lname
                      } 
                      if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[1]){
                        element.analist2 = element.issue.emailToSendAnalist[1].fname+ " "+ element.issue.emailToSendAnalist[1].lname
                      } 
                      if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[2]){
                        element.analist3 = element.issue.emailToSendAnalist[2].fname+ " "+ element.issue.emailToSendAnalist[2].lname
                      } 
                      if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[3]){
                        element.analist4 = element.issue.emailToSendAnalist[3].fname+ " "+ element.issue.emailToSendAnalist[3].lname
                      } 
      
                      if(element.encuesta ==""){
                        element.encuesta="No"
                    }else{
                      if(!element.encuesta){
                        element.encuesta=''
                      }
                    }
      
                    setTimeout(() => {
                      this.dataMessageAdmin.push(element)
                    this.oldDataMessageAdmin.push(element)
      
                    }, 2000)
                    });
      
                    this.load = false


                }else{
                    this.load = false
                      this.dataMessageAdmin=[]
                }
            }, error=>{
                var errorMessage = <any>error;
                this.load = false
                if(errorMessage != null){
                  // var body = JSON.parse(error._body)
                  // swal("Error!", "errrrrrr", "error");
                }
              }
            )
    }
    if(this.identity.type != 'callCenter' ){

            this._requestProcesService.getMessageDepto(this.identity).subscribe(
              response=>{
                  if(response.length>0){
  
                      response.forEach((element, indice) => {
                        response[indice].dateOfReport1= response[indice].dateOfReport
                        if(response[indice].dateOfReport1){
                          response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport1)
                        }else{
                          response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport)
                        }
        
                        element.dateOfReport=response[indice].dateOfReport
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          response[indice].dateOfReport = element.dateAssignmentCallCenter
                          element.dateOfReport= element.dateAssignmentCallCenter
                        }
        
                        if(element.notes && element.notes.length>0){
                          // los que tienen mensajes en bitacora
                          var ars =0
                          var ffinal = null
                          var ahora = null
                          var momentDia= null
              
                          element.notes.forEach((elementNote, indiceNote) => {
                            if(elementNote.esperaRespuesta && elementNote.esperaRespuesta==true){
                              // los que tienen minimo un "en espera de respuesta" 
              
                              if(elementNote.noteBy.indexOf("Call")>=0){                  
                                ffinal =momentTimezone().tz('America/Monterrey')
                                ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                                momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                                var momentDia2= parseInt(momentDia)
              
                              }else{
                                if(element.notes[indiceNote+1]){
                                  // los que tienen mas mensajes
              
                                  var start =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                  var end=momentTimezone(element.notes[indiceNote+1].dateOfNote).tz('America/Monterrey')
                                  var minutos = end.diff(start, 'minutes')
                                  ars = ars+ minutos
                                }else{
                                  // --- este es el ultimo mensaje urgente
                                      ffinal =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                      ahora = momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('HH')
                                      momentDia= momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('DD')
                                      var momentDia2= parseInt(momentDia)
                                }
                              }
              
                            }else{
                              // ---- cuando tienen mensajes pero el ultimo es el que no urge
                              ffinal =momentTimezone().tz('America/Monterrey')
                              ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                              momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                              var momentDia2= parseInt(momentDia)
                            }
                          })
                        }else{
                          // ---- los que no tienen ningun mensaje
                          var ffinal =momentTimezone().tz('America/Monterrey')
                          var ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                          var ars =0
                          var momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                          var momentDia2= parseInt(momentDia)
                        }
              
                        var fechaFinal = momentTimezone(element.dateOfReport).tz('America/Monterrey').add(ars, 'minutes');
              
                        if(element.dateOfReport1){
                          element.dateOfReport1= momentTimezone(element.dateOfReport1)
                        }else{
                          element.dateOfReport1= momentTimezone(element.dateOfReport)
                        }
                
                        element.dateOfReport= fechaFinal
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          var fechaFinalCall = momentTimezone(element.dateAssignmentCallCenter).tz('America/Monterrey').add(ars, 'minutes');
                          element.dateOfReport = fechaFinalCall
                          element.dateOfReport= fechaFinalCall
                        }
        
                        var totalHorasRestadas=0
                        var totalMinRestadas =0
                        var finicial =momentTimezone(element.dateOfReport).tz('America/Monterrey')
                        var minutos = ffinal.diff(finicial, 'minutes')
                        var arr= (minutos/60).toString().split(".")
        
                    var ar = parseInt(arr[0])
                    var astring =(ar/24).toString()
                    var totalDias = parseInt(astring,10)
                
                    var puraHora= momentTimezone(element.dateOfReport).tz('America/Monterrey').format('HH')
                    var horario1= momentTimezone('2023-04-26T14:00:00.000+00:00').tz('America/Monterrey').format('HH')
                    var horario2= momentTimezone('2023-04-27T01:00:00.000+00:00').tz('America/Monterrey').format('HH')
                    var horario2Sabado= momentTimezone('2023-04-26T19:00:00.000+00:00').tz('America/Monterrey').format('HH')
                
                    var nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').format('YYYY/MM/DD')
                    var nomFinal =momentTimezone(ffinal).tz('America/Monterrey').format('YYYY/MM/DD')
            
                    var arrDias = []
                    var totalHorasRestadasFinSemana=0
                    for (var i = 1; nombreInicio <= nomFinal; i++) {
                        arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                        nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i, 'day').format('YYYY/MM/DD')
                  }
        
                  arrDias.forEach((elementDia, indiceDia) => {
                    if(elementDia=='Sun'){
                        // cuando es domingo
                        if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                            // cuando el domingo no se aperturó y no es hoy
                            totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                        } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                            // cuando el domingo no se aperturó y es hoy domingo
                            if(ahora >= horario1 && ahora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                            }
                        }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                            // cuando se levanto el domingo pero hoy no es domingo
                            if(puraHora >= horario1 && puraHora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
                            }else if(puraHora <= horario1){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                            }
                        }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                            // cuando se levanto el domingo y hoy es domingo
                            if(ahora >= horario1 && ahora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                            }
                        }
                    }
                    if(elementDia=='Sat'){
                        // cuando es sabado
                        if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                            // cuando el sabado no se aperturó y no es hoy
                            totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                        } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                            // cuando el sabado no se aperturó y es hoy sabado
                            if(ahora >= horario1 && ahora<=horario2){
                                if(ahora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                                }
                            }
                        }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                            // cuando se levanto el sabado pero hoy no es sabado
                            if(puraHora >= horario1 && puraHora<=horario2){
                                if(puraHora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((horario2-puraHora)+2)
                                }
                            }else if(puraHora <= horario1){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                            }
                        }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                            // cuando se levanto el sabado y hoy es sabado
                            if(ahora >= horario1 && ahora<=horario2){
                                if(ahora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                                }
                            }
                        }
                    }
                    })
        
                    if(element.issueMore && !element.issueMore.critico){
                      element.issueMore.critico=false
                    }

                    if(totalDias>=1){
                      // todos los que son mayores a dos dias
                      totalDias=totalDias
                      for(var i=0; i<totalDias; i++ ){
                          totalHorasRestadas=totalHorasRestadas+12
                      }
                      if(totalHorasRestadas==12 && ar<48 ){                  
                          if(puraHora>=horario1 && puraHora<=horario2){ // dentro del horario
                              totalHorasTrabajadas= (ar- (6*(ar/12)))
                          }else{
                            if(puraHora<horario1){
                              if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                                totalHorasTrabajadas= (parseInt(ahora) - parseInt(horario1))
                              }else{
                                totalHorasTrabajadas= totalHorasRestadas+ (parseInt(ahora) - parseInt(horario1))                        }
                            }else{
                              if(puraHora>horario2){
                                  if(ahora<"08"){
                                      totalHorasTrabajadas= totalHorasRestadas
                                  }else{
                                      if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') ==((momentDia) -1)){
                                          totalHorasTrabajadas= totalHorasRestadas
                                      }else{
                                          totalHorasTrabajadas= totalHorasRestadas + (parseInt(ahora) - parseInt(horario1))
                                      }
                                  }
                              }
                            }
                            
                          }
          
                      }else{
                        var cosaRara = (((ar/totalHorasRestadas).toFixed(2)).toString()).split(".")
          
                        if(puraHora<horario1){  // todos los que son menores a las 8am
                          totalHorasRestadas= totalHorasRestadas + ((parseInt(horario1)-parseInt(puraHora)))
                        }else{
                          if(puraHora>horario2){  // todos los que son mayores a las 8am
                            var newss= parseFloat(0+"."+cosaRara[1])
                            totalHorasRestadas= (totalHorasRestadas) + (parseInt(ahora)-parseInt(horario1))
                          }
                        }
          
                        if(puraHora>=horario1 && puraHora<=horario2){
                          if(puraHora>ahora){
                            totalHorasRestadas=totalHorasRestadas+ ((parseInt(horario2)-parseInt(puraHora)) +  parseInt(ahora)-parseInt(horario1))
                          }
                        }
                        // totalHorasRestadas=totalHorasRestadas + ((parseInt(horario2) -parseInt(puraHora))) - (parseInt(ahora)-parseInt(horario1))
                      }
                      
                  }else{ // aqui entran los que tienen menos de 24 horas
                      if(puraHora>= horario1 && puraHora<=horario2){
                        if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                          if((parseInt(ahora)) >= ((parseInt(horario2))+1)){
                              totalHorasRestadas = (parseInt(ahora)) - ((parseInt(horario2))+1)
                          }
                        }else{
                          if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                              var totalHorasTrabajadas= ((parseInt(horario2) -parseInt(puraHora)))
                          }else{
                              var totalHorasTrabajadas= ((parseInt(ahora)-parseInt(horario1))+ (parseInt(horario2) -parseInt(puraHora)))
                          }
                        }
                        // son los que se subieron dentro de las hoeas
                      }else{
                          // fuera de hora
              
                          if(puraHora <horario1){
                              totalHorasRestadas= parseInt(horario1)-parseInt(puraHora)
                          }else{
                              if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                                  totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T04:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-(parseInt(momentTimezone('2023-04-26T06:00:00.000+00:00').tz('America/Monterrey').format('HH')))))
                                  totalHorasRestadas= totalHorasRestadas+8
                              }else{
                                  totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T05:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-1))
                                  totalHorasRestadas= totalHorasRestadas+8
                              }
                          }
              
                      }
                  }
        
                    if(totalHorasTrabajadas){
                      totalMinRestadas= totalHorasTrabajadas*60
                      var newMinutos= totalMinRestadas
                    }else{
                      totalMinRestadas= totalHorasRestadas*60
                      var newMinutos= minutos-totalMinRestadas
                    }
                  if(totalHorasRestadasFinSemana > 0){
                      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana*60
                      newMinutos = newMinutos-totalHorasRestadasFinSemana
                  }
                
                    var arr= (newMinutos/60).toString().split(".")
                    var ar = parseInt(arr[0])
                    var astring =(ar/24).toString()
                    var totalDias = parseInt(astring,10)
        
        
                        var sums= 0
        
                        for (var i = 0; i < parseInt(arr[0]); i++) {
                            var sums=sums+ 60
                        };
        
                        if(element.issue.sla && (element.status=='Nuevo' || element.status=='Pendiente' || element.status=='Asignado' || element.status=='Solucionado')){
                          var menos = element.issue.sla-parseInt(arr[0])
                            if(menos<0){
                              element.pasado = "red"
                            }else{
                              element.pasado = "green"
                            }
                          
                          if(menos > element.issue.sla){
                            element.restantes = element.issue.sla + " h"
                          }else{
                            element.restantes =menos + " h"
                          }
                          
                        }else{
                          if(element.issue.slaCallCenter){
                            var menos = element.issue.slaCallCenter-parseInt(arr[0])
                              if(menos<0){
                                element.pasadoCallCenter = "red"
                                element.pasado = "red"
                              }else{
                                element.pasadoCallCenter = "green"
                                element.pasado = "green"
                              }
                            
                            if(menos > element.issue.slaCallCenter){
                              element.restantes = element.issue.slaCallCenter + " h"
                            }else{
                              element.restantes =menos + " h"
                            }
        
                          }
                        }
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          response[indice].dateOfReport = element.dateAssignmentCallCenter
                          
                          var menos = element.issue.sla-parseInt(arr[0])
        
                          if(menos > element.issue.sla){
                            response[indice].restantes = element.issue.sla + " h"
                          }else{
                            response[indice].restantes =menos + " h"
                          }
        
                        }
        
        
                        if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                        if(element.analyst){
                          element.analyst.fnames = element.analyst.fname + element.analyst.lname
                        }
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[0]){
                          element.analist1 = element.issue.emailToSendAnalist[0].fname+ " "+ element.issue.emailToSendAnalist[0].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[1]){
                          element.analist2 = element.issue.emailToSendAnalist[1].fname+ " "+ element.issue.emailToSendAnalist[1].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[2]){
                          element.analist3 = element.issue.emailToSendAnalist[2].fname+ " "+ element.issue.emailToSendAnalist[2].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[3]){
                          element.analist4 = element.issue.emailToSendAnalist[3].fname+ " "+ element.issue.emailToSendAnalist[3].lname
                        } 
        
                        if(element.encuesta ==""){
                          element.encuesta="No"
                      }else{
                        if(!element.encuesta){
                          element.encuesta=''
                        }
                      }
        
                      setTimeout(() => {
                        this.dataMessageDepto.push(element)
                      this.oldDataMessageDepto.push(element)
        
                      }, 2000)
                      });
        
                      this.load = false
  
  
                  }else{
                      this.load = false
                      this.dataMessageAdmin=[]
                  }
              }, error=>{
                  var errorMessage = <any>error;
                  this.load = false
                  if(errorMessage != null){
                    // var body = JSON.parse(error._body)
                    // swal("Error!", "errrrrrr", "error");
                  }
                }
              )

              this._requestProcesService.getResponseDepto(this.identity).subscribe(
                response=>{

                  if(response.length>0){
  
                      response.forEach((element, indice) => {
                        response[indice].dateOfReport1= response[indice].dateOfReport
                        if(response[indice].dateOfReport1){
                          response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport1)
                        }else{
                          response[indice].dateOfReport1= momentTimezone(response[indice].dateOfReport)
                        }
        
                        element.dateOfReport=response[indice].dateOfReport
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          response[indice].dateOfReport = element.dateAssignmentCallCenter
                          element.dateOfReport= element.dateAssignmentCallCenter
                        }
        
                        if(element.notes && element.notes.length>0){
                          // los que tienen mensajes en bitacora
                          var ars =0
                          var ffinal = null
                          var ahora = null
                          var momentDia= null
              
                          element.notes.forEach((elementNote, indiceNote) => {
                            if(elementNote.esperaRespuesta && elementNote.esperaRespuesta==true){
                              // los que tienen minimo un "en espera de respuesta" 
              
                              if(elementNote.noteBy.indexOf("Call")>=0){                  
                                ffinal =momentTimezone().tz('America/Monterrey')
                                ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                                momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                                var momentDia2= parseInt(momentDia)
              
                              }else{
                                if(element.notes[indiceNote+1]){
                                  // los que tienen mas mensajes
              
                                  var start =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                  var end=momentTimezone(element.notes[indiceNote+1].dateOfNote).tz('America/Monterrey')
                                  var minutos = end.diff(start, 'minutes')
                                  ars = ars+ minutos
                                }else{
                                  // --- este es el ultimo mensaje urgente
                                      ffinal =momentTimezone(elementNote.dateOfNote).tz('America/Monterrey')
                                      ahora = momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('HH')
                                      momentDia= momentTimezone(elementNote.dateOfNote).tz('America/Monterrey').format('DD')
                                      var momentDia2= parseInt(momentDia)
                                }
                              }
              
                            }else{
                              // ---- cuando tienen mensajes pero el ultimo es el que no urge
                              ffinal =momentTimezone().tz('America/Monterrey')
                              ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                              momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                              var momentDia2= parseInt(momentDia)
                            }
                          })
                        }else{
                          // ---- los que no tienen ningun mensaje
                          var ffinal =momentTimezone().tz('America/Monterrey')
                          var ahora = momentTimezone(new Date()).tz('America/Monterrey').format('HH')
                          var ars =0
                          var momentDia= momentTimezone().tz('America/Monterrey').format('DD')
                          var momentDia2= parseInt(momentDia)
                        }
              
                        var fechaFinal = momentTimezone(element.dateOfReport).tz('America/Monterrey').add(ars, 'minutes');
              
                        if(element.dateOfReport1){
                          element.dateOfReport1= momentTimezone(element.dateOfReport1)
                        }else{
                          element.dateOfReport1= momentTimezone(element.dateOfReport)
                        }
                
                        element.dateOfReport= fechaFinal
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          var fechaFinalCall = momentTimezone(element.dateAssignmentCallCenter).tz('America/Monterrey').add(ars, 'minutes');
                          element.dateOfReport = fechaFinalCall
                          element.dateOfReport= fechaFinalCall
                        }
        
                        var totalHorasRestadas=0
                        var totalMinRestadas =0
                        var finicial =momentTimezone(element.dateOfReport).tz('America/Monterrey')
                        var minutos = ffinal.diff(finicial, 'minutes')
                        var arr= (minutos/60).toString().split(".")
        
                    var ar = parseInt(arr[0])
                    var astring =(ar/24).toString()
                    var totalDias = parseInt(astring,10)
                
                    var puraHora= momentTimezone(element.dateOfReport).tz('America/Monterrey').format('HH')
                    var horario1= momentTimezone('2023-04-26T14:00:00.000+00:00').tz('America/Monterrey').format('HH')
                    var horario2= momentTimezone('2023-04-27T01:00:00.000+00:00').tz('America/Monterrey').format('HH')
                    var horario2Sabado= momentTimezone('2023-04-26T19:00:00.000+00:00').tz('America/Monterrey').format('HH')
                
                    var nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').format('YYYY/MM/DD')
                    var nomFinal =momentTimezone(ffinal).tz('America/Monterrey').format('YYYY/MM/DD')
            
                    var arrDias = []
                    var totalHorasRestadasFinSemana=0
                    for (var i = 1; nombreInicio <= nomFinal; i++) {
                        arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                        nombreInicio =momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i, 'day').format('YYYY/MM/DD')
                  }
        
                  arrDias.forEach((elementDia, indiceDia) => {
                    if(elementDia=='Sun'){
                        // cuando es domingo
                        if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                            // cuando el domingo no se aperturó y no es hoy
                            totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                        } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                            // cuando el domingo no se aperturó y es hoy domingo
                            if(ahora >= horario1 && ahora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                            }
                        }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                            // cuando se levanto el domingo pero hoy no es domingo
                            if(puraHora >= horario1 && puraHora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
                            }else if(puraHora <= horario1){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
                            }
                        }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                            // cuando se levanto el domingo y hoy es domingo
                            if(ahora >= horario1 && ahora<=horario2){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
                            }
                        }
                    }
                    if(elementDia=='Sat'){
                        // cuando es sabado
                        if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
                            // cuando el sabado no se aperturó y no es hoy
                            totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                        } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
                            // cuando el sabado no se aperturó y es hoy sabado
                            if(ahora >= horario1 && ahora<=horario2){
                                if(ahora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                                }
                            }
                        }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
                            // cuando se levanto el sabado pero hoy no es sabado
                            if(puraHora >= horario1 && puraHora<=horario2){
                                if(puraHora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((horario2-puraHora)+2)
                                }
                            }else if(puraHora <= horario1){
                                totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 6
                            }
                        }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
                            // cuando se levanto el sabado y hoy es sabado
                            if(ahora >= horario1 && ahora<=horario2){
                                if(ahora >=horario2Sabado){
                                    totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ ((ahora-horario2Sabado)-1)
                                }
                            }
                        }
                    }
                    })
        
                    if(element.issueMore && !element.issueMore.critico){
                      element.issueMore.critico=false
                    }
        
                    if(totalDias>=1){
                      // todos los que son mayores a dos dias
                      totalDias=totalDias
                      for(var i=0; i<totalDias; i++ ){
                          totalHorasRestadas=totalHorasRestadas+12
                      }
                      if(totalHorasRestadas==12 && ar<48 ){                  
                          if(puraHora>=horario1 && puraHora<=horario2){ // dentro del horario
                              totalHorasTrabajadas= (ar- (6*(ar/12)))
                          }else{
                            if(puraHora<horario1){
                              if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                                totalHorasTrabajadas= (parseInt(ahora) - parseInt(horario1))
                              }else{
                                totalHorasTrabajadas= totalHorasRestadas+ (parseInt(ahora) - parseInt(horario1))                        }
                            }else{
                              if(puraHora>horario2){
                                  if(ahora<"08"){
                                      totalHorasTrabajadas= totalHorasRestadas
                                  }else{
                                      if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') ==((momentDia) -1)){
                                          totalHorasTrabajadas= totalHorasRestadas
                                      }else{
                                          totalHorasTrabajadas= totalHorasRestadas + (parseInt(ahora) - parseInt(horario1))
                                      }
                                  }
                              }
                            }
                            
                          }
          
                      }else{
                        var cosaRara = (((ar/totalHorasRestadas).toFixed(2)).toString()).split(".")
          
                        if(puraHora<horario1){  // todos los que son menores a las 8am
                          totalHorasRestadas= totalHorasRestadas + ((parseInt(horario1)-parseInt(puraHora)))
                        }else{
                          if(puraHora>horario2){  // todos los que son mayores a las 8am
                            var newss= parseFloat(0+"."+cosaRara[1])
                            totalHorasRestadas= (totalHorasRestadas) + (parseInt(ahora)-parseInt(horario1))
                          }
                        }
          
                        if(puraHora>=horario1 && puraHora<=horario2){
                          if(puraHora>ahora){
                            totalHorasRestadas=totalHorasRestadas+ ((parseInt(horario2)-parseInt(puraHora)) +  parseInt(ahora)-parseInt(horario1))
                          }
                        }
                        // totalHorasRestadas=totalHorasRestadas + ((parseInt(horario2) -parseInt(puraHora))) - (parseInt(ahora)-parseInt(horario1))
                      }
                      
                  }else{ // aqui entran los que tienen menos de 24 horas
                      if(puraHora>= horario1 && puraHora<=horario2){
                        if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                          if((parseInt(ahora)) >= ((parseInt(horario2))+1)){
                              totalHorasRestadas = (parseInt(ahora)) - ((parseInt(horario2))+1)
                          }
                        }else{
                          if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                              var totalHorasTrabajadas= ((parseInt(horario2) -parseInt(puraHora)))
                          }else{
                              var totalHorasTrabajadas= ((parseInt(ahora)-parseInt(horario1))+ (parseInt(horario2) -parseInt(puraHora)))
                          }
                        }
                        // son los que se subieron dentro de las hoeas
                      }else{
                          // fuera de hora
              
                          if(puraHora <horario1){
                              totalHorasRestadas= parseInt(horario1)-parseInt(puraHora)
                          }else{
                              if(momentTimezone(element.dateOfReport).tz('America/Monterrey').format('DD') == momentDia){
                                  totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T04:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-(parseInt(momentTimezone('2023-04-26T06:00:00.000+00:00').tz('America/Monterrey').format('HH')))))
                                  totalHorasRestadas= totalHorasRestadas+8
                              }else{
                                  totalHorasRestadas = ((parseInt(momentTimezone('2023-04-26T05:00:00.000+00:00').tz('America/Monterrey').format('HH')))-(parseInt(puraHora)-1))
                                  totalHorasRestadas= totalHorasRestadas+8
                              }
                          }
              
                      }
                  }
        
                    if(totalHorasTrabajadas){
                      totalMinRestadas= totalHorasTrabajadas*60
                      var newMinutos= totalMinRestadas
                    }else{
                      totalMinRestadas= totalHorasRestadas*60
                      var newMinutos= minutos-totalMinRestadas
                    }
                  if(totalHorasRestadasFinSemana > 0){
                      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana*60
                      newMinutos = newMinutos-totalHorasRestadasFinSemana
                  }
                
                    var arr= (newMinutos/60).toString().split(".")
                    var ar = parseInt(arr[0])
                    var astring =(ar/24).toString()
                    var totalDias = parseInt(astring,10)
        
        
                        var sums= 0
        
                        for (var i = 0; i < parseInt(arr[0]); i++) {
                            var sums=sums+ 60
                        };
        
                        if(element.issue.sla && (element.status=='Nuevo' || element.status=='Pendiente' || element.status=='Asignado' || element.status=='Solucionado')){
                          var menos = element.issue.sla-parseInt(arr[0])
                            if(menos<0){
                              element.pasado = "red"
                            }else{
                              element.pasado = "green"
                            }
                          
                          if(menos > element.issue.sla){
                            element.restantes = element.issue.sla + " h"
                          }else{
                            element.restantes =menos + " h"
                          }
                          
                        }else{
                          if(element.issue.slaCallCenter){
                            var menos = element.issue.slaCallCenter-parseInt(arr[0])
                              if(menos<0){
                                element.pasadoCallCenter = "red"
                                element.pasado = "red"
                              }else{
                                element.pasadoCallCenter = "green"
                                element.pasado = "green"
                              }
                            
                            if(menos > element.issue.slaCallCenter){
                              element.restantes = element.issue.slaCallCenter + " h"
                            }else{
                              element.restantes =menos + " h"
                            }
        
                          }
                        }
        
                        if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                          response[indice].dateOfReport = element.dateAssignmentCallCenter
                          
                          var menos = element.issue.sla-parseInt(arr[0])
        
                          if(menos > element.issue.sla){
                            response[indice].restantes = element.issue.sla + " h"
                          }else{
                            response[indice].restantes =menos + " h"
                          }
        
                        }
        
        
                        if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                        if(element.analyst){
                          element.analyst.fnames = element.analyst.fname + element.analyst.lname
                        }
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[0]){
                          element.analist1 = element.issue.emailToSendAnalist[0].fname+ " "+ element.issue.emailToSendAnalist[0].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[1]){
                          element.analist2 = element.issue.emailToSendAnalist[1].fname+ " "+ element.issue.emailToSendAnalist[1].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[2]){
                          element.analist3 = element.issue.emailToSendAnalist[2].fname+ " "+ element.issue.emailToSendAnalist[2].lname
                        } 
                        if(element.issue.emailToSendAnalist &&  element.issue.emailToSendAnalist[3]){
                          element.analist4 = element.issue.emailToSendAnalist[3].fname+ " "+ element.issue.emailToSendAnalist[3].lname
                        } 
        
                        if(element.encuesta ==""){
                          element.encuesta="No"
                      }else{
                        if(!element.encuesta){
                          element.encuesta=''
                        }
                      }
        
                      setTimeout(() => {
                        this.dataResponseDepto.push(element)
                      this.oldDataResponseDepto.push(element)
        
                      }, 2000)
                      });
        
                      this.load = false
  
  
                  }else{
                      this.load = false
                      this.dataMessageAdmin=[]
                  }

                }, error=>{
                    var errorMessage = <any>error;
                    this.load = false
                    if(errorMessage != null){
                      // var body = JSON.parse(error._body)
                      // swal("Error!", "errrrrrr", "error");
                    }
                  }
                )


    }






        }

          goToSearch(toSearch){
            this.inSolution= []
            this.oldData = []

            this.inProcess= []
            if(toSearch){
              var go =toSearch.toUpperCase()
              var go2 = go.trim()
      
              this._requestProcesService.getOnlyOne({ruta: go2}).subscribe(
                response=>{
                  if(response[0]){
                    this.inProcess = []
                  for (var i = 0; i < response.length; i++) {
                    if(response[i].status=="Solucionado"){
                      this.inSolution.push(response[i])
                      this.oldData.push(response[i])
                    }else{
                      this.inProcess.push(response[i])
                    }
                };
                if(response[0].status=="Solucionado"){
                  this.inProcessTable = response
                  this.oldDataTable = response
                  response.forEach((element, indice) => {
      
                    var finicial =moment(element.dateOfReport)
                    var ffinal =moment()
                    var minutos = ffinal.diff(finicial, 'minutes')
      
                    var arr= (minutos/60).toString().split(".")
                    var sums= 0
      
                    for (var i = 0; i < parseInt(arr[0]); i++) {
                        var sums=sums+ 60
                    };
      
                    response[indice].tiempos = arr[0] + ' h ' + (minutos-sums).toString() + ' m'
      
                    if(element.issue.sla){
                      var menos = element.issue.sla-parseInt(arr[0])
                      response[indice].restantes =menos + " h"
                    }
      
                    if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                  });
                }else{
                  swal("Error!","El Timcket no se ha cerrado" , "error");
                }
                }else{
                  swal("Error!","No se encontraron datos" , "error");
      
                }
      
                })
      
      
            } else{
              this._requestProcesService.allSolucionados(this.identity).subscribe(
                response=>{
                  this.inSolution = response
                  this.oldData = response                  
                  this.inProcessTable = response
                  this.oldDataTable = response
                  response.forEach(element => {
                    if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                  });
                }, error=>{
                  var errorMessage = <any>error;
                  if(errorMessage != null){
                    // var body = JSON.parse(error._body)
                    swal("Error!", "errrrrrr", "error");
                  }
                }
              )        
            }
      
          }


    searchFolio(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldInSolution.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchNumSerieCall(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldInSolution.forEach(element => {
          if(element.numSerie ){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolution
      }
    }
    searchNumSerie(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldInSolution.forEach(element => {
          if(element.numSerie ){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchFolioCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldInSolutionCallCenter.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchSubcategoria(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchSubcategoriaCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchServicio(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchServicioCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchArea(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchReportByarea(toSearch){
      var newData = []
      if(toSearch!=""){
        toSearch =parseInt(toSearch)
        this.oldInSolution.forEach(element => {
          if(element && element.reportBy && element.reportBy.area && element.reportBy.area.name){
            element.issueeee= element.reportBy.area.name
            if(element.issueeee== toSearch){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchAreaCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchEstatus(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchEstatusCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          element.status2= element.statusCallCenter.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchEncuestaComents(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          if(element.encuestaComents){
            element.encuestaComents2= element.encuestaComents.toUpperCase()
            if(element.encuestaComents2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolution = newData
        this.inProcessTable = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchEncuestaComentsCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          if(element.encuestaComents){
            element.encuestaComents2= element.encuestaComents.toUpperCase()
            if(element.encuestaComents2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }


    searchReportBy(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchReportByCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchAnalista(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchstatusExtra(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          if(element.statusExtra){
            element.statusExtra2= element.statusExtra.toUpperCase()
            if(element.statusExtra2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchAnalistaCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchVencido(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          if(element.pasado=="red"){
            var pasado="Si"
          }else{
            var pasado="No"
          }
          var pasado2= pasado.toUpperCase()

            if(pasado2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchVencidoCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          if(element.pasado=="red"){
            var pasado="Si"
          }else{
            var pasado="No"
          }
          var pasado2= pasado.toUpperCase()

            if(pasado2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    searchEncuesta(toSearch){
      var newData = []
      if(toSearch!=""){
        this.oldInSolution.forEach(element => {
          var toSearch2= element.encuesta.toUpperCase()
            if(toSearch2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inSolution = newData
      }else{
        this.inSolution = this.oldInSolution
      }
    }

    searchEncuestaCallCenter(toSearch){
      var newData = []
      if(toSearch!=""){
        this.oldInSolutionCallCenter.forEach(element => {
          var toSearch2= element.encuesta.toUpperCase()
            if(toSearch2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inSolutionCallCenter = newData
      }else{
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
      }
    }

    exportFunction(inSolution){
      this.load = true
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';

      if(this.table==1){
        var data =[]
        var name = 'bitacoraTimcketsGeneral'
      inSolution.forEach((element,index) => {
        data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'slaCC': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'Restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status : (element.statusCallCenter)?element.statusCallCenter :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'Fecha Escalada': (element.dateAssignmentCallCenter)? this.momentTime(element.dateAssignmentCallCenter):'', 'Fecha Asignada': (element.dateAssignment)? this.momentTime(element.dateAssignment):'', 'Fecha Pendiente': (element.datePendieng)? this.momentTime(element.datePendieng):'', 'Motivo Escalado': (element.motivoAsignadoCallCenter)?element.motivoAsignadoCallCenter: '', 'Motivo Pendiente': (element.pending)?element.pending:'', 'vencido':((element.pasado && element.pasado=='red')?'Si':'') })
      });

      }else if(this.table==2){
        var data =[]
        var name = 'bitacoraTimckets'
      inSolution.forEach((element,index) => {
        data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'slaCC': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'Restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status : (element.statusCallCenter)?element.statusCallCenter :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'Fecha Escalada': (element.dateAssignmentCallCenter)? this.momentTime(element.dateAssignmentCallCenter):'', 'Fecha Asignada': (element.dateAssignment)? this.momentTime(element.dateAssignment):'', 'Fecha Pendiente': (element.datePendieng)? this.momentTime(element.datePendieng):'', 'Motivo Escalado': (element.motivoAsignadoCallCenter)?element.motivoAsignadoCallCenter: '', 'Motivo Pendiente': (element.pending)?element.pending:'', 'vencido':((element.pasado && element.pasado=='red')?'Si':'') })
      });

      }else if(this.table==3){
        var data =[]
        var name = 'RespuestasTimckets'
      inSolution.forEach((element,index) => {
        data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'slaCC': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'Restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status : (element.statusCallCenter)?element.statusCallCenter :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'Fecha Escalada': (element.dateAssignmentCallCenter)? this.momentTime(element.dateAssignmentCallCenter):'', 'Fecha Asignada': (element.dateAssignment)? this.momentTime(element.dateAssignment):'', 'Fecha Pendiente': (element.datePendieng)? this.momentTime(element.datePendieng):'', 'Motivo Escalado': (element.motivoAsignadoCallCenter)?element.motivoAsignadoCallCenter: '', 'Motivo Pendiente': (element.pending)?element.pending:'', 'vencido':((element.pasado && element.pasado=='red')?'Si':'') })
      });

      }

  setTimeout(() => {

if(data){
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = {
    Sheets:{
      'bitacoraTimckets': worksheet
    },
    SheetNames:['bitacoraTimckets']
  }
  const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
  const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE})
  fileSaver.saveAs(blobData,name)
  this.load = false

}
this.load = false

}, 2000);


    }

    changeStatusExtra(issue, type){
      this.statusEx = issue
      this.statusExtype = type
    }

    daleStatus(issue, type){
      issue.statusExtra = type
            this.load = true
            issue.analyst = this.identity._id
            issue.statusExtraBy = this.identity._id
            this._requestProcesService.statusExtra(issue).subscribe(
                response=>{
                    this.load = false
                    swal("Éxito!", "éxito" , "success")
                    .then((res)=>{
                    window.location.reload();
                    })
                }, error=>{
                  this.load = false
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                    var body = JSON.parse(error._body)
                    swal("Error!", body.message, "error");
                    }            
                }
            )
    }
    
}
