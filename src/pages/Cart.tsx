import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { ordersService, OrderItem } from '@/services/orders'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { FlowSteps } from '@/components/FlowSteps'
import { UnifiedBackButton } from '@/components/UnifiedBackButton'

interface DeliveryForm {
  name: string
  email: string
  phone: string
  address: string
  number: string
  complement: string
  city: string
  state: string
  zip: string
}

const initialForm: DeliveryForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  zip: '',
}

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, shipping, total } = useCart()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [form, setForm] = useState<DeliveryForm>(initialForm)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validação simples dos campos obrigatórios
  const errors = {
    name: !form.name.trim() ? 'Nome completo é obrigatório' : '',
    email: !form.email.trim() || !form.email.includes('@') ? 'E-mail válido é obrigatório' : '',
    phone: !form.phone.trim() || form.phone.length < 8 ? 'Telefone de contato é obrigatório' : '',
    address: !form.address.trim() ? 'Endereço (rua/av) é obrigatório' : '',
    number: !form.number.trim() ? 'Número é obrigatório' : '',
    city: !form.city.trim() ? 'Cidade é obrigatória' : '',
    state: !form.state.trim() || form.state.length < 2 ? 'UF é obrigatório (ex: SP)' : '',
    zip: !form.zip.trim() || form.zip.length < 8 ? 'CEP válido é obrigatório' : '',
  }

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.phone &&
    !errors.address &&
    !errors.number &&
    !errors.city &&
    !errors.state &&
    !errors.zip

  const handleBlur = (field: keyof DeliveryForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleChange = (field: keyof DeliveryForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFillDemoData = () => {
    setForm({
      name: 'João Pedro Alencar',
      email: 'joao.alencar@techmail.com',
      phone: '(11) 97123-9988',
      address: 'Alameda Santos',
      number: '1200',
      complement: 'Bloco A, 14º andar',
      city: 'São Paulo',
      state: 'SP',
      zip: '01418-100',
    })
    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      number: true,
      city: true,
      state: true,
      zip: true,
    })
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid || items.length === 0) {
      // Marca todos como touched para exibir erros
      setTouched({
        name: true,
        email: true,
        phone: true,
        address: true,
        number: true,
        city: true,
        state: true,
        zip: true,
      })
      toast({
        title: 'Formulário incompleto',
        description: 'Por favor, preencha todos os campos obrigatórios de entrega.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        supplier_cost: item.supplierCost,
        variation: item.variation,
      }))

      const createdOrder = await ordersService.createOrder({
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim(),
        customer_address: form.address.trim(),
        customer_number: form.number.trim(),
        customer_complement: form.complement.trim(),
        customer_city: form.city.trim(),
        customer_state: form.state.trim().toUpperCase(),
        customer_zip: form.zip.trim(),
        items: orderItems,
        subtotal,
        total,
        status: 'Pendente',
      })

      clearCart()

      toast({
        title: 'Pedido registrado com sucesso!',
        description: `Código: ${createdOrder.id}`,
        className: 'bg-[#151923] border-[#34D399] text-white',
      })

      navigate(`/confirmacao/${createdOrder.id}`)
    } catch (err: unknown) {
      console.error('Erro ao registrar pedido:', err)
      const message =
        err instanceof Error ? err.message : 'Não foi possível registrar o pedido no momento.'
      toast({
        title: 'Erro ao registrar pedido',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Se o carrinho estiver vazio
  if (items.length === 0) {
    return (
      <div className="space-y-6 animate-fade-up">
        <FlowSteps currentStep="carrinho" />
        <div className="py-14 max-w-lg mx-auto text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#151923] border border-[#232B3A] flex items-center justify-center mx-auto shadow-lg">
            <ShoppingCart className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-extrabold text-white">Seu carrinho está vazio</h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Nenhum item foi adicionado ainda. Escolha uma peça no catálogo para continuar.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <UnifiedBackButton to="/" label="Voltar ao catálogo de produtos" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Indicador de Posição no Fluxo de Compra */}
      <FlowSteps currentStep="carrinho" />

      {/* Topo: Um único caminho de volta claro e contagem de itens */}
      <div className="flex items-center justify-between border-b border-[#232B3A] pb-3">
        <UnifiedBackButton to="/" label="Voltar ao catálogo" contextLabel="Continuar escolhendo" />
        <span className="text-xs font-medium text-[#A1A6B3] bg-[#151923] px-3 py-1 rounded-full border border-[#232B3A]">
          {items.length} {items.length === 1 ? 'item no carrinho' : 'itens no carrinho'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Itens + Dados de Entrega */}
        <div className="lg:col-span-8 space-y-8">
          {/* Card: Lista de Itens */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#8B5CF6]" />
              Itens do seu pedido
            </h2>

            <div className="divide-y divide-[#232B3A]">
              {items.map((item) => {
                const itemTotal = item.price * item.quantity

                return (
                  <div
                    key={item.id}
                    className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl bg-[#0B0D12] border border-[#232B3A] overflow-hidden flex items-center justify-center shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-[#22D3EE]">MOTO</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-white leading-tight">
                          {item.name}
                        </h4>
                        {item.variation && (
                          <span className="inline-block text-[11px] text-[#22D3EE] bg-[#1B212D] px-2 py-0.5 rounded-full border border-[#232B3A]">
                            {item.variation}
                          </span>
                        )}
                        <p className="text-xs text-[#A1A6B3]">
                          Unitário: R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                      {/* Contador de Quantidade */}
                      <div className="flex items-center bg-[#0B0D12] border border-[#232B3A] rounded-full p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#A1A6B3] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white font-tabular">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#A1A6B3] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal do Item */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-bold text-white font-tabular">
                          R$ {itemTotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Botão Remover */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#A1A6B3] hover:text-[#F87171] hover:bg-[#F87171]/10 rounded-xl transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card: Dados de Entrega */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#22D3EE]" />
                  Dados de entrega do cliente
                </h2>
                <p className="text-xs text-[#A1A6B3]">
                  Informe os dados para faturamento e despacho do pedido.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-xs text-[#22D3EE] hover:underline self-start sm:self-auto font-medium"
              >
                Preencher dados demo
              </button>
            </div>

            <form id="delivery-form" onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome Completo */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-white">
                    Nome completo <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Ex: Carlos Roberto Silva"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.name && errors.name
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    E-mail <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="cliente@email.com"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    Telefone / WhatsApp <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="(11) 99999-9999"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.phone && errors.phone
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* CEP */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    CEP <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    onBlur={() => handleBlur('zip')}
                    placeholder="00000-000"
                    maxLength={10}
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.zip && errors.zip
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.zip && errors.zip && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.zip}
                    </p>
                  )}
                </div>

                {/* Endereço */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    Endereço (Rua/Avenida) <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    placeholder="Ex: Av. Brasil"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.address && errors.address
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.address && errors.address && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Número */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    Número <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                    onBlur={() => handleBlur('number')}
                    placeholder="123"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.number && errors.number
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.number && errors.number && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.number}
                    </p>
                  )}
                </div>

                {/* Complemento */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    Complemento <span className="text-xs text-[#A1A6B3]">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.complement}
                    onChange={(e) => handleChange('complement', e.target.value)}
                    placeholder="Apto 42, Bloco 2"
                    className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
                  />
                </div>

                {/* Cidade */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    Cidade <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    placeholder="São Paulo"
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all ${
                      touched.city && errors.city
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.city && errors.city && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* UF */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    UF <span className="text-[#F87171]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    placeholder="SP"
                    maxLength={2}
                    className={`w-full bg-[#0B0D12] border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all uppercase ${
                      touched.state && errors.state
                        ? 'border-[#F87171] focus:ring-2 focus:ring-[#F87171]/30'
                        : 'border-[#232B3A] focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30'
                    }`}
                  />
                  {touched.state && errors.state && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna Direita: Resumo do Pedido e Ação */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-[#232B3A] pb-3">
              Resumo do pedido
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#A1A6B3]">
                <span>Subtotal dos itens</span>
                <span className="font-semibold text-white font-tabular">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="flex justify-between items-center text-[#A1A6B3]">
                <span>Frete</span>
                <span className="badge-pill-sm text-[11px] bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 font-bold">
                  Grátis
                </span>
              </div>

              <div className="border-t border-[#232B3A] pt-3 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-extrabold text-white block">Total a cobrar</span>
                  <span className="text-[11px] text-[#34D399]">Sem taxas adicionais</span>
                </div>
                <span className="text-2xl font-black text-white font-tabular">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Botão Finalizar Pedido */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                form="delivery-form"
                disabled={isSubmitting}
                className="w-full rounded-full h-13 text-sm font-bold bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-95 text-[#0B0D12] shadow-xl shadow-[#8B5CF6]/30 disabled:opacity-50 transition-all hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#0B0D12]" />
                    Processando pedido...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Finalizar pedido
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A1A6B3] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                <span>Registro instantâneo no banco de dados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
