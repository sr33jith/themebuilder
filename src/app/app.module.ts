import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ModalModule } from 'ngx-bootstrap';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuilderComponent } from './theme/builder/builder.component';
import { BuildernavComponent } from './theme/builder/buildernav/buildernav.component';
import { SectionsettingComponent } from './theme/builder/sectionsetting/sectionsetting.component';
import { PagecontentComponent } from './theme/builder/pagecontent/pagecontent.component';

import { BuilderService } from './theme/builder/builder.service';

// import { TinymceModule } from 'angular2-tinymce';

import { QuillEditorModule } from 'ngx-quill-editor';

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
    QuillEditorModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    DndModule.forRoot()
  ],
  providers: [BuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
