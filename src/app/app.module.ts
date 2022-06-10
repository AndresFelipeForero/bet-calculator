import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Routing
import { AppRoutingModule } from './app-routing.module';

//Modulos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
