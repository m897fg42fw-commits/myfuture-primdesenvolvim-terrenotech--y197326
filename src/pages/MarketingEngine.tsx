import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Video,
  Play,
  Instagram,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Clock,
  RotateCcw,
  Bot,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Send,
  ArrowRight,
  Flame,
  Check,
  Smartphone,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'

interface StoryIdea {
  id: string
  title: string
  category: 'Superação' | 'Manutenção' | 'Resiliência' | 'Comunidade' | 'Rotina'
  badgeColor: string
  hook: string
  summary: string
  suggestedChannels: string[]
}

interface ScriptTemplate {
  id: string
  title: string
  targetDuration: string
  objective: string
  hook: string
  story: string
  turn: string
  cta: string
}

interface ChannelCadence {
  channel: string
  icon: React.ElementType
  iconColor: string
  badgeBg: string
  frequency: string
  format: string
  bestTime: string
  recommendation: string
}

interface ProductionStep {
  id: string
  label: string
  tip: string
}

interface ProductionHistoryEntry {
  id: string
  videoId: string
  videoTitle: string
  stepId: string
  stepLabel: string
  action: 'completed' | 'reopened'
  formattedDate: string
  timestamp: string
}

// 12+ ideias ricas e autênticas com ganchos de abertura sugeridos
const STORY_IDEAS: StoryIdea[] = [
  {
    id: '100k-km-cg',
    title: 'O Motoboy que bateu 100 mil km na mesma CG 160',
    category: 'Manutenção',
    badgeColor: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40',
    hook: '"100 mil km na mesma CG sem abrir motor. Sabe o que ele fez diferente de você?"',
    summary:
      'História de um entregador de Curitiba que nunca deixou passar o óleo dos 2.000 km e trocou kit relação aos 25 mil km sempre com marcas confiáveis.',
    suggestedChannels: ['Reels', 'TikTok', 'Shorts'],
  },
  {
    id: 'motoqueira-queda',
    title: 'A motoqueira que caiu na chuva e voltou para a pista',
    category: 'Superação',
    badgeColor: 'text-pink-300 bg-pink-500/15 border-pink-500/40',
    hook: '"Ela ralou o braço, quebrou a manete e quase desistiu de pilotar. Até o grupo aparecer na porta dela."',
    summary:
      'Apoio mútuo entre motoqueiras: vaquinha de peças básicas (pedana, manete, espelho) e acolhimento para vencer o medo de voltar a acelerar.',
    suggestedChannels: ['Reels', 'TikTok', 'WhatsApp'],
  },
  {
    id: 'kit-relacao-sozinho',
    title: 'O entregador que trocou o kit relação sozinho na calçada',
    category: 'Manutenção',
    badgeColor: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40',
    hook: '"A oficina cobrou 180 reais de mão de obra. Ele pegou uma chave 10, um alicate e fez na calçada."',
    summary:
      'Autonomia do piloto de rua: como entender o desgaste dos dentes da coroa e do pinhão economiza mais de R$ 600 por ano de trabalho.',
    suggestedChannels: ['Shorts', 'TikTok'],
  },
  {
    id: 'chuva-inverno-porto-alegre',
    title: '7 horas debaixo de temporal no inverno: o kit de sobrevivência',
    category: 'Resiliência',
    badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-500/40',
    hook: '"Você já pilotou com a luva encharcada a 8 graus na serra? Tem 3 coisas que salvam."',
    summary:
      'A realidade de quem trabalha no frio intenso do sul: luva impermeável, proteção de mãos e como não deixar a corrente enferrujar com a água suja.',
    suggestedChannels: ['Reels', 'WhatsApp', 'Shorts'],
  },
  {
    id: 'resgate-estrada',
    title: 'O pneu furado às 2h da manhã na BR e o piloto desconhecido',
    category: 'Comunidade',
    badgeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40',
    hook: '"Nunca deixe um irmão pra trás na rodovia. O que esse cara fez às 2h da madrugada me arrepiou."',
    summary:
      'A irmandade do motociclismo que as redes esquecem: o motoqueiro que parou, emprestou a bomba e o remendo e não cobrou um centavo.',
    suggestedChannels: ['Reels', 'TikTok'],
  },
  {
    id: 'entrega-salva-remedio',
    title: 'A corrida contra o tempo para entregar remédio de emergência',
    category: 'Rotina',
    badgeColor: 'text-purple-300 bg-purple-500/15 border-purple-500/40',
    hook: '"Muita gente acha que motoboy só entrega pizza. Mas às 23h, a vida de uma criança dependia da minha moto."',
    summary:
      'Valorização humana do motofretista: responsabilidade com a pontualidade e a necessidade da moto estar com manutenção 100% em dia.',
    suggestedChannels: ['Reels', 'Shorts', 'WhatsApp'],
  },
  {
    id: 'pastilha-metal-no-disco',
    title: 'O erro que custou o disco de freio inteiro na Factor 150',
    category: 'Manutenção',
    badgeColor: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40',
    hook: '"Ouviu esse barulho de ferro raspando na roda? Se você rodar mais 2 dias, vai pagar 3 vezes mais caro."',
    summary:
      'Alerta visual e auditivo de pastilha de freio gasta: ensinar o motoqueiro a olhar o sulco da pastilha antes de comer o disco.',
    suggestedChannels: ['Shorts', 'TikTok'],
  },
  {
    id: 'moto-dos-sonhos-fundo-garagem',
    title: 'A moto parada há 3 anos que renasceu no fundo da garagem',
    category: 'Superação',
    badgeColor: 'text-pink-300 bg-pink-500/15 border-pink-500/40',
    hook: '"Disseram que era sucata e que não valia a pena arrumar. Veja o que aconteceu quando limpamos o carburador."',
    summary:
      'Restauração caseira com peças paralelas nacionais de confiança: resgatando a história familiar da moto do pai.',
    suggestedChannels: ['Reels', 'TikTok'],
  },
  {
    id: 'arrego-da-pista',
    title: 'A primeira mulher presidente de bonde de entregadoras na cidade',
    category: 'Comunidade',
    badgeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40',
    hook: '"Riram quando ela comprou a Fan 160. Hoje ela coordena 40 entregadoras e ninguém segura."',
    summary:
      'O Arrego das Motoqueiras na prática: espaço feminino de respeito e troca de indicações no Clube Moto-T.',
    suggestedChannels: ['Reels', 'WhatsApp', 'Shorts'],
  },
  {
    id: 'farol-apagado-noite',
    title: 'Quase invisível: o perigo da lâmpada queimada na traseira',
    category: 'Resiliência',
    badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-500/40',
    hook: '"Olha pro freio da sua moto agora. 4 de cada 10 motos na avenida estão com a luz queimada sem saber."',
    summary:
      'Conscientização rápida e barata: como uma lâmpada paralela de R$ 12 salva a vida do piloto de um engavetamento traseiro.',
    suggestedChannels: ['Shorts', 'TikTok', 'WhatsApp'],
  },
  {
    id: 'clube-indicacao-recompensa',
    title: 'Como o Paulinho pagou o pneu traseiro só indicando peças pros amigos',
    category: 'Comunidade',
    badgeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40',
    hook: '"Ele não gastou 1 real do bolso no pneu novo. E não fez mágica nenhuma: só indicou peça boa pros parceiros."',
    summary:
      'Apresentação natural do Clube Moto-T: 50% da margem revertida em produto para quem fortalece a comunidade.',
    suggestedChannels: ['WhatsApp', 'Reels', 'TikTok'],
  },
  {
    id: 'morro-fortaleza-subida',
    title: 'Subindo o cume do Morro Fortaleza com a CG 160 na terra batida',
    category: 'Rotina',
    badgeColor: 'text-purple-300 bg-purple-500/15 border-purple-500/40',
    hook: '"Subir o cânion mais alto do RS numa moto 160cc de cidade? O que essa guerreira aguenta é surreal."',
    summary:
      'Conexão com a identidade Terrenotech: resistência de motos populares e a paixão brasileira pelas duas rodas no interior do país.',
    suggestedChannels: ['Reels', 'Shorts'],
  },
]

