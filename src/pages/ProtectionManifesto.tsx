import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  FileText,
  CheckCircle2,
  Mail,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProtectionManifesto() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up py-4">
      {/* Botão Voltar */}
      <div>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-[#232B3A] bg-[#151923] text-[#A1A6B3] hover:text-white hover:bg-[#1B212D] text-xs h-9 px-4"
        >
          <Link to="/" className="flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Início
          </Link>
        </Button>
      </div>

      {/* Header do Manifesto */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Manifesto de Proteção & Integridade • Terrenotech
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Declaração de Autoria, Proteção e Respeito Mútuo
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed max-w-2xl">
          Um texto transparente de meia página para proteger a empresa, o fundador e as pessoas da
          nossa comunidade — sem juridiquês, direto ao ponto.
        </p>
      </div>

      {/* Meia Página de Texto Sóbrio */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-2xl p-6 sm:p-8 space-y-5 text-sm text-[#D1D5DB] leading-relaxed shadow-xl">
        <p>
          A <strong className="text-white">Terrenotech</strong> nasceu do trabalho artesanal, da
          experiência real de rua e da dedicação pessoal do seu fundador em criar uma ponte justa e
          acessível de peças de reposição e equipamentos para motociclistas.
        </p>

        <p>
          Todo o conjunto que compõe este projeto — a marca nominativa e mista{' '}
          <strong className="text-white">Terrenotech</strong>, o logotipo estilizado da moto no
          Morro Fortaleza (RS), os programas originais{' '}
          <strong className="text-white">Clube Moto-T</strong> e{' '}
          <strong className="text-white">MotoQ</strong> (A Carta ao Tombo), além dos textos,
          cartilhas, layout e identidade visual presentes nesta plataforma — é de autoria e
          titularidade do fundador e da Terrenotech.
        </p>

        <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232B3A] text-xs text-[#A1A6B3] flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Transparência registral:</strong> O processo de registro
            formal da marca Terrenotech perante o{' '}
            <strong className="text-[#38BDF8]">
              INPI (Instituto Nacional da Propriedade Industrial)
            </strong>{' '}
            está em andamento (protocolo prévio como Pessoa Física para garantia legal de
            anterioridade). Não afirmamos registro já deferido: agimos com verdade e boa-fé estrita.
          </p>
        </div>

        <p>
          Acreditamos no mercado livre e na concorrência leal. O que nos move não é impedir que
          outras pessoas empreendam no setor de duas rodas, mas assegurar que o nosso suor, a nossa
          voz e a identidade construída com honestidade não sejam apropriados indevidamente por
          terceiros de má-fé.
        </p>
      </section>

      {/* Quadro Auto-Explicativo (4 Linhas) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#22D3EE]" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Quadro Auto-Explicativo de Proteção
          </h2>
        </div>

        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E1118] text-[#93C5FD] border-b border-[#232B3A]">
                <tr>
                  <th className="py-3 px-4 font-bold text-white w-1/4">Aspecto</th>
                  <th className="py-3 px-4 font-bold text-white">Como Funciona na Prática</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232B3A] text-[#D1D5DB]">
                <tr className="hover:bg-[#1B212D]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    O que é protegido
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A6B3]">
                    A marca nominativa Terrenotech, identidade visual (cores, Morro Fortaleza), os
                    textos originais, o nome dos programas (
                    <span className="text-white font-medium">Clube Moto-T, MotoQ</span>) e o
                    conteúdo editorial do app.
                  </td>
                </tr>

                <tr className="hover:bg-[#1B212D]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    O que não é impedido por lei
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A6B3]">
                    A ideia genérica de vender motopeças pela internet, o modelo de dropshipping
                    comercial e o desejo de qualquer cidadão de atender motociclistas. A lei protege
                    a expressão, a marca e a autoria, não a ideia abstrata.
                  </td>
                </tr>

                <tr className="hover:bg-[#1B212D]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    Como agimos contra cópia
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A6B3]">
                    Com sobriedade e diálogo primeiro: notificação extrajudicial direta para
                    cessação imediata de uso indevido e, quando necessário, medidas cabíveis
                    respaldadas na anterioridade de protocolo no INPI e Lei de Direitos Autorais
                    (Lei 9.610/98).
                  </td>
                </tr>

                <tr className="hover:bg-[#1B212D]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                    Como denunciar uso indevido
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A6B3]">
                    Viu cópia não autorizada da nossa marca ou programas? Entre em contato
                    diretamente com o fundador e nossa equipe pelo e-mail oficial de suporte ou
                    WhatsApp disponível no rodapé e na página do Clube.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rodapé simples do manifesto */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A1A6B3] border-t border-[#232B3A]">
        <span>Terrenotech • Autenticidade, honestidade e respeito à comunidade de duas rodas.</span>
        <Link
          to="/clube"
          className="text-[#38BDF8] hover:underline font-semibold flex items-center gap-1"
        >
          Ver Clube Moto-T & Manifesto de Propósito
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
