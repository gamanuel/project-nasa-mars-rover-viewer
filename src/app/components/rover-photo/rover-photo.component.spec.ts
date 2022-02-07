import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverPhotoComponent } from './rover-photo.component';

describe('RoverPhotoComponent', () => {
  let component: RoverPhotoComponent;
  let fixture: ComponentFixture<RoverPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoverPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
