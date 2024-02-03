import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { selectActivePost } from '../../store/reducers';
import { MemoizedSelector } from '@ngrx/store';
import { PostInterface } from '../../types/post.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let mockActivePostSelector: MemoizedSelector<
    Record<string, unknown>,
    PostInterface
  >;
  const initialState = {
    activePost: {
      id: -1,
      userId: -1,
      title: '',
      body: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    mockActivePostSelector = store.overrideSelector(
      selectActivePost,
      initialState.activePost
    );
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render posts title header', () => {
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="posts-title"]')
    );
    expect(postCard.nativeElement.textContent).toBe('POSTS');
  });

  it('should render default post text', () => {
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="active-post-id"]')
    );
    expect(postCard.nativeElement.textContent).toBe(' No post clicked! ');
  });

  it('should render active post', () => {
    mockActivePostSelector.setResult({
      id: 1,
      userId: 1,
      title: 'Title text',
      body: 'Body text',
    });

    store.refreshState();
    fixture.detectChanges();

    const postCard = fixture.debugElement.query(
      By.css('[data-testid="active-post-id"]')
    );
    expect(postCard.nativeElement.textContent).toBe(
      ' Current active post Id: 1 '
    );
  });
});
