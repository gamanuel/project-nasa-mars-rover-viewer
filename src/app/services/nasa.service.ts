import { RoverPhotoRequest } from './../models/roverPhotoRequest.model';
import { RoverPhoto } from './../models/roverPhoto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Service that takes care of all the request to the NASA api.
 */
export class NasaService {

  constructor(private http: HttpClient) { }

  /**
   * Returns an array on objects that contains photos and information about it
   *
   * @param roverRequest Object with the filters to apply.
   */
  getRoverPhotos(roverRequest: RoverPhotoRequest): Observable<RoverPhoto[]>{
    let url = new URL(`${environment.nasaApiUrl}/rovers/${roverRequest.rover}/photos`);
    url.searchParams.append('api_key',environment.nasaApiKey);

    if(roverRequest.solDate){
      url.searchParams.append('sol',roverRequest.solDate);
    }
    else {
      url.searchParams.append('earth_date',roverRequest.earthDate);
    }

    if(roverRequest.camera !== 'all'){
      url.searchParams.append('camera',roverRequest.camera);
    }

    return this.http.get(url.toString()).pipe(
      map((data: any) => {
        return data['photos'];
      })
    )
  }
}