// Cadência recomendada por canal
const CHANNEL_CADENCES: ChannelCadence[] = [
  {
    channel: 'Instagram Reels',
    icon: Instagram,
    iconColor: 'text-pink-400',
    badgeBg: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
    frequency: '3x a 4x por semana',
    format: 'Vertical (9:16), 30 a 50s, legenda chamativa com gancho nos 3 primeiros segundos',
    bestTime: '11h30–13h (almoço de entregadores) e 19h–21h',
    recommendation:
      'Use áudios em alta com som de moto ou trilhas épicas com volume baixo sob a voz.',
  },
  {
    channel: 'TikTok',
    icon: Video,
    iconColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    frequency: '1x por dia (ou 5x/semana)',
    format: 'Ultra-dinâmico, 20 a 45s, corte a cada 2-3s, texto na tela com fonte bold',
    bestTime: '12h, 18h e 22h',
    recommendation:
      'A autenticidade vence: mostre a graxa na mão, o barulho do motor e a calçada real.',
  },
  {
    channel: 'YouTube Shorts',
    icon: Play,
    iconColor: 'text-red-400',
    badgeBg: 'bg-red-500/15 border-red-500/40 text-red-300',
    frequency: '2x a 3x por semana (reaproveitando Reels/TikTok)',
    format: 'Vertical (9:16), 40 a 60s, título com pergunta provocativa',
    bestTime: '17h às 20h',
    recommendation:
      'Excelente para alcance perene de busca (ex.: "como saber se a relação da CG 160 acabou").',
  },
  {
    channel: 'WhatsApp (Status + Grupos)',
    icon: MessageCircle,
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    frequency: 'Diário no Status + 2x/semana em grupos parceiros',
    format: 'Trecho de 15s sem enrolação + link no texto de apoio',
    bestTime: '08h (antes da rota) e 14h',
    recommendation:
      'O canal com maior taxa de conversão direta. Peça pros embaixadores do Clube compartilharem.',
  },
]

