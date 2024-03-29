import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">User deletion</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Are you sure you want to delete
          <span class="text-primary">{{ userName }}</span> user?</strong
        >
      </p>
      <p>
        All information associated to this user will be permanently deleted.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close(deleteUser(userId))"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalConfirm {
  @Input() userName: string;
  @Input() userId: string;

  @Output() refreshDataEvent = new EventEmitter();

  constructor(public modal: NgbActiveModal, private userService: UserService) {}

  refreshData() {
    this.refreshDataEvent.emit();
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe((data) => {
      this.refreshData();
    });
  }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
};

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class NgbdModalFocus {
  @Input() userName: string;
  @Input() userId: string;
  @Output() refreshDataEvent = new EventEmitter();

  constructor(private _modalService: NgbModal) {}

  refreshData() {
    this.refreshDataEvent.emit();
  }

  open(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.userName = this.userName;
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.refreshDataEvent.subscribe(() => {
      this.refreshData();
    });
  }
}
