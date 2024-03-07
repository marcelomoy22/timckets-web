import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';

import { Users } from '../models/users';
import * as moment from 'moment';


const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'answer',
    templateUrl: '../views/encuesta.html',
    providers: [RequestProcesService, UsersService],
})

export class EncuestaComponent implements OnInit{
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


    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'Encuestas pendientes'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.load = false
    }

    momentTime(date) {
        if (date)
          return moment(date).format('YYYY-MM-DD / HH:mm')
        else
          return ''
      }

    ngOnInit(){

        this.load = true

        this._requestProcesService.getEncuestas(this.identity).subscribe(
            response=>{
                if(response.length>0){
                    this.dataEncuesta = response
                    this.inProcessTable = response
                    this.oldData = response
                    this.oldDataTable = response
                    response.forEach((element ,indice)=> {
                      if(!element.reportBy.name) element.reportBy.name = element.reportBy.fname + " " + element.reportBy.lname
                      if((element.solutionTime[0].day*24)+element.solutionTime[0].hours > element.issue.sla){
                        response[indice].pasado = "red"
                      }else{
                        response[indice].pasado = "green"
                      }
                      if(element.status=='Solucionado'){
                        response[indice].solutionTimeNew = element.solutionTime[0].day + " d " + element.solutionTime[0].hours + " h " + element.solutionTime[0].minutes + " m"
                      }
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
                    });
                    this.load = false


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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }

    searchEstatus(toSearch){
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

    searchEncuestaComents(toSearch){
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
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
        this.dataEncuesta = newData
        this.inProcessTable = newData
      }else{
        this.dataEncuesta = this.oldData
        this.inProcessTable = this.oldData
      }
    }


}
