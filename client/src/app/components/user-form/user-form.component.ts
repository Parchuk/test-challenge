import { Output, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() submitUserChangesEvent = new EventEmitter<User>();
  id: string;
  name: string = '';
  surname: string = '';
  dateOfBirthday: string = '';
  phone: number | null = null;
  email: string = '';
  userForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.id = this.user?._id || '';
    this.name = this.user?.name || '';
    this.surname = this.user?.surname || '';
    this.dateOfBirthday = this.user?.dateOfBirthday || '';
    this.phone = this.user?.phone || null;
    this.email = this.user?.email || '';

    this.userForm = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      surname: new FormControl(this.surname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      dateOfBirthday: new FormControl(this.dateOfBirthday, [
        Validators.required,
      ]),
      phone: new FormControl(this.phone, [
        Validators.required,
        Validators.pattern(/^0(\d{9})$/),
      ]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  submitData(e: any): void {
    e.preventDefault();

    if (this.checkValidationFields()) {
      const updatedUser = {
        _id: this.id,
        name: this.name,
        surname: this.surname,
        dateOfBirthday: this.dateOfBirthday,
        phone: this.phone,
        email: this.email,
        lastModified: new Date().toString(),
      };

      this.submitUserChangesEvent.emit(updatedUser);

      this.clearFields();
    }
  }

  checkValidationFields() {
    if (
      this.userName.valid &&
      this.userSurname.valid &&
      this.userDateOfBirthday.valid &&
      this.userPhone.valid &&
      this.userEmail.valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearFields() {
    this.name = '';
    this.surname = '';
    this.dateOfBirthday = '';
    this.phone = null;
    this.email = '';
  }

  get userName() {
    return this.userForm.get('name');
  }
  get userSurname() {
    return this.userForm.get('surname');
  }
  get userDateOfBirthday() {
    return this.userForm.get('dateOfBirthday');
  }
  get userPhone() {
    return this.userForm.get('phone');
  }
  get userEmail() {
    return this.userForm.get('email');
  }
}
