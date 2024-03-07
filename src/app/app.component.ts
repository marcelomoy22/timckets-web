import { Component, OnInit, style } from '@angular/core';
import {UsersService} from './services/users.service';
import { Users } from './models/users';
import { switchAll } from 'rxjs/operators';
import { VERSION, RUTA } from './services/version';
import { RequestProcesService } from '../app/services/requestProces.service';

const swal = require('../assets/sweetalert/sweetalert.js')
var audio = new Audio('https://dev-soporte.timhortonsmx.com/img/err.mp3');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UsersService, RequestProcesService]
})
export class AppComponent implements OnInit{
  public title = 'Timckets 2.0';
  public users : Users;
  public identity;
  public token;
  public message;
  public changePass
  public password = null
  public password2 = null
  public dataResponseAdmin=[]
  public medida
  public menu
  public version
  public nameText

  constructor(
    private _userService: UsersService,
    private _requestProcesService: RequestProcesService
  ){
    this.version = VERSION.v
    this.users = new Users('','','','','','','','','','','','','','','','','','','','');
    this.changePass = false
    this.medida = "grande"
  }

  ngOnInit(){

    if(screen.width>= 1200 ){
      this.medida= "grande"
    }else{
      this.medida= "chica"
      this.menu = false
    }

    var arreglo= window.location.pathname.split("/")
    var request =arreglo[2]
    if(window.location.pathname.indexOf("changePassword") >0){
      this.changePass = true
      this._userService.oneUser(request).subscribe(
        response=>{
          this.users = response[0]
        })
    }else{
      this.changePass = false
    }

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(!this.identity){
      this.message = null
    }else{
      if(this.identity.type == "admin" || this.identity.type == "superAdmin" || this.identity.type == "areaManager" || this.identity.type == "proveedor" || this.identity.type == "callCenter"){
        if(this.identity.type == "superAdmin"){
          this.message = "Super-Admin"
        }if(this.identity.type == "admin"){
          this.message = "Administrador"
        }if(this.identity.type == "areaManager"){
          this.message = "Area-Manager"
        }if(this.identity.type == "proveedor"){
          this.message = "Proveedor"
        }if(this.identity.type == "callCenter"){
          this.message = "CallCenter"
        }
      }else{
        this.message = "Sucursal"
      }
    }
    
    if(this.identity && this.identity.fname && this.identity.lname){
      this.nameText= this.identity.fname + " "+ this.identity.lname
    }
    
    // this._userService.ensureAuth(this.users).subscribe(
    //   response=>{
    //   }
    //   , error=>{
    //     var errorMessage = <any>error;
    //     if(errorMessage != null){
    //       var body = JSON.parse(error._body)
    //       // swal("Error!", body.message, "error");

    //       localStorage.removeItem('identity')
    //       localStorage.removeItem('token')
    //       localStorage.clear();
    //       this.identity = null;
    //       this.token = null;
    //       this.message = null

    //     }
    //   }

    //   )
      if(this.identity && this.identity!=null && this.identity.type!="proveedor" && this.identity.type!="areaManager"){
        this._requestProcesService.getResponseDepto(this.identity).subscribe(
          response=>{
            if(response.length>0){
            response.forEach(element => {
              this.dataResponseAdmin.push(element)
            });
          }else{
            this.dataResponseAdmin=[]
          }
          }
          , error=>{
            var errorMessage = <any>error;
            if(errorMessage != null){
              var body = JSON.parse(error._body)
              // swal("Error!", body.message, "error");
    
              localStorage.removeItem('identity')
              localStorage.removeItem('token')
              localStorage.clear();
              this.identity = null;
              this.token = null;
              this.message = null
            }
          }
          )
      }
  }

  public onSubmit(){
    if(!this.users.email || !this.users.password){
      // audio.play();
      swal({
        icon: "error",
        title: "Error!",
        text: "Introduce la informacion completa",
        button: {
          text: "OK",
        },
      });
    }else{
    this._userService.signup(this.users).subscribe(
      response=>{
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert("El usuario no está correctamente identificado")
        } else{
          localStorage.setItem('identity',JSON.stringify(identity))
          this._userService.signup(this.users, 'true').subscribe(
            response=>{
              let token = response.token;
              this.token = token;
      
              if(this.token.length <= 0){
                alert("El token no se ha generado correctamente")
              } else{
                localStorage.setItem('token',token)
                this.users = new Users('','','','','','','','','','','','','','','','','','','','');
                window.location.reload();
              }
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                var body = JSON.parse(error._body)
                // audio.play();
                swal("Error!", body.message, "error");
              }
            }
          )
        }
      }, error=>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body)
          // audio.play();
          swal("Error!", body.message, "error");
        }
      }
    )
    }
  }

  resumePasword(){
    swal({
      text: "Ingresa el usuario ó email para enviar un correo electrónico.",
      icon: "warning",
      content: "input",
      buttons: {
        confirm: {
        },
      },
    })
    .then((value) => {
      if(value && value != ""){
        this._userService.resumePasword(value).subscribe(
          response=>{
            swal("¡Éxito!", response.message , "success");
          }, error=>{
            var errorMessage = <any>error;
            if(errorMessage != null){
              var body = JSON.parse(error._body)
              // audio.play();
              swal("Error!", body.message, "error");
            }
          }
        )
      } else{
        // audio.play();
        swal("", `Ingresa el usuario ó email`, "error");
      }
    });
  }

  changePassword2(){
    if( !this.password || !this.password2 || this.password != this.password2){
        swal("Error!", "La contraseñas no coincide", "error");
    }else{
        var send = {
            user : this.users,
            newPassword : this.password
        }
        this._userService.updatePassword(send).subscribe(
            response=>{
                this.password = null
                this.password2 = null
                swal("¡Éxito!", "Contraseña actualizada", "success");
                window.location.reload();
              }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  var body = JSON.parse(error._body)
                  swal("Error!", body.message, "error");
                }
              }
        )
    }
  }

  logout(){
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.home()
  }

  prfile(){
    window.location.assign( RUTA.r + "usersEdit");
  }
  home(){
    window.location.assign( RUTA.r);  
  }
  
  menus(){
    if(this.menu==false){
      this.menu=true
    }else{
      this.menu=false
    }
  }

}
