import { computeContentKey, getNextContentKey } from './helper';
import { PostWithContentKey, postKeys } from '../types/post.interface';

describe('Helper', () => {
  const post: PostWithContentKey = {
    id: 1,
    userId: 1,
    title: 'title test',
    body: 'body text',
    contentKey: postKeys.title,
  };

  describe('getNextContentKey', () => {
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

  describe('computeContentKey', () => {
    it('should return computed content key for current post', () => {
      const contentKey = computeContentKey(post, 1, 2);
      expect(contentKey).toEqual(postKeys.userId);
    });

    it('should return computed content key for previous post', () => {
      const contentKey = computeContentKey(
        {
          ...post,
          id: 2,
        },
        1,
        2
      );
      expect(contentKey).toEqual(postKeys.title);
    });

    it('should return exact same content key for other post', () => {
      const contentKey = computeContentKey(post, 3, 2);
      expect(contentKey).toEqual(postKeys.title);
    });
  });
});
