import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { pages_container_routes } from '../modules/pages-container/pages-container-routing.module';
import { home_routes } from '../modules/home/home-routing.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"main", component: MainLayoutComponent, children: pages_container_routes},
  {path:"main", component: MainLayoutComponent, children: home_routes},
  {path:"login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
