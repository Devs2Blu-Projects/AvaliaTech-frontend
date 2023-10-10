import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { HomeComponent } from './components/admin/home/home.component';
import { TeamComponent } from './components/admin/team/team.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { ProjectComponent } from './components/admin/project/project.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';
import { GroupComponent } from './components/group/group.component';
import { EvaluatorsComponent } from './components/evaluators/evaluators.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'admin/home', component: HomeComponent },
  { path: 'admin/equipes', component: TeamComponent },
  { path: 'admin/avaliadores', component: EvaluatorComponent },
  { path: 'admin/criterios', component: CriterionComponent },
  { path: 'admin/projetos', component: ProjectComponent },
  { path: 'admin/apresentacoes', component: PresentationComponent },
  { path: 'equipe', component: GroupComponent },
  { path: 'avaliador', component: EvaluatorsComponent },
  // { path: 'publico', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private _authService: AuthService, private _router: Router) {
    const role: string = this._authService.getRole();
    const routes: Routes = this.getUserRoutes(role);

    this._router.resetConfig(routes);
  }

  private getUserRoutes(role: string): Routes {
    switch (role) {
      case 'admin':
        return [
          { path: 'admin/home', component: HomeComponent, canActivate: [AuthGuard] },
          { path: 'admin/equipes', component: TeamComponent, canActivate: [AuthGuard] },
          { path: 'admin/avaliadores', component: EvaluatorComponent, canActivate: [AuthGuard] },
          { path: 'admin/criterios', component: CriterionComponent, canActivate: [AuthGuard] },
          { path: 'admin/projetos', component: ProjectComponent, canActivate: [AuthGuard] },
          { path: 'admin/apresentacoes', component: PresentationComponent, canActivate: [AuthGuard] }
        ];
      case 'group':
        return [{ path: 'equipe', component: GroupComponent, canActivate: [AuthGuard] }];
      case 'user':
        return [{ path: 'avaliador', component: EvaluatorsComponent, canActivate: [AuthGuard] }];
      default:
        return [/*{ path: 'publico', component:  }*/];
    }
  }
}
