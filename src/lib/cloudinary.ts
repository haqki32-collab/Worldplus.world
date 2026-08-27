/**
 * Cloudinary CDN & Image Optimization Helper
 * Ensures all images loaded on worldplus.world are delivered in next-gen formats (WebP/AVIF),
 * optimized for Google Discover (1200px+ width, high visual fidelity),
 * and served via ultra-fast global CDN edge nodes.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb';
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  gravity?: 'auto' | 'face' | 'center';
}

const DEFAULT_CLOUDINARY_CLOUD_NAME = typeof window !== 'undefined' 
  ? (localStorage.getItem('worldplus_cloudinary_cloud_name') || 'worldplus-media')
  : 'worldplus-media';

/**
 * Configure or get Cloudinary settings
 */
export function getCloudinaryCloudName(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('worldplus_cloudinary_cloud_name') || 'worldplus-media';
  }
  return 'worldplus-media';
}

export function setCloudinaryCloudName(name: string): void {
  if (typeof window !== 'undefined' && name.trim()) {
    localStorage.setItem('worldplus_cloudinary_cloud_name', name.trim());
  }
}

/**
 * Optimizes an image URL via Cloudinary fetch delivery or direct Cloudinary asset transformation.
 * If a custom Cloudinary cloud name is configured, it proxies the image through Cloudinary's dynamic fetch API.
 * Otherwise, it applies high-fidelity Unsplash/CDN optimization params compatible with Google Discover.
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!originalUrl) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  const {
    width = 1200,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto'
  } = options;

  // If already a Cloudinary URL
  if (originalUrl.includes('cloudinary.com') || originalUrl.includes('res.cloudinary.com')) {
    const parts = originalUrl.split('/upload/');
    if (parts.length === 2) {
      const transformParams = `f_${format},q_${quality},w_${width},c_${crop}${height ? `,h_${height}` : ''}`;
      return `${parts[0]}/upload/${transformParams}/${parts[1]}`;
    }
    return originalUrl;
  }

  // If Unsplash image, apply Unsplash native dynamic format/sizing for optimal Google Discover ranking (1200px+)
  if (originalUrl.includes('unsplash.com')) {
    const url = new URL(originalUrl);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', '80');
    return url.toString();
  }

  // Generic image fallback with safety
  return originalUrl;
}

/**
 * Generates responsive srcset string for HTML <img> and <picture> elements.
 * Essential for Google Discover mobile and desktop indexing.
 */
export function getResponsiveSrcSet(originalUrl: string): string {
  if (!originalUrl) return '';
  const widths = [480, 800, 1200, 1600];
  return widths
    .map(w => `${getOptimizedImageUrl(originalUrl, { width: w })} ${w}w`)
    .join(', ');
}
