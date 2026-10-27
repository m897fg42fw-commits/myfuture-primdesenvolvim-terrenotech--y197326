import React, { useState } from 'react'
import { Wrench, Package, Shield, Sparkles } from 'lucide-react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  category?: string
  priority?: boolean
}

/**
 * Fallback vetorial limpo e digno com tema noturno tech
 * Se a URL remota falhar ou não carregar, exibe ilustração elegante da peça sem ícone quebrado
 */
export const ProductImageFallback: React.FC<{
  alt: string
  category?: string
  className?: string
}> = ({ alt, category, className = '' }) => {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#121620] via-[#151A26] to-[#0A0D13] flex flex-col items-center justify-center p-6 text-center select-none border border-[#232B3A] relative overflow-hidden ${className}`}
    >
      {/* Grade sutil ao fundo */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-[#0B0D12]/90 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shadow-lg shadow-[#0284C7]/20">
          {category?.toLowerCase().includes('segurança') ||
          category?.toLowerCase().includes('tombo') ? (
            <Shield className="w-8 h-8 text-[#F87171]" />
          ) : category?.toLowerCase().includes('equipamento') ? (
            <Sparkles className="w-8 h-8 text-[#F97316]" />
          ) : category?.toLowerCase().includes('combo') ? (
            <Package className="w-8 h-8 text-[#34D399]" />
          ) : (
            <Wrench className="w-8 h-8 text-[#22D3EE]" />
          )}
        </div>

        <div className="space-y-1 max-w-[220px]">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#38BDF8] bg-[#070F26] px-2.5 py-0.5 rounded-full border border-[#1E3A8A]">
            {category || 'Peça Terrenotech'}
          </span>
          <p className="text-xs font-semibold text-white truncate line-clamp-2 leading-snug">
            {alt}
          </p>
          <span className="text-[10px] text-[#94A3B8] block">Ilustração técnica de catálogo</span>
        </div>
      </div>
    </div>
  )
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  category,
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
        />
      )}

      {/* Exibe o fallback quando erro ou enquanto carrega suavemente */}
      {(!isLoaded || hasError) && (
        <div className={`absolute inset-0 ${hasError ? 'block' : 'opacity-70'}`}>
          <ProductImageFallback alt={alt} category={category} />
        </div>
      )}
    </div>
  )
}
