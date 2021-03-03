import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './main/login/login.component';
import { PageComponent } from './main/page/page.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { AuthService } from './_services/auth/auth.service';
import { AuthInterceptor } from './_services/auth/interceptors/auth.interceptor';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PageComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
