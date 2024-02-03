import { PostInterface, PostWithContentKey } from './post.interface';

export interface AppStateInterface {
  isLoading: boolean;
  posts: PostWithContentKey[];
  activePost: PostInterface;
  error: string | null;
}
