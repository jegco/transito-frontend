import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Subject } from 'rxjs';
import { Page } from 'src/app/models/Page';

@Component({
  selector: 'app-guiasdetramite',
  templateUrl: './guiasdetramite.component.html',
  styleUrls: ['./guiasdetramite.component.css']
})
export class GuiasdetramiteComponent extends BaseComponent implements OnInit {

  guias: Page<GuiaDeTramite> = new Page<GuiaDeTramite>([]);
  subject = new Subject<Page<GuiaDeTramite>>();

  constructor(public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly guiasService: GuiasService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.cargarGuias();
  }

  buscarMasGuias() {
    this.guias.next +=1;
    this.guias.count += 6;
    this.cargarGuias();
  }

  cargarGuias() {
    this.guiasService.buscarGuias(this.guias)
    .subscribe(guias => {

      this.guias.results = [...this.guias.results, ...guias.results];
    }, error => this.handleException(error));
  }

  isDataLoaded(): boolean {
    return this.guias.results.length === 0;
  }

  crearGuia() {
    this.openPage('dashboard/guardar-nueva-guia');
  }

  actualizarGuia(guia: GuiaDeTramite) {
    this.openPage(`dashboard/guardar-nueva-guia/${guia.titulo}`);
  }

  eliminarGuia(guia: GuiaDeTramite, index: number) {
    this.guiasService.eliminarGuia(guia).subscribe(() => {
    this.toast.success('Guia eliminada correctamente');
    this.guias.results.splice(index, 1);
    debugger;
    },
     error => this.errorService.handleException(error));
  }

  mostrarGuia(guia: GuiaDeTramite) {
    this.openPage(`dashboard/guias/${guia.titulo}`);
  }

}
