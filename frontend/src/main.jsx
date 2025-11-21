import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from "./context/appContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {     
      gcTime: 60 * 20 * 1000,  
      retry: 2,                   
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
