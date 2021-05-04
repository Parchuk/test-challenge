import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: User;
  isLoading: boolean = false;
  message = new Subject<string>();
  typeMessage: string;

  staticAlertClosed = false;
  serverMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.message.subscribe((message) => (this.serverMessage = message));
    this.message.pipe(debounceTime(1000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  addUser(newUser: User) {
    this.isLoading = true;

    this.userService.addUser(newUser).subscribe(
      (data) => {
        this.isLoading = false;

        this.typeMessage = 'success';
        this.message.next(data.message);
      },
      (error) => {
        this.isLoading = false;

        this.typeMessage = 'danger';
        this.message.next(error.error.message);
      }
    );
  }
}
