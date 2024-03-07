import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';
import { Console } from 'console';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'usersEdit',
    templateUrl: '../views/usersEdit.html',
    providers: [UsersService]
})

export class UsersEditComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public activeChange = false
    public password = null
    public password2 = null

    constructor(
        private _userService: UsersService
    ){
        this.title = 'Actualizar mis datos'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.users = this.identity;
    }


    ngOnInit(){
    }

    changePassword(){
        this.activeChange = true
    }

    changePassword2(){
        this.activeChange = true
        if( !this.password || !this.password2 || this.password != this.password2){
            swal("Error!", "La contraseñas no coincide", "error");
        }else{
            var send = {
                user : this.users,
                newPassword : this.password
            }
            this._userService.updatePassword(send).subscribe(
                response=>{
                    this.activeChange = false
                    this.password = null
                    this.password2 = null
                    swal("¡Éxito!", "Contraseña actualizada", "success");
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

    onSubmit(){
        this._userService.updateUser(this.users).subscribe(
            response=>{
                if(!response.userUpdated){
                    swal("Error!", "Usuario no se actualizo", "error");
                }else{
                    swal("¡Éxito!", "Usuario actualizado exitosamente", "success");
                    localStorage.setItem('identity', JSON.stringify(this.users))
                }
            }, error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  var body = JSON.parse(error._body)
                }
              }
        )
    }

}
