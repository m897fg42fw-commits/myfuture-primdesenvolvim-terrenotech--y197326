import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Users,
  Building2,
  FileText,
  CreditCard,
  MessageSquare,
  PackageCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
  Clock,
  Flag,
  Target,
  BookmarkCheck,
  RotateCcw,
  Rocket,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ListChecks, Hourglass, HelpCircle } from 'lucide-react'
import MountainMotoLogo from '@/components/MountainMotoLogo'

export type DecisionCategory = 'juridico' | 'produto' | 'comunidade' | 'negocio'

interface DecisionItem {
  id: string
  month: string
  title: string
  context: string
  category: DecisionCategory
  tag: string
  icon: React.ElementType
}

export interface MicroTask {
  id: string
  title: string
  estimatedTime: string // ex: "30 min", "1h", "meio dia"
}

export interface PendingItem {
  id: string
  title: string
  description: string
  category: DecisionCategory
  isDifficult?: boolean
  totalEstimatedTime?: string
  microTasks?: MicroTask[]
}

export interface FounderHistoryEntry {
  id: string
  itemId: string
  itemTitle: string
  action: 'completed' | 'reopened'
  timestamp: string // ISO string
  formattedDate: string // pt-BR legível
}

interface RoadmapPhase {
  phase: string
  title: string
  timeframe: string
  color: string
  borderColor: string
  badgeBg: string
  textColor: string
  summary: string
  milestones: string[]
  criteria: string // como saber que passou
}

export const CATEGORY_CONFIG: Record<
  DecisionCategory,
  {
    label: string
    badgeClass: string
    cardBorderHover: string
    accentColor: string
    dotColor: string
    iconColor: string
    description: string
  }
> = {
  juridico: {
    label: 'Jurídico & Documentos',
    badgeClass: 'text-amber-300 bg-amber-500/15 border-amber-500/40',
    cardBorderHover: 'hover:border-amber-500/60',
    accentColor: '#F59E0B',
    dotColor: 'bg-amber-400',
    iconColor: 'text-amber-400',
    description: 'INPI, CNPJ, conformidade fiscal e proteção societária',
  },
  produto: {
    label: 'Produto & Fornecedores',
    badgeClass: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40',
    cardBorderHover: 'hover:border-cyan-500/60',
    accentColor: '#22D3EE',
    dotColor: 'bg-cyan-400',
    iconColor: 'text-cyan-400',
    description: 'Distribuidoras, marcas paralelas TOP, catálogo até 450cc em duas camadas',
  },
  comunidade: {
    label: 'Comunidade & Programas',
    badgeClass: 'text-pink-300 bg-pink-500/15 border-pink-500/40',
    cardBorderHover: 'hover:border-pink-500/60',
    accentColor: '#EC4899',
    dotColor: 'bg-pink-400',
    iconColor: 'text-pink-400',
    description:
      'Clube Moto-T (antes: Clube Motoqueiro), MotoQ, Arrego das Motoqueiras e apoio ao piloto',
  },
  negocio: {
    label: 'Negócio & Estratégia',
    badgeClass: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40',
    cardBorderHover: 'hover:border-emerald-500/60',
    accentColor: '#10B981',
    dotColor: 'bg-emerald-400',
    iconColor: 'text-emerald-400',
    description: 'Piloto de validação, ticket médio da cesta, modelo dropshipping',
  },
}

const DECISIONS: DecisionItem[] = [
  {
    id: 'modelo-negocio',
    month: 'Jan/2025',
    title: 'Modelo de negócio: Dropshipping sem estoque',
    context:
      'Atravessador onde o fornecedor entrega direto ao cliente; a compra só é feita depois de vender, garantindo caixa nunca negativo por construção.',
    category: 'negocio',
    tag: 'Negócio',
    icon: PackageCheck,
  },
  {
    id: 'nicho-paixao',
    month: 'Jan/2025',
    title: 'Nicho: Acessórios e peças para motociclistas',
    context:
      'Nicho de paixão do dono com demanda perene no Brasil, permitindo falar com autoridade e autenticidade com o público de duas rodas.',
    category: 'negocio',
    tag: 'Estratégia',
    icon: Sparkles,
  },
  {
    id: 'foco-pecas',
    month: 'Fev/2025',
    title: 'Foco de peças: Reposição para motos populares',
    context:
      'Foco cirúrgico em CG 160, Factor 150, Biz 125 etc.; sem carros, sem pneus e sem motos elétricas (saída definitiva da linha elétrica por ser mercado misturado e com risco de fornecimento — decisão pautada em experiência negativa prévia do dono).',
    category: 'produto',
    tag: 'Catálogo',
    icon: AlertTriangle,
  },
  {
    id: 'limite-ampliado-450cc',
    month: 'Mar/2025',
    title:
      'Limite ampliado para até 450cc em duas camadas — núcleo até 250cc para volume, camada 250–450cc para ticket, 600cc fora',
    context:
      'Decisão estratégica de ampliação do leque: núcleo até 250cc responde por ~80% da frota (Fenabrave) gerando giro rápido de estoque e caixa; camada 250–450cc (CB 300, Twister, Dominar 400, Ninja 400, Himalayan 450, Lander) é o nicho que mais cresce, tem menor disputa de preço e garante ticket médio e margem absoluta maiores. Motos acima de 600cc ficam fora por baixa escala e peças paralelas escassas.',
    category: 'negocio',
    tag: 'Estratégia',
    icon: TrendingUp,
  },
  {
    id: 'marcas-paralelas',
    month: 'Fev/2025',
    title: 'Marcas: Paralelas TOP nacionais com total transparência',
    context:
      'Parcerias com Pro Tork, Magnetron, Vaz, Cobreq e Nakata. Peça original Honda é inviável em dropshipping e 30–50% mais cara. Regra de ouro: toda peça mostra marca, ano/modelo compatível, garantia e foto real.',
    category: 'produto',
    tag: 'Qualidade',
    icon: ShieldCheck,
  },
  {
    id: 'fornecedores-oficiais',
    month: 'Fev/2025',
    title: 'Fornecedores: Dropshipping oficial de motopeças',
    context:
      'Distribuidoras nacionais Laquila, MTO Distribuidora e Nacional. Todas exigem CNPJ ativo (MEI não permite dropshipping fiscal; o caminho formal e regular é ME optante pelo Simples Nacional).',
    category: 'produto',
    tag: 'Fornecedores',
    icon: Building2,
  },
  {
    id: 'estrategia-ticket',
    month: 'Mar/2025',
    title: 'Estratégia de ticket: Cesta e combos, não produto isolado',
    context:
      'Âncora de alto ticket (capacete, jaqueta, interfone) combinada com itens de recompra rápida (bateria em emergência, kit revisão de 10 mil km, pastilhas). A peça avulsa de R$ 72 sozinha não sustenta o CAC.',
    category: 'negocio',
    tag: 'Estratégia',
    icon: TrendingUp,
  },
  {
    id: 'programas-comunidade',
    month: 'Mar/2025',
    title: 'Programas: Clube Moto-T & Proteção ao Acidentado',
    context:
      'Clube Moto-T (antes: Clube Motoqueiro; homenagem à primeira moto do fundador, uma TT 125 — TT quer dizer Todo Terreno) com 50% da margem repassada ao indicador (pago em produto/crédito após pedido concluído); peças grátis para motoqueiro acidentado com B.O./laudo (ou foto da moto + relato no grupo para peças baratas); gamificação por níveis (Novato da Pista → Piloto Ativo → Veterano → Embaixador).',
    category: 'comunidade',
    tag: 'Clube',
    icon: Users,
  },
  {
    id: 'motoq-carta-tombo',
    month: 'Mar/2025',
    title: 'MotoQ — A Carta ao Tombo',
    context:
      'Carta contando o tombo + plano de ação para reerguer a vida, com avaliação a cada 6 meses. O prêmio de lançamento é kit de peças + crédito no app; a moto nova é a meta máxima do fundo, nunca prometida publicamente para manter a integridade.',
    category: 'comunidade',
    tag: 'MotoQ',
    icon: FileText,
  },
  {
    id: 'arrego-motoqueiras',
    month: 'Mar/2025',
    title: 'Arrego das Motoqueiras: Benefício comunitário seguro',
    context:
      'Benefício concedido por participação e engajamento na comunidade (Kit Arrego na 1ª compra), e NUNCA por diferenciação de preço por gênero, eliminando qualquer risco perante o Código de Defesa do Consumidor (CDC).',
    category: 'comunidade',
    tag: 'Arrego',
    icon: BookmarkCheck,
  },
  {
    id: 'registro-inpi-pf',
    month: 'Mar/2025',
    title: 'INPI: Protocolo da marca Terrenotech como Pessoa Física',
    context:
      'Proteção preventiva da marca no INPI (Classe 35 e/ou 12) antes de abrir a empresa e divulgar amplamente nos grupos. Taxa inicial de R$ 440,00 garante prioridade de anterioridade registral.',
    category: 'juridico',
    tag: 'INPI',
    icon: ShieldCheck,
  },
  {
    id: 'enquadramento-cnpj',
    month: 'Mar/2025',
    title: 'CNPJ: ME no Simples Nacional após o Piloto',
    context:
      'Formalização jurídica em Microempresa pelo Simples Nacional com emissão obrigatória de NF-e; MEI é expressamente vedado para intermediação/dropshipping comercial segundo a Receita Federal.',
    category: 'juridico',
    tag: 'CNPJ',
    icon: Building2,
  },
  {
    id: 'piloto-demanda',
    month: 'Mar/2025',
    title: 'Validação prévia: Piloto de Demanda antes de abrir CNPJ',
    context:
      'Sondar aceite real nos grupos de motoqueiros com pedidos manuais (Pix manual e repasse) antes de arcar com os custos fixos de abertura de CNPJ. Critério: ≥ 20 pedidos firmes em 30 dias para seguir.',
    category: 'negocio',
    tag: 'Piloto',
    icon: Rocket,
  },
  {
    id: 'decisao-cores-conversao',
    month: 'Mar/2025',
    title: 'Paleta semântica de cores para conversão e psicologia visual',
    context:
      'Cores para conversão: CTA de compra em laranja/vermelho quente (urgência), azul-escuro TT 125 = confiança/identidade, esmeralda só para confirmação, âmbar = interno do fundador.',
    category: 'negocio',
    tag: 'Identidade & Conversão',
    icon: Sparkles,
  },
]

