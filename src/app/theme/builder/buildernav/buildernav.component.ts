import { Component, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { BuilderService } from './../builder.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-buildernav',
  templateUrl: './buildernav.component.html',
  styleUrls: ['./buildernav.component.css']
})
export class BuildernavComponent implements OnInit, OnChanges, OnDestroy {

  private builderServiceObj: Subscription;
  page: any = '';

  constructor(private builderService: BuilderService) {
    this.builderServiceObj = this.builderService.pageSelected$.subscribe(
      page => { this.page = page; }
    );
  }

  ngOnInit() {
    this.navPage('home');
  }

  ngOnChanges() {
  }

  navPage(pageName: string) {
    this.page = pageName;
    this.builderService.setSelectPage(pageName);
    // this.pageSelected.emit(pageName);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.builderServiceObj.unsubscribe();
  }

}
