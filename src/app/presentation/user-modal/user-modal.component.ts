import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  @Input() editedUser!: UserModel;
  @Output() confirmEdit: EventEmitter<{ fullName: string; job: string }> =
    new EventEmitter();
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  submitted = false;
  userForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
  });

  ngOnChanges(): void {
    this.userForm.patchValue({
      fullName: `${this.editedUser.firstName} ${this.editedUser.lastName}`,
      job: this.editedUser.job || '',
    });
  }

  onConfirm(): void {
    const { fullName, job } = this.userForm.value;
    if (fullName && job) {
      this.submitted = true;
      this.confirmEdit.emit({ fullName, job });
    }
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