const INITIAL_PENDING_ITEMS: PendingItem[] = [
  {
    id: 'piloto-validacao',
    title: '1º Piloto de validação de demanda (30 dias, Pix manual)',
    description:
      'Sondar aceite nos grupos com 3 a 5 peças de reposição rápida (bateria, pneu traseiro, kit relação, pastilhas). Meta: ≥ 20 pedidos firmes para comprovar tração real antes de gastar com CNPJ.',
    category: 'negocio',
  },
  {
    id: 'registro-marca-inpi',
    title: '2º INPI / Proteção da Marca (Protocolar como Pessoa Física)',
    description:
      'Registrar a marca Terrenotech no INPI (Classe 35 e/ou Classe 12) antes de divulgar massivamente nos grupos. Tarifa com desconto legal para Pessoa Física.',
    category: 'juridico',
    isDifficult: true,
    totalEstimatedTime: '3 a 4 horas de execução + espera de exame',
    microTasks: [
      {
        id: 'inpi-1',
        title: 'Criar login no portal do INPI (e-INPI) e conferir dados cadastrais no gov.br',
        estimatedTime: '20 min',
      },
      {
        id: 'inpi-2',
        title:
          'Fazer busca de anterioridade da marca "Terrenotech" nas classes 35 (comércio) e 12 (motopeças)',
        estimatedTime: '40 min',
      },
      {
        id: 'inpi-3',
        title:
          'Emitir e pagar a Guia de Recolhimento da União (GRU código 389 - pedido com especificação pré-aprovada: R$ 142 a R$ 440)',
        estimatedTime: '30 min',
      },
      {
        id: 'inpi-4',
        title:
          'Preencher formulário eletrônico e-Marcas com o logotipo do Morro Fortaleza e anexar comprovante da GRU',
        estimatedTime: '1h',
      },
      {
        id: 'inpi-5',
        title:
          'Guardar o número do protocolo oficial e agendar checagem quinzenal da RPI (Revista da Propriedade Industrial)',
        estimatedTime: '15 min',
      },
    ],
  },
  {
    id: 'abrir-cnpj',
    title: '3º Abrir CNPJ (ME no Simples Nacional) após validação do piloto',
    description:
      'Comprovada a demanda de ≥ 20 pedidos no piloto, formalizar Microempresa no Simples Nacional com intermediação e comércio, viabilizando cadastro em distribuidoras.',
    category: 'juridico',
    isDifficult: true,
    totalEstimatedTime: '1 a 2 dias úteis de dedicação ativa + prazos de órgãos',
    microTasks: [
      {
        id: 'cnpj-1',
        title:
          'Verificar requisitos no gov.br e separar documentos pessoais (RG, CPF, comprovante de residência e IPTU do imóvel)',
        estimatedTime: '1h',
      },
      {
        id: 'cnpj-2',
        title:
          'Selecionar contador especializado em e-commerce/dropshipping e alinhar CNAEs (intermediação de negócios e comércio varejista de peças)',
        estimatedTime: '1h a 2h',
      },
      {
        id: 'cnpj-3',
        title:
          'Preencher formulário de viabilidade de endereço na Junta Comercial do RS / Prefeitura',
        estimatedTime: '1h + espera',
      },
      {
        id: 'cnpj-4',
        title:
          'Emitir Certificado Digital e-CPF / e-CNPJ (pegar o carro, ir ao ponto de atendimento no centro da cidade ou fazer validação por videoconferência)',
        estimatedTime: 'Meio dia (deslocamento e validação presencial no centro)',
      },
      {
        id: 'cnpj-5',
        title:
          'Protocolar o DBE (Documento Básico de Entrada) na Receita Federal e assinar contrato social na Junta',
        estimatedTime: '1h + espera de deferimento',
      },
      {
        id: 'cnpj-6',
        title:
          'Emitir o cartão CNPJ, obter a Inscrição Estadual (SEFAZ) e configurar login no emissor de NF-e',
        estimatedTime: '1h',
      },
    ],
  },
  {
    id: 'cadastrar-distribuidoras',
    title: '4º Cadastro nas distribuidoras oficiais (Laquila, MTO, Nacional)',
    description:
      'Submeter CNPJ nas 3 maiores distribuidoras nacionais para liberação de login B2B, tabelas de preço de revenda e modelo de expedição direta ao cliente.',
    category: 'produto',
    isDifficult: true,
    totalEstimatedTime: '3 a 5 horas de negociação e preenchimento + prazos de análise cadastral',
    microTasks: [
      {
        id: 'distrib-1',
        title:
          'Organizar pasta digital com CNPJ, Contrato Social, Inscrição Estadual e comprovante bancário da conta PJ',
        estimatedTime: '30 min',
      },
      {
        id: 'distrib-2',
        title: 'Preencher ficha de abertura cadastral B2B na Laquila (portal de revendedores)',
        estimatedTime: '45 min',
      },
      {
        id: 'distrib-3',
        title: 'Submeter documentação comercial e ficha cadastral na MTO Distribuidora',
        estimatedTime: '45 min',
      },
      {
        id: 'distrib-4',
        title: 'Enviar cadastro e dados societários para a Nacional Distribuidora',
        estimatedTime: '45 min',
      },
      {
        id: 'distrib-5',
        title:
          'Ligar para o representante comercial / televendas de cada distribuidora para negociar liberação de faturamento direto e prazos de postagem',
        estimatedTime: '1h a 2h',
      },
      {
        id: 'distrib-6',
        title:
          'Testar acesso ao portal B2B das 3 fornecedoras e baixar as tabelas de preços com margens líquidas',
        estimatedTime: '30 min',
      },
    ],
  },
  {
    id: 'substituir-custos-estimados',
    title: 'Substituir custos estimados do catálogo pelos reais',
    description:
      'Atualizar os dados de custo de atacado e margens no código/banco de dados com as tabelas exatas fornecidas após a homologação do cadastro.',
    category: 'produto',
  },
  {
    id: 'definir-fluxo-repasse',
    title: 'Definir fluxo concreto de repasse com fornecedor',
    description:
      'Alinhar se o pedido será despachado via API, painel B2B do fornecedor ou planilha diária por WhatsApp, com geração de etiqueta e código de rastreio.',
    category: 'produto',
    isDifficult: true,
    totalEstimatedTime: '2 a 3 horas de desenho operacional e testes práticos',
    microTasks: [
      {
        id: 'fluxo-1',
        title:
          'Definir canal exato de transmissão do pedido para o despachante (painel web B2B vs. WhatsApp direto do televendas)',
        estimatedTime: '30 min',
      },
      {
        id: 'fluxo-2',
        title:
          'Simular 1 pedido teste: emitir pagamento à distribuidora e enviar endereço de entrega do cliente final com CEP verificado',
        estimatedTime: '45 min',
      },
      {
        id: 'fluxo-3',
        title:
          'Padronizar processo de envio do PDF da NF-e para a distribuidora anexar à caixa no ato do despacho',
        estimatedTime: '40 min',
      },
      {
        id: 'fluxo-4',
        title:
          'Mapear tempo médio entre a aprovação do pagamento e o envio do código de rastreio Correios/transportadora para repasse ao cliente',
        estimatedTime: '30 min',
      },
    ],
  },
  {
    id: 'preparar-lancamento-grupos',
    title: 'Preparar lançamento nos grupos (pitch + canais + WhatsApp)',
    description:
      'Mapear 5 a 10 grupos regionais de motoboys e entregadores de CG 160, Factor, Twister e Lander para apresentar o Clube Moto-T com pitch estruturado e suporte em peças.',
    category: 'comunidade',
    isDifficult: true,
    totalEstimatedTime: '3 a 4 horas de mapeamento e preparação de materiais',
    microTasks: [
      {
        id: 'grupos-1',
        title:
          'Mapear e entrar em 5 a 10 grupos ativos de motoboys e motofretes no WhatsApp e Telegram (regiões Sul e Sudeste)',
        estimatedTime: '1h',
      },
      {
        id: 'grupos-2',
        title:
          'Escrever o roteiro do pitch respeitando a regra antispam: focar na dor da quebra repentina, no preço justo e no Clube que devolve 50% da margem em peças',
        estimatedTime: '45 min',
      },
      {
        id: 'grupos-3',
        title:
          'Criar o link curto de WhatsApp Business com mensagem pré-definida de atendimento rápido para cotações de peças',
        estimatedTime: '20 min',
      },
      {
        id: 'grupos-4',
        title:
          'Preparar catálogo digital em PDF resumido (núcleo até 250cc + camada 250-450cc) para envio imediato quando pedirem cotação',
        estimatedTime: '1h',
      },
      {
        id: 'grupos-5',
        title:
          'Fazer o primeiro post orgânico se apresentando como piloto/motoqueiro da região e oferecendo apoio na cotação sem intermediários caros',
        estimatedTime: '30 min',
      },
    ],
  },
  {
    id: 'consolidacao-compras-fornecedores',
    title: 'Consolidação de compras de fornecedores',
    description:
      'Definir agrupamento de pedidos por distribuidora e gatilho de compra em lote para caber no frete mínimo, testando o fluxo no piloto com 10 pedidos reais antes de qualquer automação.',
    category: 'negocio',
    isDifficult: true,
    totalEstimatedTime: '2h30 + meio dia de piloto com pedidos reais',
    microTasks: [
      {
        id: 'consol-1',
        title:
          'Definir agrupamento de pedidos por distribuidora — Laquila, MTO Distribuidora, Nacional',
        estimatedTime: '1h',
      },
      {
        id: 'consol-2',
        title:
          'Definir gatilho de compra em lote — diário às 16h ou 2x por semana, para caber no frete mínimo',
        estimatedTime: '1h',
      },
      {
        id: 'consol-3',
        title:
          'Testar o fluxo manual no piloto com 10 pedidos reais (meio dia). Nota: Automação/bot B2B de consolidação fica para depois do piloto — primeiro o manual.',
        estimatedTime: 'meio dia',
      },
    ],
  },
  {
    id: 'conectar-github-repositorio-privado',
    title: 'Conectar GitHub (repositório privado)',
    description:
      'Cópia independente do código com histórico de versões. Conectar no cabeçalho do projeto (ícone de integrações → GitHub), repositório PRIVADO. Publicar (tornar público) só depois do piloto, com código limpo e licença escolhida — nunca com margens, custos de fornecedor ou nomes de parceiros expostos.',
    category: 'negocio',
    isDifficult: true,
    totalEstimatedTime: '20 min de conexão + decisão futura sem prazo',
    microTasks: [
      {
        id: 'github-1',
        title:
          'Criar/verificar conta no GitHub e clicar no ícone de integrações no cabeçalho do projeto, escolher GitHub e autorizar (10 min)',
        estimatedTime: '10 min',
      },
      {
        id: 'github-2',
        title:
          "Escolher 'criar repositório privado' e confirmar a conexão — conferir que aparece o código do projeto (10 min)",
        estimatedTime: '10 min',
      },
      {
        id: 'github-3',
        title:
          'Não publicar agora: somente depois do piloto, limpar margens/custos/parceiros do código antes de qualquer repositório público (decisão futura, sem prazo)',
        estimatedTime: 'sem prazo',
      },
    ],
  },
  {
    id: 'definir-forma-recebimento',
    title: 'Definir forma de recebimento (Pix manual no início)',
    description:
      'Operar inicialmente com chave Pix da empresa ou gateway de checkout instantâneo com taxa baixa, garantindo dinheiro disponível antes de emitir a compra na distribuidora.',
    category: 'negocio',
  },
  {
    id: 'avaliar-numeros-plano-voo',
    title: 'Avaliar números contra o Plano de Voo no mês 3',
    description:
      'Cruzar o faturamento real, ticket médio da cesta e despesas fixas com as projeções do cenário Pessimista vs. Realista da página /analises/plano.',
    category: 'negocio',
  },
]

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'Fase 0',
    title: 'Piloto de Validação, INPI & Fundação Legal',
    timeframe: 'Semanas 1 a 4',
    color: '#8B5CF6',
    borderColor: 'border-[#8B5CF6]/40',
    badgeBg: 'bg-[#8B5CF6]/20',
    textColor: 'text-[#C4B5FD]',
    summary:
      'Execução do piloto de validação nos grupos (Pix manual), protocolo preventivo de marca no INPI como Pessoa Física e abertura do CNPJ ME logo após o go do piloto.',
    milestones: [
      'Execução do Piloto de Demanda: 30 dias de sondagem em grupos de motoboys.',
      'Protocolo da marca Terrenotech no INPI como PF (Classe 35 por R$ 440,00).',
      'Validação de meta: atingir ≥ 20 pedidos firmes antes de contratar contador.',
      'Abertura de CNPJ ME no Simples Nacional e homologação nas distribuidoras.',
    ],
    criteria:
      'Demanda validada (≥ 20 pedidos no piloto), protocolo INPI realizado e CNPJ ME constituído.',
  },
  {
    phase: 'Fase 1',
    title: 'Entrada Orgânica & Primeiras Vendas',
    timeframe: 'Mês 1 a 3',
    color: '#22D3EE',
    borderColor: 'border-[#22D3EE]/40',
    badgeBg: 'bg-[#22D3EE]/20',
    textColor: 'text-[#67E8F9]',
    summary:
      'Operação manual de baixo atrito, entrada direta nos grupos de motociclistas e validação do fluxo de repasse sem atrasos.',
    milestones: [
      'Entrada ativa em grupos de WhatsApp e rede de oficinas parceiras.',
      'Execução dos primeiros pedidos no modelo compra-após-venda.',
      'Operação manual do Clube Moto-T (repasses de 50% da margem em produto).',
      'Meta de volume inicial: 1 a 2 pedidos/dia (25 a 60 pedidos/mês).',
      'Atingimento do break-even operacional (custo fixo quitado com ~7 pedidos de cesta).',
    ],
    criteria:
      '60 pedidos entregues sem falha logística de repasse e break-even alcançado no mês 2.',
  },
  {
    phase: 'Fase 2',
    title: 'Tração do Clube & Prova Social',
    timeframe: 'Mês 4 a 6',
    color: '#F472B6',
    borderColor: 'border-[#F472B6]/40',
    badgeBg: 'bg-[#F472B6]/20',
    textColor: 'text-[#F9A8D4]',
    summary:
      'Efeito de rede do Clube Moto-T gerando recompra contínua de peças de desgaste e realização da 1ª avaliação do MotoQ.',
    milestones: [
      'Clube Moto-T rodando com embaixadores ativos em rotas urbanas.',
      'Recompra rápida estabelecida: kits de relação, lonas/pastilhas e baterias.',
      'Primeira edição e avaliação da "Carta ao Tombo" (MotoQ) após 6 meses de inscrições.',
      'Meta de volume diário: 3 a 5 pedidos/dia (~150 pedidos/mês).',
      'Consolidação do Cenário Realista: ~R$ 7.600 de lucro líquido mensal.',
    ],
    criteria:
      'Volume sustentado de 5 pedidos/dia e realização da primeira premiação com kit + crédito do MotoQ.',
  },
  {
    phase: 'Fase 3',
    title: 'Escala Comercial & Otimização',
    timeframe: 'Mês 7 a 12',
    color: '#10B981',
    borderColor: 'border-[#10B981]/40',
    badgeBg: 'bg-[#10B981]/20',
    textColor: 'text-[#6EE7B7]',
    summary:
      'Catálogo expandido, parcerias com associações de motoboys e consolidação do negócio em velocidade de cruzeiro.',
    milestones: [
      'Catálogo completo homologado nas 3 distribuidoras com integração de estoque.',
      'Campanhas leves de anúncios geolocalizados para reforçar combos e cestas.',
      'Meta de volume de cruzeiro: 7 a 15 pedidos/dia (210 a 450 pedidos/mês).',
      'Revisão completa das metas e projeções do Plano de Voo para o Ano 2.',
      'Aproximação do Cenário Otimista: R$ 24.800 de lucro líquido mensal.',
    ],
    criteria:
      'Média de mais de 10 pedidos/dia com margem líquida acima de 38% e processos 100% documentados.',
  },
]

