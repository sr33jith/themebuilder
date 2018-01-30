import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BuilderService {

  private pageSelected = new Subject<string>();

  public pageSelected$ = this.pageSelected.asObservable();

  setSelectPage(page: string) {
    this.pageSelected.next(page);
  }

  subscribeData() {
        console.log('Inside subscribeData: ' + this.pageSelected);
        return this.pageSelected;
    }

  getSelectedPage() {
    return this.pageSelected;
  }
}
