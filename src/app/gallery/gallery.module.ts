import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './album/album.component';
import { ImageComponent } from './image/image.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

import { ImageService } from './image.service';

import { AlbumDescriptionPipe } from './album-description.pipe';
import { GalleryFormatPipe } from './gallery-format.pipe';

const galleryRoutes: Routes = [
  {path: 'art', component: AlbumComponent },
  {path: 'art/view/:id', component: ImageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(galleryRoutes)
  ],
  declarations: [AlbumComponent, ImageComponent, AlbumListComponent, ThumbnailComponent, GalleryFormatPipe, AlbumDescriptionPipe],
  exports: [RouterModule, AlbumComponent, ImageComponent, AlbumListComponent],
  providers: [ImageService]
})
export class GalleryModule { }
