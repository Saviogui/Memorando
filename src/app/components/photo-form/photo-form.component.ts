import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./photo-form.component.scss'],
  
})
export class PhotoFormComponent implements OnInit {
  photo: Partial<Photo> = {
     title: '',
  author: '',
  description: '',
  date: new Date().toISOString().split('T')[0]
  };
  isEditMode = false;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      const existingPhoto = this.photoService.getPhotoById(+id);
      if (existingPhoto) {
        this.photo = { ...existingPhoto };
        this.imagePreview = existingPhoto.image;
        this.isEditMode = true;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.photo.description || !this.photo.date || !this.photo.title || !this.photo.author) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
    }

    const photoData: Photo = {
      id: this.isEditMode ? this.photo.id! : Date.now(),
      image: this.imagePreview as string,
      description: this.photo.description,
      date: this.photo.date,
      title: this.photo.title!,
    author: this.photo.author!
    };

    if (this.isEditMode) {
      this.photoService.updatePhoto(photoData);
    } else {
      this.photoService.savePhoto(photoData);
    }

    this.router.navigate(['/galeria']);
  }
}