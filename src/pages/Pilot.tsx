import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Award,
  CheckCircle2,
  Circle,
  RotateCcw,
  Calendar,
  Target,
  TrendingUp,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
  ExternalLink,
  Users,
  MessageCircle,
  Share2,
  Sparkles,
  AlertTriangle,
  Github,
  Cloud,
  Copy,
  Check,
  Info,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MountainMotoLogo from '@/components/MountainMotoLogo'
import { ordersService, OrderRecord } from '@/services/orders'

interface PilotChecklistItem {
  id: string
  title: string
  description: string
  category:
    | 'Catálogo'
    | 'Preço'
    | 'Pitch'
    | 'Canais'
    | 'Pagamento'
    | 'Fornecedor'
    | 'Operação'
    | 'Métricas'
    | 'Decisão'
}

const PILOT_CHECKLIST_ITEMS: PilotChecklistItem[] = [
  {
    id: 'escolher-produtos',
    title: 'Escolher 3 a 5 produtos de reposição rápida do catálogo',
    description:
      'Focar estritamente nos itens de alta rotatividade: bateria em emergência, pneu traseiro (18 pol CG/Factor), kit relação reforçado com retentor, pastilha/lona de freio e capa de chuva reforçada.',
    category: 'Catálogo',
  },
  {
    id: 'validar-preco-mercado',
    title: 'Validar preço de venda vs. Mercado Livre e lojas locais',
    description:
      'Garantir que a Terrenotech fica competitiva entregando na porta ou direto na oficina, com margem bruta suficiente para cobrir frete e 50% de repasse ao Clube Moto-T.',
    category: 'Preço',
  },
  {
    id: 'montar-pitch-grupos',
    title: 'Montar pitch de 3 linhas para os grupos de motoboys',
    description:
      'Pitch direto de motoqueiro para motoqueiro: falar das peças que salvam a semana de trabalho, mencionar a procedência de marcas paralelas TOP (Cobreq, Vaz, Magnetron) e suporte rápido.',
    category: 'Pitch',
  },
  {
    id: 'definir-canais-postagem',
    title: 'Definir onde vai postar (WhatsApp / Facebook da região)',
    description:
      'Mapear 5 a 10 grupos de motoboys, entregadores de app e moto-clubes locais. Regra de ouro: apresentar-se como piloto e parceiro, não como anúncio frio corporativo.',
    category: 'Canais',
  },
  {
    id: 'forma-pagamento-pix',
    title: 'Definir forma de pagamento (Pix pessoal no piloto)',
    description:
      'Operar com Pix manual direto na conta pessoal do fundador durante os 30 dias de validação. Regra inegociável: só pagar o fornecedor após a compensação integral do Pix do cliente.',
    category: 'Pagamento',
  },
  {
    id: 'alinhar-fornecedor-avulso',
    title: 'Combinar com distribuidora/fornecedor compra avulsa sem CNPJ',
    description:
      'Contatar parceiros ou distribuidores que aceitam compras pontuais como consumidor final para teste de homologação ou usar fornecedores web diretos até obter o CNPJ formal.',
    category: 'Fornecedor',
  },
  {
    id: 'rodar-30-dias',
    title: 'Rodar o piloto de 2 a 4 semanas (limite de 30 dias)',
    description:
      'Período focado exclusivamente em ouvir dores reais, registrar objeções de compra e medir o interesse real dos motoqueiros antes de incorrer em custos contábeis de abertura.',
    category: 'Operação',
  },
  {
    id: 'registrar-painel-pedidos',
    title: 'Registrar cada pedido no Painel de Pedidos do app',
    description:
      'Alimentar a plataforma em /pedidos para manter histórico de dados, monitorar o status (Pendente / Em andamento / Concluído) e calcular o lucro líquido em tempo real.',
    category: 'Operação',
  },
  {
    id: 'medir-funil-validacao',
    title: 'Medir: quantos perguntaram, quantos fecharam e item top',
    description:
      'Acompanhar a conversão de interessados vs. compradores pagantes e identificar qual foi o produto campeão que puxou a demanda.',
    category: 'Métricas',
  },
  {
    id: 'decisao-go-no-go',
    title: 'Decidir go / no-go: meta de ≥ 20 pedidos firmes em 30 dias',
    description:
      'Se bater 20+ pedidos firmes, seguir imediatamente para a abertura formal do CNPJ ME no Simples Nacional. Abaixo disso, reavaliar produtos, preço ou abordagem antes de gastar.',
    category: 'Decisão',
  },
]

