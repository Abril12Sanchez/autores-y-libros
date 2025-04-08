import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { LibrosComponent } from './pages/libros/libros.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'autores',
        component: AutoresComponent,
        canActivate: [authGuard],
    },
    {
        path: 'libros',
        component: LibrosComponent,
        canActivate: [authGuard],
    },
    {
        path:'**',
        redirectTo: ''
    }
];