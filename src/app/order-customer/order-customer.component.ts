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
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import Swal from "sweetalert2";
import {Customer} from "../model/Customer";
import {DTOItem} from "../model/DTOItem";
import {DTOOrder} from "../model/DTOOrder";
import {Router} from "@angular/router";
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {CategoryBrandService} from "../service/category-brand.service";
import {Item} from "../model/Item";
import {CategoryBrand} from "../model/CategoryBrand";


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
  myScriptElement7: HTMLScriptElement;
  myScriptElement8: HTMLScriptElement;
  myScriptElement9: HTMLScriptElement;
  myScriptElement10: HTMLScriptElement;
  myScriptElement11: HTMLScriptElement;
  myScriptElement12: HTMLScriptElement;


  roleSize ?: number
  currentCustomer!: Customer;
  items: Item [] = [];
  categoryBrands: CategoryBrand[] = []
  total: number = 0;
  subtotal: number = 0;
  discountItem: number = 0;
  voucherItem: number = 0;
  DTOItems: DTOItem [] = []
  idCurrentCustomer : number = 0
  listProduct: ProductDTO [] = []
  username?: any

  status_order = "Ch??? x??c nh???n"
  status_order_1 = "???? g???i h??ng"
  status_pay = "???? thanh to??n"

  displayedColumns: string[] = ['stt', 'dateOrder', 'dateShip', 'description', 'customer', 'status_order', 'status_pay', 'action'];
  term: string = ""
  dataSource!: MatTableDataSource<DTOOrder>;

  constructor(private orderService: OrdersService,
              private customerService: CustomerService,
              public dialog: MatDialog,
              private productService: ProductService,
              private cartService: CartService,
              private categoryBrandService: CategoryBrandService,
              private router: Router) {
    this.myScriptElement = document.createElement("script")
    this.myScriptElement.src = "./assets/js/vendor/jquery-3.2.1.min.js";
    document.body.appendChild(this.myScriptElement)

    this.myScriptElement1 = document.createElement("script")
    this.myScriptElement1.src = "./assets/js/jquery.countdown.min.js";
    document.body.appendChild(this.myScriptElement1)

    this.myScriptElement2 = document.createElement("script")
    this.myScriptElement2.src = "./assets/js/jquery.meanmenu.min.js";
    document.body.appendChild(this.myScriptElement2)

    this.myScriptElement3 = document.createElement("script")
    this.myScriptElement3.src = "./assets/js/jquery.scrollUp.js";
    document.body.appendChild(this.myScriptElement3)

    this.myScriptElement4 = document.createElement("script")
    this.myScriptElement4.src = "./assets/js/jquery.nivo.slider.js";
    document.body.appendChild(this.myScriptElement4)

    this.myScriptElement5 = document.createElement("script")
    this.myScriptElement5.src = "./assets/js/jquery.fancybox.min.js";
    document.body.appendChild(this.myScriptElement5)

    this.myScriptElement6 = document.createElement("script")
    this.myScriptElement6.src = "./assets/js/jquery.nice-select.min.js";
    document.body.appendChild(this.myScriptElement6)

    this.myScriptElement7 = document.createElement("script")
    this.myScriptElement7.src = "./assets/js/jquery-ui.min.js";
    document.body.appendChild(this.myScriptElement7)

    this.myScriptElement8 = document.createElement("script")
    this.myScriptElement8.src = "./assets/js/owl.carousel.min.js";
    document.body.appendChild(this.myScriptElement8)

    this.myScriptElement9 = document.createElement("script")
    this.myScriptElement9.src = "./assets/js/popper.min.js";
    document.body.appendChild(this.myScriptElement9)


    this.myScriptElement12 = document.createElement("script")
    this.myScriptElement12.src = "./assets/js/bootstrap.min.js";
    document.body.appendChild(this.myScriptElement12)


    this.myScriptElement10 = document.createElement("script")
    this.myScriptElement10.src = "./assets/js/plugins.js";
    document.body.appendChild(this.myScriptElement10)

    this.myScriptElement11 = document.createElement("script")
    this.myScriptElement11.src = "./assets/js/main.js";
    document.body.appendChild(this.myScriptElement11)
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
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);
    this.findCurrentCustomer()
    this.username = localStorage.getItem("username")
    // this.displayItem()
    this.findAllDTOItem()
    this.findItemByShopId()
    this.findProductByCustomerId()
    this.displayBrandByCategory()
    this.displayItem()
    this.findRole()
    this.username = localStorage.getItem("username")
    this.findAllDTOOrderByCustomerId()
  }

  // Content
  logOut() {
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login-register")
  }

  findAllDTOOrderByCustomerId() {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idCustomer"))
    return this.orderService.findAllDTOOrderByCustomerId(idShop).subscribe(value => {
      console.log(value)
      this.dataSource = new MatTableDataSource<DTOOrder>(value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  updateStatusExist(idOrder ?: number) {
    Swal.fire({
      title: 'B???n c?? ch???c mu???n h???y ????n h??ng?',
      text: "D??? li???u s??? kh??ng th??? kh??i ph???c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '?????ng ??!',
      cancelButtonText: 'H???y',
    }).then((result) => {

      if (result.isConfirmed) {
        this.orderService.rejectOrder(idOrder).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '???? t??? ch???i ????n h??ng',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            // this.findAllOrderByShopId()
            this.findAllDTOOrderByCustomerId()
          }, 1700)
        })

      }
    })

  }

  // Chuy???n STATUS_ORDER sang 1 l?? ph???n g???i h??ng
  updateStatusOrderFirst(idOrder ?: any) {
    this.orderService.updateStatusShipDone(idOrder).subscribe(value => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'C???m ??n b???n ???? mua h??ng <3',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        // this.findAllOrderByShopId()
        this.findAllDTOOrderByCustomerId()
      }, 1700)
    })

  }

  // Content
  openDialog(idOrder ?: any) {
    localStorage.setItem("idOrder", idOrder)
    const dialogRef = this.dialog.open(OrderDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Hi???n th??? Brand v?? Category
  displayBrandByCategory() {
    return this.categoryBrandService.findAllCategoryAndBrand().subscribe(value => {
      this.categoryBrands = value
      console.log(value)
    })
  }


  findAllProductByCategoryIdAndBrandId(idCategory?: number, idBrand?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.productService.findAllProductByCategoryIdAndBrandId(idCustomer, idCategory, idBrand)
      .subscribe(value => {
        this.listProduct = value
      })
  }

  findProductByCategoryId(idCategory?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.productService.findAllProductByCategoryId(idCategory, idCustomer).subscribe(value => {
      this.listProduct = value;
      console.log(value)
    })
  }

  //Products c???a ng?????i mua h??ng g???m c??? ng?????i b??n h??ng nh??ng kh??ng c?? s???n ph???m c???a ng?????i b??n ????
  // ?????y l?? list Product hi???n th??? tr??n trang b??n h??ng
  findProductByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.productService.findAllProductNotCustomerId(idCustomer).subscribe(value => {
      this.listProduct = value
    })
  }
  // T??m ki???m th??ng tin ng?????i d??ng
  findCurrentCustomer() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      this.currentCustomer = value;
    })
  }
  findImageURLFirst(idProduct: any): any {
    let imageURL: any;
    let flag = false;
    if (idProduct != null) {
      for (let i = 0; i < this.listProduct.length; i++) {
        // @ts-ignore
        if (this.listProduct[i].product.id == idProduct) {
          flag = true
          // @ts-ignore
          imageURL = this.listProduct[i].imageURLS[0]
          return imageURL;
        }
      }
    }
  }
  displayItem() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      console.log(value)
      this.items = value;
      this.subtotal = 0;
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        this.subtotal += value[i].quantity * value[i].product.price
        this.getTotalMoney(this.subtotal)
      }
    })
  }


  // L???y t???ng ti???n c???n thanh to??n khi ?????t h??ng
  getTotalMoney(subtotal: any) {
    if (subtotal > 100000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      this.total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }

  }

  changePrice(money?: number): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
    if (money != null) {
      return formatter.format(money);
    }

  }

  // L???y t???ng ti???n cho s???n ph???m trong Cart
  getTotalItem(idItem: any): any {
    let dtoItems = this.findItemByShopId()
    let totalMoney: any;
    for (let i = 0; i < dtoItems.length; i++) {
      // @ts-ignore
      if (dtoItems[i].item.id == idItem) {
        // @ts-ignore
        totalMoney = dtoItems[i].item.quantity * dtoItems[i].item.product.price
        return totalMoney
      }
    }
  }

  deleteItem(idItem?: number) {
    Swal.fire({
      title: 'X??a s???n ph???m',
      text: "X??a s???n ph???m kh???i gi??? h??ng",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '?????ng ??!',
      cancelButtonText: 'H???y',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteItem(idItem).subscribe(value => {

        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'X??a th???t b???i',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'X??a s???n ph???m th??nh c??ng',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.ngOnInit()
      // @ts-ignore
      document.getElementById('cart').style.display = "none"

    })

  }

  // C???n thay ?????i Id c???a c???a h??ng

  createOrder() {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    // @ts-ignore
    let description = document.getElementById('checkout-mess').value
    let order = {
      description: description,
      customer: {
        id: this.currentCustomer.id
      },
      shop_id: idShop
    }
    // @ts-ignore
    return this.orderService.createOrder(order).subscribe(value => {
      let orderDetails: OrderDetail [] = [];
      let dtoItemCheckOut = this.findItemByShopId()
      console.log(dtoItemCheckOut)
      for (let i = 0; i < dtoItemCheckOut.length; i++) {
        // @ts-ignore
        let quantity = dtoItemCheckOut[i].item.quantity
        // @ts-ignore
        let orderDetail = {
          quantity: quantity,
          orders: {
            id: value.id
          },
          product: {
            id: dtoItemCheckOut[i].item.product.id
          }
        }
        orderDetails.push(orderDetail)
      }
      console.log("Tr?????c khi l??u" + orderDetails)
      return this.orderService.createOrderDetail(orderDetails).subscribe(value1 => {
        console.log(value1)
        // @ts-ignore
        document.getElementById('checkout-mess').value = ""
        for (let i = 0; i < dtoItemCheckOut.length; i++) {
          // @ts-ignore
          this.cartService.deleteItem(dtoItemCheckOut[i].item.id).subscribe(() =>{
            localStorage.removeItem("idShop")
          })
        }
        this.createSuccess()
      })
    })
  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '?????t h??ng th??nh c??ng',
      showConfirmButton: false,
      timer: 1500
    }).finally(() =>{
      localStorage.removeItem("idShop")
      this.router.navigate(["/"])
    })
  }

  //Find All DTOItem.ts theo id c???a ng?????i ??ang ????ng nh???p
  findAllDTOItem() {
    // @ts-ignore
    this.idCurrentCustomer = parseInt(localStorage.getItem("idCustomer"))
    // @ts-ignore
    let idCustomerCurrent = parseInt(localStorage.getItem("idCustomer"))
    return this.cartService.findAllDTOItem(this.idCurrentCustomer).subscribe(value => {
      console.log(value)
      this.DTOItems = value
    })
  }

  findItemByShopId(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let DTOItems: DTOItem[] = [];
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    return DTOItems;
  }

  subtotalMoney(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    return subtotal

  }

  totalMoney(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let total = 0
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    if (subtotal > 100000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }
    return total;
  }

  discountAutomatic(subtotal: number): any {
    let discountItem = 0
    if (subtotal > 100000000) {
      discountItem = 30
    } else if (subtotal > 50000000) {
      discountItem = 15
    } else if (subtotal > 30000000) {
      discountItem = 10
    } else {
      discountItem = 0
    }
    return discountItem
  }

  findRole(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      console.log(value)
      this.roleSize = value.role?.length
    })

  }


}


