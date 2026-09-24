import './globals.css';
import ReduxProvider from '@/components/common/ReduxProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Product Admin Dashboard',
  description: 'Manage products using Next.js App Router and DummyJSON API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-slate-50 text-slate-900 font-sans">
        <ReduxProvider>
          <Toaster position="top-center" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
