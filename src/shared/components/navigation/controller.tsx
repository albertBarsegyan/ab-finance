import { MobileNavbar } from '@/shared/components/navigation/mobile-navbar.tsx';
import { Navbar } from '@/shared/components/navigation/index.tsx';

export function NavbarController() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
    </>
  );
}
