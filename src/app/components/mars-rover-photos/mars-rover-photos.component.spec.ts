import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsRoverPhotosComponent } from './mars-rover-photos.component';

describe('MarsRoverPhotosComponent', () => {
  let component: MarsRoverPhotosComponent;
  let fixture: ComponentFixture<MarsRoverPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarsRoverPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarsRoverPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
