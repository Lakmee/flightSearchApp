import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../entities/flight';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FlightSearchService {
  private readonly flightsApiServer = 'http://nmflightapi.azurewebsites.net/api/flight';

  constructor(private http: HttpClient) {
  }

  getFlights(departureAirportCode: string, arrivalAirportCode: string, departureDate: string, arrivalDate: string): Observable<Flight[]> {
    const params = '?DepartureAirportCode=' + departureAirportCode + '&ArrivalAirportCode=' + arrivalAirportCode + '&DepartureDate=' + departureDate + '&ArrivalDate=' + arrivalDate;
    return this.http.get<Flight[]>(this.flightsApiServer + params)
      .pipe(
        switchMap((flights: Flight[]) => {
          const sorted = flights.sort((a, b) => a.TotalAmount - b.TotalAmount);
          return of(sorted);
        })
      );

  }

}


