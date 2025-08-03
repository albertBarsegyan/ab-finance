import { Outlet } from 'react-router-dom';
import { FooterSection } from '@/shared/components/pages/home/footer-section.tsx';
import { NavigationSection } from '@/shared/components/navigation';

export function GuestLayout() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <NavigationSection />
      <main>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
