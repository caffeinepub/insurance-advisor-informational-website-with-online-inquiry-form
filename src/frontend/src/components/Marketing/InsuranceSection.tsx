import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, Car, Home, Package, Users, CheckCircle2 } from 'lucide-react';
import { InsuranceType } from '@/content/insuranceContent';

interface InsuranceSectionProps {
  insurance: InsuranceType;
  index: number;
}

const iconMap = {
  shield: Shield,
  heart: Heart,
  car: Car,
  home: Home,
  package: Package,
  users: Users
};

export default function InsuranceSection({ insurance, index }: InsuranceSectionProps) {
  const Icon = iconMap[insurance.icon as keyof typeof iconMap] || Shield;
  const isEven = index % 2 === 0;

  return (
    <div className={`grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>
      {/* Icon/Visual */}
      <div className={`${isEven ? '' : 'md:col-start-2'}`}>
        <div className="relative aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
          <div className="relative bg-card border rounded-2xl p-12 flex items-center justify-center shadow-soft">
            <Icon className="h-32 w-32 text-primary" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-6 ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
        <div>
          <Badge variant="outline" className="mb-3">
            {insurance.id.replace('-', ' ').toUpperCase()}
          </Badge>
          <h3 className="text-3xl font-bold mb-3">{insurance.title}</h3>
          <p className="text-muted-foreground text-lg">{insurance.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insurance.coverage.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ideal For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {insurance.idealFor.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What to Prepare</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {insurance.prepareInfo.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
