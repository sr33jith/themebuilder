import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildernavComponent } from './buildernav.component';

describe('BuildernavComponent', () => {
  let component: BuildernavComponent;
  let fixture: ComponentFixture<BuildernavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildernavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
