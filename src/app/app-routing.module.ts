import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  { path: "overview", component: OverviewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
