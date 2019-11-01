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
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSidenavModule,
  MatCheckboxModule, MatListModule, MatExpansionModule
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
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ErrorsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    ToastrModule
  ],
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
