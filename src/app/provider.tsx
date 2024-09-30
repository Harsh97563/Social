'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';

function Provider({children}: {children: ReactNode}) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
          <NextTopLoader
          showSpinner={false}
          />
          {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Provider