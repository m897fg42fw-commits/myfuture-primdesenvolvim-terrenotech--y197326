import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  Flame,
  Info,
  Package,
  Plus,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'
import { DEMO_PRODUCTS, DemoProduct } from '@/lib/demoProducts'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

interface CrashStatItem {
  id: string
  name: string
  category: string
  crashRate: number // Frequência estimada de quebra em queda leve (%)
  typicalCostRange: string // Faixa de custo de reposição no mercado físico / concessionárias
  associatedProductId: string // ID no DEMO_PRODUCTS
  description: string
  urgency:
    | 'Crítica (Moto não roda sem)'
    | 'Imediata (Multa / Visibilidade)'
    | 'Estética / Funcional'
}

// 8 Peças que mais quebram numa queda leve de motos urbanas até 450cc (ordem decrescente)
const CRASH_STATS: CrashStatItem[] = [
  {
    id: 'retrovisor',
    name: 'Retrovisor / Espelho',
    category: 'Visibilidade & Segurança',
    crashRate: 92,
    typicalCostRange: 'R$ 95,00 a R$ 250,00 (o par na concessionária)',
    associatedProductId: 'retrovisor-par-cg-160-padrao-original',
    description:
      'Primeiro ponto a bater no chão ao tombar a moto. Vidro estilhaça ou haste de fixação entorta/rompe a rosca no manicoto.',
    urgency: 'Imediata (Multa / Visibilidade)',
  },
  {
    id: 'pisca-lente',
    name: 'Pisca / Seta Dianteira & Traseira',
    category: 'Iluminação & Sinalização',
    crashRate: 85,
    typicalCostRange: 'R$ 75,00 a R$ 180,00 (o par)',
    associatedProductId: 'par-piscas-dianteiros-cg-160-fumê-cristal',
    description:
      'Haste plástica ressecada quebra no suporte ou a lente de acrílico trinca na batida lateral contra o asfalto.',
    urgency: 'Imediata (Multa / Visibilidade)',
  },
  {
    id: 'espelho-manicoto',
    name: 'Espelho / Manete de Freio e Embreagem',
    category: 'Controles de Guidão',
    crashRate: 78,
    typicalCostRange: 'R$ 60,00 a R$ 140,00 (par de manetes)',
    associatedProductId: 'manoplas-balanca-guidao-cg-160-circuito',
    description:
      'A ponta esférica do manete quebra no ponto de alívio ou o suporte do manicoto se solta, impedindo troca de marchas ou freio.',
    urgency: 'Crítica (Moto não roda sem)',
  },
  {
    id: 'manopla',
    name: 'Manopla & Peso de Guidão',
    category: 'Acabamento & Conforto',
    crashRate: 71,
    typicalCostRange: 'R$ 55,00 a R$ 130,00',
    associatedProductId: 'manoplas-balanca-guidao-cg-160-circuito',
    description:
      'A borracha rasga na extremidade e o tubo do acelerador de nylon trava com a entrada de terra e pedriscos.',
    urgency: 'Estética / Funcional',
  },
  {
    id: 'pedana-cavalete',
    name: 'Pedana / Estribo Central & Cavalete',
    category: 'Apoio Estrutural',
    crashRate: 64,
    typicalCostRange: 'R$ 70,00 a R$ 190,00',
    associatedProductId: 'pedana-cavalete-lateral-cg-160-reforcado',
    description:
      'O estribo de aço tubular suporta todo o peso da moto deitada e entorta para trás, encostando no pedal de freio ou câmbio.',
    urgency: 'Crítica (Moto não roda sem)',
  },
  {
    id: 'parabarro',
    name: 'Parabarro / Paralama Dianteiro',
    category: 'Carenagens',
    crashRate: 58,
    typicalCostRange: 'R$ 85,00 a R$ 220,00',
    associatedProductId: 'parabarro-dianteiro-cg-160-paralama',
    description:
      'Aba lateral rala intensamente ou a ponta quebra ao esbarrar em guias, parachoques ou no tombo em sarjeta.',
    urgency: 'Estética / Funcional',
  },
  {
    id: 'carenagem-lateral',
    name: 'Carenagem Lateral / Asa do Tanque',
    category: 'Carenagens & Estética',
    crashRate: 49,
    typicalCostRange: 'R$ 110,00 a R$ 320,00 (o lado)',
    associatedProductId: 'parabarro-dianteiro-cg-160-paralama',
    description:
      'As travas plásticas de pressão estalam e a pintura rala profundamente. Em motos populares 160cc, deixa o tanque desprotegido.',
    urgency: 'Estética / Funcional',
  },
  {
    id: 'guidao',
    name: 'Guidão Tubular 22mm',
    category: 'Direção & Ciclística',
    crashRate: 42,
    typicalCostRange: 'R$ 90,00 a R$ 240,00',
    associatedProductId: 'manoplas-balanca-guidao-cg-160-circuito',
    description:
      'Entorta a barra no ponto de fixação dos risers, deixando a moto desalinhada para pilotar mesmo após levantar.',
    urgency: 'Crítica (Moto não roda sem)',
  },
]

