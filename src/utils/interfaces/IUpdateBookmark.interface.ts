interface IUpdateBookmark {
  bookmarkURL: string;
  tags: string[];
  bookmarkId: number;
  collectionId: number;
  isFavorite: boolean;
}

export default IUpdateBookmark;
