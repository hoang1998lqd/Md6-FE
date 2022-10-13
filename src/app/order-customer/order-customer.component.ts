import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OrdersService} from "../service/orders.service";
import {Orders} from "../model/Orders";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CustomerService} from "../service/customer.service";
// @ts-ignore
import {OrderDetail} from "../model/OrderDetail";
import {ProductDTO} from "../model/ProductDTO";
import {OrderService} from "../service/order.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import Swal from "sweetalert2";
import {Customer} from "../model/Customer";
import {DTOItem} from "../model/DTOItem";

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrderCustomerComponent implements OnInit {
  myScriptElement: HTMLScriptElement;
  myScriptElement1: HTMLScriptElement;
  myScriptElement2: HTMLScriptElement;
  myScriptElement3: HTMLScriptElement;
  myScriptElement4: HTMLScriptElement;
  myScriptElement5: HTMLScriptElement;
  myScriptElement6: HTMLScriptElement;

  currentCustomer!: Customer;
  // DTOItems: DTOItem [] = []
  displayedColumns: string[] = ['stt', 'dateOrder', 'dateShip', 'description', 'customer', 'status_order', 'status_pay', 'action'];
  listOrderOfShop !: Orders[]
  listOrderDetail : OrderDetail [] = []
  searchText:any
  term: string = ""
  dataSource!: MatTableDataSource<Orders> ;
  constructor(private ordersService: OrdersService,
              private customerService: CustomerService,
              public dialog: MatDialog) {
    this.myScriptElement = document.createElement("script")
    this.myScriptElement.src = "./assets/admin/vendor/jquery/jquery.min.js";
    document.body.appendChild(this.myScriptElement)

    this.myScriptElement1 = document.createElement("script")
    this.myScriptElement1.src = "./assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";
    document.body.appendChild(this.myScriptElement1)

    this.myScriptElement2 = document.createElement("script")
    this.myScriptElement2.src = "./assets/admin/vendor/jquery-easing/jquery.easing.min.js";
    document.body.appendChild(this.myScriptElement2)

    this.myScriptElement3 = document.createElement("script")
    this.myScriptElement3.src = "./assets/admin/js/sb-admin-2.min.js";
    document.body.appendChild(this.myScriptElement3)

    this.myScriptElement4 = document.createElement("script")
    this.myScriptElement4.src = "./assets/admin/vendor/datatables/jquery.dataTables.min.js";
    document.body.appendChild(this.myScriptElement4)

    this.myScriptElement5 = document.createElement("script")
    this.myScriptElement5.src = "./assets/admin/vendor/datatables/dataTables.bootstrap4.min.js";
    document.body.appendChild(this.myScriptElement5)

    this.myScriptElement6 = document.createElement("script")
    this.myScriptElement6.src = "./assets/admin/js/demo/datatables-demo.js";
    document.body.appendChild(this.myScriptElement6)


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const script1 = document.createElement('link');
    script1.href = "./assets/admin/vendor/fontawesome-free/css/all.min.css";
    script1.rel = "stylesheet";
    script1.type = "text/css";
    document.body.appendChild(script1);

    const script2 = document.createElement('link');
    script2.href = "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    script2.rel = "stylesheet";
    document.body.appendChild(script2);

    const script3 = document.createElement('link');
    script3.href = "./assets/admin/css/sb-admin-2.min.css";
    script3.rel = "stylesheet";
    document.body.appendChild(script3);
    const script = document.createElement('link');
    script.href = "./assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
    script.rel = "stylesheet";
    document.body.appendChild(script);
    const script4 = document.createElement('body');
    script4.id = "page-top"
    document.body.appendChild(script4);
    const script5 = document.createElement('link');
    script2.href = "https://use.fontawesome.com/releases/v5.2.0/css/all.css\" integrity=\"sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ\" crossorigin=\"anonymous";
    script2.rel = "stylesheet";
    document.body.appendChild(script5);


    this.findAllOrderByCustomerId()
    // this.findAllOrderDetailByCustomerId()
    // this.findAllOrderDetail()

  }

  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login-register")
  }

  findAllOrderByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.ordersService.findAllOrderByCustomerId(idCustomer).subscribe(value => {
       this.dataSource = new MatTableDataSource(value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

      console.log(value)
    })
  }

  updateStatusExist(idOrder ?: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {

      if (result.isConfirmed) {
        this.ordersService.rejectOrder(idOrder).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã từ chối đơn hàng',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(()=>{
            window.location.reload()
          } ,1700)
        })

      }
    })

  }

  // findAllOrderDetailByCustomerId(){
  //   // @ts-ignore
  //   let idCustomer = parseInt(localStorage.getItem("idCustomer"))
  //   return this.ordersService.findAllOrderDetailByCustomerId(idCustomer).subscribe(value => {
  //     this.listOrderDetail = value
  //   })
  // }
  //
  //
  // findAllOrderDetail(idOrder ?: number) {
  //   let orderDetails : OrderDetail [] = []
  //   for (let i = 0; i < this.listOrderDetail.length; i++) {
  //     if (idOrder == this.listOrderDetail[i].orders!.id) {
  //       orderDetails.push(this.listOrderDetail[i])
  //     }
  //   }
  //   console.log(orderDetails)
  //   // return orderDetails;
  // }


  // Content
  openDialog(idOrder ?: any) {
    localStorage.setItem("idOrder",idOrder)
    const dialogRef = this.dialog.open(OrderDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // findItemByShopId(): any {
  //   // @ts-ignore
  //   let idShop = parseInt(localStorage.getItem("idShop"))
  //   let DTOItems: DTOItem[] = [];
  //   for (let i = 0; i < this.DTOItems.length; i++) {
  //     if (this.DTOItems[i].shop_id == idShop) {
  //       DTOItems.push(this.DTOItems[i])
  //     }
  //   }
  //   return DTOItems;
  // }
  //
  // createOrder() {
  //   // @ts-ignore
  //   let idShop = parseInt(localStorage.getItem("idShop"))
  //   // @ts-ignore
  //   let description = document.getElementById('checkout-mess').value
  //   let order = {
  //     description: description,
  //     customer: {
  //       id: this.currentCustomer.id
  //     },
  //     shop_id: idShop
  //   }
  //   // @ts-ignore
  //   return this.orderService.createOrder(order).subscribe(value => {
  //     let orderDetails: OrderDetail [] = [];
  //     let dtoItemCheckOut = this.findItemByShopId()
  //     console.log(dtoItemCheckOut)
  //     for (let i = 0; i < dtoItemCheckOut.length; i++) {
  //       // @ts-ignore
  //       let quantity = dtoItemCheckOut[i].item.quantity
  //       // @ts-ignore
  //       let orderDetail = {
  //         quantity: quantity,
  //         orders: {
  //           id: value.id
  //         },
  //         product: {
  //           id: dtoItemCheckOut[i].item.product.id
  //         }
  //       }
  //       orderDetails.push(orderDetail)
  //     }
  //     console.log("Trước khi lưu" + orderDetails)
  //     return this.ordersService.createOrderDetail(orderDetails).subscribe(value1 => {
  //       console.log(value1)
  //       // @ts-ignore
  //       document.getElementById('checkout-mess').value = ""
  //       for (let i = 0; i < dtoItemCheckOut.length; i++) {
  //         // @ts-ignore
  //         this.cartService.deleteItem(dtoItemCheckOut[i].item.id).subscribe(() =>{
  //           localStorage.removeItem("idShop")
  //         })
  //       }
  //       // this.createSuccess()
  //       // setTimeout(() => {
  //       //   window.location.reload()
  //       // }, 1700)
  //     })
  //   })
  // }
  //
  // createSuccess() {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'Đặt hàng thành công',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }
}