// Itens sugeridos para o "Kit Queda" (Bundle)
const CRASH_KIT_PRODUCT_IDS = [
  'retrovisor-par-cg-160-padrao-original',
  'par-piscas-dianteiros-cg-160-fumê-cristal',
  'manoplas-balanca-guidao-cg-160-circuito',
  'pedana-cavalete-lateral-cg-160-reforcado',
]

export default function FallAnalysis() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [kitAdded, setKitAdded] = useState(false)
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({})

  // Produtos que compõem o Bundle Kit Queda
  const kitProducts = DEMO_PRODUCTS.filter((p) => CRASH_KIT_PRODUCT_IDS.includes(p.id))

  // Produtos universais da linha "Segurança & Tombo" ("Equipamento do que caiu e levantou")
  const safetyCrashProducts = DEMO_PRODUCTS.filter((p) => p.isSafetyCrash)

  const kitTotalPrice = kitProducts.reduce((sum, p) => sum + p.price, 0)
  const kitSupplierCost = kitProducts.reduce((sum, p) => sum + p.supplierCost, 0)
  const kitSavings = 25.0 // Desconto promocional aplicado no bundle
  const kitBundlePrice = Math.max(0, kitTotalPrice - kitSavings)
  const kitMargin = Math.round(((kitBundlePrice - kitSupplierCost) / kitBundlePrice) * 100)

  const handleAddSingleProduct = (product: DemoProduct) => {
    const defaultVariation =
      product.variations.length > 0 ? product.variations[0].options[0] : undefined
    addItem(product, defaultVariation, 1)

    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }))
    }, 1200)

    toast({
      title: 'Peça adicionada ao carrinho!',
      description: `${product.name} pronta para compra rápida de emergência.`,
      className: 'bg-[#151923] border-[#22D3EE] text-white',
    })
  }

  const handleAddKitQueda = () => {
    kitProducts.forEach((product) => {
      const defaultVariation =
        product.variations.length > 0 ? product.variations[0].options[0] : undefined
      addItem(product, defaultVariation, 1)
    })

    setKitAdded(true)
    setTimeout(() => setKitAdded(false), 2000)

    toast({
      title: 'Kit Queda adicionado completo!',
      description: `${kitProducts.length} itens essenciais para recuperar a moto já estão no carrinho.`,
      className: 'bg-[#151923] border-[#34D399] text-white',
    })

    navigate('/carrinho')
  }

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Cabeçalho / Hero Editorial */}
      <div className="relative overflow-hidden rounded-3xl border border-[#F87171]/40 bg-gradient-to-br from-[#1C1418] via-[#151923] to-[#0B0D12] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F87171]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F87171]/20 border border-[#F87171]/50 text-[#FCA5A5] text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#F87171]" />
            Estatística de Manutenção • Motos até 450cc (Núcleo até 250cc + Camada 250–450cc)
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Filão da Queda: <br />
            <span className="bg-gradient-to-r from-[#F87171] via-[#F472B6] to-[#22D3EE] bg-clip-text text-transparent">
              As peças que mais quebram numa queda leve
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            Dados de oficinas mecânicas e entregadores: quando uma moto de baixa cilindrada tomba a
            20–40 km/h ou no descanso lateral, o impacto se concentra sempre nos mesmos pontos
            periféricos. Quem depende da moto para trabalhar não pode esperar dias: precisa repor
            com urgência pelo melhor custo.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#A1A6B3]">
            <div className="flex items-center gap-1.5 bg-[#0B0D12]/80 px-3 py-1.5 rounded-full border border-[#232B3A]">
              <Truck className="w-3.5 h-3.5 text-[#34D399]" />
              <span className="text-white font-medium">Logística rápida de reposição</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0B0D12]/80 px-3 py-1.5 rounded-full border border-[#232B3A]">
              <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-white font-medium">Margem de 35% a 48% para o revendedor</span>
            </div>
            <span className="italic text-[#9CA3AF]">
              * Valores médios de referência baseados em oficinas de SP/RJ/MG.
            </span>
          </div>
        </div>
      </div>

      {/* BLOCO DESTAQUE: BUNDLE "KIT QUEDA" */}
      <section className="bg-gradient-to-br from-[#1B192E] via-[#151923] to-[#0F141F] border-2 border-[#8B5CF6]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6]/60 text-[#c4b5fd] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              Bundle Recomendado • Salva-Queda
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Kit Queda Terrenotech (4 Itens Mais Danificados)
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
              O tombo aconteceu? Não perca tempo cotando peça por peça em locais diferentes. Este
              bundle reúne <strong className="text-white">Retrovisor CG 160 (par)</strong>,{' '}
              <strong className="text-white">Piscas dianteiros (par)</strong>,{' '}
              <strong className="text-white">Manoplas + Pesos</strong> e{' '}
              <strong className="text-white">Pedana estribo/cavalete</strong>. Compre com urgência e
              coloque a moto de volta na pista no mesmo dia.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#8B5CF6]/40 p-5 rounded-2xl flex flex-col justify-between min-w-[280px] shrink-0 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A1A6B3] tracking-wider block">
                Total Avulso:{' '}
                <s className="text-[#9CA3AF]">R$ {kitTotalPrice.toFixed(2).replace('.', ',')}</s>
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-white font-tabular">
                  R$ {kitBundlePrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="badge-pill-sm text-[11px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold">
                  Economize R$ {kitSavings.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-[11px] text-[#22D3EE] mt-1 font-semibold">
                Margem do revendedor: ~{kitMargin}% (R${' '}
                {(kitBundlePrice - kitSupplierCost).toFixed(2).replace('.', ',')} de lucro)
              </p>
            </div>

            <Button
              onClick={handleAddKitQueda}
              className={`w-full rounded-full h-12 text-sm font-extrabold transition-all duration-200 ${
                kitAdded
                  ? 'bg-[#34D399] text-[#0B0D12]'
                  : 'bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#22D3EE] text-[#0B0D12] hover:opacity-95 shadow-xl shadow-[#8B5CF6]/40 hover:scale-[1.02]'
              }`}
            >
              {kitAdded ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Kit Adicionado ao Carrinho!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  Comprar Kit Queda com Urgência
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 4 Mini-cards dos itens do Bundle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 relative z-10">
          {kitProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#0B0D12]/90 border border-[#232B3A] rounded-xl p-3 flex items-center gap-3"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-12 h-12 rounded-lg object-cover bg-[#151923] shrink-0 border border-[#232B3A]"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-white line-clamp-1 block">{prod.name}</span>
                <span className="text-[11px] text-[#A1A6B3]">
                  R$ {prod.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GRÁFICO DE BARRAS DECRESCENTE + ESTATÍSTICA EDITORIAL */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#232B3A] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#F87171]" />
              Ranking de Peças que Mais Quebram em Queda Leve
            </h2>
            <p className="text-xs text-[#A1A6B3]">
              Frequência observada em motos urbanas (até 450cc em duas camadas) em ordem decrescente
              de dano.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#0B0D12] px-3 py-1.5 rounded-full border border-[#232B3A] text-[#34D399]">
            <Flame className="w-3.5 h-3.5" />
            <span>92% dos tombos danificam o retrovisor</span>
          </div>
        </div>

        {/* Gráfico de Barras com Indicadores */}
        <div className="space-y-6 pt-2">
          {CRASH_STATS.map((item, index) => {
            const correspondingProduct = DEMO_PRODUCTS.find(
              (p) => p.id === item.associatedProductId,
            )
            const isAdded = !!addedItemMap[item.associatedProductId]

            // Cores decrescentes de gravidade
            const barColor =
              item.crashRate >= 80
                ? '#F87171' // Vermelho
                : item.crashRate >= 65
                  ? '#FB923C' // Laranja
                  : item.crashRate >= 50
                    ? '#FBBF24' // Amarelo
                    : '#22D3EE' // Ciano

            return (
              <div
                key={item.id}
                className="bg-[#0B0D12] border border-[#232B3A] hover:border-[#8B5CF6]/50 rounded-2xl p-5 space-y-4 transition-all"
              >
                {/* Linha Superior: Nome, Posição no Ranking, % de Quebra */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#151923] border border-[#232B3A] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      #{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-white flex items-center gap-2">
                        {item.name}
                        <span className="text-[11px] font-normal text-[#A1A6B3]">
                          ({item.category})
                        </span>
                      </h3>
                      <span className="text-[11px] text-[#A1A6B3] block">{item.description}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-[#A1A6B3] block">Índice de Quebra</span>
                    <span className="text-2xl font-black font-tabular" style={{ color: barColor }}>
                      {item.crashRate}%
                    </span>
                  </div>
                </div>

                {/* Barra de Frequência */}
                <div className="w-full h-3.5 bg-[#151923] rounded-full overflow-hidden p-0.5 border border-[#232B3A]">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.crashRate}%`,
                      backgroundColor: barColor,
                      boxShadow: `0 0 10px ${barColor}60`,
                    }}
                  />
                </div>

                {/* Linha Inferior: Faixa de Preço Típico x Preço Terrenotech com Botão de Compra */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-[#232B3A]/60 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#A1A6B3] block">
                      Faixa de custo típico no mercado tradicional / concessionária:
                    </span>
                    <span className="font-semibold text-[#FCA5A5] bg-[#F87171]/10 px-2.5 py-1 rounded-md border border-[#F87171]/20 inline-block">
                      {item.typicalCostRange}
                    </span>
                  </div>

                  {correspondingProduct && (
                    <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 bg-[#151923] px-3.5 py-2 rounded-xl border border-[#232B3A]">
                      <div>
                        <span className="text-[10px] text-[#A1A6B3] block uppercase">
                          No catálogo Terrenotech
                        </span>
                        <span className="text-base font-extrabold text-[#34D399] font-tabular">
                          R$ {correspondingProduct.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          asChild
                          variant="outline"
                          className="h-8 px-3 rounded-full text-xs border-[#232B3A] bg-[#0B0D12] text-white hover:bg-[#1B212D]"
                        >
                          <Link to={`/produto/${correspondingProduct.id}`}>Ver produto</Link>
                        </Button>

                        <Button
                          onClick={() => handleAddSingleProduct(correspondingProduct)}
                          className={`h-8 px-3 rounded-full text-xs font-bold transition-all ${
                            isAdded
                              ? 'bg-[#34D399] text-[#0B0D12]'
                              : 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Adicionado!
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 mr-1" />
                              Adicionar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Nota explicativa de estimativas */}
        <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#A1A6B3] leading-relaxed">
          <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Aviso metodológico:</strong> Os percentuais e faixas de
            preço apresentados nesta seção são estimativas editoriais de referência coletadas junto
            a oficinas parceiras e distribuidores atacadistas brasileiros. O dano real varia
            conforme a velocidade, ângulo do impacto, peso do condutor e presença de protetores de
            carenagem na motocicleta.
          </p>
        </div>
      </section>

      {/* SEÇÃO: EQUIPAMENTO DO QUE CAIU E LEVANTOU (Linha "Segurança & Tombo") */}
      <section className="bg-gradient-to-br from-[#1C1720] via-[#151923] to-[#0E1118] border border-[#F87171]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F87171]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F87171]/20 border border-[#F87171]/50 text-[#FCA5A5] text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-[#F87171]" />
            Linha Segurança & Tombo • Universal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Equipamento do que caiu e levantou
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
            Consertar a moto é metade da história — proteger o corpo e prevenir a próxima quebra é o
            que mantém o piloto no corre. Estes 3 equipamentos são universais para motociclistas
            urbanos: protegem o corpo do impacto e blindam os controles do guidão.
          </p>
        </div>

        {/* Grade de 3 Itens de Segurança & Tombo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {safetyCrashProducts.map((prod) => {
            const isAdded = !!addedItemMap[prod.id]
            const marginPercent = Math.round(((prod.price - prod.supplierCost) / prod.price) * 100)

            return (
              <div
                key={prod.id}
                className="bg-[#0B0D12] border border-[#232B3A] hover:border-[#F87171]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#151923] border border-[#232B3A]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="badge-pill-sm text-[10px] bg-[#F87171]/30 border border-[#F87171]/60 text-[#FCA5A5] font-bold">
                        Segurança & Tombo
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10 text-[10px] font-bold text-[#34D399] bg-[#0B0D12]/90 px-2 py-0.5 rounded-full border border-[#34D399]/40">
                      Margem ~{marginPercent}%
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#A1A6B3] line-clamp-2 mt-1">{prod.description}</p>
                  </div>

                  <div className="space-y-1 text-[11px] text-[#A1A6B3] bg-[#151923] p-2.5 rounded-xl border border-[#232B3A]">
                    {prod.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#34D399] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232B3A] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#A1A6B3] block uppercase">Preço</span>
                    <span className="text-lg font-black text-white font-tabular">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      asChild
                      variant="outline"
                      className="h-8 px-2.5 rounded-full text-xs border-[#232B3A] bg-[#151923] text-white hover:bg-[#1B212D]"
                    >
                      <Link to={`/produto/${prod.id}`}>Ver</Link>
                    </Button>

                    <Button
                      onClick={() => handleAddSingleProduct(prod)}
                      className={`h-8 px-3 rounded-full text-xs font-bold transition-all ${
                        isAdded
                          ? 'bg-[#34D399] text-[#0B0D12]'
                          : 'bg-gradient-to-r from-[#F87171] to-[#EC4899] text-white shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Adicionado!
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 mr-1" />
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
      </section>

      {/* Chamada para o Catálogo, Estudo e Análises de Caixa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm">Ver todas as peças até 450cc</h4>
            <p className="text-xs text-[#A1A6B3]">
              Kits de relação, lonas, pastilhas de freio e retentores no catálogo com marca
              identificada.
            </p>
          </div>
          <Button asChild className="rounded-full bg-[#8B5CF6] text-white text-xs h-9 px-4 w-fit">
            <Link to="/?categoria=Peças" className="flex items-center gap-1.5">
              Catálogo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="bg-[#151923] border border-[#34D399]/40 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-[#34D399]">📊</span> Por Que Comprar Peça Online?
            </h4>
            <p className="text-xs text-[#A1A6B3]">
              Mini estudo de mercado: 66% preferem preço online vs 30-50% mais caro na
              concessionária.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-[#34D399] text-[#0B0D12] font-bold text-xs h-9 px-4 w-fit hover:bg-[#34D399]/90"
          >
            <Link to="/por-que-comprar-online" className="flex items-center gap-1.5">
              Ler Estudo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm">Análise de Giro & Margem</h4>
            <p className="text-xs text-[#A1A6B3]">
              Veja a liquidez diária e projeção de caixa para repasses no dropshipping.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#22D3EE]/10 text-xs h-9 px-4 w-fit"
          >
            <Link to="/analises" className="flex items-center gap-1.5">
              Ver Caixa <TrendingUp className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
