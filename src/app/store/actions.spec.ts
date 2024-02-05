declare const expect: jest.Expect;

import { PostInterface } from '../types/post.interface';
import { postActions } from './actions';

describe('PostsActions', () => {
  describe('GetBooks', () => {
    it('should create an action to get posts', () => {
      const expectedAction = {
        type: postActions.getPosts.type,
      };
      const action = postActions.getPosts();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('GetPostsSuccess', () => {
    const posts: PostInterface[] = [
      {
        id: 1,
        userId: 1,
        title: '',
        body: '',
      },
    ];
    it('should create an action to get posts success', () => {
      const expectedAction = {
        type: postActions.getPostsSuccess.type,
        posts,
      };
      const action = postActions.getPostsSuccess({
        posts,
      });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('GetPostsFailure', () => {
    it('should create an action to get posts failure', () => {
      const expectedAction = {
        type: postActions.getPostsFailure.type,
      };
      const action = postActions.getPostsFailure();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('ToggleContent', () => {
    it('should create an action to toggle content', () => {
      const expectedAction = {
        type: postActions.toggleContent.type,
        id: 1,
      };
      const action = postActions.toggleContent({ id: 1 });
      expect(action).toEqual(expectedAction);
    });
  });
});
