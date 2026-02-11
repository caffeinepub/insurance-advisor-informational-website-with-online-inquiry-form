import { useState } from 'react';
import { useActor } from './useActor';
import type { InquiryState } from '../backend';

export function useSubmitInquiry() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitInquiry = async (name: string, state: InquiryState): Promise<boolean> => {
    if (!actor) {
      setError('System not ready. Please try again.');
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await actor.submitInquiry(name, state);
      return true;
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      setError(err.message || 'Failed to submit inquiry. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitInquiry, isSubmitting, error };
}
