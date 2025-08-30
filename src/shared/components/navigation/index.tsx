import { Button } from '@/shared/components/ui/button.tsx';
import { appPath, homeSectionName } from '@/shared/constants/app-path.ts';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';
import { AbFinanceLogo } from '@/shared/components/icons/logo.tsx';
import { LanguageSwitcher } from '@/shared/components/custom/language-switcher';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="hidden lg:block bg-white sticky top-0 border-b">
      <SectionLayout className="px-4 lg:px-6 h-16 flex items-center">
        <a
          href={appPath.MAIN_PATH}
          className="flex items-center justify-center"
        >
          <AbFinanceLogo />
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            href={homeSectionName.FEATURES}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t('navigation.features')}
          </a>
          <a
            href={homeSectionName.STATS}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t('navigation.stats')}
          </a>
          <a
            href={homeSectionName.ABOUT}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t('navigation.about')}
          </a>
          <a
            href={homeSectionName.TESTIMONIALS}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t('navigation.testimonials')}
          </a>
        </nav>
        <div className="ml-4 flex gap-2">
          <LanguageSwitcher />
          <a href={appPath.LOGIN}>
            <Button className="cursor-pointer" variant="ghost" size="sm">
              {t('auth.signIn')}
            </Button>
          </a>

          <a href={appPath.REGISTER}>
            <Button className="cursor-pointer" size="sm">
              {t('navigation.getStarted')}
            </Button>
          </a>
        </div>
      </SectionLayout>
    </header>
  );
}
