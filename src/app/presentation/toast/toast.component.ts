import { Component } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class ToastComponent {
  message!: string;
  type!: 'success' | 'error';
  duration: number = 3000;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(({ message, type, duration }) => {
      this.message = message;
      this.type = type;
      this.duration = duration ?? 3000;
      setTimeout(() => {
        this.message = '';
      }, this.duration);
    });
  }
}
