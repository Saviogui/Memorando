import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'galeria',
    loadComponent: () => import('./components/photo-gallery/photo-gallery.component')
      .then(m => m.PhotoGalleryComponent)
  },
  {
    path: 'formulario',
    loadComponent: () => import('./components/photo-form/photo-form.component')
      .then(m => m.PhotoFormComponent)
  },
  {
    path: 'formulario/:id',  
    loadComponent: () => import('./components/photo-form/photo-form.component')
      .then(m => m.PhotoFormComponent)
  },
  { 
    path: '', 
    redirectTo: 'galeria', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'galeria' 
  }
];