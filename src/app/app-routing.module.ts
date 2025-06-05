import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';

const routes: Routes = [
  { path: 'galeria', component: PhotoGalleryComponent },
  { path: 'formulario', component: PhotoFormComponent },
  { path: 'formulario/:id', component: PhotoFormComponent },
  { path: '', redirectTo: '/galeria', pathMatch: 'full' },
  { path: '**', redirectTo: '/galeria' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }