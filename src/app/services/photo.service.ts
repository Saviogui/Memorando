import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly STORAGE_KEY = 'photos';

  constructor() { }

  getPhotos(): Photo[] {
    const photosJson = localStorage.getItem(this.STORAGE_KEY);
    return photosJson ? JSON.parse(photosJson) : [];
  }

  savePhoto(photo: Photo): void {
    const photos = this.getPhotos();
    photos.push(photo);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos));
  }

  updatePhoto(updatedPhoto: Photo): void {
    const photos = this.getPhotos();
    const index = photos.findIndex(p => p.id === updatedPhoto.id);
    if (index !== -1) {
      photos[index] = updatedPhoto;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos));
    }
  }

  deletePhoto(id: number): void {
    const photos = this.getPhotos().filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos));
  }

  getPhotoById(id: number): Photo | undefined {
    return this.getPhotos().find(p => p.id === id);
  }
}