import { Component } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';
import { GetUsersUsecase } from '../../core/usecases/user/get-users.usecase';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UpdateUserUsecase } from '../../core/usecases/user/update-user.usecase';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { DeleteUserUsecase } from '../../core/usecases/user/delete-user.usecase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, UserModalComponent, DeleteUserModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: UserModel[] = [];

  protected editedUserIndex = -1;

  protected userIndexToDelete = -1;

  protected lastLoadedPage = 0;
  protected maxPages = 1;

  protected loading = false;

  constructor(
    private getUsersUsecase: GetUsersUsecase,
    private updateUserUsecase: UpdateUserUsecase,
    private deleteUserUsecase: DeleteUserUsecase
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    if (this.lastLoadedPage < this.maxPages) {
      this.loading = true;
      this.getUsersUsecase
        .execute(this.lastLoadedPage + 1)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((response) => {
          this.lastLoadedPage += 1;
          this.maxPages = response.totalPages;
          this.users = [...this.users, ...response.users];
        });
    }
  }

  editUser(index: number): void {
    this.editedUserIndex = index;
  }
  onCloseEditModal() {
    this.editedUserIndex = -1;
  }
  onConfirmEdit(data: { fullName: string; job: string }) {
    const { fullName, job } = data;

    const editedUser = {
      ...this.users[this.editedUserIndex],
      firstName: fullName.split(' ')[0],
      lastName: fullName.replace(/^.+\s/, ''),
      job,
    };
    this.updateUserUsecase.execute(editedUser).subscribe({
      next: () => {
        this.users[this.editedUserIndex] = editedUser;
        this.editedUserIndex = -1;
      },
      error: () => {
        this.editedUserIndex = -1;
      },
    });
  }
  deleteUser(index: number): void {
    this.userIndexToDelete = index;
  }

  onCloseDeleteModal(event: { confirmDelete: boolean }): void {
    const { confirmDelete } = event;

    if (confirmDelete) {
      const userIdToDelete = this.users[this.userIndexToDelete].id;
      this.deleteUserUsecase.execute(userIdToDelete).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== userIdToDelete);
          this.userIndexToDelete = -1;
        },
        error: () => {
          this.userIndexToDelete = -1;
        },
      });
    } else {
      this.userIndexToDelete = -1;
    }
  }
}
