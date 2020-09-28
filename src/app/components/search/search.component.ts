import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightSearchService } from '../../services/flight-search.service';
import { Flight } from '../../entities/flight';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export interface SearchQuery {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDate: string;
  arrivalDate: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<SearchQuery> = new EventEmitter<SearchQuery>();
  public flightData: Flight[];
  public searchForm: FormGroup;
  dateConfig = {
    min: this.formatDate(new Date()),
    max: '2022-09-25',
    disableKeypress: true,
    format: 'YYYY-MM-DD'
  };
  public isSubmitted = false;

  constructor(private flightApi: FlightSearchService, private fb: FormBuilder) {
    const pattern = /^[a-z0-9]+$/i;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.searchForm = this.fb.group({
      departureAirportCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(pattern)]],
      arrivalAirportCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(pattern)]],
      departureDate: [this.formatDate(today), [Validators.required]],
      arrivalDate: [this.formatDate(tomorrow), [Validators.required]],
    }, {
      validators: Validators.compose([this.dateCompareValidator])
    });
    console.log(this.searchForm);
  }

  ngOnInit(): void {
  }

  dateCompareValidator(group: AbstractControl): ValidationErrors | null {
    const departureDate = group.get('departureDate');
    const arrivalDate = group.get('arrivalDate');
    if (Date.parse(departureDate.value) > Date.parse(arrivalDate.value)) {
      return { message: 'Arrival date should be grater than departure date.' };
    } else {
      return null;
    }
  }

  formatDate(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value);
    }
  }

  onReset() {
    this.searchForm.reset();
  }

  getCodeErrors(validationErrors: ValidationErrors): string {
    if (validationErrors.required) {
      return 'Please enter airport code.';
    } else if (validationErrors.minlength || validationErrors.maxlength) {
      return 'Airport code requires 3 characters.';
    } else if (validationErrors.pattern) {
      return 'Airport code contains only letters and numbers.';
    }
  }
}
