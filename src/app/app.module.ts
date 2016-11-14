import { NgModule }       from "@angular/core";
import { HttpModule }     from "@angular/http";
import { BrowserModule }  from "@angular/platform-browser";

import { MomentModule } from "angular2-moment";

import { AppComponent }     from "./core/app.component";
import { AppRoutingModule } from "./core/app-routing.module";

import { ErrorComponent }       from "./shared/error.component";
import { PaginationComponent }  from "./shared/pagination.component";

import { MonthDetailComponent }   from "./calendar/month-detail.component";
import { YearOverviewComponent }  from "./calendar/year-overview.component";
import { FolderComponent }        from "./gallery/folder.component";
import { AboutComponent }         from "./home/about.component";
import { HomeComponent }          from "./home/home.component";
import { JournalComponent }       from "./journal/journal.component";
import { PostComponent }          from "./journal/post.component";
import { ProjectListComponent }   from "./projects/project-list.component";

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    MomentModule
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    ErrorComponent,
    FolderComponent,
    HomeComponent,
    JournalComponent,
    MonthDetailComponent,
    PaginationComponent,
    PostComponent,
    ProjectListComponent,
    YearOverviewComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }