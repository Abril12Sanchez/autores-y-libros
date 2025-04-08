import { inject, Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { first} from 'rxjs';
import { addDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment.development';
// import {db} from './firebase.config';

@Injectable({
  providedIn: 'root'
})

export class FuncionesService {
  
  private db: Firestore;

  constructor() {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

  // METODOSPARA LIBROS
  // metodo para obtener todos los documentos de la colección
  getLibros(){
    const librosCollection= collection(this.db, 'libros');
    return collectionData((librosCollection), {idField:"id"}).pipe(first());
  }
  // async getLibros() {
  //   const querySnapshot = await getDocs(collection(db, 'libros'));
  //   return querySnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }));
  // }

  // método para agregar documento a la colección
  agregarLibro(libro:Libro){
    const librosCollection=collection(this.db, 'libros');
    const libroData={
      id_autor : libro.id_autor,
      titulo : libro.titulo,
      editorial : libro.editorial,
      anioPublicacion : libro.anioPublicacion,
      sinopsis: libro.sinopsis
    
    };
    addDoc(librosCollection, libroData);
  }

  // metodo para modificar un documento
  modificarLibro(libro:Libro){
    const documentRef=doc(this.db, 'libros', libro.id);
    updateDoc(documentRef,{
       id_autor : libro.id_autor,
      titulo : libro.titulo,
      editorial : libro.editorial,
      anioPublicacion : libro.anioPublicacion,
      sinopsis: libro.sinopsis
    });
  }

  // metodo para borrar un documento
  eliminarLibro(libro:Libro){
    const documentRef=doc(this.db, 'libros', libro.id);
    deleteDoc(documentRef);
  }
  //limpiar campos
  limpiarLibro(){
    
  }

// Método para contar los libros de cada autor
// async contarLibrosPorAutor(autorId: string): Promise<number> {
//   const q = query(
//     collection(db, 'libros'),
//     where('id_autor', '==', autorId)
//   );
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.size;  // El número de libros del autor
// }


}