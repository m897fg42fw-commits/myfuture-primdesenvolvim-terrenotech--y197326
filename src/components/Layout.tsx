import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  ShoppingCart,
  Package,
  BarChart3,
  Menu,
  X,
  User,
  LogOut,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Users,
  TrendingUp,
  Compass,
  Map,
  Rocket,
  Video,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react'
import MountainMotoLogo from '@/components/MountainMotoLogo'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useFounderMode } from '@/contexts/FounderModeContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Layout() {
  const { totalItemsCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { isFounderMode, canAccessFounderMode, toggleFounderMode } = useFounderMode()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const location = useLocation()

  // Ativa animação no badge do carrinho quando número de itens muda
  useEffect(() => {
    if (totalItemsCount > 0) {
      setCartPulse(true)
      const timer = setTimeout(() => setCartPulse(false), 500)
      return () => clearTimeout(timer)
    }
  }, [totalItemsCount])

  // Efeito de blur ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu mobile ao trocar de rota
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Quando o Modo Fundador estiver DESATIVADO (estado padrão para o público),
  // a navegação pública exibe apenas páginas de loja limpa e programas públicos.
  // Pastas internas (Roteiro, Piloto, Marketing, Plano de Voo, Filão da Queda, Análises)
  // só aparecem no menu se o Modo Fundador estiver ATIVADO pelo admin logado.
  const navItems = isFounderMode
    ? [
        { label: 'Catálogo', path: '/', icon: Layers },
        { label: 'Piloto', path: '/piloto', icon: Rocket },
        { label: 'Roteiro', path: '/roteiro', icon: Map },
        { label: 'Vídeos/Mkt', path: '/marketing', icon: Video },
        { label: 'Plano de Voo', path: '/analises/plano', icon: Compass },
        { label: 'Filão Queda', path: '/analises/queda', icon: ShieldAlert },
        { label: 'Clube Moto-T', path: '/clube', icon: Users },
        { label: 'Pedidos', path: '/pedidos', icon: Package },
        { label: 'Análises', path: '/analises', icon: BarChart3 },
      ]
    : [
        { label: 'Catálogo de Peças', path: '/', icon: Layers },
        { label: 'Por Que Comprar Online?', path: '/por-que-comprar-online', icon: TrendingUp },
        { label: 'Clube Moto-T', path: '/clube', icon: Users },
      ]

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'US'

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0D12] text-[#F4F5F7] selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* Header Fixo */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0D12]/85 backdrop-blur-md border-[#232B3A] shadow-lg shadow-black/40'
            : 'bg-[#0B0D12]/60 backdrop-blur-sm border-[#232B3A]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="group-hover:scale-105 transition-transform duration-200">
              <MountainMotoLogo
                variant="icon"
                className="w-10 h-10 shadow-md shadow-[#10B981]/20 rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Terreno<span className="text-[#22D3EE]">Tech</span>
              </span>
              <span className="text-[10px] text-[#A1A6B3] tracking-wider uppercase font-semibold flex items-center gap-1">
                <span>Peças até 450cc</span>
                <span className="text-[#10B981]">•</span>
                <span className="text-[#34D399]">Morro Fortaleza/RS</span>
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-[#151923]/80 border border-[#232B3A] px-3 py-1.5 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-sm shadow-[#8B5CF6]/40'
                      : 'text-[#A1A6B3] hover:text-white hover:bg-[#1B212D]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A1A6B3]'}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Ações da Direita */}
          <div className="flex items-center gap-3">
            {/* Chave Discreta do Modo Fundador (Apenas para admin candre) */}
            {canAccessFounderMode && (
              <button
                type="button"
                onClick={toggleFounderMode}
                title={
                  isFounderMode
                    ? 'Modo Fundador ATIVADO (exibindo margens, custos e pastas internas). Clique para ocultar e ver como cliente.'
                    : 'Modo Fundador DESATIVADO (visão limpa do cliente). Clique para abrir pastas internas e margens.'
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm ${
                  isFounderMode
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30 ring-1 ring-amber-500/40'
                    : 'bg-[#151923] border-[#232B3A] text-[#94A3B8] hover:text-white hover:border-[#38BDF8]/40'
                }`}
              >
                <KeyRound
                  className={`w-3.5 h-3.5 ${isFounderMode ? 'text-amber-400' : 'text-[#94A3B8]'}`}
                />
                <span className="hidden sm:inline">
                  {isFounderMode ? 'Modo Fundador ON' : 'Modo Fundador'}
                </span>
                {isFounderMode ? (
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <EyeOff className="w-3 h-3 opacity-60" />
                )}
              </button>
            )}

            {/* Botão Carrinho */}
            <Link
              to="/carrinho"
              className="relative p-2.5 rounded-full bg-[#151923] border border-[#232B3A] text-[#F4F5F7] hover:border-[#8B5CF6]/60 hover:text-[#22D3EE] transition-all"
              title="Ver carrinho de compras"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] text-xs font-bold flex items-center justify-center shadow-md shadow-[#8B5CF6]/50 transition-transform ${
                    cartPulse ? 'scale-125 ring-2 ring-[#22D3EE]' : 'scale-100'
                  }`}
                >
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Auth Button ou Avatar */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#151923] border border-[#232B3A] hover:border-[#8B5CF6]/50 transition-all outline-none">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold text-xs flex items-center justify-center">
                      {userInitials}
                    </div>
                    <span className="hidden sm:inline text-xs font-medium text-[#F4F5F7] max-w-[100px] truncate">
                      {user?.name || user?.email}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[#151923] border-[#232B3A] text-[#F4F5F7] shadow-xl p-1.5 rounded-2xl"
                >
                  <DropdownMenuLabel className="font-normal px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-white leading-none">{user?.name}</p>
                      <p className="text-xs text-[#A1A6B3] truncate leading-none">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#232B3A]" />
                  {canAccessFounderMode && (
                    <DropdownMenuItem
                      onClick={toggleFounderMode}
                      className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-amber-300 font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        Modo Fundador
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40">
                        {isFounderMode ? 'ATIVADO' : 'DESLIGADO'}
                      </span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      to="/pedidos"
                      className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                    >
                      <Package className="w-4 h-4 text-[#8B5CF6]" />
                      Painel de Pedidos
                    </Link>
                  </DropdownMenuItem>
                  {isFounderMode && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/piloto"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <Rocket className="w-4 h-4 text-[#22D3EE]" />
                          Piloto de Validação
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/roteiro"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <Map className="w-4 h-4 text-[#8B5CF6]" />
                          Roteiro do Fundador
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/marketing"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <Video className="w-4 h-4 text-amber-400" />
                          Motor de Conteúdo (Vídeos)
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/analises/plano"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <Compass className="w-4 h-4 text-[#10B981]" />
                          Plano de Voo (Ramp-up)
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/analises"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
                          Estatísticas & Caixa
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/analises/queda"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                        >
                          <ShieldAlert className="w-4 h-4 text-[#F87171]" />
                          Filão da Queda (Interno)
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      to="/clube"
                      className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#1B212D] text-[#F4F5F7]"
                    >
                      <Users className="w-4 h-4 text-[#22D3EE]" />
                      Clube Moto-T (Programa)
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#232B3A]" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#F87171] hover:bg-[#F87171]/10 focus:bg-[#F87171]/10 focus:text-[#F87171]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair da Conta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#8B5CF6]/50 bg-transparent hover:bg-[#8B5CF6]/15 text-[#F4F5F7] hover:text-white px-4 text-xs font-semibold"
              >
                <Link to="/login" className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Entrar
                </Link>
              </Button>
            )}

            {/* Hambúrguer Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#151923] border border-[#232B3A] text-[#F4F5F7] hover:text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B0D12] border-b border-[#232B3A] px-4 pt-3 pb-6 space-y-3 animate-fade-up">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white'
                        : 'bg-[#151923] text-[#A1A6B3] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                )
              })}
            </div>

            {!isAuthenticated && (
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold"
                >
                  <Link to="/login">Fazer Login / Criar Conta</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Rodapé Global */}
      <footer className="w-full border-t border-[#232B3A] bg-[#0E1118] mt-16 py-8 space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <MountainMotoLogo variant="icon" className="w-8 h-8 rounded-lg shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#F4F5F7]">
                Terrenotech{' '}
                <span className="text-[#A1A6B3] font-normal">
                  — A marca-mãe de peças até 450cc direto ao motoqueiro • Clube Moto-T e MotoQ são
                  programas Terrenotech
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#A1A6B3] flex-wrap justify-center sm:justify-end">
            <Link
              to="/clube#manifesto"
              className="text-[#93C5FD] hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
              Manifesto & Propósito
            </Link>
            <span>•</span>
            <Link
              to="/protecao"
              className="text-[#A1A6B3] hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Proteção & Autoria
            </Link>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-[#34D399]">
              <ShieldCheck className="w-4 h-4" />
              <span>Checkout Seguro & Alta Velocidade</span>
            </div>
            <span>•</span>
            <p>© 2025 Terrenotech. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Nota informativa de legalidade / posicionamento */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#121620] border border-[#232B3A] rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#A1A6B3] text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] shrink-0" />
              <p>
                <strong className="text-white">Dropshipping nacional:</strong> venda emitida por
                microempresa (Simples Nacional) com nota fiscal — MEI não é permitido para este
                modelo.
              </p>
            </div>
            <span className="text-[10px] text-[#A1A6B3]/80 bg-[#0B0D12] px-2 py-0.5 rounded border border-[#232B3A] shrink-0">
              Operação em conformidade tributária
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
