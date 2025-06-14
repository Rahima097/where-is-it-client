import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import router from './router/router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './contexts/AuthContext/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
  </StrictMode>
);
