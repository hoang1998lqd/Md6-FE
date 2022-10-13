import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  myScriptElement: HTMLScriptElement;
  myScriptElement1: HTMLScriptElement;
  myScriptElement2: HTMLScriptElement;
  myScriptElement3: HTMLScriptElement;
  myScriptElement4: HTMLScriptElement;
  myScriptElement5: HTMLScriptElement;
  myScriptElement6: HTMLScriptElement;
  constructor() {

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
    this.myScriptElement4.src = "./assets/admin/vendor/chart.js/Chart.min.js";
    document.body.appendChild(this.myScriptElement4)

    this.myScriptElement5 = document.createElement("script")
    this.myScriptElement5.src = "./assets/admin/js/demo/chart-area-demo.js";
    document.body.appendChild(this.myScriptElement5)

    this.myScriptElement6 = document.createElement("script")
    this.myScriptElement6.src = "./assets/admin/js/demo/chart-pie-demo.js";
    document.body.appendChild(this.myScriptElement6)
  }

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
    const script4 = document.createElement('body');
    script4.id = "page-top"
    document.body.appendChild(script4);

  }

  ngAfterContentChecked(){
    // const script5 = document.createElement('script');
    // script5.src = "./assets/admin/vendor/jquery/jquery.min.js";
    // document.body.appendChild(script5);
    // const script6 = document.createElement('script');
    // script6.src = "./assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";
    // document.body.appendChild(script6);
    // const script7 = document.createElement('script');
    // script7.src = "./assets/admin/vendor/jquery-easing/jquery.easing.min.js";
    // document.body.appendChild(script7);
    // const script8 = document.createElement('script');
    // script8.src = "./assets/admin/js/sb-admin-2.min.js";
    // document.body.appendChild(script8);
    // const script9 = document.createElement('script');
    // script9.src = "./assets/admin/vendor/chart.js/Chart.min.js";
    // document.body.appendChild(script9);
    // const script10 = document.createElement('script');
    // script10.src = "./assets/admin/js/demo/chart-area-demo.js";
    // document.body.appendChild(script10);
    // const script11 = document.createElement('script');
    // script11.src = "./assets/admin/js/demo/chart-pie-demo.js";
    // document.body.appendChild(script11);
  }

}
