import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SubmissionsComponent } from './submissions/submissions.component';

const routes: Routes = [{ path: 'submissions', component: SubmissionsComponent},
{ path: '', redirectTo: '/submissions', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
