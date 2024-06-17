import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

  private productoService = inject(ProductoService)

  categorias: any = [
    { name: 'Ropa Dama', code: 'RD' },
    { name: 'Ropa Caballero', code: 'RC' },
    { name: 'Herramientas', code: 'He' },
    { name: 'Tecnología', code: 'Tec' },
    { name: 'Hogar', code: 'Hgr' }
  ];

  products: any[] = [];
  cols: any[] = [];
  visible: boolean = false;
  producto_id: number = -1;
  productoForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(0),
    image: new FormControl(''),
    stock: new FormControl(''),
  });

  constructor() {
    this.listarProductos();
  }

  mostrarDialog() {
    this.visible = true
  }
  saveNew() {

    if(this.producto_id>0){
      this.productoService.funModificar(this.producto_id,this.productoForm.value).subscribe
        (
          (res:any)=>
            {
              this.visible=false;
              this.listarProductos();
              this.producto_id=-1;
              this.alerta("ACTUALIZADO","El producto se ha modifico con éxito!","success")
              
            },
            (error:any)=>
            {
              this.alerta("ERROR AL ACTUALIZAR","Verifica lo datos!","error")
            }
            
        );  
        this.productoForm.reset();
    } else {
      console.log(this.productoForm.value);
      this.productoService.funGuardar(this.productoForm.value).subscribe
        (
          (res: any) => {
            this.visible = false;
            this.listarProductos();
            this.alerta("REGISTRADO", "El producto se creó con éxito!", "success")
  
          }
        ),
        (error: any) => {
          this.alerta("ERROR AL REGISTRADO", "Verifica lo datos!", "error")
        }
      this.productoForm.reset();
  
    }

    
  }
  editProduct(prod: any) {
    console.log(prod)
    this.visible = true
    this.producto_id = prod.id
    this.productoForm.setValue({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      image: prod.image,
      stock: prod.stock,
    })
  }
  deleteProduct(prod: any) {
    Swal.fire({
      title: "¿Está seguro de eliminar el producto?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.funEliminar(prod.id).subscribe(
          (res: any) => {
            this.alerta("ELIMINADO!", "Producto eliminado.", "success")

            this.listarProductos();
            this.producto_id = -1
          },
          (error: any) => {
            this.alerta("ERROR!", "Error al intentar eliminar.", "error")

          }
        )

      }
    });
  }

  listarProductos() {
    this.productoService.funListar().subscribe(
      (res: any) => {
        //console.log(res);
        this.products = res.data
      }
    )
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
    // title: title,
    //  text: text,
    // icon: icon

  }
}
