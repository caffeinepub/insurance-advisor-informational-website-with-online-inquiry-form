import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useSubmitInquiry } from '@/hooks/useSubmitInquiry';
import { validateField } from '@/lib/validation';
import { insuranceTypes, partnerCompanies } from '@/content/insuranceContent';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insuranceType: '',
    preferredCompany: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { submitInquiry, isSubmitting, error: submitError } = useSubmitInquiry();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validateField('phone', formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    if (formData.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) newErrors.email = emailError;
    }

    const insuranceTypeError = validateField('insuranceType', formData.insuranceType);
    if (insuranceTypeError) newErrors.insuranceType = insuranceTypeError;

    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);

    if (!validateForm()) {
      return;
    }

    const success = await submitInquiry(
      formData.name,
      {
        phone: formData.phone,
        email: formData.email || undefined,
        insuranceType: formData.insuranceType,
        preferredCompany: formData.preferredCompany || undefined,
        message: formData.message
      }
    );

    if (success) {
      setShowSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        insuranceType: '',
        preferredCompany: '',
        message: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Get Your Free Consultation</CardTitle>
        <CardDescription>
          Fill out the form below and our insurance experts will get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-6 border-primary bg-primary/5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              Thank you for your inquiry! We'll contact you shortly.
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceType">Insurance Type *</Label>
            <Select
              value={formData.insuranceType}
              onValueChange={(value) => handleChange('insuranceType', value)}
            >
              <SelectTrigger className={errors.insuranceType ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select insurance type" />
              </SelectTrigger>
              <SelectContent>
                {insuranceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.insuranceType && (
              <p className="text-sm text-destructive">{errors.insuranceType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredCompany">Preferred Insurance Company (Optional)</Label>
            <Select
              value={formData.preferredCompany}
              onValueChange={(value) => handleChange('preferredCompany', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred company" />
              </SelectTrigger>
              <SelectContent>
                {partnerCompanies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your Requirements *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your insurance needs, coverage amount, any specific requirements..."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
