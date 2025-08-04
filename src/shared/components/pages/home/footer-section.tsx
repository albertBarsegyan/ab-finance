import { Link } from 'lucide-react';
import { BrandIcon } from '@/shared/components/brand';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

export function FooterSection() {
  return (
    <footer className="border-t">
      <SectionLayout>
        <div className="flex flex-col gap-2 sm:flex-row w-full shrink-0 items-center py-6">
          <BrandIcon />
          <p className="text-xs text-gray-600 sm:ml-4">
            © 2024 abFinance. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-gray-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-gray-600"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-gray-600"
            >
              Support
            </Link>
          </nav>
        </div>
      </SectionLayout>
    </footer>
  );
}
