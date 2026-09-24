import './globals.css';
import ReduxProvider from '@/components/common/ReduxProvider';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Product Admin Dashboard',
  description: 'Manage products using Next.js App Router and DummyJSON API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-slate-50 text-slate-900 min-h-full flex flex-col font-sans">
        <ReduxProvider>
          <Toaster/>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
