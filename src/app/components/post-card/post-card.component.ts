import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PostWithContentKey, postKeys } from '../../types/post.interface';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post: PostWithContentKey = {
    contentKey: postKeys.title,
    body: '',
    id: -1,
    title: '',
    userId: -1,
  };

  @Output() toggleEvent = new EventEmitter<number>();

  onPostClick(id: number) {
    this.toggleEvent.emit(id);
  }
}
