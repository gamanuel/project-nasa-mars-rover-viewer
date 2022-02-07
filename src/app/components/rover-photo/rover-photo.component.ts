import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rover-photo',
  templateUrl: './rover-photo.component.html',
  styleUrls: ['./rover-photo.component.css']
})
export class RoverPhotoComponent {

  @Input() photo: string = '';

  constructor() { }
}
