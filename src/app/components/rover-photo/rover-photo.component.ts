import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rover-photo',
  templateUrl: './rover-photo.component.html',
  styleUrls: ['./rover-photo.component.css']
})
export class RoverPhotoComponent implements OnInit {

  @Input('photo') img_src: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
