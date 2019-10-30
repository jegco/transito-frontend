import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ErrorService } from 'src/app/errors/services/error.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , public readonly toast: ToastrService) {
    super(router, errorService, toast);
  }

  ngOnInit() {
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
