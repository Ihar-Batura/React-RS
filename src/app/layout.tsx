import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Star Trek</title>
        <meta name="description" content="Star Trek application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/star-trek-logo.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
