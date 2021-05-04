import { Component, OnInit } from '@angular/core';
import { FilterNames } from '../../../models/FilterNames';
import { UrlParams } from '../../../models/UrlParams';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  collectionSize: number;
  urlParams: UrlParams;
  filterNames: FilterNames;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setUrlParamsToState();
    this.getUsersList();
  }

  pageChange(currentPage: number) {
    this.isLoading = true;

    this.setUrlParamsToState();
    const newUrlParams = this.getThisUrlParams();
    newUrlParams.page = currentPage;

    this.userService.setParamsToUrl(newUrlParams);

    this.userService.getUsers(newUrlParams).subscribe((data) => {
      this.users = data.users;
      this.collectionSize = data.collectionSize;

      this.isLoading = false;
    });
  }

  filterUsers(event: any): void {
    this.isLoading = true;

    let urlFilterName = this.urlParams.filterName;
    switch (event.target.innerText) {
      case 'Name':
        urlFilterName = 'name';
        break;
      case 'Surname':
        urlFilterName = 'surname';
        break;
      case 'Date of birthday':
        urlFilterName = 'dateOfBirthday';
        break;
      case 'Phone':
        urlFilterName = 'phone';
        break;
      case 'Email':
        urlFilterName = 'email';
        break;
      case 'Last modified':
        urlFilterName = 'lastModified';
        break;
    }

    const newfilterNames = {
      ...this.resetFilterNames(),
    };

    if (this.filterNames[urlFilterName] == 0) {
      newfilterNames[urlFilterName] = -1;
    } else if (this.filterNames[urlFilterName] == -1) {
      newfilterNames[urlFilterName] = 1;
    } else {
      newfilterNames[urlFilterName] = 0;
    }

    this.filterNames = newfilterNames;

    const newUrlParams: UrlParams = {
      limit: this.urlParams.limit,
      filterName: urlFilterName,
      filterType: this.filterNames[urlFilterName],
      page: 1,
    };

    this.userService.setParamsToUrl(newUrlParams);

    this.userService.getUsers(newUrlParams).subscribe((data) => {
      this.users = data.users;
      this.collectionSize = data.collectionSize;
      this.urlParams.page = 1;

      this.isLoading = false;
    });
  }

  setCssStyle(filterName: string): any {
    return {
      'hover-filter-a-z': this.filterNames[filterName] === -1,
      'hover-filter-z-a': this.filterNames[filterName] === 1,
    };
  }

  getUsersList(): void {
    this.isLoading = true;

    const newfilterNames = {
      ...this.resetFilterNames(),
    };

    newfilterNames[this.urlParams.filterName] = this.urlParams.filterType;

    this.filterNames = newfilterNames;

    this.userService.getUsers(this.urlParams).subscribe((data) => {
      this.users = data.users;
      this.collectionSize = data.collectionSize;

      this.isLoading = false;
    });
  }

  setUrlParamsToState(): void {
    const newUrlParams: UrlParams = {
      limit: +this.userService.getParamsFromUrl().limit || 10,
      page: +this.userService.getParamsFromUrl().page || 1,
      filterType: +this.userService.getParamsFromUrl().filterType || 0,
      filterName: this.userService.getParamsFromUrl().filterName || '',
    };

    this.urlParams = newUrlParams;
  }

  getThisUrlParams(): UrlParams {
    return {
      limit: this.urlParams.limit,
      page: this.urlParams.page,
      filterType: this.urlParams.filterType,
      filterName: this.urlParams.filterName,
    };
  }
  resetFilterNames(): FilterNames {
    return {
      name: 0,
      surname: 0,
      dateOfBirthday: 0,
      phone: 0,
      email: 0,
      lastModified: 0,
    };
  }
}
