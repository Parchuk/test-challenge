import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user: User;
  isLoading: boolean = true;
  message = new Subject<string>();
  typeMessage: string;

  staticAlertClosed = false;
  serverMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message.subscribe((message) => (this.serverMessage = message));
    this.message.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
      if (this.typeMessage == 'success') {
        this.userService.redirect('/');
      }
    });

    let userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      this.isLoading = false;
    });
  }

  updateUser(updateUser: User) {
    this.isLoading = true;

    this.userService.updateUser(updateUser).subscribe(
      (data) => {
        this.user = {
          _id: '',
          name: '',
          surname: '',
          dateOfBirthday: '',
          phone: null,
          email: '',
          lastModified: '',
        };

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