const APP_REVIEW_LINKS = [
  {
    title: 'Piloto: Vender Antes de Abrir Empresa',
    path: '/piloto',
    badge: 'Validação de Demanda',
    badgeColor: 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/40',
    description:
      'Página central do teste de demanda de 30 dias: regras do piloto, segurança jurídica prudencial, registro de marca INPI como PF, checklist interativo e metas.',
    actionLabel: 'Acessar Piloto',
  },
  {
    title: 'Plano de Voo & Lucro Líquido',
    path: '/analises/plano',
    badge: 'Financeiro & Ramp-up',
    badgeColor: 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/40',
    description:
      'Projeção de 12 meses, cenários Pessimista / Realista / Otimista, cálculo de break-even (7 pedidos com cesta) e os 5 pilares anti-elefante-branco.',
    actionLabel: 'Ver Plano de Voo',
  },
  {
    title: 'Filão da Queda (até 200cc)',
    path: '/analises/queda',
    badge: 'Reposição Crítica',
    badgeColor: 'text-[#F87171] bg-[#F87171]/15 border-[#F87171]/40',
    description:
      'Ranking decrescente das 8 peças que mais quebram em quedas leves de CG 160 e Factor, além do Kit Queda (bundle de emergência com margem alta).',
    actionLabel: 'Ver Filão da Queda',
  },
  {
    title: 'Por Que Comprar Peça Pelo Site?',
    path: '/por-que-comprar-online',
    badge: 'Estudo de Mercado',
    badgeColor: 'text-[#34D399] bg-[#34D399]/15 border-[#34D399]/40',
    description:
      'Pesquisas da Kantar, Varejo S.A. e IBGE demonstrando por que 66% dos motociclistas preferem o canal digital para economizar até 50% frente às concessionárias.',
    actionLabel: 'Ver Estudo Online',
  },
  {
    title: 'Clube Moto-T & MotoQ',
    path: '/clube',
    badge: 'Comunidade & Gamificação',
    badgeColor: 'text-[#60A5FA] bg-[#1E3A8A]/30 border-[#1E3A8A]/50',
    description:
      'Clube Moto-T (espírito Todo Terreno): regras completas de repasse de 50% da margem em produtos, política de amparo, gamificação por patentes e Carta ao Tombo.',
    actionLabel: 'Acessar Clube Moto-T',
  },
  {
    title: 'Motor de Conteúdo (Vídeos & Marketing)',
    path: '/marketing',
    badge: 'Histórias & Redes',
    badgeColor: 'text-amber-400 bg-amber-400/15 border-amber-400/40',
    description:
      'Produção manual de vídeos curtos contando histórias reais de motoqueiros: banco com 12+ ganchos, calendário editorial de 4 semanas, templates de 30-60s e agente Roteirista.',
    actionLabel: 'Acessar Motor de Conteúdo',
  },
  {
    title: 'Estatísticas & Recuperação de Caixa',
    path: '/analises',
    badge: 'Giro & Métricas',
    badgeColor: 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/40',
    description:
      'Painel de liquidez de produtos, velocidade de giro (un/dia) e parecer estratégico para zerar déficits de caixa através dos itens mais velozes.',
    actionLabel: 'Ver Estatísticas',
  },
]

