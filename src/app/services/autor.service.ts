import { Injectable, inject } from '@angular/core';
import { Autor } from '../models/autor.model';
import { collection, collectionData, deleteDoc, doc, Firestore, getFirestore, getDocs} from '@angular/fire/firestore';
import { addDoc, updateDoc } from 'firebase/firestore';
import { first } from 'rxjs';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private db: Firestore;

  constructor() {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

  
  getAutores(){
    const autorescollection= collection(this.db, 'autores');
    return collectionData((autorescollection), {idField:"id"}).pipe(first());
  }

  // método para agregar documento a la colección
  agregarAutor(autor:Autor){
    const autorescollection=collection(this.db, 'autores');
    const autorData={
      nombre : autor.nombre,
      ApellidoMaterno : autor.ApellidoMaterno,
      ApellidoPaterno : autor.ApellidoPaterno,
      fechadenacimiento : autor.fechadenacimiento,
      nacionalidad: autor.nacionalidad
    
    };
    addDoc(autorescollection, autorData);
  }

  // metodo para modificar un documento
  modificarAutor(autor:Autor){
    const documentRef=doc(this.db, 'autores', autor.id);
    updateDoc(documentRef,{
      nombre : autor.nombre,
      ApellidoMaterno : autor.ApellidoMaterno,
      ApellidoPaterno : autor.ApellidoPaterno,
      fechadenacimiento : autor.fechadenacimiento,
      nacionalidad: autor.nacionalidad
    });
  }

  // metodo para borrar un documento
  eliminarAutor(autor:Autor){
    const documentRef=doc(this.db, 'autores', autor.id);
    deleteDoc(documentRef);
  }
  //limpiar campos
  limpiarAutor(){
    
  }
}