// Templates de roteiro 30–60s
const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'template-perrengue-solucao',
    title: 'Template 1: Do Perrengue à Solução (Desgaste de Peça)',
    targetDuration: '40 a 55 segundos',
    objective: 'Ensinar manutenção preventiva valorizando a inteligência do piloto de rua.',
    hook: '[0-3s] "Se você ouve esse estalo quando engata a primeira marcha, para a moto agora."',
    story:
      '[3-20s] "Semana passada um motoboy parceiro quase perdeu a tampa do cárter porque a corrente soltou na 23 de Maio. Ele achou que era só esticar de novo, mas a coroa já tava parecendo dente de tubarão."',
    turn: '[20-40s] "Kit relação não é frescura: é segurança de vida e economia. Se trocar a tempo por uma paralela boa como Vaz ou Cobreq, você roda mais 20 mil km suave sem surpresa."',
    cta: '[40-55s] "Precisa conferir as peças certas pra sua CG ou Factor sem pagar caro? Entra no link da Terrenotech ou fala com a gente no Clube Moto-T."',
  },
  {
    id: 'template-historia-emocionante',
    title: 'Template 2: História Humana & Solidariedade na Estrada',
    targetDuration: '45 a 60 segundos',
    objective: 'Gerar identificação profunda com a irmandade das duas rodas.',
    hook: '[0-3s] "Quem nunca passou perrengue debaixo de chuva às 22h não sabe o que é irmandade."',
    story:
      '[3-25s] "O Marcos tava com o pneu murchando e três entregas atrasadas. Quando parou no posto pra tentar encher, outro entregador que ele nunca tinha visto na vida parou a moto do lado, pegou a ferramenta e ajudou a achar o prego."',
    turn: '[25-45s] "É essa força que move quem tá na pista todo dia. Por isso a gente criou o Clube Moto-T: pra fortalecer quem roda de verdade, com desconto em peças essenciais e recompensa pra quem ajuda o outro."',
    cta: '[45-60s] "Conhece alguém com uma história dessas? Marca ele aqui nos comentários ou vem pro Clube da Terrenotech."',
  },
  {
    id: 'template-economia-inteligente',
    title: 'Template 3: Economia Inteligente (Marca Original vs. Paralela TOP)',
    targetDuration: '30 a 45 segundos',
    objective: 'Desmistificar o mito de que só peça de concessionária serve.',
    hook: '[0-3s] "Pagar 300 reais na concessionária ou 110 numa paralela de primeira linha? Faz a conta."',
    story:
      '[3-20s] "Tem gente que acha que só peça da caixinha vermelha presta. Só que marcas como Magnetron, Pro Tork e Cobreq são fornecedoras de montadora no Brasil há mais de 30 anos."',
    turn: '[20-35s] "A gente trabalha só com quem tem garantia nacional comprovada. Mesma durabilidade, metade do preço pro seu bolso."',
    cta: '[35-45s] "Catálogo completo de motos até 450cc no site da Terrenotech. Peça chega na sua casa, direto da distribuidora."',
  },
]

