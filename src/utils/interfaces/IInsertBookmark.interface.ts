interface IInsertBookmark {
  bookmarkURL: string;
  tags: string[];
  isFavorite: boolean;
  collectionId: number;
  userId: string;
}

export default IInsertBookmark;
