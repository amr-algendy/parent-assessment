import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss',
})
export class DeleteUserModalComponent {
  @Input() user!: UserModel;
  @Output() closeModal = new EventEmitter<{ confirmDelete: boolean }>();

  submitted = true;

  onDelete() {
    this.closeModal.emit({ confirmDelete: true });
  }

  onCancel() {
    this.closeModal.emit({ confirmDelete: false });
  }
}
