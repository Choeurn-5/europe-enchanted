import { NextResponse } from 'next/server';
import type { Review, ReviewsResponse } from '@/lib/reviews/types';

export const revalidate = 3600;

const fallbackLinks = {
  google: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? '#',
  tripadvisor: process.env.NEXT_PUBLIC_TRIPADVISOR_REVIEW_URL ?? '#',
  booking: process.env.NEXT_PUBLIC_BOOKING_REVIEW_URL ?? '#',
};

type GoogleReview = {
  reviewId?: string;
  reviewer?: { displayName?: string };
  starRating?: string;
  comment?: string;
  createTime?: string;
};

type GoogleReviewsResponse = {
  reviews?: GoogleReview[];
};

type TripadvisorReview = {
  id?: string | number;
  user?: { username?: string; location?: string };
  author?: string;
  rating?: number | string;
  rating_value?: number | string;
  text?: string;
  summary?: string;
  published_date?: string;
  date?: string;
};

type TripadvisorReviewsResponse = {
  reviews?: TripadvisorReview[];
  data?: TripadvisorReview[];
};

async function fetchGoogleReviews(): Promise<Review[]> {
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;
  const accessToken = process.env.GOOGLE_BUSINESS_ACCESS_TOKEN;

  if (!accountId || !locationId || !accessToken) return [];

  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=10`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Reviews API returned ${response.status}`);
  }

  const data = (await response.json()) as GoogleReviewsResponse;

  return (data.reviews ?? []).map((review): Review => ({
    id: `google-${review.reviewId}`,
    source: 'google',
    sourceLabel: 'Google Reviews',
    author: review.reviewer?.displayName ?? 'Google guest',
    rating: googleRatingToNumber(review.starRating),
    text: review.comment ?? '',
    publishedAt: review.createTime,
    url: fallbackLinks.google,
  }));
}

function googleRatingToNumber(rating?: string) {
  const ratings: Record<string, number> = {
    FIVE: 5,
    FOUR: 4,
    THREE: 3,
    TWO: 2,
    ONE: 1,
  };

  return ratings[rating ?? ''] ?? 5;
}

async function fetchTripadvisorReviews(): Promise<Review[]> {
  const apiKey = process.env.TRIPADVISOR_API_KEY;
  const endpoint = process.env.TRIPADVISOR_REVIEWS_ENDPOINT;

  // Tripadvisor requires approved Content API access. Keep the endpoint configurable
  // because the exact endpoint depends on the approved API product and location ID.
  if (!apiKey || !endpoint) return [];

  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'X-Tripadvisor-API-Key': apiKey,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Tripadvisor API returned ${response.status}`);
  }

  const data = (await response.json()) as TripadvisorReviewsResponse;
  const rows = data.reviews ?? data.data ?? [];

  return rows.map((review, index): Review => ({
    id: `tripadvisor-${review.id ?? index}`,
    source: 'tripadvisor',
    sourceLabel: 'Tripadvisor',
    author: review.user?.username ?? review.author ?? 'Tripadvisor traveler',
    origin: review.user?.location,
    rating: Number(review.rating ?? review.rating_value ?? 5),
    text: review.text ?? review.summary ?? '',
    publishedAt: review.published_date ?? review.date,
    url: fallbackLinks.tripadvisor,
  }));
}

export async function GET() {
  const [googleResult, tripadvisorResult] = await Promise.allSettled([
    fetchGoogleReviews(),
    fetchTripadvisorReviews(),
  ]);

  const googleReviews = googleResult.status === 'fulfilled' ? googleResult.value : [];
  const tripadvisorReviews =
    tripadvisorResult.status === 'fulfilled' ? tripadvisorResult.value : [];

  const payload: ReviewsResponse = {
    reviews: [...googleReviews, ...tripadvisorReviews].filter((review) => review.text),
    providers: {
      google: googleReviews.length > 0,
      tripadvisor: tripadvisorReviews.length > 0,
      // Booking.com API reviews are restricted to internal use and should not be
      // rendered publicly. Keep Booking.com as a link in the UI instead.
      booking: false,
    },
  };

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
