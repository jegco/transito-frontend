import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/User';

export interface DialogData {
  usuario: User;
}

@Component({
  selector: 'app-estado-usuario',
  templateUrl: './estado-usuario.component.html',
  styleUrls: ['./estado-usuario.component.css']
})
export class EstadoUsuarioComponent implements OnInit {

  opcion = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly dialogRef: MatDialogRef<EstadoUsuarioComponent>) { }

  ngOnInit(): void {
    this.data.usuario.active ? this.opcion = 'desactivar' : this.opcion = 'activar';
  }

  cerrar(cambiar: boolean): void {
    this.dialogRef.close(cambiar);
  }

}
