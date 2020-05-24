import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { GuiasdetramiteComponent } from '../pages/guiasdetramite/guiasdetramite.component';
import { PreferenciasComponent } from '../pages/preferencias/preferencias.component';
import { GuardarGuiaComponent } from '../components/guardar-guia/guardar-guia.component';
import { DocumentosComponent } from '../pages/documentos/documentos.component';
import { GuiaDetallesComponent } from '../pages/guia-detalles/guia-detalles.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { AuthGuard } from '../providers/user/auth-guard';
const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            { path: 'guias', component: GuiasdetramiteComponent },
            { path: 'guias/:nombreGuia', component: GuiaDetallesComponent },
            { path: 'preferencias', component: PreferenciasComponent },
            { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
            { path: 'guardar-nueva-guia', component: GuardarGuiaComponent },
            { path: 'guardar-nueva-guia/:nombreGuia', component: GuardarGuiaComponent },
            { path: 'documentos', component: DocumentosComponent },
            { path: '**', redirectTo: 'guias' }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map