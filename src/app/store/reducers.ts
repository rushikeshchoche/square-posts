import { createFeature, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { postActions } from './actions';
import { postKeys } from '../types/post.interface';
import { getNextContentKey } from '../utils/helper';

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

const postFeature = createFeature({
  name: 'post',
  reducer: createReducer(
    initialState,
    on(postActions.getPosts, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(postActions.getPostsSuccess, (state, action) => ({
      ...state,
      posts: action.posts.map((post) => ({
        ...post,
        contentKey: postKeys.title, // Set title as default content
      })),
      isLoading: false,
      error: null,
    })),
    on(postActions.getPostsFailure, (state) => ({
      ...state,
      isLoading: false,
      error: 'Something went wrong!!',
    })),
    on(postActions.toggleContent, (state, action) => ({
      ...state,
      posts: state.posts.map((post) => ({
        ...post,
        contentKey:
          post.id === action.id ? getNextContentKey(post) : postKeys.title, // Reset content to title
      })),
      activePost: state.posts.filter((post) => post.id === action.id)[0],
      isLoading: false,
      error: null,
    }))
  ),
});

export const {
  name: postFeatureKey,
  reducer: postReducer,
  selectIsLoading,
  selectPosts,
  selectActivePost,
  selectError,
} = postFeature;
