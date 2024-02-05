declare const expect: jest.Expect;

import { AppStateInterface } from '../types/appState.interface';
import { PostWithContentKey, postKeys } from '../types/post.interface';
import { postActions } from './actions';
import { postReducer } from './reducers';

describe('BooksReducers', () => {
  const initialState: AppStateInterface = {
    isLoading: false,
    posts: [],
    activePost: {
      id: -1,
      userId: -1,
      title: '',
      body: '',
    },
    error: null,
  };

  const mockPosts: PostWithContentKey[] = [
    {
      id: 1,
      userId: 1,
      title: 'Title text 1',
      body: 'Body test 1',
      contentKey: postKeys.title,
    },
    {
      id: 2,
      userId: 1,
      title: 'Title text 2',
      body: 'Body test 2',
      contentKey: postKeys.title,
    },
  ];

  it('should change state when getPosts', () => {
    const result = postReducer(initialState, postActions.getPosts());

    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should change state when getPostsSuccess', () => {
    const result = postReducer(
      initialState,
      postActions.getPostsSuccess({
        posts: mockPosts,
      })
    );
    expect(result).toEqual({
      ...initialState,
      posts: mockPosts,
      isLoading: false,
      error: null,
    });
  });

  it('should change state when getPostsFailure', () => {
    const result = postReducer(initialState, postActions.getPostsFailure());
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Something went wrong!!',
    });
  });

  it('should change state when toggleContent', () => {
    const id = 1;
    const result = postReducer(
      {
        ...initialState,
        posts: mockPosts,
        activePost: mockPosts[0],
      },
      postActions.toggleContent({ id })
    );
    expect(result).toEqual({
      ...initialState,
      posts: mockPosts.map((post) => ({
        ...post,
        contentKey: post.id === id ? postKeys.userId : postKeys.title,
      })),
      activePost: mockPosts[0],
      isLoading: false,
      error: null,
    });
  });
});
