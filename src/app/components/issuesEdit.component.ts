import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestNewService } from '../services/requestNew.service';
import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'issuesEdit',
    templateUrl: '../views/issuesEdit.html',
    providers: [UsersService, RequestNewService],
})

export class IssuesEditComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public allIsues;
    public issue;
    public issueTabla;
    public departments;
    public newIssue;
    public analyst;
    public copiados;
    public usersAdmins;
    public emailToSend;
    public load;
    public campo;
    public sortBy = "category";
    public search= [];
    public oldData
    public zonesToAnalyst
    public zonesNLAnalyst
    public zonesNLCopiados
    public zonesCoahilaAnalyst
    public zonesCoahilaCopiados
    public zonesQueretaroAnalyst
    public zonesQueretaroCopiados
    public zonesMexicoAnalyst
    public zonesMexicoCopiados

    constructor(
        private _userService: UsersService,
        private _requestNewService: RequestNewService,
    ){
        this.title = 'Agregar Servicios'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.analyst = {
          analyst1 :'',
          analyst2 :'',
          analyst3 :'',
          analyst4 :''
        },
        this.copiados = {
          copiados1 :'',
          copiados2 :'',
          copiados3 :'',
          copiados4 :'',
          copiados5 :'',
          copiados6 :'',
          copiados7 :'',
          copiados8 :'',
        },
        this.zonesNLAnalyst = {
          analyst1 :'',
          analyst2 :'',
          analyst3 :'',
          analyst4 :''
        },
        this.zonesNLCopiados = {
          copiados1 :'',
          copiados2 :'',
          copiados3 :'',
          copiados4 :'',
          copiados5 :'',
          copiados6 :'',
          copiados7 :'',
          copiados8 :'',
        },
        this.zonesCoahilaAnalyst = {
          analyst1 :'',
          analyst2 :'',
          analyst3 :'',
          analyst4 :''
        },
        this.zonesCoahilaCopiados = {
          copiados1 :'',
          copiados2 :'',
          copiados3 :'',
          copiados4 :'',
          copiados5 :'',
          copiados6 :'',
          copiados7 :'',
          copiados8 :'',
        },
        this.zonesQueretaroAnalyst = {
          analyst1 :'',
          analyst2 :'',
          analyst3 :'',
          analyst4 :''
        },
        this.zonesQueretaroCopiados = {
          copiados1 :'',
          copiados2 :'',
          copiados3 :'',
          copiados4 :'',
          copiados5 :'',
          copiados6 :'',
          copiados7 :'',
          copiados8 :'',
        },
        this.zonesMexicoAnalyst = {
          analyst1 :'',
          analyst2 :'',
          analyst3 :'',
          analyst4 :''
        },
        this.zonesMexicoCopiados = {
          copiados1 :'',
          copiados2 :'',
          copiados3 :'',
          copiados4 :'',
          copiados5 :'',
          copiados6 :'',
          copiados7 :'',
          copiados8 :'',
        },

        this.load = false
        this.campo={
          foto: false,
          numReport: false,
          nombreTimMember: false,
          numNomina: false,
          cantBolsasComprobantes: false,
          numBolsaTipoCaja: false,
          numOrden: false,
          producto: false,
          lote: false,
          cantidad: false,
          numSerie: false,
          marca: false,
          menuboards: false,
          dt: false,
          kds: false,
          email: false,
          pos: false,
          medidas: false,
          video: false,
        }
        this.zonesToAnalyst ={
          general: false,
          porEstado: false
        }
    }


    ngOnInit(){
        this._requestNewService.getAllIssuesNormal(this.identity).subscribe(
            response=>{
              this.allIsues = response
              this.oldData = response

              response.forEach((element ,indice)=> {
                if(element.active==true){
                    response[indice].activo="Si"
                }else{
                  response[indice].activo="No"
                }
              });
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                swal("Error!", "errrrrrr", "error");
              }
            }
          )
          this._userService.getDepartments(this.identity).subscribe(
            response=>{
                this.departments = response
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                swal("Error!", "errrrrrr", "error");
              }
            }
          )
          this._userService.getAdminUsers().subscribe(
            usersAdmin=>{
                this.usersAdmins = usersAdmin
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )
        
    }

    issueClick(issue){
      if(issue.campo){
        this.campo= issue.campo
      }else{
        this.campo={
          foto: false,
          numReport: false,
          nombreTimMember: false,
          numNomina: false,
          cantBolsasComprobantes: false,
          numBolsaTipoCaja: false,
          numOrden: false,
          producto: false,
          lote: false,
          cantidad: false,
          numSerie: false,
          marca: false,
          menuboards: false,
          dt: false,
          kds: false,
          email: false,
          pos: false,
          medidas: false,
          video: false,
        }      
      }
        this.issue = issue
        this.newIssue = issue
        if(issue.departments && issue.departments._id){
            this.newIssue.departments = issue.departments._id
        }else{
            this.newIssue.departments =''
        }
        if(this.issue.emailToSendAnalist ){
            if(this.issue.emailToSendAnalist[0]){
                this.analyst.analyst1 = this.issue.emailToSendAnalist[0]
            }else{
                this.analyst.analyst1 = ''
            }
            if(this.issue.emailToSendAnalist[1]){
                this.analyst.analyst2 = this.issue.emailToSendAnalist[1]
            }else{
                this.analyst.analyst2 = ''
            }
            if(this.issue.emailToSendAnalist[2]){
              this.analyst.analyst3 = this.issue.emailToSendAnalist[2]
          }else{
              this.analyst.analyst3 = ''
          }
          if(this.issue.emailToSendAnalist[3]){
            this.analyst.analyst4 = this.issue.emailToSendAnalist[3]
        }else{
            this.analyst.analyst4 = ''
        }
        }else{
            this.analyst.analyst1 = ''
            this.analyst.analyst2 = ''
            this.analyst.analyst3 = ''
            this.analyst.analyst4 = ''
        }
        if(this.issue.emailToSendCopy ){
          if(this.issue.emailToSendCopy[0]){
              this.copiados.copiados1 = this.issue.emailToSendCopy[0]
          }else{
              this.copiados.copiados1 = ''
          }
          if(this.issue.emailToSendCopy[1]){
              this.copiados.copiados2 = this.issue.emailToSendCopy[1]
          }else{
              this.copiados.copiados2 = ''
          }
          if(this.issue.emailToSendCopy[2]){
            this.copiados.copiados3 = this.issue.emailToSendCopy[2]
          }else{
            this.copiados.copiados3 = ''
          }
          if(this.issue.emailToSendCopy[3]){
            this.copiados.copiados4 = this.issue.emailToSendCopy[3]
          }else{
            this.copiados.copiados4 = ''
          }
          if(this.issue.emailToSendCopy[4]){
            this.copiados.copiados5 = this.issue.emailToSendCopy[4]
          }else{
            this.copiados.copiados5 = ''
          }
          if(this.issue.emailToSendCopy[5]){
            this.copiados.copiados6 = this.issue.emailToSendCopy[5]
          }else{
            this.copiados.copiados6 = ''
          }
          if(this.issue.emailToSendCopy[6]){
            this.copiados.copiados7 = this.issue.emailToSendCopy[6]
          }else{
            this.copiados.copiados7 = ''
          }
          if(this.issue.emailToSendCopy[7]){
            this.copiados.copiados8 = this.issue.emailToSendCopy[7]
          }else{
            this.copiados.copiados8 = ''
          }
      }else{
          this.copiados.copiados1 = ''
          this.copiados.copiados2 = ''
          this.copiados.copiados3 = ''
          this.copiados.copiados4 = ''
          this.copiados.copiados5 = ''
          this.copiados.copiados6 = ''
          this.copiados.copiados7 = ''
          this.copiados.copiados8 = ''
      }

        if(this.issue.format == 'dia'){
            this.newIssue.dia = true
        }
        if(this.issue.format == 'hora'){
            this.newIssue.hora = true
        }


        if(this.issue.zonesToAnalyst && this.issue.zonesToAnalyst.porEstado==true){
          this.zonesToAnalyst ={
            general: false,
            porEstado: true
          }


          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLAnalyst && this.issue.zonesNL.zonesNLAnalyst[0] && this.issue.zonesNL.zonesNLAnalyst[0] !=''){
            this.zonesNLAnalyst.analyst1 = this.issue.zonesNL.zonesNLAnalyst[0]
          }else{
            this.zonesNLAnalyst.analyst1 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLAnalyst && this.issue.zonesNL.zonesNLAnalyst[1] && this.issue.zonesNL.zonesNLAnalyst[1] !=''){
            this.zonesNLAnalyst.analyst2 = this.issue.zonesNL.zonesNLAnalyst[1]
          }else{
            this.zonesNLAnalyst.analyst2 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLAnalyst && this.issue.zonesNL.zonesNLAnalyst[2] && this.issue.zonesNL.zonesNLAnalyst[2] !=''){
            this.zonesNLAnalyst.analyst3 = this.issue.zonesNL.zonesNLAnalyst[2]
          }else{
            this.zonesNLAnalyst.analyst3 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLAnalyst && this.issue.zonesNL.zonesNLAnalyst[3] && this.issue.zonesNL.zonesNLAnalyst[3] !=''){
            this.zonesNLAnalyst.analyst4 = this.issue.zonesNL.zonesNLAnalyst[3]
          }else{
            this.zonesNLAnalyst.analyst4 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[0] && this.issue.zonesNL.zonesNLCopiados[0] !=''){
            this.zonesNLCopiados.copiados1 = this.issue.zonesNL.zonesNLCopiados[0]
          }else{
            this.zonesNLCopiados.copiados1 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[1] && this.issue.zonesNL.zonesNLCopiados[1] !=''){
            this.zonesNLCopiados.copiados2 = this.issue.zonesNL.zonesNLCopiados[1]
          }else{
            this.zonesNLCopiados.copiados2 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[2] && this.issue.zonesNL.zonesNLCopiados[2] !=''){
            this.zonesNLCopiados.copiados3 = this.issue.zonesNL.zonesNLCopiados[2]
          }else{
            this.zonesNLCopiados.copiados3 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[3] && this.issue.zonesNL.zonesNLCopiados[3] !=''){
            this.zonesNLCopiados.copiados4 = this.issue.zonesNL.zonesNLCopiados[3]
          }else{
            this.zonesNLCopiados.copiados4 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[4] && this.issue.zonesNL.zonesNLCopiados[4] !=''){
            this.zonesNLCopiados.copiados5 = this.issue.zonesNL.zonesNLCopiados[4]
          }else{
            this.zonesNLCopiados.copiados5 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[5] && this.issue.zonesNL.zonesNLCopiados[5] !=''){
            this.zonesNLCopiados.copiados6 = this.issue.zonesNL.zonesNLCopiados[5]
          }else{
            this.zonesNLCopiados.copiados6 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[6] && this.issue.zonesNL.zonesNLCopiados[6] !=''){
            this.zonesNLCopiados.copiados7 = this.issue.zonesNL.zonesNLCopiados[6]
          }else{
            this.zonesNLCopiados.copiados7 = ''
          }
          if(this.issue.zonesNL && this.issue.zonesNL.zonesNLCopiados && this.issue.zonesNL.zonesNLCopiados[7] && this.issue.zonesNL.zonesNLCopiados[7] !=''){
            this.zonesNLCopiados.copiados8 = this.issue.zonesNL.zonesNLCopiados[7]
          }else{
            this.zonesNLCopiados.copiados8 = ''
          }


          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaAnalyst && this.issue.zonesCoahila.zonesCoahilaAnalyst[0] && this.issue.zonesCoahila.zonesCoahilaAnalyst[0] !=''){
            this.zonesCoahilaAnalyst.analyst1 = this.issue.zonesCoahila.zonesCoahilaAnalyst[0]
          }else{
            this.zonesCoahilaAnalyst.analyst1 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaAnalyst && this.issue.zonesCoahila.zonesCoahilaAnalyst[1] && this.issue.zonesCoahila.zonesCoahilaAnalyst[1] !=''){
            this.zonesCoahilaAnalyst.analyst2 = this.issue.zonesCoahila.zonesCoahilaAnalyst[1]
          }else{
            this.zonesCoahilaAnalyst.analyst2 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaAnalyst && this.issue.zonesCoahila.zonesCoahilaAnalyst[2] && this.issue.zonesCoahila.zonesCoahilaAnalyst[2] !=''){
            this.zonesCoahilaAnalyst.analyst3 = this.issue.zonesCoahila.zonesCoahilaAnalyst[2]
          }else{
            this.zonesCoahilaAnalyst.analyst3 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaAnalyst && this.issue.zonesCoahila.zonesCoahilaAnalyst[3] && this.issue.zonesCoahila.zonesCoahilaAnalyst[3] !=''){
            this.zonesCoahilaAnalyst.analyst4 = this.issue.zonesCoahila.zonesCoahilaAnalyst[3]
          }else{
            this.zonesCoahilaAnalyst.analyst4 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[0] && this.issue.zonesCoahila.zonesCoahilaCopiados[0] !=''){
            this.zonesCoahilaCopiados.copiados1 = this.issue.zonesCoahila.zonesCoahilaCopiados[0]
          }else{
            this.zonesCoahilaCopiados.copiados1 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[1] && this.issue.zonesCoahila.zonesCoahilaCopiados[1] !=''){
            this.zonesCoahilaCopiados.copiados2 = this.issue.zonesCoahila.zonesCoahilaCopiados[1]
          }else{
            this.zonesCoahilaCopiados.copiados2 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[2] && this.issue.zonesCoahila.zonesCoahilaCopiados[2] !=''){
            this.zonesCoahilaCopiados.copiados3 = this.issue.zonesCoahila.zonesCoahilaCopiados[2]
          }else{
            this.zonesCoahilaCopiados.copiados3 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[3] && this.issue.zonesCoahila.zonesCoahilaCopiados[3] !=''){
            this.zonesCoahilaCopiados.copiados4 = this.issue.zonesCoahila.zonesCoahilaCopiados[3]
          }else{
            this.zonesCoahilaCopiados.copiados4 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[4] && this.issue.zonesCoahila.zonesCoahilaCopiados[4] !=''){
            this.zonesCoahilaCopiados.copiados5 = this.issue.zonesCoahila.zonesCoahilaCopiados[4]
          }else{
            this.zonesCoahilaCopiados.copiados5 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[5] && this.issue.zonesCoahila.zonesCoahilaCopiados[5] !=''){
            this.zonesCoahilaCopiados.copiados6 = this.issue.zonesCoahila.zonesCoahilaCopiados[5]
          }else{
            this.zonesCoahilaCopiados.copiados6 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[6] && this.issue.zonesCoahila.zonesCoahilaCopiados[6] !=''){
            this.zonesCoahilaCopiados.copiados7 = this.issue.zonesCoahila.zonesCoahilaCopiados[6]
          }else{
            this.zonesCoahilaCopiados.copiados7 = ''
          }
          if(this.issue.zonesCoahila && this.issue.zonesCoahila.zonesCoahilaCopiados && this.issue.zonesCoahila.zonesCoahilaCopiados[7] && this.issue.zonesCoahila.zonesCoahilaCopiados[7] !=''){
            this.zonesCoahilaCopiados.copiados8 = this.issue.zonesCoahila.zonesCoahilaCopiados[7]
          }else{
            this.zonesCoahilaCopiados.copiados8 = ''
          }



          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroAnalyst && this.issue.zonesQueretaro.zonesQueretaroAnalyst[0] && this.issue.zonesQueretaro.zonesQueretaroAnalyst[0] !=''){
            this.zonesQueretaroAnalyst.analyst1 = this.issue.zonesQueretaro.zonesQueretaroAnalyst[0]
          }else{
            this.zonesQueretaroAnalyst.analyst1 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroAnalyst && this.issue.zonesQueretaro.zonesQueretaroAnalyst[1] && this.issue.zonesQueretaro.zonesQueretaroAnalyst[1] !=''){
            this.zonesQueretaroAnalyst.analyst2 = this.issue.zonesQueretaro.zonesQueretaroAnalyst[1]
          }else{
            this.zonesQueretaroAnalyst.analyst2 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroAnalyst && this.issue.zonesQueretaro.zonesQueretaroAnalyst[2] && this.issue.zonesQueretaro.zonesQueretaroAnalyst[2] !=''){
            this.zonesQueretaroAnalyst.analyst3 = this.issue.zonesQueretaro.zonesQueretaroAnalyst[2]
          }else{
            this.zonesQueretaroAnalyst.analyst3 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroAnalyst && this.issue.zonesQueretaro.zonesQueretaroAnalyst[3] && this.issue.zonesQueretaro.zonesQueretaroAnalyst[3] !=''){
            this.zonesQueretaroAnalyst.analyst4 = this.issue.zonesQueretaro.zonesQueretaroAnalyst[3]
          }else{
            this.zonesQueretaroAnalyst.analyst4 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[0] && this.issue.zonesQueretaro.zonesQueretaroCopiados[0] !=''){
            this.zonesQueretaroCopiados.copiados1 = this.issue.zonesQueretaro.zonesQueretaroCopiados[0]
          }else{
            this.zonesQueretaroCopiados.copiados1 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[1] && this.issue.zonesQueretaro.zonesQueretaroCopiados[1] !=''){
            this.zonesQueretaroCopiados.copiados2 = this.issue.zonesQueretaro.zonesQueretaroCopiados[1]
          }else{
            this.zonesQueretaroCopiados.copiados2 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[2] && this.issue.zonesQueretaro.zonesQueretaroCopiados[2] !=''){
            this.zonesQueretaroCopiados.copiados3 = this.issue.zonesQueretaro.zonesQueretaroCopiados[2]
          }else{
            this.zonesQueretaroCopiados.copiados3 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[3] && this.issue.zonesQueretaro.zonesQueretaroCopiados[3] !=''){
            this.zonesQueretaroCopiados.copiados4 = this.issue.zonesQueretaro.zonesQueretaroCopiados[3]
          }else{
            this.zonesQueretaroCopiados.copiados4 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[4] && this.issue.zonesQueretaro.zonesQueretaroCopiados[4] !=''){
            this.zonesQueretaroCopiados.copiados5 = this.issue.zonesQueretaro.zonesQueretaroCopiados[4]
          }else{
            this.zonesQueretaroCopiados.copiados5 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[5] && this.issue.zonesQueretaro.zonesQueretaroCopiados[5] !=''){
            this.zonesQueretaroCopiados.copiados6 = this.issue.zonesQueretaro.zonesQueretaroCopiados[5]
          }else{
            this.zonesQueretaroCopiados.copiados6 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[6] && this.issue.zonesQueretaro.zonesQueretaroCopiados[6] !=''){
            this.zonesQueretaroCopiados.copiados7 = this.issue.zonesQueretaro.zonesQueretaroCopiados[6]
          }else{
            this.zonesQueretaroCopiados.copiados7 = ''
          }
          if(this.issue.zonesQueretaro && this.issue.zonesQueretaro.zonesQueretaroCopiados && this.issue.zonesQueretaro.zonesQueretaroCopiados[7] && this.issue.zonesQueretaro.zonesQueretaroCopiados[7] !=''){
            this.zonesQueretaroCopiados.copiados8 = this.issue.zonesQueretaro.zonesQueretaroCopiados[7]
          }else{
            this.zonesQueretaroCopiados.copiados8 = ''
          }




          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoAnalyst && this.issue.zonesMexico.zonesMexicoAnalyst[0] && this.issue.zonesMexico.zonesMexicoAnalyst[0] !=''){
            this.zonesMexicoAnalyst.analyst1 = this.issue.zonesMexico.zonesMexicoAnalyst[0]
          }else{
            this.zonesMexicoAnalyst.analyst1 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoAnalyst && this.issue.zonesMexico.zonesMexicoAnalyst[1] && this.issue.zonesMexico.zonesMexicoAnalyst[1] !=''){
            this.zonesMexicoAnalyst.analyst2 = this.issue.zonesMexico.zonesMexicoAnalyst[1]
          }else{
            this.zonesMexicoAnalyst.analyst2 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoAnalyst && this.issue.zonesMexico.zonesMexicoAnalyst[2] && this.issue.zonesMexico.zonesMexicoAnalyst[2] !=''){
            this.zonesMexicoAnalyst.analyst3 = this.issue.zonesMexico.zonesMexicoAnalyst[2]
          }else{
            this.zonesMexicoAnalyst.analyst3 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoAnalyst && this.issue.zonesMexico.zonesMexicoAnalyst[3] && this.issue.zonesMexico.zonesMexicoAnalyst[3] !=''){
            this.zonesMexicoAnalyst.analyst4 = this.issue.zonesMexico.zonesMexicoAnalyst[3]
          }else{
            this.zonesMexicoAnalyst.analyst4 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[0] && this.issue.zonesMexico.zonesMexicoCopiados[0] !=''){
            this.zonesMexicoCopiados.copiados1 = this.issue.zonesMexico.zonesMexicoCopiados[0]
          }else{
            this.zonesMexicoCopiados.copiados1 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[1] && this.issue.zonesMexico.zonesMexicoCopiados[1] !=''){
            this.zonesMexicoCopiados.copiados2 = this.issue.zonesMexico.zonesMexicoCopiados[1]
          }else{
            this.zonesMexicoCopiados.copiados2 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[2] && this.issue.zonesMexico.zonesMexicoCopiados[2] !=''){
            this.zonesMexicoCopiados.copiados3 = this.issue.zonesMexico.zonesMexicoCopiados[2]
          }else{
            this.zonesMexicoCopiados.copiados3 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[3] && this.issue.zonesMexico.zonesMexicoCopiados[3] !=''){
            this.zonesMexicoCopiados.copiados4 = this.issue.zonesMexico.zonesMexicoCopiados[3]
          }else{
            this.zonesMexicoCopiados.copiados4 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[4] && this.issue.zonesMexico.zonesMexicoCopiados[4] !=''){
            this.zonesMexicoCopiados.copiados5 = this.issue.zonesMexico.zonesMexicoCopiados[4]
          }else{
            this.zonesMexicoCopiados.copiados5 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[5] && this.issue.zonesMexico.zonesMexicoCopiados[5] !=''){
            this.zonesMexicoCopiados.copiados6 = this.issue.zonesMexico.zonesMexicoCopiados[5]
          }else{
            this.zonesMexicoCopiados.copiados6 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[6] && this.issue.zonesMexico.zonesMexicoCopiados[6] !=''){
            this.zonesMexicoCopiados.copiados7 = this.issue.zonesMexico.zonesMexicoCopiados[6]
          }else{
            this.zonesMexicoCopiados.copiados7 = ''
          }
          if(this.issue.zonesMexico && this.issue.zonesMexico.zonesMexicoCopiados && this.issue.zonesMexico.zonesMexicoCopiados[7] && this.issue.zonesMexico.zonesMexicoCopiados[7] !=''){
            this.zonesMexicoCopiados.copiados8 = this.issue.zonesMexico.zonesMexicoCopiados[7]
          }else{
            this.zonesMexicoCopiados.copiados8 = ''
          }


        }else{
          this.zonesToAnalyst ={
            general: true,
            porEstado: false
          }
          this.zonesNLAnalyst = {
            analyst1 :'',
            analyst2 :'',
            analyst3 :'',
            analyst4 :''
          },
          this.zonesNLCopiados = {
            copiados1 :'',
            copiados2 :'',
            copiados3 :'',
            copiados4 :'',
            copiados5 :'',
            copiados6 :'',
            copiados7 :'',
            copiados8 :'',
          },
          this.zonesCoahilaAnalyst = {
            analyst1 :'',
            analyst2 :'',
            analyst3 :'',
            analyst4 :''
          },
          this.zonesCoahilaCopiados = {
            copiados1 :'',
            copiados2 :'',
            copiados3 :'',
            copiados4 :'',
            copiados5 :'',
            copiados6 :'',
            copiados7 :'',
            copiados8 :'',
          },
          this.zonesQueretaroAnalyst = {
            analyst1 :'',
            analyst2 :'',
            analyst3 :'',
            analyst4 :''
          },
          this.zonesQueretaroCopiados = {
            copiados1 :'',
            copiados2 :'',
            copiados3 :'',
            copiados4 :'',
            copiados5 :'',
            copiados6 :'',
            copiados7 :'',
            copiados8 :'',
          },
          this.zonesMexicoAnalyst = {
            analyst1 :'',
            analyst2 :'',
            analyst3 :'',
            analyst4 :''
          },
          this.zonesMexicoCopiados = {
            copiados1 :'',
            copiados2 :'',
            copiados3 :'',
            copiados4 :'',
            copiados5 :'',
            copiados6 :'',
            copiados7 :'',
            copiados8 :'',
          }
        }
    }

    boxHora(){
        this.newIssue.hora =true
        this.newIssue.dia =false
      }
      boxDia(){
        this.newIssue.hora =false
        this.newIssue.dia =true
      }

    uatdarCambio(editIssue){
      editIssue.campo = this.campo
      editIssue.zonesToAnalyst = this.zonesToAnalyst
      if(editIssue.departments && editIssue.service && editIssue.subcategory && editIssue.sla && (editIssue.zonesToAnalyst.general== true || editIssue.zonesToAnalyst.porEstado== true)){
        if(this.zonesToAnalyst.porEstado==false || (this.zonesToAnalyst.porEstado==true &&(this.zonesNLAnalyst.analyst1!='' && this.zonesCoahilaAnalyst.analyst1!='' && this.zonesQueretaroAnalyst.analyst1!='' && this.zonesMexicoAnalyst.analyst1!=''))){

        this.load = true
        if(editIssue.dia == true){
            editIssue.format = 'dia'
          }else if(editIssue.hora == true){
            editIssue.format = 'hora'
          }
        
        if(this.analyst.analyst1 !='' ){
          editIssue.emailToSendAnalist[0] = this.analyst.analyst1
        }else{
          editIssue.emailToSendAnalist[0] =null
          editIssue.emailToSendAnalist[1] =null
          editIssue.emailToSendAnalist[2] =null
          editIssue.emailToSendAnalist[3] =null
          this.analyst.analyst2 =''
          this.analyst.analyst3 =''
          this.analyst.analyst4 =''
        }
        if(this.analyst.analyst2 !='' ){
          editIssue.emailToSendAnalist[1] = this.analyst.analyst2
        }else{
          editIssue.emailToSendAnalist[1] =null
          editIssue.emailToSendAnalist[2] =null
          editIssue.emailToSendAnalist[3] =null
          this.analyst.analyst3 =''
          this.analyst.analyst4 =''  
        }
        if(this.analyst.analyst3 !='' ){
          editIssue.emailToSendAnalist[2] = this.analyst.analyst3
        }else{
          editIssue.emailToSendAnalist[2] =null
          editIssue.emailToSendAnalist[3] =null
          this.analyst.analyst4 =''  
        }
        if(this.analyst.analyst4 !='' ){
          editIssue.emailToSendAnalist[3] = this.analyst.analyst4
        }else{
          editIssue.emailToSendAnalist[3] =null
        }

        if(this.copiados.copiados1 !='' ){
          editIssue.emailToSendCopy[0] = this.copiados.copiados1
        }else{
          editIssue.emailToSendCopy[0] =null
          this.copiados.copiados2=null
          this.copiados.copiados3=null
          this.copiados.copiados4=null
          this.copiados.copiados5=null
          this.copiados.copiados6=null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        }   
        if(this.copiados.copiados2 !='' ){
          editIssue.emailToSendCopy[1] = this.copiados.copiados2
        }else{editIssue.emailToSendCopy[1] =null
          this.copiados.copiados3=null
          this.copiados.copiados4=null
          this.copiados.copiados5=null
          this.copiados.copiados6=null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        }     
        if(this.copiados.copiados3 !='' ){
          editIssue.emailToSendCopy[2] = this.copiados.copiados3
        }else{editIssue.emailToSendCopy[2] =null
          this.copiados.copiados4=null
          this.copiados.copiados5=null
          this.copiados.copiados6=null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        }    
        if(this.copiados.copiados4 !='' ){
          editIssue.emailToSendCopy[3] = this.copiados.copiados4
        }else{editIssue.emailToSendCopy[3] =null
          this.copiados.copiados5=null
          this.copiados.copiados6=null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        } 
        if(this.copiados.copiados5 !='' ){
          editIssue.emailToSendCopy[4] = this.copiados.copiados5
        }else{editIssue.emailToSendCopy[4] =null
          this.copiados.copiados6=null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        }      
        if(this.copiados.copiados6 !='' ){
          editIssue.emailToSendCopy[5] = this.copiados.copiados6
        }else{editIssue.emailToSendCopy[5] =null
          this.copiados.copiados7=null
          this.copiados.copiados8=null
        }    
        if(this.copiados.copiados7 !='' ){
          editIssue.emailToSendCopy[6] = this.copiados.copiados7
        }else{editIssue.emailToSendCopy[6] =null
          this.copiados.copiados8=null
        }   
        if(this.copiados.copiados8 !='' ){
          editIssue.emailToSendCopy[7] = this.copiados.copiados8
        }else{editIssue.emailToSendCopy[7] =null
        }    


          if(editIssue.active == "false"){
            editIssue.active = false
          }

          if(editIssue.active == "true"){
            editIssue.active = true
          }

        if(editIssue.zonesToAnalyst.porEstado== true){
          editIssue.zonesNL={
            zonesNLAnalyst:[this.zonesNLAnalyst.analyst1,this.zonesNLAnalyst.analyst2,this.zonesNLAnalyst.analyst3,this.zonesNLAnalyst.analyst4],
            zonesNLCopiados:[this.zonesNLCopiados.copiados1, this.zonesNLCopiados.copiados2, this.zonesNLCopiados.copiados3, this.zonesNLCopiados.copiados4, this.zonesNLCopiados.copiados5, this.zonesNLCopiados.copiados6, this.zonesNLCopiados.copiados7, this.zonesNLCopiados.copiados8]
          }
          editIssue.zonesCoahila={
            zonesCoahilaAnalyst:[this.zonesCoahilaAnalyst.analyst1,this.zonesCoahilaAnalyst.analyst2,this.zonesCoahilaAnalyst.analyst3,this.zonesCoahilaAnalyst.analyst4],
            zonesCoahilaCopiados:[this.zonesCoahilaCopiados.copiados1, this.zonesCoahilaCopiados.copiados2, this.zonesCoahilaCopiados.copiados3, this.zonesCoahilaCopiados.copiados4, this.zonesCoahilaCopiados.copiados5, this.zonesCoahilaCopiados.copiados6, this.zonesCoahilaCopiados.copiados7, this.zonesCoahilaCopiados.copiados8]
          }
          editIssue.zonesQueretaro={
            zonesQueretaroAnalyst:[this.zonesQueretaroAnalyst.analyst1,this.zonesQueretaroAnalyst.analyst2,this.zonesQueretaroAnalyst.analyst3,this.zonesQueretaroAnalyst.analyst4],
            zonesQueretaroCopiados:[this.zonesQueretaroCopiados.copiados1, this.zonesQueretaroCopiados.copiados2, this.zonesQueretaroCopiados.copiados3, this.zonesQueretaroCopiados.copiados4, this.zonesQueretaroCopiados.copiados5, this.zonesQueretaroCopiados.copiados6, this.zonesQueretaroCopiados.copiados7, this.zonesQueretaroCopiados.copiados8]
          }  
          editIssue.zonesMexico={
            zonesMexicoAnalyst:[this.zonesMexicoAnalyst.analyst1,this.zonesMexicoAnalyst.analyst2,this.zonesMexicoAnalyst.analyst3,this.zonesMexicoAnalyst.analyst4],
            zonesMexicoCopiados:[this.zonesMexicoCopiados.copiados1, this.zonesMexicoCopiados.copiados2, this.zonesMexicoCopiados.copiados3, this.zonesMexicoCopiados.copiados4, this.zonesMexicoCopiados.copiados5, this.zonesMexicoCopiados.copiados6, this.zonesMexicoCopiados.copiados7, this.zonesMexicoCopiados.copiados8]
          }     
        }else{
        }

        if(editIssue.zonesToAnalyst.porEstado== true && this.zonesNLAnalyst.analyst1!= ''){
          editIssue.zonesNL.zonesNLAnalyst[0] = this.zonesNLAnalyst.analyst1
        }else{
          editIssue.zonesNL.zonesNLAnalyst[0] = null
          editIssue.zonesNL.zonesNLAnalyst[1] = null
          editIssue.zonesNL.zonesNLAnalyst[2] = null
          editIssue.zonesNL.zonesNLAnalyst[3] = null
          this.zonesNLAnalyst.analyst1= ''
          this.zonesNLAnalyst.analyst2= ''
          this.zonesNLAnalyst.analyst3= ''
          this.zonesNLAnalyst.analyst4= ''
        }
        if(editIssue.zonesToAnalyst.porEstado== true && this.zonesNLAnalyst.analyst2!= ''){
          editIssue.zonesNL.zonesNLAnalyst[1] = this.zonesNLAnalyst.analyst2
        }else{
          editIssue.zonesNL.zonesNLAnalyst[1] = null
          editIssue.zonesNL.zonesNLAnalyst[2] = null
          editIssue.zonesNL.zonesNLAnalyst[3] = null
          this.zonesNLAnalyst.analyst2= ''
          this.zonesNLAnalyst.analyst3= ''
          this.zonesNLAnalyst.analyst4= ''
        }
        if(editIssue.zonesToAnalyst.porEstado== true && this.zonesNLAnalyst.analyst3!= ''){
          editIssue.zonesNL.zonesNLAnalyst[2] = this.zonesNLAnalyst.analyst3
        }else{
          editIssue.zonesNL.zonesNLAnalyst[2] = null
          editIssue.zonesNL.zonesNLAnalyst[3] = null
          this.zonesNLAnalyst.analyst3= ''
          this.zonesNLAnalyst.analyst4= ''
        }
        if(editIssue.zonesToAnalyst.porEstado== true && this.zonesNLAnalyst.analyst4!= ''){
          editIssue.zonesNL.zonesNLAnalyst[3] = this.zonesNLAnalyst.analyst4
        }else{
          editIssue.zonesNL.zonesNLAnalyst[3] = null
          this.zonesNLAnalyst.analyst4= ''
        }

        if(editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados1!= ''){
          editIssue.zonesNL.zonesNLCopiados[0] = this.zonesNLCopiados.copiados1
        }else{
          editIssue.zonesNL.zonesNLCopiados[0] = null
          this.zonesNLCopiados.copiados1= ''
          this.zonesNLCopiados.copiados2= ''
          this.zonesNLCopiados.copiados3= ''
          this.zonesNLCopiados.copiados4= ''
          this.zonesNLCopiados.copiados5= ''
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados2!= ''){
          editIssue.zonesNL.zonesNLCopiados[1] = this.zonesNLCopiados.copiados2
        }else{
          editIssue.zonesNL.zonesNLCopiados[1] = null
          this.zonesNLCopiados.copiados2= ''
          this.zonesNLCopiados.copiados3= ''
          this.zonesNLCopiados.copiados4= ''
          this.zonesNLCopiados.copiados5= ''
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados3!= ''){
          editIssue.zonesNL.zonesNLCopiados[2] = this.zonesNLCopiados.copiados3
        }else{
          editIssue.zonesNL.zonesNLCopiados[2] = null
          this.zonesNLCopiados.copiados3= ''
          this.zonesNLCopiados.copiados4= ''
          this.zonesNLCopiados.copiados5= ''
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados4!= ''){
          editIssue.zonesNL.zonesNLCopiados[3] = this.zonesNLCopiados.copiados4
        }else{
          editIssue.zonesNL.zonesNLCopiados[3] = null
          this.zonesNLCopiados.copiados4= ''
          this.zonesNLCopiados.copiados5= ''
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados5!= ''){
          editIssue.zonesNL.zonesNLCopiados[4] = this.zonesNLCopiados.copiados5
        }else{
          editIssue.zonesNL.zonesNLCopiados[4] = null
          this.zonesNLCopiados.copiados5= ''
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados6!= ''){
          editIssue.zonesNL.zonesNLCopiados[5] = this.zonesNLCopiados.copiados6
        }else{
          editIssue.zonesNL.zonesNLCopiados[5] = null
          this.zonesNLCopiados.copiados6= ''
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados7!= ''){
          editIssue.zonesNL.zonesNLCopiados[6] = this.zonesNLCopiados.copiados7
        }else{
          editIssue.zonesNL.zonesNLCopiados[6] = null
          this.zonesNLCopiados.copiados7= ''
          this.zonesNLCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesNLCopiados.copiados8!= ''){
          editIssue.zonesNL.zonesNLCopiados[7] = this.zonesNLCopiados.copiados8
        }else{
          editIssue.zonesNL.zonesNLCopiados[7] = null
          this.zonesNLCopiados.copiados8= ''
        }

        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaAnalyst.analyst1!= ''){
          editIssue.zonesCoahila.zonesCoahilaAnalyst[0] = this.zonesCoahilaAnalyst.analyst1
        }else{
          editIssue.zonesCoahila.zonesCoahilaAnalyst[0] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[1] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[2] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[3] = null
          this.zonesCoahilaAnalyst.analyst1= ''
          this.zonesCoahilaAnalyst.analyst2= ''
          this.zonesCoahilaAnalyst.analyst3= ''
          this.zonesCoahilaAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaAnalyst.analyst2!= ''){
          editIssue.zonesCoahila.zonesCoahilaAnalyst[1] = this.zonesCoahilaAnalyst.analyst2
        }else{
          editIssue.zonesCoahila.zonesCoahilaAnalyst[1] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[2] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[3] = null
          this.zonesCoahilaAnalyst.analyst2= ''
          this.zonesCoahilaAnalyst.analyst3= ''
          this.zonesCoahilaAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaAnalyst.analyst3!= ''){
          editIssue.zonesCoahila.zonesCoahilaAnalyst[2] = this.zonesCoahilaAnalyst.analyst3
        }else{
          editIssue.zonesCoahila.zonesCoahilaAnalyst[2] = null
          editIssue.zonesCoahila.zonesCoahilaAnalyst[3] = null
          this.zonesCoahilaAnalyst.analyst3= ''
          this.zonesCoahilaAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaAnalyst.analyst4!= ''){
          editIssue.zonesCoahila.zonesCoahilaAnalyst[3] = this.zonesCoahilaAnalyst.analyst4
        }else{
          editIssue.zonesCoahila.zonesCoahilaAnalyst[3] = null
          this.zonesCoahilaAnalyst.analyst4= ''
        }

        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados1!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[0] = this.zonesCoahilaCopiados.copiados1
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[0] = null
          this.zonesCoahilaCopiados.copiados1= ''
          this.zonesCoahilaCopiados.copiados2= ''
          this.zonesCoahilaCopiados.copiados3= ''
          this.zonesCoahilaCopiados.copiados4= ''
          this.zonesCoahilaCopiados.copiados5= ''
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados2!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[1] = this.zonesCoahilaCopiados.copiados2
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[1] = null
          this.zonesCoahilaCopiados.copiados2= ''
          this.zonesCoahilaCopiados.copiados3= ''
          this.zonesCoahilaCopiados.copiados4= ''
          this.zonesCoahilaCopiados.copiados5= ''
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados3!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[2] = this.zonesCoahilaCopiados.copiados3
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[2] = null
          this.zonesCoahilaCopiados.copiados3= ''
          this.zonesCoahilaCopiados.copiados4= ''
          this.zonesCoahilaCopiados.copiados5= ''
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados4!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[3] = this.zonesCoahilaCopiados.copiados4
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[3] = null
          this.zonesCoahilaCopiados.copiados4= ''
          this.zonesCoahilaCopiados.copiados5= ''
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados5!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[4] = this.zonesCoahilaCopiados.copiados5
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[4] = null
          this.zonesCoahilaCopiados.copiados5= ''
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados6!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[5] = this.zonesCoahilaCopiados.copiados6
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[5] = null
          this.zonesCoahilaCopiados.copiados6= ''
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados7!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[6] = this.zonesCoahilaCopiados.copiados7
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[6] = null
          this.zonesCoahilaCopiados.copiados7= ''
          this.zonesCoahilaCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesCoahilaCopiados.copiados8!= ''){
          editIssue.zonesCoahila.zonesCoahilaCopiados[7] = this.zonesCoahilaCopiados.copiados8
        }else{
          editIssue.zonesCoahila.zonesCoahilaCopiados[7] = null
          this.zonesCoahilaCopiados.copiados8= ''
        }


        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroAnalyst.analyst1!= ''){
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[0] = this.zonesQueretaroAnalyst.analyst1
        }else{
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[0] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[1] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[2] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[3] = null
          this.zonesQueretaroAnalyst.analyst1= ''
          this.zonesQueretaroAnalyst.analyst2= ''
          this.zonesQueretaroAnalyst.analyst3= ''
          this.zonesQueretaroAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroAnalyst.analyst2!= ''){
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[1] = this.zonesQueretaroAnalyst.analyst2
        }else{
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[1] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[2] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[3] = null
          this.zonesQueretaroAnalyst.analyst2= ''
          this.zonesQueretaroAnalyst.analyst3= ''
          this.zonesQueretaroAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroAnalyst.analyst3!= ''){
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[2] = this.zonesQueretaroAnalyst.analyst3
        }else{
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[2] = null
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[3] = null
          this.zonesQueretaroAnalyst.analyst3= ''
          this.zonesQueretaroAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroAnalyst.analyst4!= ''){
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[3] = this.zonesQueretaroAnalyst.analyst4
        }else{
          editIssue.zonesQueretaro.zonesQueretaroAnalyst[3] = null
          this.zonesQueretaroAnalyst.analyst4= ''
        }

        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados1!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[0] = this.zonesQueretaroCopiados.copiados1
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[0] = null
          this.zonesQueretaroCopiados.copiados1= ''
          this.zonesQueretaroCopiados.copiados2= ''
          this.zonesQueretaroCopiados.copiados3= ''
          this.zonesQueretaroCopiados.copiados4= ''
          this.zonesQueretaroCopiados.copiados5= ''
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= '' 
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados2!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[1] = this.zonesQueretaroCopiados.copiados2
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[1] = null
          this.zonesQueretaroCopiados.copiados2= ''
          this.zonesQueretaroCopiados.copiados3= ''
          this.zonesQueretaroCopiados.copiados4= ''
          this.zonesQueretaroCopiados.copiados5= ''
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados3!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[2] = this.zonesQueretaroCopiados.copiados3
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[2] = null
          this.zonesQueretaroCopiados.copiados3= ''
          this.zonesQueretaroCopiados.copiados4= ''
          this.zonesQueretaroCopiados.copiados5= ''
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados4!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[3] = this.zonesQueretaroCopiados.copiados4
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[3] = null
          this.zonesQueretaroCopiados.copiados4= ''
          this.zonesQueretaroCopiados.copiados5= ''
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados5!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[4] = this.zonesQueretaroCopiados.copiados5
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[4] = null
          this.zonesQueretaroCopiados.copiados5= ''
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados6!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[5] = this.zonesQueretaroCopiados.copiados6
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[5] = null
          this.zonesQueretaroCopiados.copiados6= ''
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados7!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[6] = this.zonesQueretaroCopiados.copiados7
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[6] = null
          this.zonesQueretaroCopiados.copiados7= ''
          this.zonesQueretaroCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesQueretaroCopiados.copiados8!= ''){
          editIssue.zonesQueretaro.zonesQueretaroCopiados[7] = this.zonesQueretaroCopiados.copiados8
        }else{
          editIssue.zonesQueretaro.zonesQueretaroCopiados[7] = null
          this.zonesQueretaroCopiados.copiados8= ''
        }



        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoAnalyst.analyst1!= ''){
          editIssue.zonesMexico.zonesMexicoAnalyst[0] = this.zonesMexicoAnalyst.analyst1
        }else{
          editIssue.zonesMexico.zonesMexicoAnalyst[0] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[1] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[2] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[3] = null
          this.zonesMexicoAnalyst.analyst1= ''
          this.zonesMexicoAnalyst.analyst2= ''
          this.zonesMexicoAnalyst.analyst3= ''
          this.zonesMexicoAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoAnalyst.analyst2!= ''){
          editIssue.zonesMexico.zonesMexicoAnalyst[1] = this.zonesMexicoAnalyst.analyst2
        }else{
          editIssue.zonesMexico.zonesMexicoAnalyst[1] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[2] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[3] = null
          this.zonesMexicoAnalyst.analyst2= ''
          this.zonesMexicoAnalyst.analyst3= ''
          this.zonesMexicoAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoAnalyst.analyst3!= ''){
          editIssue.zonesMexico.zonesMexicoAnalyst[2] = this.zonesMexicoAnalyst.analyst3
        }else{
          editIssue.zonesMexico.zonesMexicoAnalyst[2] = null
          editIssue.zonesMexico.zonesMexicoAnalyst[3] = null
          this.zonesMexicoAnalyst.analyst3= ''
          this.zonesMexicoAnalyst.analyst4= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoAnalyst.analyst4!= ''){
          editIssue.zonesMexico.zonesMexicoAnalyst[3] = this.zonesMexicoAnalyst.analyst4
        }else{
          editIssue.zonesMexico.zonesMexicoAnalyst[3] = null
          this.zonesMexicoAnalyst.analyst4= ''
        }

        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados1!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[0] = this.zonesMexicoCopiados.copiados1
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[0] = null
          this.zonesMexicoCopiados.copiados1= ''
          this.zonesMexicoCopiados.copiados2= ''
          this.zonesMexicoCopiados.copiados3= ''
          this.zonesMexicoCopiados.copiados4= ''
          this.zonesMexicoCopiados.copiados5= ''
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= '' 
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados2!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[1] = this.zonesMexicoCopiados.copiados2
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[1] = null
          this.zonesMexicoCopiados.copiados2= ''
          this.zonesMexicoCopiados.copiados3= ''
          this.zonesMexicoCopiados.copiados4= ''
          this.zonesMexicoCopiados.copiados5= ''
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados3!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[2] = this.zonesMexicoCopiados.copiados3
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[2] = null
          this.zonesMexicoCopiados.copiados3= ''
          this.zonesMexicoCopiados.copiados4= ''
          this.zonesMexicoCopiados.copiados5= ''
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados4!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[3] = this.zonesMexicoCopiados.copiados4
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[3] = null
          this.zonesMexicoCopiados.copiados4= ''
          this.zonesMexicoCopiados.copiados5= ''
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados5!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[4] = this.zonesMexicoCopiados.copiados5
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[4] = null
          this.zonesMexicoCopiados.copiados5= ''
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados6!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[5] = this.zonesMexicoCopiados.copiados6
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[5] = null
          this.zonesMexicoCopiados.copiados6= ''
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados7!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[6] = this.zonesMexicoCopiados.copiados7
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[6] = null
          this.zonesMexicoCopiados.copiados7= ''
          this.zonesMexicoCopiados.copiados8= ''
        }
        if( editIssue.zonesToAnalyst.porEstado== true && this.zonesMexicoCopiados.copiados8!= ''){
          editIssue.zonesMexico.zonesMexicoCopiados[7] = this.zonesMexicoCopiados.copiados8
        }else{
          editIssue.zonesMexico.zonesMexicoCopiados[7] = null
          this.zonesMexicoCopiados.copiados8= ''
        }


        if(editIssue.critico && editIssue.critico==true){
        }else{
          editIssue.critico=false
        }

        if(editIssue.chatbot && editIssue.chatbot==true){
        }else{
          editIssue.chatbot=false
        }

      this._requestNewService.editService(editIssue).subscribe(
        response=>{
          this.load = false
            swal("¡Éxito!", "Servicio editado" , "success")
            .then((res)=>{
                window.location.reload();
            })
        }, error=>{
          this.load = false
            var errorMessage = error;
            if(errorMessage != null){
              console.log(errorMessage)
            swal("Error!","errorMessage" , "error");
            }            
        }
    )
    }else{
      swal("Error!","Asigné minimo un analista por estado" , "error");
    }
  } else{
    swal("Error!","Completa la información: Servicio, Subcategoría, SLA y analistas" , "error");
  }

    }

    issueValid(toValid){
      swal("¿Quieres marcar como validado?", {
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: "NO",
          catch: {
            text: "Validar",
            value: true,
          },
          defeat: false,
        },
      })
      .then((value) => {
        if (!value) {
        }
        else {
      this._requestNewService.issueValid(toValid).subscribe(
        response=>{
          toValid.validado=true
          swal("¡Éxito!", "Servicio Validado" , "success")
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            // var body = JSON.parse(error._body)
            swal("Error!", "Recargue la página", "error");
          }
        }
      )
      }  
    })
    }

    searchCategory(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.category2= element.category.toUpperCase()
          if(element.category2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchService(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.service2= element.service.toUpperCase()
          if(element.service2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchCritico(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.critico2= element.critico.toUpperCase()
          if(element.critico2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchValidado(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.validado2= element.validado.toUpperCase()
          if(element.validado2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchSubcategory(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.subcategory2= element.subcategory.toUpperCase()
          if(element.subcategory2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchSla(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          element.sla2= element.sla.toString()
          if(element.sla2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchSlaCallCenter(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          console.log(element)
          if(element.slaCallCenter){
          element.slaCallCenter2= element.slaCallCenter.toString()
          if(element.slaCallCenter2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    searchActive(toSearch){
      toSearch= toSearch.toUpperCase()
      var newData = []
      if(toSearch!=""){
        var go =toSearch.toUpperCase()
        go= go.toString()
        this.oldData.forEach(element => {
          if(element.active==true){
            var pasado="Si"
          }else{
            var pasado="No"
          }
          var pasado2= pasado.toUpperCase()

          if(pasado2.indexOf(go)>=0){
            newData.push(element)
          }else{
          }
        });
        this.allIsues = newData
        this.issueTabla = newData
      }else{
        this.allIsues = this.oldData
        this.issueTabla = this.oldData
      }
    }

    pressZonesToAnalystGeneral(){
      this.zonesToAnalyst ={
        general: true,
        porEstado: false
      }
    }

    pressZonesToAnalystPorEstado(){
      this.zonesToAnalyst ={
        general: false,
        porEstado: true
      }
    }

}
