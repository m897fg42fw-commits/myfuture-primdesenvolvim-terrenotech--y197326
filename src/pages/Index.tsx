import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  ShoppingCart,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Check,
  ShieldAlert,
  Users,
  SlidersHorizontal,
  PackageCheck,
  Compass,
  Map,
} from 'lucide-react'
import MountainMotoLogo from '@/components/MountainMotoLogo'
import {
  DEMO_PRODUCTS,
  DemoProduct,
  CATEGORIES,
  POPULAR_COMPATIBLE_MODELS,
  DisplacementLayer,
} from '@/lib/demoProducts'
import { useAuth } from '@/contexts/AuthContext'
import { useFounderMode } from '@/contexts/FounderModeContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/ProductImage'

export default function Index() {
  const { isAuthenticated } = useAuth()
  const { isFounderMode } = useFounderMode()
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>('all')

  // Se vier com ?categoria=Peças na URL, sincroniza o filtro
  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat && CATEGORIES.includes(cat as any)) {
      setSelectedCategory(cat)
    }
  }, [searchParams])

  const { addItem } = useCart()
  const { toast } = useToast()
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({})

  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.compatibleModels &&
          product.compatibleModels.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory

      const matchesLayer =
        selectedLayer === 'all' ||
        product.displacementLayer === (selectedLayer as DisplacementLayer) ||
        (!product.displacementLayer &&
          (selectedLayer === 'all' || selectedLayer === 'nucleo-250cc'))

      let matchesModel = true
      if (selectedModelFilter !== 'all') {
        const targetModel = POPULAR_COMPATIBLE_MODELS.find((m) => m.id === selectedModelFilter)
        if (targetModel) {
          // Checa se o modelo está explícito nos compatíveis ou se é universal
          const isCompatible =
            product.compatibleModels &&
            product.compatibleModels.some(
              (m) =>
                m.toLowerCase().includes('universal') ||
                m.toLowerCase().includes(selectedModelFilter.replace('-', ' ')) ||
                m.toLowerCase().includes(targetModel.name.split(' ')[0].toLowerCase()),
            )
          matchesModel = !!isCompatible
        }
      }

      return matchesSearch && matchesCategory && matchesLayer && matchesModel
    })
  }, [searchTerm, selectedCategory, selectedLayer, selectedModelFilter])

  const handleQuickAdd = (product: DemoProduct) => {
    const defaultVariation =
      product.variations.length > 0 ? product.variations[0].options[0] : undefined
    addItem(product, defaultVariation, 1)

    // Efeito de feedback rápido no botão
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }))
    }, 1200)

    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao seu carrinho.`,
      className: 'bg-[#151923] border-[#232B3A] text-white',
    })
  }

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Banner de Destaque Animado com a Imagem da Marca (Morro Fortaleza - RS) */}
      <section className="relative overflow-hidden rounded-3xl border border-[#232B3A] p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-[#151923] via-[#10141e] to-[#0B0D12] shadow-2xl">
        {/* Elementos visuais de brilho no fundo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none animate-float-gentle" />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#22D3EE]/15 rounded-full blur-3xl pointer-events-none animate-float-gentle"
          style={{ animationDelay: '2.5s' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Coluna Texto e Botões de Ação */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
                Terrenotech • Peças até 450cc em Duas Camadas
              </div>
              <span className="text-[11px] text-[#A1A6B3] bg-[#0B0D12]/80 px-2.5 py-1 rounded-full border border-[#232B3A]">
                ⛰️ Morro Fortaleza (RS)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Peças até 450cc em duas camadas: <br className="hidden sm:inline" />
              <span className="gradient-brand-text">giro no núcleo e ticket no segmento alto</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A6B3] max-w-2xl leading-relaxed">
              Dropshipping nacional sem estoque em duas camadas estratégicas:{' '}
              <strong>núcleo até 250cc</strong> (CG 160, Factor 150, Biz 125 — 80% do mercado,
              volume e giro) + <strong>camada 250–450cc</strong> (CB 300, Twister, Dominar 400,
              Ninja 400, Himalayan 450, Lander — ticket maior e menor concorrência). Compre só
              depois de vender, com caixa positivo por construção.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {/* Botões internos visíveis apenas com o Modo Fundador ATIVADO */}
              {isFounderMode && (
                <>
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#22D3EE] hover:opacity-95 text-[#0B0D12] font-black px-5 py-2.5 h-auto shadow-lg shadow-[#8B5CF6]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Link to="/roteiro" className="flex items-center gap-2">
                      <Map className="w-4 h-4 text-[#0B0D12]" />
                      Roteiro do Fundador
                      <ArrowRight className="w-4 h-4 text-[#0B0D12]" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-95 text-white font-bold px-4 py-2.5 h-auto shadow-lg shadow-[#10B981]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
                  >
                    <Link to="/analises/plano" className="flex items-center gap-2">
                      <Compass className="w-4 h-4" />
                      Plano de Voo
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-[#F87171] to-[#EC4899] hover:opacity-95 text-white font-bold px-4 py-2.5 h-auto shadow-lg shadow-[#F87171]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
                  >
                    <Link to="/analises/queda" className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      Filão da Queda (Interno)
                    </Link>
                  </Button>
                </>
              )}

              {/* Botões Públicos (limpos) */}
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#1E3A8A]/80 bg-[#0B132B]/80 hover:bg-[#1E3A8A]/30 text-[#60A5FA] font-bold px-4 py-2.5 h-auto transition-all text-xs"
              >
                <Link to="/clube" className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#60A5FA]" />
                  Clube Moto-T — Programa Terrenotech
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#34D399]/50 bg-[#151923] hover:bg-[#34D399]/20 text-[#34D399] font-bold px-4 py-2.5 h-auto transition-all text-xs"
              >
                <Link to="/por-que-comprar-online" className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#34D399]" />
                  Por Que Online? (Estudo)
                </Link>
              </Button>
            </div>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#A1A6B3]">
              <Zap className="w-3.5 h-3.5 text-[#34D399]" />
              <span>
                Peças essenciais até 450cc com marcas paralelas TOP nacionais (Vaz, Pro Tork,
                Cobreq, Nakata, Magnetron) e margem média de ~40%
              </span>
            </div>
          </div>

          {/* Coluna Ilustração da Marca: Morro Fortaleza no RS com a moto no topo */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#10B981]/30 via-[#22D3EE]/20 to-[#8B5CF6]/30 blur-lg opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative rounded-2xl overflow-hidden border border-[#232B3A] bg-[#0B0D12] shadow-2xl">
              <MountainMotoLogo variant="hero" />
              <div className="px-4 py-3 bg-[#121620] border-t border-[#232B3A] flex items-center justify-between text-xs">
                <span className="text-[#A1A6B3] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Identidade Terrenotech: Liberdade & Resistência
                </span>
                <span className="text-[#34D399] font-bold font-mono">Morro Fortaleza • RS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Banner Destaque de Mercado / Por Que Online? */}
      <section className="bg-gradient-to-r from-[#1B1429] via-[#151923] to-[#0E1524] border border-[#8B5CF6]/30 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1.5 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#22D3EE] bg-[#22D3EE]/10 px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
            <span>📊 Pesquisa Kantar / Varejo S.A. & IBGE</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            Por que 66% dos motociclistas preferem comprar peças pelo site?
          </h3>
          <p className="text-xs text-[#A1A6B3] leading-relaxed">
            Economia de até 50% frente à concessionária, pronta entrega das maiores distribuidoras
            brasileiras e marcas consolidadas (Vaz, Pro Tork, Cobreq, Nakata). Sem intermediário e
            com nota fiscal.
          </p>
        </div>
        <Button
          asChild
          className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-black px-5 py-2 h-auto text-xs shrink-0 shadow-md shadow-[#8B5CF6]/30"
        >
          <Link to="/por-que-comprar-online" className="flex items-center gap-1.5">
            Ver Estudo Completo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </section>

      {/* Seção do Catálogo */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Catálogo de produtos
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1B212D] text-[#22D3EE] border border-[#232B3A]">
                {filteredProducts.length} itens
              </span>
            </h2>
            <p className="text-sm text-[#A1A6B3]">
              Selecione os produtos para montar o pedido ou cobrar seu cliente.
            </p>
          </div>

          {/* Barra de Busca e Filtro de Categoria */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[240px] sm:w-72">
              <Search className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, moto (ex: Dominar 400)..."
                className="w-full bg-[#151923] border border-[#232B3A] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-[#A1A6B3] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A1A6B3] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <SlidersHorizontal className="w-4 h-4 text-[#A1A6B3] hidden sm:block mr-1" />
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all ${
                      isSelected
                        ? 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/40'
                        : 'bg-[#151923] text-[#A1A6B3] hover:text-white hover:bg-[#1B212D] border border-[#232B3A]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Barra de Filtros Estratégicos: Camada de Cilindrada & Modelo de Moto Compatível */}
        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#232B3A] pb-3">
            {/* Seletor de Camadas */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
                Camada de Mercado:
              </span>
              <button
                type="button"
                onClick={() => setSelectedLayer('all')}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all border ${
                  selectedLayer === 'all'
                    ? 'bg-white text-[#0B0D12] border-white shadow-md'
                    : 'bg-[#0B0D12] text-[#A1A6B3] border-[#232B3A] hover:text-white'
                }`}
              >
                Todas as Camadas
              </button>
              <button
                type="button"
                onClick={() => setSelectedLayer('nucleo-250cc')}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all border flex items-center gap-1.5 ${
                  selectedLayer === 'nucleo-250cc'
                    ? 'bg-[#22D3EE] text-[#0B0D12] border-[#22D3EE] shadow-md shadow-[#22D3EE]/30'
                    : 'bg-[#0B0D12] text-[#22D3EE] border-[#22D3EE]/40 hover:bg-[#22D3EE]/10'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Núcleo até 250cc (80% Mercado)
              </button>
              <button
                type="button"
                onClick={() => setSelectedLayer('camada-250-450cc')}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all border flex items-center gap-1.5 ${
                  selectedLayer === 'camada-250-450cc'
                    ? 'bg-[#10B981] text-[#0B0D12] border-[#10B981] shadow-md shadow-[#10B981]/30'
                    : 'bg-[#0B0D12] text-[#34D399] border-[#10B981]/40 hover:bg-[#10B981]/10'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Camada 250–450cc (Ticket Maior)
              </button>
            </div>

            {/* Contador / Resumo do Filtro */}
            <div className="text-xs text-[#A1A6B3]">
              Exibindo <strong className="text-white">{filteredProducts.length}</strong> peças e
              acessórios
            </div>
          </div>

          {/* Filtro de Compatibilidade por Moto */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-[#A1A6B3] shrink-0">
              Filtrar por modelo de moto:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 flex-1">
              <button
                type="button"
                onClick={() => setSelectedModelFilter('all')}
                className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg font-medium transition-all border ${
                  selectedModelFilter === 'all'
                    ? 'bg-[#8B5CF6]/20 text-[#C4B5FD] border-[#8B5CF6]/50'
                    : 'bg-[#0B0D12] text-[#A1A6B3] border-[#232B3A] hover:text-white'
                }`}
              >
                Todos os Modelos
              </button>
              {POPULAR_COMPATIBLE_MODELS.map((mod) => {
                const isSelected = selectedModelFilter === mod.id
                const isUpperLayer = mod.layer === 'camada-250-450cc'
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelectedModelFilter(mod.id)}
                    className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg font-medium transition-all border flex items-center gap-1 ${
                      isSelected
                        ? isUpperLayer
                          ? 'bg-[#10B981] text-[#0B0D12] border-[#10B981] font-bold'
                          : 'bg-[#22D3EE] text-[#0B0D12] border-[#22D3EE] font-bold'
                        : isUpperLayer
                          ? 'bg-[#0B0D12] text-[#34D399] border-[#10B981]/30 hover:border-[#10B981]'
                          : 'bg-[#0B0D12] text-[#A1A6B3] border-[#232B3A] hover:text-white'
                    }`}
                  >
                    <span>{mod.name}</span>
                    {isUpperLayer && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#10B981]/20 text-[#6EE7B7] border border-[#10B981]/30">
                        250-450cc
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Grade de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = !!addedItemMap[product.id]

              return (
                <div
                  key={product.id}
                  className={`group relative bg-[#151923] border ${
                    product.bestValueHighlight
                      ? 'border-[#34D399] shadow-lg shadow-[#34D399]/10'
                      : 'border-[#232B3A] hover:border-[#8B5CF6]/50'
                  } rounded-2xl p-5 flex flex-col justify-between hover-lift transition-all duration-200`}
                >
                  <div>
                    {/* Foto Real do Produto com Fallback de Ilustração Vetorial Digna */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#0B0D12] border border-[#232B3A] mb-4">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Gradiente escuro sobre a imagem para contraste */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-transparent to-black/30 pointer-events-none" />

                      {/* Tag / Pílula de Categoria e Marca */}
                      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                        {product.bestValueHighlight && (
                          <span className="badge-pill-sm text-[10px] bg-[#34D399] text-[#0B0D12] font-black uppercase tracking-wider shadow-md">
                            ★ Melhor valor
                          </span>
                        )}
                        {/* Pílula de Camada de Mercado */}
                        {product.displacementLayer === 'camada-250-450cc' ? (
                          <span className="badge-pill-sm text-[10px] bg-[#10B981]/90 backdrop-blur-md text-[#0B0D12] font-black uppercase tracking-wider shadow-md">
                            Camada 250–450cc
                          </span>
                        ) : product.displacementLayer === 'nucleo-250cc' ? (
                          <span className="badge-pill-sm text-[10px] bg-[#22D3EE]/90 backdrop-blur-md text-[#0B0D12] font-bold uppercase tracking-wider shadow-md">
                            Núcleo até 250cc
                          </span>
                        ) : null}
                        <span className="badge-pill-sm text-[11px] bg-[#0B0D12]/90 backdrop-blur-md border border-[#232B3A] text-[#22D3EE] font-semibold">
                          {product.category}
                        </span>
                        {product.brand && (
                          <span className="badge-pill-sm text-[10px] bg-[#8B5CF6]/30 backdrop-blur-md border border-[#8B5CF6]/60 text-[#e9d5ff] font-bold uppercase tracking-wider">
                            {product.brand}
                          </span>
                        )}
                        {product.savingsPill && (
                          <span className="badge-pill-sm text-[10px] bg-[#34D399]/20 border border-[#34D399]/50 text-[#34D399] font-bold">
                            {product.savingsPill}
                          </span>
                        )}
                        {product.urgentItem && (
                          <span className="badge-pill-sm text-[10px] bg-[#F87171]/30 border border-[#F87171]/60 text-[#FCA5A5] font-bold">
                            ⚡ Troca imediata
                          </span>
                        )}
                        {product.quickReplacementKeyItem && !product.urgentItem && (
                          <span className="badge-pill-sm text-[10px] bg-[#22D3EE]/20 border border-[#22D3EE]/50 text-[#22D3EE] font-bold">
                            🔄 Reposição rápida
                          </span>
                        )}
                        {product.isSafetyCrash && (
                          <span className="badge-pill-sm text-[11px] bg-[#F87171]/30 border border-[#F87171]/60 text-[#FCA5A5] font-bold">
                            Segurança & Proteção
                          </span>
                        )}
                        {product.tag &&
                          !product.isSafetyCrash &&
                          !product.bestValueHighlight &&
                          !product.urgentItem && (
                            <span className="badge-pill-sm text-[11px] bg-[#151923]/90 border border-[#232B3A] text-[#F4F5F7] font-medium">
                              {product.tag}
                            </span>
                          )}
                      </div>

                      {/* Pílula de Margem Estimada — EXCLUSIVO MODO FUNDADOR */}
                      {isFounderMode &&
                        (() => {
                          const marginPercent = Math.round(
                            ((product.price - product.supplierCost) / product.price) * 100,
                          )
                          return (
                            <div className="absolute top-3 right-3 z-10 text-[11px] font-bold text-amber-400 bg-[#0B0D12]/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-500/50 shadow-md flex items-center gap-1">
                              <span>Margem ~{marginPercent}%</span>
                            </div>
                          )
                        })()}

                      {/* Indicador de giro e custo — EXCLUSIVO MODO FUNDADOR */}
                      {isFounderMode && (
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] z-10">
                          <span className="text-[#A1A6B3] bg-[#0B0D12]/90 px-2 py-0.5 rounded-md border border-amber-500/30">
                            Custo forn.:{' '}
                            <strong className="text-amber-300">
                              R$ {product.supplierCost.toFixed(2).replace('.', ',')}
                            </strong>
                          </span>
                          <span className="font-semibold text-[#34D399] bg-[#0B0D12]/90 px-2 py-0.5 rounded-md border border-[#34D399]/30 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {product.speed} un/dia
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="space-y-2">
                      <Link to={`/produto/${product.id}`} className="block">
                        <h3 className="font-bold text-lg text-white group-hover:text-[#22D3EE] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Pílula de Garantia e Origem */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-2 py-0.5 rounded-full">
                          🛡️ {product.warranty.split('(')[0].trim()}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#A1A6B3] bg-[#0B0D12] border border-[#232B3A] px-2 py-0.5 rounded-full">
                          🇧🇷 Distribuidora Nacional
                        </span>
                      </div>

                      <p className="text-xs text-[#A1A6B3] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Preço e Botões de Ação */}
                  <div className="pt-5 mt-4 border-t border-[#232B3A] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#A1A6B3] block uppercase tracking-wider">
                        Preço
                      </span>
                      <span className="text-xl font-extrabold text-white font-tabular">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-[#232B3A] bg-[#1B212D] hover:bg-[#232B3A] hover:text-white text-xs h-9 px-3.5"
                      >
                        <Link to={`/produto/${product.id}`}>Ver produto</Link>
                      </Button>

                      <Button
                        onClick={() => handleQuickAdd(product)}
                        className={`rounded-full h-9 px-3.5 text-xs font-bold transition-all duration-200 shadow-md ${
                          isAdded
                            ? 'bg-[#34D399] text-[#0B0D12] hover:bg-[#34D399]'
                            : 'bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EF4444] hover:from-[#C2410C] hover:to-[#DC2626] text-white shadow-[#EA580C]/30 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-[#0B0D12]" />
                            Adicionado!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                            Adicionar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Estado Vazio */
          <div className="bg-[#151923] border border-[#232B3A] rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1B212D] border border-[#232B3A] flex items-center justify-center mx-auto text-[#A1A6B3]">
              <PackageCheck className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Nenhum produto encontrado</h3>
              <p className="text-xs text-[#A1A6B3]">
                Tente ajustar os termos de busca ou mudar a categoria selecionada.
              </p>
            </div>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todos')
                setSelectedLayer('all')
                setSelectedModelFilter('all')
              }}
              variant="outline"
              className="rounded-full border-[#8B5CF6]/40 text-[#22D3EE] hover:bg-[#8B5CF6]/20"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
