import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Orders} from "../model/Orders";
import {Observable} from "rxjs";
import {OrderDetail} from "../model/OrderDetail";


@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private httpclient: HttpClient) {
  }

  createOrder(order ?: Orders): Observable<Orders> {
    return this.httpclient.post<Orders>("http://localhost:8081/api/orders", order);
  }

  rejectOrder(idOrder ?: number) {
    return this.httpclient.put("http://localhost:8081/api/orders", idOrder);
  }

  createOrderDetail(orderDetails?: OrderDetail[]): Observable<OrderDetail[]> {
    return this.httpclient.post<OrderDetail[]>("http://localhost:8081/api/orders/order-detail", orderDetails)
  }

  // Tìm kiếm tất cả order theo shop_id
  findAllOrderByShopId(idShop ?: number): Observable<Orders[]> {
    return this.httpclient.get<Orders[]>("http://localhost:8081/api/orders/shop/" + idShop)
  }

  // UPdate lần 1 XÁC NHẬN CỦA CỬA HÀNG SẼ GỬI HÀNG VÀ TRỪ SỐ LƯỢNG SẢN PHẨM ĐÓ TRONG KHO
  updateStatusOrder(orders ?: Orders): Observable<Orders> {
    return this.httpclient.put<Orders>("http://localhost:8081/api/orders/update-quantity", orders)
  }

  //Tìm kiếm thông tin chi tiết đơn hàng của NGƯỜI BÁN HÀNG đó
  findAllOrderDetailByShopId(idShop ?: number): Observable<OrderDetail[]> {
    return this.httpclient.get<OrderDetail[]>("http://localhost:8081/api/orders/shop&" + idShop)
  }

  //Tìm kiếm chi tiết đơn hàng thông qua ID của Order
  findAllOrderDetailByOrderId(idOrder ?: number): Observable<OrderDetail[]> {
    return this.httpclient.get<OrderDetail[]>("http://localhost:8081/api/orders/order-detail/" + idOrder)
  }


  findAllOrderByCustomerId(idCustomer: number): Observable<Orders[]> {
    return this.httpclient.get<Orders[]>("http://localhost:8081/api/orders/order-customer/" + idCustomer)
  }

  updateStatusOrderCustomer(idOrder ?: any) {
    // @ts-ignore
    return this.httpclient.put("http://localhost:8081/api/orders/order-customer/" + idOrder)
  }

}
