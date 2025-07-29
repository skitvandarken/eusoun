import { Timestamp } from 'firebase/firestore';

export interface Album{
  id?: string;
  title: string;
  description?: string;
  coverUrl?: string;
  images?: string[];
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp
}
export interface AlbumCreateDTO {
  title: string;
  description: string;
  coverImageUrl: string;
  imageUrls: string[];
  isPublic: boolean;
  tags?: string[];
}
