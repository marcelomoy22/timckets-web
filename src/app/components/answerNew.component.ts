import { Component, OnInit, style } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RequestNewService } from '../services/requestNew.service';

import { Users } from '../models/users';
import { AnswersService } from '../services/answers.service';
import { Console } from 'console';
import {GLOBAL} from '../services/global';
var async = require('async');

const swal = require('../../assets/sweetalert/sweetalert.js')

@Component({
    selector: 'answerNew',
    templateUrl: '../views/answerNew.html',
    providers: [AnswersService, UsersService, RequestNewService],
})

export class AnswerNewComponent implements OnInit{
    public title: string;
    public users: Users;
    public identity;
    public token;
    public load;
    public url: string;
    public departments;
    public allCategory;
    public service
    public newIssue
    public selectService
    public coma=','
    public campo1
    public campo2
    public campo3
    public campo4
    public campo5
    public campo6
    public campo7
    public campo8
    public text
    public hipervinculo

    public allService1
    public allSubService1=[]
    public allService2
    public allSubService2=[]
    public allService3
    public allSubService3=[]
    public allService4
    public allSubService4=[]
    public allService5
    public allSubService5=[]
    public allService6
    public allSubService6=[]
    public allService7
    public allSubService7=[]
    public allService8
    public allSubService8=[]

    public category
    public serviceH
    public subService

    


    constructor(
        private _userService: UsersService,
        private _answersService: AnswersService,
        private _requestNewService: RequestNewService,
    ){
        this.url = GLOBAL.url;
        this.title = 'Crear Preguntas y respuestas'
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.load = false
        this.newIssue = {
          departments: '',
          issue: '',
          descIssue: '',
          info: [],
      }

      this.allService1=undefined
      this.allSubService1=[]

      this.selectService=''
      this.campo1=undefined
      this.campo2=undefined
      this.campo3=undefined
      this.campo4=undefined
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
      this.text={
        text1: undefined,
        text2: undefined,
        text3: undefined,
        text4: undefined,
        text5: undefined,
        text6: undefined,
        text7: undefined,
        text8: undefined,
      }
      this.category={
        category1:undefined,
        category2:undefined,
        category3:undefined,
        category4:undefined,
        category5:undefined,
        category6:undefined,
        category7:undefined,
        category8:undefined,
      }
      this.serviceH={
        service1:undefined,
        service2:undefined,
        service3:undefined,
        service4:undefined,
        service5:undefined,
        service6:undefined,
        service7:undefined,
        service8:undefined,
      }
      this.subService={
        subService1:undefined,
        subService2:undefined,
        subService3:undefined,
        subService4:undefined,
        subService5:undefined,
        subService6:undefined,
        subService7:undefined,
        subService8:undefined,
      }
      this.hipervinculo={
        hip1:undefined,
        hip2:'',
        hip3:'',
        hip4:'',
        hip5:'',
        hip6:'',
        hip7:'',
        hip8:'',
      }
    }

