import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import FloatingContact from './FloatingContact';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <FloatingContact />
      <main className="grow pt-[80px] lg:pt-[160px]">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;
