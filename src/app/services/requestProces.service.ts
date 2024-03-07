import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

@Injectable()
export class RequestProcesService{
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

    getAnswers(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/all',params, {headers: headers})
        .map(res=> res.json());
    }

    getInCallCenter(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/getInCallCenter',params, {headers: headers})
        .map(res=> res.json());
    }

    allCallCenter(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allCallCenter',params, {headers: headers})
        .map(res=> res.json());
    }
    allSolucionadosNum(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allSolucionadosNum',params, {headers: headers})
        .map(res=> res.json());
    }

    allSolucionadosCallCenter(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allSolucionadosCallCenter',params, {headers: headers})
        .map(res=> res.json());
    }
    allSolucionadosCallCenter2(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allSolucionadosCallCenter2',params, {headers: headers})
        .map(res=> res.json());
    }

    getHistory(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allHistory',params, {headers: headers})
        .map(res=> res.json());
    }

    getHistorySolucionado(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allHistorySolucionado',params, {headers: headers})
        .map(res=> res.json()); 
    }

    getHistoryDepartments(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allHistoryDepartments',params, {headers: headers})
        .map(res=> res.json());
    }

    getHistorySolucionadoDepartments(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allHistorySolucionadoDepartments',params, {headers: headers})
        .map(res=> res.json()); 
    }

    statusExtra(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/statusExtra',params, {headers: headers})
        .map(res=> res.json()); 
    }

    getOnlyOne(request){
        let params = JSON.stringify(request);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/getOneRequest',params, {headers: headers})
        .map(res=> res.json());
    }

    allSolucionados(identity){
        let params = JSON.stringify(identity);
        let headers = new Headers({'Content-Type':'application/json','Authorization':this.getToken()});
        return this._http.post(this.url+'requests/allSolucionados',params, {headers: headers})
        .map(res=> res.json());
    }

    addNote(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/addNote/',params, {headers: headers})
        .map(res=> res.json());
    }

    getOneRequest(requests_to_Do){
        let params = JSON.stringify(requests_to_Do);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getOneRequest',params, {headers: headers})
        .map(res=> res.json());
    }
    asign(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/asign',params, {headers: headers})
        .map(res=> res.json());   
    }

    asignCallCenter(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/asignCallCenter',params, {headers: headers})
        .map(res=> res.json());   
    }

    reAsign(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/reAsign',params, {headers: headers})
        .map(res=> res.json());   
    }

    eventos(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/eventos',params, {headers: headers})
        .map(res=> res.json());   
    }

    addPending(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/pending',params, {headers: headers})
        .map(res=> res.json());  
    }

    addPendingCallCenter(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/pendingCallCenter',params, {headers: headers})
        .map(res=> res.json());  
    }

    editPending(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/editPending',params, {headers: headers})
        .map(res=> res.json());  
    }

    editPendingCC(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/editPendingCC',params, {headers: headers})
        .map(res=> res.json());  
    }

    addReaperturar(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/reaperturar',params, {headers: headers})
        .map(res=> res.json());  
    }

    addEncuesta(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/encuesta',params, {headers: headers})
        .map(res=> res.json());  
    }

    getEncuestas(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getEncuesta',params, {headers: headers})
        .map(res=> res.json());  
    }

    getMessages(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getMessages',params, {headers: headers})
        .map(res=> res.json());  
    }

    getMessageAdmin(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getMessageAdmin',params, {headers: headers})
        .map(res=> res.json());  
    }

    getMessageDepto(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getMessageDepto',params, {headers: headers})
        .map(res=> res.json());  
    }

    getResponseDepto(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/getResponseDepto',params, {headers: headers})
        .map(res=> res.json());  
    }
    
    addSolution(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/solution',params, {headers: headers})
        .map(res=> res.json());  
    }

    addSolutionCallCenter(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/solutionCallCenter',params, {headers: headers})
        .map(res=> res.json());  
    }

    addSolutionPreventivo(issue){
        let params = JSON.stringify(issue);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        })
        return this._http.post(this.url+'requests/solutionPreventivo',params, {headers: headers})
        .map(res=> res.json());  
    }

}