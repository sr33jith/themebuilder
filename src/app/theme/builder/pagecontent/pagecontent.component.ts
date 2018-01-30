import { Component, OnInit, OnChanges } from '@angular/core';
import { BuilderService } from './../builder.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pagecontent',
  templateUrl: './pagecontent.component.html',
  styleUrls: ['./pagecontent.component.css']
})
export class PagecontentComponent implements OnInit, OnChanges {

  private builderServiceObj: Subscription;
  page: any = '';
  private contentDisplay: any;

  pageUrls = {
    home: 'http://localhost:3000',
    gallery: 'http://localhost:3000'
  };
  public sanitizedUrl: any;
  public content = '';

  constructor(private builderService: BuilderService, private sanitizer: DomSanitizer) {
    this.builderServiceObj = this.builderService.pageSelected$.subscribe(
      page => {
        console.log(page);
        this.page = page;
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrls[page]);
        this.contentDisplay = `Here we are for ` + page + `.`;
      }
    );
  }

  ngOnInit() {
    // console.log(this.builderService.pageSelected$);
  }

   ngOnChanges() {
  //   this.builderService.subscribeData();
  //   console.log('testing build service changes');
  //   console.log(this.builderService.pageSelected$);
   }

}
