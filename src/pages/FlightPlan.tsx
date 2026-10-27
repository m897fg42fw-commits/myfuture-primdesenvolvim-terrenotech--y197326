import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Layers,
  Calendar,
  Sparkles,
  Info,
  DollarSign,
  PackageCheck,
  HelpCircle,
  Zap,
  Map,
  Hourglass,
} from 'lucide-react'
import { DEMO_PRODUCTS } from '@/lib/demoProducts'
import { Button } from '@/components/ui/button'

export default function FlightPlan() {
  // Catálogo completo para derivar as métricas do mix novo
  const allProducts = useMemo(() => DEMO_PRODUCTS, [])

  // Métricas derivadas do catálogo completo com premissa de cesta de 2 itens
  const metrics = useMemo(() => {
    const totalSale = allProducts.reduce((acc, p) => acc + p.price, 0)
    const totalCost = allProducts.reduce((acc, p) => acc + p.supplierCost, 0)
    const avgSingleItemSale = totalSale / allProducts.length
    const avgSingleItemCost = totalCost / allProducts.length

    // Premissa estratégica da cesta: 2 itens por pedido médio
    const itemsPerOrder = 2
    const avgOrderSale = avgSingleItemSale * itemsPerOrder // ~R$ 152
    const avgOrderCost = avgSingleItemCost * itemsPerOrder // ~R$ 92
    const avgOrderGrossProfit = avgOrderSale - avgOrderCost
    const avgMarginPct = ((totalSale - totalCost) / totalSale) * 100 // ~39.4%

    return {
      count: allProducts.length,
      avgSingleItemSale,
      avgOrderSale,
      avgOrderCost,
      avgOrderGrossProfit,
      avgMarginPct,
      itemsPerOrder,
    }
  }, [allProducts])

  // Estado interativo para simulação rápida (intervalo ajustado para mix novo: R$ 80 a R$ 400)
  const [customOrdersPerMonth, setCustomOrdersPerMonth] = useState<number>(100)
  const [customTicket, setCustomTicket] = useState<number>(Math.round(metrics.avgOrderSale))
  const [customMarginPct, setCustomMarginPct] = useState<number>(Math.round(metrics.avgMarginPct))
  const [customFixedCost, setCustomFixedCost] = useState<number>(850)

  // Cálculo da simulação interativa
  const simRevenue = customOrdersPerMonth * customTicket
  const simGrossMargin = simRevenue * (customMarginPct / 100)
  const simNetProfit = simGrossMargin - customFixedCost

  // Ponto de equilíbrio com o novo mix de cesta (2 itens: margem bruta ~R$ 60 por pedido)
  // Custo fixo base R$ 400 / Margem bruta ~R$ 60 = ~7 pedidos/mês
  const breakEvenFixedCost = 400
  const breakEvenMarginPerOrder = metrics.avgOrderGrossProfit > 0 ? metrics.avgOrderGrossProfit : 60
  const breakEvenOrders = Math.ceil(breakEvenFixedCost / breakEvenMarginPerOrder) // ~7 pedidos

  // Cronograma Ramp-up de 12 meses recalculado com cesta de 2 itens (ticket ~R$ 150, margem ~40%)
  const rampUpMonths = [
    {
      month: 1,
      phase: 'Fase 1: Entrada',
      phaseDesc: 'Grupos WhatsApp & Instagram',
      ordersPerDay: '1 ped/dia',
      ordersMonth: 25,
      revenue: 3750,
      grossProfit: 1500,
      fixedCost: 400,
      netProfit: 1100,
      color: '#8B5CF6',
      progressPct: 15,
      highlight: 'Validação da operação e 1º repasse com cesta de 2 itens',
    },
    {
      month: 2,
      phase: 'Fase 1: Entrada',
      phaseDesc: 'Grupos locais & oficinas parceiras',
      ordersPerDay: '1.5 ped/dia',
      ordersMonth: 40,
      revenue: 6000,
      grossProfit: 2400,
      fixedCost: 400,
      netProfit: 2000,
      color: '#8B5CF6',
      progressPct: 24,
      highlight: 'Break-even superado na 1ª semana do mês 2',
    },
    {
      month: 3,
      phase: 'Fase 1: Entrada',
      phaseDesc: 'Rede inicial com primeiras indicações',
      ordersPerDay: '2 ped/dia',
      ordersMonth: 60,
      revenue: 9000,
      grossProfit: 3600,
      fixedCost: 450,
      netProfit: 3150,
      color: '#8B5CF6',
      progressPct: 35,
      highlight: 'Combos e vestuário elevando o faturamento sem esforço extra',
    },
    {
      month: 4,
      phase: 'Fase 2: Clube',
      phaseDesc: 'Clube Moto-T rodando ativo',
      ordersPerDay: '3 ped/dia',
      ordersMonth: 90,
      revenue: 13680,
      grossProfit: 5472,
      fixedCost: 750,
      netProfit: 4722,
      color: '#22D3EE',
      progressPct: 50,
      highlight: 'Programa 50% de margem gerando rede e recompra de pneu',
    },
    {
      month: 5,
      phase: 'Fase 2: Clube',
      phaseDesc: 'Indicações de motoboys & entregadores',
      ordersPerDay: '4 ped/dia',
      ordersMonth: 120,
      revenue: 18240,
      grossProfit: 7296,
      fixedCost: 1100,
      netProfit: 6196,
      color: '#22D3EE',
      progressPct: 65,
      highlight: 'Recompra rápida de óleo, baterias e kits de revisão',
    },
    {
      month: 6,
      phase: 'Fase 2: Clube',
      phaseDesc: 'Maturidade do clube e laudos de amparo',
      ordersPerDay: '5 ped/dia',
      ordersMonth: 150,
      revenue: 22800,
      grossProfit: 9120,
      fixedCost: 1500,
      netProfit: 7620,
      color: '#22D3EE',
      progressPct: 75,
      highlight: 'Cenário Realista batido com R$ 7.6k/mês líquido',
    },
    {
      month: 7,
      phase: 'Fase 3: Escala',
      phaseDesc: 'Cadastro distribuidoras homologado',
      ordersPerDay: '7 ped/dia',
      ordersMonth: 210,
      revenue: 32550,
      grossProfit: 13020,
      fixedCost: 2100,
      netProfit: 10920,
      color: '#10B981',
      progressPct: 82,
      highlight: 'CNPJ ativo comprando direto no atacado com tabela de revenda',
    },
    {
      month: 8,
      phase: 'Fase 3: Escala',
      phaseDesc: 'Catálogo completo + anúncios leves',
      ordersPerDay: '9 ped/dia',
      ordersMonth: 270,
      revenue: 41850,
      grossProfit: 16740,
      fixedCost: 2600,
      netProfit: 14140,
      color: '#10B981',
      progressPct: 88,
      highlight: 'Margens melhores nas distribuidoras BR e combos em alta',
    },
    {
      month: 9,
      phase: 'Fase 3: Escala',
      phaseDesc: 'Parcerias com associações de motoboy',
      ordersPerDay: '11 ped/dia',
      ordersMonth: 330,
      revenue: 51150,
      grossProfit: 20460,
      fixedCost: 3200,
      netProfit: 17260,
      color: '#10B981',
      progressPct: 92,
      highlight: 'Volume diário constante sem gargalo logístico',
    },
    {
      month: 10,
      phase: 'Fase 3: Escala',
      phaseDesc: 'Consolidação regional no Sul e Sudeste',
      ordersPerDay: '13 ped/dia',
      ordersMonth: 390,
      revenue: 60450,
      grossProfit: 24180,
      fixedCost: 3900,
      netProfit: 20280,
      color: '#10B981',
      progressPct: 96,
      highlight: 'Automação de repasse de etiquetas e suporte rápido',
    },
    {
      month: 11,
      phase: 'Fase 3: Escala',
      phaseDesc: 'Campanhas de manutenção preventiva',
      ordersPerDay: '14 ped/dia',
      ordersMonth: 420,
      revenue: 65100,
      grossProfit: 26040,
      fixedCost: 4300,
      netProfit: 21740,
      color: '#10B981',
      progressPct: 98,
      highlight: 'Operação azeitada com recompra contínua de peças e vestuário',
    },
    {
      month: 12,
      phase: 'Fase 3: Escala',
      phaseDesc: '1 ano de operação: velocidade de cruzeiro',
      ordersPerDay: '15 ped/dia',
      ordersMonth: 450,
      revenue: 72000,
      grossProfit: 29520,
      fixedCost: 4700,
      netProfit: 24820,
      color: '#10B981',
      progressPct: 100,
      highlight: 'Cenário Otimista consolidado: R$ 24.8k/mês líquido com o novo mix',
    },
  ]

  // Três Cenários de Lucro Líquido Mensal ajustados com o novo pedido médio de 2 itens
  const scenarios = [
    {
      key: 'pessimista',
      title: 'Pessimista',
      badge: 'Fase de Validação (Mês 1 a 2)',
      badgeColor: 'bg-[#F87171]/20 text-[#FCA5A5] border-[#F87171]/40',
      ordersPerMonth: 30,
      ordersPerDay: '1 pedido/dia útil',
      ticket: 145,
      marginPct: 38,
      grossMargin: 1653,
      fixedCosts: {
        total: 400,
        breakdown: [
          'Contador ME / Taxas básicas: R$ 250',
          'Domínio & Hospedagem: R$ 50',
          'Ferramentas / Mensagens: R$ 100',
          'Anúncios pagos: R$ 0 (tráfego 100% orgânico)',
        ],
      },
      netProfit: 1253,
      truthQuote: 'Com ticket de R$ 145, até o pior cenário já dá lucro real de R$ 1.250/mês.',
      truthDetail:
        'A cesta de 2 itens transforma o início: mesmo com apenas 1 pedido por dia útil, a margem de ~38% cobre todos os custos fixos de R$ 400 e deixa mais de R$ 1.250 limpos no caixa.',
      accentColor: '#F87171',
    },
    {
      key: 'realista',
      title: 'Realista',
      badge: 'Operação Estável (Mês 4 a 6)',
      badgeColor: 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40',
      ordersPerMonth: 150,
      ordersPerDay: '5 pedidos/dia',
      ticket: 152,
      marginPct: 40,
      grossMargin: 9120,
      fixedCosts: {
        total: 1500,
        breakdown: [
          'Contador Simples Nacional: R$ 380',
          'Ferramentas / Hosting / API: R$ 220',
          'Anúncio leve / impulsionamento local: R$ 600',
          'Reserva de giro / taxa bancária: R$ 300',
        ],
      },
      netProfit: 7620,
      truthQuote: 'Lucro de R$ 7.600/mês: agora sim o negócio se sustenta plenamente.',
      truthDetail:
        'Com 5 pedidos/dia ancorados em capacete/jaqueta + reposição de pneu e kit revisão, o negócio entrega R$ 7.620 líquidos sem galpão nem mercadoria em estoque.',
      accentColor: '#22D3EE',
      isPopular: true,
    },
    {
      key: 'otimista',
      title: 'Otimista',
      badge: 'Velocidade de Cruzeiro (Mês 7 a 12)',
      badgeColor: 'bg-[#10B981]/20 text-[#34D399] border-[#10B981]/40',
      ordersPerMonth: 450,
      ordersPerDay: '15 pedidos/dia',
      ticket: 160,
      marginPct: 41,
      grossMargin: 29520,
      fixedCosts: {
        total: 4700,
        breakdown: [
          'Contabilidade ME + Impostos DAS: R$ 1.200',
          'Anúncios em escala (Meta / Google): R$ 1.800',
          'Ajuda operacional / empacotamento virtual: R$ 1.200',
          'Ferramentas Pro & automações: R$ 500',
        ],
      },
      netProfit: 24820,
      truthQuote: 'Negócio maduro faturando alto com combos e itens de giro rápido.',
      truthDetail:
        'Volume com cadastro pleno nas 3 maiores distribuidoras (Laquila, MTO e Nacional). R$ 24.800 de lucro limpo por mês: o mix de alto ticket viabilizou a escala.',
      accentColor: '#10B981',
    },
  ]

  // Anti-Elefante-Branco: 5 Pílulas estruturais
  const antiElephantPillars = [
    {
      number: '1',
      title: 'Zero estoque = zero capital parado',
      desc: 'Você não investe R$ 50 mil em prateleiras cheias de peças que podem não ter saída ou oxidar. Seu capital fica no seu bolso.',
      icon: ShieldCheck,
      highlight: 'R$ 0 empatado em mercadoria',
    },
    {
      number: '2',
      title: 'Compra só depois de vender',
      desc: 'O cliente paga primeiro no seu app. Com o dinheiro no caixa, você repassa o custo pelo preço de atacado ao fornecedor nacional.',
      icon: PackageCheck,
      highlight: 'Caixa nunca negativo por construção',
    },
    {
      number: '3',
      title: 'Break-even em ~18 pedidos/mês',
      desc: 'Não precisa de 500 ou 1.000 vendas para pagar a estrutura. Com apenas ~1 pedido por dia útil, todos os custos fixos estão quitados.',
      icon: DollarSign,
      highlight: '~1 pedido/dia útil para empatar',
    },
    {
      number: '4',
      title: 'Custo de entrada é tempo e CNPJ, não loja',
      desc: 'Não há aluguel comercial, caução, reforma de galpão, nem IPTU. A entrada é feita via relacionamento em grupos de motos e CNPJ ME/Simples.',
      icon: TrendingUp,
      highlight: 'Sem ponto comercial físico',
    },
    {
      number: '5',
      title: 'Risco cirúrgico e limitado',
      desc: 'Se no mês 3 você decidir parar por qualquer motivo pessoal, a perda acumulada é de poucas centenas de reais, nunca de dezenas de milhares.',
      icon: CheckCircle2,
      highlight: 'Perda máxima contida em centenas de R$',
    },
  ]

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Topo / Header da Página */}
      <section className="relative overflow-hidden rounded-3xl border border-[#232B3A] p-6 sm:p-10 bg-gradient-to-br from-[#151923] via-[#0E1524] to-[#0B0D12] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#22D3EE]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-xs font-semibold tracking-wide uppercase">
            <Compass className="w-4 h-4 text-[#34D399]" />
            Planejamento Financeiro • Terrenotech
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Plano de Voo & <br />
            <span className="bg-gradient-to-r from-[#10B981] via-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">
              Estimativa Real de Lucro Líquido
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#A1A6B3] leading-relaxed">
            Com o novo mix de cesta de 2 itens ancorado em{' '}
            <strong className="text-white">
              Equipamento de Alto Ticket (capacete, jaqueta, interfone)
            </strong>
            , <strong className="text-white">Combos com desconto</strong> e{' '}
            <strong className="text-white">
              Itens de Reposição Rápida (pneu, bateria, revisão)
            </strong>
            , elevamos o pedido médio para ~R$ 152 e recalculamos os cenários para viabilidade plena
            do negócio.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#22D3EE] text-[#0B0D12] hover:opacity-95 font-black px-4 h-9 text-xs shadow-md shadow-[#8B5CF6]/30"
            >
              <Link to="/roteiro" className="flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5 text-[#0B0D12]" />
                Ver Roteiro do Fundador
                <ArrowRight className="w-3.5 h-3.5 text-[#0B0D12]" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-xs text-[#A1A6B3] bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>
                Cesta: 2 itens por pedido • Margem média ~{metrics.avgMarginPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A6B3] bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
              <span>Pedido Médio: ~R$ {metrics.avgOrderSale.toFixed(0)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A6B3] bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>Ponto de equilíbrio: ~{breakEvenOrders} pedidos/mês</span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO EDITORIAL: POR QUE O MIX MUDOU */}
      <section className="bg-gradient-to-r from-[#1B192E] via-[#151923] to-[#0F1424] border-2 border-[#8B5CF6]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/25 border border-[#8B5CF6]/50 text-[#c4b5fd] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            Decisão Estratégica do Dono
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
            Por que o mix mudou? <br />
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent">
              Peça de R$ 72 sozinha não sustenta o negócio — a resposta é a cesta de 2 itens
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#0B0D12]/90 border border-[#232B3A] p-4 rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#F87171] tracking-wider block">
                1. O Diagnóstico Crítico
              </span>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Com ticket médio unitário de apenas <strong className="text-white">R$ 72</strong> e
                ~40% de margem, o lucro líquido estimado oscilava entre ~R$ 260 e ~R$ 9.500/mês. A
                conclusão do dono foi clara:{' '}
                <em className="text-white">"Ou a gente incrementa produto ou não sai do papel"</em>.
              </p>
            </div>

            <div className="bg-[#0B0D12]/90 border border-[#232B3A] p-4 rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#22D3EE] tracking-wider block">
                2. A Âncora de Alto Ticket
              </span>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Adicionamos vestuário e equipamentos de alto valor (
                <strong className="text-white">
                  Capacetes Pro Tork/X11, Jaqueta X11 Iron, Intercomunicador Bluetooth Duo
                </strong>
                ) e <strong className="text-white">Combos com economia real</strong> para elevar o
                carrinho do motociclista.
              </p>
            </div>

            <div className="bg-[#0B0D12]/90 border border-[#232B3A] p-4 rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#34D399] tracking-wider block">
                3. Recompra Rápida & Cesta
              </span>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                A âncora de alto ticket puxa o item chave de reposição rápida (
                <strong className="text-white">Pneu traseiro CG/Factor</strong> trocado a cada 8-12k
                km, <strong className="text-white">Bateria 12V</strong> de troca imediata e{' '}
                <strong className="text-white">Kit Revisão</strong>), garantindo um pedido médio de
                2 itens (~R$ 152).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARD 1: O NEGÓCIO EM UMA FRASE */}
      <section className="bg-gradient-to-r from-[#12281E] via-[#151923] to-[#121620] border-2 border-[#10B981]/50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#34D399] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              O negócio em uma frase:
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
              Dropshipping nacional de motopeças, sem estoque, comprando só depois de vender, com
              caixa nunca negativo por construção.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
              O cliente faz o pedido no Terrenotech e paga primeiro. Você recebe a confirmação,
              acessa o portal da distribuidora parceira brasileira (Laquila/MTO/Nacional), paga o
              preço de custo no atacado e anexa a etiqueta de envio do cliente. A mercadoria viaja
              direto com NF e você retém o lucro líquido na mesma hora.
            </p>
          </div>

          <div className="bg-[#0B0D12] p-5 rounded-2xl border border-[#232B3A] shrink-0 w-full md:w-auto text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
              Regra de Ouro do Modelo
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-[#34D399]">CAIXA ≥ 0</div>
            <span className="text-[11px] text-[#A1A6B3] block">
              Sempre positivo por desenho operacional
            </span>
          </div>
        </div>
      </section>

      {/* MÉTRICAS DERIVADAS DO CATÁLOGO COM O NOVO MIX DE CESTA */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8B5CF6]" />
              Métricas do Catálogo: Premissa Cesta de 2 Itens
            </h3>
            <p className="text-xs text-[#A1A6B3]">
              Calculadas dinamicamente sobre todos os {metrics.count} produtos do catálogo (peças +
              equipamento de alto ticket + combos).
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#232B3A] text-xs h-8 px-3"
          >
            <Link to="/?categoria=Combos">Explorar Combos no Catálogo</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-[#A1A6B3] uppercase tracking-wider block">
              Mix do Catálogo
            </span>
            <div className="text-2xl font-black text-white font-mono">{metrics.count} produtos</div>
            <span className="text-[11px] text-[#22D3EE]">Peças, Equipamento e Combos</span>
          </div>

          <div className="bg-[#151923] border border-[#22D3EE]/40 rounded-2xl p-4 space-y-1 bg-gradient-to-br from-[#151923] to-[#0A202A]">
            <span className="text-[10px] text-[#22D3EE] uppercase tracking-wider block font-bold">
              Pedido Médio (2 Itens)
            </span>
            <div className="text-2xl font-black text-white font-mono">
              R$ {metrics.avgOrderSale.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[11px] text-[#22D3EE]">
              (Item individual médio: R$ {metrics.avgSingleItemSale.toFixed(2).replace('.', ',')})
            </span>
          </div>

          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-[#A1A6B3] uppercase tracking-wider block">
              Custo Atacado / Pedido
            </span>
            <div className="text-2xl font-black text-white font-mono">
              R$ {metrics.avgOrderCost.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[11px] text-[#A1A6B3]">
              Distribuidoras nacionais (Laquila/MTO/Nacional)
            </span>
          </div>

          <div className="bg-[#151923] border border-[#10B981]/40 rounded-2xl p-4 space-y-1 bg-gradient-to-br from-[#151923] to-[#0F241C]">
            <span className="text-[10px] text-[#34D399] uppercase tracking-wider block font-bold">
              Margem Média Ponderada
            </span>
            <div className="text-2xl font-black text-[#34D399] font-mono">
              ~{metrics.avgMarginPct.toFixed(1)}%
            </div>
            <span className="text-[11px] text-[#34D399]">
              +R$ {metrics.avgOrderGrossProfit.toFixed(2).replace('.', ',')} por pedido de 2 itens
            </span>
          </div>
        </div>
      </section>

      {/* SEÇÃO: RAMP-UP MESES 1 A 12 (3 FASES) */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#c4b5fd] text-xs font-semibold uppercase">
              <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Cronograma de 12 Meses
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ramp-Up Gradual: De 1 a 15 Pedidos/Dia
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3] max-w-2xl leading-relaxed">
              Crescimento escalonado em 3 fases bem definidas, sem pressa imprudente e sem queimar
              caixa em anúncios prematuros.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#c4b5fd] border border-[#8B5CF6]/40 font-semibold">
              Fase 1 (M 1–3): 1–2 ped/dia
            </span>
            <span className="px-3 py-1 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40 font-semibold">
              Fase 2 (M 4–6): 3–5 ped/dia
            </span>
            <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 font-semibold">
              Fase 3 (M 7–12): 7–15 ped/dia
            </span>
          </div>
        </div>

        {/* Tabela com Barras Inline de Ramp-up */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0D12] text-[#A1A6B3] border-b border-[#232B3A]">
              <tr>
                <th className="py-3 px-3 font-bold text-white">Mês</th>
                <th className="py-3 px-3 font-bold text-white">Fase & Estratégia</th>
                <th className="py-3 px-3 font-bold text-white">Giro Diário</th>
                <th className="py-3 px-3 font-bold text-white">Pedidos/Mês</th>
                <th className="py-3 px-3 font-bold text-white min-w-[140px]">Volume Escalonado</th>
                <th className="py-3 px-3 font-bold text-white">Faturamento</th>
                <th className="py-3 px-3 font-bold text-white">Custos Fixos</th>
                <th className="py-3 px-3 font-bold text-[#34D399]">Lucro Líquido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232B3A]/60">
              {rampUpMonths.map((item) => (
                <tr key={item.month} className="hover:bg-[#1B212D]/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-white whitespace-nowrap">
                    Mês {item.month}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-semibold text-white block">{item.phase}</span>
                    <span className="text-[11px] text-[#A1A6B3]">{item.phaseDesc}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                    {item.ordersPerDay}
                  </td>
                  <td className="py-3 px-3 font-mono text-white whitespace-nowrap">
                    {item.ordersMonth} ped
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      <div className="w-full bg-[#0B0D12] h-2.5 rounded-full overflow-hidden border border-[#232B3A]">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.progressPct}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[#A1A6B3] block truncate">
                        {item.highlight}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-white whitespace-nowrap">
                    R$ {item.revenue.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-3 px-3 font-mono text-[#F87171] whitespace-nowrap">
                    R$ {item.fixedCost.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-[#34D399] whitespace-nowrap">
                    R$ {item.netProfit.toLocaleString('pt-BR')}/mês
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEÇÃO: TRÊS CENÁRIOS DE LUCRO LÍQUIDO MENSAL */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-semibold uppercase">
            <Calculator className="w-3.5 h-3.5 text-[#22D3EE]" />
            Simulação Transparente
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Três Cenários de Lucro Líquido Mensal
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
            Sem promessas fantasiosas: veja a matemática crua de pedidos, ticket médio, margem
            bruta, custos fixos e o resultado líquido que vai de fato para o seu bolso.
          </p>
        </div>

        {/* Três Cards Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scenarios.map((scen) => (
            <div
              key={scen.key}
              className={`relative bg-[#151923] border ${
                scen.isPopular
                  ? 'border-[#22D3EE] shadow-2xl shadow-[#22D3EE]/10'
                  : 'border-[#232B3A]'
              } rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-[#10B981]/60`}
            >
              {scen.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-[#0B0D12] text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Meta Mais Provável no Semestre
                </div>
              )}

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">{scen.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${scen.badgeColor}`}
                  >
                    {scen.badge}
                  </span>
                </div>

                {/* Bloco de Destaque: Lucro Líquido */}
                <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
                    Lucro Líquido Mensal Estimado
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#34D399]">
                    R$ {scen.netProfit.toLocaleString('pt-BR')}{' '}
                    <span className="text-xs text-[#A1A6B3] font-normal font-sans">/mês</span>
                  </div>
                </div>

                {/* Frase Honesta do Cenário */}
                <div className="p-3 rounded-xl bg-[#1B212D]/70 border border-[#232B3A] text-xs space-y-1">
                  <span className="font-bold text-white block">"{scen.truthQuote}"</span>
                  <p className="text-[#A1A6B3] text-[11px] leading-relaxed">{scen.truthDetail}</p>
                </div>

                {/* Detalhamento dos Números */}
                <div className="space-y-2 pt-2 border-t border-[#232B3A] text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-[#232B3A]/60">
                    <span className="text-[#A1A6B3]">Volume de pedidos</span>
                    <span className="font-bold text-white">
                      {scen.ordersPerMonth} ped/mês ({scen.ordersPerDay})
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#232B3A]/60">
                    <span className="text-[#A1A6B3]">Ticket médio estimado</span>
                    <span className="font-mono font-bold text-white">
                      R$ {scen.ticket.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#232B3A]/60">
                    <span className="text-[#A1A6B3]">Faturamento bruto</span>
                    <span className="font-mono font-bold text-white">
                      R$ {(scen.ordersPerMonth * scen.ticket).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#232B3A]/60">
                    <span className="text-[#A1A6B3]">Margem bruta (~{scen.marginPct}%)</span>
                    <span className="font-mono font-bold text-[#34D399]">
                      R$ {scen.grossMargin.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#A1A6B3]">Custos fixos totais</span>
                    <span className="font-mono font-bold text-[#F87171]">
                      - R$ {scen.fixedCosts.total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Discriminação de Custos Fixos */}
                <div className="bg-[#0B0D12] rounded-xl p-3 border border-[#232B3A] space-y-1.5 text-[11px] text-[#A1A6B3]">
                  <span className="text-[10px] font-bold uppercase text-white block">
                    Composição dos custos fixos:
                  </span>
                  {scen.fixedCosts.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-[#A1A6B3]">
                Premissa editável assim que o custo de distribuidora CNPJ for homologado.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: PONTO DE EQUILÍBRIO (BREAK-EVEN) */}
      <section className="bg-gradient-to-br from-[#111A24] via-[#151923] to-[#0B0D12] border-2 border-[#22D3EE]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
              Ponto de Equilíbrio (Break-Even)
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Apenas ~{breakEvenOrders} pedidos no mês inteiro para não perder nenhum centavo
            </h3>

            <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
              Com o mix novo de cesta (2 itens gerando margem bruta de{' '}
              <strong className="text-[#34D399]">
                ~R$ {metrics.avgOrderGrossProfit.toFixed(0)} por pedido
              </strong>
              ) e um custo fixo de entrada enxuto de{' '}
              <strong className="text-white">R$ 400/mês</strong> (contador ME + ferramentas
              mínimas), o ponto de equilíbrio despenca de 18 para apenas{' '}
              <strong className="text-[#34D399]">{breakEvenOrders} pedidos no mês inteiro</strong> —
              menos de <strong className="text-[#22D3EE]">2 pedidos por semana</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="badge-pill-sm text-xs bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 font-bold">
                🎯 Meta mínima: ~{breakEvenOrders} pedidos/mês
              </span>
              <span className="badge-pill-sm text-xs bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40 font-bold">
                ⏱️ Ritmo: ~1 a 2 pedidos por semana
              </span>
              <span className="badge-pill-sm text-xs bg-[#8B5CF6]/20 text-[#c4b5fd] border border-[#8B5CF6]/40 font-bold">
                🛡️ A partir do {breakEvenOrders + 1}º pedido é 100% lucro líquido
              </span>
            </div>
          </div>

          <div className="bg-[#0B0D12] p-6 rounded-2xl border border-[#232B3A] shrink-0 w-full lg:w-72 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
              Break-Even Mensal
            </span>
            <div className="text-4xl font-black text-[#22D3EE] font-mono">
              ~{breakEvenOrders} pedidos
            </div>
            <p className="text-[11px] text-[#A1A6B3]">
              R$ 400 custo ÷ ~R$ {metrics.avgOrderGrossProfit.toFixed(0)} margem/ped ={' '}
              {breakEvenOrders} vendas
            </p>
            <div className="pt-2 text-[10px] text-[#34D399] font-semibold border-t border-[#232B3A]">
              Qualquer venda além da {breakEvenOrders}ª já coloca lucro líquido no bolso.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: ANTI-ELEFANTE-BRANCO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F87171]/20 border border-[#F87171]/40 text-[#FCA5A5] text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F87171]" />
            Blindagem Estrutural
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Por que este negócio NÃO vira um elefante branco?
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
            O termo "elefante branco" define projetos caros de manter, difíceis de desovar e que
            sangram o caixa do empreendedor todo mês. A Terrenotech foi arquitetada para o oposto
            exato:
          </p>
        </div>

        {/* 5 Cards / Pílulas da Blindagem */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {antiElephantPillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className="bg-[#0B0D12] border border-[#232B3A] hover:border-[#10B981]/50 rounded-2xl p-5 space-y-3 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center font-black text-xs text-[#34D399]">
                    {pillar.number}
                  </div>
                  <Icon className="w-4 h-4 text-[#34D399]" />
                </div>

                <h4 className="font-bold text-white text-sm leading-snug">{pillar.title}</h4>
                <p className="text-xs text-[#A1A6B3] leading-relaxed">{pillar.desc}</p>

                <div className="pt-2 border-t border-[#232B3A]/60">
                  <span className="text-[11px] font-semibold text-[#22D3EE] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                    {pillar.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SIMULADOR INTERATIVO RÁPIDO */}
      <section className="bg-gradient-to-br from-[#121620] via-[#151923] to-[#0B0D12] border border-[#8B5CF6]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8B5CF6]" />
              Simulador Rápido de Hipóteses
            </h3>
            <p className="text-xs text-[#A1A6B3]">
              Ajuste as réguas abaixo para testar diferentes volumes de pedidos e custos fixos:
            </p>
          </div>
          <span className="text-xs text-[#c4b5fd] bg-[#8B5CF6]/20 px-3 py-1 rounded-full border border-[#8B5CF6]/40 font-mono">
            Interativo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Slider 1: Pedidos/mês */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#A1A6B3]">Pedidos por mês:</span>
              <span className="font-bold text-white font-mono">{customOrdersPerMonth} ped</span>
            </div>
            <input
              type="range"
              min={10}
              max={600}
              step={10}
              value={customOrdersPerMonth}
              onChange={(e) => setCustomOrdersPerMonth(Number(e.target.value))}
              className="w-full accent-[#8B5CF6] cursor-pointer"
            />
            <span className="text-[10px] text-[#A1A6B3] block">
              {(customOrdersPerMonth / 30).toFixed(1)} pedidos/dia
            </span>
          </div>

          {/* Slider 2: Ticket Médio (Operando no intervalo do mix novo: R$ 80 a R$ 400) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#A1A6B3]">Ticket Médio (Cesta):</span>
              <span className="font-bold text-white font-mono">R$ {customTicket}</span>
            </div>
            <input
              type="range"
              min={80}
              max={400}
              step={5}
              value={customTicket}
              onChange={(e) => setCustomTicket(Number(e.target.value))}
              className="w-full accent-[#22D3EE] cursor-pointer"
            />
            <span className="text-[10px] text-[#A1A6B3] block">
              Média cesta 2 itens: R$ {Math.round(metrics.avgOrderSale)}
            </span>
          </div>

          {/* Slider 3: Margem Líquida % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#A1A6B3]">Margem Bruta %:</span>
              <span className="font-bold text-white font-mono">{customMarginPct}%</span>
            </div>
            <input
              type="range"
              min={25}
              max={55}
              step={1}
              value={customMarginPct}
              onChange={(e) => setCustomMarginPct(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer"
            />
            <span className="text-[10px] text-[#A1A6B3] block">
              Média atual: {metrics.avgMarginPct.toFixed(1)}%
            </span>
          </div>

          {/* Slider 4: Custos Fixos */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#A1A6B3]">Custos Fixos Totais:</span>
              <span className="font-bold text-white font-mono">R$ {customFixedCost}</span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={50}
              value={customFixedCost}
              onChange={(e) => setCustomFixedCost(Number(e.target.value))}
              className="w-full accent-[#F87171] cursor-pointer"
            />
            <span className="text-[10px] text-[#A1A6B3] block">
              Contador + ferramentas + anúncios
            </span>
          </div>
        </div>

        {/* Resultado do Simulador */}
        <div className="bg-[#0B0D12] rounded-2xl p-5 border border-[#232B3A] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase text-[#A1A6B3] block">Faturamento Bruto</span>
            <span className="text-xl font-bold text-white font-mono">
              R$ {simRevenue.toLocaleString('pt-BR')}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#A1A6B3] block">Margem Bruta Total</span>
            <span className="text-xl font-bold text-[#22D3EE] font-mono">
              R$ {simGrossMargin.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#A1A6B3] block">
              Lucro Líquido no Bolso
            </span>
            <span
              className={`text-2xl font-black font-mono ${
                simNetProfit >= 0 ? 'text-[#34D399]' : 'text-[#F87171]'
              }`}
            >
              R$ {simNetProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês
            </span>
          </div>
        </div>
      </section>

      {/* BLOCO DE HONESTIDADE ANALÍTICA: O QUE OS CENÁRIOS NÃO ASSUMEM */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-[#F59E0B]/50 bg-gradient-to-br from-[#1A1608] via-[#151923] to-[#0B0D12] p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#FBBF24]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#FDE68A] border border-[#F59E0B]/40 text-[10px] font-bold uppercase tracking-wider">
              Honestidade Analítica • Sem Promessas Vazia
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              O que os cenários NÃO assumem
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
          Nenhuma projeção financeira da Terrenotech é promessa ou mágica de planilha. Para manter
          os pés no asfalto e responder à pergunta franca do fundador —{' '}
          <em>"e se ninguém achar nada e as campanhas não interferirem?"</em> —, estas são as regras
          de ferro deste modelo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
          {/* Item 1: Linha de base pura */}
          <div className="bg-[#0B0D12]/90 border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#FBBF24] tracking-wider block">
              1. Campanhas de Segurança NÃO Estão Embutidas
            </span>
            <p className="text-[#A1A6B3] leading-relaxed">
              Os três cenários (pessimista, realista e otimista) são{' '}
              <strong className="text-white">linha de base por esforço de venda direta</strong> nos
              grupos de motoboys e entregadores. As campanhas (Filão da Queda, Clube Moto-T, MotoQ e
              Arrego) <strong className="text-white">NÃO estão inflacionando os números</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-[#151923] text-[11px] text-[#FDE68A] border border-[#F59E0B]/30">
              💡 Se as campanhas derem certo, é <strong>upside puro</strong>. Se ninguém engajar
              nelas, os números da projeção <strong>não mudam por causa delas</strong>.
            </div>
          </div>

          {/* Item 2: Hipótese 250-450cc */}
          <div className="bg-[#0B0D12]/90 border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#22D3EE] tracking-wider block">
              2. Camada 250–450cc é Hipótese a Validar
            </span>
            <p className="text-[#A1A6B3] leading-relaxed">
              O núcleo de volume continua sendo as motos de até 250cc (CG 160, Factor, Bros, ~80% do
              mercado). A ampliação para 250–450cc (CB 300, Twister, Lander, Dominar 400) é uma{' '}
              <strong className="text-white">hipótese aberta</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-[#151923] text-[11px] text-[#93C5FD] border border-[#22D3EE]/30">
              ⚖️ O número de pedidos firmes nos 30 dias de piloto é que decide o critério{' '}
              <strong className="text-white">go/no-go</strong> já definido formalmente na página
              Piloto.
            </div>
          </div>

          {/* Item 3: O piloto é quem manda */}
          <div className="bg-[#0B0D12]/90 border border-[#232B3A] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#34D399] tracking-wider block">
              3. O Piloto é o Único Juiz
            </span>
            <p className="text-[#A1A6B3] leading-relaxed">
              Nenhuma projeção aqui é garantia ou certeza de receita. A Terrenotech não abriu CNPJ
              nem contratou contador definitivo antes de testar a aceitação real nos grupos.
            </p>
            <div className="p-2.5 rounded-xl bg-[#151923] text-[11px] text-[#A7F3D0] border border-[#10B981]/30">
              🏁 É a resposta orgânica da pista nos 30 dias de sondagem de demanda que autoriza os
              passos seguintes do Roteiro.
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO DISCRETO: IDEIAS AGUARDANDO DECISÃO (REFERÊNCIA/ATALHO PARA O ROTEIRO) */}
      <section className="bg-[#121622] border border-[#232B3A] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#232B3A] pb-3">
          <div className="flex items-center gap-2">
            <Hourglass className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Ideias Aguardando Decisão</h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40">
              Decidir depois
            </span>
          </div>
          <Link
            to="/roteiro"
            className="text-xs text-[#22D3EE] hover:text-[#67E8F9] flex items-center gap-1 font-semibold transition-colors"
          >
            Ver detalhes no Roteiro do Fundador
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs text-[#A1A6B3] leading-relaxed">
          Propostas estratégicas mapeadas que aguardam validação do piloto, teto de verba ou
          amadurecimento operacional antes de entrar em execução:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3.5 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">
                1. Programa social de apoio a motoqueiros com álcool/drogas
              </span>
              <p className="text-[11px] text-[#A1A6B3] leading-relaxed">
                Base gratuita no CAPS AD do SUS (8 unidades em Porto Alegre/RS) + complemento do
                fundo Terrenotech (psiquiatra de retaguarda, exames, transporte) e CVV 188.
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Decidir depois
            </span>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3.5 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">2. Fotos 3D dos produtos via IA</span>
              <p className="text-[11px] text-[#A1A6B3] leading-relaxed">
                Modelos 3D interativos e renderização 360° gerados por IA para componentes do
                catálogo. Proposta reservada para depois da validação do piloto.
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
              Decidir depois
            </span>
          </div>
        </div>
      </section>

      {/* NOTA DE TRANSPARÊNCIA: PREMISSAS DEMO & CNPJ */}
      <section className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-5 flex items-start gap-3 text-xs text-[#A1A6B3] leading-relaxed">
        <Info className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">Nota de Transparência Metodológica:</p>
          <p>
            Os números apresentados neste Plano de Voo são estimativas com premissas baseadas nos
            preços praticados no varejo e nas tabelas de atacado das distribuidoras nacionais
            parceiras (Laquila, MTO e Nacional), considerando o novo mix de cesta com pedido médio
            de 2 itens (equipamento de alto ticket, reposição de giro e combos promocionais). O
            custo real final será homologado formalmente via cadastro CNPJ ativo com Inscrição
            Estadual (Simples Nacional / ME).
          </p>{' '}
        </div>
      </section>

      {/* Links de Rodapé para Outras Análises */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Button
          asChild
          variant="outline"
          className="rounded-2xl border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-white text-xs h-12"
        >
          <Link to="/analises/queda" className="flex items-center gap-2">
            Ver Filão da Queda (até 450cc)
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-2xl border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-white text-xs h-12"
        >
          <Link to="/clube" className="flex items-center gap-2">
            Ver Clube Moto-T (Programas)
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-2xl border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-white text-xs h-12"
        >
          <Link to="/por-que-comprar-online" className="flex items-center gap-2">
            Por Que Comprar Peça Online?
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
