import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarsRoverPhotosComponent } from './components/mars-rover-photos/mars-rover-photos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoverPhotoComponent } from './components/rover-photo/rover-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    MarsRoverPhotosComponent,
    RoverPhotoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
