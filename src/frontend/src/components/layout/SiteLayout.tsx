import { ReactNode } from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SiteLayoutProps {
  children: ReactNode;
  showAdminLink?: boolean;
}

export default function SiteLayout({ children, showAdminLink = false }: SiteLayoutProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    window.location.hash = '#/admin';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <button 
            onClick={navigateToHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/assets/generated/advisor-logo.dim_512x512.png" 
              alt="Insurance Advisor" 
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-lg leading-none">Insurance Advisor</span>
              <span className="text-xs text-muted-foreground">Your Trusted Partner</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => scrollToSection('services')}
              className="transition-colors hover:text-primary"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('partners')}
              className="transition-colors hover:text-primary"
            >
              Partners
            </button>
            <button 
              onClick={() => scrollToSection('inquiry')}
              className="transition-colors hover:text-primary"
            >
              Contact
            </button>
            {showAdminLink && (
              <button 
                onClick={navigateToAdmin}
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                Admin
              </button>
            )}
          </nav>

          <Button 
            onClick={() => scrollToSection('inquiry')}
            className="hidden md:inline-flex"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">Insurance Advisor</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional insurance advisory services for individuals and businesses across India.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Term Life Insurance</li>
                <li>Health Insurance</li>
                <li>Vehicle Insurance</li>
                <li>Property Insurance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection('services')}>About Us</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('partners')}>Partners</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('inquiry')}>Contact</button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Insurance Advisor. All rights reserved. | Built with ❤️ using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
