'use client';

import { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';
import dynamic from 'next/dynamic';

// This component needs to be client-side for Swagger UI
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading API documentation...</p>
      </div>
    </div>
  ),
});

export default function ApiDoc() {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch('/api/openapi');
        if (!response.ok) {
          throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
        }
        const data = await response.json();
        setSpec(data);
      } catch (err) {
        console.error('Error loading OpenAPI spec:', err);
        setError(err instanceof Error ? err.message : 'Failed to load API documentation');
      }
    };

    fetchSpec();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-6 max-w-2xl w-full mx-4">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error Loading Documentation</h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-4 text-sm text-red-600/80 dark:text-red-400/80">
            Please check your console for more details and ensure the API server is running.
          </p>
        </div>
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading API documentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          API Documentation
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <SwaggerUI 
            spec={spec}
            docExpansion="list"
            defaultModelExpandDepth={3}
            displayOperationId={false}
            tryItOutEnabled={true}
            persistAuthorization={true}
          />
        </div>
      </div>
    </div>
  );
}
