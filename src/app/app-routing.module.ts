import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { HomeComponent } from './components/admin/home/home.component';
import { TeamComponent } from './components/admin/team/team.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { ChallengeComponent } from './components/admin/challenge/challenge.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';
import { GroupComponent } from './components/group/group.component';
import { EvaluatorsComponent } from './components/evaluators/evaluators.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { FormNewEventComponent } from './components/admin/form-new-event/form-new-event.component';

const publicRoutes: Routes = [
  { path: '', redirectTo: '/ranking', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'ranking', component: RankingComponent },
  // { path: '**', component: PageNotFoundComponent },
];

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'equipes', component: TeamComponent, canActivate: [AuthGuard] },
      { path: 'avaliadores', component: EvaluatorComponent, canActivate: [AuthGuard] },
      { path: 'criterios', component: CriterionComponent, canActivate: [AuthGuard] },
      { path: 'projetos', component: ChallengeComponent, canActivate: [AuthGuard] },
      { path: 'apresentacoes', component: PresentationComponent, canActivate: [AuthGuard] },
      { path: 'adicionar_evento', component: FormNewEventComponent, canActivate: [AuthGuard] }
    ],
  },
];

const groupRoutes: Routes = [
  { path: 'equipe', component: GroupComponent, canActivate: [AuthGuard] },
];

const userRoutes: Routes = [
  { path: 'avaliador', component: EvaluatorsComponent, canActivate: [AuthGuard] },
];

const routes: Routes = [...publicRoutes, ...adminRoutes, ...groupRoutes, ...userRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private _authService: AuthService, private _router: Router) {
    this.refresh()
  }

  refresh(): void {
    const role: string = this._authService.getUserRole();
    const routes: Routes = this.getUserRoutes(role);

    this._router.resetConfig(routes);
  }

  homepage(): void {
    this._router.navigate([this._router.config[0]?.path])
  }

  private getUserRoutes(role: string): Routes {
    switch (role) {
      case 'admin':
        return [...adminRoutes, ...publicRoutes];
      case 'group':
        return [...groupRoutes, ...publicRoutes];
      case 'user':
        return [...userRoutes, ...publicRoutes];
      default:
        return publicRoutes;
    }
  }
}
