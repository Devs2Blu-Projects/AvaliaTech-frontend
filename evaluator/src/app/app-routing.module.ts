import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/admin/project/project.component';
import { CriterionComponent } from './components/admin/criterion/criterion.component';
import { EvaluatorComponent } from './components/admin/evaluator/evaluator.component';
import { TeamComponent } from './components/admin/team/team.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';

const routes: Routes = [
  {path: 'projetos', component: ProjectComponent},
  {path: 'criterios', component: CriterionComponent},
  {path: 'avaliadores', component: EvaluatorComponent},
  {path: 'equipes', component: TeamComponent},
  {path: 'apresentacoes', component: PresentationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
