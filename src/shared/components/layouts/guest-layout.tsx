import { Outlet } from 'react-router-dom';
import { FooterSection } from '@/shared/components/pages/home/footer-section.tsx';
import { NavbarController } from '@/shared/components/navigation/controller.tsx';

export function GuestLayout() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <NavbarController />
      <main>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
