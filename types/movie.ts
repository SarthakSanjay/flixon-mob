export interface MovieImage {
  thumbnailUrl: string;
  screenshots: string[];
  poster: string;
}

export interface Movie {
  _id: string;
  name: string;
  description: string;
  image: MovieImage;
  genre: string[];
  releasedOn: number;
  duration: number;
  rating: number;
  cast: string[];
  director: string;
  isFeatured: boolean;
  tags: string[];
  availablity: string[]; // Note: "availablity" is misspelled in the original data
  ageRating: string;
  views: number;
  audioLanguages: string[];
  subtitleLanguages: string[];
  addedOn: string;
}
