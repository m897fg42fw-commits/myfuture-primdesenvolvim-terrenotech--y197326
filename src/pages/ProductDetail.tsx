import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ShoppingCart,
  CreditCard,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  TrendingUp,
  Zap,
  ArrowLeft,
  ArrowRight,
  Package,
  Layers,
  DollarSign,
  SendHorizontal,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  HelpCircle,
} from 'lucide-react'
import { DEMO_PRODUCTS } from '@/lib/demoProducts'
import { useCart } from '@/contexts/CartContext'
import { useFounderMode } from '@/contexts/FounderModeContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/ProductImage'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isFounderMode } = useFounderMode()
  const { addItem } = useCart()
  const { toast } = useToast()

  const product = DEMO_PRODUCTS.find((p) => p.id === id)

  // Estado das variações selecionadas (guarda uma opção por variação)
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>(() => {
    if (!product || product.variations.length === 0) return {}
    const initial: Record<string, string> = {}
    product.variations.forEach((v) => {
      initial[v.name] = v.options[0]
    })
    return initial
  })

  const [quantity, setQuantity] = useState<number>(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Produto não encontrado</h2>
        <p className="text-sm text-[#A1A6B3]">
          O item solicitado não existe no catálogo de demonstração.
        </p>
        <Button asChild className="rounded-full bg-[#8B5CF6]">
          <Link to="/">Voltar ao catálogo</Link>
        </Button>
      </div>
    )
  }

  // Gera string combinada da variação ex: "Preto Grafite, Com Case Protetor"
  const variationString = Object.values(selectedVariations).join(', ')
  const marginPercent = Math.round(((product.price - product.supplierCost) / product.price) * 100)
  const estimatedProfit = (product.price - product.supplierCost) * quantity

  const handleAddToCart = () => {
    addItem(product, variationString || undefined, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)

    toast({
      title: 'Produto adicionado!',
      description: `${quantity}x ${product.name} no carrinho.`,
      className: 'bg-[#151923] border-[#232B3A] text-white',
    })
  }

  const handleBuyNow = () => {
    addItem(product, variationString || undefined, quantity)
    navigate('/carrinho')
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#A1A6B3]">
        <Link to="/" className="hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Catálogo
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#22D3EE] font-medium">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Grid Principal de 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Coluna da Imagem */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative w-full aspect-square rounded-3xl bg-[#0B0D12] border border-[#232B3A] overflow-hidden shadow-2xl group">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradiente escuro para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/80 via-transparent to-black/40 pointer-events-none" />

            {/* Badges no topo */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <div className="flex flex-wrap items-center gap-2">
                {product.bestValueHighlight && (
                  <span className="badge-pill text-xs bg-[#34D399] text-[#0B0D12] font-black uppercase tracking-wider shadow-md">
                    ★ Melhor valor
                  </span>
                )}
                <span className="badge-pill text-xs bg-[#0B0D12]/90 backdrop-blur-md border border-[#232B3A] text-[#22D3EE] font-semibold">
                  {product.category}
                </span>
                <span className="badge-pill text-xs bg-[#8B5CF6]/30 backdrop-blur-md border border-[#8B5CF6]/60 text-white font-bold uppercase tracking-wider">
                  Marca: {product.brand}
                </span>
              </div>
              {product.savingsPill && (
                <span className="badge-pill text-xs bg-[#34D399]/20 border border-[#34D399]/60 text-[#34D399] font-bold">
                  {product.savingsPill}
                </span>
              )}
              {product.urgentItem && (
                <span className="badge-pill text-xs bg-[#F87171]/40 border border-[#F87171]/70 text-[#FCA5A5] font-bold">
                  ⚡ Item de urgência: troca imediata
                </span>
              )}
              {product.quickReplacementKeyItem && !product.urgentItem && (
                <span className="badge-pill text-xs bg-[#22D3EE]/20 border border-[#22D3EE]/60 text-[#22D3EE] font-bold">
                  🔄 Item chave de reposição rápida
                </span>
              )}
              {product.isSafetyCrash && (
                <span className="badge-pill text-xs bg-[#F87171]/40 border border-[#F87171]/70 text-[#FCA5A5] font-bold">
                  Segurança & Proteção
                </span>
              )}
              {product.tag &&
                !product.isSafetyCrash &&
                !product.bestValueHighlight &&
                !product.urgentItem && (
                  <span className="badge-pill text-xs bg-[#151923]/90 border border-[#232B3A] text-[#e9d5ff] font-semibold">
                    {product.tag}
                  </span>
                )}
            </div>

            {/* Margem e Giro — EXCLUSIVO MODO FUNDADOR */}
            {isFounderMode && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-[#0B0D12]/95 backdrop-blur-md border border-amber-500/50 text-amber-300 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Margem ~{marginPercent}%
                </span>

                <div className="bg-[#0B0D12]/90 backdrop-blur-md border border-[#232B3A] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>{product.speed} un/dia</span>
                </div>
              </div>
            )}
          </div>

          {/* Destaques do produto em pílulas */}
          <div className="grid grid-cols-2 gap-2.5">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#151923] border border-[#232B3A] px-3 py-2 rounded-xl text-xs text-[#F4F5F7] flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna das Informações */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#c4b5fd] uppercase tracking-wider">
                Marca: {product.brand}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#34D399]/15 border border-[#34D399]/40 text-[#34D399] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.warranty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Nacional (Distribuidora BR)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm text-[#A1A6B3] leading-relaxed">{product.description}</p>
          </div>

          {/* NOVO BLOCO DE ESPECIFICAÇÕES EM PÍLULAS / CARDS VISÍVEIS */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#232B3A] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                Especificações Técnicas de Confiança
              </h3>
              <Link
                to="/por-que-comprar-online"
                className="text-[11px] text-[#8B5CF6] hover:text-[#22D3EE] transition-colors underline flex items-center gap-1"
              >
                Por que paralela TOP?
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Card Marca */}
              <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-[#232B3A] space-y-1">
                <span className="text-[10px] text-[#A1A6B3] uppercase font-bold tracking-wider block">
                  Marca da Peça
                </span>
                <span className="text-base font-extrabold text-white block">{product.brand}</span>
                <p className="text-[11px] text-[#A1A6B3]">
                  Marca paralela TOP consolidada no Brasil, com garantia e procedência.
                </p>
              </div>

              {/* Card Garantia */}
              <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-[#232B3A] space-y-1">
                <span className="text-[10px] text-[#A1A6B3] uppercase font-bold tracking-wider block">
                  Garantia
                </span>
                <span className="text-base font-extrabold text-[#34D399] block flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Garantia com NF
                </span>
                <p className="text-[11px] text-[#A1A6B3]">{product.warranty}</p>
              </div>

              {/* Card Origem */}
              <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-[#232B3A] space-y-1">
                <span className="text-[10px] text-[#A1A6B3] uppercase font-bold tracking-wider block">
                  Origem do Produto
                </span>
                <span className="text-sm font-bold text-white block">
                  🇧🇷 Produto Nacional Pronto
                </span>
                <p className="text-[11px] text-[#A1A6B3]">
                  {product.origin || 'Fornecedor distribuidora brasileira autorizada.'}
                </p>
              </div>

              {/* Card Compatibilidade Rápida */}
              <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-[#232B3A] space-y-1">
                <span className="text-[10px] text-[#A1A6B3] uppercase font-bold tracking-wider block">
                  Compatibilidade Oficial
                </span>
                <span className="text-sm font-bold text-[#22D3EE] block">
                  {product.displacementLayer === 'camada-250-450cc'
                    ? 'Camada 250–450cc'
                    : product.displacementLayer === 'nucleo-250cc'
                      ? 'Núcleo até 250cc'
                      : 'Motos até 450cc'}
                </span>
                <p className="text-[11px] text-[#A1A6B3]">
                  Ano e modelo confirmados no seletor abaixo. Sem adaptação mecânica.
                </p>
              </div>
            </div>

            {/* Lista Explícita de Modelos e Anos Compatíveis */}
            {product.compatibleModels && product.compatibleModels.length > 0 && (
              <div className="pt-2 border-t border-[#232B3A]/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Modelos & Anos 100% Compatíveis:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibleModels.map((mod, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs bg-[#0B0D12] border border-[#232B3A] text-[#F4F5F7] font-medium"
                    >
                      ✓ {mod}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preço e Bloco de Custos Dropshipping */}
          <div className="bg-[#151923] border border-[#232B3A] p-5 rounded-2xl space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase text-[#A1A6B3] tracking-wider block">
                  Preço de Venda
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white font-tabular">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#34D399] font-semibold block">
                  Envio Direto da Distribuidora
                </span>
                <span className="text-xs text-[#A1A6B3]">Produto nacional com NF</span>
              </div>
            </div>

            {/* Detalhe da Margem de Repasse Dropshipping — EXCLUSIVO MODO FUNDADOR */}
            {isFounderMode && (
              <div className="pt-3 border-t border-amber-500/30 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-[#0B0D12] p-2.5 rounded-xl border border-amber-500/30">
                  <span className="text-amber-400/80 block text-[10px] uppercase font-bold">
                    Custo Fornecedor
                  </span>
                  <span className="font-bold text-amber-300">
                    R$ {product.supplierCost.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="bg-[#0B0D12] p-2.5 rounded-xl border border-[#232B3A]">
                  <span className="text-[#A1A6B3] block text-[10px] uppercase">
                    Seu Lucro Líquido
                  </span>
                  <span className="font-bold text-[#34D399]">
                    R$ {(product.price - product.supplierCost).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="bg-[#0B0D12] p-2.5 rounded-xl border border-[#232B3A]">
                  <span className="text-[#A1A6B3] block text-[10px] uppercase">
                    Margem de Repasse
                  </span>
                  <span className="font-bold text-[#22D3EE]">~{marginPercent}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Seletores de Variações */}
          {product.variations.length > 0 && (
            <div className="space-y-4 pt-2">
              {product.variations.map((v) => (
                <div key={v.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white uppercase tracking-wider">
                      {v.name}:
                    </span>
                    <span className="text-[#22D3EE] font-medium">{selectedVariations[v.name]}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => {
                      const isSelected = selectedVariations[v.name] === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setSelectedVariations((prev) => ({ ...prev, [v.name]: opt }))
                          }
                          className={`badge-pill text-xs transition-all border ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white border-transparent shadow-md shadow-[#8B5CF6]/30'
                              : 'bg-[#151923] text-[#A1A6B3] border-[#232B3A] hover:text-white hover:border-[#8B5CF6]/40'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contador de Quantidade e Ações */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Quantidade:
              </span>
              <div className="flex items-center bg-[#151923] border border-[#232B3A] rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A6B3] hover:text-white hover:bg-[#1B212D] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-white font-tabular">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A6B3] hover:text-white hover:bg-[#1B212D] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                className={`w-full rounded-full h-12 text-sm font-bold transition-all duration-200 shadow-lg ${
                  isAdded
                    ? 'bg-[#34D399] text-[#0B0D12] hover:bg-[#34D399]'
                    : 'bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EF4444] hover:from-[#C2410C] hover:to-[#DC2626] text-white shadow-[#EA580C]/30 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Adicionado ao carrinho!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao carrinho
                  </>
                )}
              </Button>

              <Button
                onClick={handleBuyNow}
                className="w-full rounded-full h-12 text-sm font-bold bg-gradient-to-r from-[#1E293B] to-[#0F172A] hover:from-[#334155] hover:to-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/50 hover:border-[#38BDF8] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <CreditCard className="w-4 h-4 mr-2 text-[#38BDF8]" />
                Comprar agora
              </Button>
            </div>
          </div>

          {/* Pílulas Informativas de Confiança */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#232B3A]">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#151923] border border-[#232B3A]">
              <Truck className="w-4 h-4 text-[#34D399] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold text-white block">Entrega parceiros</span>
                <span className="text-[#A1A6B3]">Rastreamento direto</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#151923] border border-[#232B3A]">
              <RotateCcw className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold text-white block">Troca em 7 dias</span>
                <span className="text-[#A1A6B3]">Garantia sem complicação</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#151923] border border-[#232B3A]">
              <Headphones className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold text-white block">Atendimento rápido</span>
                <span className="text-[#A1A6B3]">Suporte humanizado</span>
              </div>
            </div>
          </div>

          {/* Bloco "Como este pedido funciona" — EXCLUSIVO MODO FUNDADOR */}
          {isFounderMode && (
            <div className="bg-gradient-to-br from-[#151923] to-[#121620] border border-amber-500/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Como este pedido funciona (Operação Interna Dropshipping)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-[#0B0D12] font-black text-[11px] flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="font-bold text-white">Cliente pede no app</span>
                  </div>
                  <p className="text-[11px] text-[#A1A6B3] pl-7">
                    O cliente finaliza a compra pagando R${' '}
                    {product.price.toFixed(2).replace('.', ',')}.
                  </p>
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#22D3EE] text-[#0B0D12] font-black text-[11px] flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="font-bold text-white">Você repassa ao fornecedor</span>
                  </div>
                  <p className="text-[11px] text-[#A1A6B3] pl-7">
                    Pague o custo de R$ {product.supplierCost.toFixed(2).replace('.', ',')} e
                    informe o endereço do cliente.
                  </p>
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#34D399] text-[#0B0D12] font-black text-[11px] flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span className="font-bold text-white">Fornecedor entrega direto</span>
                  </div>
                  <p className="text-[11px] text-[#A1A6B3] pl-7">
                    O fornecedor embala e despacha na porta do cliente final sem você tocar no
                    pacote.
                  </p>
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F472B6] text-[#0B0D12] font-black text-[11px] flex items-center justify-center shrink-0">
                      4
                    </span>
                    <span className="font-bold text-white">Conclua e embolse o lucro</span>
                  </div>
                  <p className="text-[11px] text-[#A1A6B3] pl-7">
                    Marque como Concluído no Painel e fique com sua margem de R${' '}
                    {(product.price - product.supplierCost).toFixed(2).replace('.', ',')}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bloco "Sobre o Produto" */}
          <div className="space-y-2 pt-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sobre o produto
            </h3>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">{product.fullDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
