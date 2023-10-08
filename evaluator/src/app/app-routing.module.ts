import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './components/admin/team/team.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { ProjectComponent } from './components/admin/project/project.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';

const routes: Routes = [
  // { path: 'publico', component: },
  // { path: 'equipe, component: },
  // { path: 'avaliador, component: },
  { path: 'admin/equipes', component: TeamComponent },
  { path: 'admin/avaliadores', component: EvaluatorComponent },
  { path: 'admin/criterios', component: CriterionComponent },
  { path: 'admin/projetos', component: ProjectComponent },
  { path: 'admin/apresentacoes', component: PresentationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
