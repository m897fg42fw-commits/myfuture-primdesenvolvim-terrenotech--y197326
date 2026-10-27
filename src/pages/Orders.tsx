import React, { useEffect, useState, useMemo } from 'react'
import {
  Package,
  Search,
  Filter,
  Edit3,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  RefreshCw,
  CheckCircle,
  Truck,
  AlertCircle,
  Phone,
  Mail,
  UserCheck,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { ordersService, OrderRecord, OrderStatus, OrderItem } from '@/services/orders'
import { DEMO_PRODUCTS } from '@/lib/demoProducts'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

const STATUS_OPTIONS: OrderStatus[] = ['Pendente', 'Em andamento', 'Concluído']

export default function Orders() {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos')
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')

  // Modal de edição de status e rastreio
  const [editingOrder, setEditingOrder] = useState<OrderRecord | null>(null)
  const [newStatus, setNewStatus] = useState<OrderStatus>('Pendente')
  const [trackingInput, setTrackingInput] = useState<string>('')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Modal "Rotina de Operação"
  const [routineModalOpen, setRoutineModalOpen] = useState(false)
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchOrdersList = async () => {
    setIsLoading(true)
    const list = await ordersService.listOrders()
    setOrders(list)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchOrdersList()
  }, [])

  // Inscrição em tempo real na coleção orders conforme especificado
  useRealtime<any>('orders', (e) => {
    // Quando qualquer pedido é criado, atualizado ou deletado
    if (e.action === 'create' || e.action === 'update' || e.action === 'delete') {
      fetchOrdersList()
      if (e.action === 'create') {
        toast({
          title: 'Novo pedido recebido!',
          description: `Atualização em tempo real recebida.`,
          className: 'bg-[#151923] border-[#34D399] text-white',
        })
      }
    }
  })

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const handleOpenStatusModal = (order: OrderRecord, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingOrder(order)
    setNewStatus(order.status)
    setTrackingInput(ordersService.getTrackingCode(order.id) || '')
  }

  const handleSaveStatus = async () => {
    if (!editingOrder) return
    setIsUpdatingStatus(true)
    const success = await ordersService.updateOrderStatus(
      editingOrder.id,
      newStatus,
      trackingInput.trim(),
    )
    setIsUpdatingStatus(false)

    if (success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? { ...o, status: newStatus } : o)),
      )
      toast({
        title: 'Status atualizado com sucesso!',
        description: `Pedido ${editingOrder.id.slice(-4).toUpperCase()} alterado para "${newStatus}".`,
        className: 'bg-[#151923] border-[#8B5CF6] text-white',
      })
      setEditingOrder(null)
    } else {
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível alterar o status do pedido.',
        variant: 'destructive',
      })
    }
  }

  // Helper para obter o custo de fornecedor de um item (com fallback se o pedido for antigo)
  const getItemSupplierCost = (item: OrderItem): number => {
    if (typeof item.supplier_cost === 'number' && item.supplier_cost > 0) {
      return item.supplier_cost
    }
    // Tenta casar com o catálogo DEMO_PRODUCTS pelo nome
    const found = DEMO_PRODUCTS.find(
      (p) => p.name.toLowerCase() === item.product_name.toLowerCase(),
    )
    if (found) {
      return found.supplierCost
    }
    // Fallback padrão conservador de dropshipping (60% do preço de venda)
    return Math.round(item.price * 0.6 * 100) / 100
  }

  // Calcula custo total do fornecedor e margem líquida para cada pedido
  const calculateOrderFinances = (order: OrderRecord) => {
    const totalSupplierCost = order.items.reduce((sum, item) => {
      const unitCost = getItemSupplierCost(item)
      return sum + unitCost * (item.quantity || 1)
    }, 0)
    const customerTotal = order.total || order.subtotal
    const profit = Math.max(0, customerTotal - totalSupplierCost)
    const marginPercent = customerTotal > 0 ? Math.round((profit / customerTotal) * 100) : 0

    return {
      supplierCost: totalSupplierCost,
      profit,
      marginPercent,
    }
  }

  const handleCopyShippingAddress = (order: OrderRecord, e: React.MouseEvent) => {
    e.stopPropagation()
    const addressText = `${order.customer_name}
${order.customer_address}, ${order.customer_number}${order.customer_complement ? ' (' + order.customer_complement + ')' : ''}
${order.customer_city} - ${order.customer_state}
CEP: ${order.customer_zip}
Tel: ${order.customer_phone}`

    navigator.clipboard.writeText(addressText)
    setCopiedOrderId(order.id)
    setTimeout(() => setCopiedOrderId(null), 2000)
    toast({
      title: 'Endereço copiado!',
      description: 'Pronto para colar no site do fornecedor.',
      className: 'bg-[#151923] border-[#34D399] text-white',
    })
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = selectedStatus === 'Todos' || o.status === selectedStatus
      const search = searchTerm.toLowerCase()
      const matchesSearch =
        o.customer_name.toLowerCase().includes(search) ||
        o.customer_email.toLowerCase().includes(search) ||
        o.id.toLowerCase().includes(search) ||
        o.items.some((it) => it.product_name.toLowerCase().includes(search))

      return matchesStatus && matchesSearch
    })
  }, [orders, selectedStatus, searchTerm])

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Concluído':
        return 'bg-[#34D399]/20 text-[#34D399] border-[#34D399]/40'
      case 'Em andamento':
        return 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40'
      case 'Pendente':
      default:
        return 'bg-[#F472B6]/20 text-[#F472B6] border-[#F472B6]/40'
    }
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Package className="w-7 h-7 text-[#8B5CF6]" />
            Painel de Pedidos
          </h1>
          <p className="text-sm text-[#A1A6B3]">
            Acompanhamento em tempo real das vendas e fluxo de entregas.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Botão "Como operar" / Rotina de Operação */}
          <Button
            onClick={() => setRoutineModalOpen(true)}
            variant="outline"
            className="rounded-full border-[#8B5CF6]/50 bg-[#151923] text-[#22D3EE] hover:bg-[#8B5CF6]/20 text-xs h-9 px-3.5 flex items-center gap-1.5 font-medium shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#22D3EE]" />
            Como operar (Rotina)
          </Button>

          <Button
            onClick={fetchOrdersList}
            variant="outline"
            className="rounded-full border-[#232B3A] bg-[#151923] text-white hover:bg-[#1B212D] text-xs h-9 px-3.5 flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
        {/* Input de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, e-mail, ID ou produto..."
            className="w-full bg-[#0B0D12] border border-[#232B3A] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-[#A1A6B3] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        {/* Filtro por Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#A1A6B3] hidden sm:block mr-1" />
          {['Todos', 'Pendente', 'Em andamento', 'Concluído'].map((status) => {
            const isSelected = selectedStatus === status
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`text-xs whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isSelected
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30'
                    : 'bg-[#0B0D12] text-[#A1A6B3] hover:text-white border border-[#232B3A]'
                }`}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {/* Lista de Pedidos */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#8B5CF6] animate-spin mx-auto" />
          <p className="text-sm text-[#A1A6B3]">Carregando pedidos do banco de dados...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = !!expandedOrders[order.id]
            const orderCode = `PED-${order.id.slice(-4).toUpperCase()}`
            const dateStr = new Date(order.created).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <div
                key={order.id}
                onClick={() => toggleExpand(order.id)}
                className="bg-[#151923] border border-[#232B3A] hover:border-[#8B5CF6]/40 rounded-2xl p-5 cursor-pointer transition-all duration-150 hover-lift shadow-md"
              >
                {/* Linha Resumida Superior */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0D12] border border-[#232B3A] flex items-center justify-center text-[#22D3EE] font-bold text-xs shrink-0">
                      {orderCode}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white">
                          {order.customer_name}
                        </span>
                        <span className="text-xs text-[#A1A6B3]">
                          ({order.customer_city}/{order.customer_state})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#A1A6B3]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#8B5CF6]" />
                          {dateStr}
                        </span>
                        <span>•</span>
                        <span>
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lado Direito: Total + Custo Fornecedor + Margem + Status */}
                  {(() => {
                    const { supplierCost, profit, marginPercent } = calculateOrderFinances(order)

                    return (
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#232B3A]">
                        {/* Bloco Financeiro de Repasse */}
                        <div className="flex items-center gap-2 bg-[#0B0D12] px-3 py-1.5 rounded-xl border border-[#232B3A] text-right">
                          <div>
                            <span className="text-[9px] text-[#A1A6B3] block uppercase">
                              Total Cliente
                            </span>
                            <span className="text-sm font-extrabold text-white font-tabular">
                              R$ {order.total.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <div className="w-px h-6 bg-[#232B3A]" />
                          <div>
                            <span className="text-[9px] text-[#A1A6B3] block uppercase">
                              Pagar Fornecedor
                            </span>
                            <span className="text-sm font-bold text-[#F472B6] font-tabular">
                              R$ {supplierCost.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <div className="w-px h-6 bg-[#232B3A]" />
                          <div>
                            <span className="text-[9px] text-[#34D399] block uppercase">
                              Sua Margem
                            </span>
                            <span className="text-sm font-bold text-[#34D399] font-tabular">
                              +R$ {profit.toFixed(2).replace('.', ',')} ({marginPercent}%)
                            </span>
                          </div>
                        </div>

                        {/* Pílula de Status com botão de edição */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`badge-pill-sm text-xs border font-semibold ${getStatusBadgeClass(order.status)}`}
                          >
                            {order.status}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleOpenStatusModal(order, e)}
                            className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#232B3A] text-[#A1A6B3] hover:text-white hover:border-[#8B5CF6] transition-colors"
                            title="Alterar status do pedido"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <div className="text-[#A1A6B3] ml-1">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {/* Bloco Expandido (Itens + Dados de Entrega) */}
                {isExpanded && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 pt-5 border-t border-[#232B3A] space-y-5 animate-fade-up"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Itens do Pedido */}
                      <div className="space-y-2 bg-[#0B0D12] p-4 rounded-xl border border-[#232B3A]">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          Produtos Comprados
                        </h4>

                        <div className="divide-y divide-[#232B3A]/60 pt-1">
                          {order.items.map((item, idx) => {
                            const unitCost = getItemSupplierCost(item)
                            return (
                              <div
                                key={idx}
                                className="py-2 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <span className="font-semibold text-white block">
                                    {item.quantity}x {item.product_name}
                                  </span>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    {item.variation && (
                                      <span className="text-[10px] text-[#22D3EE]">
                                        Variação: {item.variation}
                                      </span>
                                    )}
                                    <span className="text-[10px] text-[#A1A6B3]">
                                      (Custo unit.: R$ {unitCost.toFixed(2).replace('.', ',')})
                                    </span>
                                  </div>
                                </div>
                                <span className="font-bold text-white font-tabular">
                                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Rastreio se houver */}
                        {ordersService.getTrackingCode(order.id) && (
                          <div className="pt-2 border-t border-[#232B3A] flex items-center justify-between text-xs">
                            <span className="text-[#A1A6B3] flex items-center gap-1">
                              <Truck className="w-3.5 h-3.5 text-[#34D399]" />
                              Código de Rastreio:
                            </span>
                            <span className="font-mono font-bold text-[#34D399] bg-[#151923] px-2 py-0.5 rounded border border-[#34D399]/40">
                              {ordersService.getTrackingCode(order.id)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Dados de Entrega com botão de Copiar Rápido */}
                      <div className="space-y-2 bg-[#0B0D12] p-4 rounded-xl border border-[#232B3A]">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                            Endereço e Contato de Despacho
                          </h4>

                          <button
                            type="button"
                            onClick={(e) => handleCopyShippingAddress(order, e)}
                            className="text-[11px] font-semibold text-[#22D3EE] hover:text-white bg-[#151923] border border-[#232B3A] px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            {copiedOrderId === order.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#34D399]" />
                                Copiado!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copiar endereço para repasse
                              </>
                            )}
                          </button>
                        </div>

                        <div className="text-xs text-[#A1A6B3] space-y-1.5 pt-1 leading-relaxed">
                          <p className="text-white font-medium flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            {order.customer_name}
                          </p>
                          <p>
                            {order.customer_address}, {order.customer_number}
                            {order.customer_complement ? ` (${order.customer_complement})` : ''}
                          </p>
                          <p>
                            {order.customer_city} - {order.customer_state} • CEP{' '}
                            {order.customer_zip}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#F4F5F7]">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#34D399]" />
                              {order.customer_phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-[#22D3EE]" />
                              {order.customer_email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* Vazio */
        <div className="bg-[#151923] border border-[#232B3A] rounded-3xl p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-[#8B5CF6] mx-auto" />
          <h3 className="text-lg font-bold text-white">Nenhum pedido encontrado</h3>
          <p className="text-xs text-[#A1A6B3] max-w-sm mx-auto">
            Não existem pedidos correspondentes ao filtro de status ou busca aplicado.
          </p>
          <Button
            onClick={() => {
              setSelectedStatus('Todos')
              setSearchTerm('')
            }}
            variant="outline"
            className="rounded-full border-[#8B5CF6]/50 text-[#22D3EE]"
          >
            Resetar filtros
          </Button>
        </div>
      )}

      {/* Modal de Atualização de Status */}
      <Dialog open={!!editingOrder} onOpenChange={(open) => !open && setEditingOrder(null)}>
        <DialogContent className="bg-[#151923] border-[#232B3A] text-white sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#8B5CF6]" />
              Atualizar Status do Pedido
            </DialogTitle>
            <DialogDescription className="text-xs text-[#A1A6B3]">
              Selecione o novo estágio do pedido de {editingOrder?.customer_name}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#A1A6B3] uppercase tracking-wider block">
                Estágio do Pedido
              </label>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((st) => {
                  const isSelected = newStatus === st
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewStatus(st)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#1B212D] border-[#8B5CF6] text-white shadow-md'
                          : 'bg-[#0B0D12] border-[#232B3A] text-[#A1A6B3] hover:text-white hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            st === 'Concluído'
                              ? 'bg-[#34D399]'
                              : st === 'Em andamento'
                                ? 'bg-[#22D3EE]'
                                : 'bg-[#F472B6]'
                          }`}
                        />
                        <span className="text-sm font-semibold">{st}</span>
                      </div>

                      {isSelected && <CheckCircle className="w-4 h-4 text-[#8B5CF6]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Campo Opcional de Código de Rastreio */}
            <div className="space-y-1.5 pt-2 border-t border-[#232B3A]">
              <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#22D3EE]" />
                Código de Rastreio do Fornecedor{' '}
                <span className="text-[#A1A6B3] font-normal">(Opcional)</span>
              </label>
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
                placeholder="Ex: BR123456789SP ou QD987654321BR"
                className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl px-3 py-2 text-sm text-white font-mono placeholder-[#A1A6B3]/60 focus:outline-none"
              />
              <p className="text-[11px] text-[#A1A6B3]">
                Cole o código que o fornecedor gerar para salvar junto ao pedido.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingOrder(null)}
              className="rounded-full border-[#232B3A] bg-[#0B0D12] text-white"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={isUpdatingStatus}
              onClick={handleSaveStatus}
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold"
            >
              {isUpdatingStatus ? 'Salvando...' : 'Salvar Alteração'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal "Rotina de Operação do Dropshipping" */}
      <Dialog open={routineModalOpen} onOpenChange={setRoutineModalOpen}>
        <DialogContent className="bg-[#151923] border-[#232B3A] text-white sm:max-w-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#22D3EE] border border-[#8B5CF6]/40 text-xs font-bold w-fit mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Sistemática Fácil de Operar
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Rotina Diária de Operação Dropshipping
            </DialogTitle>
            <DialogDescription className="text-xs text-[#A1A6B3]">
              Como você gerencia os pedidos como atravessador sem tocar em estoque:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F472B6] text-[#0B0D12] font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <h4 className="font-bold text-sm text-white">Abrir pedidos com status Pendente</h4>
              </div>
              <p className="text-xs text-[#A1A6B3] pl-8 leading-relaxed">
                Filtre por <strong>Pendente</strong> no topo desta página para ver as vendas
                recém-feitas que precisam ser repassadas. Veja o valor a pagar ao fornecedor já
                calculado em cada card.
              </p>
            </div>

            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#22D3EE] text-[#0B0D12] font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <h4 className="font-bold text-sm text-white">Copiar o endereço do cliente</h4>
              </div>
              <p className="text-xs text-[#A1A6B3] pl-8 leading-relaxed">
                Clique no botão <strong>"Copiar endereço para repasse"</strong> no pedido. Todos os
                dados (nome, rua, CEP, telefone) vão formatados para sua área de transferência.
              </p>
            </div>

            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-[#0B0D12] font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <h4 className="font-bold text-sm text-white">
                  Fazer o pedido no fornecedor e pagar o custo
                </h4>
              </div>
              <p className="text-xs text-[#A1A6B3] pl-8 leading-relaxed">
                Abra a plataforma do seu fornecedor online (Mercado Livre / distribuidor parceiro),
                cole o endereço do cliente como destinatário e pague o preço de custo. Altere o
                status do pedido para <strong>"Em andamento"</strong>.
              </p>
            </div>

            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#34D399] text-[#0B0D12] font-black text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <h4 className="font-bold text-sm text-white">
                  Colar código de rastreio e Concluir
                </h4>
              </div>
              <p className="text-xs text-[#A1A6B3] pl-8 leading-relaxed">
                Quando o fornecedor despachar o produto, copie o código de rastreio dele, cole no
                botão de edição de status do pedido e marque como <strong>"Concluído"</strong>. Sua
                margem de lucro já está garantida no bolso.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={() => setRoutineModalOpen(false)}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold px-6"
            >
              Entendido, voltar aos pedidos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