interface PilotMetaState {
  targetDate: string
  targetOrders: number
  targetRevenue: number
}

const DEFAULT_META: PilotMetaState = {
  targetDate: '2025-04-15',
  targetOrders: 20,
  targetRevenue: 3000,
}

export default function Pilot() {
  // Checklist interativo persistido em localStorage
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('terrenotech_pilot_checklist')
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn('Erro ao ler terrenos_pilot_checklist:', e)
    }
    return {}
  })

  // Meta de lançamento interativa persistida em localStorage
  const [meta, setMeta] = useState<PilotMetaState>(() => {
    try {
      const stored = localStorage.getItem('terrenotech_pilot_meta')
      if (stored) return { ...DEFAULT_META, ...JSON.parse(stored) }
    } catch (e) {
      console.warn('Erro ao ler terrenotech_pilot_meta:', e)
    }
    return DEFAULT_META
  })

  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [copiedPitch, setCopiedPitch] = useState(false)

  // Salvar checklist
  useEffect(() => {
    try {
      localStorage.setItem('terrenotech_pilot_checklist', JSON.stringify(checklist))
    } catch (e) {
      console.warn('Erro ao salvar terrenotech_pilot_checklist:', e)
    }
  }, [checklist])

  // Salvar meta
  useEffect(() => {
    try {
      localStorage.setItem('terrenotech_pilot_meta', JSON.stringify(meta))
    } catch (e) {
      console.warn('Erro ao salvar terrenotech_pilot_meta:', e)
    }
  }, [meta])

  // Carregar pedidos reais do painel para conectar a barra de progresso
  useEffect(() => {
    let isMounted = true
    const fetchOrders = async () => {
      try {
        const list = await ordersService.listOrders()
        if (isMounted) {
          setOrders(list)
        }
      } catch (err) {
        console.error('Erro ao buscar pedidos para o piloto:', err)
      }
    }
    fetchOrders()
    return () => {
      isMounted = false
    }
  }, [])

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const resetChecklist = () => {
    setChecklist({})
  }

  const completedCount = Object.values(checklist).filter(Boolean).length
  const totalChecklist = PILOT_CHECKLIST_ITEMS.length
  const checklistPercentage = Math.round((completedCount / totalChecklist) * 100)

  // Progresso dos pedidos reais vs meta
  const actualOrdersCount = orders.length
  const actualRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0)
  const targetOrdersSafe = meta.targetOrders > 0 ? meta.targetOrders : 20
  const ordersProgressPercent = Math.min(
    100,
    Math.round((actualOrdersCount / targetOrdersSafe) * 100),
  )

  const samplePitch =
    'Fala, pilotos! Tô montando a Terrenotech pra puxar reposição direta pra nós de CG e Factor sem a facada da concessionária (pastilha Cobreq, kit Vaz com retentor e bateria com garantia). Quem tiver precisando de peça pra semana, me chama no Pix que repasso direto do distribuidor!'

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(samplePitch)
    setCopiedPitch(true)
    setTimeout(() => setCopiedPitch(false), 2500)
  }

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-[#22D3EE]/30 p-6 sm:p-10 bg-gradient-to-br from-[#121826] via-[#0F1420] to-[#0B0D12] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#22D3EE]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-bold uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                Validação de Demanda • Pré-CNPJ
              </div>
              <span className="text-[11px] text-[#A1A6B3] bg-[#0B0D12]/80 px-2.5 py-1 rounded-full border border-[#232B3A]">
                Fase de Teste Operacional de 30 Dias
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Piloto: vender antes de <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#34D399] bg-clip-text text-transparent">
                abrir a empresa
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-3xl">
              Sondar aceite real nos grupos de motoqueiros com pedidos manuais (Pix pessoal, repasse
              ao fornecedor), sem gastar com CNPJ nem anúncios pagos. Se houver demanda comprovada,
              a empresa nasce já com clientes na porta.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#A1A6B3]">
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span className="text-white font-medium">Caixa Nunca Negativo</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                <span className="text-white font-medium">Meta: ≥ 20 pedidos firmes</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span className="text-white font-medium">R$ 0 em Anúncios Pagos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full bg-[#151923] border border-[#232B3A] rounded-2xl p-5 space-y-4 text-center shadow-xl">
              <MountainMotoLogo
                variant="icon"
                className="w-16 h-16 mx-auto rounded-2xl shadow-lg shadow-[#22D3EE]/20"
              />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Piloto Terrenotech</h3>
                <p className="text-xs text-[#A1A6B3]">
                  Validação direta de rua • Morro Fortaleza/RS
                </p>
              </div>

              <div className="p-3 bg-[#0B0D12] rounded-xl border border-[#232B3A] text-left text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A6B3]">Critério de Decisão:</span>
                  <span className="font-bold text-[#34D399]">Go / No-Go</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A6B3]">Pedidos no Painel:</span>
                  <span className="font-bold text-white">{actualOrdersCount} pedidos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A6B3]">Meta de Validação:</span>
                  <span className="font-bold text-[#22D3EE]">{targetOrdersSafe} pedidos</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-black text-xs shadow-md shadow-[#8B5CF6]/30"
              >
                <Link to="/pedidos">Ver Painel de Pedidos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 1: O QUE É ESTE PILOTO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#22D3EE] uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" />
              Seção 1 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              O Que É Este Piloto
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Os parâmetros essenciais do teste de validação de demanda no mundo real.
            </p>
          </div>
          <span className="text-xs text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Critérios Fixos de Referência
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Duração e Foco */}
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Duração: 2 a 4 semanas</h3>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                O piloto é um teste rápido (até 30 dias). O objetivo exclusivo é{' '}
                <strong className="text-white">validar o aceite real</strong> (se as pessoas fazem
                perguntas, pedem orçamentos e confirmam compra), e{' '}
                <strong className="text-[#F87171]">NÃO faturar alto</strong> agora.
              </p>
            </div>
            <div className="pt-2 border-t border-[#232B3A] text-[11px] text-[#22D3EE] font-semibold">
              Período de sondagem sem complicação
            </div>
          </div>

          {/* Card 2: Regra de Ouro */}
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399]">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Regra de Ouro: Caixa Protegido</h3>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                <strong className="text-[#34D399]">
                  Só comprar do fornecedor DEPOIS de o cliente pagar via Pix.
                </strong>{' '}
                O caixa nunca fica negativo por construção. Você nunca antecipa dinheiro do bolso
                nem faz estoque adivinhando o que vai vender.
              </p>
            </div>
            <div className="pt-2 border-t border-[#232B3A] text-[11px] text-[#34D399] font-semibold">
              Zero risco financeiro de capital imobilizado
            </div>
          </div>

          {/* Card 3: Critério Go / No-Go */}
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Critério Objetivo: Go / No-Go</h3>
              <div className="space-y-2 text-xs text-[#A1A6B3]">
                <div className="p-2 rounded-lg bg-[#151923] border border-[#34D399]/30 text-[#E2E8F0]">
                  <strong className="text-[#34D399]">≥ 20 pedidos firmes em 30 dias:</strong> Segue
                  imediatamente para a abertura formal do CNPJ ME. Demanda provada!
                </div>
                <div className="p-2 rounded-lg bg-[#151923] border border-[#F87171]/30 text-[#E2E8F0]">
                  <strong className="text-[#F87171]">&lt; 20 pedidos firmes:</strong> Ajustar mix,
                  marcas, modelo de entrega ou preço antes de gastar com contador.
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#232B3A] text-[11px] text-[#C4B5FD] font-semibold">
              Decisão baseada em números, sem emoção
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: O PILOTO É LEGAL? */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FBBF24] uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              Seção 2 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              O Piloto é Legal?
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Avaliação sincera e prudente sobre a operação inicial como pessoa física.
            </p>
          </div>
          <span className="text-xs text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Orientação Prudencial
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-[#FBBF24]">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-white text-base">
                  Validação Eventual vs. Operação Habitual
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
                Vender como pessoa física de forma eventual e por curto período para testar demanda
                de mercado é uma prática comum de validação no ecossistema de startups e novos
                negócios. Entretanto,{' '}
                <strong className="text-white">
                  para operar de forma contínua e regular, será indispensável a abertura de CNPJ
                </strong>{' '}
                e a emissão correspondente de Nota Fiscal eletrônica (NF-e).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#34D399]">
                  Durante o Piloto (Até 30 dias)
                </span>
                <p className="text-[#D1D5DB] leading-relaxed">
                  Volume baixo de teste, Pix manual e verificação se o público confia. NF-e regular
                  fica para a fase seguinte.
                </p>
              </div>

              <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#22D3EE]">
                  Após a Validação (Go)
                </span>
                <p className="text-[#D1D5DB] leading-relaxed">
                  Abertura imediata da Microempresa (ME) no Simples Nacional com contador para
                  emissão de NF-e e compras formais B2B.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#34D399]" />
              Cláusula de Prudência
            </h4>
            <p className="text-[#A1A6B3] leading-relaxed">
              Este aplicativo não substitui parecer contábil ou jurídico definitivo. O consenso de
              prudência recomenda que o piloto não ultrapasse 30 dias e que a formalização fiscal
              acompanhe imediatamente a comprovação do volume.
            </p>
            <div className="p-2.5 rounded-lg bg-[#151923] border border-[#232B3A] text-[11px] text-[#A1A6B3]">
              <strong className="text-white">Lembrete:</strong> Distribuidoras oficiais de grande
              porte (Laquila, MTO, Nacional) só liberam tabela oficial B2B com CNPJ ativo.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: MARCA E PROTEÇÃO (INPI) — ANTES DO CNPJ */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              Seção 3 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Marca e Proteção (INPI) — Antes do CNPJ
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              O registro no Instituto Nacional da Propriedade Industrial pode (e deve) ser feito
              como Pessoa Física.
            </p>
          </div>
          <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Tabela Vigente INPI (2025/2026)
          </span>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 text-[#C4B5FD] flex items-center justify-center font-bold">
                ®
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  Por que registrar antes de soltar o grito nos grupos?
                </h3>
                <p className="text-xs text-[#A1A6B3]">
                  No Brasil vigora o princípio da anterioridade:{' '}
                  <strong className="text-white">quem protocola primeiro é o dono da marca</strong>.
                  Quando a Terrenotech começar a ser divulgada em grupos com centenas de
                  motoqueiros, o nome vira ativo público. Se alguém registrar na frente, você perde
                  o domínio, a identidade visual e a história construída.
                </p>
              </div>
            </div>
          </div>

          {/* Cards com Pílulas de Preço */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0B0D12] border border-[#8B5CF6]/40 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B5CF6]/10 rounded-bl-full pointer-events-none" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C4B5FD]">
                  Pessoa Física / ME / EPP
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-white">R$ 440,00</span>
                  <span className="text-xs text-[#34D399] font-bold">50% de desconto</span>
                </div>
                <span className="text-[11px] text-[#A1A6B3] block">
                  Por classe (com especificação pré-aprovada)
                </span>
              </div>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Desde set/2025,{' '}
                <strong className="text-white">o valor da entrada já inclui o certificado</strong>{' '}
                de registro (sem taxa adicional no deferimento para o primeiro decênio).
              </p>
            </div>

            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A6B3]">
                  Tarifa Padrão (Sem Desconto)
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#A1A6B3]">R$ 880,00</span>
                  <span className="text-xs text-[#A1A6B3]">valor cheio</span>
                </div>
                <span className="text-[11px] text-[#A1A6B3] block">
                  Grandes empresas e sem benefício legal
                </span>
              </div>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Tarifa geral para sociedades anônimas e empresas que não se enquadram nas regras de
                porte do Simples ou pessoa física.
              </p>
            </div>

            <div className="bg-[#0B0D12] border border-[#34D399]/40 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#34D399]">
                  Hipossuficientes & PcD
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#34D399]">R$ 0,00</span>
                  <span className="text-xs text-[#34D399] font-bold">100% de isenção</span>
                </div>
                <span className="text-[11px] text-[#A1A6B3] block">
                  Gratuidade legal nos serviços de entrada
                </span>
              </div>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Pessoas físicas hipossuficientes e PcD têm isenção integral da taxa de protocolo
                conforme resolução vigente do INPI.
              </p>
            </div>
          </div>

          {/* Classes Recomendadas */}
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] font-bold text-xs">
                  Classe 35: Comércio & Vendas Online (Essencial)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/40 text-[#22D3EE] font-bold text-xs">
                  Classe 12: Peças & Acessórios Veiculares (Recomendável)
                </span>
              </div>
              <p className="text-[#A1A6B3] pt-1">
                Para o início, protocolar na <strong className="text-white">Classe 35</strong>{' '}
                protege a loja virtual Terrenotech. Posteriormente ou em conjunto, cobrir a Classe
                12 protege a marca em produtos próprios.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#8B5CF6]/50 bg-transparent hover:bg-[#8B5CF6]/20 text-white text-xs shrink-0"
            >
              <a
                href="https://www.gov.br/inpi/pt-br/servicos/marcas"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5"
              >
                <span>Acessar Portal INPI</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: CHECKLIST DO PILOTO (INTERATIVO) */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232B3A] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Seção 4 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Checklist do Piloto
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0B0D12] text-[#34D399] border border-[#232B3A]">
                {completedCount} de {totalChecklist} concluídos
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Marque cada etapa executada na vida real. Salvo automaticamente no seu navegador.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {completedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetChecklist}
                className="text-xs rounded-full border-[#232B3A] bg-[#0B0D12] hover:bg-[#1B212D] text-[#A1A6B3] hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Desmarcar todos
              </Button>
            )}
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#A1A6B3] font-medium">Progresso da Execução do Piloto</span>
            <span className="font-bold text-white font-tabular">
              {checklistPercentage}% concluído
            </span>
          </div>
          <div className="w-full h-3 bg-[#0B0D12] rounded-full overflow-hidden p-0.5 border border-[#232B3A]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#34D399] transition-all duration-500 ease-out"
              style={{ width: `${checklistPercentage}%` }}
            />
          </div>
        </div>

        {/* Itens do Checklist */}
        <div className="space-y-3 pt-2">
          {PILOT_CHECKLIST_ITEMS.map((item, index) => {
            const isDone = !!checklist[item.id]
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start gap-4 ${
                  isDone
                    ? 'bg-[#10B981]/10 border-[#10B981]/40 opacity-90'
                    : 'bg-[#0B0D12] border-[#232B3A] hover:border-[#22D3EE]/50 hover:bg-[#0e121b]'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-lg bg-[#10B981] text-[#0B0D12] flex items-center justify-center shadow-md shadow-[#10B981]/30">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg border-2 border-[#A1A6B3]/40 flex items-center justify-center hover:border-[#22D3EE]">
                      <Circle className="w-3.5 h-3.5 text-transparent" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#151923] border border-[#232B3A] text-[#22D3EE]">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#A1A6B3]">Passo {index + 1}</span>
                    {isDone && (
                      <span className="text-[10px] font-bold uppercase text-[#34D399] bg-[#34D399]/20 px-2 py-0.5 rounded-full border border-[#34D399]/40">
                        Executado
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-bold transition-all ${
                      isDone ? 'line-through text-[#A1A6B3]' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A1A6B3] leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SEÇÃO 5: COMO RODAR SEM ERP COMPLETO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#22D3EE] uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              Seção 5 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Como Rodar Sem ERP Completo
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Matriz honesta: o que o Terrenotech já resolve com perfeição hoje vs. o que fica para
              depois do piloto.
            </p>
          </div>
          <span className="text-xs text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Backlog Consciente & Sem Ilusão
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna 1: JÁ TEM NO APP */}
          <div className="bg-[#0B0D12] border border-[#34D399]/40 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#34D399] border-b border-[#232B3A] pb-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-bold text-white">
                Coberto Pelo App (Pronto para o Piloto)
              </h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#D1D5DB]">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Catálogo Completo:</strong> produtos com foto real,
                  compatibilidade até 450cc em duas camadas, preço de venda, custo estimado e margem
                  unitária.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Carrinho & Confirmação:</strong> fluxo de pedido
                  com dados de entrega, resumo e página de confirmação.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Painel de Pedidos (/pedidos):</strong> gestão de
                  status (Pendente, Em andamento, Concluído) e código de rastreamento.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Estatísticas de Giro (/analises):</strong>{' '}
                  velocidade de venda por produto e cálculo da margem líquida por pedido.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Plano de Voo (/analises/plano):</strong> cenários
                  Pessimista, Realista e Otimista e cálculo de break-even.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Filão da Queda (/analises/queda):</strong> as 8
                  peças críticas de reposição e Kit Queda de alta conversão.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Programas do Clube & Roteiro:</strong> regras do
                  Clube Moto-T (50% margem em produto) e Roteiro do Fundador.
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna 2: FICA PARA DEPOIS */}
          <div className="bg-[#0B0D12] border border-[#F87171]/40 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#F87171] border-b border-[#232B3A] pb-3">
              <Clock className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-bold text-white">
                Fica Para Depois do Piloto (Backlog ERP)
              </h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#D1D5DB]">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Financeiro & Conciliação Real:</strong> extrato de
                  entradas e saídas de conta bancária PJ (no piloto, o extrato Pix manual basta).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Emissão de NF-e:</strong> integração com SEFAZ via
                  FocusNFe ou eNotas (depende da constituição formal do CNPJ ME).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Gestão de Estoque Físico:</strong> desnecessária no
                  modelo dropshipping puro (o fornecedor armazena e expede).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">
                    Cálculo de Frete Automatizado (Melhor Envio):
                  </strong>{' '}
                  no piloto, o frete é cotado ou embutido de forma fixa no preço.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Gateway de Pagamento Online & Cupons:</strong> Pix
                  direto com comprovante reduz custos de intermediação de taxas no teste.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#F87171] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Integração API com Distribuidor:</strong> pedidos
                  repassados manualmente via WhatsApp ou painel B2B com segurança.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: META DE LANÇAMENTO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#22D3EE] uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" />
              Seção 6 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Meta de Lançamento
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Defina suas metas editáveis. A barra de progresso lê automaticamente os pedidos reais
              cadastrados no Painel.
            </p>
          </div>
          <span className="text-xs text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Salvo em localStorage
          </span>
        </div>

        {/* Formulário Editável das Metas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-[#A1A6B3] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
              Data-Alvo do Piloto
            </label>
            <Input
              type="date"
              value={meta.targetDate}
              onChange={(e) => setMeta((prev) => ({ ...prev, targetDate: e.target.value }))}
              className="bg-[#151923] border-[#232B3A] text-white text-sm rounded-xl focus:border-[#22D3EE]"
            />
            <p className="text-[11px] text-[#A1A6B3]">
              Prazo final de 30 dias para avaliar o go/no-go.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-[#A1A6B3] uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Meta de Pedidos
            </label>
            <Input
              type="number"
              min="1"
              value={meta.targetOrders}
              onChange={(e) =>
                setMeta((prev) => ({
                  ...prev,
                  targetOrders: Math.max(1, parseInt(e.target.value, 10) || 1),
                }))
              }
              className="bg-[#151923] border-[#232B3A] text-white text-sm rounded-xl focus:border-[#8B5CF6]"
            />
            <p className="text-[11px] text-[#A1A6B3]">
              Critério de referência padrão: ≥ 20 pedidos firmes.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-[#A1A6B3] uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#34D399]" />
              Meta de Faturamento (R$)
            </label>
            <Input
              type="number"
              min="100"
              step="50"
              value={meta.targetRevenue}
              onChange={(e) =>
                setMeta((prev) => ({
                  ...prev,
                  targetRevenue: Math.max(0, parseFloat(e.target.value) || 0),
                }))
              }
              className="bg-[#151923] border-[#232B3A] text-white text-sm rounded-xl focus:border-[#34D399]"
            />
            <p className="text-[11px] text-[#A1A6B3]">
              Volume de vendas brutas para atestar liquidez.
            </p>
          </div>
        </div>

        {/* Barra de Progresso Real vs Meta */}
        <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Progresso Real de Pedidos no Painel</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#151923] text-[#22D3EE] border border-[#232B3A]">
                  {actualOrdersCount} de {targetOrdersSafe} pedidos ({ordersProgressPercent}%)
                </span>
              </h4>
              <p className="text-xs text-[#A1A6B3]">
                Faturamento acumulado registrado no app:{' '}
                <strong className="text-white">
                  {actualRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>{' '}
                de{' '}
                <span className="text-[#A1A6B3]">
                  {meta.targetRevenue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-xs text-[#22D3EE] shrink-0"
            >
              <Link to="/pedidos">Registrar Novo Pedido</Link>
            </Button>
          </div>

          <div className="w-full h-4 bg-[#151923] rounded-full overflow-hidden p-0.5 border border-[#232B3A]">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                ordersProgressPercent >= 100
                  ? 'bg-[#10B981]'
                  : 'bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#34D399]'
              }`}
              style={{ width: `${ordersProgressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#A1A6B3]">
            <span>Início (0 pedidos)</span>
            <span className="font-semibold text-[#34D399]">
              {ordersProgressPercent >= 100
                ? '🎉 Meta de validação alcançada! Sinal verde para abrir o CNPJ.'
                : `Faltam ${Math.max(0, targetOrdersSafe - actualOrdersCount)} pedidos para o Go formal`}
            </span>
            <span>Meta: {targetOrdersSafe} pedidos</span>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: ONDE SOLTAR O GRITO (MARKETING DO PILOTO, R$ 0) */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F472B6] uppercase tracking-wider mb-1">
              <Share2 className="w-4 h-4" />
              Seção 7 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Onde Soltar o Grito (Marketing R$ 0)
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Estratégia 100% orgânica sem anúncio pago. Anúncio só depois que o piloto validar.
            </p>
          </div>
          <span className="text-xs text-[#F472B6] bg-[#F472B6]/10 border border-[#F472B6]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Custo Zero de Aquisição
          </span>
        </div>

        {/* Pitch Prático com Botão de Copiar */}
        <div className="bg-[#0B0D12] border border-[#8B5CF6]/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              Sugestão de Pitch de 3 Linhas para Grupos:
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyPitch}
              className="text-xs rounded-full border-[#8B5CF6]/40 bg-[#151923] hover:bg-[#8B5CF6]/20 text-[#C4B5FD] h-8"
            >
              {copiedPitch ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-[#34D399]" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copiar Texto
                </>
              )}
            </Button>
          </div>
          <blockquote className="p-3 bg-[#151923] border-l-4 border-[#22D3EE] rounded-r-xl text-xs sm:text-sm text-[#F4F5F7] italic leading-relaxed">
            "{samplePitch}"
          </blockquote>
        </div>

        {/* Lista Priorizada de Canais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-[#22D3EE]">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                1. Grupos de WhatsApp & Facebook Regionais
              </h3>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              Mapear grupos de motoboys e entregadores de CG 160 e Factor da região.{' '}
              <strong className="text-white">
                Regra de ouro: apresente-se como motoqueiro, não como loja fria corporativa.
              </strong>{' '}
              Conte a história Terrenotech e a inspiração da moto no cume do Morro Fortaleza.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-[#F472B6]">
              <Users className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">2. Boca a Boca com o Clube Moto-T</h3>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              Ative a regra do Clube Moto-T ({' '}
              <strong className="text-[#60A5FA]">50% da margem líquida em produtos</strong> para
              quem indicar colegas de pista). Um motoboy satisfeito traz o ponto de apoio inteiro.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-[#8B5CF6]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                3. Instagram Reels & TikTok das Peças
              </h3>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              Vídeos curtos mostrando o desgaste de peças (coroa gasta, pastilha no ferro) e a
              substituição preventiva com peças paralelas de primeira linha, com o link do app na
              bio.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-[#34D399]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                4. Autoridade Técnica respondendo dúvidas
              </h3>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              Participar das conversas ajudando com medidas de pneu, compatibilidade de relação e
              regulagem de freio. A venda surge como consequência natural de quem entende do que
              fala.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0D12] border border-[#F87171]/40 flex items-center gap-3 text-xs text-[#A1A6B3]">
          <ShieldAlert className="w-5 h-5 text-[#F87171] shrink-0" />
          <p>
            <strong className="text-white">Atenção com tráfego pago:</strong> Anúncios no Meta Ads
            ou Google Ads estão expressamente proibidos nesta fase. Sem o CNPJ ativo e a estrutura
            completa de frete, o custo por clique corroerá o caixa sem garantir conversão.
          </p>
        </div>
      </section>

      {/* SEÇÃO 8: INFRAESTRUTURA & HOSPEDAGEM EM NUVEM */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A1A6B3] uppercase tracking-wider mb-1">
              <Cloud className="w-4 h-4" />
              Seção 8 de 8
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Infraestrutura & Hospedagem em Nuvem
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Informações técnicas neutras e transparentes para a gestão do dono.
            </p>
          </div>
          <span className="text-xs text-white bg-[#0B0D12] border border-[#232B3A] px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Hospedagem & Independência
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Hospedagem Contínua</h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              O site da Terrenotech roda hospedado com alta performance em nuvem (banco de dados em
              tempo real, backend e interface web) e opera de forma autônoma.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
              <Github className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Código 100% Exportável</h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              O código-fonte completo (React + TypeScript + Vite) pertence ao fundador. Recomenda-se
              manter o repositório GitHub sincronizado para backup contínuo e independência futura
              total.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399]">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Gestão de Conta & Painel</h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              Os dados de acesso, banco de dados e domínio customizado são gerenciados diretamente
              no painel administrativo pelo proprietário da conta, sem dependências externas.
            </p>
          </div>
        </div>
      </section>

      {/* RODAPÉ DO PILOTO COM ATALHO */}
      <section className="bg-gradient-to-r from-[#1B1429] via-[#151923] to-[#0E1524] border border-[#232B3A] rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white">Próximo Passo Estratégico</h4>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Confira o cronograma completo das fases e as decisões tomadas no Roteiro do
                Fundador.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-[#0B0D12] font-black px-5 text-xs shadow-md shadow-[#22D3EE]/30"
            >
              <Link to="/roteiro" className="flex items-center gap-1.5">
                <span>Ir para o Roteiro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
