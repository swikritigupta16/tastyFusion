import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrderComponent } from './pages/order/order.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { FooterComponent } from './template/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from './template/admin-navbar/admin-navbar.component';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { EditItemsComponent } from './pages/edit-items/edit-items.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    OrderComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminNavbarComponent,
    EditItemsComponent,
    MyCartComponent
       
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule


  ],
  providers: [AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
