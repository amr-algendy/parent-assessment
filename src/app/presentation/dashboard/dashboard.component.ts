import { Component } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';
import { GetUsersUsecase } from '../../core/usecases/user/get-users.usecase';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UpdateUserUsecase } from '../../core/usecases/user/update-user.usecase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, UserModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: UserModel[] = [];
  editedUserIndex = -1;

  private lastLoadedPage = 0;
  private maxPages = 1;

  protected loading = false;

  constructor(
    private getUsersUsecase: GetUsersUsecase,
    private updateUserUsecase: UpdateUserUsecase
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
            // this.loading = false;
          })
        )
        .subscribe((response) => {
          this.lastLoadedPage += 1;
          this.users = [...this.users, ...response.users];
        });
    }
  }

  editUser(index: number): void {
    this.editedUserIndex = index;
  }
  onCloseModal() {
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
}
