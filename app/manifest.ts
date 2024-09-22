import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AIDA',
    short_name: 'AIDA',
    description: 'Digital Assistant for Government Query',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/aidaicon.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}