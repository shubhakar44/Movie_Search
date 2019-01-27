import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesearchmoduleModule } from './moviesearchmodule/moviesearchmodule.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), MoviesearchmoduleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
