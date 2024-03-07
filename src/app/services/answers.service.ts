import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

@Injectable()
export class AnswersService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    } 

    getToken(){
        let token =localStorage.getItem('token');
        if(token != undefined){
            this.token = token
        } else{
            this.token = null
        }
        return this.token;
    }

    getAnswers(){
        let headers = new Headers({'Content-Type':'application/json'});
        console.log("222222")
        return this._http.get(this.url+'answers/getAnswers', {headers: headers})
        .map(res=> res.json());
    }

    addNewAnswer(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'answers/addNewAnswer', params, {headers: headers})
        .map(res=> res.json());
    }



}