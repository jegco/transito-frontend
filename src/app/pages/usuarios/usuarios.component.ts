import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/providers/user/login.service';
import { MatDialog } from '@angular/material';
import { EstadoUsuarioComponent } from 'src/app/components/estado-usuario/estado-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent extends BaseComponent implements OnInit {

  usuariosTbDatasource = [];
  usuarios: User[] = [];
  showSpinner = false;
  columnas = ['nombre', 'correo electronico', 'numero de contacto', "rol", "activo"];

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly usuariosService: LoginService,
    private readonly dialog: MatDialog) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.showSpinner = true;
    this.usuariosService.buscarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      usuarios.forEach(usuario => {
        this.showSpinner = false;
        const nombre = usuario.nombreDeUsuario;
        const correoElectronico = usuario.correoElectronico;
        const activo = usuario.active ? 'Activo' : 'Inactivo';
        const numero = usuario.numeroDeTelefono;
        const rol = usuario.role;
        this.usuariosTbDatasource.push({ nombre, correoElectronico, numero, rol, activo });
      });
    }, error => {
      this.handleException(error);
      this.showSpinner = false;
    });
  }

  abrirEditarDialogo(index: number) {
    const dialogRef = this.dialog.open(EstadoUsuarioComponent, {
      data: { 'usuario': this.usuarios[index] }
    });

    dialogRef.afterClosed().subscribe((usuario: User) => {
      if (usuario) {
        this.showSpinner = true;
        this.usuariosService.modificarUsuario(new User(usuario.id,
          usuario.nombreDeUsuario,
          usuario.correoElectronico,
          usuario.password,
          usuario.numeroDeTelefono,
          !usuario.active,
          usuario.role))
          .subscribe(() => {
            this.showSpinner = false;
            this.usuarios[index].active = !this.usuarios[index].active;
            this.toast.success('Usuario activado exitosamente');
          }, error => {
            this.handleException(error);
            this.showSpinner = false;
          });
      }
    });
  }

  eliminarUsuario(index: number): void {
    this.showSpinner = true;
    this.usuariosService.eliminarUsuario(this.usuarios[index])
      .subscribe(() => {
        this.showSpinner = false;
        this.usuarios.splice(index, 1);
      }, error => {
        this.showSpinner = false;
        this.handleException(error);
      })
  }

}
