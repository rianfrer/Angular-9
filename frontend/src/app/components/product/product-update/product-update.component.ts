import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product | any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      });
    }
  }

  updateProduct() {
    this.productService.update(this.product).subscribe(() => {
      this.productService.openSnackBar("Produto atualizado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
