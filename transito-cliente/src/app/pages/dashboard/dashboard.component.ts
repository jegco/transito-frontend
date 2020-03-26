import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { GuiasService } from 'src/app/providers/guias/guias.service';
import { map, tap, switchMap, flatMap } from 'rxjs/operators';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  guiasDeTramite: GuiaDeTramite[] = [];
  showSpinner = false;

  constructor(public readonly router: Router,
              public readonly errorService: ErrorService,
              public readonly toast: ToastrService,
              private readonly guiasService: GuiasService,
              private activatedRoute: ActivatedRoute) {
    super(router, errorService, toast);
  }

  ngOnInit() {
    this.showSpinner = true;
    this.activatedRoute.params.pipe(
      map(params => params['searchParam']),
      switchMap(searchParam => this.guiasService.buscarGuias(searchParam)))
      .subscribe(guias => {
        debugger;
        this.showSpinner = false;
        this.guiasDeTramite = guias;
      }, error => {
        this.handleException(error);
        this.showSpinner = false;
        }
      );
  }

  showDetails($event: GuiaDeTramite) {
    this.openPage( `/details/${$event.titulo}` , {guia: $event});
  }

}
