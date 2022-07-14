/* eslint-disable react/jsx-props-no-spreading */
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import React from 'react'
import '@/styles/main.scss'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
