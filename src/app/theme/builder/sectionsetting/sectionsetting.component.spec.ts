import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsettingComponent } from './sectionsetting.component';

describe('SectionsettingComponent', () => {
  let component: SectionsettingComponent;
  let fixture: ComponentFixture<SectionsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