    ngOnInit(){
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

      this._requestNewService.getIssues(this.identity).subscribe(
        response=>{
          this.allCategory = response
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            // var body = JSON.parse(error._body)
            // swal("Error!", "errrrrrr", "error");
          }
        }
      )

    }

    searchCategory1(service){
      this.allService1 = []
      this.allSubService1 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService1=element.service
        }
      });
    }

    searchService1(service){
      this.allService1.forEach(element => {
        if(service==element.issue){
          this.allSubService1.push(element)
        }
      });
    }

    searchCategory2(service){
      this.allService2 = []
      this.allSubService2 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService2=element.service
        }
      });
    }

    searchService2(service){
      this.allService2.forEach(element => {
        if(service==element.issue){
          this.allSubService2.push(element)
        }
      });
    }

    searchCategory3(service){
      this.allService3 = []
      this.allSubService3 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService3=element.service
        }
      });
    }

    searchService3(service){
      this.allService3.forEach(element => {
        if(service==element.issue){
          this.allSubService3.push(element)
        }
      });
    }

    searchCategory4(service){
      this.allService4 = []
      this.allSubService4 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService4=element.service
        }
      });
    }

    searchService4(service){
      this.allService4.forEach(element => {
        if(service==element.issue){
          this.allSubService4.push(element)
        }
      });
    }

    searchCategory5(service){
      this.allService5 = []
      this.allSubService5 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService5=element.service
        }
      });
    }

    searchService5(service){
      this.allService5.forEach(element => {
        if(service==element.issue){
          this.allSubService5.push(element)
        }
      });
    }

    searchCategory6(service){
      this.allService6 = []
      this.allSubService6 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService6=element.service
        }
      });
    }

    searchService6(service){
      this.allService6.forEach(element => {
        if(service==element.issue){
          this.allSubService6.push(element)
        }
      });
    }

    searchCategory7(service){
      this.allService7 = []
      this.allSubService7 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService7=element.service
        }
      });
    }

    searchService7(service){
      this.allService7.forEach(element => {
        if(service==element.issue){
          this.allSubService7.push(element)
        }
      });
    }

    searchCategory8(service){
      this.allService8 = []
      this.allSubService8 = []
      this.allCategory.forEach(element => {
        if(service==element.name){
          this.allService8=element.service
        }
      });
    }

    searchService8(service){
      this.allService8.forEach(element => {
        if(service==element.issue){
          this.allSubService8.push(element)
        }
      });
    }

    addCampo1(campo1){
      this.campo1=campo1
    }
    cancelCampo1(campo1){
      this.campo1=undefined
      this.campo2=undefined
      this.campo3=undefined
      this.campo4=undefined
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo2(campo2){
      this.campo2=campo2
    }
    cancelCampo2(campo2){
      this.campo2=undefined
      this.campo3=undefined
      this.campo4=undefined
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo3(campo3){
      this.campo3=campo3
    }
    cancelCampo3(campo3){
      this.campo3=undefined
      this.campo4=undefined
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo4(campo4){
      this.campo4=campo4
    }
    cancelCampo4(campo4){
      this.campo4=undefined
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo5(campo5){
      this.campo5=campo5
    }
    cancelCampo5(campo5){
      this.campo5=undefined
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo6(campo6){
      this.campo6=campo6
    }
    cancelCampo6(campo6){
      this.campo6=undefined
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo7(campo7){
      this.campo7=campo7
    }
    cancelCampo7(campo7){
      this.campo7=undefined
      this.campo8=undefined
    }

    addCampo8(campo8){
      this.campo8=campo8
    }
    cancelCampo8(campo8){
      this.campo8=undefined
    }


    public fileToUpload1: Array<File>
    public newName1
    fileChangeEvent1(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload1 = <Array<File>>fileInput.target.files
        this.newName1 =this.fileToUpload1[0].name
        if(this.newName1.charAt(this.newName1.length-24)){
          this.newName1 =('...'+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }else{
          this.newName1 =(this.newName1.charAt(this.newName1.length-23)+this.newName1.charAt(this.newName1.length-22)+this.newName1.charAt(this.newName1.length-21)+this.newName1.charAt(this.newName1.length-20)+this.newName1.charAt(this.newName1.length-19)+this.newName1.charAt(this.newName1.length-18)+this.newName1.charAt(this.newName1.length-17)+this.newName1.charAt(this.newName1.length-16)+this.newName1.charAt(this.newName1.length-15)+this.newName1.charAt(this.newName1.length-14)+this.newName1.charAt(this.newName1.length-13)+this.newName1.charAt(this.newName1.length-12)+this.newName1.charAt(this.newName1.length-11)+this.newName1.charAt(this.newName1.length-10)+this.newName1.charAt(this.newName1.length-9)+this.newName1.charAt(this.newName1.length-8)+this.newName1.charAt(this.newName1.length-7)+this.newName1.charAt(this.newName1.length-6)+this.newName1.charAt(this.newName1.length-5)+this.newName1.charAt(this.newName1.length-4)+this.newName1.charAt(this.newName1.length-3)+this.newName1.charAt(this.newName1.length-2)+this.newName1.charAt(this.newName1.length-1))
        }
      }else{
        this.fileToUpload1 = undefined
        swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload2: Array<File>
    public newName2
    fileChangeEvent2(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload2 = <Array<File>>fileInput.target.files
        this.newName2 =this.fileToUpload2[0].name
        if(this.newName2.charAt(this.newName2.length-24)){
          this.newName2 =('...'+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }else{
          this.newName2 =(this.newName2.charAt(this.newName2.length-23)+this.newName2.charAt(this.newName2.length-22)+this.newName2.charAt(this.newName2.length-21)+this.newName2.charAt(this.newName2.length-20)+this.newName2.charAt(this.newName2.length-19)+this.newName2.charAt(this.newName2.length-18)+this.newName2.charAt(this.newName2.length-17)+this.newName2.charAt(this.newName2.length-16)+this.newName2.charAt(this.newName2.length-15)+this.newName2.charAt(this.newName2.length-14)+this.newName2.charAt(this.newName2.length-13)+this.newName2.charAt(this.newName2.length-12)+this.newName2.charAt(this.newName2.length-11)+this.newName2.charAt(this.newName2.length-10)+this.newName2.charAt(this.newName2.length-9)+this.newName2.charAt(this.newName2.length-8)+this.newName2.charAt(this.newName2.length-7)+this.newName2.charAt(this.newName2.length-6)+this.newName2.charAt(this.newName2.length-5)+this.newName2.charAt(this.newName2.length-4)+this.newName2.charAt(this.newName2.length-3)+this.newName2.charAt(this.newName2.length-2)+this.newName2.charAt(this.newName2.length-1))
        }
      }else{
        this.fileToUpload2 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }
    public fileToUpload3: Array<File>
    public newName3
    fileChangeEvent3(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload3 = <Array<File>>fileInput.target.files
        this.newName3 =this.fileToUpload3[0].name
        if(this.newName3.charAt(this.newName3.length-24)){
          this.newName3 =('...'+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }else{
          this.newName3 =(this.newName3.charAt(this.newName3.length-23)+this.newName3.charAt(this.newName3.length-22)+this.newName3.charAt(this.newName3.length-21)+this.newName3.charAt(this.newName3.length-20)+this.newName3.charAt(this.newName3.length-19)+this.newName3.charAt(this.newName3.length-18)+this.newName3.charAt(this.newName3.length-17)+this.newName3.charAt(this.newName3.length-16)+this.newName3.charAt(this.newName3.length-15)+this.newName3.charAt(this.newName3.length-14)+this.newName3.charAt(this.newName3.length-13)+this.newName3.charAt(this.newName3.length-12)+this.newName3.charAt(this.newName3.length-11)+this.newName3.charAt(this.newName3.length-10)+this.newName3.charAt(this.newName3.length-9)+this.newName3.charAt(this.newName3.length-8)+this.newName3.charAt(this.newName3.length-7)+this.newName3.charAt(this.newName3.length-6)+this.newName3.charAt(this.newName3.length-5)+this.newName3.charAt(this.newName3.length-4)+this.newName3.charAt(this.newName3.length-3)+this.newName3.charAt(this.newName3.length-2)+this.newName3.charAt(this.newName3.length-1))
        }
      }else{
        this.fileToUpload3 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload4: Array<File>
    public newName4
    fileChangeEvent4(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload4 = <Array<File>>fileInput.target.files
        this.newName4 =this.fileToUpload4[0].name
        if(this.newName4.charAt(this.newName4.length-24)){
          this.newName4 =('...'+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }else{
          this.newName4 =(this.newName4.charAt(this.newName4.length-23)+this.newName4.charAt(this.newName4.length-22)+this.newName4.charAt(this.newName4.length-21)+this.newName4.charAt(this.newName4.length-20)+this.newName4.charAt(this.newName4.length-19)+this.newName4.charAt(this.newName4.length-18)+this.newName4.charAt(this.newName4.length-17)+this.newName4.charAt(this.newName4.length-16)+this.newName4.charAt(this.newName4.length-15)+this.newName4.charAt(this.newName4.length-14)+this.newName4.charAt(this.newName4.length-13)+this.newName4.charAt(this.newName4.length-12)+this.newName4.charAt(this.newName4.length-11)+this.newName4.charAt(this.newName4.length-10)+this.newName4.charAt(this.newName4.length-9)+this.newName4.charAt(this.newName4.length-8)+this.newName4.charAt(this.newName4.length-7)+this.newName4.charAt(this.newName4.length-6)+this.newName4.charAt(this.newName4.length-5)+this.newName4.charAt(this.newName4.length-4)+this.newName4.charAt(this.newName4.length-3)+this.newName4.charAt(this.newName4.length-2)+this.newName4.charAt(this.newName4.length-1))
        }
      }else{
        this.fileToUpload4 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload5: Array<File>
    public newName5
    fileChangeEvent5(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload5 = <Array<File>>fileInput.target.files
        this.newName5 =this.fileToUpload5[0].name
        if(this.newName5.charAt(this.newName5.length-24)){
          this.newName5 =('...'+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }else{
          this.newName5 =(this.newName5.charAt(this.newName5.length-23)+this.newName5.charAt(this.newName5.length-22)+this.newName5.charAt(this.newName5.length-21)+this.newName5.charAt(this.newName5.length-20)+this.newName5.charAt(this.newName5.length-19)+this.newName5.charAt(this.newName5.length-18)+this.newName5.charAt(this.newName5.length-17)+this.newName5.charAt(this.newName5.length-16)+this.newName5.charAt(this.newName5.length-15)+this.newName5.charAt(this.newName5.length-14)+this.newName5.charAt(this.newName5.length-13)+this.newName5.charAt(this.newName5.length-12)+this.newName5.charAt(this.newName5.length-11)+this.newName5.charAt(this.newName5.length-10)+this.newName5.charAt(this.newName5.length-9)+this.newName5.charAt(this.newName5.length-8)+this.newName5.charAt(this.newName5.length-7)+this.newName5.charAt(this.newName5.length-6)+this.newName5.charAt(this.newName5.length-5)+this.newName5.charAt(this.newName5.length-4)+this.newName5.charAt(this.newName5.length-3)+this.newName5.charAt(this.newName5.length-2)+this.newName5.charAt(this.newName5.length-1))
        }
      }else{
        this.fileToUpload5 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }
    public fileToUpload6: Array<File>
    public newName6
    fileChangeEvent6(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload6 = <Array<File>>fileInput.target.files
        this.newName6 =this.fileToUpload6[0].name
        if(this.newName6.charAt(this.newName6.length-24)){
          this.newName6 =('...'+this.newName6.charAt(this.newName6.length-21)+this.newName6.charAt(this.newName6.length-20)+this.newName6.charAt(this.newName6.length-19)+this.newName6.charAt(this.newName6.length-18)+this.newName6.charAt(this.newName6.length-17)+this.newName6.charAt(this.newName6.length-16)+this.newName6.charAt(this.newName6.length-15)+this.newName6.charAt(this.newName6.length-14)+this.newName6.charAt(this.newName6.length-13)+this.newName6.charAt(this.newName6.length-12)+this.newName6.charAt(this.newName6.length-11)+this.newName6.charAt(this.newName6.length-10)+this.newName6.charAt(this.newName6.length-9)+this.newName6.charAt(this.newName6.length-8)+this.newName6.charAt(this.newName6.length-7)+this.newName6.charAt(this.newName6.length-6)+this.newName6.charAt(this.newName6.length-5)+this.newName6.charAt(this.newName6.length-4)+this.newName6.charAt(this.newName6.length-3)+this.newName6.charAt(this.newName6.length-2)+this.newName6.charAt(this.newName6.length-1))
        }else{
          this.newName6 =(this.newName6.charAt(this.newName6.length-23)+this.newName6.charAt(this.newName6.length-22)+this.newName6.charAt(this.newName6.length-21)+this.newName6.charAt(this.newName6.length-20)+this.newName6.charAt(this.newName6.length-19)+this.newName6.charAt(this.newName6.length-18)+this.newName6.charAt(this.newName6.length-17)+this.newName6.charAt(this.newName6.length-16)+this.newName6.charAt(this.newName6.length-15)+this.newName6.charAt(this.newName6.length-14)+this.newName6.charAt(this.newName6.length-13)+this.newName6.charAt(this.newName6.length-12)+this.newName6.charAt(this.newName6.length-11)+this.newName6.charAt(this.newName6.length-10)+this.newName6.charAt(this.newName6.length-9)+this.newName6.charAt(this.newName6.length-8)+this.newName6.charAt(this.newName6.length-7)+this.newName6.charAt(this.newName6.length-6)+this.newName6.charAt(this.newName6.length-5)+this.newName6.charAt(this.newName6.length-4)+this.newName6.charAt(this.newName6.length-3)+this.newName6.charAt(this.newName6.length-2)+this.newName6.charAt(this.newName6.length-1))
        }
      }else{
        this.fileToUpload6 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }
    public fileToUpload7: Array<File>
    public newName7
    fileChangeEvent7(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload7 = <Array<File>>fileInput.target.files
        this.newName7 =this.fileToUpload7[0].name
        if(this.newName7.charAt(this.newName7.length-24)){
          this.newName7 =('...'+this.newName7.charAt(this.newName7.length-21)+this.newName7.charAt(this.newName7.length-20)+this.newName7.charAt(this.newName7.length-19)+this.newName7.charAt(this.newName7.length-18)+this.newName7.charAt(this.newName7.length-17)+this.newName7.charAt(this.newName7.length-16)+this.newName7.charAt(this.newName7.length-15)+this.newName7.charAt(this.newName7.length-14)+this.newName7.charAt(this.newName7.length-13)+this.newName7.charAt(this.newName7.length-12)+this.newName7.charAt(this.newName7.length-11)+this.newName7.charAt(this.newName7.length-10)+this.newName7.charAt(this.newName7.length-9)+this.newName7.charAt(this.newName7.length-8)+this.newName7.charAt(this.newName7.length-7)+this.newName7.charAt(this.newName7.length-6)+this.newName7.charAt(this.newName7.length-5)+this.newName7.charAt(this.newName7.length-4)+this.newName7.charAt(this.newName7.length-3)+this.newName7.charAt(this.newName7.length-2)+this.newName7.charAt(this.newName7.length-1))
        }else{
          this.newName7 =(this.newName7.charAt(this.newName7.length-23)+this.newName7.charAt(this.newName7.length-22)+this.newName7.charAt(this.newName7.length-21)+this.newName7.charAt(this.newName7.length-20)+this.newName7.charAt(this.newName7.length-19)+this.newName7.charAt(this.newName7.length-18)+this.newName7.charAt(this.newName7.length-17)+this.newName7.charAt(this.newName7.length-16)+this.newName7.charAt(this.newName7.length-15)+this.newName7.charAt(this.newName7.length-14)+this.newName7.charAt(this.newName7.length-13)+this.newName7.charAt(this.newName7.length-12)+this.newName7.charAt(this.newName7.length-11)+this.newName7.charAt(this.newName7.length-10)+this.newName7.charAt(this.newName7.length-9)+this.newName7.charAt(this.newName7.length-8)+this.newName7.charAt(this.newName7.length-7)+this.newName7.charAt(this.newName7.length-6)+this.newName7.charAt(this.newName7.length-5)+this.newName7.charAt(this.newName7.length-4)+this.newName7.charAt(this.newName7.length-3)+this.newName7.charAt(this.newName7.length-2)+this.newName7.charAt(this.newName7.length-1))
        }
      }else{
        this.fileToUpload7 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    public fileToUpload8: Array<File>
    public newName8
    fileChangeEvent8(fileInput: any){
      var fileToUploads1 = <Array<File>>fileInput.target.files
      var file_path1 = fileToUploads1
      var file_path2 = file_path1[0].name.split(/[\\/.]+/g)
      if(file_path2[file_path2.length-1] == 'png' || file_path2[file_path2.length-1] == 'jpg' || file_path2[file_path2.length-1] == 'jpeg' || file_path2[file_path2.length-1] == 'gif'|| file_path2[file_path2.length-1] == 'pdf' || file_path2[file_path2.length-1] == 'xls' || file_path2[file_path2.length-1] == 'xlsx' || file_path2[file_path2.length-1] == 'csv' || file_path2[file_path2.length-1] == 'doc' || file_path2[file_path2.length-1] == 'docx' || file_path2[file_path2.length-1] == 'ppt' || file_path2[file_path2.length-1] == 'pptx' || file_path2[file_path2.length-1] == 'txt'){
        this.fileToUpload8 = <Array<File>>fileInput.target.files
        this.newName8 =this.fileToUpload8[0].name
        if(this.newName8.charAt(this.newName8.length-24)){
          this.newName8 =('...'+this.newName8.charAt(this.newName8.length-21)+this.newName8.charAt(this.newName8.length-20)+this.newName8.charAt(this.newName8.length-19)+this.newName8.charAt(this.newName8.length-18)+this.newName8.charAt(this.newName8.length-17)+this.newName8.charAt(this.newName8.length-16)+this.newName8.charAt(this.newName8.length-15)+this.newName8.charAt(this.newName8.length-14)+this.newName8.charAt(this.newName8.length-13)+this.newName8.charAt(this.newName8.length-12)+this.newName8.charAt(this.newName8.length-11)+this.newName8.charAt(this.newName8.length-10)+this.newName8.charAt(this.newName8.length-9)+this.newName8.charAt(this.newName8.length-8)+this.newName8.charAt(this.newName8.length-7)+this.newName8.charAt(this.newName8.length-6)+this.newName8.charAt(this.newName8.length-5)+this.newName8.charAt(this.newName8.length-4)+this.newName8.charAt(this.newName8.length-3)+this.newName8.charAt(this.newName8.length-2)+this.newName8.charAt(this.newName8.length-1))
        }else{
          this.newName8 =(this.newName8.charAt(this.newName8.length-23)+this.newName8.charAt(this.newName8.length-22)+this.newName8.charAt(this.newName8.length-21)+this.newName8.charAt(this.newName8.length-20)+this.newName8.charAt(this.newName8.length-19)+this.newName8.charAt(this.newName8.length-18)+this.newName8.charAt(this.newName8.length-17)+this.newName8.charAt(this.newName8.length-16)+this.newName8.charAt(this.newName8.length-15)+this.newName8.charAt(this.newName8.length-14)+this.newName8.charAt(this.newName8.length-13)+this.newName8.charAt(this.newName8.length-12)+this.newName8.charAt(this.newName8.length-11)+this.newName8.charAt(this.newName8.length-10)+this.newName8.charAt(this.newName8.length-9)+this.newName8.charAt(this.newName8.length-8)+this.newName8.charAt(this.newName8.length-7)+this.newName8.charAt(this.newName8.length-6)+this.newName8.charAt(this.newName8.length-5)+this.newName8.charAt(this.newName8.length-4)+this.newName8.charAt(this.newName8.length-3)+this.newName8.charAt(this.newName8.length-2)+this.newName8.charAt(this.newName8.length-1))
        }
      }else{
        this.fileToUpload8 = undefined
                swal("Error!","Extencion del archivo no valido, solo se permite .png, .jpg, .jpeg, .gif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx, .txt" , "error");
      }
    }

    imgCancel1(){
      this.fileToUpload1 = undefined
      this.fileToUpload2 = undefined
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined

    }
    imgCancel2(){
      this.fileToUpload2 = undefined
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
    }
    imgCancel3(){
      this.fileToUpload3 = undefined
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
    }
    imgCancel4(){
      this.fileToUpload4 = undefined
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined    
    }
    imgCancel5(){
      this.fileToUpload5 = undefined
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined    
    }
    imgCancel6(){
      this.fileToUpload6 = undefined
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
    }
    imgCancel7(){
      this.fileToUpload7 = undefined
      this.fileToUpload8 = undefined
    }
    imgCancel8(){
      this.fileToUpload8 = undefined
    }

    makeFileRequest(url:string, params:Array<string>,files:Array<File>){
      var token = this.token
      return new Promise(function(resolve, reject){
        var formData:any = new FormData()
        var xhr = new XMLHttpRequest()
        for(var i=0; i<files.length; i++){
          formData.append("image", files[i],files[i].name)
        }

        xhr.onreadystatechange = function(){
          if(xhr.readyState==4){
            if(xhr.status ==200){
              resolve(JSON.parse(xhr.response))
            }else{
              reject(xhr.response)
            }
          }
        }
        xhr.open("POST",url,true)
        xhr.setRequestHeader("Authorization",token)
        xhr.send(formData)
      })
    }

    addNew(newIssue){

      this.load = true

      const thisAsync = this
      async.waterfall([

        function step1(next) {

      if(thisAsync.campo1 && thisAsync.campo1=='texto'){
        newIssue.info.push({texto: thisAsync.text.text1})
      }
      if(thisAsync.campo1 && thisAsync.campo1=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload1})
      }
      if(thisAsync.campo1 && thisAsync.campo1=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService1})
      }

      if(thisAsync.campo2 && thisAsync.campo2=='texto'){
        newIssue.info.push({texto: thisAsync.text.text2})
      }
      if(thisAsync.campo2 && thisAsync.campo2=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload2})
      }
      if(thisAsync.campo2 && thisAsync.campo2=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService2})
      }

      if(thisAsync.campo3 && thisAsync.campo3=='texto'){
        newIssue.info.push({texto: thisAsync.text.text3})
      }
      if(thisAsync.campo3 && thisAsync.campo3=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload3})
      }
      if(thisAsync.campo3 && thisAsync.campo3=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService3})
      }

      if(thisAsync.campo4 && thisAsync.campo4=='texto'){
        newIssue.info.push({texto: thisAsync.text.text4})
      }
      if(thisAsync.campo4 && thisAsync.campo4=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload4})
      }
      if(thisAsync.campo4 && thisAsync.campo4=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService4})
      }

      if(thisAsync.campo5 && thisAsync.campo5=='texto'){
        newIssue.info.push({texto: thisAsync.text.text5})
      }
      if(thisAsync.campo5 && thisAsync.campo5=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload5})
      }
      if(thisAsync.campo5 && thisAsync.campo5=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService5})
      }

      if(thisAsync.campo6 && thisAsync.campo6=='texto'){
        newIssue.info.push({texto: thisAsync.text.text6})
      }
      if(thisAsync.campo6 && thisAsync.campo6=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload6})
      }
      if(thisAsync.campo6 && thisAsync.campo6=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService6})
      }

      if(thisAsync.campo7 && thisAsync.campo7=='texto'){
        newIssue.info.push({texto: thisAsync.text.text7})
      }
      if(thisAsync.campo7 && thisAsync.campo7=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload7})
      }
      if(thisAsync.campo7 && thisAsync.campo7=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService7})
      }

      if(thisAsync.campo8 && thisAsync.campo8=='texto'){
        newIssue.info.push({texto: thisAsync.text.text8})
      }
      if(thisAsync.campo8 && thisAsync.campo8=='imagen'){
        newIssue.info.push({documento: thisAsync.fileToUpload8})
      }
      if(thisAsync.campo8 && thisAsync.campo8=='hipervinculo'){
        newIssue.info.push({hipervinculo: thisAsync.subService.subService8})
      }

      const newIssues=newIssue
      next(null ,newIssues)

    },

    function step2(newIssue, next) {

      const imgNames =[]
      if(newIssue.info.length>0){
        newIssue.info.forEach((element, i)=> {
          if(element.documento){

            thisAsync.makeFileRequest(thisAsync.url+"answers/uploadFile/"+ thisAsync.identity._id,[],element.documento).then(
          (result)=>{
            newIssue.info[i].documento=result
            imgNames.push(result)
          })

          }
        });
        next(null, newIssue, imgNames)
      }else{
        next(null, newIssue, imgNames)
      }


    },

    function step3(newIssue, imgNames, next) {
      setTimeout(() => {


      thisAsync._answersService.addNewAnswer(newIssue).subscribe(
        response=>{
          thisAsync.load = false
          window.location.reload();
        }, error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            this.load = false
            // var body = JSON.parse(error._body)
            // swal("Error!", "errrrrrr", "error");
          }
        }
      )
    }, 2000);

    },

  ], function (err) {
    this.load = false
    console.log(err);
  });
      
    }


}
