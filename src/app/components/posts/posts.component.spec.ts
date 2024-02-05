declare const expect: jest.Expect;

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { PostWithContentKey, postKeys } from '../../types/post.interface';
import {
  selectError,
  selectIsLoading,
  selectPosts,
} from '../../store/reducers';
import { By } from '@angular/platform-browser';
import { AppStateInterface } from '../../types/appState.interface';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: MockStore;
  let mockPostsSelector: MemoizedSelector<
    Record<string, unknown>,
    PostWithContentKey[]
  >;
  let mockIsLoadingSelector: MemoizedSelector<Record<string, unknown>, boolean>;
  let mockErrorSelector: MemoizedSelector<
    Record<string, unknown>,
    string | null
  >;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    mockPostsSelector = store.overrideSelector(selectPosts, initialState.posts);
    mockIsLoadingSelector = store.overrideSelector(
      selectIsLoading,
      initialState.isLoading
    );
    mockErrorSelector = store.overrideSelector(selectError, initialState.error);
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card skeleton component while loading', () => {
    mockIsLoadingSelector.setResult(true);

    store.refreshState();
    fixture.detectChanges();
    const cardSkeleton = fixture.debugElement.query(
      By.css('[data-testid="card-skeleton"]')
    );
    expect(cardSkeleton.nativeElement).toBeTruthy();
  });

  it('should show error msg incase of error', () => {
    mockErrorSelector.setResult('Something went wrong!');

    store.refreshState();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('[data-testid="error"]'));
    expect(error.nativeElement.textContent).toBe('Something went wrong!');
  });

  it('should render post card component', () => {
    mockPostsSelector.setResult([
      {
        id: 1,
        userId: 1,
        title: 'Title text',
        body: 'Body text',
        contentKey: postKeys.title,
      },
    ]);

    store.refreshState();
    fixture.detectChanges();
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="post-card"]')
    );
    expect(postCard.nativeElement).toBeTruthy();
  });
});
