import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import {GLOBAL} from '../services/global';

import { Users } from '../models/users';
import { AnswersService } from '../services/answers.service';

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'answer',
    templateUrl: '../views/answer.html',
    providers: [AnswersService, UsersService],
})

export class AnswerComponent implements OnInit{
    public title: string;
    public users: Users;
    public url: string;
    public identity;
    public token;
    public allAnswers;
    public issue;
    public text;
    

    constructor(
        private _userService: UsersService,
        private _answersService: AnswersService,
    ){
        this.title = 'Preguntas y respuestas'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.text=''
    }


    ngOnInit(){

        this._answersService.getAnswers().subscribe(
            response=>{
              this.allAnswers = response
              console.log(this.allAnswers)
            }, error=>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                // var body = JSON.parse(error._body)
                // swal("Error!", "errrrrrr", "error");
              }
            }
          )
        
    }
    


    
    getIssue(issue){
        this.issue = issue
        console.log(this.issue)
    }



}
