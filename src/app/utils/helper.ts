import {
  PostKeys,
  postKeys,
  PostWithContentKey,
} from '../types/post.interface';

/**
 * Returns next content key.
 * For instance if current contentKey is title then this function will return userid.
 * @param {PostWithContentKey} post - User clicked post.
 * @returns {PostKeys} "id" | "title" | "userId" | "body"
 */
export const getNextContentKey = (post: PostWithContentKey): PostKeys => {
  const keys = Object.values(postKeys);
  const index = keys.findIndex((k) => k === post.contentKey);
  const nextIndex = index === keys.length - 1 ? 0 : index + 1;
  return keys[nextIndex];
};

/**
 * Returns computed content key based on current and previous post id.
 *
 * @param {PostWithContentKey} post - User clicked post.
 * @param {number} currentId - current post id.
 * @param {number} previousId - previous post id.
 * @returns {PostKeys}  "id" | "title" | "userId" | "body"
 */
export const computeContentKey = (
  post: PostWithContentKey,
  currentId: number,
  previousId: number
) => {
  return post.id === currentId
    ? getNextContentKey(post) // Set next contentKey for current post
    : post.id === previousId
    ? postKeys.title // Reset previous post to its default content
    : post.contentKey;
};
