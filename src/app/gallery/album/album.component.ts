import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';

/**
 * The component which represents a paginated collection of images that are
 * either grouped by a specific tag or folder.
 */
@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: [
    '../../../shared-sass/content-info-area.scss'
  ]
})
export class AlbumComponent implements OnInit {

  /**
   * The album data which describes the current view.
   */
  public data: AlbumInfo;

  /**
   * A boolean used to signify whether the album data is loading. Used to show
   * loading feedback to the user.
   */
  public isLoadingAlbumData = false;

  /**
   * A boolean used to signify whether the image data loading has failed. Used
   * to show feedback to the user.
   */
  public loadingFailed = false;

  /**
   * The current page to display.
   */
  public page: number;

  /**
   * A control variable to prevent reloading the same album data.
   */
  private lastLoadedAlbum: string;

  /**
   * Constructor with injected services.
   */
  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  /**
   * Called on component initialization. Used to load album data.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const albumName = params['name'] || '';
      this.page = +params['page'] || 1;

      this.getAlbumData(albumName);
    });
  }

  /**
   * Convenience method to load album data from a service.
   */
  private getAlbumData(albumName: string): void {
    // Only load album data if album has changed.
    if (albumName === this.lastLoadedAlbum) {
      return;
    }

    this.loadingFailed = false;
    this.isLoadingAlbumData = true;
    this.albumService.getAlbumInfo(albumName).subscribe(
      x => this.handleAlbumResponse(x),
      e => this.handleImageLoadFailure(e)
    );
  }

  /**
   * Convenience method to handle the album data response from the service.
   */
  private handleAlbumResponse(response: AlbumInfo): void {
    this.isLoadingAlbumData = false;
    this.data = response;
    this.lastLoadedAlbum = response.name;
  }

  /**
   * Convenience method to handle a failure response from the image service.
   */
  private handleImageLoadFailure(error: Error): void {
    this.isLoadingAlbumData = false;
    this.loadingFailed = true;
    console.log('Error: %s', error);
  }

}
