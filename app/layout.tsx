import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radar Deportivo — Laboratorio de análisis estadístico',
  description: 'Investigación de líneas, tendencias y probabilidades deportivas con evidencia verificable. Plataforma de información; no recibe apuestas.',
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#091217' };

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="es"><body>{children}</body></html>;
}
