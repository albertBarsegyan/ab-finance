import { Button } from '@/shared/components/ui/button.tsx';
import { BrandIcon } from '@/shared/components/brand';
import { appPath, homeSectionName } from '@/shared/constants/app-path.ts';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

export function Navbar() {
  return (
    <header className="hidden lg:block bg-white sticky top-0 border-b">
      <SectionLayout className="px-4 lg:px-6 h-16 flex items-center">
        <a
          href={appPath.MAIN_PATH}
          className="flex items-center justify-center"
        >
          <BrandIcon />
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            href={homeSectionName.FEATURES}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </a>
          <a
            href={homeSectionName.STATS}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Stats
          </a>
          <a
            href={homeSectionName.ABOUT}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </a>
          <a
            href={homeSectionName.TESTIMONIALS}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Testimonials
          </a>
        </nav>
        <div className="ml-4 flex gap-2">
          <a href={appPath.LOGIN}>
            <Button className="cursor-pointer" variant="ghost" size="sm">
              Sign In
            </Button>
          </a>

          <a href={appPath.REGISTER}>
            <Button className="cursor-pointer" size="sm">
              Get Started
            </Button>
          </a>
        </div>
      </SectionLayout>
    </header>
  );
}
