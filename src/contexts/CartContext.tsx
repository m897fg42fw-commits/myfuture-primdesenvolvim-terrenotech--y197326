import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string // id do produto ou chave única
  productId: string
  name: string
  price: number
  supplierCost?: number
  quantity: number
  variation?: string
  category: string
  image?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (
    product: {
      id: string
      name: string
      price: number
      category: string
      supplierCost?: number
      image?: string
    },
    variation?: string,
    quantity?: number,
  ) => void
  removeItem: (uniqueId: string) => void
  updateQuantity: (uniqueId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  total: number
  totalItemsCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'vendatech_cart_items_v1'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error('Erro ao ler carrinho do localStorage:', e)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Erro ao salvar carrinho no localStorage:', e)
    }
  }, [items])

  const addItem = (
    product: {
      id: string
      name: string
      price: number
      category: string
      supplierCost?: number
      image?: string
    },
    variation?: string,
    quantity: number = 1,
  ) => {
    const itemKey = `${product.id}-${variation || 'default'}`
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemKey)
      if (existingIndex >= 0) {
        const copy = [...prev]
        copy[existingIndex].quantity += quantity
        return copy
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            name: product.name,
            price: product.price,
            supplierCost: product.supplierCost,
            quantity: Math.max(1, quantity),
            variation,
            category: product.category,
            image: product.image,
          },
        ]
      }
    })
  }

  const removeItem = (uniqueId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== uniqueId))
  }

  const updateQuantity = (uniqueId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(uniqueId)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === uniqueId ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Frete Grátis conforme PRD
  const total = subtotal + shipping
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return ctx
}
