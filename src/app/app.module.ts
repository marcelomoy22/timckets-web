import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTableModule} from "angular2-datatable";

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UsersEditComponent } from './components/usersEdit.component';
import { UsersNewComponent } from './components/usersNew.component';
import { HomeComponent } from './components/home.component';
import { RequestNewComponent } from './components/requestNew.component';
import { RequestProcesComponent } from './components/requestProces.component';
import { AnswerComponent } from './components/answer.component';
import { AnswerNewComponent } from './components/answerNew.component';
import { RequestClosedComponent } from './components/requestClosed.component';
import { HomeAdminComponent } from './components/homeAdmin.component';
import { DepartmentsNewComponent } from './components/departmentsNew.component';
import { AreasNewComponent } from './components/areasNew.component';
import { RequestDetailComponent } from './components/requestDetail.component';
import { IssuesNewComponent } from './components/issuesNew.component';
import { AreasEditComponent } from './components/areasEdit.component';
import { DepartmentsEditComponent } from './components/departmentsEdit.component';
import { IssuesEditComponent } from './components/issuesEdit.component';
import { ReportComponent } from './components/report.component';
import { HistoryComponent } from './components/history.component';
import { EncuestaComponent } from './components/encuesta.component';
import { LocalsEditComponent } from './components/localsEdit.component';
import { MessageComponent } from './components/message.component';
import { MessageAdminComponent } from './components/messageAdmin.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersEditComponent,
    UsersNewComponent,
    HomeComponent,
    RequestNewComponent,
    RequestProcesComponent,
    AnswerComponent,
    AnswerNewComponent,
    RequestClosedComponent,
    HomeAdminComponent,
    AreasNewComponent,
    DepartmentsNewComponent,
    RequestDetailComponent,
    IssuesNewComponent,
    AreasEditComponent,
    DepartmentsEditComponent,
    IssuesEditComponent,
    ReportComponent,
    HistoryComponent,
    EncuestaComponent,
    MessageComponent,
    MessageAdminComponent,
    LocalsEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
