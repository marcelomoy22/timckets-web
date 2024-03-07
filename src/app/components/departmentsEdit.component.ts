import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'departmentsEdit',
    templateUrl: '../views/departmentsEdit.html',
    providers: [UsersService]
})

export class DepartmentsEditComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public usersAdmins;
    public names;
    public shortName;
    public responsable;
    public departments
    public active;
    public id;

    constructor(
        private _userService: UsersService
    ){
        this.title = 'Nuevos Departamentos'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.names = "";
        this.shortName = "";
        this.responsable = "";
        this.active = "";        
    }

    ngOnInit(){
          this.identity.remitente="todos"
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
                swal("Error!", "errrrrrr", "error");
              }
            }
          )
    }

    clickEdit(item){
      this.id = item._id
      this.names = item.name
      this.shortName = item.shortName
      if(item.responsable) this.responsable = item.responsable._id
      this.active = item.active
    }

    editDepartment(){
      
      if(this.active == "false"){
        this.active = false
      } if(this.active == "true"){
        this.active = true
      }

      var editDepartment = {
        _id: this.id,
        name: this.names,
        shortName: this.shortName,
        responsable: this.responsable,
        active: this.active
      }


      this._userService.editDepartments(this).subscribe(
        response=>{
            swal("¡Éxito!", "servicio creado" , "success")
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


}
