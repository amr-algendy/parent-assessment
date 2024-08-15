import { Injectable } from '@angular/core';
import { AuthRepository } from '../../../core/repositories/auth.repository';
import { AuthApisService } from './auth-apis.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthImplementationRepository implements AuthRepository {
  constructor(private authApisService: AuthApisService) {}

  login(params: { email: string; password: string }): Observable<string> {
    return this.authApisService.login(params).pipe(map(({ token }) => token));
  }
}
