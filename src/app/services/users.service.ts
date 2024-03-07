import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

@Injectable()
export class UsersService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = null){
        if(gethash != null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'users/loginUser/', params, {headers: headers})
        .map(res=> res.json());
    }

    resumePasword(passwordToResume){
        var send = {send: passwordToResume }
        let params = JSON.stringify(send);
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'users/passwordToResume/', params, {headers: headers})
        .map(res=> res.json());
    }

    ensureAuth(newPassword){
    let params = JSON.stringify(newPassword);
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':this.getToken()
});
    return this._http.post(this.url+'issues/sendsms/', params, {headers: headers})
    .map(res=> res.json());
}
oneUser(request){
    let request2 ={ request }
    let params = JSON.stringify(request2);
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':this.getToken()
    });
    return this._http.post(this.url+'users/oneUser/', params, {headers: headers})
    .map(res=> res.json());
}
    
    updatePassword(newPassword){
        let params = JSON.stringify(newPassword);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
    });
        return this._http.post(this.url+'users/changePassword/', params, {headers: headers})
        .map(res=> res.json());
    }

    newUser(user_to_register){
        let params = JSON.stringify(user_to_register);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'users/saveUser/',params, {headers: headers})
        .map(res=> res.json());
    }

    updateUser(user_to_update){
        let params = JSON.stringify(user_to_update);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'users/updateUser/'+user_to_update._id,params, {headers: headers})
        .map(res=> res.json());
    }

    getIdentity(){
        let identity =JSON.parse(localStorage.getItem('identity'));
        if(identity != undefined){
            this.identity = identity
        } else{
            this.identity = null
        }
        return this.identity;
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

    getDepartments(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'departments/all',params, {headers: headers})
        .map(res=> res.json());
    }

    getAreas(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'departments/allAreas', {headers: headers})
        .map(res=> res.json());
    }

    getProveedores(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'departments/allProveedores', {headers: headers})
        .map(res=> res.json());
    }
    newDepartments(newDepartment){
        let params = JSON.stringify(newDepartment);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'departments/saveDepartment/',params, {headers: headers})
        .map(res=> res.json());
    }

    editDepartments(newDepartment){
        let params = JSON.stringify(newDepartment);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'departments/editDepartment/',params, {headers: headers})
        .map(res=> res.json());
    }

    newArea(newArea){
        let params = JSON.stringify(newArea);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'departments/saveArea/',params, {headers: headers})
        .map(res=> res.json());
    }


    getAdminUsers(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'users/usersAdmin', {headers: headers})
        .map(res=> res.json());
    }

    getLocals(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'users/getLocals', {headers: headers})
        .map(res=> res.json());
    }

    allAreasOnly(){
        let headers = new Headers({'Content-Type':'application/json'});
        return this._http.get(this.url+'users/allAreasOnly', {headers: headers})
        .map(res=> res.json());
    }

    editLocal(newLocal){
        let params = JSON.stringify(newLocal);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'users/editLocal/',params, {headers: headers})
        .map(res=> res.json());
    }

}