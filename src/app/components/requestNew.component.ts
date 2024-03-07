import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestNewService } from '../services/requestNew.service';
import { UploadService } from '../services/upload.service';
import { Users } from '../models/users';
import { RequestNew } from '../models/requestNew';
import {Http, Response, Headers} from '@angular/http';
import {GLOBAL} from '../services/global';
import {VERSION} from '../services/version';
import { DomSanitizer } from '@angular/platform-browser';
import { ignoreElements } from 'rxjs/operators';
import { Console } from 'console';
import * as moment from 'moment';
import { RequestProcesService } from '../services/requestProces.service';

const swal = require('../../assets/sweetalert/sweetalert.js')
 var async = require('async');

@Component({
    selector: 'requestNew',
    templateUrl: '../views/requestNew.html',
    providers: [UsersService, RequestNewService, UploadService, RequestProcesService]
})

export class RequestNewComponent implements OnInit{
    public title: string;
    public users: Users;
    public url: string;
    public version;
    public identity;
    public token;
    public allIsues;
    public originAllIsues;
    public requestNew;
    public load;
    public sucursales;
    public search;
    public table;
    public archivos:any = []
    public dataEncuesta
    public campos
    public menuboard
    public cantBolsasComprobantes
    public numBolsaTipoCaja
    public dt
    public kds
    public pos
    public medidas
    public email
    public numReport
    public numOrden
    public producto
    public lote
    public cantidad
    public numSerie
    public marca
    public nombreTimMember
    public numNomina
    public functions3
    public note
    public messages
    public messagesBD
    public messages22
    public messagesBD22
    public issueOter

    constructor(
        private _userService: UsersService,
        private _requestNewService: RequestNewService,
        private _uploadService: UploadService,
        private _http: Http,
        private sanitizer: DomSanitizer,
        private _requestProcesService: RequestProcesService,
    ){
      this.url = GLOBAL.url;
      this.version = VERSION.v
      this.title = 'NUEVO REQUERIMIENTO'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.requestNew = new RequestNew('','','','','','','','','','','','','','','','');
        this.requestNew.service = "",
        this.requestNew.subCategory= "",
        this.requestNew.description= "",
        this.requestNew.manager= ""
        this.requestNew.manager2= ""
        this.load = false
        this.functions3 = false
      }

      momentTime(date) {
        if (date)
          return moment(date).format('YYYY-MM-DD / HH:mm')
        else
          return ''
      }

