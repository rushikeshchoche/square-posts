import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    GetPosts: emptyProps(),
    'Get posts success': props<{ posts: PostInterface[] }>(),
    'Get posts failure': emptyProps(),
    toggleContent: props<{ id: number }>(),
  },
});
