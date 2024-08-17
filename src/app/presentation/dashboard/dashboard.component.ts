import { Component } from '@angular/core';
import { UserModel } from '../../core/domain/user.model';
import { GetUsersUsecase } from '../../core/usecases/user/get-users.usecase';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: UserModel[] = [];
  selectedUserData: UserModel = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  };

  private lastLoadedPage = 0;
  private maxPages = 1;

  protected loading = false;

  constructor(private getUsersUsecase: GetUsersUsecase) {}

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
}