    ngOnInit(){
      this.note=""
      this.messages=[]
      this.messagesBD=[]
      this.messages22=[]
      this.messagesBD22=[]
        this._requestNewService.getIssues(this.identity).subscribe(
            response=>{
              this.allIsues = response
              this.originAllIsues = response
              this.table = "original"
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
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
          

    }

    onSubmit(){
    }

    onClickIssue(issue1){
      this.note=""
      this.messages=[]
      this.messagesBD=[]
      this.messages22=[]
      this.messagesBD22=[]
      this.issueOter = issue1
      if(issue1.campo){
        this.campos = issue1.campo
        if(this.campos.menuboards==true){
          this.menuboard ={
            promopanel:false,
            panaderia:false,
            bebidasCalientes:false,
            babidasFrias:false,
            dasayunosLunch:false
          }
        }
        if(this.campos.cantBolsasComprobantes==true){
          this.cantBolsasComprobantes ={
            bolsas:false,
            comprobantes:false,
          }
        }
        if(this.campos.numBolsaTipoCaja==true){
          this.numBolsaTipoCaja ={
            numBolsas:"",
            tipoCaja:"",
          }
        }
        if(this.campos.dt==true){
          this.dt=""
        }
        if(this.campos.numReport==true){
          this.numReport=""
        }
        if(this.campos.numOrden==true){
          this.numOrden=""
        }
        if(this.campos.producto==true){
          this.producto=""
        }
        if(this.campos.lote==true){
          this.lote=""
        }
        if(this.campos.cantidad==true){
          this.cantidad=""
        }
        if(this.campos.numSerie==true){
          this.numSerie=""
        }
        if(this.campos.marca==true){
          this.marca=""
        }
        if(this.campos.nombreTimMember==true){
          this.nombreTimMember=""
        }
        if(this.campos.numNomina==true){
          this.numNomina=""
        }
        if(this.campos.email==true){
          this.email=""
        }
        if(this.campos.kds==true){
          this.kds ={
            expo1:false,
            expo2:false,
            sandwiches:false,
            bebidasCalientes:false,
            bebidasFrias:false,
            expoFor1And2: false,
            expoFor3And4: false,
            refreshersAndBrew: false,
            espressoOnly: false,
            bakeryOnly: false,
          }
        }
        if(this.campos.pos==true){
          this.pos ={
            fcRight:false,
            fcLeft:false,
            fc3:false,
            fc4:false,
            fc5:false,            
            dtOt:false,
            dtOt2:false,
            dtCashier:false
          }
        }
        if(this.campos.medidas==true){
          this.medidas ={
            altura: "",
            ancho: "",
            profundidad: ""
          }
        }
      }else{
        this.campos={
          foto: false,
          video: false,
          numReport: false,
          nombreTimMember: false,
          numNomina: false,
          numOrden: false,
          producto: false,
          lote: false,
          cantidad: false,
          numSerie: false,
          marca: false,
          menuboards: false,
          cantBolsasComprobantes: false,
          numBolsaTipoCaja: false,
          dt: false,
          kds: false,
          email: false,
          pos: false,
          medidas: false,
        }
      }
      this.requestNew={
        id: issue1.id,
        service: issue1.servicio,
        subCategory: issue1.subcategory,
        category: issue1.category,
        department: issue1.departments
      }
      if(this.identity.type=='areaManager'){
        this.requestNew.reportBy = ""
        this.requestNew.manager = this.identity.fname + " " + this.identity.lname
        this._requestNewService.getAreaBranches(this.identity).subscribe(
          response=>{
            this.sucursales=response
          }
        )
      }
      if(this.identity.upload=='si' || this.identity.type=='callCenter'){
        this.requestNew.reportBy = ""
        this.requestNew.manager2 = this.identity.fname + " " + this.identity.lname
        this._requestNewService.getLocals(this.identity).subscribe(
          response=>{
            this.sucursales=response
          }
        )
      }
    }

    pregunta(note){
      if(note && note!=""){
        this.load = true
        this.messages.push({
          'role': 'user',
          'content': note
        })
        this.messagesBD.push({
          'role': 'user',
          'content': note
        })
        this.messages22.push({
          'role': 'user',
          'content': "En, "+this.issueOter.category+", "+this.issueOter.servicio+", "+this.issueOter.subcategory+", "+note
        })
        this.messagesBD22.push({
          'role': 'user',
          'content': "En, "+this.issueOter.category+", "+this.issueOter.servicio+", "+this.issueOter.subcategory+", "+note
        })
        this.note=""
      
        this._requestNewService.chatGPT(this.messages22).subscribe(
          response=>{
            this.load = false
            this.messages.push({
              'role': 'assistant',
              'content': response.text
            })   
            this.messagesBD.push({
              'role': 'assistant',
              'content': response.text
            })  
            this.messages22.push({
              'role': 'assistant',
              'content': response.text
            })   
            this.messagesBD22.push({
              'role': 'assistant',
              'content': response.text
            })            
          })

        }else{
          this.load = false
          swal("Error!","Completa la información" , "error");
        }
    }

    sirvio(index,util){
      this.messagesBD[index].util=util
    }

    asignar(){
      if(this.identity.type == "local" || this.identity.type == "areaManager" || this.identity.type == "callCenter" || this.identity.upload == "si"){
      if(!this.requestNew.description || (!this.requestNew.manager && !this.requestNew.manager2)){
        swal("Error!","Completa la información" , "error");
      } else{
        if( ( this.requestNew.manager && this.requestNew.manager.length < 5) || ( this.requestNew.manager2 && this.requestNew.manager2.length < 5) ){
          swal("Error!","Completa mínimo 5 letras en 'Gerencial que reporta'" , "error");
        }else{
        if((this.identity.type == "areaManager" || this.identity.upload == "si" || this.identity.type == "callCenter") && this.requestNew.reportBy == ""){
          swal("Error!","Seleccione sucursal" , "error");
        }else{
    if(this.campos.menuboards==true &&  true == (this.menuboard.promopanel==false && this.menuboard.panaderia==false && this.menuboard.bebidasCalientes==false && this.menuboard.babidasFrias==false && this.menuboard.dasayunosLunch==false)){
      swal("Error!","Seleccione mínimo un menuboard" , "error");
    }else{
      if(this.campos.medidas==true && (this.medidas.altura=="" && this.medidas.ancho=="" && this.medidas.profundidad=="")){
        swal("Error!","Completa las medidas" , "error");
      }else{
      if(this.campos.cantBolsasComprobantes==true && (this.cantBolsasComprobantes.bolsas==false && this.cantBolsasComprobantes.comprobantes==false)){
        swal("Error!","Seleccione mínimo bolsas y/o comprobantes" , "error");
      }else{
        if(this.campos.numBolsaTipoCaja==true && (this.numBolsaTipoCaja.numBolsas=="" && this.numBolsaTipoCaja.tipoCaja=="")){
          swal("Error!","Complete el No. de bolsas y/o tipo caja" , "error");
        }else{
      if(this.campos.dt==true && this.dt==""){
        swal("Error!","Seleccione si se realizó el reinicio de HME" , "error");
      }else{
        if(this.campos.kds==true && (this.kds.expo1==false && this.kds.expo2==false && this.kds.sandwiches==false && this.kds.bebidasCalientes==false && this.kds.bebidasFrias==false && this.kds.expoFor1And2==false && this.kds.expoFor3And4==false && this.kds.refreshersAndBrew==false && this.kds.espressoOnly==false && this.kds.bakeryOnly==false)){
          swal("Error!","Seleccione mínimo un KDS" , "error");
        }else{
          if(this.campos.pos==true && (this.pos.fcRight==false && this.pos.fcLeft==false && this.pos.fc3==false && this.pos.fc4==false && this.pos.fc5==false && this.pos.dtOt==false && this.pos.dtOt2==false && this.pos.dtCashier==false)){
            swal("Error!","Seleccione mínimo un POS" , "error");
          }else{
          if(this.campos.email==true && this.email==""){
            swal("Error!","Completa el email" , "error");
          }else{
            if(this.campos.foto==true && !this.fileToUpload1){
              swal("Error!","Favor de subir mínimo 1 foto" , "error");
            }else{
              if(this.campos.video==true && !this.fileToUpload1){
                swal("Error!","Favor de subir mínimo 1 video" , "error");
              }else{
              if(this.campos.numReport==true && this.numReport==''){
                swal("Error!","Agrega el número de reporte" , "error");
              }else{
                if(this.campos.numOrden==true && this.numOrden==''){
                  swal("Error!","Agrega el número de orden" , "error");
                }else{
                  if(this.campos.producto==true && this.producto==''){
                    swal("Error!","Agrega el producto" , "error");
                  }else{
                    if(this.campos.lote==true && this.lote==''){
                      swal("Error!","Agrega el lote" , "error");
                    }else{
                      if(this.campos.cantidad==true && this.cantidad==''){
                        swal("Error!","Agrega la cantidad" , "error");
                      }else{
                        if(this.campos.numSerie==true && this.numSerie==''){
                          swal("Error!","Agrega el número de serie" , "error");
                        }else{
                          if(this.campos.marca==true && this.marca==''){
                            swal("Error!","Agrega la marca" , "error");
                          }else{
                            if(this.campos.nombreTimMember==true && this.nombreTimMember==''){
                              swal("Error!","Agrega el nombre del Tim-Member" , "error");
                            }else{
                              if(this.campos.numNomina==true && this.numNomina==''){
                                swal("Error!","Agrega el número de nómina" , "error");
                              }else{

      if(this.campos.menuboards==true){
        this.requestNew.menuboards=this.menuboard
      }
      if(this.campos.cantBolsasComprobantes==true){
        this.requestNew.cantBolsasComprobantes=this.cantBolsasComprobantes
      }
      if(this.campos.numBolsaTipoCaja==true){
        this.requestNew.numBolsaTipoCaja=this.numBolsaTipoCaja
      }
      if(this.campos.dt==true){
        this.requestNew.dt= this.dt
      }
      if(this.campos.numReport==true){
        this.requestNew.numReport= this.numReport
      }
      if(this.campos.numOrden==true){
        this.requestNew.numOrden= this.numOrden
      }
      if(this.campos.producto==true){
        this.requestNew.producto= this.producto
      }
      if(this.campos.lote==true){
        this.requestNew.lote= this.lote
      }
      if(this.campos.cantidad==true){
        this.requestNew.cantidad= this.cantidad
      }
      if(this.campos.numSerie==true){
        this.requestNew.numSerie= this.numSerie
      }
      if(this.campos.marca==true){
        this.requestNew.marca= this.marca
      }
      if(this.campos.nombreTimMember==true){
        this.requestNew.nombreTimMember= this.nombreTimMember
      }
      if(this.campos.numNomina==true){
        this.requestNew.numNomina= this.numNomina
      }
      if(this.campos.email==true){
        this.requestNew.email= this.email
      }
      if(this.campos.kds==true){
        this.requestNew.kds=this.kds
      }
      if(this.campos.pos==true){
        this.requestNew.pos=this.pos
      }
      if(this.campos.medidas==true){
        this.requestNew.medidas=this.medidas
      }

        this.load = true
        this.requestNew.title = this.title
        this.requestNew.issue = this.requestNew.id
        this.requestNew.department = this.requestNew.department
        const thisAsync = this

        if(this.campos.numBolsaTipoCaja==true){
          thisAsync._requestNewService.getTime().subscribe(
            response=>{
              var tiempo= parseInt(response.tiempo)

              if((response.dia=='Mo' || response.dia=='We') && tiempo >= 14){
                  swal("Error!", "Bloqueado el Lunes y Miercoles de 14:00 a 23:59" , "error")
                  this.load = false
                  return
              }else{
                empezar()
              }
            }, error=>{
                var errorMessage = error;
                if(errorMessage != null){
                console.log(errorMessage)
                this.load = false
                swal("Error!","errorMessage" , "error");
                }            
            }
          )
        }else{
          thisAsync._requestNewService.getTime().subscribe(
            response=>{
              empezar()
            }, error=>{
              var errorMessage = error;
              if(errorMessage != null){
              console.log(errorMessage)
              this.load = false
              swal("Error!","errorMessage" , "error");
              }            
          })
        }


        const empezar = function() {

        if(thisAsync.identity.type == "areaManager" || thisAsync.identity.upload == "si" || thisAsync.identity.type == "callCenter"){
          async.waterfall([
            function step1(next) {
              thisAsync._requestNewService.getOneUser({sucursal: thisAsync.requestNew.reportBy}).subscribe(
                response=>{
                  thisAsync.requestNew.reportBy= response[0]
                  thisAsync.requestNew.reportByAm= "si"

                  if(thisAsync.identity.upload == "si" || thisAsync.identity.type == "callCenter"){
                    thisAsync.requestNew.manager= thisAsync.requestNew.manager2
                  }
          
                  const imgArray=[]
                  if(thisAsync.fileToUpload1){
                    imgArray.push(thisAsync.fileToUpload1)
                  }
                  if(thisAsync.fileToUpload2){
                    imgArray.push(thisAsync.fileToUpload2)
                  }
                  if(thisAsync.fileToUpload3){
                    imgArray.push(thisAsync.fileToUpload3)
                  }
                  if(thisAsync.fileToUpload4){
                    imgArray.push(thisAsync.fileToUpload4)
                  }
                  if(thisAsync.fileToUpload5){
                    imgArray.push(thisAsync.fileToUpload5)
                  }
                  if(thisAsync.fileToUpload6){
                    imgArray.push(thisAsync.fileToUpload6)
                  }
                  if(thisAsync.fileToUpload7){
                    imgArray.push(thisAsync.fileToUpload7)
                  }
                  if(thisAsync.fileToUpload8){
                    imgArray.push(thisAsync.fileToUpload8)
                  }
                  if(thisAsync.fileToUpload9){
                    imgArray.push(thisAsync.fileToUpload9)
                  }
                  if(thisAsync.fileToUpload10){
                    imgArray.push(thisAsync.fileToUpload10)
                  }
                  if(thisAsync.fileToUpload11){
                    imgArray.push(thisAsync.fileToUpload11)
                  }
                  if(thisAsync.fileToUpload12){
                    imgArray.push(thisAsync.fileToUpload12)
                  }
                  const imgArrays =imgArray
                  next(null ,imgArrays)
                }
              )
            },


            function step2(imgArray, next) {
            const imgNames =[]
            if(imgArray.length>0){
            for(var i=0; i<imgArray.length; i++){
              thisAsync.makeFileRequest(thisAsync.url+"requests/uploadImage/"+ thisAsync.identity._id,[],imgArray[i]).then(
              (result)=>{
                imgNames.push(result)
              })
            }
            next(null, imgArray, imgNames)
          }else{
            next(null, imgArray, imgNames)
          }
        },


        function step3(imgArray, imgNames, next) {
          setTimeout(() => {
            thisAsync.requestNew.imagenes = imgNames
            if(imgNames.length == imgArray.length){
              thisAsync._requestNewService.newRequest(thisAsync.requestNew).subscribe(
                response=>{
                  thisAsync.load = false
                  if(response.users.statusCallCenter){
                    var asignado= "Call-Center"
                  }else{
                    var asignado= "Analista"
                  }
                  swal("¡Éxito!", "Folio,  " + response.users.codeRequest + ",  creado: " + moment(response.users.dateOfReport).format('YYYY-MM-DD/ HH:mm') + ", - Direccionado a: " + asignado, "success")
                  .then((res)=>{
                    window.location.reload();
                  }, error=>{
                    var errorMessage = error;
                    if(errorMessage != null){
                      swal("Error!","errorMessage" , "error");
                      window.location.reload();
                    }    
                  })
                }
                )
            }
          }, 1500);
        }
        ], function (err) {
          console.log(err);
        });
      }else{

        async.waterfall([
          function step1(next) {
            if(thisAsync.requestNew){
              thisAsync.requestNew.reportBy = thisAsync.identity
            }
              const imgArray=[]
            if(thisAsync.fileToUpload1 && thisAsync.fileToUpload1!=null){
              imgArray.push(thisAsync.fileToUpload1)
            }
            if(thisAsync.fileToUpload2){
              imgArray.push(thisAsync.fileToUpload2)
            }
            if(thisAsync.fileToUpload3){
              imgArray.push(thisAsync.fileToUpload3)
            }
            if(thisAsync.fileToUpload4){
              imgArray.push(thisAsync.fileToUpload4)
            }
            if(thisAsync.fileToUpload5){
              imgArray.push(thisAsync.fileToUpload5)
            }
            if(thisAsync.fileToUpload6){
              imgArray.push(thisAsync.fileToUpload6)
            }
            if(thisAsync.fileToUpload7){
              imgArray.push(thisAsync.fileToUpload7)
            }
            if(thisAsync.fileToUpload8){
              imgArray.push(thisAsync.fileToUpload8)
            }
            if(thisAsync.fileToUpload9){
              imgArray.push(thisAsync.fileToUpload9)
            }
            if(thisAsync.fileToUpload10){
              imgArray.push(thisAsync.fileToUpload10)
            }
            if(thisAsync.fileToUpload11){
              imgArray.push(thisAsync.fileToUpload11)
            }
            if(thisAsync.fileToUpload12){
              imgArray.push(thisAsync.fileToUpload12)
            }
            const imgArrays =imgArray
            next(null ,imgArrays)
          },          

          function step2(imgArray, next) {
            const imgNames =[]
            if(imgArray.length>0){
            for(var i=0; i<imgArray.length; i++){
              thisAsync.makeFileRequest(thisAsync.url+"requests/uploadImage/"+ thisAsync.identity._id,[],imgArray[i]).then(
              (result)=>{
                imgNames.push(result)
                if(imgNames.length == imgArray.length){
                  next(null, imgArray, imgNames)
                }
              }, error=>{
                var errorMessage = error;
                if(errorMessage != null){
                  thisAsync.load = false
                  swal("Error!","Algo salio mal por la conexión a internet, intente nuevamente solo con 1 imagen" , "error");
                }    
              })
            }
          }else{
            next(null, imgArray, imgNames)
          }
        },

        function step3(imgArray, imgNames, next) {
          setTimeout(() => {
            thisAsync.functions3 = true
            thisAsync.requestNew.imagenes = imgNames
            thisAsync.requestNew.pantalla= screen.width+" x "+ screen.height
            thisAsync.requestNew.dispositivo= navigator.userAgent
            thisAsync.requestNew.version= thisAsync.version
              if(imgNames.length == imgArray.length){
                thisAsync._requestNewService.newRequest(thisAsync.requestNew).subscribe(
                  response=>{
                    thisAsync.load = false
                    if(response.users.statusCallCenter){
                      var asignado= "Call-Center"
                    }else{
                      var asignado= "Analista"
                    }
                    swal( "¡Éxito!", "Folio:  " + response.users.codeRequest + ",  creado: " + moment(response.users.dateOfReport).format('YYYY-MM-DD/ HH:mm') + ", - Direccionado a: " + asignado, "success")
                    .then((res)=>{
                      window.location.reload();
                    }, error=>{
                      var errorMessage = error;
                      if(errorMessage != null){
                        swal("Error!","errorMessage" , "error");
                        window.location.reload();
                      }    
                    })
                  }
                )
              }else{
                thisAsync.load = false
                swal("Error!","Algo salio mal por la conexión a internet, intente nuevamente y verifique su conexión a internet" , "error");
              }
            }, 2000);
        }
        ], function (err) {
        thisAsync.load = false
        swal("Error!","Algo salio mal vuelva a recargar la página" , "error");
          console.log(err);
        });
    }
  }
  }
}
    }
  }
  }
}
      }
    }
  }
    }
  }
}
      }
    } 
  }
}
      }
     }
    }
  }
}
      }
    }else{
      swal("Error!","Por el  momento solo sucursales, AM y CallCenter pueden levantar timcket" , "error");
    }
  }

  search1(issue){
    if(issue.length>=1){
      this._requestNewService.getBySearch({letra: issue, user: this.identity}).subscribe(
        response=>{
          this.allIsues = response
          this.table = "segunda"
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            // var body = JSON.parse(error._body)
            // swal("Error!", "errrrrrr", "error");
          }
        })
    }
    if(issue.length<=0){
      this.allIsues = this.originAllIsues
      this.table = "original"
    }
  }

    public fileToUpload1: Array<File>
    public newName1
    fileChangeEvent1(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
        if(file_path1[0].size > 5000000){
          this.fileToUpload1 = undefined
        swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
        return
        }
      }
        this.fileToUpload1 = <Array<File>>fileInput.target.files
        this.newName1 =this.fileToUpload1[0].name
        if(this.newName1.charAt(this.newName1.length-24)){
          this.newName1 =('...'+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }else{
          this.newName1 =(this.newName1.charAt(this.newName1.length-23)+this.newName1.charAt(this.newName1.length-22)+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }
      }else{
        this.fileToUpload1 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload2: Array<File>
    public newName2
    fileChangeEvent2(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload2 = <Array<File>>fileInput.target.files
        this.newName2 =this.fileToUpload2[0].name
        if(this.newName2.charAt(this.newName2.length-24)){
          this.newName2 =('...'+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }else{
          this.newName2 =(this.newName2.charAt(this.newName2.length-23)+this.newName2.charAt(this.newName2.length-22)+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }
      }else{
        this.fileToUpload2 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }
    public fileToUpload3: Array<File>
    public newName3
    fileChangeEvent3(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'||  file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload3 = <Array<File>>fileInput.target.files
        this.newName3 =this.fileToUpload3[0].name
        if(this.newName3.charAt(this.newName3.length-24)){
          this.newName3 =('...'+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }else{
          this.newName3 =(this.newName3.charAt(this.newName3.length-23)+this.newName3.charAt(this.newName3.length-22)+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }
      }else{
        this.fileToUpload3 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload4: Array<File>
    public newName4
    fileChangeEvent4(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload4 = <Array<File>>fileInput.target.files
        this.newName4 =this.fileToUpload4[0].name
        if(this.newName4.charAt(this.newName4.length-24)){
          this.newName4 =('...'+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }else{
          this.newName4 =(this.newName4.charAt(this.newName4.length-23)+this.newName4.charAt(this.newName4.length-22)+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }
      }else{
        this.fileToUpload4 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload5: Array<File>
    public newName5
    fileChangeEvent5(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload5 = <Array<File>>fileInput.target.files
        this.newName5 =this.fileToUpload5[0].name
        if(this.newName5.charAt(this.newName5.length-24)){
          this.newName5 =('...'+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }else{
          this.newName5 =(this.newName5.charAt(this.newName5.length-23)+this.newName5.charAt(this.newName5.length-22)+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }
      }else{
        this.fileToUpload5 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload6: Array<File>
    public newName6
    fileChangeEvent6(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload6 = <Array<File>>fileInput.target.files
        this.newName6 =this.fileToUpload6[0].name
        if(this.newName6.charAt(this.newName6.length-24)){
          this.newName6 =('...'+this.newName6.charAt(this.newName6.length-21)+this.newName6.charAt(this.newName6.length-20)+this.newName6.charAt(this.newName6.length-19)+this.newName6.charAt(this.newName6.length-18)+this.newName6.charAt(this.newName6.length-17)+this.newName6.charAt(this.newName6.length-16)+this.newName6.charAt(this.newName6.length-15)+this.newName6.charAt(this.newName6.length-14)+this.newName6.charAt(this.newName6.length-13)+this.newName6.charAt(this.newName6.length-12)+this.newName6.charAt(this.newName6.length-11)+this.newName6.charAt(this.newName6.length-10)+this.newName6.charAt(this.newName6.length-9)+this.newName6.charAt(this.newName6.length-8)+this.newName6.charAt(this.newName6.length-7)+this.newName6.charAt(this.newName6.length-6)+this.newName6.charAt(this.newName6.length-5)+this.newName6.charAt(this.newName6.length-4)+this.newName6.charAt(this.newName6.length-3)+this.newName6.charAt(this.newName6.length-2)+this.newName6.charAt(this.newName6.length-1))
        }else{
          this.newName6 =(this.newName6.charAt(this.newName6.length-23)+this.newName6.charAt(this.newName6.length-22)+this.newName6.charAt(this.newName6.length-21)+this.newName6.charAt(this.newName6.length-20)+this.newName6.charAt(this.newName6.length-19)+this.newName6.charAt(this.newName6.length-18)+this.newName6.charAt(this.newName6.length-17)+this.newName6.charAt(this.newName6.length-16)+this.newName6.charAt(this.newName6.length-15)+this.newName6.charAt(this.newName6.length-14)+this.newName6.charAt(this.newName6.length-13)+this.newName6.charAt(this.newName6.length-12)+this.newName6.charAt(this.newName6.length-11)+this.newName6.charAt(this.newName6.length-10)+this.newName6.charAt(this.newName6.length-9)+this.newName6.charAt(this.newName6.length-8)+this.newName6.charAt(this.newName6.length-7)+this.newName6.charAt(this.newName6.length-6)+this.newName6.charAt(this.newName6.length-5)+this.newName6.charAt(this.newName6.length-4)+this.newName6.charAt(this.newName6.length-3)+this.newName6.charAt(this.newName6.length-2)+this.newName6.charAt(this.newName6.length-1))
        }
      }else{
        this.fileToUpload6 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload7: Array<File>
    public newName7
    fileChangeEvent7(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload7 = <Array<File>>fileInput.target.files
        this.newName7 =this.fileToUpload7[0].name
        if(this.newName7.charAt(this.newName7.length-24)){
          this.newName7 =('...'+this.newName7.charAt(this.newName7.length-21)+this.newName7.charAt(this.newName7.length-20)+this.newName7.charAt(this.newName7.length-19)+this.newName7.charAt(this.newName7.length-18)+this.newName7.charAt(this.newName7.length-17)+this.newName7.charAt(this.newName7.length-16)+this.newName7.charAt(this.newName7.length-15)+this.newName7.charAt(this.newName7.length-14)+this.newName7.charAt(this.newName7.length-13)+this.newName7.charAt(this.newName7.length-12)+this.newName7.charAt(this.newName7.length-11)+this.newName7.charAt(this.newName7.length-10)+this.newName7.charAt(this.newName7.length-9)+this.newName7.charAt(this.newName7.length-8)+this.newName7.charAt(this.newName7.length-7)+this.newName7.charAt(this.newName7.length-6)+this.newName7.charAt(this.newName7.length-5)+this.newName7.charAt(this.newName7.length-4)+this.newName7.charAt(this.newName7.length-3)+this.newName7.charAt(this.newName7.length-2)+this.newName7.charAt(this.newName7.length-1))
        }else{
          this.newName7 =(this.newName7.charAt(this.newName7.length-23)+this.newName7.charAt(this.newName7.length-22)+this.newName7.charAt(this.newName7.length-21)+this.newName7.charAt(this.newName7.length-20)+this.newName7.charAt(this.newName7.length-19)+this.newName7.charAt(this.newName7.length-18)+this.newName7.charAt(this.newName7.length-17)+this.newName7.charAt(this.newName7.length-16)+this.newName7.charAt(this.newName7.length-15)+this.newName7.charAt(this.newName7.length-14)+this.newName7.charAt(this.newName7.length-13)+this.newName7.charAt(this.newName7.length-12)+this.newName7.charAt(this.newName7.length-11)+this.newName7.charAt(this.newName7.length-10)+this.newName7.charAt(this.newName7.length-9)+this.newName7.charAt(this.newName7.length-8)+this.newName7.charAt(this.newName7.length-7)+this.newName7.charAt(this.newName7.length-6)+this.newName7.charAt(this.newName7.length-5)+this.newName7.charAt(this.newName7.length-4)+this.newName7.charAt(this.newName7.length-3)+this.newName7.charAt(this.newName7.length-2)+this.newName7.charAt(this.newName7.length-1))
        }
      }else{
        this.fileToUpload7 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload8: Array<File>
    public newName8
    fileChangeEvent8(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload8 = <Array<File>>fileInput.target.files
        this.newName8 =this.fileToUpload8[0].name
        if(this.newName8.charAt(this.newName8.length-24)){
          this.newName8 =('...'+this.newName8.charAt(this.newName8.length-21)+this.newName8.charAt(this.newName8.length-20)+this.newName8.charAt(this.newName8.length-19)+this.newName8.charAt(this.newName8.length-18)+this.newName8.charAt(this.newName8.length-17)+this.newName8.charAt(this.newName8.length-16)+this.newName8.charAt(this.newName8.length-15)+this.newName8.charAt(this.newName8.length-14)+this.newName8.charAt(this.newName8.length-13)+this.newName8.charAt(this.newName8.length-12)+this.newName8.charAt(this.newName8.length-11)+this.newName8.charAt(this.newName8.length-10)+this.newName8.charAt(this.newName8.length-9)+this.newName8.charAt(this.newName8.length-8)+this.newName8.charAt(this.newName8.length-7)+this.newName8.charAt(this.newName8.length-6)+this.newName8.charAt(this.newName8.length-5)+this.newName8.charAt(this.newName8.length-4)+this.newName8.charAt(this.newName8.length-3)+this.newName8.charAt(this.newName8.length-2)+this.newName8.charAt(this.newName8.length-1))
        }else{
          this.newName8 =(this.newName8.charAt(this.newName8.length-23)+this.newName8.charAt(this.newName8.length-22)+this.newName8.charAt(this.newName8.length-21)+this.newName8.charAt(this.newName8.length-20)+this.newName8.charAt(this.newName8.length-19)+this.newName8.charAt(this.newName8.length-18)+this.newName8.charAt(this.newName8.length-17)+this.newName8.charAt(this.newName8.length-16)+this.newName8.charAt(this.newName8.length-15)+this.newName8.charAt(this.newName8.length-14)+this.newName8.charAt(this.newName8.length-13)+this.newName8.charAt(this.newName8.length-12)+this.newName8.charAt(this.newName8.length-11)+this.newName8.charAt(this.newName8.length-10)+this.newName8.charAt(this.newName8.length-9)+this.newName8.charAt(this.newName8.length-8)+this.newName8.charAt(this.newName8.length-7)+this.newName8.charAt(this.newName8.length-6)+this.newName8.charAt(this.newName8.length-5)+this.newName8.charAt(this.newName8.length-4)+this.newName8.charAt(this.newName8.length-3)+this.newName8.charAt(this.newName8.length-2)+this.newName8.charAt(this.newName8.length-1))
        }
      }else{
        this.fileToUpload8 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload9: Array<File>
    public newName9
    fileChangeEvent9(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload9 = <Array<File>>fileInput.target.files
        this.newName9 =this.fileToUpload9[0].name
        if(this.newName9.charAt(this.newName9.length-24)){
          this.newName9 =('...'+this.newName9.charAt(this.newName9.length-21)+this.newName9.charAt(this.newName9.length-20)+this.newName9.charAt(this.newName9.length-19)+this.newName9.charAt(this.newName9.length-18)+this.newName9.charAt(this.newName9.length-17)+this.newName9.charAt(this.newName9.length-16)+this.newName9.charAt(this.newName9.length-15)+this.newName9.charAt(this.newName9.length-14)+this.newName9.charAt(this.newName9.length-13)+this.newName9.charAt(this.newName9.length-12)+this.newName9.charAt(this.newName9.length-11)+this.newName9.charAt(this.newName9.length-10)+this.newName9.charAt(this.newName9.length-9)+this.newName9.charAt(this.newName9.length-8)+this.newName9.charAt(this.newName9.length-7)+this.newName9.charAt(this.newName9.length-6)+this.newName9.charAt(this.newName9.length-5)+this.newName9.charAt(this.newName9.length-4)+this.newName9.charAt(this.newName9.length-3)+this.newName9.charAt(this.newName9.length-2)+this.newName9.charAt(this.newName9.length-1))
        }else{
          this.newName9 =(this.newName9.charAt(this.newName9.length-23)+this.newName9.charAt(this.newName9.length-22)+this.newName9.charAt(this.newName9.length-21)+this.newName9.charAt(this.newName9.length-20)+this.newName9.charAt(this.newName9.length-19)+this.newName9.charAt(this.newName9.length-18)+this.newName9.charAt(this.newName9.length-17)+this.newName9.charAt(this.newName9.length-16)+this.newName9.charAt(this.newName9.length-15)+this.newName9.charAt(this.newName9.length-14)+this.newName9.charAt(this.newName9.length-13)+this.newName9.charAt(this.newName9.length-12)+this.newName9.charAt(this.newName9.length-11)+this.newName9.charAt(this.newName9.length-10)+this.newName9.charAt(this.newName9.length-9)+this.newName9.charAt(this.newName9.length-8)+this.newName9.charAt(this.newName9.length-7)+this.newName9.charAt(this.newName9.length-6)+this.newName9.charAt(this.newName9.length-5)+this.newName9.charAt(this.newName9.length-4)+this.newName9.charAt(this.newName9.length-3)+this.newName9.charAt(this.newName9.length-2)+this.newName9.charAt(this.newName9.length-1))
        }
      }else{
        this.fileToUpload9 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload10: Array<File>
    public newName10
    fileChangeEvent10(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload10 = <Array<File>>fileInput.target.files
        this.newName10 =this.fileToUpload10[0].name
        if(this.newName10.charAt(this.newName10.length-24)){
          this.newName10 =('...'+this.newName10.charAt(this.newName10.length-21)+this.newName10.charAt(this.newName10.length-20)+this.newName10.charAt(this.newName10.length-19)+this.newName10.charAt(this.newName10.length-18)+this.newName10.charAt(this.newName10.length-17)+this.newName10.charAt(this.newName10.length-16)+this.newName10.charAt(this.newName10.length-15)+this.newName10.charAt(this.newName10.length-14)+this.newName10.charAt(this.newName10.length-13)+this.newName10.charAt(this.newName10.length-12)+this.newName10.charAt(this.newName10.length-11)+this.newName10.charAt(this.newName10.length-10)+this.newName10.charAt(this.newName10.length-9)+this.newName10.charAt(this.newName10.length-8)+this.newName10.charAt(this.newName10.length-7)+this.newName10.charAt(this.newName10.length-6)+this.newName10.charAt(this.newName10.length-5)+this.newName10.charAt(this.newName10.length-4)+this.newName10.charAt(this.newName10.length-3)+this.newName10.charAt(this.newName10.length-2)+this.newName10.charAt(this.newName10.length-1))
        }else{
          this.newName10 =(this.newName10.charAt(this.newName10.length-23)+this.newName10.charAt(this.newName10.length-22)+this.newName10.charAt(this.newName10.length-21)+this.newName10.charAt(this.newName10.length-20)+this.newName10.charAt(this.newName10.length-19)+this.newName10.charAt(this.newName10.length-18)+this.newName10.charAt(this.newName10.length-17)+this.newName10.charAt(this.newName10.length-16)+this.newName10.charAt(this.newName10.length-15)+this.newName10.charAt(this.newName10.length-14)+this.newName10.charAt(this.newName10.length-13)+this.newName10.charAt(this.newName10.length-12)+this.newName10.charAt(this.newName10.length-11)+this.newName10.charAt(this.newName10.length-10)+this.newName10.charAt(this.newName10.length-9)+this.newName10.charAt(this.newName10.length-8)+this.newName10.charAt(this.newName10.length-7)+this.newName10.charAt(this.newName10.length-6)+this.newName10.charAt(this.newName10.length-5)+this.newName10.charAt(this.newName10.length-4)+this.newName10.charAt(this.newName10.length-3)+this.newName10.charAt(this.newName10.length-2)+this.newName10.charAt(this.newName10.length-1))
        }
      }else{
        this.fileToUpload10 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload11: Array<File>
    public newName11
    fileChangeEvent11(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload11 = <Array<File>>fileInput.target.files
        this.newName11 =this.fileToUpload11[0].name
        if(this.newName11.charAt(this.newName11.length-24)){
          this.newName11 =('...'+this.newName11.charAt(this.newName11.length-21)+this.newName11.charAt(this.newName11.length-20)+this.newName11.charAt(this.newName11.length-19)+this.newName11.charAt(this.newName11.length-18)+this.newName11.charAt(this.newName11.length-17)+this.newName11.charAt(this.newName11.length-16)+this.newName11.charAt(this.newName11.length-15)+this.newName11.charAt(this.newName11.length-14)+this.newName11.charAt(this.newName11.length-13)+this.newName11.charAt(this.newName11.length-12)+this.newName11.charAt(this.newName11.length-11)+this.newName11.charAt(this.newName11.length-10)+this.newName11.charAt(this.newName11.length-9)+this.newName11.charAt(this.newName11.length-8)+this.newName11.charAt(this.newName11.length-7)+this.newName11.charAt(this.newName11.length-6)+this.newName11.charAt(this.newName11.length-5)+this.newName11.charAt(this.newName11.length-4)+this.newName11.charAt(this.newName11.length-3)+this.newName11.charAt(this.newName11.length-2)+this.newName11.charAt(this.newName11.length-1))
        }else{
          this.newName11 =(this.newName11.charAt(this.newName11.length-23)+this.newName11.charAt(this.newName11.length-22)+this.newName11.charAt(this.newName11.length-21)+this.newName11.charAt(this.newName11.length-20)+this.newName11.charAt(this.newName11.length-19)+this.newName11.charAt(this.newName11.length-18)+this.newName11.charAt(this.newName11.length-17)+this.newName11.charAt(this.newName11.length-16)+this.newName11.charAt(this.newName11.length-15)+this.newName11.charAt(this.newName11.length-14)+this.newName11.charAt(this.newName11.length-13)+this.newName11.charAt(this.newName11.length-12)+this.newName11.charAt(this.newName11.length-11)+this.newName11.charAt(this.newName11.length-10)+this.newName11.charAt(this.newName11.length-9)+this.newName11.charAt(this.newName11.length-8)+this.newName11.charAt(this.newName11.length-7)+this.newName11.charAt(this.newName11.length-6)+this.newName11.charAt(this.newName11.length-5)+this.newName11.charAt(this.newName11.length-4)+this.newName11.charAt(this.newName11.length-3)+this.newName11.charAt(this.newName11.length-2)+this.newName11.charAt(this.newName11.length-1))
        }
      }else{
        this.fileToUpload11 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }
    public fileToUpload12: Array<File>
    public newName12
    fileChangeEvent12(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi' || file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif' || file_path2[file_path2.length-1] == 'mp4'|| file_path2[file_path2.length-1] == 'mov'|| file_path2[file_path2.length-1] == 'avi'){
          if(file_path1[0].size > 5000000){
            this.fileToUpload1 = undefined
          swal("Error!"," El paso de la imagen tiene que ser menor a 5 MB" , "error");
          return
          }
        }
        this.fileToUpload12 = <Array<File>>fileInput.target.files
        this.newName12 =this.fileToUpload12[0].name
        if(this.newName12.charAt(this.newName12.length-24)){
          this.newName12 =('...'+this.newName12.charAt(this.newName12.length-21)+this.newName12.charAt(this.newName12.length-20)+this.newName12.charAt(this.newName12.length-19)+this.newName12.charAt(this.newName12.length-18)+this.newName12.charAt(this.newName12.length-17)+this.newName12.charAt(this.newName12.length-16)+this.newName12.charAt(this.newName12.length-15)+this.newName12.charAt(this.newName12.length-14)+this.newName12.charAt(this.newName12.length-13)+this.newName12.charAt(this.newName12.length-12)+this.newName12.charAt(this.newName12.length-11)+this.newName12.charAt(this.newName12.length-10)+this.newName12.charAt(this.newName12.length-9)+this.newName12.charAt(this.newName12.length-8)+this.newName12.charAt(this.newName12.length-7)+this.newName12.charAt(this.newName12.length-6)+this.newName12.charAt(this.newName12.length-5)+this.newName12.charAt(this.newName12.length-4)+this.newName12.charAt(this.newName12.length-3)+this.newName12.charAt(this.newName12.length-2)+this.newName12.charAt(this.newName12.length-1))
        }else{
          this.newName12 =(this.newName12.charAt(this.newName12.length-23)+this.newName12.charAt(this.newName12.length-22)+this.newName12.charAt(this.newName12.length-21)+this.newName12.charAt(this.newName12.length-20)+this.newName12.charAt(this.newName12.length-19)+this.newName12.charAt(this.newName12.length-18)+this.newName12.charAt(this.newName12.length-17)+this.newName12.charAt(this.newName12.length-16)+this.newName12.charAt(this.newName12.length-15)+this.newName12.charAt(this.newName12.length-14)+this.newName12.charAt(this.newName12.length-13)+this.newName12.charAt(this.newName12.length-12)+this.newName12.charAt(this.newName12.length-11)+this.newName12.charAt(this.newName12.length-10)+this.newName12.charAt(this.newName12.length-9)+this.newName12.charAt(this.newName12.length-8)+this.newName12.charAt(this.newName12.length-7)+this.newName12.charAt(this.newName12.length-6)+this.newName12.charAt(this.newName12.length-5)+this.newName12.charAt(this.newName12.length-4)+this.newName12.charAt(this.newName12.length-3)+this.newName12.charAt(this.newName12.length-2)+this.newName12.charAt(this.newName12.length-1))
        }
      }else{
        this.fileToUpload12 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .mp4, .avi, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");      }
    }

    makeFileRequest(url:string, params:Array<string>,files:Array<File>){
      var token = this.token
      return new Promise(function(resolve, reject){
        var formData:any = new FormData()
        var xhr = new XMLHttpRequest()
        for(var i=0; i<files.length; i++){
          formData.append("image", files[i],files[i].name)
        }

        xhr.onreadystatechange = function(){
          if(xhr.readyState==4){
            if(xhr.status ==200){
              resolve(JSON.parse(xhr.response))
            }else{
              reject(xhr.response)
            }
          }
        }
        xhr.open("POST",url,true)
        xhr.setRequestHeader("Authorization",token)
        xhr.send(formData)
      })
    }

    imgCancel1(){
      this.fileToUpload1 = undefined
      this.fileToUpload2 = undefined
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined

    }
    imgCancel2(){
      this.fileToUpload2 = undefined
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel3(){
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel4(){
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined    
    }
    imgCancel5(){
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined    
    }
    imgCancel6(){
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel7(){
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel8(){
      this.fileToUpload8 = undefined
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel9(){
      this.fileToUpload9 = undefined
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel10(){
      this.fileToUpload10 = undefined
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel11(){
      this.fileToUpload11 = undefined
      this.fileToUpload12 = undefined
    }
    imgCancel12(){
      this.fileToUpload12 = undefined
    }
    
    onClickdismis(){
      this.table = "original"
    }

    onClickmore(){
      this.table = "segunda"
    }

}
