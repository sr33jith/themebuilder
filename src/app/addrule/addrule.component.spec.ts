import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NAddruleComponent } from './addrule.component';

describe('NAddruleComponent', () => {
  let component: NAddruleComponent;
  let fixture: ComponentFixture<NAddruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NAddruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NAddruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
