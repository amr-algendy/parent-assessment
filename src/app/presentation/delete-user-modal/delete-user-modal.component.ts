import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss',
})
export class DeleteUserModalComponent {
  @Input() user!: UserModel;
  @Output() closeModal = new EventEmitter<{ confirmDelete: boolean }>();

  submitted = false;

  onDelete() {
    this.submitted = true;
    this.closeModal.emit({ confirmDelete: true });
  }

  onCancel() {
    this.submitted = true;
    this.closeModal.emit({ confirmDelete: false });
  }
}
