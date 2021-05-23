import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditContainerComponent } from './pages/edit-container/edit-container.component';

import { SearchContainerComponent } from './pages/search-container/search-container.component';

const routes: Routes = [
  {path:"container", component: SearchContainerComponent}
];

export const pages_container_routes: Routes = [
  {path:"conten/search", component: SearchContainerComponent},
  {path:"conten/edit/:id_conten", component: EditContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesContainerRoutingModule { }
