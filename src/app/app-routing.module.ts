import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';


const routes: Routes = [
  {
    path: '',
    component: HospitalViewComponent
  },
  {
    path: 'hospitals',
    component: HospitalViewComponent
  },
  {
    path: 'departments',
    component: DepartmentViewComponent
  },
  {
    path: '**',
    component: HospitalViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
