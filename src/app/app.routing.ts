import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const appRoutes: Routes = [ 
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'requestNew', component: RequestNewComponent},
    {path: 'requestProces', component: RequestProcesComponent},
    {path: 'answer', component: AnswerComponent},
    {path: 'answerNew', component: AnswerNewComponent},
    {path: 'usersEdit', component: UsersEditComponent},
    {path: 'usersNew', component: UsersNewComponent},
    {path: 'requestClosed', component: RequestClosedComponent},
    {path: 'homeAdmin', component: HomeAdminComponent},
    {path: 'departmentsNew', component: DepartmentsNewComponent},
    {path: 'areasNew', component: AreasNewComponent},
    {path: 'issuesNew', component: IssuesNewComponent},
    {path: 'areasEdit', component: AreasEditComponent},
    {path: 'requestDetail/:id', component: RequestDetailComponent},
    {path: 'departmentsEdit', component: DepartmentsEditComponent},
    {path: 'issuesEdit', component: IssuesEditComponent},
    {path: 'report', component: ReportComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'encuesta', component: EncuestaComponent},
    {path: 'message', component: MessageComponent},
    {path: 'messageAdmin', component: MessageAdminComponent},
    {path: 'localsEdit', component: LocalsEditComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);