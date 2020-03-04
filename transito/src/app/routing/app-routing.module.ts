import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { GuiasdetramiteComponent } from '../pages/guiasdetramite/guiasdetramite.component';
import { PreferenciasComponent } from '../pages/preferencias/preferencias.component';
import { GuardarGuiaComponent } from '../components/guardar-guia/guardar-guia.component';
import { DocumentosComponent } from '../pages/documentos/documentos.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'guias', component: GuiasdetramiteComponent},
    {path: 'preferencias', component: PreferenciasComponent},
    {path: 'guardar-nueva-guia', component: GuardarGuiaComponent},
    {path: 'guardar-nueva-guia/:nombreGuia', component: GuardarGuiaComponent},
    {path: 'documentos', component: DocumentosComponent},
    {path: '**', redirectTo: 'guias'}
  ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
