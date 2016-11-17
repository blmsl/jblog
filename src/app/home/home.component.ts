import { Component, OnInit } from "@angular/core";

import { AlbumImage }   from "../gallery/album-image.class";
import { GalleryService } from "../gallery/gallery.service";

import { ProjectData }      from "../projects/project-data.class";
import { ProjectsService }  from "../projects/projects.service";

@Component({
  providers: [ GalleryService, ProjectsService ],
  selector: "jblog-home",
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
  public images: AlbumImage[];
  public projects: ProjectData[];
  public imageRequestComplete: boolean;
  public projectsRequestComplete: boolean;

  constructor(private imageService: GalleryService, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadLatestFeaturedImages();
    this.loadLatestProjects();
  }

  private loadLatestFeaturedImages(): void {
    this.images = [];
    this.imageRequestComplete = false;
    const albumName = "featured";
    const page = 1;
    const amountToLoad = 4;
    this.imageService.getAlbumImageOverviewData(albumName, page, amountToLoad)
      .then(response => this.handleImageResponseSuccess(response))
      .catch(e => this.handleImageResponseFailure(e));
  }

  private handleImageResponseSuccess(data: AlbumImage[]): void {
    this.images = data;
    this.imageRequestComplete = true;
  }

  private handleImageResponseFailure(error: any): void {
    console.error("Upstream error occurred", error);
    this.images = [];
    this.imageRequestComplete = true;
  }

  private loadLatestProjects(): void {
    this.projectsRequestComplete = false;
    this.projectsService.getAllKnownProjects()
      .then(response => this.handleProjectsResponseDataSuccess(response))
      .catch(e => this.handleProjectsResponseDataFailure(e));
  }

  private handleProjectsResponseDataSuccess(data: ProjectData[]): void {
    this.projects = data.slice(0, 4);
    this.projectsRequestComplete = true;
  }

  private handleProjectsResponseDataFailure(error: any): void {
    this.projects = [];
    this.projectsRequestComplete = true;
  }
}
