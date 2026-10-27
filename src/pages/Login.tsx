import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import MountainMotoLogo from '@/components/MountainMotoLogo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Preencha seu e-mail e senha para continuar.')
      return
    }

    setIsLoading(true)

    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      console.error('Erro de login:', err)
      setErrorMsg('E-mail ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFillDemoAdmin = () => {
    setEmail('me.candre14@gmail.com')
    setPassword('Skip@Pass')
    setErrorMsg('')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 animate-fade-up">
      <div className="w-full max-w-md bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#8B5CF6]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Topo / Logo com Ilustração do Morro Fortaleza */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <MountainMotoLogo
              variant="badge"
              className="hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1">
              Entrar na{' '}
              <span className="text-white">
                Terreno<span className="text-[#22D3EE]">Tech</span>
              </span>
            </h1>
            <p className="text-xs text-[#A1A6B3]">
              Acesse seu painel de vendas, plano de voo e pedidos protegidos.
            </p>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#F87171]/15 border border-[#F87171]/30 text-[#F87171] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">E-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-white">Senha</label>
              <Link to="/recuperar-senha" className="text-xs text-[#22D3EE] hover:underline">
                Esqueci minha senha
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full h-11 text-sm font-bold bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-95 text-[#0B0D12] shadow-lg shadow-[#8B5CF6]/30 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#0B0D12]" />
                Entrando...
              </>
            ) : (
              <>
                Entrar
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </>
            )}
          </Button>
        </form>

        {/* Botão de Preenchimento Demo */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="w-full py-2.5 px-3 rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 text-[#22D3EE] hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
            Preencher credenciais do Admin Demo
          </button>
        </div>

        {/* Rodapé / Cadastro */}
        <div className="pt-2 border-t border-[#232B3A] text-center text-xs text-[#A1A6B3]">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-[#22D3EE] font-bold hover:underline">
            Cadastre-se gratuitamente
          </Link>
        </div>
      </div>
    </div>
  )
}
