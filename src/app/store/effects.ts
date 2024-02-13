import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../services/post.service';
import { postActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostInterface } from '../types/post.interface';

export const postEffect = createEffect(
  (actions$ = inject(Actions), postService = inject(PostService)) => {
    return actions$.pipe(
      ofType(postActions.getPosts),
      switchMap(() => {
        return postService.getPosts().pipe(
          map((posts: PostInterface[]) =>
            postActions.getPostsSuccess({ posts })
          ),
          catchError(() => of(postActions.getPostsFailure()))
        );
      })
    );
  },
  { functional: true }
);
