export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cms.europeenchantedkohrong.com/public/api';
  const BASE_URL = API_URL.replace('/api', '');

  let cleanPath = path;

  // If path is a Filament storage upload (e.g. "storage/xyz.jpg")
  if (cleanPath.startsWith('storage/')) {
    const relativeStoragePath = cleanPath.replace(/^storage\//, '');
    return `${API_URL}/media/${relativeStoragePath}`;
  }

  // Bare filename uploaded via Filament (e.g. "xyz.jpg")
  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('images/')) {
    return `${API_URL}/media/${cleanPath}`;
  }

  return cleanPath.startsWith('/') ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/${cleanPath}`;
}
