import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Users } from '../models/users';
import { Console } from 'console';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'localsEdit',
    templateUrl: '../views/localsEdit.html',
    providers: [UsersService]
})

export class LocalsEditComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public getLocals
    public oldData
    public search= [];
    public sortBy = "name";
    public local
    public areas


    constructor(
        private _userService: UsersService
    ){
        this.title = 'Sucursales'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.users = this.identity;
    }


    ngOnInit(){
      this._userService.getLocals().subscribe(
        getLocals=>{
            this.getLocals = getLocals
            this.oldData = getLocals
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            // var body = JSON.parse(error._body)
            swal("Error!", "errrrrrr", "error");
          }
        }
      )

      this._userService.allAreasOnly().subscribe(
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



    searchname(toSearch){
        toSearch= toSearch.toUpperCase()
        var newData = []
        if(toSearch!=""){
          var go =toSearch.toUpperCase()
          go= go.toString()
          this.oldData.forEach(element => {
            element.name2= element.name.toUpperCase()
            if(element.name2.indexOf(go)>=0){
              newData.push(element)
            }else{
            }
          });
          this.getLocals = newData
        }else{
          this.getLocals = this.oldData
        }
      }




      cambioLocal(newLocal){
        if(newLocal.name =="" || newLocal.area._id=="" || newLocal.street=="" || newLocal.street==undefined || newLocal.numExt==""  || newLocal.numExt==undefined || newLocal.suburb=="" || newLocal.suburb==undefined || newLocal.state=="" || newLocal.state==undefined || newLocal.postalCode=="" || newLocal.postalCode==undefined || newLocal.municipality=="" || newLocal.municipality==undefined){
          swal("Error!", "Complete los campos con *", "error");
        }else{
          this._userService.editLocal(newLocal).subscribe(
            response=>{
                swal("¡Éxito!", "Sucursal editado" , "success")
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
      


}
