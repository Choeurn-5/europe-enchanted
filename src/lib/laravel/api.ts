export const LARAVEL_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://cms.europeenchantedkohrong.com/public/api';

export async function fetchPage(slug: string) {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/pages/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.warn(`[API] Failed to fetch page '${slug}', status: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API] Network error fetching page '${slug}':`, error);
    return null;
  }
}

export async function fetchGlobalAmenities() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/global-amenities`, { next: { revalidate: 10 } });
    if (!res.ok) {
      console.warn(`[API] Failed to fetch amenities, status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn('[API] Network error fetching amenities:', error);
    return [];
  }
}

export async function fetchBungalows() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/bungalows`, { next: { revalidate: 10 } });
    if (!res.ok) {
      console.warn(`[API] Failed to fetch bungalows, status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn('[API] Network error fetching bungalows:', error);
    return [];
  }
}

export async function fetchBungalow(slug: string) {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/bungalows/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.warn(`[API] Failed to fetch bungalow '${slug}', status: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API] Network error fetching bungalow '${slug}':`, error);
    return null;
  }
}

export async function fetchGalleryItems() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/gallery-items`, { next: { revalidate: 10 } });
    if (!res.ok) {
      console.warn(`[API] Failed to fetch gallery items, status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn('[API] Network error fetching gallery items:', error);
    return [];
  }
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/settings`, { next: { revalidate: 10 } });
    if (!res.ok) return {};
    return await res.json();
  } catch (error) {
    console.warn('[API] Network error fetching settings:', error);
    return {};
  }
}
