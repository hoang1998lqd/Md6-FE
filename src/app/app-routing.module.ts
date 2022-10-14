import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {ProductComponent} from "./product/product.component";


const routes: Routes = [
  {
    path: "", component: HomeComponent,
  },
  {
    path: "login", component: LoginComponent,
    children:[
      {
        path: "register", component: RegisterComponent,
      }
    ]
  },
  {
    path: "register", component: RegisterComponent,
    children:[
      {
        path: "login", component: LoginComponent
      }
    ]
  },
  {
    path: "product", component: ProductComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent =
  [HomeComponent, LoginComponent, RegisterComponent, ProductComponent]
