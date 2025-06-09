"use client";

import { useEffect } from 'react';
import outputs from '@/amplify_outputs.json';

export function useAmplifyConfig() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      localStorage.setItem('BASE_API_URL', outputs.custom.API.httpApi.endpoint);
    }
  }, []);
}