import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AddUserComponent } from './components/pages/addUser/add-user.component';
import { EditUserComponent } from './components/pages/editUser/edit-user.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import {
  NgbdModalConfirm,
  NgbdModalFocus,
} from './components/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    UserItemComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    HomeComponent,
    LoaderComponent,
    NgbdModalConfirm,
    NgbdModalFocus,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
