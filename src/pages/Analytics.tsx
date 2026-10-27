import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Flame,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Zap,
  HelpCircle,
  Map,
} from 'lucide-react'
import { DEMO_PRODUCTS, INTERNET_SUGGESTED_PRODUCTS, SuggestedProduct } from '@/lib/demoProducts'
import { ordersService, OrderRecord } from '@/services/orders'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function Analytics() {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestedProduct | null>(null)

  useEffect(() => {
    async function loadOrders() {
      const list = await ordersService.listOrders()
      setOrders(list)
    }
    loadOrders()
  }, [])

  // 1. Cartões de Métricas
  // Vendas totais
  const totalSales = useMemo(() => {
    return orders.reduce((acc, curr) => acc + curr.total, 0)
  }, [orders])

  // Caixa atual (Simulado estratégico da empresa: pode ser negativo para representar a necessidade de recuperação de caixa)
  // Base de despesas fixas estimadas da operação (ex: -R$ 1.850,00 de fornecedores prévios)
  const currentCash = useMemo(() => {
    const fixedExpenses = 2800.0
    return totalSales - fixedExpenses // Resulta em valor negativo inicial com as 3 vendas demo (aprox R$ 848 - 2800 = -1951)
  }, [totalSales])

  // Ticket Médio
  const averageTicket = useMemo(() => {
    if (orders.length === 0) return 0
    return totalSales / orders.length
  }, [totalSales, orders])

  // Total de produtos vendidos
  const totalProductsSold = useMemo(() => {
    return orders.reduce((acc, curr) => {
      const itemsCount = curr.items.reduce((s, it) => s + (it.quantity || 1), 0)
      return acc + itemsCount
    }, 0)
  }, [orders])

  // Cores dinâmicas para o gráfico de barras
  const barColors = ['#8B5CF6', '#22D3EE', '#F472B6', '#34D399', '#8B5CF6', '#22D3EE']

  // Produtos ordenados por velocidade de venda para o estudo de recuperação
  const sortedBySpeed = useMemo(() => {
    return [...DEMO_PRODUCTS].sort((a, b) => b.speed - a.speed)
  }, [])

  // Top 3 produtos mais rápidos
  const topFastProducts = sortedBySpeed.slice(0, 3)
  const fastestProduct = sortedBySpeed[0]

  // Meta de recuperação
  const deficitAmount = Math.abs(currentCash < 0 ? currentCash : 0)

  // Margem média da loja calculada com base no catálogo de motos
  const averageCatalogMargin = useMemo(() => {
    const totalMargin = DEMO_PRODUCTS.reduce((acc, p) => {
      const margin = ((p.price - p.supplierCost) / p.price) * 100
      return acc + margin
    }, 0)
    return Math.round(totalMargin / DEMO_PRODUCTS.length)
  }, [])

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Cabeçalho com banner para Filão da Queda */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#22D3EE] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Inteligência de Dropshipping & Acessórios de Moto
            </div>
            <span className="text-[11px] font-semibold text-[#FDE68A] bg-[#F59E0B]/15 border border-[#F59E0B]/30 px-3 py-1 rounded-full">
              Projeções = linha de base; campanhas não estão embutidas
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Estatísticas & Recuperação de Caixa
          </h1>
          <p className="text-sm text-[#A1A6B3]">
            Estudo de velocidade de giro e margem de repasse no nicho de motociclistas para
            alavancar faturamento imediato.
          </p>
        </div>

        {/* Links visíveis em destaque: Roteiro, Plano de Voo & Filão da Queda */}
        <div className="shrink-0 flex flex-wrap items-center gap-2.5">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#22D3EE] text-[#0B0D12] hover:opacity-95 font-black shadow-lg shadow-[#8B5CF6]/25 px-4 h-10 text-xs"
          >
            <Link to="/roteiro" className="flex items-center gap-2">
              <Map className="w-4 h-4 text-[#0B0D12]" />
              Roteiro do Fundador
              <ArrowUpRight className="w-4 h-4 text-[#0B0D12]" />
            </Link>
          </Button>

          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:opacity-95 font-bold shadow-lg shadow-[#10B981]/25 px-4 h-10 text-xs"
          >
            <Link to="/analises/plano" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white" />
              Plano de Voo & Lucro
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#F87171] to-[#EC4899] text-white hover:opacity-95 font-bold shadow-lg shadow-[#F87171]/25 px-4 h-10 text-xs"
          >
            <Link to="/analises/queda" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              Filão da Queda (até 450cc)
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Cartões de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Vendas Totais */}
        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-lg hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A1A6B3] font-semibold uppercase tracking-wider">
              Vendas totais
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-tabular">
              R$ {totalSales.toFixed(2).replace('.', ',')}
            </span>
            <p className="text-[11px] text-[#34D399] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{orders.length} pedidos faturados</span>
            </p>
          </div>
        </div>

        {/* Card 2: Caixa Atual (Pode ser negativo e em vermelho) */}
        <div
          className={`bg-[#151923] border rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-lg hover-lift ${
            currentCash < 0 ? 'border-[#F87171]/50' : 'border-[#34D399]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A1A6B3] font-semibold uppercase tracking-wider">
              Caixa atual
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                currentCash < 0
                  ? 'bg-[#F87171]/20 text-[#F87171]'
                  : 'bg-[#34D399]/20 text-[#34D399]'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span
              className={`text-2xl sm:text-3xl font-extrabold font-tabular ${
                currentCash < 0 ? 'text-[#F87171]' : 'text-[#34D399]'
              }`}
            >
              {currentCash < 0
                ? `- R$ ${deficitAmount.toFixed(2).replace('.', ',')}`
                : `R$ ${currentCash.toFixed(2).replace('.', ',')}`}
            </span>
            <p className="text-[11px] text-[#A1A6B3] mt-1">
              {currentCash < 0 ? 'Necessita giro imediato' : 'Caixa superavitário'}
            </p>
          </div>
        </div>

        {/* Card 3: Ticket Médio */}
        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-lg hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A1A6B3] font-semibold uppercase tracking-wider">
              Ticket médio
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-tabular">
              R$ {averageTicket.toFixed(2).replace('.', ',')}
            </span>
            <p className="text-[11px] text-[#A1A6B3] mt-1">Média por cliente atendido</p>
          </div>
        </div>

        {/* Card 4: Produtos Vendidos */}
        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-lg hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A1A6B3] font-semibold uppercase tracking-wider">
              Produtos vendidos
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F472B6]/20 border border-[#F472B6]/40 flex items-center justify-center text-[#F472B6]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-tabular">
              {totalProductsSold} un.
            </span>
            <p className="text-[11px] text-[#22D3EE] mt-1">Itens despachados na loja</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Velocidade de Venda por Produto */}
      <div className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#8B5CF6]" />
              Velocidade de Venda por Produto
            </h2>
            <p className="text-xs text-[#A1A6B3]">
              Métrica de liquidez: unidades médias vendidas por dia (un/dia). As barras mais altas
              possuem giro imediato.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#34D399]">
              <Flame className="w-3.5 h-3.5" />
              Maior saída: {fastestProduct?.name.split(' ')[0]} ({fastestProduct?.speed} un/dia)
            </span>
          </div>
        </div>

        {/* Gráfico Customizado em Barras com Rolagem Horizontal no Mobile */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="min-w-[640px] space-y-4">
            {DEMO_PRODUCTS.map((prod, idx) => {
              const maxSpeed = 35
              const percentage = Math.min(100, (prod.speed / maxSpeed) * 100)
              const color = barColors[idx % barColors.length]
              const isTop = prod.speed >= 20
              const itemMargin = Math.round(((prod.price - prod.supplierCost) / prod.price) * 100)

              return (
                <div key={prod.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="text-[#A1A6B3] text-[11px]">[{prod.category}]</span>
                      {prod.name}
                      {isTop && (
                        <span className="badge-pill-sm text-[10px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold">
                          Giro Ultrarrápido
                        </span>
                      )}
                      <span className="text-[10px] text-[#22D3EE] bg-[#0B0D12] px-2 py-0.5 rounded border border-[#232B3A]">
                        Margem ~{itemMargin}%
                      </span>
                    </span>
                    <span className="font-bold text-white font-tabular" style={{ color }}>
                      {prod.speed} un/dia
                    </span>
                  </div>

                  {/* Barra de Progresso com Brilho suave */}
                  <div className="w-full h-4 bg-[#0B0D12] rounded-full overflow-hidden p-0.5 border border-[#232B3A]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: isTop ? `0 0 12px ${color}80` : 'none',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legenda de Categorias */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#232B3A] text-xs text-[#A1A6B3]">
          <span className="font-semibold text-white">Categorias Moto:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Proteção (Capacetes / Luvas /
            Botas)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" /> Tecnologia (Suportes /
            Interfones / Farol)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" /> Conforto (Balaclavas /
            Jaquetas / Viseiras)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F472B6]" /> Carga/Entrega (Bags / Baús)
          </span>
        </div>
      </div>

      {/* Card de Estudo de Recuperação de Caixa */}
      <div className="bg-gradient-to-br from-[#151923] to-[#121620] border border-[#8B5CF6]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Plano de Recuperação de Liquidez
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Estudo de Recuperação de Caixa Negativo
            </h2>
          </div>

          <div className="text-left sm:text-right bg-[#0B0D12] p-3 rounded-2xl border border-[#232B3A]">
            <span className="text-[11px] text-[#A1A6B3] block">Meta para Zerar o Déficit</span>
            <span className="text-xl font-black text-[#F87171] font-tabular">
              R$ {deficitAmount.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Parecer Textual Inteligente */}
        <div className="bg-[#0B0D12]/80 border border-[#232B3A] rounded-2xl p-5 space-y-2 text-sm leading-relaxed text-[#F4F5F7]">
          <p className="font-semibold text-[#22D3EE] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#22D3EE]" />
            Parecer Estratégico Terrenotech (Nicho Motociclista):
          </p>
          <p className="text-xs sm:text-sm text-[#A1A6B3]">
            Para recuperar o caixa de{' '}
            <strong className="text-white">
              R$ {deficitAmount.toFixed(2).replace('.', ',')}
            </strong>{' '}
            com dropshipping sem investimento prévio em estoque, concentre a divulgação nos itens de
            giro diário acelerado e alta margem percentual:{' '}
            <span className="text-[#34D399] font-bold">
              {topFastProducts.map((p) => p.name).join(', ')}
            </span>
            . A margem média do catálogo de motos é de{' '}
            <strong className="text-white">~{averageCatalogMargin}%</strong>, permitindo cobrir
            despesas fixas com poucas vendas diárias repassadas direto ao cliente.
          </p>
        </div>

        {/* Lista de Produtos Recomendados com % de Contribuição */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Produtos Recomendados para Alavancagem Imediata
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topFastProducts.map((prod, idx) => {
              const unitProfit = prod.price - prod.supplierCost
              const estimatedUnitsToRecover =
                unitProfit > 0
                  ? Math.ceil(deficitAmount / unitProfit)
                  : Math.ceil(deficitAmount / prod.price)
              const contributionPercent = [45, 32, 23][idx] || 20
              const itemMargin = Math.round((unitProfit / prod.price) * 100)

              return (
                <div
                  key={prod.id}
                  className="bg-[#0B0D12] border border-[#232B3A] hover:border-[#8B5CF6]/50 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-white line-clamp-1">{prod.name}</span>
                    <span className="badge-pill-sm text-[10px] bg-[#34D399]/20 text-[#34D399] shrink-0 font-bold">
                      {prod.speed} un/dia
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#A1A6B3]">
                      <span>Venda / Custo:</span>
                      <span className="text-white font-semibold">
                        R$ {prod.price.toFixed(2).replace('.', ',')} / R${' '}
                        {prod.supplierCost.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#A1A6B3]">
                      <span>Lucro por unidade:</span>
                      <span className="text-[#34D399] font-bold">
                        +R$ {unitProfit.toFixed(2).replace('.', ',')} ({itemMargin}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-[#A1A6B3]">
                      <span>Contribuição projetada:</span>
                      <span className="text-[#22D3EE] font-bold">
                        {contributionPercent}% do caixa
                      </span>
                    </div>
                    <div className="flex justify-between text-[#A1A6B3]">
                      <span>Vendas para zerar déficit:</span>
                      <span className="text-white font-bold">
                        ~{estimatedUnitsToRecover} pedidos
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sugestões de Produtos da Internet com Próximos Passos */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              Sugestões de Produtos da Internet (Nicho Motociclista)
            </h2>
            <p className="text-xs text-[#A1A6B3]">
              Itens virais com alta margem de repasse no Mercado Livre para você introduzir na sua
              operação de dropshipping.
            </p>
          </div>
        </div>

        {/* Grid de Cards Sugeridos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INTERNET_SUGGESTED_PRODUCTS.map((sug) => {
            const isHigh = sug.probability === 'Alta probabilidade'

            return (
              <div
                key={sug.id}
                className="bg-[#151923] border border-[#232B3A] hover:border-[#22D3EE]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover-lift shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider truncate">
                      {sug.niche}
                    </span>
                    <span
                      className={`badge-pill-sm text-[10px] font-bold shrink-0 ${
                        isHigh
                          ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40'
                          : 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40'
                      }`}
                    >
                      {sug.probability}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">{sug.name}</h3>

                  <p className="text-xs text-[#A1A6B3] line-clamp-3 leading-relaxed">
                    {sug.description}
                  </p>

                  <div className="bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A] space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A6B3]">Preço sugerido:</span>
                      <span className="font-bold text-white font-tabular">
                        R$ {sug.estimatedPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A6B3]">Margem bruta média:</span>
                      <span className="font-bold text-[#34D399]">{sug.averageMargin}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedSuggestion(sug)}
                  className="w-full rounded-full bg-[#1B212D] hover:bg-[#8B5CF6] hover:text-white text-[#22D3EE] border border-[#22D3EE]/30 text-xs font-semibold h-10 transition-colors"
                >
                  Ver próximos passos
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de Próximos Passos */}
      <Dialog
        open={!!selectedSuggestion}
        onOpenChange={(open) => !open && setSelectedSuggestion(null)}
      >
        <DialogContent className="bg-[#151923] border-[#232B3A] text-white sm:max-w-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-bold text-[#34D399] mb-1">
              <CheckCircle2 className="w-4 h-4" />
              {selectedSuggestion?.probability} • Margem {selectedSuggestion?.averageMargin}
            </div>
            <DialogTitle className="text-xl font-bold text-white leading-tight">
              {selectedSuggestion?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#A1A6B3] pt-1">
              Passo a passo acionável para comercializar este produto e faturar no menor tempo
              possível:
            </DialogDescription>
          </DialogHeader>

          {/* Lista Numerada de Passos */}
          <div className="space-y-3.5 py-4">
            {selectedSuggestion?.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-1 hover:border-[#8B5CF6]/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h4>
                </div>
                <p className="text-xs text-[#A1A6B3] pl-8 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="button"
              onClick={() => setSelectedSuggestion(null)}
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold px-6"
            >
              Entendido, aplicar estratégia
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
