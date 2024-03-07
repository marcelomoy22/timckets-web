import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from '../services/version';
import * as moment from 'moment';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')
const momentTimezone = require('moment-timezone');

@Component({
    selector: 'homeAdmin',
    templateUrl: '../views/homeAdmin.html',
    providers: [UsersService, RequestProcesService]
})

export class HomeAdminComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public issue;
    public nuevo
    public asignado
    public pendiente
    public solucionado
    public inNew
    public sortBy = "dateOfReport";
    public load;
    public oldData
    public search= [];
    public mes1
    public mes1Num = 0
    public mes2
    public mes2Num = 0
    public mes3
    public mes3Num = 0
    public mes4
    public mes4Num = 0
    public medida
    public reportDiario = 0
    public reportMes = 0
    public reportAnual = 0
    public cerradoDiario = 0
    public cerradoMes = 0
    public cerradoAnual = 0
    public cerradoTot = 0
    public fecha3 =new Date()
    public fecha2 =new Date()
    public fecha1 =new Date()
    public link


    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'Home Admin'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.issue = ''
        this.load = false
        this.medida = "grande"
        this.link = RUTA.r
    }

    momentTime(date) {
      if (date)
        return moment(date).format('YYYY-MM-DD / HH:mm')
      else
        return ''
    } 
    momentTimeAnual(date) {
      if (date)
        return moment(date).format('YYYY')
      else
        return ''
    }
    momentTimeMensual(date) {
      if (date)
        return moment(date).format('YYYY-MM')
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
      if(screen.width>= 1200 ){
        this.medida= "grande"
      }else{
        this.medida= "chica"
            window.location.assign( this.link + "requestProces");
            return
      }
      this.load = true
      this._requestProcesService.allSolucionadosNum(this.identity).subscribe(
        response=>{
          var numeroMes= new Date().getMonth()+1

          var meses =[
            { numero:-2, nombre: "Octubre" },
            { numero:-1, nombre: "Noviembre" },
            { numero:0, nombre: "Diciembre" },
            { numero:1, nombre: "Enero" },
            { numero:2, nombre: "Febrero" },
            { numero:3, nombre: "Marzo" },
            { numero:4, nombre: "Abril" },
            { numero:5, nombre: "Mayo" },
            { numero:6, nombre: "Junio" },
            { numero:7, nombre: "Julio" },
            { numero:8, nombre: "Agosto" },
            { numero:9, nombre: "Septiembre" },
            { numero:10, nombre: "Octubre" },
            { numero:11, nombre: "Noviembre" },
            { numero:12, nombre: "Diciembre" },
        ]

        meses.forEach(element => {
          if(element.numero == numeroMes){
            this.mes4 = element.nombre
          }
          if(element.numero == numeroMes-1){
            this.mes3 = element.nombre
          }
          if(element.numero == numeroMes-2){
            this.mes2 = element.nombre
          }
          if(element.numero == numeroMes-3){
            this.mes1 = element.nombre
          }
        });
        
          if(response){
            this.cerradoTot= response.length
            this.fecha3.setMonth(this.fecha3.getMonth() - 1);
            this.fecha2.setMonth(this.fecha2.getMonth() - 2);
            this.fecha1.setMonth(this.fecha1.getMonth() - 3);

            response.forEach(element => {

              if(this.identity.type!="callCenter"){
              if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateSolution)){
                this.cerradoDiario = this.cerradoDiario +1
              }
              if(element.status=="SolucionadoPreventivo" && !element.dateSolution){
                if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateSolutionCallCenter)){
                  this.cerradoDiario = this.cerradoDiario +1
                }
              }

              if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateSolution)){
                this.cerradoMes = this.cerradoMes +1
              }
              if(element.status=="SolucionadoPreventivo" && !element.dateSolution){
                if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateSolutionCallCenter)){
                  this.cerradoMes = this.cerradoMes +1
                }
              }

              if(element.status=="SolucionadoPreventivo" && !element.dateSolution){
                if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateSolutionCallCenter)){
                  this.cerradoAnual = this.cerradoAnual +1
                }
              }else{
                if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateSolution)){
                  this.cerradoAnual = this.cerradoAnual +1
                }
              }
            }else{
              if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateSolutionCallCenter)){
                this.cerradoDiario = this.cerradoDiario +1
              }
              if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateSolutionCallCenter)){
                this.cerradoMes = this.cerradoMes +1
              }
              if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateSolutionCallCenter)){
                this.cerradoAnual = this.cerradoAnual +1
              }
            }


              if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateOfReport)){
                this.reportDiario = this.reportDiario +1
              }
              if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                this.reportMes = this.reportMes +1
              }
              if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateOfReport)){
                this.reportAnual = this.reportAnual +1
              }

                if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                  this.mes4Num = this.mes4Num + 1
                }
                if(this.momentTimeMensual(this.fecha3) == this.momentTimeMensual(element.dateOfReport)){
                  this.mes3Num = this.mes3Num + 1
                }
                if(this.momentTimeMensual(this.fecha2) == this.momentTimeMensual(element.dateOfReport)){
                  this.mes2Num = this.mes2Num + 1
                }
                if(this.momentTimeMensual(this.fecha1) == this.momentTimeMensual(element.dateOfReport)){
                  this.mes1Num = this.mes1Num + 1
                }

            })
          }
        }, error=>{
          this.load = false
          var errorMessage = <any>error;
          if(errorMessage != null){
            // var body = JSON.parse(error._body)
            // swal("Error!", "errrrrrr", "error");
          }
        })
        this._requestProcesService.getAnswers(this.identity).subscribe(
            response=>{
              this.inNew=[]
              this.oldData=[]
              if(response.length>0){

              var nuevo = 0
              var asignado = 0
              var pendiente = 0
              var solucionado = 0
              
            var num1 =0
            var num2=0
            var num3=0
              response.forEach((element, indice) => {

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
                if(this.identity.type!='callCenter'){
                  if(element.dateAssignmentCallCenter){
                    element.dateOfReport1= momentTimezone(element.dateAssignmentCallCenter)
                  }else{
                    if(element.dateOfReport1){
                      element.dateOfReport1= momentTimezone(element.dateOfReport1)
                    }else{
                      element.dateOfReport1= momentTimezone(element.dateOfReport)
                    }                  }
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
                var arrDiasNumero = []
                var totalHorasRestadasFinSemana=0
                for (var i = 1; nombreInicio <= nomFinal; i++) {
                    arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                    arrDiasNumero.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('YYYY/MM/DD')))
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

if(arrDiasNumero[indiceDia]=='2023/11/20'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}

if(arrDiasNumero[indiceDia]=='2023/12/25'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}
                })


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

              if(response[indice].issueMore && !response[indice].issueMore.critico){
                response[indice].issueMore.critico=false
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

                if(this.identity.type=="callCenter"){
                  if(parseInt(arr[0]) > element.issue.slaCallCenter){
                    response[indice].pasado = "red"
                  }else{
                    response[indice].pasado = "green"
                  }
                }else{
                  if(parseInt(arr[0]) > element.issue.sla){
                    response[indice].pasado = "red"
                  }else{
                    response[indice].pasado = "green"
                  }
                }

                if(element.analyst){
                  response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
                }

                response[indice].tiempos = arr[0] + ' h ' + (newMinutos-sums).toString() + ' m'
                if(this.identity.type=="callCenter"){
                  if(element.issue.slaCallCenter){
                    var menos = element.issue.slaCallCenter-parseInt(arr[0])

                    if(menos > element.issue.slaCallCenter){
                      response[indice].restantes =element.issue.slaCallCenter + " h"
                    }else{
                      response[indice].restantes =menos + " h"
                    }

                  }
                }else{
                  if(element.issue.sla){
                    var menos = element.issue.sla-parseInt(arr[0])
                    if(menos > element.issue.sla){
                      response[indice].restantes = element.issue.sla + " h"
                    }else{
                      response[indice].restantes =menos + " h"
                    }
                  }
                }

                if(element.reportBy.name == undefined) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                
                if(element.status == "Solucionado" || element.status == "SolucionadoPreventivo" || element.status == "AutoSolucionado"){
                  solucionado = solucionado + 1
                }else {

                if(this.identity.type=="callCenter"){
                  if(element.statusCallCenter != "SolucionadoCallCenter" && element.statusCallCenter != "SolucionadoPreventivoCallCenter" && element.statusCallCenter != "AutoSolucionado"){

                      
                    if(element.statusCallCenter == "NuevoCallCenter"){
                      nuevo = nuevo + 1
                    }
                    if(element.statusCallCenter == "AsignadoCallCenter"){
                      asignado = asignado + 1
                    }
                    if(element.statusCallCenter == "PendienteCallCenter"){
                      pendiente = pendiente + 1
                    }
                    
                    this.inNew.push(response[indice])
                    this.oldData.push(response[indice])
                  }
                }else{
                  if(element.statusCallCenter){
                    if((element.statusCallCenter != "SolucionadoCallCenter" && element.statusCallCenter != "SolucionadoPreventivoCallCenter" && element.statusCallCenter != "AutoSolucionado")){
                      
                      if(element.status == "Nuevo"){
                        nuevo = nuevo + 1
                      }
                      if(element.status == "Asignado"){
                        asignado = asignado + 1
                      }
                      if(element.status == "Pendiente"){
                        pendiente = pendiente + 1
                      }
                      this.inNew.push(response[indice])
                      this.oldData.push(response[indice])

                      if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateOfReport)){
                        this.reportDiario = this.reportDiario +1
                      }
                      if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                        this.reportMes = this.reportMes +1
                      }
                      if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateOfReport)){
                        this.reportAnual = this.reportAnual +1
                      }
      
                      if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                        this.mes4Num = this.mes4Num + 1
                      }
                      if(this.momentTimeMensual(this.fecha3) == this.momentTimeMensual(element.dateOfReport)){
                        this.mes3Num = this.mes3Num + 1
                      }
                      if(this.momentTimeMensual(this.fecha2) == this.momentTimeMensual(element.dateOfReport)){
                        this.mes2Num = this.mes2Num + 1
                      }
                      if(this.momentTimeMensual(this.fecha1) == this.momentTimeMensual(element.dateOfReport)){
                        this.mes1Num = this.mes1Num + 1
                      }

                    }
                  }else{
                    if(element.status == "Nuevo"){
                      nuevo = nuevo + 1
                    }
                    if(element.status == "Asignado"){
                      asignado = asignado + 1
                    }
                    if(element.status == "Pendiente"){
                      pendiente = pendiente + 1
                    }
                    this.inNew.push(response[indice])
                    this.oldData.push(response[indice]) 

                    if(this.momentTimeDate(new Date()) == this.momentTimeDate(element.dateOfReport)){
                      this.reportDiario = this.reportDiario +1
                    }
                    if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                      this.reportMes = this.reportMes +1
                    }
                    if(this.momentTimeAnual(new Date()) == this.momentTimeAnual(element.dateOfReport)){
                      this.reportAnual = this.reportAnual +1
                    }
    
                    if(this.momentTimeMensual(new Date()) == this.momentTimeMensual(element.dateOfReport)){
                      this.mes4Num = this.mes4Num + 1
                    }
                    if(this.momentTimeMensual(this.fecha3) == this.momentTimeMensual(element.dateOfReport)){
                      this.mes3Num = this.mes3Num + 1
                    }
                    if(this.momentTimeMensual(this.fecha2) == this.momentTimeMensual(element.dateOfReport)){
                      this.mes2Num = this.mes2Num + 1
                    }
                    if(this.momentTimeMensual(this.fecha1) == this.momentTimeMensual(element.dateOfReport)){
                      this.mes1Num = this.mes1Num + 1
                    }

                  }
                }

              }

                this.nuevo=nuevo
                this.asignado=asignado
                this.pendiente=pendiente
                this.solucionado=solucionado

              });
              this.load = false

            } else{
              this.load = false
              this.nuevo=0
              this.asignado=0
              this.pendiente=0
              this.solucionado=0
            }
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.load = false
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
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
        this.oldData.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchSubcategoria(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchServicio(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchArea(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchCritico(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchEstatus(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          if(element.status){
            element.status2= element.status.toUpperCase()
          }else{
            element.status2= element.statusCallCenter.toUpperCase()
          }
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchReportBy(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchNumSerie(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          if(element.numSerie ){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchNumSerie2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          if(element.numSerie ){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchAnalista(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    searchVencido(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
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
        this.inNew = newData
      }else{
        this.inNew = this.oldData
      }
    }

    goToSearch(toSearch){
      if(toSearch){
        var go =toSearch.toUpperCase()
        var go2 = go.trim()

        this._requestProcesService.getOnlyOne({ruta: go2}).subscribe(
          response=>{
                    if(response.length>0){

            this.inNew = response
            this.oldData = response
            response.forEach((element, indice) => {
              
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
              if(this.identity.type!='callCenter'){
                if(element.dateAssignmentCallCenter){
                  element.dateOfReport1= momentTimezone(element.dateAssignmentCallCenter)
                }else{
                  if(element.dateOfReport1){
                    element.dateOfReport1= momentTimezone(element.dateOfReport1)
                  }else{
                    element.dateOfReport1= momentTimezone(element.dateOfReport)
                  }                  }
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
              var arrDiasNumero = []
              var totalHorasRestadasFinSemana=0
              for (var i = 1; nombreInicio <= nomFinal; i++) {
                  arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                  arrDiasNumero.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('YYYY/MM/DD')))
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

if(arrDiasNumero[indiceDia]=='2023/11/20'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}

if(arrDiasNumero[indiceDia]=='2023/12/25'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}
              })


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

            if(element.issueMore && !element.issueMore.critico){
              element.issueMore.critico=false
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

              response[indice].tiempos = arr[0] + ' h ' + (newMinutos-sums).toString() + ' m'

              if(this.identity.type=="callCenter"){
                if(element.issue.slaCallCenter){
                  var menos = element.issue.slaCallCenter-parseInt(arr[0])

                  if(menos > element.issue.slaCallCenter){
                    response[indice].restantes =element.issue.slaCallCenter + " h"
                  }else{
                    response[indice].restantes =menos + " h"
                  }

                }
              }else{
                if(element.issue.sla){
                  var menos = element.issue.sla-parseInt(arr[0])

                  if(menos > element.issue.sla){
                    response[indice].restantes = element.issue.sla + " h"
                  }else{
                    response[indice].restantes =menos + " h"
                  }

                }
              }

              if(element.reportBy.name == undefined) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname

            });
          } else{
            swal("Error!","No se encontraron datos" , "error");
          }
          })


      } else{
        this._requestProcesService.getAnswers(this.identity).subscribe(
          response=>{
            if(response.length>0){

            var nuevo = 0
            var asignado = 0
            var pendiente = 0
            var solucionado = 0
            
            response.forEach((element, indice) => {

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
              if(this.identity.type!='callCenter'){
                if(element.dateAssignmentCallCenter){
                  element.dateOfReport1= momentTimezone(element.dateAssignmentCallCenter)
                }else{
                  if(element.dateOfReport1){
                    element.dateOfReport1= momentTimezone(element.dateOfReport1)
                  }else{
                    element.dateOfReport1= momentTimezone(element.dateOfReport)
                  }                  
                }
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
              var arrDiasNumero = []
              var totalHorasRestadasFinSemana=0
              for (var i = 1; nombreInicio <= nomFinal; i++) {
                  arrDias.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('ddd')))
                  arrDiasNumero.push((momentTimezone(element.dateOfReport).tz('America/Monterrey').add(i-1, 'day').format('YYYY/MM/DD')))
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

if(arrDiasNumero[indiceDia]=='2023/11/20'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}

if(arrDiasNumero[indiceDia]=='2023/12/25'){
  // cuando es 20
  if( indiceDia!=0 && indiceDia!= (arrDias.length-1)){
      // cuando el 20 no se aperturó y no es hoy
      totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
  } else if(indiceDia!=0 && indiceDia== (arrDias.length-1)){
      // cuando el 20 no se aperturó y es hoy 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }else if(indiceDia == 0 && indiceDia!= (arrDias.length-1)){
      // cuando se levanto el 20 pero hoy no es 20
      if(puraHora >= horario1 && puraHora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (horario2-puraHora)
      }else if(puraHora <= horario1){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana + 12 
      }
  }else if(indiceDia == 0 && indiceDia== (arrDias.length-1)){
      // cuando se levanto el 20 y hoy es 20
      if(ahora >= horario1 && ahora<=horario2){
          totalHorasRestadasFinSemana= totalHorasRestadasFinSemana+ (ahora-horario1)
      }
  }
}
              })


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

            if(response[indice].issueMore && !response[indice].issueMore.critico){
              response[indice].issueMore.critico=false
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

              response[indice].tiempos = arr[0] + ' h ' + (newMinutos-sums).toString() + ' m'
              if(this.identity.type=="callCenter"){
                if(element.issue.slaCallCenter){
                  var menos = element.issue.slaCallCenter-parseInt(arr[0])

                  if(menos > element.issue.slaCallCenter){
                    response[indice].restantesCallCenter =element.issue.slaCallCenter + " h"
                  }else{
                    response[indice].restantesCallCenter =menos + " h"
                  }

                }
              }else{
                if(element.issue.sla){
                  var menos = element.issue.sla-parseInt(arr[0])

                  if(menos > element.issue.sla){
                    response[indice].restantes = element.issue.sla + " h"
                  }else{
                    response[indice].restantes =menos + " h"
                  }
                }
              }

              if(element.reportBy.name == undefined) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
              if(element.status == "Nuevo"){
                nuevo = nuevo + 1
              }
              if(element.status == "Asignado"){
                asignado = asignado + 1
              }
              if(element.status == "Pendiente"){
                pendiente = pendiente + 1
              }
              if(element.status == "Solucionado"){
                solucionado = solucionado + 1
              }
              this.nuevo=nuevo
              this.asignado=asignado
              this.pendiente=pendiente
              this.solucionado=solucionado
            });
          } else{
            this.nuevo=0
            this.asignado=0
            this.pendiente=0
            this.solucionado=0
          }
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


    onSubmit(){

    }


    onClickIssue(item){
      this.issue = item
      
    }
}
