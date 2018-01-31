import { Http, HttpModule, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class BuilderService {

  private pageSelected = new Subject<string>();

  public pageSelected$ = this.pageSelected.asObservable();

  public themeUrl = '../assets/api/themes.json';

  constructor(private http: Http) {

  }

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

  getThemeData() {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    return this.http.get(this.themeUrl, options)
        .map(res => res.json())
        .catch((error: string) => 'Failed to load theme from json');
  }
}
