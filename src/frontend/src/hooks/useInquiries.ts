import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SubmittedInquiry } from '../backend';

export function useInquiries() {
  const { actor, isFetching: actorFetching } = useActor();
  const [selectedInquiryId, setSelectedInquiryId] = useState<bigint | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const query = useQuery<SubmittedInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const inquiries = await actor.getAllInquiries();
      // Sort by ID descending (newest first, assuming ID is incremental)
      return inquiries.sort((a, b) => Number(b.id - a.id));
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const filteredInquiries = useMemo(() => {
    if (!query.data) return [];
    if (filterType === 'all') return query.data;
    return query.data.filter(inq => inq.state.insuranceType === filterType);
  }, [query.data, filterType]);

  const selectedInquiry = useMemo(() => {
    if (!selectedInquiryId || !query.data) return null;
    return query.data.find(inq => inq.id === selectedInquiryId) || null;
  }, [selectedInquiryId, query.data]);

  return {
    inquiries: filteredInquiries,
    allInquiries: query.data || [],
    selectedInquiry,
    selectInquiry: setSelectedInquiryId,
    filterType,
    setFilterType,
    isLoading: actorFetching || query.isLoading,
    error: query.error,
  };
}
