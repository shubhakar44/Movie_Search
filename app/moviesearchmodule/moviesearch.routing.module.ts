import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MoviesearchComponent } from "./moviesearch/moviesearch.component";



const routes: Routes = [
  { path: 'movieSearch', component: MoviesearchComponent },
  { path: '', redirectTo: '/movieSearch', pathMatch: 'full' },
  { path: '**', redirectTo: '/movieSearch', pathMatch: 'full' }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesearchmoduleRoutingModule { }
