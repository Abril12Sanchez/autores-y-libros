import { Injectable } from '@angular/core';
import {Auth, user, User, browserLocalPersistence,
  signInWithEmailAndPassword, signOut
} from '@angular/fire/auth';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
import { from, Observable} from 'rxjs';
import { addDoc, updateDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private firebaseAuth:Auth) {
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
   }

   private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
   }

   //METODO PARA EL LOGIN -----------------------------

   login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password
    ).then(()=>{
      console.log("Usuario autentificado correctamente");
    });
    return from(promise);
   }

   //METODO PARA EL LOGOUT -----------------------------

   logout() : Observable<void> {
    const promise = signOut(this.firebaseAuth).then(()=>{
      sessionStorage.clear();
    });
    return from (promise);
   }
}
