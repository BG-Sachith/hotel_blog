import { Inter } from 'next/font/google';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import '@/components/layout/layout.css';
import '@/components/footer/footer.css';
import '@/components/swiper/swiper.css';
import '@/components/resopnsiveSwiper/small-swiper.css';
import Layout from './components/layout/Layout';
import SessionPrvdr from '@/provider/sessionProvdr/SessionPrvdr';
import ReduxProvider from '@/provider/redux/ReduxProvider';
import ThemeProvidr from '@/provider/themeProvdr/ThemeProvidr';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <SessionPrvdr>
            <ThemeProvidr>
              <Layout>{children}</Layout>
            </ThemeProvidr>
          </SessionPrvdr>
        </ReduxProvider>
      </body>
    </html>
  );
}
