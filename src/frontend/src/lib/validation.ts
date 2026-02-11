export function validateField(field: string, value: string): string | null {
  switch (field) {
    case 'name':
      if (!value.trim()) {
        return 'Name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return null;

    case 'phone':
      if (!value.trim()) {
        return 'Phone number is required';
      }
      // Remove spaces and special characters for validation
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
      // Check for Indian phone number format (10 digits, optionally with +91)
      const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        return 'Please enter a valid Indian phone number';
      }
      return null;

    case 'email':
      if (!value.trim()) {
        return null; // Email is optional
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;

    case 'insuranceType':
      if (!value.trim()) {
        return 'Please select an insurance type';
      }
      return null;

    case 'message':
      if (!value.trim()) {
        return 'Please describe your requirements';
      }
      if (value.trim().length < 10) {
        return 'Please provide more details (at least 10 characters)';
      }
      return null;

    default:
      return null;
  }
}
