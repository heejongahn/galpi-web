export interface BookPayload {
  isbn: string;
  title: string;
  contents?: string;
  author: string;
  publisher: string;
  linkUri: string;
  imageUri: string;
}

export interface BookPayloadFromKakao {
  isbn: string;
  title: string;
  authors: string[];
  contents: string;
  publisher: string;
  url: string;
  thumbnail: string;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  linkUri: string;
  imageUri: string;
}

export function parseBookPayloadFromKakao(
  payload: BookPayloadFromKakao
): BookPayload {
  const { isbn, title, authors, contents, publisher, url, thumbnail } = payload;
  console.log(payload);
  return {
    isbn,
    title,
    author: authors.join(', '),
    contents,
    publisher,
    linkUri: url,
    imageUri: thumbnail,
  };
}
