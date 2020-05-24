import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from 'src/app/models/User';
import { EstadoUsuarioComponent } from 'src/app/components/estado-usuario/estado-usuario.component';
let UsuariosComponent = class UsuariosComponent extends BaseComponent {
    constructor(router, errorService, toast, usuariosService, dialog) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.usuariosService = usuariosService;
        this.dialog = dialog;
        this.usuariosTbDatasource = [];
        this.usuarios = [];
        this.showSpinner = false;
        this.columnas = ['nombre', 'correo electronico', 'numero de contacto', "rol", "activo"];
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
    abrirEditarDialogo(index) {
        const dialogRef = this.dialog.open(EstadoUsuarioComponent, {
            data: { 'usuario': this.usuarios[index] }
        });
        dialogRef.afterClosed().subscribe((usuario) => {
            if (usuario) {
                this.showSpinner = true;
                this.usuariosService.modificarUsuario(new User(usuario.id, usuario.nombreDeUsuario, usuario.correoElectronico, usuario.password, usuario.numeroDeTelefono, !usuario.active, usuario.role))
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
    eliminarUsuario(index) {
        this.showSpinner = true;
        this.usuariosService.eliminarUsuario(this.usuarios[index])
            .subscribe(() => {
            this.showSpinner = false;
            this.usuarios.splice(index, 1);
        }, error => {
            this.showSpinner = false;
            this.handleException(error);
        });
    }
};
UsuariosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-usuarios',
        templateUrl: './usuarios.component.html',
        styleUrls: ['./usuarios.component.css']
    })
], UsuariosComponent);
export { UsuariosComponent };
//# sourceMappingURL=usuarios.component.js.map