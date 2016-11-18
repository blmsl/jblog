import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlbumFolderComponent }   from "../gallery/album-folder.component";
import { AlbumListComponent }     from "../gallery/album-list.component";
import { ImageViewComponent }     from "../gallery/image-view.component";
import { AboutComponent }         from "../home/about.component";
import { HomeComponent }          from "../home/home.component";
import { JournalComponent }       from "../journal/journal.component";
import { PostComponent }          from "../journal/post.component";
import { ProjectListComponent }   from "../projects/project-list.component";

import { ErrorComponent }         from "../shared/error.component";

const routes: Routes = [
  { path: "about",                        component: AboutComponent },
  { path: "art/view/:id",                 component: ImageViewComponent },
  { path: "art/albums",                   component: AlbumListComponent },
  { path: "art/album/:album/page/:page",  component: AlbumFolderComponent },
  { path: "art/album/:album",             component: AlbumFolderComponent },
  { path: "art/page/:page",               component: AlbumFolderComponent },
  { path: "art",                          component: AlbumFolderComponent },
  { path: "code",                         component: ProjectListComponent },
  { path: "journal/page/:page",           component: JournalComponent },
  { path: "journal",                      component: JournalComponent },
  { path: "",                             component: HomeComponent, pathMatch: "full" },
  { path: "**",                           component: ErrorComponent },

  // Redirects
  { path: "calendar", redirectTo: "art/album/calendar2016" }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
