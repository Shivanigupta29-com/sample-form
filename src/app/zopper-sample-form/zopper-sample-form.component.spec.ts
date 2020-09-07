import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZopperSampleFormComponent } from './zopper-sample-form.component';

describe('ZopperSampleFormComponent', () => {
  let component: ZopperSampleFormComponent;
  let fixture: ComponentFixture<ZopperSampleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZopperSampleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZopperSampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
