import { Component } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Libro } from '../../models/libro.model';
import { Autor } from '../../models/autor.model';
import { AutorService } from '../../services/autor.service';
import { MenuComponent } from "../menu/menu.component";


@Component({
  selector: 'app-libros',
  imports: [FormsModule, MenuComponent],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {


  libros:any;
  libro = new Libro();
  autores: Autor[] = [];  // Lista de autores
  librosCount: { [key: string]: number } = {};  // Almacenará el conteo de libros por autor

  
  //constructor
  constructor (private funcionService:FuncionesService, private autorService: AutorService){
    this.getLibros();
    this.getAutores();  // Obtén los autore
  }

  ngOnInit(): void {
    this.autorService.getAutores().subscribe((data: any[]) => {
      this.autores = data;
      this.autores.forEach(async (autor) => {
        // Contamos los libros por cada autor
        const count = await this.funcionService.contarLibrosPorAutor(autor.id);
        this.librosCount[autor.id] = count;  // Guardamos el conteo de libros
      });
    });
  }



//metodo que hace la peticion al service para obtener libros
async getLibros():Promise<void>{
  this.libros=await firstValueFrom(this.funcionService.getLibros());
}

// Obtener los autores
async getAutores(): Promise<void> {
  const autoresFirestore: any[] = await firstValueFrom(this.autorService.getAutores());  // Recibes los datos crudos de Firestore
  // Mapea los datos a instancias de la clase Autor
  this.autores = autoresFirestore.map(item => {
    return new Autor({
      id: item.id,
      nombre: item.nombre,
      ApellidoMaterno: item.ApellidoMaterno,
      ApellidoPaterno: item.ApellidoPaterno,
      fechadenacimiento: item.fechadenacimiento,
      nacionalidad: item.nacionalidad
    });
  });
}

// Función para obtener el nombre del autor dado un id
obtenerNombreAutor(id: string): string {
  const autor = this.autores.find(a => a.id === id);
  return autor ? autor.nombre : 'Desconocido';
}

//método para insertar un libro desde el formulario
insertarLibro(){
  this.funcionService.agregarLibro(this.libro);
  this.getLibros();
  this.libro=new Libro();
}
//método para seleccionar libro de la tabla
selectLibro(libroSeleccionado:Libro){
  this.libro=libroSeleccionado;
}
//Método para modificar libro
updateLibro(){
  this.funcionService.modificarLibro(this.libro);
  this.libro=new Libro();
  this.getLibros();
}

// método para eliminar
deleteLibro(){
  this.funcionService.eliminarLibro(this.libro);
  this.libro=new Libro();
  this.getLibros();
}
clearLibro(){
  this.libro.id_autor=0;
    this.libro.titulo="";
    this.libro.editorial="";
    this.libro.anioPublicacion=0;
    this.libro.sinopsis="";
    this.getLibros();

}



}