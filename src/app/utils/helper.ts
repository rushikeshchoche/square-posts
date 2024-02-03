import { postKeys, PostWithContentKey } from '../types/post.interface';

export const getNextContentKey = (post: PostWithContentKey) => {
  const keys = Object.values(postKeys);
  const index = keys.findIndex((k) => k === post.contentKey);
  const nextIndex = index === keys.length - 1 ? 0 : index + 1;
  return keys[nextIndex];
};
