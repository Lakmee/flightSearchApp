import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from '../../entities/select-item';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input() title: string;
  @Input() items: SelectItem[] = [];
  @Output() selectChange = new EventEmitter<SelectItem[]>();
  selectedList: SelectItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  handleChange(selected: SelectItem, event) {
    if (event.target.checked) {
      this.selectedList.push(selected);
    } else {
      this.selectedList = this.selectedList.filter((item) => item.id !== selected.id);
    }
    this.selectChange.emit(this.selectedList);
  }

}
