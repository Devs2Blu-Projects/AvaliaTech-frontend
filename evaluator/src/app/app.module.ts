import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { ChallengeComponent } from './components/admin/challenge/challenge.component';
import { DialogChallengeComponent } from './components/admin/challenge/dialog-challenge/dialog-challenge.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';
import { DialogPresentationComponent } from './components/admin/presentation/dialog-presentation/dialog-presentation.component';
import { GroupComponent } from './components/group/group.component';
import { EvaluatorsComponent } from './components/evaluators/evaluators.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { DialogAssessmentComponent } from './components/evaluators/dialog-assessment/dialog-assessment.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { FetchEmptyComponent } from './shared/components/fetch-empty/fetch-empty.component';
import { FormNewEventComponent } from './components/admin/form-new-event/form-new-event.component';
import { ListEvaluatorsComponent } from './components/admin/presentation/list-evaluators/list-evaluators.component';
import { FooterCreditsComponent } from './shared/components/footer-credits/footer-credits.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CardComponent } from './components/ranking/card/card.component';
import { LoadingComponent } from './components/ranking/loading/loading.component';
import { PositionLineComponent } from './components/ranking/position-line/position-line.component';
import { ProgressComponent } from './components/group/progress/progress.component';
import { CriteriaTableComponent } from './components/group/criteria-table/criteria-table.component';

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
    ChallengeComponent,
    DialogChallengeComponent,
    PresentationComponent,
    DialogPresentationComponent,
    GroupComponent,
    EvaluatorsComponent,
    RankingComponent,
    DialogAssessmentComponent,
    ToastComponent,
    FetchEmptyComponent,
    FormNewEventComponent,
    ListEvaluatorsComponent,
    FooterCreditsComponent,
    HeaderComponent,
    CardComponent,
    LoadingComponent,
    PositionLineComponent,
    ProgressComponent,
    CriteriaTableComponent
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
    PopoverModule.forRoot(),
    DragDropModule
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
