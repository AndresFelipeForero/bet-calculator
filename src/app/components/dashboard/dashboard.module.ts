import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MenosDosComponent } from './menos-dos/menos-dos.component';
import { MenosTresComponent } from './menos-tres/menos-tres.component';
import { MenosOneComponent } from './menos-one/menos-one.component';
import { MasOneComponent } from './mas-one/mas-one.component';
import { MasTwoComponent } from './mas-two/mas-two.component';
import { MasThreeComponent } from './mas-three/mas-three.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,    
    ReportesComponent, MenosDosComponent, MenosTresComponent, MenosOneComponent, MasOneComponent, MasTwoComponent, MasThreeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
