import { Component } from '@angular/core';
import { NewUserModel, UserModel } from '../../core/domain/user.model';
import { GetUsersUsecase } from '../../core/usecases/user/get-users.usecase';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UpdateUserUsecase } from '../../core/usecases/user/update-user.usecase';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { DeleteUserUsecase } from '../../core/usecases/user/delete-user.usecase';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { CreateUserUsecase } from '../../core/usecases/user/create-user.usecase';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    UserModalComponent,
    DeleteUserModalComponent,
    NewUserModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: UserModel[] = [];

  protected editedUserIndex = -1;
  protected userIndexToDelete = -1;
  protected creatingNewUser = false;

  protected lastLoadedPage = 0;
  protected maxPages = 1;

  protected loading = false;

  protected readonly placeholderAvatar = 'assets/images/avatar-placeholder.png';

  constructor(
    private getUsersUsecase: GetUsersUsecase,
    private updateUserUsecase: UpdateUserUsecase,
    private deleteUserUsecase: DeleteUserUsecase,
    private createUserUsecase: CreateUserUsecase,
    private toastService: ToastService
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
        this.toastService.show('User updated successfully!', 'success');
      },
      error: () => {
        this.editedUserIndex = -1;
        this.toastService.show('An error occurred while updating!', 'error');
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
          this.toastService.show('User deleted successfully!', 'success');
          this.userIndexToDelete = -1;
        },
        error: () => {
          this.toastService.show('An error occurred while deleting!', 'error');
          this.userIndexToDelete = -1;
        },
      });
    } else {
      this.userIndexToDelete = -1;
    }
  }

  onCreateNewUser(param: { fullName: string; job: string }): void {
    const newUser: NewUserModel = {
      email: '',
      firstName: param.fullName.split(' ')[0],
      lastName: param.fullName.replace(/^.+\s/, ''),
      avatar: '',
      job: param.job,
    };
    this.createUserUsecase.execute(newUser).subscribe({
      next: (user) => {
        this.users = [user, ...this.users];
        this.toastService.show('User created successfully!', 'success');
        this.creatingNewUser = false;
      },
      error: () => {
        this.toastService.show('An error occurred while creating!', 'error');
        this.creatingNewUser = false;
      },
    });
  }
}
