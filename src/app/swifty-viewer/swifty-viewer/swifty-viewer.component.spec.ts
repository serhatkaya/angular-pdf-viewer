import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftyViewerComponent } from './swifty-viewer.component';

describe('SwiftyViewerComponent', () => {
  let component: SwiftyViewerComponent;
  let fixture: ComponentFixture<SwiftyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftyViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiftyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
