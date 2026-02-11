import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import InsuranceSection from '@/components/Marketing/InsuranceSection';
import PartnersSection from '@/components/Marketing/PartnersSection';
import InquiryForm from '@/components/Inquiry/InquiryForm';
import { insuranceTypes, heroContent } from '@/content/insuranceContent';

export default function MarketingPage() {
  const scrollToInquiry = () => {
    const element = document.getElementById('inquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SiteLayout showAdminLink={true}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
                  ✨ Trusted by 10,000+ Clients
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {heroContent.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                {heroContent.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={scrollToInquiry} className="group">
                  {heroContent.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  const element = document.getElementById('services');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src="/assets/generated/hero-insurance.dim_1600x600.png"
                alt="Insurance Protection"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Insurance Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage solutions tailored to your unique needs. We simplify insurance so you can focus on what matters.
            </p>
          </div>

          <div className="space-y-32">
            {insuranceTypes.map((insurance, index) => (
              <InsuranceSection key={insurance.id} insurance={insurance} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take the first step towards securing your future. Our experts are ready to help you find the perfect insurance solution.
            </p>
          </div>

          <InquiryForm />
        </div>
      </section>
    </SiteLayout>
  );
}
