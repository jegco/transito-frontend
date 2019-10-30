import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { GuiasdetramiteComponent } from '../pages/guiasdetramite/guiasdetramite.component';
import { PreferenciasComponent } from '../pages/preferencias/preferencias.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'guias', component: GuiasdetramiteComponent},
    {path: 'preferencias', component: PreferenciasComponent}
  ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
