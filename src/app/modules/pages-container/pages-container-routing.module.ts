import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditContainerComponent } from './pages/edit-container/edit-container.component';

import { SearchContainerComponent } from './pages/search-container/search-container.component';
import { CreateContainerComponent } from './pages/create-container/create-container.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

const routes: Routes = [
  {path:"container", component: SearchContainerComponent}
];

export const pages_container_routes: Routes = [
  {path:"conten/search", component: SearchContainerComponent},
  {path:"conten/create", component: CreateContainerComponent},
  {path:"page/create", component: CreatePageComponent},
  {path:"conten/edit/:id_conten", component: EditContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesContainerRoutingModule { }
