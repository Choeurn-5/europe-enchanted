export type ReviewSource = 'google' | 'tripadvisor' | 'booking' | 'fallback';

export type Review = {
  id: string;
  source: ReviewSource;
  sourceLabel: string;
  author: string;
  origin?: string;
  rating: number;
  text: string;
  publishedAt?: string;
  url: string;
};

export type ReviewsResponse = {
  reviews: Review[];
  providers: {
    google: boolean;
    tripadvisor: boolean;
    booking: boolean;
  };
};
