import { Component } from '@angular/core';
import { selectActivePost } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostInterface } from '../../types/post.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activePost$: Observable<PostInterface>;

  constructor(private store: Store) {
    this.activePost$ = this.store.select(selectActivePost);
  }
}
