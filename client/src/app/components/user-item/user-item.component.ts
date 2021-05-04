import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: '[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() i: number;

  @Output() refreshDataEvent = new EventEmitter();

  constructor() {}

  refreshData() {
    this.refreshDataEvent.emit();
  }

  ngOnInit(): void {}
}
