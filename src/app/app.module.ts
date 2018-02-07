import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ModalModule } from 'ngx-bootstrap'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuilderComponent } from './theme/builder/builder.component';
import { BuildernavComponent } from './theme/builder/buildernav/buildernav.component';
import { SectionsettingComponent } from './theme/builder/sectionsetting/sectionsetting.component';
import { PagecontentComponent } from './theme/builder/pagecontent/pagecontent.component';

import { BuilderService } from './theme/builder/builder.service';

// import { TinymceModule } from 'angular2-tinymce';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    BuildernavComponent,
    SectionsettingComponent,
    PagecontentComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    QuillModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [BuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
