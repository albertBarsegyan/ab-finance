import {
  CTASection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
} from '@/shared/components/pages/home';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
