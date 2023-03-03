interface IBookmark {
  bookmarkId: number;
  bookmarkURL: string;
  tags: string[];
  isFavorite: boolean;
  collectionId: number;
}

export default IBookmark;
