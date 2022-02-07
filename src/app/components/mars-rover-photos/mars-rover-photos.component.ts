import { RoverPhoto } from './../../models/roverPhoto.model';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NasaService } from 'src/app/services/nasa.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mars-rover-photos',
  templateUrl: './mars-rover-photos.component.html',
  styleUrls: ['./mars-rover-photos.component.css']
})

/**
 * Mars Rover Photo's component
 */
export class MarsRoverPhotosComponent {

  /**
   * Array that contains all the photos and data.
   */
  roverPhotos: RoverPhoto[] = null;

  /**
   * Array that contains the photos and data that we show on the current page.
   */
  paginatedRoverPhotos: RoverPhoto[] = [];

  /**
   * Loading status
   */
  isLoading: boolean = false;

  /**
   * Data about the cameras
   */
  roverCameras: any = [
    {
      abbreviation: 'FHAZ',
      camera: 'Front Hazard Avoidance Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      abbreviation: 'RHAZ',
      camera: 'Rear Hazard Avoidance Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      abbreviation: 'MAST',
      camera: 'Mast Camera',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      abbreviation: 'CHEMCAM',
      camera: 'Chemistry and Camera Complex',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      abbreviation: 'MAHLI',
      camera: 'Mars Hand Lens Imager',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      abbreviation: 'MARDI',
      camera: 'Mars Descent Imager',
      curiosity: true,
      opportunity: false,
      spirit: false
    },
    {
      abbreviation: 'NAVCAM',
      camera: 'Navigation Camera',
      curiosity: true,
      opportunity: true,
      spirit: true
    },
    {
      abbreviation: 'PANCAM',
      camera: 'Panoramic Camera',
      curiosity: false,
      opportunity: true,
      spirit: true
    },
    {
      abbreviation: 'MINITES',
      camera: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      curiosity: false,
      opportunity: true,
      spirit: true
    },
  ];

  /**
   * Form for the filters
   */
  roverPhotosForm: FormGroup;

  /**
   * Current page of the paginator
   */
  currentPage: number = 0;

  /**
   * Total of pages
   */
  totalPages: number = 0;

  /**
   * The favorite filter selected
   */
  selectedFilter: string = '0';

  /**
   * Initialize the form
   *
   * @param _nasaService Nasa service.
   * @param _storageService Storage service.
   * @param fb Form builder.
   */
  constructor(private _nasaService: NasaService, private _storageService: StorageService, private fb: FormBuilder) {
    const actualDate = new Date();
    const date = `${actualDate.getFullYear()}-${("0" + (actualDate.getMonth() + 1)).slice(-2)}-${("0" + actualDate.getDate()).slice(-2)}`;
    this.roverPhotosForm = this.fb.group({
      earthDate: new FormControl(date),
      solDate: new FormControl(),
      rover: new FormControl('curiosity', Validators.required),
      camera: new FormControl('all',Validators.required)
    });
  }

  /**
   * Retrieves the Mars Rover photo's
   */
  getRoverPhotos(): void {
    this.roverPhotos = [];
    this.paginatedRoverPhotos = [];
    this.totalPages = 0;
    if(this.roverPhotosForm.invalid){
      return;
    }

    this.isLoading = true;

    this._nasaService.getRoverPhotos(this.roverPhotosForm.value).subscribe( (response: RoverPhoto[]) => {
      this.roverPhotos = response;
      this.totalPages =  Math.ceil(this.roverPhotos.length/25);
      this.paginate(1);
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });

  }

  /**
   * Method that triggers when a Rover is selected
   */
  onRoverChange(): void {
    this.camera?.setValue('all');
  }

  /**
   * Method that triggers when Sol date is enable
   */
  onSolDateChange(): void {
    if(this.solDate?.value){
      this.earthDate?.setValue(null);
      this.earthDate?.disable();
      return;
    }

    this.earthDate?.enable();
  }

  /**
   * Calculate and filter the elements to show on the current page
   *
   * @param pageNumber Page that we want to show.
   */
  paginate(pageNumber: number): void {
    if(pageNumber < 1 || pageNumber > this.totalPages){
      return;
    }

    this.currentPage = pageNumber;
    this.paginatedRoverPhotos = this.roverPhotos.slice((pageNumber - 1) * 25, pageNumber * 25);
  }

  /**
   * Method that store the filter into the local storage
   */
  saveFilterParams(): void {
    let filters = this._storageService.getItem('favoriteFilters');
    let filtersTemp;

    if(!filters){
      filtersTemp = {
        filters: []
      }
    }
    else {
      filtersTemp = JSON.parse(filters);
    }

    filtersTemp.filters.push(this.roverPhotosForm.value);

    this._storageService.setItem('favoriteFilters',JSON.stringify(filtersTemp));
  }

  /**
   * Method that get and parse the favorite filter's that are on the local storage
   */
  getCustomFilters(): any[] {
    let filters = this._storageService.getItem('favoriteFilters');
    if(filters){
      return JSON.parse(filters).filters;
    }

    return [];
  }

  /**
   * Method that triggers when a favorite filter is selected
   */
  onFavoriteFilterChange(): void {
    let filters = this.getCustomFilters();
    if(filters.length < 0 || this.selectedFilter === '-1'){
      return;
    }
    this.roverPhotosForm.patchValue(filters[this.selectedFilter]);
    this.onSolDateChange();
  }


  get rover(){
    return this.roverPhotosForm.get('rover');
  }

  get camera(){
    return this.roverPhotosForm.get('camera');
  }

  get earthDate(){
    return this.roverPhotosForm.get('earthDate');
  }

  get solDate(){
    return this.roverPhotosForm.get('solDate');
  }

}
