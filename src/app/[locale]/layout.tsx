import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import ErrorBoundary from '../../shared/utils/error/ErrorBoundary';
import { Messages } from '../../shared/types/types';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages: Messages = (await import(`../../../messages/${locale}.json`))
    .default;

  return (
    <html lang={locale}>
      <head>
        <title>{locale === 'en' ? 'Star Trek' : 'Звездный путь'}</title>
        <meta name="description" content="Star Trek application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/star-trek-logo.svg" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
