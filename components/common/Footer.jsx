export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-900 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        Product Admin Dashboard &copy; {new Date().getFullYear()} - Built with Next.js App Router & DummyJSON API
      </div>
    </footer>
  );
}
