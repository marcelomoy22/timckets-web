import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { RequestProcesService } from '../services/requestProces.service';
import { RequestNewService } from '../services/requestNew.service';
import {GLOBAL} from '../services/global';
import * as moment from 'moment';


import { Users } from '../models/users';
import { Console } from 'console';

const swal = require('../../assets/sweetalert/sweetalert.js')
var async = require('async');


@Component({
    selector: 'requestDetail',
    templateUrl: '../views/requestDetail.html',
    providers: [UsersService, RequestProcesService, RequestNewService]
})

export class RequestDetailComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public ruta;
    public issue;
    public load;
    public getImg;
    public getAfterFile;
    public url: string;
    public permiso
    public getEvent
    public eventsAnalyst
    public eventsCopy
    public encuesta
    public llenado
    public llenadoNum
    public encuestaComents
    public menus
    public cantBolsasComprobantes
    public numBolsaTipoCaja
    public kds
    public medidas
    public pos
    public respuesta
    public issueAsignar
    public departments;
    public allIsues;
    public oldData;
    public service
    public subCategorys
    public statusEx
    public statusExtype


    constructor(
        private route: ActivatedRoute,
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService,
        private _requestNewService: RequestNewService,

    ){
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.route.params.subscribe(params=>{
            this.ruta = params['id']
        })
        this.title = 'Requerimiento  ' + this.ruta
        this.load = false
        this.getImg= null
        this.getEvent= null
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
        this.menus=[]
        this.cantBolsasComprobantes=[]
        this.numBolsaTipoCaja=[]
        this.kds=[]
        this.medidas=[]
        this.pos=[]
        this.llenado=false
        this.encuestaComents=''
    }

    momentTime(date) {
        if (date)
          return moment(date).format('YYYY-MM-DD / HH:mm')
        else
          return ''
      }

    ngOnInit(){
        this._requestProcesService.getOneRequest({ruta: this.ruta}).subscribe(
            response=>{
                if(response[0].imagenes){
                    if(response[0].imagenes[0]){
                        response[0].imagenes.forEach((element,i) => {
                            if(element.ext){
                                if(element.ext == 'png' || element.ext == 'PNG' || element.ext == 'jpg' || element.ext == 'jpeg' || element.ext == 'gif'){
                                    response[0].imagenes[i].permiso = "si"
                                }
                            }else{
                                response[0].imagenes[i].permiso = "si"
                            }
                    });
                }
            }

            if(response[0].afterFiles){
                if(response[0].afterFiles[0]){
                  response[0].afterFiles2=[]
                    response[0].afterFiles.forEach((element,i) => {
                      if(element){
                        if(element.ext){
                            if(element.ext == 'png' || element.ext == 'PNG' || element.ext == 'jpg' || element.ext == 'jpeg' || element.ext == 'gif'){
                                response[0].afterFiles[i].permiso = "si"
                            }
                        }else{
                            response[0].afterFiles[i].permiso = "si"
                        }
                        response[0].afterFiles2.push(element)
                      }
                });
            }
        }


                if(!response[0].reportBy.name)  response[0].reportBy.name = response[0].reportBy.fname + " " + response[0].reportBy.lname
                    this.issue= response[0]
                    if(this.issue.menuboards){
                      if(this.issue.menuboards.promopanel==true){
                        this.menus.push(" 1- Promo panel")
                      }
                      if(this.issue.menuboards.panaderia==true){
                        this.menus.push(" 2- Panaderia")
                      }
                      if(this.issue.menuboards.bebidasCalientes==true){
                        this.menus.push(" 3- Bebidas Calientes")
                      }
                      if(this.issue.menuboards.babidasFrias==true){
                        this.menus.push(" 4- Bebidas Frias")
                      }
                      if(this.issue.menuboards.dasayunosLunch==true){
                        this.menus.push(" 5- Desayunos | Lunch")
                      }
                    }

                    if(this.issue.cantBolsasComprobantes){
                      if(this.issue.cantBolsasComprobantes.bolsas==true){
                        this.cantBolsasComprobantes.push(" 100 bolsas")
                      }
                      if(this.issue.cantBolsasComprobantes.comprobantes==true){
                        this.cantBolsasComprobantes.push(" 100 Comprobantes")
                      }
                    }

                    if(this.issue.numBolsaTipoCaja){
                      if(this.issue.numBolsaTipoCaja.numBolsas!=""){
                        this.numBolsaTipoCaja.push(" No. Bolsa: " + this.issue.numBolsaTipoCaja.numBolsas)
                      }
                      if(this.issue.numBolsaTipoCaja.tipoCaja){
                        this.numBolsaTipoCaja.push(" Tipo Caja: "+this.issue.numBolsaTipoCaja.tipoCaja)
                      }
                    }

                    if(this.issue.kds){
                      if(this.issue.kds.expo1==true){
                        this.kds.push(" Expo - FOH")
                      }
                      if(this.issue.kds.expo2==true){
                        this.kds.push(" Expo - Drive Thru")
                      }
                      if(this.issue.kds.expoDelivery==true){
                        this.kds.push(" Expo - Delivery")
                      }
                      if(this.issue.kds.sandwiches==true){
                        this.kds.push(" Sándwiches")
                      }
                      if(this.issue.kds.bebidasCalientes==true){
                        this.kds.push(" Hot Beverages")
                      }
                      if(this.issue.kds.bebidasFrias==true){
                        this.kds.push(" Cold Beverages")
                      }
                      if(this.issue.kds.expoFor1And2==true){
                        this.kds.push(" Expo For 1 And 2")
                      }
                      if(this.issue.kds.expoFor3And4==true){
                        this.kds.push(" Expo For 3 And 4")
                      }
                      if(this.issue.kds.refreshersAndBrew==true){
                        this.kds.push(" Refresh and Bunn")
                      }
                      if(this.issue.kds.espressoOnly==true){
                        this.kds.push(" Espresso Only")
                      }
                      if(this.issue.kds.bakeryOnly==true){
                        this.kds.push(" Bakery Only")
                      }
                    }

                    if(this.issue.pos){
                      if(this.issue.pos.fcRight==true){
                        this.pos.push(" FC 1")
                      }
                      if(this.issue.pos.fcLeft==true){
                        this.pos.push(" FC 2")
                      }
                      if(this.issue.pos.fc3==true){
                        this.pos.push(" FC 3")
                      }
                      if(this.issue.pos.fc4==true){
                        this.pos.push(" FC 4")
                      }
                      if(this.issue.pos.fc5==true){
                        this.pos.push(" FC 5")
                      }
                      if(this.issue.pos.dtOt==true){
                        this.pos.push(" DT OT")
                      }
                      if(this.issue.pos.dtOt2==true){
                        this.pos.push(" DT OT2")
                      }
                      if(this.issue.pos.dtCashier==true){
                        this.pos.push(" DT Cashier")
                      }
                    }

                    if(this.issue.medidas){
                      if(this.issue.medidas.altura!= ""){
                        this.medidas.push(" Altura: "+this.issue.medidas.altura)
                      }
                      if(this.issue.medidas.ancho!= ""){
                        this.medidas.push(" Ancho: " + this.issue.medidas.ancho)
                      }
                      if(this.issue.medidas.profundidad!= ""){
                        this.medidas.push(" Profundidad: " + this.issue.medidas.profundidad)
                      }
                    }

                    this.permiso =""
                    if(this.issue.issueMore.emailToSendAnalist.indexOf(this.identity._id) == -1){
                        this.permiso ="no"
                    }else{
                        this.permiso ="si"
                    }
            }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                var body = JSON.parse(error._body)
                swal("Error!", body.message, "error");
                }            
            }
        )
    }

    getImgs(issue){
        this.getImg = issue
        this.getEvent = null
        this.getAfterFile = null
    }

    getAfterFiles(issue){
        this.getAfterFile = issue
        this.getEvent = null
        this.getImg = null
    }

    getDetalle(issue){
        this.getImg = null
        this.getAfterFile = null
        this.getEvent = null
    }
    getEvento(issue){
        this.getEvent = issue
        this.getImg = null
        this.getAfterFile = null

        this._requestProcesService.eventos(issue).subscribe(
            response=>{
                this.eventsAnalyst= response[0]
                this.eventsCopy= response[1]
              }, error=>{
                  var errorMessage = error;
                  if(errorMessage != null){
                  swal("Error!","errorMessage" , "error");
                  }            
              }
          )
    }

    asignar(issue){
        swal("¿Quieres asignarte el timcket?", {
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: "NO",
              catch: {
                text: "Asignármelo",
                value: true,
              },
              defeat: false,
            },
          })
          .then((value) => {
            if (!value) {
            }
            else {
                this.load = true
                issue.analyst = this.identity._id
                this._requestProcesService.asign(issue).subscribe(
                    response=>{
                        this.load = false
                        swal("Éxito!", "Asignado con éxito" , "success")
                        .then((res)=>{
                        window.location.reload();
                        })
                    }, error=>{
                        var errorMessage = <any>error;
                        if(errorMessage != null){
                        var body = JSON.parse(error._body)
                        swal("Error!", body.message, "error");
                        }            
                    }
                )


                }
            });

        }

        asignarCallCenter(issue){
          this.load = true
          if(issue.issueMore && issue.issueMore.subcategory && issue.issueMore.subcategory!='' && issue.motivoAsignadoCallCenter && issue.motivoAsignadoCallCenter!=''){
            if(issue.issueMore.subcategory != issue.subCategory){
              issue.changeOriginIssue = issue.issue
              this.subCategorys.forEach(element => {
                if(element.subcategory == issue.issueMore.subcategory){
                  issue.issue = element._id
                  issue.issueMore = element
                  issue.service = element.service
                  issue.subCategory = element.subcategory
                  issue.department = element.departments
                }
              });
          }else{
            issue.issue =  issue.issue._id
            issue.changeOriginIssue = undefined
          }


      this._requestProcesService.asignCallCenter(issue).subscribe(
        response=>{
          this.load = false
          swal("Éxito!", "Asignado con éxito" , "success")
          .then((res)=>{
          window.location.reload();
          })
        }, error=>{
          this.load = false
            var errorMessage = error;
            if(errorMessage != null){
            swal("Error!","errorMessage" , "error");
            }            
        }
    )

          }else{
            swal("Error!", "Completa los campos", "error");  
            this.load = false
          }
        }

        getReAsignar(issue){
          this.issue = issue 
          this.issue.newAnalist = this.issue.analyst._id
        }

        reAsignar(issue){
          swal("¿Quieres Re-Asignarte el timcket?", {
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: "NO",
              catch: {
                text: "Re-Asignar",
                value: true,
              },
              defeat: false,
            },
          })
          .then((value) => {
            if (!value) {
            }
            else {
              this.load = true
              issue.analyst = issue.newAnalist
              this._requestProcesService.reAsign(issue).subscribe(
                  response=>{
                      this.load = false
                      swal("Éxito!", "Re-Asignado con éxito" , "success")
                      .then((res)=>{
                      window.location.reload();
                      })
                  }, error=>{
                      var errorMessage = <any>error;
                      if(errorMessage != null){
                      var body = JSON.parse(error._body)
                      swal("Error!", body.message, "error");
                      }            
                  }
              )
                }
            });
        }

    sendMesage(issue){
        if(!issue.note){
            swal("Error!","Escriba una nota" , "error");
        }else{
        swal("¿Quieres enviar el mensaje?", {
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: "NO",
              catch: {
                text: "Enviar",
                value: true,
              },
              defeat: false,
            },
          })
          .then((value) => {
            if (!value) {
            }
            else {
        this.load = true
        if( this.identity.name==undefined ||this.identity.name=='') issue.reportBy.name =  this.identity.fname + " " +  this.identity.lname
        issue.typeNote = "public"
        issue.typeIdentity = this.identity.type

        const thisAsync = this
        const issues = issue

        
        async.waterfall([
          function step1(next) {
            const imgArray=[]
            if(thisAsync.fileToUpload1){
                imgArray.push(thisAsync.fileToUpload1)
            }else{
              thisAsync.fileToUpload2= undefined
              thisAsync.fileToUpload3= undefined
              thisAsync.fileToUpload4= undefined
              thisAsync.fileToUpload5= undefined
            }
            if(thisAsync.fileToUpload2){
                imgArray.push(thisAsync.fileToUpload2)
              }else{
                thisAsync.fileToUpload3= undefined
                thisAsync.fileToUpload4= undefined
                thisAsync.fileToUpload5= undefined
              }
            if(thisAsync.fileToUpload3){
                imgArray.push(thisAsync.fileToUpload3)
              }else{
                thisAsync.fileToUpload4= undefined
                thisAsync.fileToUpload5= undefined
              }
            if(thisAsync.fileToUpload4){
                imgArray.push(thisAsync.fileToUpload4)
              }else{
                thisAsync.fileToUpload5= undefined
              }
            if(thisAsync.fileToUpload5){
                imgArray.push(thisAsync.fileToUpload5)
            }
            const imgArrays =imgArray
            next(null ,imgArrays)
          },

          function step2(imgArray, next) {
            const imgNames =[]
            if(thisAsync.fileToUpload1){
              if(imgArray.length>0){
                for(var i=0; i<imgArray.length; i++){
                  thisAsync.makeFileRequest(thisAsync.url+"requests/uploadImageAfter/"+ thisAsync.identity._id,[],imgArray[i]).then(
                  (result)=>{
                    imgNames.push(result)
                    if(imgArray.length == imgNames.length){
                      next(null, imgArray, imgNames)
                    }
                  })
                }
              }else{
                next(null, imgArray, imgNames)
              }
            }else{
              next(null, imgArray, imgNames)
            }
          },

          function step3(imgArray, imgNames, next) {
            if(thisAsync.fileToUpload1){
              if(thisAsync.issue.afterFiles){
                 if(thisAsync.issue.afterFiles[0]){
                     thisAsync.issue.afterFiles.push(imgNames[0])
                     if(imgNames.length==1){
                      next(null, imgArray, imgArray, imgNames)
                   }
                     if(imgNames[1]){
                         thisAsync.issue.afterFiles.push(imgNames[1])
                         if(imgNames.length==2){
                            next(null, imgArray, imgArray, imgNames)
                         }
                     }
                     if(imgNames[2]){
                         thisAsync.issue.afterFiles.push(imgNames[2])
                         if(imgNames.length==3){
                          next(null, imgArray, imgArray, imgNames)
                       }
                     }
                     if(imgNames[3]){
                         thisAsync.issue.afterFiles.push(imgNames[3])
                         if(imgNames.length==4){
                          next(null, imgArray, imgArray, imgNames)
                       }
                     }
                     if(imgNames[4]){
                         thisAsync.issue.afterFiles.push(imgNames[4])
                         if(imgNames.length==5){
                          next(null, imgArray, imgArray, imgNames)
                       }
                     }
                 }else{
                     thisAsync.issue.afterFiles = imgNames
                    next(null, imgArray, imgArray, imgNames)
                 }
              }else{
                 thisAsync.issue.afterFiles = imgNames
                next(null, imgArray, imgArray, imgNames)
              }
             }else{
              next(null, imgArray, imgArray, imgNames)
             }

          },

          function step4(imgArray, nop, imgNames, next) {
          setTimeout(() => {
            if(imgNames.length == imgArray.length){
                thisAsync._requestProcesService.addNote(issues).subscribe(
                response=>{
                  thisAsync.load = false
                    swal("¡Éxito!", "mensaje  " + "  enviado" , "success")
                    .then((res)=>{
                        window.location.reload();
                    })
                }, error=>{
                    var errorMessage = error;
                    if(errorMessage != null){
                        swal("Error!","errorMessage" , "error");
                        window.location.reload();
                    }            
                })
            }
        
          }, 3000);
        }

        ], function (err) {
          console.log(err);
        });



    }
    })
  
    }
    }


    addPendiente(issue){
        this.issue=issue
    }
    addPendienteCallCenter(issue){
      this.issue=issue
  }

    pendiente(issue){
        if(!issue.pending){
            swal("Error!","Escriba el motivo" , "error");
        }else{
            this.load = true
            this._requestProcesService.addPending(issue).subscribe(
                response=>{
                    this.load = false
                    swal("¡Éxito!", "Marcado como pendiente" , "success")
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

    }

    pendienteCallCenter(issue){
      if(!issue.pendingCallCenter){
          swal("Error!","Escriba el motivo" , "error");
      }else{
          this.load = true
          this._requestProcesService.addPendingCallCenter(issue).subscribe(
              response=>{
                  this.load = false
                  swal("¡Éxito!", "Marcado como pendiente" , "success")
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
  }

    addSolucionado(issue){
        this.issue=issue
    }
    addSolucionadoCallCenter(issue){
      this.issue=issue
  }

    buttonAsignarAnalista(issue){
      this.issueAsignar=issue
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

    var department = {service: this.issueAsignar.issueMore.departments}
      this._requestNewService.searchService(department).subscribe(
        response=>{
          this.service=[]
          response.forEach(element => {
            if(element._id){
              this.service.push(element)
            }
          });
        }, error=>{
            var errorMessage = error;
            if(errorMessage != null){
            swal("Error!","errorMessage" , "error");
            }            
        }
    )

    var service = {service: this.issueAsignar.issueMore.service}
      this._requestNewService.searchSubCategoria(service).subscribe(
        response=>{
          this.subCategorys= response
        }, error=>{
            var errorMessage = error;
            if(errorMessage != null){
            swal("Error!","errorMessage" , "error");
            }            
        }
      )
    }

    searchServices(issue){
      this.issue.issueMore.service = ""
      this.issue.issueMore.subcategory= ""
    var department = {service: issue}
    this._requestNewService.searchService(department).subscribe(
      response=>{
        this.service=[]
        response.forEach(element => {
          if(element._id){
            this.service.push(element)
          }
        });
      }, error=>{
          var errorMessage = error;
          if(errorMessage != null){
          swal("Error!","errorMessage" , "error");
          }            
      }
  )
    }

    searchsubCategory(issue){
      this.issue.issueMore.subcategory= ""
      var service = {service: this.issueAsignar.issueMore.service}
      this._requestNewService.searchSubCategoria(service).subscribe(
        response=>{
          this.subCategorys= response
        }, error=>{
            var errorMessage = error;
            if(errorMessage != null){
            swal("Error!","errorMessage" , "error");
            }            
        }
      )
    }

    subCategoryFinish(issue){
    }

    solucionado(issue){
        if(!issue.solution){
            swal("Error!","Escriba el motivo" , "error");
        }else{
          if(issue.solution.length<12){
            swal("Error!","Complete mas información" , "error");
          }else{
            swal("¿Quieres marcar como solucionado?", {
                icon: 'warning',
                dangerMode: true,
                buttons: {
                  cancel: "NO",
                  catch: {
                    text: "Solucionado",
                    value: true,
                  },
                  defeat: false,
                },
              })
              .then((value) => {
                if (!value) {
                }
                else {
                  issue.solutionBy= this.identity._id
                  if(this.identity.type=="local"){
                    issue.solutionBySucursal="si"
                  }else{
                    issue.solutionBySucursal="no"
                  }
            this.load = true
            this._requestProcesService.addSolution(issue).subscribe(
                response=>{
                    this.load = false
                    swal("¡Éxito!", "Solucionado" , "success")
                    .then((res)=>{
                        window.location.reload();
                    })
                }, error=>{
                    var errorMessage = error;
                    if(errorMessage != null){
                    console.log(errorMessage)
                    swal("Error!","errorMessage" , "error");
                    }            
                }
            )
                }
            })
          }
        }
    }

    solucionadoCallCenter(issue){
      if(!issue.solutionCallCenter){
          swal("Error!","Escriba el motivo" , "error");
      }else{
          swal("¿Quieres marcar como solucionado?", {
              icon: 'warning',
              dangerMode: true,
              buttons: {
                cancel: "NO",
                catch: {
                  text: "Solucionado",
                  value: true,
                },
                defeat: false,
              },
            })
            .then((value) => {
              if (!value) {
              }
              else {
                issue.solutionBy= this.identity._id
                if(this.identity.type=="local"){
                  issue.solutionBySucursal="si"
                }else{
                  issue.solutionBySucursal="no"
                }
          this.load = true
          this._requestProcesService.addSolutionCallCenter(issue).subscribe(
              response=>{
                  this.load = false
                  swal("¡Éxito!", "Solucionado" , "success")
                  .then((res)=>{
                      window.location.reload();
                  })
              }, error=>{
                  var errorMessage = error;
                  if(errorMessage != null){
                  console.log(errorMessage)
                  swal("Error!","errorMessage" , "error");
                  }            
              }
          )
              }
          })
      }
  }

    onSubmit(){

    }

    public fileToUpload1: Array<File>
    public newName1
    fileChangeEvent1(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload1 = <Array<File>>fileInput.target.files
        this.newName1 =this.fileToUpload1[0].name
        if(this.newName1.charAt(this.newName1.length-24)){
          this.newName1 =('...'+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }else{
          this.newName1 =(this.newName1.charAt(this.newName1.length-23)+this.newName1.charAt(this.newName1.length-22)+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }
      }else{
        this.fileToUpload1 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload2: Array<File>
    public newName2
    fileChangeEvent2(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload2 = <Array<File>>fileInput.target.files
        this.newName2 =this.fileToUpload2[0].name
        if(this.newName2.charAt(this.newName2.length-24)){
          this.newName2 =('...'+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }else{
          this.newName2 =(this.newName2.charAt(this.newName2.length-23)+this.newName2.charAt(this.newName2.length-22)+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }
      }else{
        this.fileToUpload2 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload3: Array<File>
    public newName3
    fileChangeEvent3(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload3 = <Array<File>>fileInput.target.files
        this.newName3 =this.fileToUpload3[0].name
        if(this.newName3.charAt(this.newName3.length-24)){
          this.newName3 =('...'+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }else{
          this.newName3 =(this.newName3.charAt(this.newName3.length-23)+this.newName3.charAt(this.newName3.length-22)+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }
      }else{
        this.fileToUpload3 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload4: Array<File>
    public newName4
    fileChangeEvent4(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload4 = <Array<File>>fileInput.target.files
        this.newName4 =this.fileToUpload4[0].name
        if(this.newName4.charAt(this.newName4.length-24)){
          this.newName4 =('...'+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }else{
          this.newName4 =(this.newName4.charAt(this.newName4.length-23)+this.newName4.charAt(this.newName4.length-22)+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }
      }else{
        this.fileToUpload4 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload5: Array<File>
    public newName5
    fileChangeEvent5(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'PNG' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload5 = <Array<File>>fileInput.target.files
        this.newName5 =this.fileToUpload5[0].name
        if(this.newName5.charAt(this.newName5.length-24)){
          this.newName5 =('...'+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }else{
          this.newName5 =(this.newName5.charAt(this.newName5.length-23)+this.newName5.charAt(this.newName5.length-22)+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }
      }else{
        this.fileToUpload5 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }
    

    imgCancel1(){
        this.fileToUpload1 = undefined
    }
    imgCancel2(){
        this.fileToUpload2 = undefined
    }
    imgCancel3(){
        this.fileToUpload3 = undefined
    }
    imgCancel4(){
        this.fileToUpload4 = undefined
    }
    imgCancel5(){
        this.fileToUpload5 = undefined
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

    editPendiente(issue){
      this.load = true
      this._requestProcesService.editPending(issue).subscribe(
        response=>{
            this.load = false
            swal("Éxito!", "Editado con éxito" , "success")
            .then((res)=>{
            window.location.reload();
            })
        }, error=>{
            var errorMessage = <any>error;
            if(errorMessage != null){
            var body = JSON.parse(error._body)
            swal("Error!", body.message, "error");
            }            
        }
      )
    }

    editPendienteCC(issue){
      this.load = true
      this._requestProcesService.editPendingCC(issue).subscribe(
        response=>{
            this.load = false
            swal("Éxito!", "Editado con éxito" , "success")
            .then((res)=>{
            window.location.reload();
            })
        }, error=>{
            var errorMessage = <any>error;
            if(errorMessage != null){
            var body = JSON.parse(error._body)
            swal("Error!", body.message, "error");
            }            
        }
      )
    }

    reaperturar(issue){
      if(!issue.motivoReapertura){
        swal("Error!","Escriba el motivo" , "error");
    }else{
        swal("¿Quieres marcar como reaperturado?", {
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: "NO",
              catch: {
                text: "Reaperturado",
                value: true,
              },
              defeat: false,
            },
          })
          .then((value) => {
            if (!value) {
            }
            else {
        this.load = true
        this._requestProcesService.addReaperturar(issue).subscribe(
            response=>{
                this.load = false
                swal("¡Éxito!", "Reaperturado" , "success")
                .then((res)=>{
                    window.location.reload();
                })
            }, error=>{
                var errorMessage = error;
                this.load = false
                if(errorMessage != null){
                console.log(errorMessage)
                swal("Error!","errorMessage" , "error");
                }            
            }
        )
            }
        })
    }

    }

    encuesta5(encuesta){
      if(this.encuesta.cinco==true){
        this.llenado=true
        this.encuesta={
          cinco: true,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
        this.llenadoNum=5
      }else{
        this.llenado=false
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
      }
    }
    encuesta4(encuesta){
      if(this.encuesta.cuatro==true){
        this.llenado=true
        this.encuesta={
          cinco: false,
          cuatro: true,
          tres: false,
          dos: false,
          uno: false
        }
        this.llenadoNum=4
      }else{
        this.llenado=false
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
      }
    }
    encuesta3(encuesta){
      if(this.encuesta.tres==true){
        this.llenado=true
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: true,
          dos: false,
          uno: false
        }
        this.llenadoNum=3
      }else{
        this.llenado=false
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
      }  
    }
    encuesta2(encuesta){
      if(this.encuesta.dos==true){
        this.llenado=true
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: true,
          uno: false
        }
        this.llenadoNum=2
      }else{
        this.llenado=false
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
      }
    }
    encuesta1(encuesta){
      if(this.encuesta.uno==true){
        this.llenado=true
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: true
        }
        this.llenadoNum=1
      }else{
        this.llenado=false
        this.encuesta={
          cinco: false,
          cuatro: false,
          tres: false,
          dos: false,
          uno: false
        }
      }
    }

    encuestaClik(issue){
      if(this.llenado==false){
        swal("Error!","Seleccione un puntaje de satisfacciín" , "error");
      }else{
        issue.encuesta = this.llenadoNum
        issue.encuestaComents = this.encuestaComents
        this.load = true
        this._requestProcesService.addEncuesta(issue).subscribe(
            response=>{
                this.load = false
                swal("¡Éxito!", "Contestada" , "success")
                .then((res)=>{
                    window.location.reload();
                })
            }, error=>{
                var errorMessage = error;
                if(errorMessage != null){
                this.load = false
                // console.log(errorMessage)
                swal("Error!","errorMessage" , "error");
                }            
            }
        )
      }
    }

    buttonToPreventivo(issue){
      swal("¿Quieres marcar como solucionado Preventivo?", {
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: "NO",
          catch: {
            text: "Solucionado Preventivo",
            value: true,
          },
          defeat: false,
        },
      })
      .then((value) => {
        if (!value) {
        }
        else {
          issue.solutionBy= this.identity._id
          if(this.identity.type=="local"){
            issue.solutionBySucursal="si"
          }else{
            issue.solutionBySucursal="no"
          }
    this.load = true
    this._requestProcesService.addSolutionPreventivo(issue).subscribe(
        response=>{
            this.load = false
            swal("¡Éxito!", "Solucionado" , "success")
            .then((res)=>{
                window.location.reload();
            })
        }, error=>{
            var errorMessage = error;
            if(errorMessage != null){
            console.log(errorMessage)
            swal("Error!","errorMessage" , "error");
            }            
        }
    )
        }
    })
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
