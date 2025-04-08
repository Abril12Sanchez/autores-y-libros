import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../models/autor.model';
import { firstValueFrom } from 'rxjs';
import { AutorService } from '../../services/autor.service';
import { Libro } from '../../models/libro.model';
import { FuncionesService } from '../../services/funciones.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component"; 

declare var bootstrap: any;

@Component({
  selector: 'app-autores',
  imports: [FormsModule, CommonModule, MenuComponent],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent {

  autores:any;
  autor = new Autor();
  libro = new Libro();
  autorSeleccionado: any = null; // Para almacenar el autor seleccionado
  isModalOpen = false; // Controla si el modal está abierto o cerrado
  librosCount: { [key: string]: number } = {};  // Objeto para almacenar el conteo de libros por autor

  //constructor
  constructor (private autorService:AutorService, private funcionService: FuncionesService){
    this.getAutor();
  }

  // autores: Autor[] = [];  // Usa el tipo Autor aquí
  // ngOnInit(): void {
  //   // Obtener los autores
  //   this.autorService.getAutores().subscribe((data: Autor[]) => {  // Asegúrate de que data sea un arreglo de autores
  //     this.autores = data;
      
  //     // Contar los libros por cada autor
  //     this.autores.forEach(async (autor: Autor) => {  // Tipamos autor como Autor
  //       const count = await this.funcionService.contarLibrosPorAutor(autor.id);
  //       this.librosCount[autor.id] = count;  // Guardar el conteo de libros en el objeto
  //     });
  //   });
  // }

  // Método para obtener autores
  async getAutores() {
    this.autores = await firstValueFrom(this.autorService.getAutores());
  }

  // Método para seleccionar un autor y abrir el modal
  selectAutor(autor: any) {
    this.autorSeleccionado = autor;
    this.libro.id_autor = autor.id; // Asignamos el ID del autor al libro
    this.isModalOpen = true; // Abrimos el modal
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cerramos el modal
  }

  // Método para insertar el libro
  insertarLibro() {
    this.funcionService.agregarLibro(this.libro);
    this.libro = new Libro(); // Limpiamos el formulario
    this.isModalOpen = false; // Cerramos el modal
  }

//metodo que hace la peticion al service para obtener libros
async getAutor():Promise<void>{
  this.autores=await firstValueFrom(this.autorService.getAutores());
}
//método para insertar un libro desde el formulario
insertarAutor(){
  this.autorService.agregarAutor(this.autor);
  this.getAutor();
  this.autor=new Autor();
}
//método para seleccionar libro de la tabla
seleccionaAutor(autorSeleccionado:Autor){
  this.autor=autorSeleccionado;
}
//Método para modificar libro
updateAutor(){
  this.autorService.modificarAutor(this.autor);
  this.autor=new Autor();
  this.getAutor();
}

// método para eliminar
deleteAutor(){
  this.autorService.eliminarAutor(this.autor);
  this.autor=new Autor();
  this.getAutor();
}
clearAutor(){
  this.autor.nombre="";
  this.autor.ApellidoMaterno="";
  this.autor.ApellidoPaterno="";
  this.autor.fechadenacimiento="";
  this.autor.nacionalidad="";
  
  this.getAutor();
}
}