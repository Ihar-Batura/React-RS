import './[locale]/globals.scss';
import type { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Star Trek',
  description: 'GStar Trek application',
  icons: {
    icon: { url: '/star-trek-logo.svg', rel: 'icon' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
