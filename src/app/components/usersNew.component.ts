import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';
import { switchAll } from 'rxjs/operators';
import { Console } from 'console';
import { CONNREFUSED } from 'dns';


const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'usersNew',
    templateUrl: '../views/usersNew.html',
    providers: [UsersService]
})

export class UsersNewComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public departments;
    public areas;
    public proveedores;
    public usersAdmins;


    constructor(
        private _userService: UsersService
    ){
        this.title = 'Crear usuarios o sucursales'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.users = new Users('','','','','','','','','','','','','','','','','','','','');
        this.users.type = "";
        this.users.department = "";
        this.users.state = "";
        this.users.business = "";
    }


    ngOnInit(){
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
          this._userService.getAreas().subscribe(
            response=>{
                this.areas = response
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                swal("Error!", "errrrrrr", "error");
              }
            }
          )
          this._userService.getProveedores().subscribe(
            response=>{
                this.proveedores = response
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
                swal("Error!", "errrrrrr", "error");
              }
            }
          )
    }

    onSubmitNew(){
        if(this.users.password != this.users.password2){
            swal("Error!", "La contraseñas no coincide", "error");
        }else{ 
            if(this.users.type != ""){
            if(this.users.type != "local"){
                    if(this.users.business != ""){
                        if(this.users.state != ""){
                                        
                            this._userService.newUser(this.users).subscribe(
                                response=>{
                                    swal("¡Éxito!", "Usuario " + response.users.fname + " " + response.users.lname + " guardado exitosamente", "success")
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
                        }else{
                            swal("Error!", "Escoje el estado", "error");
                        }
                    }else{
                        swal("Error!", "Escoje la empresa", "error");
                    }
                
            }else{
                if(this.users.state != ""){
                    this.users.business = null

                    this._userService.newUser(this.users).subscribe(
                        response=>{
                            swal("¡Éxito!", "Usuario " + response.users.fname + " " + response.users.lname + " guardado exitosamente", "success")
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
                }else{
                    swal("Error!", "Escoje el estado", "error");
                }
            }
            }else{
                swal("Error!", "Escoje el perfil", "error");
            }
        }
    }

}
