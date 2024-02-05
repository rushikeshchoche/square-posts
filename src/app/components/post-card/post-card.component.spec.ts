declare const expect: jest.Expect;

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { By } from '@angular/platform-browser';
import { postKeys } from '../../types/post.interface';
import { first } from 'rxjs';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default msg when no content is passed', () => {
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="post-card-error"]')
    );
    expect(postCard.nativeElement.textContent).toBe('Something went wrong!');
  });

  it('should render post content', () => {
    component.post = {
      id: 1,
      userId: 2,
      title: 'Test title',
      body: 'Test body',
      contentKey: postKeys.title,
    };

    fixture.detectChanges();
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="post-card-content"]')
    );
    expect(postCard.nativeElement.textContent).toBe(' Test title ');
  });

  it('should emit on post click', () => {
    component.post = {
      id: 1,
      userId: 2,
      title: 'Test title',
      body: 'Test body',
      contentKey: postKeys.title,
    };

    fixture.detectChanges();
    const postCard = fixture.debugElement.query(
      By.css('[data-testid="post-card-content"]')
    );
    let toggleContent: number | undefined;
    component.toggleEvent.pipe(first()).subscribe((id) => {
      toggleContent = id;
    });
    postCard.triggerEventHandler('click');
    expect(toggleContent).toBe(1);
  });
});
