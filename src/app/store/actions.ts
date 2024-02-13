import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    GetPosts: emptyProps(),
    GetPostsSuccess: props<{ posts: PostInterface[] }>(),
    GetPostsFailure: emptyProps(),
    toggleContent: props<{ id: number }>(),
  },
});
