import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

interface PublicLayoutProps {
  children: ReactNode;
  params: {locale: string};
}

export default async function PublicLayout({children}: PublicLayoutProps) {
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
