import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from '../services/version'

import { Users } from '../models/users';
import * as moment from 'moment';


const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'answer',
    templateUrl: '../views/message.html',
    providers: [RequestProcesService, UsersService],
})

export class MessageComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public dataEncuesta;
    public inProcessTable
    public sortBy = "dateOfReport";
    public load;
    public oldData
    public oldDataTable
    public search= [];
    public link

    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'Mensajes pendientes'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
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
        this._requestProcesService.getMessages(this.identity).subscribe(
            response=>{
                if(response.length>0){
                    response.forEach((element ,indice)=> {

                        var finicial =moment(element.dateOfReport)
                        var ffinal =moment()
                        var minutos = ffinal.diff(finicial, 'minutes')
                        var arr= (minutos/60).toString().split(".")
                        if(element.issue.sla){
                            var menos = element.issue.sla-parseInt(arr[0])
                            response[indice].restantes =menos + " h"
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

                    this.dataEncuesta = response
                    this.inProcessTable = response
                    this.oldData = response
                    this.oldDataTable = response
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

    searchFolio1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchSubcategoria1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchServicio1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchArea1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchEstatus1(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          element.status2= element.status.toUpperCase()
          if(element.status2.indexOf(toSearch)>=0){
            newData.push(element)
          }else{
          }
        });
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchEncuestaComents1(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        this.oldData.forEach(element => {
          if(element.encuestaComents){
            element.encuestaComents2= element.encuestaComents.toUpperCase()
            if(element.encuestaComents2.indexOf(toSearch)>=0){
              newData.push(element)
            }else{
            }
          }
        });
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchReportBy1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchAnalista1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchVencido1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchCritico1(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
        }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

}
