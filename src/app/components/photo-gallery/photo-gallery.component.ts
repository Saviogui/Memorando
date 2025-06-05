import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule,FormsModule]
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = []; 
  searchQuery: string = ''; 

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
  this.photos = this.photoService.getPhotos().map(photo => ({
    ...photo,
    title: photo.title ?? 'Sem título'  
  }));
  
  this.filteredPhotos = this.photos;
}


  deletePhoto(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta foto?')) {
      this.photoService.deletePhoto(id);
      this.loadPhotos();
    }
  }

  filterPhotos(): void {
    this.filteredPhotos = this.photos.filter(photo =>
      photo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
