import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from '../services/version'
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'requestClosed',
    templateUrl: '../views/requestClosed.html',
    providers: [UsersService, RequestProcesService]
})

export class RequestClosedComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public inProcessTable
    public inProcess
    public inSolution=[]
    public oldInSolution=[]
    public inSolutionCallCenter=[]
    public oldInSolutionCallCenter=[]
    public sortBy = "dateOfReport";
    public load;
    public oldData
    public oldDataTable
    public search= [];
    public dataEncuesta
    public table
    public statusEx
    public statusExtype
    public link

    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'REQUERIMIENTOS CERRADOS'
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
      this.load = true
      if(this.identity.type!='callCenter'){
        this.table = 2
        this._requestProcesService.allSolucionados(this.identity).subscribe(
            response=>{
              this.oldData = response
              this.oldDataTable = response
              this.inProcessTable = response
              response.forEach((element ,indice)=> {
                if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                if(element.analyst){
                  response[indice].analyst.fnames = element.analyst.fname + element.analyst.lname
                }

                if(element.encuesta ==""){
                    response[indice].encuesta="No"
                }else{
                  if(!element.encuesta){
                    response[indice].encuesta=''
                  }
                }

                if(this.identity.type == "local" || this.identity.type == "areaManager"){

                  if(element.status=='Solucionado' || element.status=='SolucionadoPreventivo' || element.status=='AutoSolucionado'){
                    response[indice].solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.sla){
                      response[indice].pasado = "red"
                    }else{
                      response[indice].pasado = "green"
                    }
                    if(response[indice].issueMore && !response[indice].issueMore.critico){
                      response[indice].issueMore.critico=false
                    }
                    this.inSolution.push(response[indice])
                    this.oldInSolution.push(response[indice])
                  }
                  if((element.statusCallCenter=='SolucionadoCallCenter' || element.statusCallCenter=='SolucionadoPreventivoCallCenter' || element.statusCallCenter=='AutoSolucionado')){
                    response[indice].solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"
  
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.slaCallCenter){
                      response[indice].pasado = "red"
                    }else{
                      response[indice].pasado = "green"
                    }
                    if(response[indice].issueMore && !response[indice].issueMore.critico){
                      response[indice].issueMore.critico=false
                    }
                    this.inSolution.push(response[indice])
                    this.oldInSolution.push(response[indice])
                  }

                }else{

                  if(element.status=='Solucionado' || element.status=='SolucionadoPreventivo' || element.status=='AutoSolucionado'){
                    response[indice].solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.sla){
                      response[indice].pasado = "red"
                    }else{
                      response[indice].pasado = "green"
                    }
                    if(response[indice].issueMore && !response[indice].issueMore.critico){
                      response[indice].issueMore.critico=false
                    }
                    this.inSolution.push(response[indice])
                    this.oldInSolution.push(response[indice])
                  }
                  if((element.statusCallCenter=='SolucionadoCallCenter' || element.statusCallCenter=='SolucionadoPreventivoCallCenter' || element.statusCallCenter=='AutoSolucionado') && element.status){
                    response[indice].solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"
  
                    if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.slaCallCenter){
                      response[indice].pasado = "red"
                    }else{
                      response[indice].pasado = "green"
                    }
                    if(response[indice].issueMore && !response[indice].issueMore.critico){
                      response[indice].issueMore.critico=false
                    }
                    this.inSolutionCallCenter.push(response[indice])
                    this.oldInSolutionCallCenter.push(response[indice])
                  }

                }


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
      }else{
        this.table = 1
        this._requestProcesService.allSolucionadosCallCenter2(this.identity).subscribe(
          response=>{
            for (var i = 0; i < response.length; i++) {

              if(response[i].status && (response[i].status=='Solucionado' || response[i].status=='SolucionadoPreventivo' || response[i].status=='AutoSolucionado')){

                if(!response[i].reportBy.name) response[i].reportBy.name = response[i].reportBy.fname + " " + response[i].reportBy.lname
                if((response[i].solutionTime[0].day*24)+response[i].solutionTime[0].hours > response[i].issue.sla){
                  response[i].pasado = "red"
                }else{
                  response[i].pasado = "green"
                }
                if(response[i].status=='Solucionado'){
                  response[i].solutionTimeNew = response[i].solutionTime[0].day + " d " + response[i].solutionTime[0].hours + " h " + response[i].solutionTime[0].minutes + " m"
                }
                if(response[i].analyst){
                  response[i].analyst.fnames = response[i].analyst.fname + response[i].analyst.lname
                }
  
                if(response[i].encuesta ==""){
                    response[i].encuesta="No"
                }else{
                  if(!response[i].encuesta){
                    response[i].encuesta=''
                  }
                }
                if(response[i].issueMore && !response[i].issueMore.critico){
                  response[i].issueMore.critico=false
                }
                this.inSolution.push(response[i])
                this.oldInSolution.push(response[i])

              }else{

                if(!response[i].reportBy.name) response[i].reportBy.name = response[i].reportBy.fname + " " + response[i].reportBy.lname
                if((response[i].solutionTime[0].day*24)+response[i].solutionTime[0].hours > response[i].issue.slaCallCenter){
                  response[i].pasado = "red"
                }else{
                  response[i].pasado = "green"
                }
                if(response[i].statusCallCenter=='SolucionadoCallCenter'){
                  response[i].solutionTimeNew = response[i].solutionTime[0].day + " d " + response[i].solutionTime[0].hours + " h " + response[i].solutionTime[0].minutes + " m"
                }
                if(response[i].analyst){
                  response[i].analyst.fnames = response[i].analyst.fname + response[i].analyst.lname
                }
  
                if(response[i].encuesta ==""){
                    response[i].encuesta="No"
                }else{
                  if(!response[i].encuesta){
                    response[i].encuesta=''
                  }
                }

                if(response[i].issueMore && !response[i].issueMore.critico){
                  response[i].issueMore.critico=false
                }

                this.inSolutionCallCenter.push(response[i])
                this.oldInSolutionCallCenter.push(response[i])
              }
            }

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
      
                    if(element.issueMore && !element.issueMore.critico){
                      element.issueMore.critico=false
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

    searchCritico(toSearch){
    toSearch= toSearch.toUpperCase()
    var newData = []
    if(toSearch!=""){
      var go =toSearch.toUpperCase()
      go= go.toString()
      this.oldInSolution.forEach(element => {
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
      this.inSolution = this.oldInSolution
    }
  }

  searchCriticoCallCenter(toSearch){
    toSearch= toSearch.toUpperCase()
    var newData = []
    if(toSearch!=""){
      var go =toSearch.toUpperCase()
      go= go.toString()
      this.oldInSolutionCallCenter.forEach(element => {
        if(element.issueMore.critico && element.issueMore.critico==true){
          element.issueMore.critico2="si"
          element.issueMore.critico2=element.issueMore.critico2.toUpperCase()
        if(element.issueMore.critico2.indexOf(go)>=0){
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

    searchNumSerieCall(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldInSolutionCallCenter.forEach(element => {
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
        this.inSolutionCallCenter = this.oldInSolutionCallCenter
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
        var name = 'timcketsSolucionadosCallCenter'
      inSolution.forEach((element,index) => {
        data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'slaCC': ((element.issue.slaCallCenter)?element.issue.slaCallCenter:''), 'tiempoSolucion': ((element.solutionTimeNew)?element.solutionTimeNew:''), 'Estatus': ((element.statusCallCenter)?element.statusCallCenter :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'fechaSolucionCC':((element.dateSolutionCallCenter)?this.momentTimeDate(element.dateSolutionCallCenter): this.momentTimeDate(element.dateSolution)), 'hora2':((element.dateSolutionCallCenter)?this.momentTimeHour(element.dateSolutionCallCenter): this.momentTimeHour(element.dateSolution)), 'vencido':((element.pasado && element.pasado=='red')?'Si':''), 'encuesta':((element.encuesta)?element.encuesta:''), 'comentarioEncuesta': ((element.encuestaComents)?element.encuestaComents:'') })
      });

      }else if(this.table==2){
        var data =[]
        var name = 'timcketsSolucionados'

        if(((this.identity.type=='admin' || this.identity.type=='superAdmin' ) && (this.identity.department._id=='62f2c60e5b1ab6024e9fdfb6'))  || (this.identity.type=='callCenter') ){
          inSolution.forEach((element,index) => {
            data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'estatusExtra': (element.statusExtra)?element.statusExtra: '' , 'estatusExtraMotivo': (element.statusExtraMotivo)?element.statusExtraMotivo: '' , 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'tiempoSolucion': ((element.solutionTimeNew)?element.solutionTimeNew:''), 'Estatus': (((!element.statusCallCenter && element.statusCallCenter!='SolucionadoCallCenter'&& element.statusCallCenter!='SolucionadoPreventivoCallCenter' && element.statusCallCenter!='AutoSolucionado') || (element.statusCallCenter && element.status && (element.status =='Solucionado' || element.status =='SolucionadoPreventivo' || element.status =='AutoSolucionado' )) )? element.status :'') + ((element.statusCallCenter && (element.statusCallCenter=='SolucionadoCallCenter' || element.statusCallCenter=='SolucionadoPreventivoCallCenter' || element.statusCallCenter=='AutoSolucionado')?element.statusCallCenter :'')) +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'fechaSolucion':((element.dateSolution)?this.momentTimeDate(element.dateSolution): this.momentTimeDate(element.dateSolutionCallCenter)), 'hora2':((element.dateSolution)?this.momentTimeHour(element.dateSolution): this.momentTimeHour(element.dateSolutionCallCenter)), 'vencido':((element.pasado && element.pasado=='red')?'Si':''), 'encuesta':((element.encuesta)?element.encuesta:''), 'comentarioEncuesta': ((element.encuestaComents)?element.encuestaComents:'') })
          });
        }else{
          inSolution.forEach((element,index) => {
            data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'tiempoSolucion': ((element.solutionTimeNew)?element.solutionTimeNew:''), 'Estatus': (((!element.statusCallCenter && element.statusCallCenter!='SolucionadoCallCenter'&& element.statusCallCenter!='SolucionadoPreventivoCallCenter' && element.statusCallCenter!='AutoSolucionado') || (element.statusCallCenter && element.status && (element.status =='Solucionado' || element.status =='SolucionadoPreventivo' || element.status =='AutoSolucionado' )) )? element.status :'') + ((element.statusCallCenter && (element.statusCallCenter=='SolucionadoCallCenter' || element.statusCallCenter=='SolucionadoPreventivoCallCenter' || element.statusCallCenter=='AutoSolucionado')?element.statusCallCenter :'')) +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''), 'area': ((element.reportBy.area.name)?element.reportBy.area.name:''), 'analista': ((element.analyst)? element.analyst.fnames:''), 'fechaSolucion':((element.dateSolution)?this.momentTimeDate(element.dateSolution): this.momentTimeDate(element.dateSolutionCallCenter)), 'hora2':((element.dateSolution)?this.momentTimeHour(element.dateSolution): this.momentTimeHour(element.dateSolutionCallCenter)), 'vencido':((element.pasado && element.pasado=='red')?'Si':''), 'encuesta':((element.encuesta)?element.encuesta:''), 'comentarioEncuesta': ((element.encuestaComents)?element.encuestaComents:'') })
          });
        }

      }else if(this.table==3){
        var data =[]
        var name = 'timcketsSolucionadosCallCenter'
      inSolution.forEach((element,index) => {
        data.push({'#': index+1, 'critico': ((element.issueMore.critico && element.issueMore.critico==true)?"Si":''), 'nombreComun':element.codeRequest, 'fechaInicio': this.momentTimeDate(element.dateOfReport), 'hora': this.momentTimeHour(element.dateOfReport), 'subcategoria': ((element.subCategory)?element.subCategory:''), 'servicio':((element.service)?element.service:''), 'numSerie':((element.numSerie)?element.numSerie:''), 'departamento': ((element.issue.category)?element.issue.category:''), 'sla': ((element.issue.sla)?element.issue.sla:''), 'tiempoSolucion': ((element.solutionTimeNew)?element.solutionTimeNew:''), 'Estatus': ((element.statusCallCenter)?element.statusCallCenter :'') +' '+((element.solutionBySucursal && element.solutionBySucursal=='si')?'Por: Sucursal': '') + ' ' + ((element.reaperturado && element.reaperturado[0])?'Reaperturado' :''), 'reportadoPor': ((element.reportBy.name)?element.reportBy.name:'') + ((element.reportByAm) ? ' - ' + element.manager:''),'area': ((element.reportBy.area.name)?element.reportBy.area.name:'') , 'analista': ((element.analyst)? element.analyst.fnames:''), 'fechaSolucionCC':((element.dateSolutionCallCenter)?this.momentTimeDate(element.dateSolutionCallCenter): this.momentTimeDate(element.dateSolution)), 'hora2':((element.dateSolutionCallCenter)?this.momentTimeHour(element.dateSolutionCallCenter): this.momentTimeHour(element.dateSolution)), 'vencido':((element.pasado && element.pasado=='red')?'Si':''), 'encuesta':((element.encuesta)?element.encuesta:''), 'comentarioEncuesta': ((element.encuestaComents)?element.encuestaComents:'') })
      });

      }

  setTimeout(() => {

if(data){
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = {
    Sheets:{
      'solucionados': worksheet
    },
    SheetNames:['solucionados']
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
