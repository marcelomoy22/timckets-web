import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'areasEdit',
    templateUrl: '../views/areasEdit.html',
    providers: [UsersService]
})

export class AreasEditComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public areas;
    public item;
    public usersAdmins;
    public getLocals;
    public responsable
    public active;
    public moreResponsable;

    constructor(
        private _userService: UsersService
    ){
        this.title = 'Nueva área'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.responsable =""
    }


    ngOnInit(){
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
    }

    areaClick(item){
      this.item = item
      this.responsable = item.area.responsable._id
      this.active = item.area.active
      

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
      this._userService.getLocals().subscribe(
        getLocals=>{
            this.getLocals = getLocals
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
