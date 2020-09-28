import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { SearchQuery } from '../search/search.component';
import { SelectItem } from '../../entities/select-item';

@Component({
  selector: 'app-flights-panel',
  templateUrl: './flights-panel.component.html',
  styleUrls: ['./flights-panel.component.scss']
})
export class FlightsPanelComponent implements OnInit {

  @Input() flights: Flight[];
  @Input() searchQuery: SearchQuery;
  filteredFlights: Flight[] = [];
  currentPage = 0;
  airlines: SelectItem[] = [];

  constructor() {
  }
 
  ngOnInit(): void {
    this.filteredFlights = this.flights;
    const uniqueArr = [...new Set(this.flights.map(data => data.AirlineName).sort())];
    this.airlines = [];
    for (const item of uniqueArr) {
      const id = item.trim().toLowerCase().replace(/\s/g, '-');
      this.airlines.push({ id, label: item });
    }
  }

  handlePaginateChange(page: number) {
    this.currentPage = page;
  }

  handleAirlineChange(items: SelectItem[]) {
    if (items.length > 0) {
      const labels = items.map(({ label }) => label);
      this.filteredFlights = this.flights.filter(({ AirlineName }) => labels.includes(AirlineName));
    } else {
      this.filteredFlights = this.flights;
    }
    this.currentPage = 0;
  }

}
