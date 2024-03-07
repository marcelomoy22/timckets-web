import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

@Injectable()
export class RequestNewService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    } 


    getIssues(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'issues/issue', params, {headers: headers})
        .map(res=> res.json());
    }

    getBySearch(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'issues/getBySearch', params, {headers: headers})
        .map(res=> res.json());
    }

    getAllIssuesNormal(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'issues/allIssueNormal', params, {headers: headers})
        .map(res=> res.json());
    }

    newRequest(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/prueba/',params, {headers: headers})
        .map(res=> res.json());
    }

    getAreaBranches(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/areaBranches', params, {headers: headers})
        .map(res=> res.json());
    }

    issueValid(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/issueValid', params, {headers: headers})
        .map(res=> res.json());
    }

    getLocals(identity){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'users/getLocals', {headers: headers})
        .map(res=> res.json());
    }

    chatGPT(note){
        let params = JSON.stringify(note);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/chatGpt', params, {headers: headers})
        .map(res=> res.json());
    }

    getOneUser(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/getOneUser', params, {headers: headers})
        .map(res=> res.json());
    }
    searchService(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/searchService/',params, {headers: headers})
        .map(res=> res.json());
    }

    searchSubCategoria(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/searchSubCategoria/',params, {headers: headers})
        .map(res=> res.json());
    }

    newService(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/newService/',params, {headers: headers})
        .map(res=> res.json());
    }

    getTime(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'users/getTime', {headers: headers})
        .map(res=> res.json());
    }

    editService(requests_to_Do){
    let params = JSON.stringify(requests_to_Do);
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':this.getToken()
    })
    return this._http.post(this.url+'requests/editService/',params, {headers: headers})
    .map(res=> res.json());
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

}