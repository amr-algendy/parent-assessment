import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.scss',
})
export class NewUserModalComponent {
  userForm = new FormGroup({
    fullName: new FormControl(''),
    job: new FormControl(''),
  });

  submitted = false;

  @Output() confirmCreate = new EventEmitter<{
    fullName: string;
    job: string;
  }>();
  @Output() closeModal = new EventEmitter<void>();

  onConfirm() {
    const { fullName, job } = this.userForm.value;
    if (fullName && job) {
      this.confirmCreate.emit({ fullName, job });
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
