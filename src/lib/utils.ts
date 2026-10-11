export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // Route all images through Laravel backend host
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const BASE_URL = API_URL.replace('/api', '');
  
  return path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}
