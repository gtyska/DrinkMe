import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { FavouritesListComponent } from './favourites-list/favourites-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {MatIconModule} from '@angular/material/icon';
import { ArticlesListComponent } from './articles-list/articles-list.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'drink/:id', component: DrinkDetailComponent },
  { path: 'home', component: MainPageComponent},
  { path: 'drinks', component: DrinkListComponent },
  { path: 'favourites', component: FavouritesListComponent },
  { path: 'articles', component: ArticlesListComponent},
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), MatIconModule],
  exports: [RouterModule, MatIconModule]
})

export class AppRoutingModule { }
