export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export type PostsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Post[] }
  | { status: 'error'; message: string };