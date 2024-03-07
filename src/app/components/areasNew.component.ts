import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'areasNew',
    templateUrl: '../views/areasNew.html',
    providers: [UsersService]
})

export class AreasNewComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public usersAdmins;
    public names;
    public shortName;
    public responsable;
    public departments


    constructor(
        private _userService: UsersService
    ){
        this.title = 'Nueva área'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.names = "";
        this.shortName = "";
        this.responsable = "";

    }


    ngOnInit(){
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
        var newDate ={name: this.names, responsable: this.responsable}

        this._userService.newArea(newDate).subscribe(
          response=>{
            this.names= ''
            this.responsable = ''
            swal("¡Éxito!", "Área " + " guardado exitosamente", "success")
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
