import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Check,
  Package,
  MapPin,
  ArrowRight,
  Clock,
  FileText,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react'
import { ordersService, OrderRecord } from '@/services/orders'
import { Button } from '@/components/ui/button'
import { FlowSteps } from '@/components/FlowSteps'
import { UnifiedBackButton } from '@/components/UnifiedBackButton'

export default function Confirmation() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return
      setIsLoading(true)
      const data = await ordersService.getOrderById(id)
      setOrder(data)
      setIsLoading(false)
    }
    fetchOrder()
  }, [id])

  // Formato do número do pedido PED-XXXX conforme especificação
  const formattedOrderNumber = id ? `PED-${id.slice(-4).toUpperCase()}` : 'PED-0001'

  const formattedDate = order?.created
    ? new Date(order.created).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString('pt-BR')

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-up py-2">
      {/* Indicador de Posição no Fluxo de Compra */}
      <FlowSteps currentStep="confirmacao" />

      {/* Linha com Caminho de Volta Claro */}
      <div className="flex items-center justify-between border-b border-[#232B3A] pb-3">
        <UnifiedBackButton to="/" label="Voltar ao início do catálogo" />
        <span className="text-xs text-[#34D399] font-medium bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
          Pedido confirmado
        </span>
      </div>

      {/* Cabeçalho com Ícone de Sucesso Animado */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#34D399]/20 to-[#22D3EE]/20 border-2 border-[#34D399] text-[#34D399] shadow-2xl shadow-[#34D399]/30 animate-scale-in">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Venda Registrada com Sucesso
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Pedido Realizado!</h1>
          <p className="text-sm text-[#A1A6B3]">
            O pedido foi processado e já está aguardando separação.
          </p>
        </div>
      </div>

      {/* Card de Resumo do Pedido */}
      <div className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        {/* Identificação Superior */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#232B3A]">
          <div>
            <span className="text-xs uppercase text-[#A1A6B3] tracking-wider block">
              Identificador
            </span>
            <span className="text-2xl font-black text-[#22D3EE] font-tabular tracking-wide">
              {formattedOrderNumber}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#A1A6B3]">
            <div className="flex items-center gap-1.5 bg-[#0B0D12] px-3 py-1.5 rounded-full border border-[#232B3A]">
              <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>{formattedDate}</span>
            </div>
            <span className="badge-pill-sm text-xs bg-[#8B5CF6]/20 text-[#c4b5fd] border border-[#8B5CF6]/40 font-semibold">
              {order?.status || 'Pendente'}
            </span>
          </div>
        </div>

        {/* Itens do Pedido */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-[#8B5CF6]" />
            Itens Comprados
          </h3>

          <div className="space-y-2 bg-[#0B0D12]/70 rounded-2xl p-4 border border-[#232B3A]">
            {isLoading ? (
              <p className="text-xs text-[#A1A6B3] py-2">Carregando detalhes...</p>
            ) : order?.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm py-2 border-b border-[#232B3A]/60 last:border-0"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">
                      {item.quantity}x {item.product_name}
                    </span>
                    {item.variation && (
                      <span className="text-[11px] text-[#22D3EE] bg-[#151923] px-2 py-0.5 rounded-full border border-[#232B3A]">
                        {item.variation}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-white font-tabular">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#A1A6B3]">1x Pedido do Catálogo</p>
            )}
          </div>
        </div>

        {/* Dados de Entrega Resumidos */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#22D3EE]" />
            Dados de Entrega
          </h3>

          <div className="bg-[#0B0D12]/70 rounded-2xl p-4 border border-[#232B3A] text-xs text-[#A1A6B3] space-y-1 leading-relaxed">
            <p className="text-white font-semibold text-sm">{order?.customer_name || 'Cliente'}</p>
            <p>
              {order?.customer_address}, {order?.customer_number}
              {order?.customer_complement ? ` - ${order.customer_complement}` : ''}
            </p>
            <p>
              {order?.customer_city} - {order?.customer_state} • CEP {order?.customer_zip}
            </p>
            <p className="text-[11px] text-[#A1A6B3]">
              Contato: {order?.customer_phone} • {order?.customer_email}
            </p>
          </div>
        </div>

        {/* Totais */}
        <div className="pt-2 space-y-2 text-sm border-t border-[#232B3A]">
          <div className="flex justify-between text-[#A1A6B3]">
            <span>Subtotal</span>
            <span className="text-white font-semibold font-tabular">
              R$ {(order?.subtotal || 0).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex justify-between text-[#A1A6B3]">
            <span>Frete</span>
            <span className="text-[#34D399] font-semibold">Grátis</span>
          </div>

          <div className="flex justify-between items-baseline pt-2 text-base font-extrabold text-white">
            <span>Total</span>
            <span className="text-2xl text-[#22D3EE] font-tabular">
              R$ {(order?.total || 0).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      {/* Bloco Obrigatório: Aviso para o Negócio */}
      <div className="bg-gradient-to-r from-[#1B212D] to-[#151923] border border-[#8B5CF6]/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-lg">
        <div className="flex items-center gap-2.5 text-[#8B5CF6]">
          <FileText className="w-5 h-5 text-[#8B5CF6]" />
          <h3 className="font-bold text-white text-base">Aviso para o negócio</h3>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
          Um novo pedido foi registrado. Acompanhe o status no painel de pedidos e proceda com a
          separação e despacho do item.
        </p>
        <div className="pt-1">
          <Link
            to="/pedidos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22D3EE] hover:underline"
          >
            Ir para meus pedidos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Botões Finais de Navegação */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto rounded-full border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-white"
        >
          <Link to="/" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Voltar para o catálogo
          </Link>
        </Button>

        <Button
          asChild
          className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold px-8 shadow-lg shadow-[#8B5CF6]/30"
        >
          <Link to="/pedidos" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Acompanhar pedido no painel
          </Link>
        </Button>
      </div>
    </div>
  )
}
