import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './pages/base/base.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsModule } from './errors/errors.module';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, 
  MatExpansionModule, MatSidenavModule, MatDividerModule, MatPaginatorModule, 
  MatDialogModule, MatSelectModule, MatRadioModule
} from '@angular/material';
import { HttpErrorInterceptor } from './errors/services/http-error-interceptor';
import { HttpAuthInterceptor } from './providers/auth/HttpAuthInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuiasdetramiteComponent } from './pages/guiasdetramite/guiasdetramite.component';
import { PreferenciasComponent } from './pages/preferencias/preferencias.component';
import { GuardarGuiaComponent } from './components/guardar-guia/guardar-guia.component';
import { DragDropDirective } from './directives/DragDropDirective';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { TableComponent } from './components/table/table.component';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';
import { DocumentosComponent } from './pages/documentos/documentos.component';
import { GuiaDetallesComponent } from './pages/guia-detalles/guia-detalles.component';
import { GuiaCardComponent } from './components/guia-card/guia-card.component';
import { SpeedDialFloatingButtonComponent } from './components/speed-dial-floating-button/speed-dial-floating-button.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadoUsuarioComponent } from './components/estado-usuario/estado-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    GuiasdetramiteComponent,
    PreferenciasComponent,
    GuardarGuiaComponent,
    DragDropDirective,
    UploadFilesComponent,
    TableComponent,
    DocumentosComponent,
    GuiaDetallesComponent,
    GuiaCardComponent,
    SpeedDialFloatingButtonComponent,
    UsuariosComponent,
    EstadoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ErrorsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    ToastrModule,
    MatPaginatorModule,
    ColorPickerModule,
    QuillModule.forRoot()
  ],
  entryComponents: [EstadoUsuarioComponent],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
