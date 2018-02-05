import { Component, OnInit, OnChanges } from '@angular/core';
import { BuilderService } from './../builder.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

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
  public themePageTitle = '';
  public ruleAddForm;
  public quilToolbar = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  };

  constructor(private builderService: BuilderService, private sanitizer: DomSanitizer,
  private formBuilder: FormBuilder) {
    this.builderServiceObj = this.builderService.pageSelected$.subscribe(
      page => {
        console.log(page);
        this.page = page;
        // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrls[page]);
        this.getThemeDataForDisplay();
        // this.contentDisplay = `Here we are for ` + page + `.`;
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

   getThemeDataForDisplay() {
     this.builderService.getThemeData().subscribe((resp: any) => {
          // console.log(resp);
          const themeJson = resp;
          for (const themeData of resp.themes) {
            for (const pageData of themeData.pages) {
              if (pageData.pageId === this.page) {
                console.log(pageData);
                this.themePageTitle = pageData.pageTitle;
                const pageLayout = pageData.layout;
                const sectionsForm = [];
                for (const section of pageData.sections) {
                  console.log(section);
                  const sectionData = {
                    'sectionClass': section.sectionClass
                  };
                  sectionsForm.push(sectionData);

                }
                // this.ruleAddForm = this.formBuilder.group({
                //   'themePageTitle': new FormControl(pageData.pageTitle, {
                //     validators: Validators.required,
                //     updateOn: 'change'
                //   }),
                //   // itemRows: this.formBuilder.array([this.initItemRows()]) // here
                // });
              }
            }
          }
          this.contentDisplay = resp._body;
        }, (error: string) => { console.log('error : ' + error);  });
   }

   initItemRows() {
    return this.formBuilder.group({
      // list all your form controls here, which belongs to your form array
      'ruleName': new FormControl(null, {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      'ruleNameDesc': new FormControl('', {
        updateOn: 'blur'
      }),
      // list all your form controls here, which belongs to your form array
      // itemWhenRows: this.formBuilder.array([this.initItemWhenRows()]),
      // itemThenRows: this.formBuilder.array([this.initItemThenRows()])
    }, { updateOn: 'submit' });
  }

  onEditorFocused(event) {
    // document.getElementsByClassName("ql-tooltip")[0].classList.contains('ql-hidden');
    return true;
  }

  invokeEditor(event) {
    console.log(event);
  }
}
