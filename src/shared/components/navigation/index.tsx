import { Button } from '@/shared/components/ui/button.tsx';
import { BrandIcon } from '@/shared/components/brand';
import { appPath } from '@/shared/constants/app-path.ts';

export function NavigationSection() {
  return (
    <header className="bg-white sticky top-0 px-4 lg:px-6 h-16 flex items-center border-b">
      <a href={appPath.MAIN_PATH} className="flex items-center justify-center">
        <BrandIcon />
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          href="#features"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </a>
        <a
          href="#stats"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Pricing
        </a>
        <a
          href="#about"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          About
        </a>
        <a
          href="#testimonials"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Testimonials
        </a>
      </nav>
      <div className="ml-4 flex gap-2">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button size="sm">Get Started</Button>
      </div>
    </header>
  );
}
