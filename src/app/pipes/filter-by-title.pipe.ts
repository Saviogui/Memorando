import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../models/photo.model';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {
  transform(photos: Photo[], searchQuery: string): Photo[] {
    if (!searchQuery) return photos;
    return photos.filter(photo => 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
