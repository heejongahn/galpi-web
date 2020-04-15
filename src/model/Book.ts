import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface BookPayload {
  isbn: string;
  title: string;
  authors?: string[];
  author: string;
  publisher: string;
  linkUri: string;
  imageUri: string;
}

@Entity()
export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  linkUri: string;
  imageUri: string;
}
