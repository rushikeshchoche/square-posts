export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithContentKey extends PostInterface {
  contentKey: PostKeys;
}

export const postKeys = {
  title: 'title',
  userId: 'userId',
  id: 'id',
  body: 'body',
} as const;

export type PostKeys = (typeof postKeys)[keyof typeof postKeys];
