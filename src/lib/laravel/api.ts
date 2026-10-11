export const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchPage(slug: string) {
  const res = await fetch(`${LARAVEL_API_URL}/pages/${slug}`, { next: { revalidate: 10 } });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch page data');
  }
  return res.json();
}

export async function fetchGlobalAmenities() {
  const res = await fetch(`${LARAVEL_API_URL}/global-amenities`, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error('Failed to fetch amenities');
  }
  return res.json();
}

export async function fetchBungalows() {
  const res = await fetch(`${LARAVEL_API_URL}/bungalows`, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error('Failed to fetch bungalows');
  }
  return res.json();
}

export async function fetchBungalow(slug: string) {
  const res = await fetch(`${LARAVEL_API_URL}/bungalows/${slug}`, { next: { revalidate: 10 } });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch bungalow ${slug}`);
  }
  return res.json();
}

export async function fetchGalleryItems() {
  const res = await fetch(`${LARAVEL_API_URL}/gallery-items`, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error('Failed to fetch gallery items');
  }
  return res.json();
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/settings`, { next: { revalidate: 10 } });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}
