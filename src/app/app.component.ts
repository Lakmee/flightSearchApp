import { Component } from '@angular/core';
import { FlightSearchService } from './services/flight-search.service';
import { Observable } from 'rxjs';
import { Flight } from './entities/flight';
import { SearchQuery } from './components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public flights$: Observable<Flight[]>;
  public searchQuery: SearchQuery;

  constructor(public flightSearchService: FlightSearchService) {
  }


  onSearch(searchQuery: SearchQuery) {
    const {
      arrivalAirportCode,
      arrivalDate,
      departureAirportCode,
      departureDate
    } = searchQuery;
    this.searchQuery = searchQuery;
    this.flights$ = this.flightSearchService.getFlights(departureAirportCode, arrivalAirportCode, departureDate, arrivalDate);
  }

}
