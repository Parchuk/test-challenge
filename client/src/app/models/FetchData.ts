import { User } from './User';

export class UsersListData {
  users: User[];
  currentPage: number;
  collectionSize: number;
}

export class DeletedUser {
  message: string;
}

export class UpdatedUser {
  data: User;
  message: string;
}

export class AddUser {
  data: User;
  message: string;
}
