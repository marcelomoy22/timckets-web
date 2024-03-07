import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from'../services/version';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')
const momentTimezone = require('moment-timezone');

@Component({
    selector: 'requestProces',
    templateUrl: '../views/requestProces.html',
    providers: [UsersService, RequestProcesService]
})

export class RequestProcesComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public inProcess;
    public inPending;
    public inProcessNew;
    public inPendingNew;
    public inProcessCallCenter;
    public inPendingCallCenter;
    public inProcessTable;
    public inProcessInProgres;
    public issue;
    public table
    public sortBy1 = "dateOfReport";
    public sortBy2 = "dateOfReport";
    public sortBy3 = "dateOfReport";
    public sortBy4 = "dateOfReport";
    public sortBy5 = "dateOfReport";
    public sortBy6 = "dateOfReport";
    public sortBy7 = "dateOfReport";
    public sortBy8 = "dateOfReport";
    public sortBy9 = "dateOfReport";
    public load;
    public oldDataPanding
    public oldDataProcess
    public oldDataPandingNew
    public oldDataProcessNew
    public oldDataPandingCallCenter
    public oldDataProcessCallCenter
    public search= [];
    public dataEncuesta
    public inPendingCopiados
    public oldDataPandingCopiados
    public inProcessCopiados
    public oldDataProcessCopiados
    public oldDataInProcessInProgres
    public link

    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'REQUERIMIENTOS EN PROCESO'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.inProcess = []
        this.inPending = []
        this.inProcessNew = []
        this.inPendingNew = []
        this.inProcessCallCenter = []
        this.inPendingCallCenter = []
        this.inProcessInProgres = []
        this.oldDataPanding = []
        this.oldDataProcess = []     
        this.inPendingCopiados = []
        this.oldDataPandingCopiados = []
        this.inProcessCopiados = []
        this.oldDataProcessCopiados = []   
        this.oldDataPandingNew = []
        this.oldDataProcessNew = []
        this.oldDataPandingCallCenter = []
        this.oldDataProcessCallCenter = []
        this.oldDataInProcessInProgres = []
        this.issue = ''
        this.load = false
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
      this.load = true
      if(this.identity.type!='callCenter'){
        this.table=1
        this._requestProcesService.getAnswers(this.identity).subscribe(
            response=>{
              for (var i = 0; i < response.length; i++) {

                if(this.identity.type!= "local" && this.identity.type!= "areaManager"){
                  if(response[i].issueMore && response[i].issueMore.zonesToAnalyst && response[i].issueMore.zonesToAnalyst.porEstado==true ){
                   
                    if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLAnalyst.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }else{
                    if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLCopiados.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaAnalyst.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaCopiados.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }else{
                    if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroAnalyst.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroCopiados.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }
                  }
                }
                }
              }
            }


                  }else{
                    if(response[i].issueMore.emailToSendAnalist.includes(this.identity._id)){
                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }else{

                      if(response[i].status=="Solucionado"){
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }

                    }
                  }
                }else{
                  if(response[i].status=="Solucionado"){
                  }else{
                    if((response[i].status=="Pendiente" || response[i].statusCallCenter=="PendienteCallCenter") && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                      this.inPending.push(response[i])
                      this.oldDataPanding.push(response[i])
                    }else if((response[i].status=="Nuevo" || response[i].statusCallCenter=="NuevoCallCenter" ) && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                      this.inProcess.push(response[i])
                      this.oldDataProcess.push(response[i])
                    }else if(response[i].status=="Asignado" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                      this.inProcess.push(response[i])
                      this.oldDataProcess.push(response[i])
                    }
                  }
                }




                
            };
              response.forEach((element, indice) => {


                if(element.dateAssignmentCallCenter && this.identity.type!="local" && this.identity.type!="callCenter" && this.identity.type!="areaManager"){
                  response[indice].dateOfReport = element.dateAssignmentCallCenter
                  
                  response[indice].dateOfReport1= response[indice].dateOfReport
                  element.dateOfReport=response[indice].dateOfReport
  
                  if(element.dateAssignmentCallCenter && element.dateAssignmentCallCenter != null){
                    response[indice].dateOfReport = element.dateAssignmentCallCenter
                    element.dateOfReport= element.dateAssignmentCallCenter
                  }
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
                element.dateOfReport1= momentTimezone(element.dateOfReport).tz('America/Monterrey')
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

                if(parseInt(arr[0]) > element.issue.sla){
                  response[indice].color = "yellow"
                }

                if(element.issue.sla){
                  var menos = element.issue.sla-parseInt(arr[0])

                  if(menos > element.issue.sla){
                    response[indice].restantes = element.issue.sla + " h"
                  }else{
                    response[indice].restantes =menos + " h"
                  }
                  
                }


                if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                if(parseInt(arr[0]) > element.issue.sla){
                  response[indice].pasado = "red"
                }else{
                  response[indice].pasado = "green"
                }
                if(element.analyst){
                  response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
                }
              });
              this.inProcessTable = response
              this.load = false
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.load = false
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )

          if(this.identity.type!="local" && this.identity.type!="areaManager" && this.identity.type!="callCenter"){

            this._requestProcesService.getInCallCenter(this.identity).subscribe(
              response=>{
                response.forEach((element, indice) => {

                  if(element.statusCallCenter){
                    this.inProcessInProgres.push(element)
                    this.oldDataInProcessInProgres.push(element)
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
          
                    element.dateOfReport1= momentTimezone(element.dateOfReport).tz('America/Monterrey')
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

            if(response[indice].issueMore && !response[indice].issueMore.critico){
              response[indice].issueMore.critico=false
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

            response[indice].tiempos = arr[0] + ' h ' + (newMinutos-sums).toString() + ' m'

            if(element &&element.issue && element.issue.sla){
            }else{
              console.log(element.codeRequest)
            }
            
            if(element.issue.slaCallCenter){
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].colorCallCenter = "yellow"
              }
              if(element.issue.slaCallCenter){
                var menos = element.issue.slaCallCenter-parseInt(arr[0])
                if(menos > element.issue.slaCallCenter){
                  response[indice].restantesCallCenter =element.issue.slaCallCenter + " h"
                }else{
                  response[indice].restantesCallCenter =menos + " h"
                }
              }
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].pasadoCallCenter = "red"
              }else{
                response[indice].pasadoCallCenter = "green"
              }
            }

            if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname

            if(element.analyst){
              response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
            }

                });
                
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

          this._requestProcesService.getEncuestas(this.identity).subscribe(
            response=>{
                if(response.length>0){
                    this.dataEncuesta = response
                }
            }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  // var body = JSON.parse(error._body)
                  // swal("Error!", "errrrrrr", "error");
                }
              }
            )

    }else if(this.identity.type=='callCenter'){
      this.table=5
      this._requestProcesService.allCallCenter(this.identity).subscribe(
        response=>{

          response.forEach((element, indice) => {

            if(element.status && (element.status=='Nuevo' || element.status=='Pendiente' || element.status=='Asignado' || element.status=='Solucionado')){
              if(element.status=='Solucionado'){
              }else if(element.status=="Pendiente" && element.statusCallCenter!='SolucionadoCallCenter' && element.statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                this.inPendingNew.push(element)
                this.oldDataPandingNew.push(element)
              }else if(element.status=="Nuevo" && element.statusCallCenter!='SolucionadoCallCenter' && element.statusCallCenter!='SolucionadoPreventivoCallCenter'){
                this.inProcessNew.push(element)
                this.oldDataProcessNew.push(element)
              }else if(element.status=="Asignado" && element.statusCallCenter!='SolucionadoCallCenter' && element.statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                this.inProcessNew.push(element)
                this.oldDataProcessNew.push(element)
              }
            }else{
              if(element.statusCallCenter=="PendienteCallCenter"){
                this.inPendingCallCenter.push(element)
                this.oldDataPandingCallCenter.push(element)
              }else{
                this.inProcessCallCenter.push(element)
                this.oldDataProcessCallCenter.push(element)
                }
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
  
            element.dateOfReport1= momentTimezone(element.dateOfReport).tz('America/Monterrey')
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


            if(response[indice].issueMore && !response[indice].issueMore.critico){
              response[indice].issueMore.critico=false
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

            response[indice].tiempos = arr[0] + ' h ' + (newMinutos-sums).toString() + ' m'

            if(element &&element.issue && element.issue.sla){
            }else{
              console.log(element.codeRequest)
            }

            if(parseInt(arr[0]) > element.issue.sla){
              response[indice].color = "yellow"
            }
            if(element.issue.sla){
              var menos = element.issue.sla-parseInt(arr[0])
              
              if(menos > element.issue.sla){
                response[indice].restantes = element.issue.sla + " h"
              }else{
                response[indice].restantes =menos + " h"
              }
            }
            if(parseInt(arr[0]) > element.issue.sla){
              response[indice].pasado = "red"
            }else{
              response[indice].pasado = "green"
            }

            if(element.issue.slaCallCenter){
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].colorCallCenter = "yellow"
              }
              if(element.issue.slaCallCenter){
                var menos = element.issue.slaCallCenter-parseInt(arr[0])
                if(menos > element.issue.slaCallCenter){
                  response[indice].restantesCallCenter =element.issue.slaCallCenter + " h"
                }else{
                  response[indice].restantesCallCenter =menos + " h"
                }              }
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].pasadoCallCenter = "red"
              }else{
                response[indice].pasadoCallCenter = "green"
              }
            }


            if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname

            if(element.analyst){
              response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
            }
          });
          this.load = false
        }, error=>{
          this.load = false
                var errorMessage = <any>error;
                if(errorMessage != null){
                  this.load = false
                }
              })

    }
    }

    onSubmit(){

    }

    searchFolio1(toSearch){

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

    searchCritico1(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcess.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
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
        this.oldDataPanding.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchCritico9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcess.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
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

    searchCritico3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcess.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
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

    searchCritico4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcess.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
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

    searchCritico5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchCritico6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchCritico7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchCritico8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          if(element.issueMore.critico && element.issueMore.critico==true){
            element.issueMore.critico2="si"
            element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
          if(element.issueMore.critico2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchFolio5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataProcessCallCenter.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }


    searchFolio6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataPandingCallCenter.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchFolio7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataProcessNew.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchFolio8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataPandingNew.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchFolio9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataInProcessInProgres.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchSubcategoria1(toSearch){
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


    searchSubcategoria5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }


    searchSubcategoria6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchSubcategoria7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchSubcategoria8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchSubcategoria9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchNumSerie9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchServicio1(toSearch){
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

    searchServicio5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchNumSerie5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchServicio6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchNumSerie6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchServicio7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchNumSerie7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchServicio8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchNumSerie8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchServicio9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchArea1(toSearch){
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

    searchArea5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchArea6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchArea7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchArea8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }


    searchArea9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchEstatus1(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcess.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcess = newData
      }else{
        this.inProcess = this.oldDataProcess
      }
    }

    searchEstatus5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          element.statusCallCenter2= element.statusCallCenter.toUpperCase()
          if(element.statusCallCenter2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchEstatus6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          element.statusCallCenter2= element.statusCallCenter.toUpperCase()
          if(element.statusCallCenter2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchEstatus7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchEstatus8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchEstatus9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          element.statusCallCenter2= element.statusCallCenter.toUpperCase()
          if(element.statusCallCenter2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchReportBy1(toSearch){
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

    searchReportBy5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchReportBy6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchReportBy7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchReportBy8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchReportBy9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchAnalista1(toSearch){
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
        this.oldDataPanding.forEach(element => {
          if(element.numSerie ){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }


    searchAnalista5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }

    searchAnalista6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchAnalista7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchAnalista8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchAnalista9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchVencido1(toSearch){
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

    searchVencido5(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCallCenter.forEach(element => {
          if(element.pasadoCallCenter=="red"){
            var pasadoCallCenter="Si"
          }else{
            var pasadoCallCenter="No"
          }
          var pasadoCallCenter2= pasadoCallCenter.toUpperCase()

            if(pasadoCallCenter2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inProcessCallCenter = newData
      }else{
        this.inProcessCallCenter = this.oldDataProcessCallCenter
      }
    }


    searchVencido6(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCallCenter.forEach(element => {
          if(element.pasadoCallCenter=="red"){
            var pasadoCallCenter="Si"
          }else{
            var pasadoCallCenter="No"
          }
          var pasadoCallCenter2= pasadoCallCenter.toUpperCase()

            if(pasadoCallCenter2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inPendingCallCenter = newData
      }else{
        this.inPendingCallCenter = this.oldDataPandingCallCenter
      }
    }

    searchVencido7(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessNew.forEach(element => {
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
        this.inProcessNew = newData
      }else{
        this.inProcessNew = this.oldDataProcessNew
      }
    }

    searchVencido8(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingNew.forEach(element => {
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
        this.inPendingNew = newData
      }else{
        this.inPendingNew = this.oldDataPandingNew
      }
    }

    searchVencido9(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataInProcessInProgres.forEach(element => {
          if(element.pasadoCallCenter=="red"){
            var pasadoCallCenter="Si"
          }else{
            var pasadoCallCenter="No"
          }
          var pasadoCallCenter2= pasadoCallCenter.toUpperCase()

            if(pasadoCallCenter2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
        });
        this.inProcessInProgres = newData
      }else{
        this.inProcessInProgres = this.oldDataInProcessInProgres
      }
    }

    searchFolio2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataPanding.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchSubcategoria2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchServicio2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchArea2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchEstatus2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchReportBy2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchAnalista2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchVencido2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
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
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchMotivoPendiente2(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPanding.forEach(element => {
          if(element.pending){
            element.pending2= element.pending.toUpperCase()
            if(element.pending2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPending = newData
      }else{
        this.inPending = this.oldDataPanding
      }
    }

    searchFolio3(toSearch){

      // this.search=[
      //   { folio:"" },
      //   { subcategoria:"" },
      //   { servicio:"" },
      //   { area:"" },
      //   { estatus:"" },
      //   { reportadoPor:"" },
      //   { analista:"" },
      //   { vencido:"" },
      // ]

      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataProcessCopiados.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchSubcategoria3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchServicio3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchNumSerie3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          if(element && element.numSerie){
          element.numSerie2= element.numSerie.toUpperCase()
          if(element.numSerie2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchArea3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchEstatus3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchReportBy3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchAnalista3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }

    searchVencido3(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataProcessCopiados.forEach(element => {
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
        this.inProcessCopiados = newData
      }else{
        this.inProcessCopiados = this.oldDataProcessCopiados
      }
    }





    searchFolio4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldDataPandingCopiados.forEach(element => {
          element.codeRequest2= element.codeRequest.toUpperCase()
          if(element.codeRequest2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchSubcategoria4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          element.subCategory2= element.subCategory.toUpperCase()
          if(element.subCategory2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchServicio4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchNumSerie4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          if(element && element.numSerie){
            element.numSerie2= element.numSerie.toUpperCase()
            if(element.numSerie2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchArea4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          element.issue.category2= element.issue.category.toUpperCase()
          if(element.issue.category2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchEstatus4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchReportBy4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          element.reportBy.name2= element.reportBy.name.toUpperCase()
          if(element.reportBy.name2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchAnalista4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          if(element.analyst){
            element.analyst.fnames2= element.analyst.fnames.toUpperCase()
            if(element.analyst.fnames2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchVencido4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
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
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }

    searchMotivoPendiente4(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldDataPandingCopiados.forEach(element => {
          if(element.pending){
            element.pending2= element.pending.toUpperCase()
            if(element.pending2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.inPendingCopiados = newData
      }else{
        this.inPendingCopiados = this.oldDataPandingCopiados
      }
    }


    goToSearch(toSearch){
      this.inProcess = []
      this.inPending = []
      this.inProcessNew = []
      this.inPendingNew = []
      this.inProcessCallCenter = []
      this.inPendingCallCenter = []
      this.oldDataPanding = []
      this.oldDataProcess = []     
      this.inPendingCopiados = []
      this.oldDataPandingCopiados = []
      this.inProcessCopiados = []
      this.oldDataProcessCopiados = []   
      this.oldDataPandingNew = []
      this.oldDataProcessNew = []
      this.oldDataPandingCallCenter = []
      this.oldDataProcessCallCenter = []

      if(toSearch && toSearch.length>0){
        var go =toSearch.toUpperCase()
        var go2 = go.trim()

        this._requestProcesService.getOnlyOne({ruta: go2}).subscribe(
          response=>{
            if(response[0]){
            for (var i = 0; i < response.length; i++) {

              if(this.identity.type!= "local" && this.identity.type!= "areaManager"){
                if(response[i].issueMore && response[i].issueMore.zonesToAnalyst && response[i].issueMore.zonesToAnalyst.porEstado==true ){
                
                  if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLAnalyst.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcess.push(response[i])
                      }
                    }
                  }
                  if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLCopiados.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcessCopiados.push(response[i])
                      }
                    }
                  }

                  if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaAnalyst.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcess.push(response[i])
                      }
                    }
                  }
                  if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaCopiados.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcessCopiados.push(response[i])
                      }
                    }
                  }

                  if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroAnalyst.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcess.push(response[i])
                      }
                    }
                  }
                  if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroCopiados.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcessCopiados.push(response[i])
                      }
                    }
                  }

                }else{
                  if(response[i].issueMore.emailToSendAnalist.includes(this.identity._id)){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcess.push(response[i])
                      }
                    }
                  }else{
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                    }else{
                      if(this.identity.type=='callCenter'){
                        if(response[i].status){
                          this.inProcessNew.push(response[i])
                        }else{
                          this.inProcessCallCenter.push(response[i])
                        }
                      }else{
                        this.inProcessCopiados.push(response[i])
                      }
                    }
                  }
                }
              } else{
                if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                  swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                }else{
                  if(this.identity.type=='callCenter'){
                    if(response[i].status){
                      this.inProcessNew.push(response[i])
                    }else{
                      this.inProcessCallCenter.push(response[i])
                    }
                  }else{
                    this.inProcess.push(response[i])
                  }
                }
              }
          };
            this.inProcessTable = response
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
          }else{
            swal("Error!","No se encontraron datos" , "error");
          }

          })


      } else{

      this.load = true
      if(this.identity.type!='callCenter'){
        this.table=1
        this._requestProcesService.getAnswers(this.identity).subscribe(
            response=>{
              for (var i = 0; i < response.length; i++) {

                if(this.identity.type!= "local" && this.identity.type!= "areaManager"){
                  if(response[i].issueMore && response[i].issueMore.zonesToAnalyst && response[i].issueMore.zonesToAnalyst.porEstado==true ){
                   
                    if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLAnalyst.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }else{
                    if(response[i].issueMore.zonesNL && response[i].issueMore.zonesNL.zonesNLCopiados.includes(this.identity._id) ){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaAnalyst.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesCoahila && response[i].issueMore.zonesCoahila.zonesCoahilaCopiados.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }
                      }
                    }else{
                    if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroAnalyst.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    } else{
                    if(response[i].issueMore.zonesQueretaro && response[i].issueMore.zonesQueretaro.zonesQueretaroCopiados.includes(this.identity._id) ){
                      if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }
                      }
                    }
                  }
                }
                }
              }
            }


                  }else{
                    if(response[i].issueMore.emailToSendAnalist.includes(this.identity._id)){
                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPending.push(response[i])
                          this.oldDataPanding.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcess.push(response[i])
                          this.oldDataProcess.push(response[i])
                        }
                      }
                    }else{

                    if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                      }else{
                        if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inPendingCopiados.push(response[i])
                          this.oldDataPandingCopiados.push(response[i])
                        }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                          this.inProcessCopiados.push(response[i])
                          this.oldDataProcessCopiados.push(response[i])
                        }
                      }

                    }
                  }
                }else{
                  if(response[i].status=="Solucionado" || response[i].status=="SolucionadoPreventivo" || response[i].statusCallCenter=="SolucionadoPreventivoCallCenter" || response[i].statusCallCenter=="SolucionadoCallCenter"){
                      swal("Error!","El timcket ya fue solucionado, favor de buscarlo en 'Solucionados'" , "error");
                  }else{
                    if(response[i].status=="Pendiente" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                      this.inPending.push(response[i])
                      this.oldDataPanding.push(response[i])
                    }else if(response[i].status=="Nuevo" && response[i].statusCallCenter!='SolucionadoCallCenter' && response[i].statusCallCenter!='SolucionadoPreventivoCallCenter' ){
                      this.inProcess.push(response[i])
                      this.oldDataProcess.push(response[i])
                    }
                  }
                }




                
            };
              this.inProcessTable = response
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

                if(parseInt(arr[0]) > element.issue.sla){
                  response[indice].color = "yellow"
                }

                if(element.issue.sla){
                  var menos = element.issue.sla-parseInt(arr[0])

                  if(menos > element.issue.sla){
                    response[indice].restantes = element.issue.sla + " h"
                  }else{
                    response[indice].restantes =menos + " h"
                  }
                }

                if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                if(parseInt(arr[0]) > element.issue.sla){
                  response[indice].pasado = "red"
                }else{
                  response[indice].pasado = "green"
                }
                if(element.analyst){
                  response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
                }
              });
              this.load = false
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.load = false
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )

          this._requestProcesService.getEncuestas(this.identity).subscribe(
            response=>{
                if(response.length>0){
                    this.dataEncuesta = response
                }
            }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  // var body = JSON.parse(error._body)
                  // swal("Error!", "errrrrrr", "error");
                }
              }
            )

    }else if(this.identity.type=='callCenter'){
      this.table=5
      this._requestProcesService.allCallCenter(this.identity).subscribe(
        response=>{


          response.forEach((element, indice) => {

            if(element.status && (element.status=='Nuevo' || element.status=='Pendiente' || element.status=='Asignado')){
              if(element.status=="Pendiente" && element.statusCallCenter!='SolucionadoCallCenter' && element.statusCallCenter!='SolucionadoPreventivoCallCenter'){
                this.inPendingNew.push(element)
                this.oldDataPandingNew.push(element)
              }else if(element.status=="Nuevo" && element.statusCallCenter!='SolucionadoCallCenter' && element.statusCallCenter!='SolucionadoPreventivoCallCenter'){
                this.inProcessNew.push(element)
                this.oldDataProcessNew.push(element)
                }
            }else{
              if(element.statusCallCenter=="PendienteCallCenter"){
                this.inPendingCallCenter.push(element)
                this.oldDataPandingCallCenter.push(element)
              }else{
                this.inProcessCallCenter.push(element)
                this.oldDataProcessCallCenter.push(element)
                }
            }

            var finicial =moment(element.dateOfReport)
            var ffinal =moment()
            var minutos = ffinal.diff(finicial, 'minutes')

            var arr= (minutos/60).toString().split(".")
            var sums= 0

            for (var i = 0; i < parseInt(arr[0]); i++) {
                var sums=sums+ 60
            };

            response[indice].tiempos = arr[0] + ' h ' + (minutos-sums).toString() + ' m'
            if(parseInt(arr[0]) > element.issue.sla){
              response[indice].color = "yellow"
            }
            if(element.issue.sla){
              var menos = element.issue.sla-parseInt(arr[0])

              if(menos > element.issue.sla){
                response[indice].restantes = element.issue.sla + " h"
              }else{
                response[indice].restantes =menos + " h"
              }

            }
            if(parseInt(arr[0]) > element.issue.sla){
              response[indice].pasado = "red"
            }else{
              response[indice].pasado = "green"
            }

            if(element.issue.slaCallCenter){
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].colorCallCenter = "yellow"
              }
              if(element.issue.slaCallCenter){
                var menos = element.issue.slaCallCenter-parseInt(arr[0])

                if(menos > element.issue.slaCallCenter){
                  response[indice].restantesCallCenter =element.issue.slaCallCenter + " h"
                }else{
                  response[indice].restantesCallCenter =menos + " h"
                }

              }
              if(parseInt(arr[0]) > element.issue.slaCallCenter){
                response[indice].pasadoCallCenter = "red"
              }else{
                response[indice].pasadoCallCenter = "green"
              }
            }


            if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname

            if(element.analyst){
              response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
            }
          });
          this.load = false
        }, error=>{
          this.load = false
                var errorMessage = <any>error;
                if(errorMessage != null){
                  this.load = false
                }
              })

    }
    }

    }


    onClickIssue(item){
      this.issue = item
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

  exportFunction(inSolution){
    this.load = true
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    if(this.table==1){
      var data =[]
      var name = 'timcketsNuevos'
    inSolution.forEach((element,index) => {
      data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.statusCallCenter ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
    });

    }else if(this.table==2){
      var data =[]
      var name = 'timcketsPendientes'
    inSolution.forEach((element,index) => {
      data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.statusCallCenter ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'motivoPendiente':((element.pending)?element.pending:'') , 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
    });

    }else if(this.table==3){
      var data =[]
      var name = 'timcketsNuevosCopiados'
    inSolution.forEach((element,index) => {
      data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.statusCallCenter ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
    });

    }else if(this.table==4){
      var data =[]
      var name = 'timcketsPendientesCopiados'
    inSolution.forEach((element,index) => {
      data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.statusCallCenter ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'motivoPendiente':((element.pending)?element.pending:'') , 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
    });

  }else if(this.table==9){
    var data =[]
    var name = 'timcketsEnCallCenter'
  inSolution.forEach((element,index) => {
    data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'slacc': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'restante': ((element.restantesCallCenter)?element.restantesCallCenter:''), 'Estatus': ((element.statusCallCenter)?element.statusCallCenter :'' ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'motivoPendiente':((element.pendingCallCenter)?element.pendingCallCenter:'') , 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
  });

}else if(this.table==5){
  var data =[]
  var name = 'timcketsCallCenter'
inSolution.forEach((element,index) => {
  data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'slacc': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'restante': ((element.restantesCallCenter)?element.restantesCallCenter:''), 'Estatus': ((element.statusCallCenter)?element.statusCallCenter :'' ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.area.name)?element.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'vencido':((element.pasadoCallCenter && element.pasadoCallCenter=='red')?'Si':'')})
});

}else if(this.table==6){
  var data =[]
  var name = 'timcketsCallCenterPendientes'
inSolution.forEach((element,index) => {
  data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'slacc': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'restante': ((element.restantesCallCenter)?element.restantesCallCenter:''), 'Estatus': ((element.statusCallCenter)?element.statusCallCenter :'' ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.area.name)?element.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'motivoPendiente':((element.pendingCallCenter)?element.pendingCallCenter:''), 'vencido':((element.pasadoCallCenter && element.pasadoCallCenter=='red')?'Si':'')})
});

}else if(this.table==7){
  var data =[]
  var name = 'timcketsNuevosAnalistas'
inSolution.forEach((element,index) => {
  data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.status ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.area.name)?element.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
});

}else if(this.table==8){
  var data =[]
  var name = 'timcketsPendientesAnalistas'
inSolution.forEach((element,index) => {
  data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport1), 'hora': this.momentTimeHour(element.dateOfReport1), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'restante': ((element.restantes)?element.restantes:''), 'Estatus': ((element.status)?element.status :element.status ) + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.area.name)?element.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'motivoPendiente':((element.pending)?element.pending:'') , 'vencido':((element.pasado && element.pasado=='red')?'Si':'')})
});

}else {
  this.load = false
  return
}

setTimeout(() => {

if(data){
const worksheet = XLSX.utils.json_to_sheet(data)
const workbook = {
  Sheets:{
    'abiertos': worksheet
  },
  SheetNames:['abiertos']
}
const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE})
fileSaver.saveAs(blobData,name)
this.load = false

}
this.load = false

}, 2000);


  }
}
