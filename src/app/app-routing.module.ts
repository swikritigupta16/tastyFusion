import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditItemsComponent } from './pages/edit-items/edit-items.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'order', component: OrderComponent, canActivate: [AuthenticationGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path : 'edit-items',component:EditItemsComponent},
  {path : 'my-cart',component:MyCartComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }