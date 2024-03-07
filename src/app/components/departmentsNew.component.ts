import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'departmentsNew',
    templateUrl: '../views/departmentsNew.html',
    providers: [UsersService]
})

export class DepartmentsNewComponent implements OnInit{
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
        this.title = 'Nuevos Departamentos'
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
    }

    onSubmitNew(){
        var newDate ={name: this.names, shortName: this.shortName, responsable: this.responsable}

        this._userService.newDepartments(newDate).subscribe(
            response=>{
              this.names= ''
              this.shortName = ''
              this.responsable = ''
              swal("¡Éxito!", "Departamento " + response.users.name + " guardado exitosamente", "success")
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
