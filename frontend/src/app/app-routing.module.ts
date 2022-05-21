import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'drink/:id', component: DrinkDetailComponent },
  { path: 'home', component: MainPageComponent},
  { path: 'drinks', component: DrinkListComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
