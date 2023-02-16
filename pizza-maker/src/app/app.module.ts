import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { NavToolbarComponent } from './components/nav-toolbar/nav-toolbar.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
// Extra
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    LoginComponent,
    OrdersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
