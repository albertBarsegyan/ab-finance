import { Link } from 'lucide-react';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';
import { AbFinanceLogo } from '@/shared/components/icons/logo.tsx';

export function FooterSection() {
  return (
    <footer className="border-t">
      <SectionLayout>
        <div className="flex flex-col gap-4 sm:flex-row w-full shrink-0 items-center py-6">
          <div className="flex flex-col items-center sm:flex-row sm:gap-4">
            <AbFinanceLogo />
            <p className="text-xs text-gray-600 text-center sm:text-left">
              © 2024 abFinance. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:ml-auto sm:gap-6">
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
