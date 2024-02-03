import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  selectError,
  selectIsLoading,
  selectPosts,
} from '../../store/reducers';
import { Store } from '@ngrx/store';
import { postActions } from '../../store/actions';
import { PostCardComponent } from '../post-card/post-card.component';
import { Observable } from 'rxjs';
import { PostWithContentKey } from '../../types/post.interface';
import { CardSkeletonComponent } from '../card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent, CardSkeletonComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostWithContentKey[]>;
  emptyPosts = Array(100);

  constructor(private store: Store) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.posts$ = this.store.select(selectPosts);
  }

  ngOnInit(): void {
    this.store.dispatch(postActions.getPosts());
  }

  toggleContent(id: number) {
    this.store.dispatch(postActions.toggleContent({ id }));
  }
}
