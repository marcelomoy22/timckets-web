import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestProcesService } from '../services/requestProces.service';
import { RUTA } from '../services/version';

import { Users } from '../models/users';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'home',
    templateUrl: '../views/home.html',
    providers: [UsersService, RequestProcesService]
})

export class HomeComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public dataEncuesta
    public message
    public medida

    constructor(
        private _userService: UsersService,
        private _requestProcesService: RequestProcesService
    ){
        this.title = 'INICIO'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.medida = "grande"
    }


    ngOnInit(){
        if(screen.width>= 1200 ){
            this.medida= "grande"
          }else{
            this.medida= "chica"
          }
        if(this.identity.type != 'local'){
            window.location.assign( RUTA.r + "homeAdmin");
        }else{

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

                this._requestProcesService.getMessages(this.identity).subscribe(
                    response=>{
                        this.message =response
                    }, error=>{
                        var errorMessage = <any>error;
                        if(errorMessage != null){
                          // var body = JSON.parse(error._body)
                          // swal("Error!", "errrrrrr", "error");
                        }
                      }
                    )


        }
    }

    onSubmit(){

    }

}
