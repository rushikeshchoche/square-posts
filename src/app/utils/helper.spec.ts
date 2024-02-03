import { getNextContentKey } from './helper';
import { PostWithContentKey, postKeys } from '../types/post.interface';

describe('Helper', () => {
  const post: PostWithContentKey = {
    id: 1,
    userId: 1,
    title: 'title test',
    body: 'body text',
    contentKey: postKeys.title,
  };

  it('should get next content key as userId', () => {
    const nextContentKey = getNextContentKey(post);
    expect(nextContentKey).toEqual(postKeys.userId);
  });

  it('should get next content key as title', () => {
    const nextContentKey = getNextContentKey({
      ...post,
      contentKey: postKeys.body,
    });
    expect(nextContentKey).toEqual(postKeys.title);
  });
});
