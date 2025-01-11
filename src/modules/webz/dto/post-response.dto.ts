export interface WebzPostsResponse {
  posts: Post[];
  totalResults: number;
  moreResultsAvailable: number;
  next: string;
  requestsLeft: number;
  warnings?: string;
}

export interface Post {
  thread: Thread;
  author: string;
  published: string;
  title: string;
  text: string;
}

export interface Thread {
  uuid: string;
  url: string;
  title: string;
  title_full: string;
  published: string;
}
