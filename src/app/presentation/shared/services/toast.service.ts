import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new Subject<{
    message: string;
    type: 'success' | 'error';
    duration?: number;
  }>();
  toasts$ = this._toasts.asObservable();

  show(message: string, type: 'success' | 'error', duration?: number) {
    this._toasts.next({ message, type, duration });
  }
}
