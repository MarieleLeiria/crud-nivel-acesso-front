import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider} from '@chakra-ui/react'
import { AuthProvider } from './contexts/AuthContext.tsx'
import AppRoutes from './routes.tsx'
import './global.css'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider  >
      <AuthProvider>
      <AppRoutes/>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
)
