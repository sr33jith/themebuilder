import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuilderComponent } from './theme/builder/builder.component';
import { BuildernavComponent } from './theme/builder/buildernav/buildernav.component';
import { SectionsettingComponent } from './theme/builder/sectionsetting/sectionsetting.component';
import { PagecontentComponent } from './theme/builder/pagecontent/pagecontent.component';

import { BuilderService } from './theme/builder/builder.service';

import { TinymceModule } from 'angular2-tinymce';

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
    TinymceModule.withConfig({}),
    AppRoutingModule
  ],
  providers: [BuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
