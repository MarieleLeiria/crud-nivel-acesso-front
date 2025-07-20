import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider} from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './global.css'
import AppRoutes from './routes/routes.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider  >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
)
