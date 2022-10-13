import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../model/Orders";
import {OrderDetail} from "../model/OrderDetail";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  findAllOrderByShop(idShop: number): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>("http://localhost:8081/api/orders/shop/" + idShop)

  }

  findAllOrder(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>("http://localhost:8081/api/orders")
  }

  // tìm kiếm tất cả order-detail theo 1 order
  findAllOrderDetailByOrder(idOrder: number): Observable<OrderDetail[]> {
    return this.httpClient.get<OrderDetail[]>("http://localhost:8081/api/orders/order-detail-order/" + idOrder)
  }

  findAllOrderByCustomer(idCustomer: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8081/api/orders/order-customer/"+idCustomer)
  }
}
