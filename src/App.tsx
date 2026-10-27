/* Main App Component - Handles routing (using react-router-dom), query client and other providers */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { FounderModeProvider } from '@/contexts/FounderModeContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Páginas
import Index from './pages/Index'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import CrashAnalysis from './pages/CrashAnalysis'
import RiderClub from './pages/RiderClub'
import MarketStudy from './pages/MarketStudy'
import FlightPlan from './pages/FlightPlan'
import ProtectionManifesto from './pages/ProtectionManifesto'
import FounderRoadmap from './pages/FounderRoadmap'
import MarketingEngine from './pages/MarketingEngine'
import Pilot from './pages/Pilot'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <FounderModeProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route element={<Layout />}>
                {/* Rotas Públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/clube" element={<RiderClub />} />
                <Route path="/analises/plano" element={<FlightPlan />} />
                <Route path="/piloto" element={<Pilot />} />
                <Route path="/roteiro" element={<FounderRoadmap />} />
                <Route path="/marketing" element={<MarketingEngine />} />
                <Route path="/por-que-comprar-online" element={<MarketStudy />} />
                <Route path="/estudo-mercado" element={<MarketStudy />} />
                <Route path="/protecao" element={<ProtectionManifesto />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/confirmacao/:id" element={<Confirmation />} />

                {/* Rotas Autenticadas Protegidas */}
                <Route
                  path="/pedidos"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/queda"
                  element={
                    <ProtectedRoute>
                      <CrashAnalysis />
                    </ProtectedRoute>
                  }
                />

                {/* Rotas de Autenticação e Conta */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/recuperar-senha" element={<ForgotPassword />} />
                <Route path="/redefinir-senha" element={<ResetPassword />} />
                <Route path="/verificar-email" element={<VerifyEmail />} />
              </Route>

              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </CartProvider>
      </FounderModeProvider>
    </AuthProvider>
  </BrowserRouter>
)
export default App
