import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/auth/token.interceptor';

import { FilterPipe } from './shared/pipes/filter.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/admin/home/home.component';
import { TeamComponent } from './components/admin/team/team.component';
import { DialogTeamComponent } from './components/admin/team/dialog-team/dialog-team.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { DialogEvaluatorComponent } from './components/admin/evaluator/dialog-evaluator/dialog-evaluator.component';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { DialogCriterionComponent } from './components/admin/criterion/dialog-criterion/dialog-criterion.component';
import { ProjectComponent } from './components/admin/project/project.component';
import { DialogProjectComponent } from './components/admin/project/dialog-project/dialog-project.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';
import { DialogPresentationComponent } from './components/admin/presentation/dialog-presentation/dialog-presentation.component';
import { GroupComponent } from './components/group/group.component';
import { EvaluatorsComponent } from './components/evaluators/evaluators.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RankingComponent } from './components/ranking/ranking.component';
import { DialogAssessmentComponent } from './components/evaluators/dialog-assessment/dialog-assessment.component';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    LoginComponent,
    TeamComponent,
    AdminComponent,
    HomeComponent,
    DialogTeamComponent,
    EvaluatorComponent,
    DialogEvaluatorComponent,
    CriterionComponent,
    DialogCriterionComponent,
    ProjectComponent,
    DialogProjectComponent,
    PresentationComponent,
    DialogPresentationComponent,
    GroupComponent,
    EvaluatorsComponent,
    RankingComponent,
    DialogAssessmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    CdkAccordionModule,
    PopoverModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
