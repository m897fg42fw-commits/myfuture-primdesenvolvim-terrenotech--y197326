import React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Truck,
  Sparkles,
  ArrowRight,
  Layers,
  FileText,
  BadgePercent,
  Check,
  X,
  HelpCircle,
  Building2,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MarketStudy() {
  const topBrands = [
    {
      name: 'Pro Tork',
      specialty: 'Carenagens, retrovisores, piscas, pedanas, escapamentos e manoplas',
      highlight: 'Maior fábrica de motopeças da América Latina, sede no Paraná',
      warranty: '3 a 6 meses de garantia de fábrica com NF',
    },
    {
      name: 'Cobreq',
      specialty: 'Pastilhas de freio dianteiras cerâmicas e sapatas de tambor',
      highlight: 'Fornecedora homologada de montadoras nacionais (Linha Street)',
      warranty: 'Garantia total contra esfarelamento ou trinca',
    },
    {
      name: 'Vaz',
      specialty: 'Kits relação (coroa temperada, pinhão 1045 e corrente de transmissão)',
      highlight: 'Referência nacional absoluta em tração de alta durabilidade',
      warranty: 'Aço 1045 temperado com certificação ISO',
    },
    {
      name: 'Nakata',
      specialty: 'Retentores de bengala, amortecedores e peças de suspensão',
      highlight: 'Líder em componentes de precisão e vedação na reposição BR',
      warranty: 'Borracha NBR virgem com mola dupla inox',
    },
    {
      name: 'Magnetron',
      specialty: 'Sistemas elétricos, relés, estatores e componentes de ignição',
      highlight: 'Tecnologia elétrica brasileira com especificações OEM',
      warranty: 'Testes de bancada e garantia com procedência',
    },
  ]

  const comparisonRows = [
    {
      criteria: 'Preço ao consumidor',
      original: '30% a 50% mais caro (tabela inflada de concessionária)',
      parallel: 'Preço justo de distribuidora — economia de até 50%',
      winner: 'parallel',
    },
    {
      criteria: 'Onde encontrar',
      original: 'Apenas balcão de concessionária (muitas vezes sob encomenda)',
      parallel: 'Disponível online pronta entrega via distribuidoras BR',
      winner: 'parallel',
    },
    {
      criteria: 'Qualidade do material',
      original: 'Excelente (especificação Honda/Yamaha)',
      parallel: 'Excelente (aço 1045 Vaz, composto cerâmico Cobreq, Nakata)',
      winner: 'tie',
    },
    {
      criteria: 'Garantia e Nota Fiscal',
      original: 'Sim, com NF da concessionária',
      parallel: 'Sim! 100% dos produtos Terrenotech têm NF e garantia de fábrica',
      winner: 'tie',
    },
    {
      criteria: 'Viabilidade em dropshipping',
      original: 'Inviável (concessionária não faz repasse nem integra pedido)',
      parallel: 'Totalmente viável via distribuidoras nacionais parceiras',
      winner: 'parallel',
    },
  ]

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Hero Editorial */}
      <section className="relative overflow-hidden rounded-3xl border border-[#232B3A] p-6 sm:p-10 bg-gradient-to-br from-[#151923] via-[#10141e] to-[#0B0D12] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#22D3EE]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#22D3EE] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            Estudo de Mercado • Varejo Automotivo Nacional
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Por que comprar peça <br className="hidden sm:inline" />
            <span className="gradient-brand-text">pelo site em vez da loja física?</span>
          </h1>

          <p className="text-sm sm:text-base text-[#A1A6B3] max-w-2xl leading-relaxed">
            Entenda por que o motociclista brasileiro migrou em massa para as compras online de
            motopeças, a verdade nua e crua sobre{' '}
            <strong className="text-white">peça original vs paralela honesta</strong>, e como a
            Terrenotech garante marca TOP identificada, procedência e garantia em cada item.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:opacity-95 text-white font-bold px-5 py-2.5 h-auto shadow-lg shadow-[#8B5CF6]/25"
            >
              <Link to="/?categoria=Peças" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Explorar Peças com Marca Identificada
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-[#22D3EE] font-bold px-5 py-2.5 h-auto"
            >
              <Link to="/analises/queda" className="flex items-center gap-2">
                Filão da Queda (até 450cc)
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3 GRANDES NÚMEROS DO MERCADO (DADOS REAIS DE PESQUISA) */}
      <section className="space-y-4">
        <div className="border-b border-[#232B3A] pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#34D399]" />
            Os 3 fatores que movem o motociclista para o digital
          </h2>
          <p className="text-xs text-[#A1A6B3]">
            Pesquisas recentes de consumo (Kantar, Varejo S.A. e IBGE/PMC 2024) comprovam a mudança
            de hábito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Fator 1: Preço */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-6 space-y-3 relative overflow-hidden group hover:border-[#8B5CF6]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#22D3EE]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-tabular">66%</div>
              <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider block mt-1">
                Fator nº 1 de Decisão: Preço
              </span>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              Segundo a pesquisa Kantar / Varejo S.A. (2024), <strong>66% dos brasileiros</strong>{' '}
              apontam o preço mais baixo como o motivo principal para comprar pela internet. Na loja
              física de bairro, o motoqueiro paga o aluguel do ponto, a comissão do balconista e o
              estoque parado.
            </p>
            <div className="text-[10px] text-[#8B5CF6] font-semibold bg-[#8B5CF6]/10 px-2.5 py-1 rounded-md border border-[#8B5CF6]/20">
              Fonte: Kantar / Consumo Varejo S.A. 2024
            </div>
          </div>

          {/* Fator 2: Crescimento */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-6 space-y-3 relative overflow-hidden group hover:border-[#34D399]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#34D399] font-tabular">
                +27,4%
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mt-1">
                Crescimento Anual de Vendas Online
              </span>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              As vendas do setor de autopeças e motopeças online crescem{' '}
              <strong>27,4% ano a ano</strong> (IBGE/PMC). O motociclista não tem tempo a perder
              rodando de loja em loja na cidade para descobrir que a pastilha ou retentor da CG 160
              está em falta no estoque físico.
            </p>
            <div className="text-[10px] text-[#34D399] font-semibold bg-[#34D399]/10 px-2.5 py-1 rounded-md border border-[#34D399]/20">
              Fonte: IBGE / Pesquisa Mensal de Comércio
            </div>
          </div>

          {/* Fator 3: Comodidade & Transparência */}
          <div className="bg-[#151923] border border-[#232B3A] rounded-2xl p-6 space-y-3 relative overflow-hidden group hover:border-[#22D3EE]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-tabular">100%</div>
              <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider block mt-1">
                Comodidade & Entrega Direta
              </span>
            </div>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              O pedido é despachado direto do polo das maiores distribuidoras nacionais (Laquila,
              MTO, Nacional) e chega à porta do piloto ou da oficina parceira, com nota fiscal e
              código de rastreamento em tempo real. Sem intermediário inflacionando o frete.
            </p>
            <div className="text-[10px] text-[#22D3EE] font-semibold bg-[#22D3EE]/10 px-2.5 py-1 rounded-md border border-[#22D3EE]/20">
              Padrão de envio Terrenotech Express
            </div>
          </div>
        </div>
      </section>

      {/* ORIGINAL VS PARALELA HONESTA: A VERDADE DO MERCADO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34D399]/15 border border-[#34D399]/40 text-[#34D399] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Papo Reto & Transparência Mecânica
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Original vs Paralela Honesta: por que a maioria escolhe a paralela TOP?
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed max-w-3xl">
            Toda concessionária tenta colocar medo: "se não for original da caixinha da montadora,
            sua moto vai quebrar". Mas quem roda na rua — entregador de app, motofrete e mototaxista
            — sabe a realidade da oficina:
          </p>
        </div>

        {/* 3 Argumentos Claros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#F87171]/20 text-[#FCA5A5] flex items-center justify-center font-black">
              1
            </div>
            <h3 className="font-bold text-white text-sm">
              Original Honda custa 30% a 50% mais caro
            </h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              O produto que vem na caixa da concessionária tem o custo de marketing da montadora,
              royalties de marca e margens pesadas de rede autorizada. Um kit de relação original
              passa fácil de R$ 220,00, enquanto a paralela de primeira linha custa R$ 129,90.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#34D399]/20 text-[#34D399] flex items-center justify-center font-black">
              2
            </div>
            <h3 className="font-bold text-white text-sm">Paralela TOP usa o mesmo material</h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              Marcas como <strong>Cobreq, Vaz, Pro Tork e Nakata</strong> são indústrias gigantescas
              que muitas vezes fornecem componentes para as próprias linhas de montagem das
              montadoras. O aço 1045 é o mesmo aço 1045; a pastilha cerâmica atende os mesmos
              requisitos do Contran.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/20 text-[#22D3EE] flex items-center justify-center font-black">
              3
            </div>
            <h3 className="font-bold text-white text-sm">A escolha real de quem tem CG 160</h3>
            <p className="text-[#A1A6B3] leading-relaxed">
              Mais de 80% dos proprietários de CG 160 Titan/Fan e Factor 150 no Brasil utilizam
              peças paralelas de marca consolidada no dia a dia. É a única forma de manter o custo
              por quilômetro rodado lucrativo nas entregas sem abrir mão de segurança e
              durabilidade.
            </p>
          </div>
        </div>

        {/* Tabela Comparativa Visual */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#232B3A] text-[#A1A6B3] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Critério</th>
                <th className="py-3 px-4 font-semibold text-[#FCA5A5]">
                  Peça Original Concessionária
                </th>
                <th className="py-3 px-4 font-semibold text-[#34D399]">
                  Paralela TOP Terrenotech (Vaz, Pro Tork, Cobreq, Nakata)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232B3A]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#0B0D12]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.criteria}</td>
                  <td className="py-3 px-4 text-[#A1A6B3]">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#F87171] font-bold">✕</span>
                      <span>{row.original}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white font-medium bg-[#34D399]/5 rounded-lg">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                      <span>{row.parallel}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AS 5 MARCAS PARALELAS TOP QUE A TERRENOTECH TRABALHA */}
      <section className="space-y-5">
        <div className="border-b border-[#232B3A] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#8B5CF6]" />
              Marcas Paralelas TOP Reconhecidas na Terrenotech
            </h2>
            <p className="text-xs text-[#A1A6B3]">
              Nunca produto sem procedência. Toda peça vendida tem marca impressa na embalagem, nota
              fiscal e garantia.
            </p>
          </div>
          <span className="text-xs font-bold text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1 rounded-full w-fit">
            100% Fornecedores Nacionais
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topBrands.map((b, i) => (
            <div
              key={i}
              className="bg-[#151923] border border-[#232B3A] hover:border-[#8B5CF6]/50 rounded-2xl p-5 space-y-3 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-white tracking-wide">{b.name}</span>
                <span className="text-[10px] font-bold text-[#22D3EE] bg-[#22D3EE]/15 border border-[#22D3EE]/30 px-2 py-0.5 rounded-full">
                  Original Paralela
                </span>
              </div>
              <p className="text-xs text-[#A1A6B3]">{b.specialty}</p>
              <div className="space-y-1.5 text-[11px] pt-1 border-t border-[#232B3A]">
                <div className="text-[#34D399] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{b.highlight}</span>
                </div>
                <div className="text-[#e9d5ff] font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span>{b.warranty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPROMISSO TERRENOTECH: O MOTOQUEIRO NÃO PRECISA PROCURAR */}
      <section className="bg-gradient-to-br from-[#10141e] via-[#151923] to-[#0B0D12] border border-[#22D3EE]/30 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-bold uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Compromisso de Transparência Terrenotech
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            O motoqueiro não precisa procurar nem ter dúvida do que está comprando
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A6B3] leading-relaxed">
            Comprar peça errada na internet gera estresse, devolução e moto parada na oficina. Por
            isso, a equipe da Terrenotech adotou 4 regras inegociáveis em todos os produtos do
            catálogo:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-xl space-y-1.5">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#34D399]" />
              Marca em Destaque
            </div>
            <p className="text-[#A1A6B3]">
              A marca (Vaz, Pro Tork, Cobreq, Nakata) aparece logo no título, no card e nas
              especificações.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-xl space-y-1.5">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#34D399]" />
              Ano & Modelo Visíveis
            </div>
            <p className="text-[#A1A6B3]">
              A compatibilidade exata de modelo e anos da moto aparece sem você precisar abrir PDF
              de manual.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-xl space-y-1.5">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#34D399]" />
              Garantia & Nota Fiscal
            </div>
            <p className="text-[#A1A6B3]">
              Garantia explícita em texto (3 a 6 meses de fábrica). O produto viaja com Danfe/Nota
              Fiscal eletrônica.
            </p>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] p-4 rounded-xl space-y-1.5">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#34D399]" />
              Foto Real do Produto
            </div>
            <p className="text-[#A1A6B3]">
              Nada de foto enganosa: imagem que corresponde à peça mecânica real que você está
              adquirindo.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#232B3A]">
          <span className="text-xs text-[#A1A6B3]">
            Pronto para economizar na manutenção da sua moto com procedência?
          </span>
          <Button
            asChild
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-black px-6 h-11 shadow-lg shadow-[#8B5CF6]/30"
          >
            <Link to="/?categoria=Peças" className="flex items-center gap-2">
              Ver Catálogo de Peças (Até 450cc)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
