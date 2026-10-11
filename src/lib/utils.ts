export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // Route all images through Laravel backend host
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cms.europeenchantedkohrong.com/public/api';
  const BASE_URL = API_URL.replace('/api', '');
  
  let cleanPath = path;
  // If uploaded via Filament (e.g. "abc.jpg" without folder prefix)
  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('images/') && !cleanPath.startsWith('storage/')) {
    cleanPath = `storage/${cleanPath}`;
  }

  return cleanPath.startsWith('/') ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/${cleanPath}`;
}
