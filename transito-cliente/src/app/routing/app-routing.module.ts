import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../pages/search/search.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { DetailsComponent } from '../pages/details/details.component';


const routes: Routes = [
  {path: 'search/:searchParam', component: DashboardComponent},
  {path: 'details/:nombreGuia', component: DetailsComponent},
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
