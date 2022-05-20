import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: 'drinks', component: DrinkListComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
