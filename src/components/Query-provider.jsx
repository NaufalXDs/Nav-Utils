"use client"
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export default function QueryProvider({children}) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                query: {
                    staleTime: Infinity,
                },
            },
        })
    )

  return (
    <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