// Checklist de produção por vídeo
const PRODUCTION_STEPS: ProductionStep[] = [
  {
    id: 'roteiro',
    label: '1. Roteiro pronto',
    tip: 'Gancho, história, virada e CTA bem definidos',
  },
  {
    id: 'gravado',
    label: '2. Vídeo gravado',
    tip: 'Áudio limpo, boa luz e enquadramento vertical',
  },
  {
    id: 'legendado',
    label: '3. Vídeo legendado',
    tip: '80% assistem sem som; coloque legendas grandes',
  },
  {
    id: 'postado',
    label: '4. Postado nos canais',
    tip: 'Postagem manual no Instagram, TikTok e WhatsApp',
  },
  {
    id: 'respondido',
    label: '5. Comentários respondidos',
    tip: 'Responda aos primeiros 10 comentários em até 30 min',
  },
]

const STORAGE_CALENDAR_KEY = 'terrenotech_content_calendar'
const STORAGE_PROD_HISTORY_KEY = 'terrenotech_content_prod_history'
const STORAGE_PROD_STEPS_KEY = 'terrenotech_content_prod_steps'

function formatDateTimeBR(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} às ${hours}:${minutes}`
}

export default function MarketingEngine() {
  const { toast } = useToast()

  // Calendário editorial simples de 4 semanas (persistido)
  // Guarda um mapa: "S1-D2-Reels": true
  const [calendarMap, setCalendarMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CALENDAR_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      /* intentionally ignored */
    }
    // Seed inicial: alguns itens marcados para parecer vivo
    return {
      'S1-D2-Reels': true,
      'S1-D4-TikTok': true,
      'S2-D1-WhatsApp': true,
    }
  })

  // Checklist de passos de produção por vídeo (persistido)
  const [productionStepsMap, setProductionStepsMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PROD_STEPS_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      /* intentionally ignored */
    }
    return {
      roteiro: true,
      gravado: true,
    }
  })

  // Histórico de produção (persistido)
  const [prodHistory, setProdHistory] = useState<ProductionHistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PROD_HISTORY_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      /* intentionally ignored */
    }
    return [
      {
        id: 'init-1',
        videoId: 'video-1',
        videoTitle: 'Vídeo da Semana (CG 100k km)',
        stepId: 'roteiro',
        stepLabel: '1. Roteiro pronto',
        action: 'completed',
        formattedDate: 'Ontem às 16:40',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
    ]
  })

  // Estado dos templates expansíveis
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(
    'template-perrengue-solucao',
  )
  const [selectedStoryCategory, setSelectedStoryCategory] = useState<string>('Todos')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Salvar calendário no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CALENDAR_KEY, JSON.stringify(calendarMap))
    } catch {
      /* intentionally ignored */
    }
  }, [calendarMap])

  // Salvar passos de produção
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROD_STEPS_KEY, JSON.stringify(productionStepsMap))
    } catch {
      /* intentionally ignored */
    }
  }, [productionStepsMap])

  // Salvar histórico de produção
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROD_HISTORY_KEY, JSON.stringify(prodHistory))
    } catch {
      /* intentionally ignored */
    }
  }, [prodHistory])

  const toggleCalendarItem = (key: string) => {
    setCalendarMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleProductionStep = (step: ProductionStep) => {
    const nextStatus = !productionStepsMap[step.id]
    const now = new Date()
    const formatted = formatDateTimeBR(now)

    setProductionStepsMap((prev) => ({
      ...prev,
      [step.id]: nextStatus,
    }))

    const entry: ProductionHistoryEntry = {
      id: `${step.id}-${Date.now()}`,
      videoId: 'video-atual',
      videoTitle: 'Vídeo em Produção',
      stepId: step.id,
      stepLabel: step.label,
      action: nextStatus ? 'completed' : 'reopened',
      formattedDate: formatted,
      timestamp: now.toISOString(),
    }

    setProdHistory((prev) => [entry, ...prev.slice(0, 49)])
  }

  const resetProductionSteps = () => {
    const now = new Date()
    const formatted = formatDateTimeBR(now)
    setProductionStepsMap({})
    const resetEntry: ProductionHistoryEntry = {
      id: `reset-${Date.now()}`,
      videoId: 'video-atual',
      videoTitle: 'Checklist reiniciado',
      stepId: 'todos',
      stepLabel: 'Todos os passos desmarcados',
      action: 'reopened',
      formattedDate: formatted,
      timestamp: now.toISOString(),
    }
    setProdHistory((prev) => [resetEntry, ...prev].slice(0, 50))
    toast({
      title: 'Checklist reiniciado',
      description: 'Pronto para começar a produção do próximo vídeo.',
    })
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast({
      title: 'Copiado para a área de transferência',
      description: 'Gancho copiado! Cole no seu aplicativo de notas ou no roteiro.',
    })
    setTimeout(() => setCopiedId(null), 2500)
  }

  const filteredIdeas =
    selectedStoryCategory === 'Todos'
      ? STORY_IDEAS
      : STORY_IDEAS.filter((i) => i.category === selectedStoryCategory)

  const calendarDays = [
    { label: 'Seg', id: 'D1' },
    { label: 'Ter', id: 'D2' },
    { label: 'Qua', id: 'D3' },
    { label: 'Qui', id: 'D4' },
    { label: 'Sex', id: 'D5' },
    { label: 'Sáb', id: 'D6' },
  ]

  const calendarChannels = ['Reels', 'TikTok', 'Shorts', 'WhatsApp']

  const completedProdStepsCount = Object.values(productionStepsMap).filter(Boolean).length
  const totalCalendarDone = Object.values(calendarMap).filter(Boolean).length

  return (
    <div className="space-y-12 animate-fade-up">
      {/* HERO / APRESENTAÇÃO */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 p-6 sm:p-10 bg-gradient-to-br from-[#18141F] via-[#121622] to-[#0B0D12] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Video className="w-4 h-4 text-amber-400" />
                Motor de Conteúdo • Vídeos Motoqueiro
              </div>
              <span className="text-[11px] text-[#A1A6B3] bg-[#0B0D12]/80 px-2.5 py-1 rounded-full border border-[#232B3A]">
                Instagram, TikTok, YouTube Shorts & WhatsApp
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Motor de Conteúdo: <br />
              <span className="bg-gradient-to-r from-amber-400 via-[#F472B6] to-[#22D3EE] bg-clip-text text-transparent">
                Histórias Reais de Quem Roda
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-3xl">
              Organização, banco de ideias, templates de roteiro de 30–60s e calendário editorial
              para produção <strong className="text-white">100% manual e autêntica</strong> de
              vídeos curtos. Conecte a Terrenotech com os motociclistas de todo o país através de
              quem vive a estrada todo dia.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#A1A6B3]">
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-white font-medium">12+ Ideias de Histórias</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                <span className="text-white font-medium">4 Canais Estratégicos</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span className="text-white font-medium">Calendário de 4 Semanas</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0B0D12]/90 px-3.5 py-2 rounded-full border border-[#232B3A]">
                <Bot className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="text-[#C4B5FD] font-medium">Agente Roteirista Criado</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full bg-[#121622] border border-[#232B3A] rounded-2xl p-5 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-[#8B5CF6]/30 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/10">
                <Flame className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Postagem 100% Humana</h3>
                <p className="text-xs text-[#A1A6B3]">
                  Sem bots de postagem • Conexão real com motociclistas
                </p>
              </div>
              <div className="pt-2 border-t border-[#232B3A] text-left text-xs space-y-1.5 text-[#A1A6B3]">
                <div className="flex justify-between">
                  <span>Duração ideal:</span>
                  <strong className="text-white">30 a 60 segundos</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fórmula:</span>
                  <strong className="text-cyan-400">Gancho → Pista → CTA</strong>
                </div>
                <div className="flex justify-between">
                  <span>Meta:</span>
                  <strong className="text-emerald-400">Atrair pro Clube</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO A: POR QUE POSTAR MANUAL (HONESTIDADE RADICAL) */}
      <section className="bg-gradient-to-r from-[#171A24] via-[#121622] to-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Por que postar manualmente? Transparência & Segurança
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Sem ilusão de robô
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
              Instagram, TikTok e YouTube{' '}
              <strong className="text-white">não permitem e penalizam</strong> postagens automáticas
              feitas por bots não-oficiais ou scripts externos (queda severa de alcance, shadowban
              ou bloqueio da conta). Mais do que isso: o público motoqueiro detecta de longe
              publicidade fria de IA.
            </p>
            <p className="text-xs text-[#A1A6B3] leading-relaxed">
              O app{' '}
              <strong className="text-cyan-400">
                Terrenotech organiza toda a linha de produção
              </strong>{' '}
              (gancho, roteiro, ideias, checklist e calendário), mas quem grava com o celular e
              aperta o botão de postar é <strong className="text-white">você</strong>. Essa presença
              humana autêntica gera até 7x mais engajamento e constrói confiança real.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCO B: PLANO DE CONTEÚDO POR CANAL */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              Estratégia Multicanal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Cadência Sugerida por Canal
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Onde e quando postar para maximizar o alcance sem sobrecarregar sua rotina.
            </p>
          </div>
          <span className="text-xs text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
            ✓ 1 ideia rende 4 formatos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHANNEL_CADENCES.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.channel}
                className="bg-[#151923] border border-[#232B3A] hover:border-amber-500/50 rounded-2xl p-5 space-y-3 transition-all hover-lift flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0B0D12] border border-[#232B3A] flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${c.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-base text-white">{c.channel}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${c.badgeBg}`}
                    >
                      {c.frequency}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-[#A1A6B3] font-semibold">Formato: </span>
                      <span className="text-[#E2E8F0]">{c.format}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A6B3] font-semibold">Melhor horário: </span>
                      <span className="text-amber-300 font-medium">{c.bestTime}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A6B3] leading-relaxed bg-[#0B0D12] p-3 rounded-xl border border-[#232B3A]">
                    <strong className="text-cyan-400">Dica de ouro:</strong> {c.recommendation}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* BLOCO C: BANCO DE IDEAS DE HISTÓRIAS DE MOTOQUEIROS (12+ IDEIAS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              12+ Ideias Prontas
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Banco de Ideias & Ganchos de Abertura
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Narrativas da vida real de quem roda na pista. Clique no botão para copiar o gancho
              sugerido.
            </p>
          </div>

          {/* Filtros por Categoria */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {['Todos', 'Manutenção', 'Superação', 'Resiliência', 'Comunidade', 'Rotina'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedStoryCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full transition-all border ${
                    selectedStoryCategory === cat
                      ? 'bg-amber-500 text-[#0B0D12] font-black border-amber-400'
                      : 'bg-[#151923] text-[#A1A6B3] hover:text-white border-[#232B3A]'
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => {
            const isCopied = copiedId === idea.id
            return (
              <div
                key={idea.id}
                className="bg-[#151923] border border-[#232B3A] hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-3 transition-all hover-lift"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${idea.badgeColor}`}
                    >
                      {idea.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#A1A6B3]">
                      {idea.suggestedChannels.map((ch) => (
                        <span
                          key={ch}
                          className="bg-[#0B0D12] px-1.5 py-0.5 rounded border border-[#232B3A]"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white leading-snug">{idea.title}</h3>

                  <div className="bg-[#0B0D12] border border-[#232B3A] rounded-xl p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-amber-400">
                        Gancho sugerido:
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(idea.hook, idea.id)}
                        className="text-[10px] text-[#A1A6B3] hover:text-white flex items-center gap-1 transition-colors"
                        title="Copiar gancho"
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-[#34D399]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-amber-200/90 font-medium italic leading-relaxed">
                      {idea.hook}
                    </p>
                  </div>

                  <p className="text-xs text-[#A1A6B3] leading-relaxed">{idea.summary}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* BLOCO D: TEMPLATE DE ROTEIRO 30–60s EXPANSÍVEL */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
              <Video className="w-4 h-4" />
              Estrutura de 4 Passos
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Templates de Roteiro (30–60s)
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Estrutura validada:{' '}
              <strong className="text-white">
                Gancho (0-3s) → História (3-20s) → Virada (20-40s) → Chamada (40-60s)
              </strong>
              .
            </p>
          </div>

          {/* BOTÃO ASSISTENTE IA */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block">
                    <Button
                      disabled
                      className="rounded-full bg-gradient-to-r from-[#8B5CF6]/50 to-amber-500/50 text-[#F4F5F7] text-xs font-bold px-4 py-2 opacity-75 cursor-not-allowed border border-[#8B5CF6]/40 flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4 text-amber-300" />
                      <span>Gerar roteiro com IA</span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-[#0B0D12] text-xs text-[#E2E8F0] border border-[#232B3A] p-3 rounded-xl shadow-xl"
                >
                  <p className="font-semibold text-amber-300 mb-1">Assistente IA Especialista</p>
                  <p>
                    O agente nativo <strong>Roteirista Terrenotech</strong> está provisionado. A
                    interface interativa de streaming de chat será habilitada na próxima
                    atualização.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Cards Expansíveis de Roteiro */}
        <div className="space-y-3">
          {SCRIPT_TEMPLATES.map((tpl) => {
            const isExpanded = expandedTemplateId === tpl.id
            return (
              <div
                key={tpl.id}
                className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedTemplateId(isExpanded ? null : tpl.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#121622] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                        {tpl.targetDuration}
                      </span>
                      <h3 className="font-bold text-base text-white">{tpl.title}</h3>
                    </div>
                    <p className="text-xs text-[#A1A6B3]">{tpl.objective}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#151923] text-[#A1A6B3]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 border-t border-[#232B3A] bg-[#121622]/50 space-y-4 text-xs animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Bloco 1: Gancho */}
                      <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-amber-500/30 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-amber-400 block">
                          Passo 1: Gancho de Abertura (0 a 3s)
                        </span>
                        <p className="text-[#E2E8F0] font-medium leading-relaxed">{tpl.hook}</p>
                      </div>

                      {/* Bloco 2: História */}
                      <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-cyan-400 block">
                          Passo 2: Desenvolvimento da História (3 a 20s)
                        </span>
                        <p className="text-[#E2E8F0] leading-relaxed">{tpl.story}</p>
                      </div>

                      {/* Bloco 3: Virada */}
                      <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-purple-500/30 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-purple-400 block">
                          Passo 3: Virada & Aprendizado (20 a 40s)
                        </span>
                        <p className="text-[#E2E8F0] leading-relaxed">{tpl.turn}</p>
                      </div>

                      {/* Bloco 4: CTA */}
                      <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-emerald-500/30 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                          Passo 4: Chamada para Ação / CTA (40 a 60s)
                        </span>
                        <p className="text-[#E2E8F0] font-medium leading-relaxed">{tpl.cta}</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const fullScript = `${tpl.title}\n\n1. GANCHO:\n${tpl.hook}\n\n2. HISTÓRIA:\n${tpl.story}\n\n3. VIRADA:\n${tpl.turn}\n\n4. CTA:\n${tpl.cta}`
                          copyToClipboard(fullScript, `full-${tpl.id}`)
                        }}
                        className="text-xs rounded-full border-[#232B3A] bg-[#0B0D12] hover:bg-amber-500 hover:text-[#0B0D12] text-amber-300 font-bold"
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copiar Roteiro Completo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* BLOCO E: CALENDÁRIO EDITORIAL SIMPLES (4 SEMANAS, PERSISTIDO) */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#34D399] uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              Grade de 4 Semanas
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Calendário Editorial de Postagens
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0B0D12] text-[#34D399] border border-[#232B3A]">
                {totalCalendarDone} postagens realizadas
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Marque os dias em que o conteúdo foi publicado. O progresso fica gravado no seu
              navegador.
            </p>
          </div>
        </div>

        {/* Grade de 4 semanas */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((week) => (
            <div
              key={week}
              className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Semana {week}
                </span>
                <span className="text-[11px] text-[#A1A6B3]">Meta: 3 a 5 posts</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {calendarDays.map((day) => {
                  return (
                    <div
                      key={day.id}
                      className="bg-[#151923] border border-[#232B3A] rounded-xl p-3 space-y-2"
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between border-b border-[#232B3A]/60 pb-1">
                        <span>{day.label}</span>
                        <span className="text-[10px] text-[#64748B] font-mono">Sem {week}</span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {calendarChannels.map((channel) => {
                          const itemKey = `S${week}-${day.id}-${channel}`
                          const isDone = !!calendarMap[itemKey]
                          return (
                            <button
                              key={channel}
                              type="button"
                              onClick={() => toggleCalendarItem(itemKey)}
                              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-between ${
                                isDone
                                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                                  : 'bg-[#0B0D12] text-[#A1A6B3] hover:text-white border border-[#232B3A]/60 hover:border-amber-500/40'
                              }`}
                            >
                              <span>{channel}</span>
                              {isDone ? (
                                <CheckCircle2 className="w-3 h-3 text-[#34D399] shrink-0" />
                              ) : (
                                <Circle className="w-2.5 h-2.5 text-[#64748B] shrink-0" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCO F: CHECKLIST DE PRODUÇÃO POR VÍDEO + HISTÓRICO */}
      <section className="bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Linha de Montagem
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Checklist de Produção por Vídeo
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0B0D12] text-amber-400 border border-[#232B3A]">
                {completedProdStepsCount} de {PRODUCTION_STEPS.length} etapas feitas
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A6B3]">
              Para cada novo vídeo, complete estas 5 etapas antes de passar para o próximo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetProductionSteps}
              className="text-xs rounded-full border-[#232B3A] bg-[#0B0D12] hover:bg-[#1B212D] text-[#A1A6B3] hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Novo Vídeo (Reiniciar)
            </Button>
          </div>
        </div>

        {/* 5 Etapas de Produção */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRODUCTION_STEPS.map((step) => {
            const isDone = !!productionStepsMap[step.id]
            return (
              <div
                key={step.id}
                onClick={() => toggleProductionStep(step)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isDone
                    ? 'bg-[#10B981]/15 border-[#10B981]/40 text-white'
                    : 'bg-[#0B0D12] border-[#232B3A] hover:border-amber-500/50 hover:bg-[#121622]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#A1A6B3]">Etapa</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#64748B]" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm leading-snug">{step.label}</h4>
                  <p className="text-[11px] text-[#A1A6B3] leading-relaxed">{step.tip}</p>
                </div>

                <div className="pt-2 text-[10px] font-bold uppercase tracking-wider">
                  {isDone ? (
                    <span className="text-[#34D399]">✓ Concluído</span>
                  ) : (
                    <span className="text-[#64748B]">Clique para concluir</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Histórico do Checklist de Produção */}
        <div className="pt-4 border-t border-[#232B3A] space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Histórico Recente de Produção
            </h3>
          </div>

          <div className="bg-[#0B0D12] border border-[#232B3A] rounded-2xl p-4 max-h-48 overflow-y-auto space-y-2">
            {prodHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#151923] border border-[#232B3A]/60"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.action === 'completed' ? 'bg-[#34D399]' : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-semibold text-white">{item.stepLabel}</span>
                  <span className="text-[#A1A6B3]">
                    {item.action === 'completed' ? 'marcado como feito' : 'reaberto'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">{item.formattedDate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RODAPÉ E ATALHO DE VOLTA AO ROTEIRO */}
      <section className="bg-gradient-to-r from-amber-500/10 via-[#151923] to-[#8B5CF6]/15 border border-[#232B3A] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">Alinhado com o Roteiro do Fundador</h4>
          <p className="text-xs text-[#A1A6B3]">
            O Motor de Conteúdo apoia a Fase 0 (Piloto de Validação) e a Fase 1 (Entrada Orgânica
            nos grupos).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#232B3A] bg-[#0B0D12] hover:bg-[#1B212D] text-xs font-bold text-white"
          >
            <Link to="/roteiro">Voltar ao Roteiro</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-amber-500 to-[#8B5CF6] text-[#0B0D12] font-black text-xs px-5 shadow-md shadow-amber-500/20"
          >
            <Link to="/clube">Conhecer o Clube</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
