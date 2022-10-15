import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTableComponent} from "./admin-table/admin-table.component";
import {AdminComponent} from "./admin/admin.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {OrderShopComponent} from "./order-shop/order-shop.component";


const routes: Routes = [
  {
    path: "admin-table", component: AdminTableComponent,
  },
  {
    path: "admin", component: AdminComponent,
  },
  {
    path:"", component: HomeComponent
  },
  {
    path:"shopping-cart", component: ShoppingCartComponent
  },
  {
    path:"about", component: AboutUsComponent
  },
  {
    path:"checkout", component: CheckoutComponent
  },
  {
    path:"order-shop", component: OrderShopComponent
  },
  {
    path: "order-customer", component: OrderShopComponent
  },

  // {
  //   path:"shop", component: ShopComponent,
  //   children: [
  //     {
  //       path: "shopping-cart", component: ShoppingCartComponent
  //     },
  //     {
  //       path: "", component: HomeComponent
  //     },
  //     {
  //       path: "login-register", component: LoginRegisterComponent
  //     },
  //     {
  //       path: "**", component: PageNotFoundComponent
  //     },
  //     {
  //       path: "single-product", component: SingleProductComponent
  //     }
  //   ]
  // },
  // {
  //   path: "single-product", component: SingleProductComponent
  // },{
  //   path: "order-shop", component: OrderShopComponent
  // },
  // {
  //   path:"shopping-cart", component: ShoppingCartComponent,
  //   children: [
  //     {
  //       path: "shop", component: ShopComponent
  //     },
  //     {
  //       path: "", component: HomeComponent
  //     },
  //     {
  //       path: "login-register", component: LoginRegisterComponent
  //     },
  //     {
  //       path: "**", component: PageNotFoundComponent
  //     },
  //     {
  //       path: "checkout", component: CheckoutComponent
  //     }
  //   ]
  // },
  // {
  //   path: "checkout", component: CheckoutComponent
  // },
  // {
  //   path: "login-register", component: LoginRegisterComponent,
  //   children:[
  //     {
  //       path: "", component: HomeComponent
  //     },
  //     {
  //       path: "shop", component: ShopComponent
  //     },
  //     {
  //       path: "shopping-cart", component: ShoppingCartComponent
  //     },
  //     {
  //       path: "**", component: PageNotFoundComponent
  //     }
  //   ]
  // },
  // {
  //   path: "**", component: PageNotFoundComponent,
  //   children:[
  //     {
  //       path: "", component: HomeComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
