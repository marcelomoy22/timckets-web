import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import * as moment from 'moment';
import { RUTA } from'../services/version';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')
const momentTimezone = require('moment-timezone');

@Component({
    selector: 'report',
    templateUrl: '../views/report.html',
    providers: [RequestProcesService, UsersService],
})

export class ReportComponent implements OnInit{
  public title: string;
  public users: Users;
  public identity;
  public token;
  public inProcess;
  public inSolution;
  public issue;
  public table
  public sortBy = "dateOfReport1";
  public load;
  public loadSolucionado;
  public search= [];
  public oldDataSolution
  public oldDataProcess
  public dataStart;
  public dataEnd;
  public horaReal1
  public horaReal2
  public horaStart
  public horaEnd
  public dataNaw;
  public link

  constructor(
      private _userService: UsersService,
      private _requestProcesService: RequestProcesService
  ){
      this.identity = this._userService.getIdentity();
      this.title = 'Departamento'+" "+this.identity.department.name
      this.token = this._userService.getToken();
      this.inProcess = []
      this.inSolution = []
      this.issue = ''
      this.table=1
      this.load = false
      this.loadSolucionado = false
      this.oldDataProcess = []
      this.oldDataSolution = []
      this.dataStart= momentTimezone(new Date()).tz('America/Monterrey').subtract(1, 'months').format('YYYY-MM-01')
      this.dataEnd= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
      this.dataNaw= momentTimezone(new Date()).tz('America/Monterrey').format('YYYY-MM-DD')
      this.horaStart= "00:00"
      this.horaEnd= "23:59"
      this.link= RUTA.r
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
      var tiempo1 = moment(`${this.dataStart} ${this.horaStart}`, 'YYYY-MM-DD HH:mm').format();
      var tiempo2 = moment(`${this.dataEnd} ${this.horaEnd}`, 'YYYY-MM-DD HH:mm').format();
      var data={
        request:{
          tiempo1: tiempo1,
          tiempo2: tiempo2
        }
      }
      this.horaReal1= this.dataStart + " " + this.horaStart
      this.horaReal2= this.dataEnd + " " + this.horaEnd
      this.identity.dataFecha ={
        tiempo1: tiempo1,
        tiempo2: tiempo2
      }

      this.load = true
      this.loadSolucionado = true
        this._requestProcesService.getHistoryDepartments(this.identity).subscribe(
            response=>{
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
                this.inProcess.push(element)
              this.oldDataProcess.push(element)

              }, 2000)
              });

              this.load = false
            }, error=>{
              this.load = false
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )

          this._requestProcesService.getHistorySolucionadoDepartments(this.identity).subscribe(
            response2=>{
              response2.forEach((element, indice) => {
                response2[indice].dateOfReport1= response2[indice].dateOfReport

                if(response2[indice].dateOfReport1){
                  response2[indice].dateOfReport1= momentTimezone(response2[indice].dateOfReport1)
                }else{
                  response2[indice].dateOfReport1= momentTimezone(response2[indice].dateOfReport)
                }

                element.dateOfReport=response2[indice].dateOfReport
                
                if(element.dateAssignmentCallCenter){
                  response2[indice].dateOfReport = element.dateAssignmentCallCenter
                  element.dateOfReport= element.dateAssignmentCallCenter
                }
                var totalHorasRestadas=0
                var totalMinRestadas =0
                var finicial =moment(element.dateOfReport)
                var ffinal =moment()
                var minutos = ffinal.diff(finicial, 'minutes')

                var arr= (minutos/60).toString().split(".")
                var sums= 0

                for (var i = 0; i < parseInt(arr[0]); i++) {
                    var sums=sums+ 60
                };


                if(element.issue.sla){
                  var menos = element.issue.sla-parseInt(arr[0])

                  if(element.status && (element.status=="Solucionado" || element.status=="SolucionadoPreventivo")){
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.sla){
                      element.pasado = "red"
                    }else{
                      element.pasado = "green"
                    }
                  }
                  if(element.status && (element.status=="SolucionadoCallCenter" || element.status=="SolucionadoPreventivoCallCenter")){
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.slaCallCenter){
                      element.pasadoCallCenter = "red"
                    }else{
                      element.pasadoCallCenter = "green"
                    }
                  }

                  if(menos > element.issue.sla){
                    element.restantes = element.issue.sla + " h"
                  }else{
                    element.restantes =menos + " h"
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
                  element.solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"

                if(element.encuesta ==""){
                  element.encuesta="No"
              }else{
                if(!element.encuesta){
                  element.encuesta=''
                }
              }

              if(element.issueMore && !element.issueMore.critico){
                element.issueMore.critico=false
              }

                this.inSolution.push(element)
                this.oldDataSolution.push(element)
          
              });
              this.loadSolucionado = false            
            }, error=>{
              this.loadSolucionado = false
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )        
    }

    changeDate(){
      this.dataEnd = momentTimezone(new Date()).tz('America/Monterrey').subtract().format('YYYY-MM-DD')
      this.dataNaw = momentTimezone(new Date()).tz('America/Monterrey').subtract().format('YYYY-MM-DD')
  }

  getFilter() {
    var tiempo1 = moment(`${this.dataStart} ${this.horaStart}`, 'YYYY-MM-DD HH:mm').format();
    var tiempo2 = moment(`${this.dataEnd} ${this.horaEnd}`, 'YYYY-MM-DD HH:mm').format();
    var data={
      request:{
        tiempo1: tiempo1,
        tiempo2: tiempo2
      }
    }
    this.horaReal1= this.dataStart + " " + this.horaStart
    this.horaReal2= this.dataEnd + " " + this.horaEnd
    this.identity.dataFecha ={
      tiempo1: tiempo1,
      tiempo2: tiempo2
    }

    this.load = true
    this.loadSolucionado = true
 
    this.inSolution= []
    this.oldDataSolution= []

    this._requestProcesService.getHistorySolucionadoDepartments(this.identity).subscribe(
      response2=>{
        response2.forEach((element, indice) => {
          response2[indice].dateOfReport1= response2[indice].dateOfReport

          if(response2[indice].dateOfReport1){
            response2[indice].dateOfReport1= momentTimezone(response2[indice].dateOfReport1)
          }else{
            response2[indice].dateOfReport1= momentTimezone(response2[indice].dateOfReport)
          }

          element.dateOfReport=response2[indice].dateOfReport
          
          if(element.dateAssignmentCallCenter){
            response2[indice].dateOfReport = element.dateAssignmentCallCenter
            element.dateOfReport= element.dateAssignmentCallCenter
          }
          var totalHorasRestadas=0
          var totalMinRestadas =0
          var finicial =moment(element.dateOfReport)
          var ffinal =moment()
          var minutos = ffinal.diff(finicial, 'minutes')

          var arr= (minutos/60).toString().split(".")
          var sums= 0

          for (var i = 0; i < parseInt(arr[0]); i++) {
              var sums=sums+ 60
          };


          if(element.issue.sla){
            var menos = element.issue.sla-parseInt(arr[0])

            if(element.status && (element.status=="Solucionado" || element.status=="SolucionadoPreventivo")){
              if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.sla){
                element.pasado = "red"
              }else{
                element.pasado = "green"
              }
            }
            if(element.status && (element.status=="SolucionadoCallCenter" || element.status=="SolucionadoPreventivoCallCenter")){
              if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.slaCallCenter){
                element.pasadoCallCenter = "red"
              }else{
                element.pasadoCallCenter = "green"
              }
            }

            if(menos > element.issue.sla){
              element.restantes = element.issue.sla + " h"
            }else{
              element.restantes =menos + " h"
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
            element.solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"

          if(element.encuesta ==""){
            element.encuesta="No"
        }else{
          if(!element.encuesta){
            element.encuesta=''
          }
        }

        if(element.issueMore && !element.issueMore.critico){
          element.issueMore.critico=false
        }

          this.inSolution.push(element)
          this.oldDataSolution.push(element)
    
        });
        this.loadSolucionado = false   
        this.load = false
      }, error=>{
        this.loadSolucionado = false
        this.load = false
        var errorMessage = <any>error;
        if(errorMessage != null){
          // var body = JSON.parse(error._body)
          // swal("Error!", "errrrrrr", "error");
        }
      }
    )
  }



  goToSearch(toSearch){
    this.load = true
      this.inSolution= []
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
            }else{
              this.inProcess.push(response[i])
            }
        };
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

              if(menos > element.issue.sla){
                response[indice].restantes = element.issue.sla + " h"
              }else{
                response[indice].restantes =menos + " h"
              }

            }

            if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
          });
          this.load = false
        }else{
          swal("Error!","No se encontraron datos" , "error");
          this.load = false
        }

        })


    } else{
      this._requestProcesService.getHistoryDepartments(this.identity).subscribe(
          response=>{
            for (var i = 0; i < response.length; i++) {
              if(response[i].status=="Solucionado"){
                this.inSolution.push(response[i])
              }else{
                this.inProcess.push(response[i])
              }
          };
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

                if(menos > element.issue.sla){
                  response[indice].restantes = element.issue.sla + " h"
                }else{
                  response[indice].restantes =menos + " h"
                }

              }

              if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
            });
            this.load = false
          }, error=>{
            this.load = false
            var errorMessage = <any>error;
            if(errorMessage != null){
              // var body = JSON.parse(error._body)
              // swal("Error!", "errrrrrr", "error");
            }
          }
        )   
  }

  }


  onClickIssue(item){
    this.issue = item
  }

  pushTable(){
    if(this.table==2){
      this.search=[]
      this.inProcess = this.oldDataProcess
    }else if(this.table==1){
      this.search=[]
      this.inSolution = this.oldDataSolution
    }
  }

  sendNotes(issue){
    if(issue.reportBy.name==undefined) issue.reportBy.name = issue.reportBy.fname + " " + issue.reportBy.lname

    issue.typeNote = "public"

    this._requestProcesService.addNote(issue).subscribe(
      response=>{
          swal("¡Éxito!", "mensaje  " + "  enviado" , "success")
          .then((res)=>{
              window.location.reload();
          })
      }, error=>{
          var errorMessage = error;
          if(errorMessage != null){
          swal("Error!","errorMessage" , "error");
          }            
      }
  )

}