const STORAGE_KEY_PENDING = 'terrenotech_founder_pending'
const STORAGE_KEY_HISTORY = 'terrenotech_founder_history'
const STORAGE_KEY_MICROTASKS = 'terrenotech_founder_microtasks'

function formatDateTimeBR(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} às ${hours}:${minutes}`
}

export default function FounderRoadmap() {
  // Modal de micro tarefas para itens difíceis
  const [selectedDifficultItem, setSelectedDifficultItem] = useState<PendingItem | null>(null)

  // Checklist principal com persistência em localStorage
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PENDING)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage pending:', e)
    }
    return {}
  })

  // Micro tarefas marcadas com persistência em localStorage
  const [microTasksMap, setMicroTasksMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MICROTASKS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage microtasks:', e)
    }
    return {}
  })

  // Histórico de alterações com persistência em localStorage
  const [history, setHistory] = useState<FounderHistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage history:', e)
    }
    return []
  })

  // Salvar pendências no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(completedMap))
    } catch (e) {
      console.warn('Erro ao salvar pending:', e)
    }
  }, [completedMap])

  // Salvar micro tarefas no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MICROTASKS, JSON.stringify(microTasksMap))
    } catch (e) {
      console.warn('Erro ao salvar microtasks:', e)
    }
  }, [microTasksMap])

  // Salvar histórico no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history))
    } catch (e) {
      console.warn('Erro ao salvar history:', e)
    }
  }, [history])

  // Mapa rápido para obter a data da última conclusão de cada item
  const itemCompletionDateMap = React.useMemo(() => {
    const map: Record<string, string> = {}
    // Itera do mais antigo para o mais novo para refletir a última conclusão
    for (const entry of history) {
      if (entry.action === 'completed') {
        map[entry.itemId] = entry.formattedDate
      } else if (entry.action === 'reopened') {
        delete map[entry.itemId]
      }
    }
    return map
  }, [history])

  const togglePendingItem = (item: PendingItem) => {
    const nextStatus = !completedMap[item.id]
    const now = new Date()
    const formatted = formatDateTimeBR(now)

    setCompletedMap((prev) => ({
      ...prev,
      [item.id]: nextStatus,
    }))

    const newEntry: FounderHistoryEntry = {
      id: `${item.id}-${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      action: nextStatus ? 'completed' : 'reopened',
      timestamp: now.toISOString(),
      formattedDate: formatted,
    }

    setHistory((prev) => [newEntry, ...prev.slice(0, 99)]) // guarda até 100 eventos
  }

  const toggleMicroTask = (microTaskId: string, parentItem: PendingItem) => {
    const nextVal = !microTasksMap[microTaskId]
    const updatedMicroMap = {
      ...microTasksMap,
      [microTaskId]: nextVal,
    }
    setMicroTasksMap(updatedMicroMap)

    // Se todas as micro tarefas daquele item foram concluídas, sugere/marca o item pai
    if (parentItem.microTasks && parentItem.microTasks.length > 0) {
      const allDone = parentItem.microTasks.every((mt) =>
        mt.id === microTaskId ? nextVal : updatedMicroMap[mt.id],
      )
      if (allDone && !completedMap[parentItem.id]) {
        togglePendingItem(parentItem)
      }
    }
  }

  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY)
    } catch {
      /* intentionally ignored */
    }
  }

  const resetPendingItems = () => {
    const now = new Date()
    const formatted = formatDateTimeBR(now)
    const resetEntries: FounderHistoryEntry[] = Object.keys(completedMap)
      .filter((id) => completedMap[id])
      .map((id) => {
        const item = INITIAL_PENDING_ITEMS.find((it) => it.id === id)
        return {
          id: `${id}-reset-${Date.now()}`,
          itemId: id,
          itemTitle: item ? item.title : id,
          action: 'reopened' as const,
          timestamp: now.toISOString(),
          formattedDate: formatted,
        }
      })

    setCompletedMap({})
    if (resetEntries.length > 0) {
      setHistory((prev) => [...resetEntries, ...prev].slice(0, 100))
    }
  }

  const completedCount = Object.values(completedMap).filter(Boolean).length
  const totalPending = INITIAL_PENDING_ITEMS.length
  const pendingPercentage = Math.round((completedCount / totalPending) * 100)

  return (
    <div className="space-y-12 animate-fade-up">
      {/* Topo / Hero do Roteiro */}
      <section className="relative overflow-hidden rounded-3xl border border-[#8B5CF6]/30 p-6 sm:p-10 bg-gradient-to-br from-[#151923] via-[#0F1420] to-[#0B0D12] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#22D3EE]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#C4B5FD] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#22D3EE]" />
                Painel Estratégico • Roteiro do Fundador
              </div>
              <span className="text-[11px] text-[#A1A6B3] bg-[#0B0D12]/80 px-2.5 py-1 rounded-full border border-[#232B3A]">
                Consolidação Executiva da Jornada
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Roteiro do Fundador: <br />
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#34D399] bg-clip-text text-transparent">
                Decisões, Pendências & Próximos Passos
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-3xl">
              Tudo o que o dono precisa revisar e executar consolidado em um só lugar. Dos
              fundamentos do modelo dropshipping sem estoque até o checklist de abertura do CNPJ e o
              cronograma de 4 fases para atingir velocidade de cruzeiro na Terrenotech.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#A1A6B3]">
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span className="text-white font-medium">{DECISIONS.length} Decisões Mapeadas</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                <span className="text-white font-medium">
                  {completedCount} de {totalPending} pendências concluídas ({pendingPercentage}%)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span className="text-white font-medium">4 Fases Estratégicas</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full bg-[#121622] border border-[#232B3A] rounded-2xl p-5 space-y-4 text-center">
              <MountainMotoLogo
                variant="icon"
                className="w-16 h-16 mx-auto rounded-2xl shadow-lg shadow-[#10B981]/20"
              />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Terrenotech Noturno</h3>
                <p className="text-xs text-[#A1A6B3]">
                  Peças até 450cc em duas camadas • Morro Fortaleza (Cambará do Sul, RS)
                </p>{' '}
              </div>
              <div className="pt-2 border-t border-[#232B3A] text-left text-xs space-y-1.5 text-[#A1A6B3]">
                <div className="flex justify-between">
                  <span>Modelo:</span>
                  <strong className="text-white">Dropshipping Nacional</strong>
                </div>
                <div className="flex justify-between">
                  <span>Enquadramento:</span>
                  <strong className="text-[#34D399]">ME (Simples Nacional)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Regra nº 1:</span>
                  <strong className="text-[#22D3EE]">Comprar só após vender</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 1: DECISÕES TOMADAS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
              <BookmarkCheck className="w-4 h-4" />
              Seção 1 de 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Decisões Tomadas
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#151923] text-[#22D3EE] border border-[#232B3A]">
                {DECISIONS.length} decisões consolidadas
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Linha do tempo e registros fundamentais acordados para a operação do negócio até aqui.
            </p>
          </div>
          <span className="text-xs text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            ✓ Nenhuma decisão de improviso
          </span>
        </div>

        {/* LEGENDA SEMÂNTICA VISÍVEL */}
        <div className="bg-[#121622] border border-[#232B3A] rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              Legenda Semântica de Cores (Decisões & Pendências)
            </span>
            <span className="text-[11px] text-[#A1A6B3] hidden sm:inline">
              Categorização padronizada por área
            </span>
          </div>

          {/* Nota de decisão de cores para conversão */}
          <div className="mb-3 p-3 rounded-xl bg-[#0B0D12] border border-[#232B3A] text-xs flex items-center gap-2 text-[#E2E8F0]">
            <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
            <span>
              <strong>Cores para conversão:</strong> CTA de compra em laranja/vermelho quente
              (urgência), azul-escuro TT 125 = confiança/identidade, esmeralda só para confirmação,
              âmbar = interno do fundador.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_CONFIG) as DecisionCategory[]).map((catKey) => {
              const cfg = CATEGORY_CONFIG[catKey]
              return (
                <div
                  key={catKey}
                  className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cfg.dotColor} shadow-sm`} />
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${cfg.badgeClass}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A1A6B3] leading-relaxed">{cfg.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Grade de Decisões */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DECISIONS.map((dec, idx) => {
            const Icon = dec.icon
            const catCfg = CATEGORY_CONFIG[dec.category]
            return (
              <div
                key={dec.id}
                className={`bg-[#151923] border border-[#232B3A] ${catCfg.cardBorderHover} rounded-2xl p-5 space-y-3 transition-all hover-lift flex flex-col justify-between`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl bg-[#0B0D12] border border-[#232B3A] flex items-center justify-center ${catCfg.iconColor} shrink-0`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#A1A6B3] bg-[#0B0D12] px-2.5 py-0.5 rounded-md border border-[#232B3A]">
                        {dec.month}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${catCfg.badgeClass}`}
                      >
                        {catCfg.label.split('&')[0].trim()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white leading-snug">
                      <span className="text-[#8B5CF6] mr-1.5">#{idx + 1}.</span>
                      {dec.title}
                    </h3>
                    <p className="text-xs text-[#A1A6B3] mt-2 leading-relaxed">{dec.context}</p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#22D3EE] flex items-center justify-between font-semibold border-t border-[#232B3A]/60">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Diretriz fixada e em vigor</span>
                  </div>
                  <span className="text-[10px] text-[#A1A6B3] uppercase">{dec.tag}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SEÇÃO 2: O QUE ESTÁ PENDENTE (CHECKLIST PERSISTIDO) */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232B3A] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#22D3EE] uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Seção 2 de 4
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              O Que Está Pendente
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0B0D12] text-[#34D399] border border-[#232B3A]">
                {completedCount} de {totalPending} concluídos
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Checklist interativo de ativação. Clique para marcar como feito (salvo automaticamente
              no seu navegador).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {completedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetPendingItems}
                className="text-xs rounded-full border-[#232B3A] bg-[#0B0D12] hover:bg-[#1B212D] text-[#A1A6B3] hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Desmarcar todos
              </Button>
            )}
          </div>
        </div>

        {/* Barra de Progresso do Checklist */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#A1A6B3] font-medium">Progresso de Lançamento</span>
            <span className="font-bold text-white font-tabular">{pendingPercentage}% completo</span>
          </div>
          <div className="w-full h-3 bg-[#0B0D12] rounded-full overflow-hidden p-0.5 border border-[#232B3A]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#34D399] transition-all duration-500 ease-out"
              style={{ width: `${pendingPercentage}%` }}
            />
          </div>
        </div>

        {/* Lista de Itens do Checklist */}
        <div className="space-y-3 pt-2">
          {INITIAL_PENDING_ITEMS.map((item, index) => {
            const isDone = !!completedMap[item.id]
            const catCfg = CATEGORY_CONFIG[item.category]
            const completionDate = itemCompletionDateMap[item.id]

            // Contagem de micro tarefas feitas se o item for difícil
            const totalMicro = item.microTasks?.length || 0
            const doneMicro = item.microTasks?.filter((mt) => microTasksMap[mt.id]).length || 0

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.isDifficult) {
                    setSelectedDifficultItem(item)
                  } else {
                    togglePendingItem(item)
                  }
                }}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start gap-4 ${
                  isDone
                    ? 'bg-[#10B981]/10 border-[#10B981]/40 opacity-95'
                    : `bg-[#0B0D12] border-[#232B3A] ${catCfg.cardBorderHover} hover:bg-[#0e121b]`
                }`}
              >
                {/* Botão de Checkbox Direto */}
                <div
                  className="pt-0.5 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePendingItem(item)
                  }}
                >
                  {isDone ? (
                    <div className="w-6 h-6 rounded-lg bg-[#10B981] text-[#0B0D12] flex items-center justify-center shadow-md shadow-[#10B981]/30">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg border-2 border-[#A1A6B3]/40 flex items-center justify-center hover:border-[#22D3EE]">
                      <Circle className="w-3.5 h-3.5 text-transparent" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Pílula com a cor semântica da categoria */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${catCfg.badgeClass}`}
                    >
                      {catCfg.label}
                    </span>
                    <span className="text-xs text-[#A1A6B3]">Passo {index + 1}</span>

                    {/* Badge de Atividade Difícil com Micro Tarefas */}
                    {item.isDifficult && (
                      <span className="text-[10px] font-bold uppercase bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ListChecks className="w-3 h-3 text-[#A78BFA]" />
                        {doneMicro}/{totalMicro} micro tarefas •{' '}
                        {item.totalEstimatedTime?.split('+')[0].trim()}
                      </span>
                    )}

                    {isDone && (
                      <span className="text-[10px] font-bold uppercase text-[#34D399] bg-[#34D399]/20 px-2 py-0.5 rounded-full border border-[#34D399]/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Concluído
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`text-sm sm:text-base font-bold transition-all ${
                        isDone ? 'line-through text-[#A1A6B3]' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.isDifficult && (
                      <span className="shrink-0 text-xs text-[#8B5CF6] hover:text-[#C4B5FD] font-semibold flex items-center gap-1 bg-[#8B5CF6]/10 px-2.5 py-1 rounded-full border border-[#8B5CF6]/30">
                        Ver micro tarefas →
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#A1A6B3] leading-relaxed">{item.description}</p>

                  {/* Exibição direta da data no item quando concluído */}
                  {isDone && completionDate && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#34D399] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Concluído em {completionDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* HISTÓRICO DE AUDITORIA / LINHA DO TEMPO */}
        <div className="pt-6 border-t border-[#232B3A] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Histórico de Ações do Checklist
              </h3>
              <span className="text-[11px] font-mono text-[#A1A6B3] bg-[#0B0D12] px-2 py-0.5 rounded-full border border-[#232B3A]">
                {history.length} {history.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-[#A1A6B3] hover:text-[#F87171] transition-colors self-start sm:self-auto"
              >
                Limpar histórico
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-6 text-center text-xs text-[#A1A6B3] space-y-1">
              <p>Nenhuma ação registrada ainda.</p>
              <p className="text-[11px] text-[#64748B]">
                Ao marcar ou desmarcar qualquer item pendente acima, a alteração e o horário serão
                gravados nesta linha do tempo.
              </p>
            </div>
          ) : (
            <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 max-h-64 overflow-y-auto space-y-2">
              {history.map((entry) => {
                const isCompleteAction = entry.action === 'completed'
                return (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-[#151923]/60 border border-[#232B3A]/60 text-xs"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleteAction
                            ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {isCompleteAction ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <RotateCcw className="w-3 h-3" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-white block truncate">
                          {entry.itemTitle}
                        </span>
                        <span
                          className={`text-[11px] font-medium ${
                            isCompleteAction ? 'text-[#34D399]' : 'text-amber-400'
                          }`}
                        >
                          {isCompleteAction ? 'Concluído em' : 'Reaberto em'} {entry.formattedDate}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#64748B] font-mono shrink-0">
                      {entry.timestamp.slice(11, 16)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* SEÇÃO: IDEIAS AGUARDANDO DECISÃO */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Hourglass className="w-4 h-4" />
              Incubadora Estratégica
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Ideias Aguardando Decisão
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#151923] text-amber-400 border border-amber-500/30">
                Podem ir, esperar ou não ir
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Espaço reservado para propostas mapeadas que exigem critérios, teto de verba ou tempo
              de maturidade antes de entrar em execução.
            </p>
          </div>
          <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            Status: Decidir depois
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Ideia (a): Programa social CAPS AD */}
          <div className="bg-[#151923] border border-amber-500/30 hover:border-amber-500/60 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all hover-lift">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40">
                  Decidir depois
                </span>
                <span className="text-[11px] font-mono text-[#A1A6B3] bg-[#0B0D12] px-2.5 py-0.5 rounded-md border border-[#232B3A]">
                  Comunidade & Fundo Social
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                Programa social de apoio a motoqueiros com álcool/drogas
              </h3>

              <div className="space-y-2.5 text-xs text-[#D1D5DB] leading-relaxed">
                <p>
                  A porta de entrada gratuita pelo SUS é o{' '}
                  <strong className="text-white">CAPS AD</strong> (porta aberta, sem encaminhamento,
                  equipe com psiquiatra; 8 unidades em Porto Alegre/RS).
                </p>
                <p>
                  O papel do fundo Terrenotech seria{' '}
                  <strong className="text-white">
                    facilitar o caminho e cobrir o que o SUS não cobre
                  </strong>{' '}
                  (psiquiatra de retaguarda, exames complementares, transporte para consultas e
                  internação voluntária).
                </p>
                <div className="p-2.5 rounded-xl bg-[#0B0D12] border border-[#232B3A] text-[11px] text-[#A1A6B3] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>
                    Apoio de crise imediato: <strong className="text-white">CVV 188</strong>{' '}
                    (gratuito 24h, ligação anônima).
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#232B3A] text-[11px] text-amber-300/90 font-medium bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
              ⚠️ <strong>Status "Decidir depois"</strong> — exige critérios objetivos, teto de verba
              do fundo e protocolo rigoroso de sigilo antes de qualquer anúncio público.
            </div>
          </div>

          {/* Ideia (b): Fotos 3D via IA */}
          <div className="bg-[#151923] border border-cyan-500/30 hover:border-cyan-500/60 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all hover-lift">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                  Decidir depois
                </span>
                <span className="text-[11px] font-mono text-[#A1A6B3] bg-[#0B0D12] px-2.5 py-0.5 rounded-md border border-[#232B3A]">
                  Produto & Tecnologia
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                Fotos 3D dos produtos via IA
              </h3>

              <div className="space-y-2.5 text-xs text-[#D1D5DB] leading-relaxed">
                <p>
                  Geração de modelos 3D interativos e renders hiper-realistas em 360° para cada
                  componente do catálogo utilizando inteligência artificial generativa.
                </p>
                <p className="text-[#A1A6B3]">
                  A proposta busca aumentar a conversão técnica na página do produto permitindo ao
                  piloto girar a peça (ex.: kit relação, retentor, pastilha, espelho retrovisor)
                  antes da compra.
                </p>
                <div className="p-2.5 rounded-xl bg-[#0B0D12] border border-[#232B3A] text-[11px] text-[#A1A6B3]">
                  💡 Prioridade operacional no momento é a fotografia real padrão fornecedor
                  (Laquila/MTO) com transparência absoluta de compatibilidade.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#232B3A] text-[11px] text-cyan-300/90 font-medium bg-cyan-500/5 p-3 rounded-xl border border-cyan-500/20">
              ⏱️ <strong>Status "Decidir depois"</strong> — ideia para depois do piloto. Primeiro
              validar tração e giro real de pedidos antes de investir em pipelines de IA 3D.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: CRONOGRAMA EM 4 FASES */}
      <section className="space-y-6">
        <div className="border-b border-[#232B3A] pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            Seção 3 de 4
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            Cronograma de Execução
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#151923] text-[#34D399] border border-[#232B3A]">
              Fase 0 até Fase 3 (12 meses)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3]">
            Timeline vertical com marcos práticos e o critério objetivo de avanço para cada fase.
          </p>
        </div>

        {/* Timeline Vertical */}
        <div className="relative border-l-2 border-[#232B3A] ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {ROADMAP_PHASES.map((phase) => (
            <div key={phase.phase} className="relative group">
              {/* Ponto / Nó da Timeline */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 bg-[#0B0D12] flex items-center justify-center transition-all group-hover:scale-125"
                style={{ borderColor: phase.color }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
              </div>

              {/* Card da Fase */}
              <div
                className={`bg-[#151923] border ${phase.borderColor} rounded-2xl p-6 space-y-4 shadow-xl transition-all hover-lift`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#232B3A] pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${phase.badgeBg} ${phase.textColor} ${phase.borderColor}`}
                    >
                      {phase.phase}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{phase.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#A1A6B3] bg-[#0B0D12] px-3 py-1 rounded-full border border-[#232B3A]">
                    <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>{phase.timeframe}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">{phase.summary}</p>

                {/* Marcos da Fase */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5 text-[#22D3EE]" />
                    Marcos Principais:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#A1A6B3]">
                    {phase.milestones.map((m, i) => (
                      <li
                        key={i}
                        className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-2.5 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] mt-1.5 shrink-0" />
                        <span className="text-[#E2E8F0]">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Como saber que passou */}
                <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#34D399]/15 text-[#34D399] shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block uppercase tracking-wide">
                      Como saber que passou (Critério Objetivo):
                    </span>
                    <p className="text-xs text-[#34D399] font-medium mt-0.5">{phase.criteria}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 4: ONDE REVISAR NO APP */}
      <section className="space-y-6">
        <div className="border-b border-[#232B3A] pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F472B6] uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            Seção 4 de 4
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            Onde Revisar no App
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#151923] text-[#F472B6] border border-[#232B3A]">
              Páginas de Análise & Estratégia
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A6B3]">
            Atalhos diretos para os estudos detalhados e dados já implementados no ecossistema
            Terrenotech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {APP_REVIEW_LINKS.map((link) => (
            <div
              key={link.path}
              className="bg-[#151923] border border-[#232B3A] hover:border-[#8B5CF6]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover-lift transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${link.badgeColor}`}
                  >
                    {link.badge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#A1A6B3] opacity-60" />
                </div>
                <h3 className="font-bold text-lg text-white leading-snug">{link.title}</h3>
                <p className="text-xs text-[#A1A6B3] leading-relaxed">{link.description}</p>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#0B0D12] hover:bg-[#8B5CF6] hover:text-white border border-[#232B3A] text-xs font-bold text-[#22D3EE] transition-all h-9"
                >
                  <Link to={link.path} className="flex items-center justify-center gap-1.5">
                    {link.actionLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOTA HONESTA NO RODAPÉ */}
      <section className="bg-gradient-to-r from-[#1B1429] via-[#151923] to-[#0E1524] border border-[#232B3A] rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white">Transparência Estrutural</h4>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Os custos de atacado são estimativas demo até o cadastro nas distribuidoras com CNPJ
                — os números reais substituem os estimados.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-black px-5 text-xs shadow-md shadow-[#8B5CF6]/30"
            >
              <Link to="/analises/plano">Ir ao Plano de Voo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MODAL DE MICRO TAREFAS COM PRAZO ESTIMADO (Para tarefas difíceis — TDAH friendly) */}
      <Dialog
        open={!!selectedDifficultItem}
        onOpenChange={(open) => {
          if (!open) setSelectedDifficultItem(null)
        }}
      >
        <DialogContent className="bg-[#151923] border border-[#232B3A] text-white max-w-xl max-h-[90vh] overflow-y-auto sm:rounded-2xl p-6">
          {selectedDifficultItem && (
            <div className="space-y-5">
              <DialogHeader className="text-left space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/20 text-[#C4B5FD] flex items-center gap-1">
                    <ListChecks className="w-3 h-3 text-[#A78BFA]" />
                    Atividade Difícil Decomposta
                  </span>
                  <span className="text-xs text-[#34D399] font-mono flex items-center gap-1 bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                    <Hourglass className="w-3 h-3 text-[#34D399]" />
                    Prazo Total Estimado: {selectedDifficultItem.totalEstimatedTime}
                  </span>
                </div>

                <DialogTitle className="text-xl font-bold text-white leading-snug">
                  {selectedDifficultItem.title}
                </DialogTitle>

                <DialogDescription className="text-xs text-[#A1A6B3] leading-relaxed">
                  {selectedDifficultItem.description}
                </DialogDescription>
              </DialogHeader>

              {/* Dica para o usuário com foco / sem sobrecarga */}
              <div className="bg-[#0B0D12] border border-[#8B5CF6]/30 rounded-xl p-3 text-xs text-[#C4B5FD] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                <span>
                  <strong>Passo a passo sem sobrecarga:</strong> Cada micro tarefa tem tempo
                  estimado. Faça uma de cada vez na ordem sugerida. O estado é salvo automaticamente
                  no seu navegador.
                </span>
              </div>

              {/* Lista de Micro Tarefas */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#A1A6B3] font-semibold border-b border-[#232B3A] pb-2">
                  <span>Micro Tarefas ({selectedDifficultItem.microTasks?.length || 0})</span>
                  <span>
                    {selectedDifficultItem.microTasks?.filter((mt) => microTasksMap[mt.id])
                      .length || 0}{' '}
                    concluídas
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedDifficultItem.microTasks?.map((mt, mtIdx) => {
                    const isMtDone = !!microTasksMap[mt.id]
                    return (
                      <div
                        key={mt.id}
                        onClick={() => toggleMicroTask(mt.id, selectedDifficultItem)}
                        className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-150 flex items-start gap-3 ${
                          isMtDone
                            ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#A1A6B3]'
                            : 'bg-[#0B0D12] border-[#232B3A] hover:border-[#8B5CF6]/50 text-white'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isMtDone ? (
                            <div className="w-5 h-5 rounded-md bg-[#10B981] text-[#0B0D12] flex items-center justify-center shadow-sm shadow-[#10B981]/40">
                              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-md border-2 border-[#A1A6B3]/40 flex items-center justify-center hover:border-[#22D3EE]">
                              <Circle className="w-3 h-3 text-transparent" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono text-[#8B5CF6] font-bold">
                              {mtIdx + 1}. Passo
                            </span>
                            <span className="text-[10px] font-medium text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30 px-2 py-0.5 rounded-full shrink-0">
                              ⏱️ {mt.estimatedTime}
                            </span>
                          </div>
                          <p
                            className={`text-xs font-medium leading-relaxed ${
                              isMtDone ? 'line-through text-[#64748B]' : 'text-slate-200'
                            }`}
                          >
                            {mt.title}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Botões do Rodapé do Modal */}
              <div className="flex items-center justify-between pt-3 border-t border-[#232B3A]">
                <button
                  type="button"
                  onClick={() => {
                    // Alterna o status do item pai
                    togglePendingItem(selectedDifficultItem)
                  }}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all border ${
                    completedMap[selectedDifficultItem.id]
                      ? 'bg-[#10B981]/20 text-[#34D399] border-[#10B981]/40'
                      : 'bg-[#0B0D12] text-[#A1A6B3] border-[#232B3A] hover:text-white'
                  }`}
                >
                  {completedMap[selectedDifficultItem.id]
                    ? '✓ Item pai marcado como feito'
                    : 'Marcar item pai como concluído'}
                </button>

                <Button
                  onClick={() => setSelectedDifficultItem(null)}
                  className="rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold px-4"
                >
                  Salvar e Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
