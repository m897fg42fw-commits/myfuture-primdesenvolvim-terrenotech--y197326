import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  FileCheck2,
  HeartHandshake,
  HelpCircle,
  MessageCircle,
  Percent,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Zap,
  BookOpen,
  FileText,
  AlertOctagon,
  Scale,
  Gift,
  Flame,
  Compass,
  Heart,
  Quote,
  Shield,
  GraduationCap,
  Smile,
  Users2,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function RiderClub() {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Hero / Banner Principal do Clube Moto-T — Com alma da TT 125, Azul Escuro Profundo e Dark Tech */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1E3A8A] bg-gradient-to-br from-[#070F26] via-[#0B132B] to-[#0B0D12] p-6 sm:p-12 shadow-2xl">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-[#1D4ED8]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1E3A8A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/40 border border-[#3B82F6]/50 text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
            Clube Moto-T • O Espírito Todo Terreno da Terrenotech
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Clube Moto-T <br />
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">
              Amparo real, comissão limpa e espírito todo terreno
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            Criado por quem entende o asfalto e a terra batida: programas desenhados para proteger o
            bolso do motociclista, remunerar indicações com metade do lucro, apoiar quedas com peças
            grátis, fortalecer as mulheres na pista e transformar tombos em aprendizado. Da CG 160 à
            Dominar 400 — aqui todo mundo é acolhido.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setWhatsappModalOpen(true)}
              className="rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-[#0B0D12] font-extrabold px-6 h-11 text-xs shadow-lg shadow-[#25D366]/20 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#0B0D12] fill-[#0B0D12]" />
              Falar com o Clube Moto-T no WhatsApp
            </Button>

            <a
              href="#manifesto"
              className="rounded-full bg-[#1E3A8A]/50 hover:bg-[#1E3A8A] border border-[#3B82F6]/60 text-white font-bold px-5 h-11 text-xs shadow-md flex items-center gap-2 transition-colors"
            >
              <Heart className="w-4 h-4 text-[#38BDF8]" />
              Ler Nosso Manifesto & Propósito
            </a>

            <span className="text-xs text-[#93C5FD] bg-[#070F26]/90 px-3 py-2 rounded-full border border-[#1E3A8A] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              Programa de Lançamento (validação manual assistida)
            </span>
          </div>
        </div>
      </section>

      {/* MANIFESTO & PROPÓSITO DA TERRENOTECH: POR QUE A EMPRESA EXISTE */}
      <section
        id="manifesto"
        className="relative overflow-hidden rounded-3xl border-2 border-[#2563EB]/80 bg-gradient-to-br from-[#070F26] via-[#0B132B] to-[#0E1B3D] p-6 sm:p-12 shadow-2xl space-y-8 scroll-mt-24"
      >
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#3B82F6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[#1D4ED8]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Topo do Manifesto: Propósito Central e Títulos */}
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/60 border border-[#3B82F6]/60 text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#38BDF8]" />
            Manifesto Terrenotech • A Razão de Existir
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-pill-sm text-[11px] bg-[#1E3A8A]/60 text-[#93C5FD] border border-[#3B82F6]/60 font-bold uppercase tracking-wider">
                Clube Moto-T — Um Programa Terrenotech
              </span>
              <span className="badge-pill-sm text-[10px] bg-[#22D3EE]/20 text-[#38BDF8] border border-[#22D3EE]/40 font-bold uppercase tracking-wider">
                Marca Guarda-Chuva Terrenotech
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Por que a Terrenotech existe
            </h2>
            <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#38BDF8] bg-clip-text text-transparent">
              "Ela veio para ajudar."
            </p>
          </div>

          {/* Destaque Visual Óbvio das 5 Pílulas do Lema Terrenotech */}
          <div className="pt-3 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#070F26] via-[#0D1938] to-[#070F26] border-2 border-[#38BDF8]/50 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-black text-[#38BDF8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                Lema Oficial Terrenotech — As 5 Virtudes em Ordem de Prioridade:
              </span>
              <span className="text-[10px] font-bold text-[#94A3B8] hidden sm:inline">
                Missões & Valores Inegociáveis
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Pílula 1: Generosidade */}
              <div className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#1E3A8A]/50 to-[#0B132B] border-2 border-[#3B82F6] text-white shadow-lg shadow-[#1E3A8A]/30 transition-transform hover:scale-[1.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white shrink-0 font-black text-sm shadow-md">
                  1
                </div>
                <div>
                  <span className="text-sm font-black text-white block tracking-wide">
                    Generosidade
                  </span>
                  <span className="text-xs font-semibold text-[#93C5FD]">Ceder a margem</span>
                </div>
              </div>

              {/* Pílula 2: Paz */}
              <div className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#0284C7]/40 to-[#0B132B] border-2 border-[#38BDF8] text-white shadow-lg shadow-[#0284C7]/30 transition-transform hover:scale-[1.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-[#0B0D12] shrink-0 font-black text-sm shadow-md">
                  2
                </div>
                <div>
                  <span className="text-sm font-black text-white block tracking-wide">Paz</span>
                  <span className="text-xs font-semibold text-[#7DD3FC]">Mente tranquila</span>
                </div>
              </div>

              {/* Pílula 3: Aprendizado */}
              <div className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#059669]/40 to-[#0B132B] border-2 border-[#34D399] text-white shadow-lg shadow-[#059669]/30 transition-transform hover:scale-[1.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#34D399] flex items-center justify-center text-[#0B0D12] shrink-0 font-black text-sm shadow-md">
                  3
                </div>
                <div>
                  <span className="text-sm font-black text-white block tracking-wide">
                    Aprendizado
                  </span>
                  <span className="text-xs font-semibold text-[#6EE7B7]">Crescer com a pista</span>
                </div>
              </div>

              {/* Pílula 4: Bem-estar */}
              <div className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#D97706]/40 to-[#0B132B] border-2 border-[#FBBF24] text-white shadow-lg shadow-[#D97706]/30 transition-transform hover:scale-[1.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#FBBF24] flex items-center justify-center text-[#0B0D12] shrink-0 font-black text-sm shadow-md">
                  4
                </div>
                <div>
                  <span className="text-sm font-black text-white block tracking-wide">
                    Bem-estar
                  </span>
                  <span className="text-xs font-semibold text-[#FDE68A]">Viver o outro T</span>
                </div>
              </div>

              {/* Pílula 5: Esperança */}
              <div className="flex items-center gap-3 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-[#7C3AED]/40 to-[#0B132B] border-2 border-[#A78BFA] text-white shadow-lg shadow-[#7C3AED]/30 transition-transform hover:scale-[1.02]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white shrink-0 font-black text-sm shadow-md">
                  5
                </div>
                <div>
                  <span className="text-sm font-black text-white block tracking-wide">
                    Esperança
                  </span>
                  <span className="text-xs font-semibold text-[#DDD6FE]">O caminho de volta</span>
                </div>
              </div>
            </div>

            {/* Nota de contexto da virtude social Esperança */}
            <div className="pt-2 border-t border-[#1E3A8A]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#93C5FD]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A78BFA] shrink-0" />
                <span>
                  <strong className="text-white">5ª Virtude • Esperança:</strong> Apoio social a
                  motoqueiros enfrentando dependência química — porta aberta gratuita via{' '}
                  <strong className="text-white">CAPS AD do SUS</strong> com retaguarda solidária do
                  fundo Terrenotech.
                </span>
              </span>
              <span className="text-[11px] font-mono text-[#DDD6FE] shrink-0 bg-[#7C3AED]/20 border border-[#A78BFA]/30 px-2 py-0.5 rounded-full">
                Missão Social
              </span>
            </div>
          </div>
        </div>

        {/* Prosa Sincera do Manifesto */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Coluna Principal da Narrativa */}
          <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            {/* Bloco de citação de destaque: o corredor e a mente */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#070F26] to-[#0E1B3D] border-l-4 border-l-[#38BDF8] border-y border-r border-[#1E3A8A] p-5 sm:p-6 shadow-xl space-y-3">
              <Quote className="w-8 h-8 text-[#38BDF8]/40" />
              <blockquote className="text-base sm:text-lg font-medium text-white italic leading-snug">
                "Já nos divertimos nas motos, mas também sofremos muitas coisas. Enquanto acham que
                a gente está passando a mil nos corredores e é só velocidade, vai uma mente que está
                com problemas por vezes e bem naquela hora está pensando como resolver — ou a gente
                pode estar cantando no capacete, que a música quase não sai para fora."
              </blockquote>
              <p className="text-sm font-bold text-[#38BDF8] tracking-wide">
                — "O fato é que somos gente, da gente, somos gente fina."
              </p>
            </div>

            <div className="space-y-4">
              <p>
                A Terrenotech não nasceu de um plano financeiro frio nem de um fundo de
                investimento. O nosso propósito é direto e sem enfeite:{' '}
                <strong className="text-white">ela veio para ajudar</strong>. Quem está em cima de
                uma moto todo santo dia sabe o que é o cansaço do asfalto, a chuva na viseira, o
                susto de um retrovisor quebrado e a pressão de pagar as contas no fim do mês.
              </p>

              <p>
                Por isso, a nossa meta número um é{' '}
                <strong className="text-[#60A5FA]">formar Embaixadores</strong>: conectar quem roda
                com quem precisa de peças, remunerando quem indica com{' '}
                <strong className="text-white">50% da margem líquida</strong>. Não é marketing de
                rede, não é promessa fácil: é divisão honesta do trabalho entre parceiros de pista.
              </p>
            </div>

            {/* Destaque da Honestidade Econômica */}
            <div className="rounded-2xl bg-[#070F26]/90 border border-[#1E3A8A] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#34D399] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                O Modelo Econômico Explicado com Honestidade
              </div>
              <blockquote className="text-sm sm:text-base font-semibold text-white italic border-l-2 border-[#34D399] pl-3.5 leading-relaxed">
                "Se vender a preço de atacado e a maioria virar essa fase, não haverá mais lucro —
                então aí que explode essa empresa: ela é para a rapezy, um modo deles terem
                economia. A empresa é deles."
              </blockquote>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Aqui o sucesso da Terrenotech não se mede pelo quanto de margem o dono acumula, mas
                por quanto dinheiro voltou para o bolso de quem pilota. Quando todo mundo comprar a
                preço de fábrica e cuidar uns dos outros, a empresa terá cumprido sua missão máxima.
              </p>
            </div>
          </div>

          {/* Coluna Lateral: O Compromisso do Fundador */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#070F26] via-[#0B132B] to-[#070F26] border-2 border-[#1E3A8A] p-5 sm:p-6 shadow-xl space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E3A8A]/70 pb-3">
                <span className="text-[10px] uppercase font-bold text-[#93C5FD] tracking-wider">
                  Palavra do Fundador
                </span>
                <span className="badge-pill-sm text-[10px] bg-[#1E3A8A]/60 text-[#60A5FA] border border-[#3B82F6]/50 font-bold">
                  Compromisso Assinado
                </span>
              </div>

              <h3 className="text-lg font-black text-white leading-snug">
                O Destino da Terrenotech e o "Outro T"
              </h3>

              <div className="space-y-3 text-xs text-[#D1D5DB] leading-relaxed">
                <p>
                  Não criamos a Terrenotech para virar um conglomerado corporativo perpétuo. O plano
                  do fundador é claro e transparente para todos os que entram nessa jornada:
                </p>

                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#38BDF8] block">
                    1. Administrar por um tempo
                  </span>
                  <p className="text-[#A1A6B3]">
                    Estruturar o catálogo, garantir os fornecedores nacionais com garantia, colocar
                    o amparo e os 50% de comissão de pé com retidão.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#34D399] block">
                    2. Entregar à comunidade
                  </span>
                  <blockquote className="text-white italic font-medium">
                    "Vou administrar por um tempo, depois eu entrego de alguma forma; ela vira uma
                    outra coisa que não será empresa."
                  </blockquote>
                  <p className="text-[#A1A6B3]">
                    Transformar a estrutura em uma cooperativa, fundo comunitário ou associação onde
                    a comunidade de motoqueiros é a verdadeira dona.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#FBBF24] block">
                    3. Viver o outro T
                  </span>
                  <blockquote className="text-white italic font-medium">
                    "O fundador também com certeza vai viver o outro T."
                  </blockquote>
                  <p className="text-[#A1A6B3]">
                    Voltar para a estrada, viver todo terreno de verdade, em liberdade, paz,
                    bem-estar e esperança — a exata filosofia da sua primeira TT 125 azul-escura.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1E3A8A]/60">
              <div className="flex items-center gap-2 text-[11px] text-[#93C5FD]">
                <Users2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Feito por gente da gente. Para a rapezy ter economia de verdade.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO DE ABERTURA: A HISTÓRIA PESSOAL DO FUNDADOR & A ALMA DO CLUBE MOTO-T */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-[#1E3A8A]/90 bg-gradient-to-br from-[#0B132B] via-[#0E1B3D] to-[#070F26] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E3A8A]/60 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A8A]/60 border border-[#3B82F6]/50 text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                A Alma da Marca • História Real do Fundador
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Por que "Moto-T"? A TT 125, o Canhão Azul-Escuro e o Espírito Todo Terreno
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#070F26] px-3 py-1.5 rounded-full border border-[#1E3A8A] self-start sm:self-auto">
              TT = Todo Terreno
            </span>
          </div>

          {/* Narrativa da história */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              <p>
                O nome <strong className="text-white">Clube Moto-T</strong> não nasceu de agência de
                marketing nem de pesquisa de mesa. Ele vem gravado na graxa e na memória da primeira
                moto do nosso fundador:{' '}
                <strong className="text-[#93C5FD]">
                  uma TT 125 que ele transformou com as próprias mãos, semelhante a uma RX 125
                </strong>
                . Por isso os dois "T" grandes na nossa essência.
              </p>

              <p>
                A moto era <strong className="text-[#60A5FA]">azul-escura</strong>, roncava forte e,
                nas palavras do próprio dono,{' '}
                <strong className="text-white">"era um canhão em velocidade"</strong>. Cortava rua,
                estrada e barro sem pedir licença. E carregava no peito o verdadeiro significado da
                sigla: <strong className="text-[#38BDF8]">"TT quer dizer todo terreno"</strong>.
              </p>

              <p>
                Esse espírito não ficou no passado — virou o coração deste programa. Para nós,{' '}
                <strong className="text-white">todo terreno</strong> significa que a Terrenotech
                acolhe quem pilota em qualquer condição:{' '}
                <span className="text-[#60A5FA]">
                  do entregador de CG 160 que corre 12 horas debaixo de chuva ao motociclista de
                  Dominar 400 ou Lander na terra batida
                </span>
                . Não importa se a sua pista é o asfalto esburacado da cidade ou a estrada de chão:
                aqui você tem suporte, comissão justa e proteção real.
              </p>

              <div className="p-4 rounded-2xl bg-[#070F26]/90 border border-[#1E3A8A] flex items-start gap-3 text-xs text-[#93C5FD]">
                <Compass className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Nosso compromisso:</strong> Orgulho de pista,
                  solidariedade de quem já passou perrengue e zero soberba publicitária. Se você
                  roda de moto no Brasil, o Clube Moto-T foi feito para você.
                </p>
              </div>
            </div>

            {/* Card com a Ficha da Alma da Moto */}
            <div className="lg:col-span-4 bg-[#070F26] border-2 border-[#1E3A8A] rounded-2xl p-5 space-y-4 text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#1E3A8A]/60 pb-3">
                <span className="text-[10px] uppercase font-bold text-[#93C5FD] tracking-wider">
                  Raízes do Fundador
                </span>
                <span className="badge-pill-sm text-[10px] bg-[#1E3A8A]/50 text-[#93C5FD] border border-[#3B82F6]/50 font-bold">
                  Origem 100% Real
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A]/70 space-y-1">
                  <span className="text-[10px] text-[#93C5FD] uppercase font-semibold block">
                    A Primeira Moto
                  </span>
                  <div className="font-bold text-white text-sm">
                    TT 125 → transformada em quase RX 125
                  </div>
                  <p className="text-[11px] text-[#A1A6B3]">
                    Trabalho artesanal de garagem, motor afinado e orgulho de quem fez acontecer.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A]/70 space-y-1">
                  <span className="text-[10px] text-[#93C5FD] uppercase font-semibold block">
                    Identidade Visual
                  </span>
                  <div className="font-bold text-[#60A5FA] text-sm flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#1E3A8A] border border-[#60A5FA]" />
                    Azul Escuro Profundo • "Um canhão em velocidade"
                  </div>
                  <p className="text-[11px] text-[#A1A6B3]">
                    Velocidade, sobriedade e a força das duas rodas sem perder o tema dark tech.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B132B] border border-[#1E3A8A]/70 space-y-1">
                  <span className="text-[10px] text-[#93C5FD] uppercase font-semibold block">
                    Significado Vivo
                  </span>
                  <div className="font-bold text-[#34D399] text-sm">
                    TT = Todo Terreno = Todo Motoqueiro
                  </div>
                  <p className="text-[11px] text-[#A1A6B3]">
                    Acolhe do 125cc/160cc de entrada até 450cc média cilindrada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVISO DE LANÇAMENTO & OPERAÇÃO INICIAL */}
      <div className="bg-[#0B132B] border border-[#1E3A8A] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A8A]/40 border border-[#3B82F6]/50 flex items-center justify-center text-[#60A5FA] shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Programa em Fase de Lançamento</h4>
            <p className="text-xs text-[#A1A6B3]">
              Nesta fase inicial, a mecânica de crédito, validação de BO/laudos e aplicação de
              descontos de nível é operada manualmente com o suporte via WhatsApp.
            </p>
          </div>
        </div>

        <button
          onClick={() => setWhatsappModalOpen(true)}
          className="text-xs font-bold text-[#60A5FA] hover:underline flex items-center gap-1 shrink-0"
        >
          Tirar dúvidas no suporte <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* OS PROGRAMAS COMERCIAIS */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Conheça os Programas do Clube Moto-T
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3]">
            Transparência total: veja a regra de cada programa e como participar hoje mesmo.
          </p>
        </div>

        {/* Grade com os Programas Existentes + Arrego das Motoqueiras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* PROGRAMA 1: METADE DA MARGEM É SUA */}
          <div className="group relative bg-[#0B132B]/80 border border-[#1E3A8A] hover:border-[#3B82F6] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-pill-sm text-[11px] bg-[#1E3A8A]/50 text-[#93C5FD] border border-[#3B82F6]/50 font-bold uppercase tracking-wider">
                  Programa 1 • Indicação
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#1E3A8A]/50 border border-[#3B82F6]/50 flex items-center justify-center text-[#60A5FA] group-hover:scale-110 transition-transform">
                  <Percent className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white leading-snug">
                  "Metade da margem é sua"
                </h3>
                <p className="text-xs text-[#38BDF8] font-semibold mt-0.5">
                  50% do lucro líquido gerado volta para o indicador
                </p>
              </div>

              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                O motoqueiro que indicar um amigo ou colega de pista recebe exatamente{' '}
                <strong className="text-white">50% da margem líquida</strong> obtida na venda do
                pedido. O valor é pago em crédito na loja para ser trocado em peças e acessórios
                para a sua moto ou repassado a quem ele escolher.
              </p>

              {/* Exemplo Prático */}
              <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#34D399] font-bold">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Exemplo Real:</span>
                </div>
                <p className="text-[#A1A6B3] leading-relaxed">
                  Indicou uma capa de chuva ou jaqueta vendida a{' '}
                  <strong className="text-white">R$ 189,90</strong> (com custo de fornecedor de R$
                  115,00 = margem de R$ 74,90).{' '}
                  <span className="text-[#34D399] font-bold">
                    Você ganha R$ 37,45 em crédito líquido
                  </span>{' '}
                  na mesma hora.
                </p>
              </div>

              {/* Passo a Passo Simples */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold text-[#93C5FD] tracking-wider block">
                  Como funciona em 3 passos:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#3B82F6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-[#A1A6B3]">
                      Compartilhe o link do produto da Terrenotech com seu amigo.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#3B82F6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-[#A1A6B3]">
                      Ele faz o pedido informando seu nome ou contato no checkout.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#3B82F6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-[#A1A6B3]">
                      O crédito de 50% da margem é liberado no seu cadastro para abater em qualquer
                      peça.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setWhatsappModalOpen(true)}
              variant="outline"
              className="w-full rounded-full border-[#3B82F6]/50 text-white hover:bg-[#1E3A8A]/40 text-xs font-bold h-11"
            >
              Ativar meu código de indicação
            </Button>
          </div>

          {/* PROGRAMA 2: CAIU, A TERRENOTECH AMPARA */}
          <div className="group relative bg-[#0B132B]/80 border border-[#1E3A8A] hover:border-[#F87171]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-pill-sm text-[11px] bg-[#F87171]/20 text-[#fca5a5] border border-[#F87171]/40 font-bold uppercase tracking-wider">
                  Programa 2 • Solidariedade
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#F87171]/20 border border-[#F87171]/40 flex items-center justify-center text-[#F87171] group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white leading-snug">
                  "Caiu, a Terrenotech ampara"
                </h3>
                <p className="text-xs text-[#F87171] font-semibold mt-0.5">
                  Peças menores de graça mediante comprovação
                </p>
              </div>

              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Ninguém está imune a um asfalto escorregadio ou freada brusca. Quando um cliente da
                Terrenotech sofre acidente, nós enviamos as{' '}
                <strong className="text-white">peças periféricas menores de graça</strong> (como par
                de piscas, manetes ou manoplas) para colocar a moto em condição de rodar sem pesar
                no bolso.
              </p>

              {/* Regra de Comprovação */}
              <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#F87171] font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Comprovação Obrigatória:</span>
                </div>
                <p className="text-[#A1A6B3] leading-relaxed">
                  Para evitar fraudes e manter o amparo sustentável, é necessária a apresentação de{' '}
                  <strong className="text-white">
                    Boletim de Ocorrência (B.O.) ou Laudo Médico / Hospitalar
                  </strong>{' '}
                  datado recente do acidente com a moto.
                </p>
              </div>

              {/* Passo a Passo Simples */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
                  Como solicitar o amparo:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F87171] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-[#A1A6B3]">
                      Mande mensagem no suporte da Terrenotech com fotos da moto.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F87171] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-[#A1A6B3]">
                      Envie o comprovante em PDF ou foto (B.O. ou laudo de atendimento).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F87171] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-[#A1A6B3]">
                      A equipe despacha as peças periféricas elegíveis com custo zero.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setWhatsappModalOpen(true)}
              variant="outline"
              className="w-full rounded-full border-[#F87171]/50 text-white hover:bg-[#F87171]/20 text-xs font-bold h-11"
            >
              Solicitar suporte de amparo
            </Button>
          </div>

          {/* PROGRAMA 3: NÍVEIS DE FIDELIDADE */}
          <div className="group relative bg-[#0B132B]/80 border border-[#1E3A8A] hover:border-[#38BDF8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-pill-sm text-[11px] bg-[#1E3A8A]/50 text-[#38BDF8] border border-[#38BDF8]/40 font-bold uppercase tracking-wider">
                  Programa 3 • Gamificação
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#1E3A8A]/50 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white leading-snug">
                  "Níveis de Fidelidade"
                </h3>
                <p className="text-xs text-[#38BDF8] font-semibold mt-0.5">
                  Descontos progressivos a cada compra realizada
                </p>
              </div>

              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Quanto mais você e seus conhecidos mantêm a moto revisada com a Terrenotech, mais
                você economiza. Gamificação progressiva: cada pedido aumenta sua patente, liberando
                descontos automáticos crescentes em todo o catálogo.
              </p>

              {/* Tabela de Níveis */}
              <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#38BDF8] font-bold">
                  <Star className="w-3.5 h-3.5" />
                  <span>Escala Progressiva de Patentes:</span>
                </div>
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="flex justify-between items-center pb-1 border-b border-[#1E3A8A]/60">
                    <span className="text-white font-medium">1ª Compra (Novato da Pista)</span>
                    <span className="text-[#34D399] font-bold">5% de desconto de boas-vindas</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 border-b border-[#1E3A8A]/60">
                    <span className="text-white font-medium">2ª Compra (Piloto Ativo)</span>
                    <span className="text-[#38BDF8] font-bold">8% de desconto direto</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 border-b border-[#1E3A8A]/60">
                    <span className="text-white font-medium">3ª a 5ª Compra (Veterano)</span>
                    <span className="text-[#60A5FA] font-bold">12% + Brinde surpresa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">6ª+ Compra (Embaixador)</span>
                    <span className="text-[#FBBF24] font-bold">Preço de atacado + Frete VIP</span>
                  </div>
                </div>
              </div>

              {/* Passo a Passo Simples */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
                  Como acumular níveis:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38BDF8] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-[#A1A6B3]">
                      Compre com seu mesmo e-mail ou WhatsApp cadastrado.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38BDF8] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-[#A1A6B3]">
                      Nosso sistema computa cada entrega concluída com sucesso.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38BDF8] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-[#A1A6B3]">
                      Seus cupons e descontos crescem automaticamente a cada giro.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#0284C7] text-white hover:opacity-95 text-xs font-bold h-11"
            >
              <Link to="/">Ver produtos e iniciar 1ª compra</Link>
            </Button>
          </div>

          {/* PROGRAMA 4: ARREGO DAS MOTOQUEIRAS (Implementação Segura CDC) */}
          <div className="group relative bg-[#0B132B]/80 border border-[#1E3A8A] hover:border-[#F472B6]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-pill-sm text-[11px] bg-[#F472B6]/20 text-[#fbcfe8] border border-[#F472B6]/40 font-bold uppercase tracking-wider">
                  Programa 4 • Comunidade
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#F472B6]/20 border border-[#F472B6]/40 flex items-center justify-center text-[#F472B6] group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white leading-snug">
                  "Arrego das Motoqueiras"
                </h3>
                <p className="text-xs text-[#F472B6] font-semibold mt-0.5">
                  Comunidade de apoio & Kit Arrego na 1ª compra
                </p>
              </div>

              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                As mulheres enfrentam desafios dobrados no trânsito e na manutenção da moto. O
                Arrego é um espaço de apoio mútuo, troca de dicas de segurança, mecânica sem
                enrolação e condição especial de acolhida para quem participa da nossa rede.
              </p>

              {/* Benefício do Kit Arrego */}
              <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#F472B6] font-bold">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Benefício Kit Arrego na 1ª Compra:</span>
                </div>
                <p className="text-[#A1A6B3] leading-relaxed">
                  Ao ingressar na comunidade de motoqueiras, receba o{' '}
                  <strong className="text-white">Kit Arrego</strong>: cupom de{' '}
                  <strong className="text-[#34D399]">10% de desconto na primeira compra</strong> +{' '}
                  <strong className="text-white">brinde de segurança preventiva</strong> (balaclava
                  térmica UV50+ ou antena corta-pipa retrátil) enviado junto ao pedido.
                </p>
              </div>

              {/* Passo a Passo */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
                  Como participar:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F472B6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-[#A1A6B3]">
                      Entre no grupo da Comunidade das Motoqueiras via WhatsApp.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F472B6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-[#A1A6B3]">
                      Receba o código exclusivo do Kit Arrego de boas-vindas.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F472B6] text-[#0B0D12] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-[#A1A6B3]">
                      Aplique na 1ª compra de peças ou acessórios no app.
                    </span>
                  </div>
                </div>
              </div>

              {/* Nota de Governança & Operação */}
              <div className="bg-[#070F26] border border-[#1E3A8A] rounded-xl p-3 text-[11px] text-[#A1A6B3] space-y-1">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Scale className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Enquadramento Legal & Operação:</span>
                </div>
                <p>
                  Operação manual no lançamento via suporte. Benefício concedido por participação e
                  engajamento na comunidade (aberto a todos que aderirem às regras do grupo, com
                  foco nas necessidades reais das motoqueiras).
                </p>
              </div>
            </div>

            <Button
              onClick={() => setWhatsappModalOpen(true)}
              variant="outline"
              className="w-full rounded-full border-[#F472B6]/50 text-white hover:bg-[#F472B6]/20 text-xs font-bold h-11"
            >
              Participar da Comunidade Motoqueiras
            </Button>
          </div>
        </div>
      </div>

      {/* SEÇÃO DEDICADA: MOTOQ — A CARTA AO TOMBO (PROGRAMA TERRENOTECH) */}
      <section className="bg-gradient-to-br from-[#0B132B] via-[#0E1B3D] to-[#070F26] border-2 border-[#1E3A8A] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A8A]/50 border border-[#3B82F6]/50 text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
              MotoQ — Um Programa Terrenotech
            </div>
            <span className="badge-pill-sm text-[10px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold uppercase tracking-wider">
              Cultura de Segurança Preventiva
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">MotoQ — A Carta ao Tombo</h2>

          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            Todo motoqueiro que roda todo dia já foi pro chão ou conhece quem foi. O programa{' '}
            <strong className="text-white">MotoQ</strong> não trata a queda como vergonha, mas como
            ponto de virada: você escreve uma carta sincera contando a história do seu tombo, o que
            aprendeu e o <strong className="text-white">plano de ação prático</strong> para nunca
            mais repetir o erro. As cartas são avaliadas pela comunidade ao longo de ciclos de 6
            meses.
          </p>
        </div>

        {/* Bloco de Premiação com Nota Protetiva */}
        <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-5 sm:p-6 relative z-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#93C5FD] tracking-wider block">
                Premiação Oficial de Lançamento
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-[#FBBF24]" />
                Prêmio do ciclo: Kit de peças completo + Crédito Terrenotech
              </h3>
              <p className="text-xs text-[#A1A6B3] max-w-2xl leading-relaxed">
                A melhor história com plano de ação mais concreto e evolução demonstrada recebe um
                kit de reposição/manutenção completo para sua moto + saldo de compras na loja.
              </p>
            </div>

            <div className="bg-[#0B132B] p-4 rounded-xl border border-[#1E3A8A] shrink-0 min-w-[260px] space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#FBBF24] tracking-wider block">
                Ciclo Atual
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">6 Meses</span>
                <span className="text-xs text-[#A1A6B3]">(Avaliação contínua)</span>
              </div>
              <span className="text-[11px] text-[#34D399] font-medium block">
                Operação manual assistida no WhatsApp
              </span>
            </div>
          </div>

          {/* NOTA VISÍVEL PROTETIVA: MOTO NOVA É META DO FUNDO, NÃO PROMESSA PÚBLICA */}
          <div className="bg-[#101935] border border-[#FBBF24]/40 rounded-xl p-4 flex items-start gap-3 text-xs text-[#FDE68A] leading-relaxed">
            <AlertOctagon className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-0.5">
                Nota de Transparência & Governança Terrenotech:
              </p>
              <p className="text-[#D1D5DB]">
                <strong className="text-[#FDE68A]">Moto nova como prêmio:</strong> meta interna do
                fundo comunitário Terrenotech projetada para 6 a 12 meses — será oficialmente
                anunciada como prêmio somente após a garantia e integralização total do fundo
                financeiro. No lançamento, o prêmio público oficial e garantido é o kit de peças e
                crédito na loja.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de 4 Passos de Participação */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#38BDF8]" />
            Como participar do MotoQ em 4 passos:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-white">1. Escreva sua carta</h4>
              <p className="text-[#A1A6B3] leading-relaxed">
                Escreva o relato no grupo da comunidade ou envie diretamente pelo WhatsApp da
                Terrenotech. Seja direto e verdadeiro.
              </p>
            </div>

            <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-[#0284C7] text-white font-black text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-white">2. Plano de ação para o tombo</h4>
              <p className="text-[#A1A6B3] leading-relaxed">
                Conte o que causou o tombo (óleo, pressa, corredor cego, equipamento) e qual é seu
                plano concreto para não repetir.
              </p>
            </div>

            <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-[#34D399] text-[#0B0D12] font-black text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-white">3. Evolução mensal</h4>
              <p className="text-[#A1A6B3] leading-relaxed">
                Compartilhe fotos da moto recuperada, equipamentos novos e relatos mensais de rotina
                segura na pista.
              </p>
            </div>

            <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-[#F472B6] text-[#0B0D12] font-black text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-white">4. Avaliação em 6 meses</h4>
              <p className="text-[#A1A6B3] leading-relaxed">
                Ao término do ciclo, a banca comunitária avalia os relatos com base na tabela de
                critérios e entrega o prêmio oficial.
              </p>
            </div>
          </div>
        </div>

        {/* Tabela de Critérios de Avaliação */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#F472B6]" />
            Critérios de Avaliação das Cartas MotoQ:
          </h3>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B132B] text-[#93C5FD] border-b border-[#1E3A8A]">
                  <tr>
                    <th className="py-3 px-4 font-bold text-white">Critério</th>
                    <th className="py-3 px-4 font-bold text-white">Peso</th>
                    <th className="py-3 px-4 font-bold text-white">O que a banca avalia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A8A]/60 text-[#D1D5DB]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">
                      1. Honestidade e clareza do relato
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-pill-sm text-[11px] bg-[#1E3A8A]/50 text-[#93C5FD] border border-[#3B82F6]/50 font-bold">
                        25%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A6B3]">
                      Narrativa autêntica das circunstâncias reais do acidente, sem floreios ou
                      invenções.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">
                      2. Plano de ação concreto
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-pill-sm text-[11px] bg-[#0284C7]/30 text-[#38BDF8] border border-[#0284C7]/50 font-bold">
                        35%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A6B3]">
                      Medidas práticas adotadas: revisão da moto, uso de equipamento de proteção,
                      mudança de postura no corredor e velocidade segura.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">
                      3. Evolução comprovada na prática
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-pill-sm text-[11px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold">
                        25%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A6B3]">
                      Registros de que o plano foi seguido durante os 6 meses (moto mantida em
                      ordem, zero reincidência por imprudência).
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">
                      4. Engajamento em ajudar outros pilotos
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-pill-sm text-[11px] bg-[#F472B6]/20 text-[#fbcfe8] border border-[#F472B6]/40 font-bold">
                        15%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A6B3]">
                      Participação ativa nos grupos de suporte, alertando novos pilotos e
                      compartilhando aprendizados do asfalto.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 relative z-10 border-t border-[#1E3A8A]">
          <span className="text-xs text-[#93C5FD]">
            Quer mandar sua carta ou tirar dúvidas sobre o ciclo de 6 meses?
          </span>

          <Button
            onClick={() => setWhatsappModalOpen(true)}
            className="rounded-full bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0284C7] text-white font-extrabold text-xs px-6 h-11 shadow-lg shadow-[#1D4ED8]/30"
          >
            Enviar minha Carta ao Tombo pelo WhatsApp
          </Button>
        </div>
      </section>

      {/* BLOCO: RADAR DE AVALIAÇÃO DO DONO (Texto informativo interno de governança) */}
      <section className="bg-[#070F26] border-2 border-[#1E3A8A] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-[#38BDF8]" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Radar de Avaliação do Dono (Governança & Risco Comercial)
          </h3>
        </div>

        <p className="text-xs text-[#A1A6B3] leading-relaxed">
          Registro formal de validação crítica para as três iniciativas recentes do negócio. As
          estratégias foram implementadas na modelagem segura para garantir conformidade jurídica,
          saúde financeira e transparência operacional:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          {/* Item 1: MotoQ */}
          <div className="bg-[#0B132B] border border-[#1E3A8A] rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">1. Programa MotoQ</span>
              <span className="badge-pill-sm text-[10px] bg-[#1E3A8A]/50 text-[#93C5FD] border border-[#3B82F6]/50 font-bold">
                Status: Ativo seguro
              </span>
            </div>
            <p className="text-[#A1A6B3] leading-relaxed">
              <strong className="text-white">Nota de risco / Avaliação:</strong> Prêmio de moto nova
              NÃO deve ser prometido publicamente até a constituição e garantia comprovada de fundo
              de reserva próprio para 6 a 12 meses. O app comunica como meta interna e premia o
              ciclo inicial com kit de peças e crédito de loja.
            </p>
          </div>

          {/* Item 2: Foco 100% Nacional */}
          <div className="bg-[#0B132B] border border-[#34D399]/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">
                2. Foco 100% Peças Nacionais (Até 450cc em Duas Camadas)
              </span>
              <span className="badge-pill-sm text-[10px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold">
                Status: Distribuidoras BR
              </span>
            </div>
            <p className="text-[#A1A6B3] leading-relaxed">
              <strong className="text-white">Decisão estratégica:</strong> Saída completa de motos
              elétricas e importadores externos. Operação focada 100% em motopeças de reposição
              pronta entrega via distribuidoras brasileiras consolidadas (Laquila, MTO e Nacional)
              com garantia e marcas paralelas TOP de alta confiança.
            </p>
          </div>

          {/* Item 3: Arrego das Motoqueiras */}
          <div className="bg-[#0B132B] border border-[#F472B6]/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">3. Arrego das Motoqueiras</span>
              <span className="badge-pill-sm text-[10px] bg-[#F472B6]/20 text-[#fbcfe8] border border-[#F472B6]/40 font-bold">
                Status: Comunidade segura
              </span>
            </div>
            <p className="text-[#A1A6B3] leading-relaxed">
              <strong className="text-white">Nota de risco / Avaliação:</strong> Preço diferente por
              gênero pode configurar prática discriminatória pelo CDC. O benefício do Kit Arrego foi
              modelado por engajamento/participação comunitária, garantindo segurança jurídica total
              e acolhimento direto ao público feminino.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ RÁPIDO DO CLUBE MOTO-T */}
      <section className="bg-[#0B132B] border border-[#1E3A8A] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-[#60A5FA]" />
          <h3 className="text-lg font-bold text-white">Dúvidas Frequentes do Clube Moto-T</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Por que o nome mudou para Clube Moto-T?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Em homenagem à primeira moto do nosso fundador — uma lendária TT 125 azul-escura
              transformada em quase RX 125, que era um canhão em velocidade. "TT quer dizer todo
              terreno", acolhendo todo motociclista do Brasil, da CG à Dominar.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Como recebo os 50% de comissão da indicação?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              O valor fica acumulado na sua conta como saldo em reais. Você pode resgatar abatendo
              em qualquer compra de peças no catálogo para você ou emitindo vale-presente para
              outros motociclistas.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Quais peças entram no amparo de queda?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              As peças periféricas leves com alto índice de quebra em tombos: par de retrovisores,
              piscas/setas, manetes e manoplas. Peças de alto custo de motor entram com desconto de
              custo de atacado sem margem.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Preciso pagar alguma mensalidade no clube?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Zero reais. Não cobramos assinatura. O clube é uma comunidade comercial da Terrenotech
              onde quem compra e indica é beneficiado na prática.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Como é feita a validação manual?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Pelo WhatsApp oficial da Terrenotech. Nossa equipe de atendimento analisa o documento,
              carta ou pedido em até 2 horas em dias úteis.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Como funciona o prêmio do MotoQ?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              No lançamento, o participante vencedor do ciclo de 6 meses recebe um kit completo de
              peças de manutenção + créditos na Terrenotech. O prêmio de moto nova é uma meta em
              construção do fundo financeiro para 6-12 meses.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Quem tem direito ao Kit Arrego?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Qualquer pessoa que ingressar na nossa comunidade de apoio às motoqueiras ganha 10% de
              desconto na 1ª compra de peças/acessórios e um brinde de proteção preventiva enviado
              junto ao pedido.
            </p>
          </div>

          <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white">Motos de até 450cc também participam?</h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Sim! Todo o catálogo até 450cc (CB 300, Twister, Fazer 250, Lander, Dominar 400, etc.)
              participa igualmente das regras de indicação e pontuação de fidelidade.
            </p>
          </div>
        </div>
      </section>

      {/* Modal / Dialog de Contato WhatsApp (Placeholder Oficial) */}
      <Dialog open={whatsappModalOpen} onOpenChange={setWhatsappModalOpen}>
        <DialogContent className="bg-[#0B132B] border-[#1E3A8A] text-white sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 text-xs font-bold w-fit mb-1">
              <MessageCircle className="w-3.5 h-3.5" />
              Canal de Atendimento Oficial
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Falar com o Clube Moto-T
            </DialogTitle>
            <DialogDescription className="text-xs text-[#93C5FD]">
              Atendimento exclusivo para o Clube Moto-T, amparo de quedas e indicações:
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-[#070F26] border border-[#1E3A8A] rounded-2xl p-5 text-center space-y-2">
              <span className="text-[11px] uppercase font-bold text-[#93C5FD] tracking-wider block">
                WhatsApp Oficial Terrenotech • Clube Moto-T
              </span>
              <div className="inline-block bg-[#0B132B] px-4 py-2 rounded-xl border border-[#25D366]/50">
                <span className="font-mono text-base font-bold text-[#25D366]">
                  (Número oficial em ativação)
                </span>
              </div>
              <p className="text-xs text-[#A1A6B3] pt-1">
                Linha corporativa de suporte em processo final de habilitação de API. Durante o
                pré-lançamento, use este canal para registrar seu interesse.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#A1A6B3] bg-[#0E1B3D] p-3.5 rounded-xl border border-[#1E3A8A]">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                Como registrar sua indicação ou laudo hoje:
              </p>
              <p>1. Conclua o pedido normalmente pelo carrinho com seus dados completos.</p>
              <p>2. No campo de observações ou no retorno pós-venda, informe a ocorrência.</p>
              <p>3. Nossa equipe entrará em contato direto no telefone fornecido na entrega.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => setWhatsappModalOpen(false)}
              className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#0284C7] text-white font-bold px-6"
            >
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
