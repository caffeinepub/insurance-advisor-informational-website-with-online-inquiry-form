import { Card, CardContent } from '@/components/ui/card';
import { partnerCompanies } from '@/content/insuranceContent';

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Insurance Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with India's leading insurance providers to bring you the best coverage options and competitive rates.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partnerCompanies.map((company) => (
            <Card key={company} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-center min-h-[100px]">
                <span className="font-semibold text-center">{company}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            And many more trusted insurance providers across India
          </p>
        </div>
      </div>
    </section>
  );
}
