import { Observable } from 'rxjs';

export interface AuthRepository {
  login(params: { email: string; password: string }): Observable<string>;
}
