declare const expect: jest.Expect;

import { of, throwError } from 'rxjs';
import { postEffect } from './effects';
import { postActions } from './actions';
import { PostService } from '../services/post.service';

describe('postEffect', () => {
  it('loads posts succeded', (done) => {
    const posts = [
      {
        id: 1,
        userId: 1,
        title: '',
        body: '',
      },
    ];
    const postsServiceMock = {
      getPosts: () => of(posts),
    } as PostService;
    const actionsMock$ = of(postActions.getPosts());

    postEffect(actionsMock$, postsServiceMock).subscribe((action) => {
      expect(action).toEqual(postActions.getPostsSuccess({ posts }));
      done();
    });
  });

  it('loads posts failed', (done) => {
    const postsServiceMock = {
      getPosts: () => throwError(() => new Error('error')),
    } as unknown as PostService;
    const actionsMock$ = of(postActions.getPosts());

    postEffect(actionsMock$, postsServiceMock).subscribe((action) => {
      expect(action).toEqual(postActions.getPostsFailure());
      done();
    });
  });
});
