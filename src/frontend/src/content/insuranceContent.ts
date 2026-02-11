export interface InsuranceType {
  id: string;
  title: string;
  description: string;
  coverage: string[];
  idealFor: string[];
  prepareInfo: string[];
  icon: string;
}

export const insuranceTypes: InsuranceType[] = [
  {
    id: 'term',
    title: 'Term Life Insurance',
    description: 'Comprehensive life coverage that provides financial security for your loved ones. We partner with leading providers including HDFC Life to offer competitive rates and flexible terms.',
    coverage: [
      'Death benefit payout to nominees',
      'Optional critical illness riders',
      'Accidental death coverage',
      'Tax benefits under Section 80C and 10(10D)'
    ],
    idealFor: [
      'Primary breadwinners with dependents',
      'Young professionals starting families',
      'Anyone with outstanding loans or mortgages',
      'Parents planning for children\'s future'
    ],
    prepareInfo: [
      'Age, income, and occupation details',
      'Medical history and current health status',
      'Existing insurance policies',
      'Desired coverage amount and term length'
    ],
    icon: 'shield'
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Protect yourself and your family from rising medical costs with comprehensive health coverage. Access to cashless treatment at network hospitals nationwide.',
    coverage: [
      'Hospitalization expenses (room, surgery, ICU)',
      'Pre and post-hospitalization care',
      'Daycare procedures',
      'Ambulance charges and health check-ups'
    ],
    idealFor: [
      'Individuals and families of all ages',
      'Senior citizens needing specialized coverage',
      'Self-employed professionals',
      'Anyone seeking financial protection from medical emergencies'
    ],
    prepareInfo: [
      'Family members to be covered',
      'Pre-existing medical conditions',
      'Preferred sum insured amount',
      'Network hospital preferences'
    ],
    icon: 'heart'
  },
  {
    id: 'vehicle',
    title: 'Vehicle Insurance',
    description: 'Mandatory and comprehensive coverage for your cars, bikes, and commercial vehicles. Quick claim settlement and nationwide garage network.',
    coverage: [
      'Third-party liability (mandatory)',
      'Own damage coverage',
      'Personal accident cover for driver',
      'Zero depreciation and engine protection add-ons'
    ],
    idealFor: [
      'All vehicle owners (legally required)',
      'New vehicle buyers',
      'Fleet owners and commercial operators',
      'Anyone seeking comprehensive protection'
    ],
    prepareInfo: [
      'Vehicle registration details',
      'Previous insurance policy information',
      'Vehicle make, model, and year',
      'Current IDV (Insured Declared Value)'
    ],
    icon: 'car'
  },
  {
    id: 'property',
    title: 'Property Insurance',
    description: 'Safeguard your home, office, or commercial property against fire, natural disasters, theft, and other unforeseen events.',
    coverage: [
      'Building structure and contents',
      'Fire, earthquake, and flood damage',
      'Theft and burglary protection',
      'Public liability coverage'
    ],
    idealFor: [
      'Homeowners and landlords',
      'Business owners with commercial properties',
      'Anyone with valuable assets in their property',
      'Properties in disaster-prone areas'
    ],
    prepareInfo: [
      'Property address and type',
      'Construction details and age',
      'Estimated property value',
      'Security measures in place'
    ],
    icon: 'home'
  },
  {
    id: 'stock',
    title: 'Stock Insurance',
    description: 'Protect your business inventory and stock from damage, theft, or loss during storage and transit. Essential for retailers and manufacturers.',
    coverage: [
      'Stock in warehouses and godowns',
      'Goods in transit',
      'Fire, theft, and natural calamity damage',
      'Business interruption coverage'
    ],
    idealFor: [
      'Retailers and wholesalers',
      'Manufacturers and distributors',
      'E-commerce businesses',
      'Anyone holding significant inventory'
    ],
    prepareInfo: [
      'Type and value of stock',
      'Storage location details',
      'Transit routes and frequency',
      'Security and fire safety measures'
    ],
    icon: 'package'
  },
  {
    id: 'group-mediclaim',
    title: 'Group Mediclaim Insurance',
    description: 'Comprehensive health coverage for your employees. Enhance employee satisfaction and retention with quality healthcare benefits.',
    coverage: [
      'Hospitalization for all employees',
      'Coverage for employee families',
      'Pre-existing disease coverage after waiting period',
      'Maternity and newborn care'
    ],
    idealFor: [
      'Small and medium enterprises',
      'Large corporations',
      'Startups building employee benefits',
      'Organizations seeking tax benefits'
    ],
    prepareInfo: [
      'Number of employees to be covered',
      'Employee age distribution',
      'Desired sum insured per employee',
      'Family coverage requirements'
    ],
    icon: 'users'
  }
];

export const partnerCompanies = [
  'HDFC Life',
  'ICICI Prudential',
  'SBI Life',
  'Max Life',
  'Bajaj Allianz',
  'Star Health',
  'HDFC ERGO',
  'ICICI Lombard',
  'Tata AIG',
  'New India Assurance',
  'Oriental Insurance',
  'United India Insurance'
];

export const heroContent = {
  title: 'Comprehensive Insurance Solutions for Every Need',
  subtitle: 'Expert guidance to protect what matters most. From life and health to property and business coverage, we help you find the right insurance at the best rates.',
  cta: 'Get Free Consultation'
};