searchFolio(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataProcess.forEach(element => {
      element.codeRequest2= element.codeRequest.toUpperCase()
      if(element.codeRequest2.indexOf(go)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchSubcategoria(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.subCategory2= element.subCategory.toUpperCase()
      if(element.subCategory2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchServicio(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.service2= element.service.toUpperCase()
      if(element.service2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchArea(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.issue.category2= element.issue.category.toUpperCase()
      if(element.issue.category2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchEstatusCallCenter(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      if(element.statusCallCenter){
        element.status2= element.statusCallCenter.toUpperCase()
        if(element.status2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchEstatusCallCenter2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element.statusCallCenter){
        element.status2= element.statusCallCenter.toUpperCase()
        if(element.status2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchEstatus(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      if(element.status){
      element.status2= element.status.toUpperCase()
      if(element.status2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchSucursal(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.reportBy.name2= element.reportBy.name.toUpperCase()
      if(element.reportBy.name2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchAreaSucursal(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.reportBy.area.name2= element.reportBy.area.name.toString()
      if(element.reportBy.area.name2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchReportBy(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      element.manager2= element.manager.toUpperCase()
      if(element.manager2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchAnalista(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      if(element.analyst){
        element.analyst.fnames2= element.analyst.fnames.toUpperCase()
        if(element.analyst.fnames2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchResponsable1(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
        element.analist12= element.analist1.toUpperCase()
        if(element.analist12.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchResponsable2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      if(element.analist2){
        element.analist22= element.analist2.toUpperCase()
        if(element.analist22.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchMotivoPendiente(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
      if(element.pending){
        element.pending2= element.pending.toUpperCase()
        if(element.pending2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchVencido(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataProcess.forEach(element => {
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
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}










searchFolio2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataSolution.forEach(element => {
      element.codeRequest2= element.codeRequest.toUpperCase()
      if(element.codeRequest2.indexOf(go)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchSubcategoria2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.subCategory2= element.subCategory.toUpperCase()
      if(element.subCategory2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchServicio2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.service2= element.service.toUpperCase()
      if(element.service2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchNumSerie(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataProcess.forEach(element => {
      if(element.numSerie ){
        element.numSerie2= element.numSerie.toUpperCase()
        if(element.numSerie2.indexOf(go)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchNumSerie2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataSolution.forEach(element => {
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
    this.inSolution = this.oldDataSolution
  }
}

searchArea2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.issue.category2= element.issue.category.toUpperCase()
      if(element.issue.category2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchEstatus2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element && element.status){
        element.status2= element.status.toUpperCase()
        if(element.status2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchSucursal2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.reportBy.name2= element.reportBy.name.toUpperCase()
      if(element.reportBy.name2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchAreaSucursal2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.reportBy.area.name2= element.reportBy.area.name.toString()
      if(element.reportBy.area.name2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchReportBy2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      element.manager2= element.manager.toUpperCase()
      if(element.manager2.indexOf(toSearch)>=0){
        newData.push(element)
      }else{
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchAnalista2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
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
    this.inSolution = this.oldDataSolution
  }
}

searchResponsable12(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
        element.analist12= element.analist1.toUpperCase()
        if(element.analist12.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchResponsable22(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element.analist2){
        element.analist22= element.analist2.toUpperCase()
        if(element.analist22.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchMotivoPendiente2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element.pending){
        element.pending2= element.pending.toUpperCase()
        if(element.pending2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchMotivoSolucion2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element.solution){
        element.solution2= element.solution.toUpperCase()
        if(element.solution2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchEncuestaComents(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
      if(element.encuestaComents){
        element.encuestaComents2= element.encuestaComents.toUpperCase()
        if(element.encuestaComents2.indexOf(toSearch)>=0){
          newData.push(element)
        }else{
        }
      }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}

searchCritico(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataProcess.forEach(element => {
      if(element.issueMore.critico && element.issueMore.critico==true){
        element.issueMore.critico2="si"
        element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
      if(element.issueMore.critico2.indexOf(go)>=0){
        newData.push(element)
      }else{
      }
    }
    });
    this.inProcess = newData
  }else{
    this.inProcess = this.oldDataProcess
  }
}

searchCritico2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    var go =toSearch.toUpperCase()
    go= go.toString()
    this.oldDataSolution.forEach(element => {
      if(element.issueMore.critico && element.issueMore.critico==true){
        element.issueMore.critico2="si"
        element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
      if(element.issueMore.critico2.indexOf(go)>=0){
        newData.push(element)
      }else{
      }
    }
    });
    this.inSolution = newData
  }else{
    this.inSolution = this.oldDataSolution
  }
}


searchVencido2(toSearch){
  toSearch= toSearch.toUpperCase()
  var newData = []
  if(toSearch!=""){
    this.oldDataSolution.forEach(element => {
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
    this.inSolution = this.oldDataSolution
  }
}

exportFunction(inSolution){
  this.load = true
setTimeout(() => {
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';

  if(this.table==1){
    var data =[]
    var name = 'timcketsAbiertos'
  inSolution.forEach((element,index) => {
    data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'slaCallCenter': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'restante': ((element.restantes)?element.restantes:''),'EstatusCallCenter':((element.statusCallCenter)?element.statusCallCenter:''),  'EstatusAnalista': ((element.status)?element.status :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'reporta': ((element.manager)?element.manager:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'responsable1': ((element.analist1)?element.analist1:''), 'responsable2': ((element.analist2)?element.analist2:''), 'responsable3': ((element.analist3)?element.analist3:''), 'responsable4': ((element.analist4)?element.analist4:''), 'fechaEscalada':((element.dateAssignmentCallCenter)? this.momentTime(element.dateAssignmentCallCenter):''), 'fechaAsignada':((element.dateAssignment)? this.momentTime(element.dateAssignment):''), 'fechaPendiente':((element.datePendieng)? this.momentTime(element.datePendieng):''), 'motivoEscalado': ((element.motivoAsignadoCallCenter)?element.motivoAsignadoCallCenter:''), 'motivoPendiente': ((element.pending)?element.pending:''), 'vencido': (element.vencidoH && element.vencidoH=='si')? 'Si' : (element.pasado && element.pasado=='red')?'Si':'' })
  });

  }else if(this.table==2){
    var data =[]
    var name = 'timcketsSolucionados'
  inSolution.forEach((element,index) => {
    data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''),  'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'slaCallCenter': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'tiempoSolucion': ((element.solutionTimeNew)?element.solutionTimeNew:''), 'tiempoH': ((element.solutionTimeHours)?element.solutionTimeHours:''), 'EstatusCallCenter':((element.statusCallCenter)?element.statusCallCenter:''),  'EstatusAnalista': ((element.status)?element.status :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'reporta': ((element.manager)?element.manager:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'responsable1': ((element.analist1)?element.analist1:''), 'responsable2': ((element.analist2)?element.analist2:''), 'responsable3': ((element.analist3)?element.analist3:''), 'responsable4': ((element.analist4)?element.analist4:''), 'fechaEscalada':((element.dateAssignmentCallCenter)? this.momentTime(element.dateAssignmentCallCenter):''), 'fechaAsignada':((element.dateAssignment)? this.momentTime(element.dateAssignment):''), 'fechaPendiente':((element.datePendieng)? this.momentTime(element.datePendieng):''), 'motivoEscalado': ((element.motivoAsignadoCallCenter)?element.motivoAsignadoCallCenter:''), 'motivoPendiente': ((element.pending)?element.pending:''), 'fechaSolucion':((element.dateSolution)? this.momentTimeDate(element.dateSolution): (element.dateSolutionCallCenter)?this.momentTimeDate(element.dateSolutionCallCenter):''), 'hora2':((element.dateSolution)? this.momentTimeHour(element.dateSolution):(element.dateSolutionCallCenter)?this.momentTimeHour(element.dateSolutionCallCenter):''), 'motivoSolucion': ((element.solution)?element.solution:''), 'vencido':(element.vencidoH && element.vencidoH=='si')? 'Si' : (element.pasado && element.pasado=='red')?'Si':'', 'encuesta':((element.encuesta)?element.encuesta:''), 'comentarioEncuesta':((element.encuestaComents)?element.encuestaComents:'') })
  });

  }

setTimeout(() => {

if(data){
const worksheet = XLSX.utils.json_to_sheet(data)
const workbook = {
Sheets:{
  'timckets': worksheet
},
SheetNames:['timckets']
}
const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE})
fileSaver.saveAs(blobData,name)
this.load = false

}
this.load = false

}, 2000);
}, 1000);

}


}
