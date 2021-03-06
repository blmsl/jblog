/**
 * An interface which can be used by a class to encapsulate a journal post.
 */
export interface PostData {
  /**
   * The post's unique identifier.
   */
  postId: number;

  /**
   * The post's date, represented as a timestamp.
   */
  date: number;

  /**
   * The post title
   */
  title: string;

  /**
   * The post's content
   */
  content: string;

  /**
   * Tags associated with the post
   */
  tags: string[];
}

/**
 * An interface which can be used by a class to encapsulate a collection of
 * journal posts, and the pagination details.
 */
export interface PostDataWrapper {
  /**
   * The collection of posts
   */
  posts: PostData[];

  /**
   * The total number of pages with the settings defined in the API request
   */
  totalPages: number;
}
