import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectComponent } from './components/admin/project/project.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogProjectComponent } from './components/admin/project/dialog-project/dialog-project.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { DialogCriterionComponent } from './components/admin/criterion/dialog-criterion/dialog-criterion.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { DialogEvaluatorComponent } from './components/admin/evaluator/dialog-evaluator/dialog-evaluator.component';
import { TeamComponent } from './components/admin/team/team.component';
import { DialogTeamComponent } from './components/admin/team/dialog-team/dialog-team.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ProjectComponent,
    DialogProjectComponent,
    CriterionComponent,
    DialogCriterionComponent,
    EvaluatorComponent,
    DialogEvaluatorComponent,
    TeamComponent,
    DialogTeamComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
