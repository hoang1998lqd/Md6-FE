import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxPaginationModule} from "ngx-pagination";
<<<<<<< HEAD
import { ShopComponent } from './shop/shop.component';
=======
import {AdminTableComponent} from "./admin-table/admin-table.component";
import {AdminComponent} from "./admin/admin.component";
import {FormCreateProductComponent} from "./form-create-product/form-create-product.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
>>>>>>> 3c6a78831b1542942d90248bc8db9b4c0843080c

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    ShopComponent
=======
    AdminTableComponent,
    AdminComponent,
    FormCreateProductComponent,
    ShoppingCartComponent,
    AboutUsComponent,
    CheckoutComponent,

>>>>>>> 3c6a78831b1542942d90248bc8db9b4c0843080c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    // Khởi tạo vào gọi tới Environment được khai báo biến ở trong environment
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
