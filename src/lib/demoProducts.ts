export interface ProductVariation {
  name: string
  options: string[]
}

export type ProductCategory =
  | 'Peças'
  | 'Equipamento do Motoqueiro'
  | 'Combos'
  | 'Proteção'
  | 'Conforto'
  | 'Tecnologia'
  | 'Carga/Entrega'

export type DisplacementLayer = 'nucleo-250cc' | 'camada-250-450cc' | 'universal'

export interface CompatibleModelOption {
  id: string
  name: string
  layer: 'nucleo-250cc' | 'camada-250-450cc'
}

export const POPULAR_COMPATIBLE_MODELS: CompatibleModelOption[] = [
  // Núcleo até 250cc (80% do mercado, giro e volume)
  { id: 'cg-160', name: 'CG 160 (Titan / Fan / Start / Cargo)', layer: 'nucleo-250cc' },
  { id: 'factor-150', name: 'Yamaha Factor 150 / Fazer 150', layer: 'nucleo-250cc' },
  { id: 'biz-125', name: 'Honda Biz 125 / Biz 110i', layer: 'nucleo-250cc' },
  { id: 'bros-160', name: 'Honda NXR 160 Bros', layer: 'nucleo-250cc' },
  { id: 'pop-110i', name: 'Honda Pop 110i / 100', layer: 'nucleo-250cc' },
  // Camada 250–450cc (Ticket maior, menor concorrência, segmento em alta)
  { id: 'cb-300-twister', name: 'CB 300F / Twister 250', layer: 'camada-250-450cc' },
  { id: 'xre-300-xr-tornado', name: 'XRE 300 / XR 300 Tornado / Rally', layer: 'camada-250-450cc' },
  { id: 'lander-250', name: 'Yamaha Lander 250 / Fazer 250 FZ25', layer: 'camada-250-450cc' },
  { id: 'dominar-400', name: 'Bajaj Dominar 400', layer: 'camada-250-450cc' },
  { id: 'ninja-400', name: 'Kawasaki Ninja 400 / Z400', layer: 'camada-250-450cc' },
  { id: 'himalayan-450', name: 'Royal Enfield Himalayan 450', layer: 'camada-250-450cc' },
  { id: 'cb-500', name: 'Honda CB 500F / CB 500X', layer: 'camada-250-450cc' },
]

export interface DemoProduct {
  id: string
  name: string
  brand: string // Marca garantida em todas as peças
  warranty: string // Garantia detalhada ex: "3 meses contra defeito de fabricação"
  origin?: string // Origem do produto ex: "Produto nacional — fornecedor distribuidora brasileira"
  compatibleModels?: string[] // Modelos e anos compatíveis claramente mapeados
  displacementLayer?: DisplacementLayer // Núcleo até 250cc vs Camada 250–450cc vs Universal
  description: string
  fullDescription: string
  category: ProductCategory
  price: number // Preço de venda ao consumidor final
  supplierCost: number // Preço de custo junto ao fornecedor dropshipping
  image: string // URL da foto real do produto
  speed: number // Unidades vendidas por dia (giro no nicho moto)
  tag: string
  highlight?: boolean
  features: string[]
  variations: ProductVariation[]
  isCrashPart?: boolean // Peça com alto índice de quebra em queda leve
  isSafetyCrash?: boolean // Linha "Segurança & Tombo" (equipamento de proteção pós-queda)
  isCombo?: boolean // Produto tipo Combo
  savingsPill?: string // Ex: "Economia de R$ 60"
  bestValueHighlight?: boolean // Destaque visual "Melhor valor"
  urgentItem?: boolean // Item de urgência (ex: troca imediata)
  quickReplacementKeyItem?: boolean // Item chave de reposição rápida
  supplierNotice?: string // Observação de fornecedor
  isUnderConsultation?: boolean // Ex: sob consulta ao fornecedor
}

export const CATEGORIES: ('Todos' | ProductCategory)[] = [
  'Todos',
  'Combos',
  'Equipamento do Motoqueiro',
  'Peças',
  'Proteção',
  'Conforto',
  'Tecnologia',
  'Carga/Entrega',
]

export const DEMO_PRODUCTS: DemoProduct[] = [
  // --- BLOCO: Peças de Reposição (Motos até 450cc em Duas Camadas: Núcleo até 250cc + Camada 250–450cc) ---
  // 12 Peças com marcas paralelas TOP reconhecidas (Vaz, Pro Tork, Cobreq, Fras-le, Nakata, Magnetron)
  {
    id: 'kit-relacao-cg-160-vaz',
    name: 'Kit Relação Transmissão Aço 1045 — CG 160 Titan/Fan/Start/Cargo',
    brand: 'Vaz',
    warranty: '3 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan (2016 a 2024)',
      'Honda CG 160 Fan (2016 a 2024)',
      'Honda CG 160 Start (2016 a 2024)',
      'Honda CG 160 Cargo (2016 a 2024)',
      'Honda CG 150 Titan (2004 a 2015)',
    ],
    description:
      'Kit completo com coroa temperada, pinhão de aço 1045 e corrente reforçada 428H passo original Vaz.',
    fullDescription:
      'Produzido em aço 1045 pela Vaz, líder nacional em transmissão de duas rodas. Tratamento térmico por indução nos dentes garantindo máxima durabilidade e tração suave nas arrancadas diárias. Coroa 44 dentes, pinhão 15 dentes e corrente reforçada 428H x 118L. Encaixe direto sem adaptações.',
    category: 'Peças',
    price: 129.9,
    supplierCost: 82.0, // Margem ~36.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20sprocket%20chain&color=gray',
    speed: 34.2,
    tag: 'Campeão CG 160',
    highlight: true,
    variations: [
      {
        name: 'Compatibilidade',
        options: [
          'CG 160 Titan/Fan (2016-2024)',
          'CG 160 Start/Cargo (2016-2024)',
          'CG 150 Titan (2004-2015)',
        ],
      },
      {
        name: 'Tipo de Corrente',
        options: ['428H Reforçada Sem Emenda', '428H com Retentor O-Ring'],
      },
    ],
    features: [
      'Marca Vaz nacional consolidada',
      'Aço 1045 temperado por indução',
      'Garantia de 3 meses com nota fiscal',
      'Encaixe milimétrico sem folgas',
    ],
  },
  {
    id: 'kit-relacao-yamaha-factor-150-maxx',
    name: 'Kit Relação Transmissão Completo — Yamaha Factor 150 / Fazer 150',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Yamaha Factor 150 ED/SED (2014 a 2024)',
      'Yamaha Fazer 150 UBS (2014 a 2024)',
      'Yamaha Factor 125i Injeção (2016 a 2024)',
    ],
    description:
      'Conjunto coroa, pinhão e corrente passo 428H Pro Tork com encaixe preciso para linha Yamaha 150cc.',
    fullDescription:
      'Desenvolvido pela Pro Tork para motociclistas e entregadores que rodam centenas de quilômetros diariamente. Aço carbono 1045 usinado com precisão CNC, tratamento anticorrosão e perfil chanfrado que reduz o ruído de atrito no motor da Factor/Fazer 150.',
    category: 'Peças',
    price: 125.9,
    supplierCost: 78.0, // Margem ~38.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20gears%20chain&color=black',
    speed: 21.4,
    tag: 'Yamaha 150cc',
    variations: [
      {
        name: 'Modelo da Moto',
        options: [
          'Yamaha Factor 150 (Todos os anos)',
          'Yamaha Fazer 150 (2014-2024)',
          'Yamaha Factor 125i (Injeção)',
        ],
      },
    ],
    features: [
      'Marca Pro Tork com padrão nacional',
      'Usinagem CNC de alta precisão',
      'Menor perda de potência na roda',
      'Garantia legal de 3 meses com procedência',
    ],
  },
  {
    id: 'pastilha-freio-dianteira-cg-160-cobreq',
    name: 'Jogo de Pastilhas de Freio Dianteiro CG 160 / Titan / Fan',
    brand: 'Cobreq',
    warranty: '3 meses contra defeito de fabricação (garantia Cobreq com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan EX (2016 a 2024)',
      'Honda CG 160 Fan ESDI (2016 a 2024)',
      'Honda CG 160 Cargo Disco (2016 a 2024)',
      'Honda CG 150 Titan ESD/EX (2009 a 2015)',
    ],
    description:
      'Composto orgânico cerâmico Cobreq Linha Street para frenagem macia, silenciosa e com alta durabilidade do disco.',
    fullDescription:
      'Linha Street da Cobreq reconhecida pelas maiores montadoras do país. Composto livre de amianto com ranhuras de dissipação térmica que evitam fading sob chuva e asfalto quente no trânsito urbano. Aplicação direta no cáliper dianteiro original.',
    category: 'Peças',
    price: 44.9,
    supplierCost: 26.0, // Margem ~42.1%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20brake%20pads&color=gray',
    speed: 38.6,
    tag: 'Giro imediato',
    highlight: true,
    variations: [
      {
        name: 'Sistema de Freio',
        options: [
          'CG 160 Freio a Disco Padrão',
          'CG 160 CBS (Freio Combinado)',
          'Factor 150 Disco Dianteiro',
        ],
      },
    ],
    features: [
      'Cobreq Linha Street original paralela',
      'Material sem amianto ecológico',
      'Frenagem progressiva e silenciosa',
      'Garantia de 3 meses com procedência segura',
    ],
  },
  {
    id: 'lona-freio-traseira-cg-160-cobreq',
    name: 'Sapata / Lona de Freio Traseiro com Molas CG 160 / Biz 125',
    brand: 'Vaz',
    warranty: '3 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start (Tambor Traseiro 2016 a 2024)',
      'Honda CG 150 Titan/Fan (Tambor Traseiro 2004 a 2015)',
      'Honda Biz 125 / Biz 110i (Todos os anos)',
      'Honda Pop 110i / Pop 100 (Todos os anos)',
    ],
    description:
      'Sapata de freio traseira Vaz com molas de retorno em aço mola para tambor traseiro de motos até 250cc.',
    fullDescription:
      'Fundição de alumínio injetado sob alta pressão pela Vaz, revestida com composto de fricção de última geração sem amianto. Garante frenagem traseira segura sem travamento brusco em piso molhado ou paralelepípedos. Acompanha jogo completo de molas de tração.',
    category: 'Peças',
    price: 34.9,
    supplierCost: 18.0, // Margem ~48.4%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20brake%20shoes&color=gray',
    speed: 29.5,
    tag: 'Super econômico',
    variations: [
      {
        name: 'Aplicação Traseira',
        options: [
          'CG 160 Titan/Fan/Start (Tambor)',
          'Honda Biz 125 / 110i',
          'Yamaha Factor 125/150',
        ],
      },
    ],
    features: [
      'Marca Vaz nacional de freios',
      'Alumínio puro de alta dissipação térmica',
      'Molas de tração em aço temperado inclusas',
      'Garantia de 3 meses contra defeitos',
    ],
  },
  {
    id: 'kit-freio-completo-cg160-pastilha-lona',
    name: 'Kit Freio Completo Dianteiro + Traseiro — CG 160 (Pastilha + Lona + Molas)',
    brand: 'Cobreq',
    warranty: '3 meses contra defeito de fabricação (garantia Cobreq com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan EX / ESD (2016 a 2024)',
      'Honda CG 160 Fan ESDI (2016 a 2024)',
      'Honda CG 150 Titan ESD / EX (2009 a 2015)',
      'Yamaha Factor 150 ED (Disco + Tambor)',
    ],
    description:
      'Combo Cobreq de revisão dos dois eixos: jogo dianteiro de pastilha de disco + sapata traseira completa.',
    fullDescription:
      'Revisão completa da segurança da moto em uma única compra direta da distribuidora. Composto Cobreq dianteiro com ranhura térmica e lona traseira com molas novas, restabelecendo o poder de parada original de fábrica com economia e nota fiscal.',
    category: 'Peças',
    price: 74.9,
    supplierCost: 44.0, // Margem ~41.3%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20brake%20disc%20pad&color=gray',
    speed: 27.0,
    tag: 'Combo economia',
    highlight: true,
    variations: [
      {
        name: 'Modelo da Moto',
        options: [
          'CG 160 Titan/Fan (Disco Diant. + Tambor Tras.)',
          'CG 150 Titan ESD/EX',
          'Factor 150 ED (Disco + Tambor)',
        ],
      },
    ],
    features: [
      'Cobreq 100% original paralela homologada',
      'Revisão completa dos dois eixos',
      'Molas de retorno inclusas no kit',
      'Garantia de 3 meses com nota fiscal',
    ],
  },
  {
    id: 'retentor-suspensao-dianteira-par-cg-factor',
    name: 'Par de Retentores de Bengala / Suspensão Dianteira CG 160 & Factor 150',
    brand: 'Nakata',
    warranty: '3 meses contra defeito de fabricação (garantia Nakata com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start/Cargo (2016 a 2024 — 31mm)',
      'Honda CG 150 Titan/Fan (2004 a 2015 — 31mm)',
      'Honda CG 125 Fan/Today/Titan (todos — 27/31mm)',
      'Yamaha Factor 125/150 (todos os anos)',
    ],
    description:
      'Vedação Nakata com mola dupla para garfo dianteiro (31mm), elimina vazamento de óleo e protege os tubos cromados.',
    fullDescription:
      'Fabricados pela Nakata em borracha nitrílica NBR virgem de alta resistência térmica e a fluidos hidráulicos de suspensão. O perfil com lábio duplo e guarda-pó integrado impede a entrada de terra e pedriscos que riscam os tubos cromados da bengala.',
    category: 'Peças',
    price: 39.9,
    supplierCost: 21.0, // Margem ~47.4%
    image: 'https://img.usecurling.com/p/800/600?q=fork%20oil%20seal%20rubber&color=black',
    speed: 22.8,
    tag: 'Manutenção bengala',
    variations: [
      {
        name: 'Medida / Moto',
        options: [
          '31 x 43 x 10,5mm (CG 160 / CG 150 / Fan)',
          '30 x 40,5 x 10,5mm (Yamaha Factor 125/150)',
          '26 x 37 x 10,5mm (Biz 125 / Pop 110i)',
        ],
      },
    ],
    features: [
      'Marca Nakata de ponta em suspensão',
      'Molas internas de aço inox anticorrosão',
      'Borracha nitrílica NBR virgem de alta densidade',
      'Garantia de 3 meses contra vazamentos de fabricação',
    ],
  },
  {
    id: 'retrovisor-par-cg-160-padrao-original',
    name: 'Par de Retrovisores Modelo Original — CG 160 Titan/Fan (Rosca Honda M10)',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start/Cargo (2016 a 2024)',
      'Honda CG 150 Titan/Fan (2004 a 2015)',
      'Honda CG 125 Fan (2005 a 2018)',
      'Honda NXR 160 Bros (2015 a 2024)',
    ],
    description:
      'Haste reforçada antitrepidation com espelho convexo anti-reflexo Pro Tork. Peça mais trocada em quedas leves.',
    fullDescription:
      'Fabricado pela Pro Tork seguindo milimetricamente o padrão original da Honda CG 160. Carcaça em termoplástico injetado preto fosco de alta resistência a impacto, espelho de cristal espelhado nítido sem vibração em velocidade e capa de proteção de borracha sobre a porca.',
    category: 'Peças',
    price: 79.9,
    supplierCost: 48.0, // Margem ~39.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20rearview%20mirror&color=black',
    speed: 36.4,
    tag: 'Top queda #1',
    highlight: true,
    isCrashPart: true,
    variations: [
      {
        name: 'Padrão da Rosca',
        options: ['Rosca Honda M10 (Normal + Normal)', 'Rosca Yamaha M10 (Esquerda Invertida)'],
      },
      {
        name: 'Formato da Haste',
        options: ['Haste Curta 360° Articulada', 'Haste Longa Padrão Original'],
      },
    ],
    features: [
      'Marca Pro Tork com padrão original',
      'Espelho convexo com ampla visão de ponto cego',
      'Haste em aço trefilado anti-vibração',
      'Garantia de 3 meses com nota fiscal',
    ],
  },
  {
    id: 'par-piscas-dianteiros-cg-160-fumê-cristal',
    name: 'Par de Piscas / Lanternas Seta Dianteiras CG 160 Titan/Fan',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start/Cargo (2016 a 2024)',
      'Honda CG 150 Titan (2014 a 2015)',
      'Honda XRE 190 / XRE 300 (2016 a 2023)',
    ],
    description:
      'Lentes de policarbonato Pro Tork com haste flexível em borracha que absorve pequenas escoriações e quedas.',
    fullDescription:
      'Conjunto completo de pisca seta dianteiro fabricado pela Pro Tork com soquetes e lâmpadas 12V 10W inclusas. Carcaça com coxim de borracha flexível que dobra antes de quebrar em quedas laterais e tombos de estacionamento.',
    category: 'Peças',
    price: 59.9,
    supplierCost: 35.0, // Margem ~41.6%
    image:
      'https://img.usecurling.com/p/800/600?q=motorcycle%20indicator%20turn%20signal&color=yellow',
    speed: 32.1,
    tag: 'Top queda #2',
    highlight: true,
    isCrashPart: true,
    variations: [
      {
        name: 'Cor da Lente',
        options: ['Fumê Cristal Esportivo', 'Laranja Padrão Original', 'Cristal Transparente'],
      },
      {
        name: 'Posição / Lado',
        options: ['Par Dianteiro (Lado Direito + Esquerdo)', 'Par Traseiro Completo'],
      },
    ],
    features: [
      'Marca Pro Tork líder nacional',
      'Coxim de borracha flexível anti-impacto',
      'Lentes em policarbonato com vedação contra chuva',
      'Garantia legal de 3 meses com NF',
    ],
  },
  {
    id: 'pedana-cavalete-lateral-cg-160-reforcado',
    name: 'Pedaleira Dianteira Estribo + Cavalete Lateral com Mola CG 160',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start (2016 a 2024)',
      'Honda CG 150 Titan/Fan (2004 a 2015)',
      'Honda CG 125 Fan (2009 a 2018)',
    ],
    description:
      'Barra de estribo central Pro Tork em tubo de aço maciço reforçado com apoio de borracha e descanso lateral.',
    fullDescription:
      'Peça estrutural desenvolvida pela Pro Tork em aço tubular de parede reforçada com solda MIG e pintura eletrostática a pó preta. É a primeira peça a absorver o choque quando a moto tomba no asfalto, protegendo o motor e o quadro.',
    category: 'Peças',
    price: 54.9,
    supplierCost: 31.0, // Margem ~43.5%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20footrest%20kickstand&color=black',
    speed: 23.9,
    tag: 'Top queda #5',
    isCrashPart: true,
    variations: [
      {
        name: 'Aplicação',
        options: [
          'CG 160 Titan/Fan/Start (2016-2024)',
          'CG 150 Titan (2004-2015)',
          'Factor 125/150',
        ],
      },
      {
        name: 'Composição',
        options: ['Estribo Central + Pedanas de Borracha', 'Cavalete Lateral com Mola Completo'],
      },
    ],
    features: [
      'Aço estrutural Pro Tork de parede espessa',
      'Pintura eletrostática anticorrosiva',
      'Borrachas de pedana antiderrapantes vulcanizadas',
      'Garantia de 3 meses com nota fiscal',
    ],
  },
  {
    id: 'parabarro-dianteiro-cg-160-paralama',
    name: 'Paralama Dianteiro / Parabarro Carenagem CG 160 Titan/Fan',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: [
      'Honda CG 160 Fan (2016 a 2024)',
      'Honda CG 160 Titan (2016 a 2024)',
      'Honda CG 160 Start (2016 a 2024)',
      'Honda CG 160 Cargo (2016 a 2024)',
    ],
    description:
      'Injetado Pro Tork em plástico flexível de alta densidade na cor preta, encaixe padrão e resistente a quebras.',
    fullDescription:
      'Substitui com perfeição o paralama quebrado ou ralado em batidas frontais e tombos de rua. Resina termoplástica virgem Pro Tork com verniz protetor contra raios UV que não resseca nem esbranquiça com sol e chuva. Furação 100% alinhada à bengala.',
    category: 'Peças',
    price: 64.9,
    supplierCost: 39.0, // Margem ~39.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20front%20fender&color=black',
    speed: 25.4,
    tag: 'Top queda #6',
    isCrashPart: true,
    variations: [
      {
        name: 'Cor / Acabamento',
        options: ['Preto Injetado Fosco', 'Preto Perolizado Brilhante', 'Vermelho Perolizado'],
      },
      {
        name: 'Modelo da Moto',
        options: ['CG 160 Fan / Titan (2016-2024)', 'CG 160 Start', 'Factor 150'],
      },
    ],
    features: [
      'Plástico injetado virgem Pro Tork',
      'Verniz com proteção UV contra desbotamento',
      'Encaixe exato nos furos originais da bengala',
      'Garantia de 3 meses com procedência',
    ],
  },
  {
    id: 'manoplas-balanca-guidao-cg-160-circuito',
    name: 'Par de Manoplas com Tubo do Acelerador + Pesos de Guidão CG 160',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start/Cargo (2016 a 2024)',
      'Honda CG 150 Titan/Fan (2004 a 2015)',
      'Yamaha Factor 125/150 (todos os anos)',
      'Honda Biz 125/110i (guidão 22mm)',
    ],
    description:
      'Grip emborrachado Pro Tork ergonômico com roldana do acelerador e pesinhos laterais de acabamento.',
    fullDescription:
      'Conjunto completo para restaurar o guidão após queda lateral. Acompanha roldana injetada do cabo do acelerador, manopla esquerda macia com textura antiderrapante e pesinhos de aço usinado que equilibram o guidão e diminuem a dormência nas mãos.',
    category: 'Peças',
    price: 49.9,
    supplierCost: 28.0, // Margem ~43.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20handle%20grips&color=black',
    speed: 33.7,
    tag: 'Top queda #4',
    highlight: true,
    isCrashPart: true,
    variations: [
      {
        name: 'Acabamento dos Pesos',
        options: [
          'Preto Fosco com Roldana Inclusa',
          'Cromado com Tubo Acelerador',
          'Grafite Titânio',
        ],
      },
      { name: 'Diâmetro do Guidão', options: ['22mm Padrão Original (CG/Factor/Biz)'] },
    ],
    features: [
      'Marca Pro Tork com garantia de fábrica',
      'Borracha macia de alta aderência anti-fadiga',
      'Tubo do acelerador injetado incluso',
      'Garantia legal de 3 meses com NF',
    ],
  },
  {
    id: 'corrente-transmissao-428h-126-elos-maxx',
    name: 'Corrente de Transmissão 428H x 126 Elos Reforçada com Emenda',
    brand: 'Vaz',
    warranty: '3 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start (118 elos — corte rápido)',
      'Honda CG 150 Titan (118 elos)',
      'Honda NXR 160 Bros (126 elos)',
      'Yamaha Factor 150 / Fazer 150 (124/126 elos)',
    ],
    description:
      'Passo 428H Vaz com pinos reforçados para alta quilometragem urbana em motos até 250cc.',
    fullDescription:
      'Construída pela Vaz com pinos de liga cromo-manganês com tratamento térmico avançado contra esticamento precoce. Fornecida com 126 elos e elo de emenda rápida temperado, permitindo o ajuste milimétrico para CG 160, Bros 160 ou Factor 150.',
    category: 'Peças',
    price: 59.9,
    supplierCost: 36.0, // Margem ~39.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20drive%20chain&color=gray',
    speed: 28.1,
    tag: 'Super reforçada',
    variations: [
      {
        name: 'Comprimento',
        options: [
          '126 Elos com Emenda Inclusa',
          '118 Elos Medida CG 160',
          '132 Elos para Relação Longa',
        ],
      },
    ],
    features: [
      'Marca Vaz nacional de transmissão',
      'Pinos em aço cromo-manganês temperado',
      'Resistência à tração superior a 2.100 kgf',
      'Garantia de 3 meses com nota fiscal',
    ],
  },

  // --- BLOCO: Linha "Segurança & Impacto" (Equipamentos de Proteção) ---
  {
    id: 'joelheira-cotoveleira-articulada-seguranca',
    name: 'Par de Joelheiras e Cotoveleiras Articuladas de Alta Proteção contra Impacto',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação (garantia com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas urbanos e de estrada'],
    description:
      'Casquilho duplo articulado em policarbonato de alta resistência a impacto e forração em EVA respirável.',
    fullDescription:
      'Equipamento essencial de proteção corporal preventiva: joelhos e cotovelos protegidos em manobras e trânsito intenso. Sistema bi-articulado que permite dobrar a perna e o braço em 90 graus com total liberdade de movimento. Tiras de fixação elásticas triplas com velcro reforçado.',
    category: 'Proteção',
    price: 139.9,
    supplierCost: 85.0, // Margem ~39.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20knee%20guards&color=black',
    speed: 18.9,
    tag: 'Segurança & Proteção',
    highlight: true,
    isSafetyCrash: false,
    variations: [
      {
        name: 'Composição',
        options: [
          'Kit Completo (Par de Joelheiras + Par de Cotoveleiras)',
          'Apenas Par de Joelheiras Articuladas',
        ],
      },
      {
        name: 'Tamanho',
        options: ['Tamanho Único Ajustável (Tiras Elásticas Duplas)'],
      },
    ],
    features: [
      'Casquilho termoplástico bi-articulado com alívio',
      'Forração interna em EVA espesso anti-choque',
      'Fechamento rápido com engates e velcro reforçado',
      'Essencial para prevenção de lesões em quedas',
    ],
  },
  {
    id: 'colete-refletivo-reforcado-entregador',
    name: 'Colete Refletivo de Alta Visibilidade Reforçado com Bolsos Táticos',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de costura e faixas refletivas',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (veste sobre camiseta ou jaqueta)'],
    description:
      'Faixas refletivas homologadas 360°, zíper frontal resistente e 4 bolsos frontais para celular e comprovantes.',
    fullDescription:
      'Visibilidade noturna extrema a mais de 200 metros sob chuva, cerração ou asfalto escuro. Tecido em malha poliéster respirável com reforço estrutural anti-rasgo, zíper tratorado de alta durabilidade e bolsos frontais de acesso rápido para caneta, maquininha ou smartphone.',
    category: 'Proteção',
    price: 59.9,
    supplierCost: 34.0, // Margem ~43.2%
    image: 'https://img.usecurling.com/p/800/600?q=high%20visibility%20vest&color=yellow',
    speed: 26.5,
    tag: 'Segurança & Visibilidade',
    highlight: true,
    isSafetyCrash: false,
    variations: [
      {
        name: 'Tamanho',
        options: ['M / G (Ajustável)', 'GG / XG (Para usar sobre jaqueta)'],
      },
      {
        name: 'Cor',
        options: ['Amarelo Limão Fluorescente com Faixas Prata', 'Laranja Alta Visibilidade'],
      },
    ],
    features: [
      'Faixas refletivas 360° visíveis a mais de 200m',
      '4 bolsos frontais táticos de acesso ágil',
      'Tecido respirável que não esquenta sobre a roupa',
      'Zíper tratorado reforçado contra quebras',
    ],
  },
  {
    id: 'protetor-de-maos-guarda-guidao-universal',
    name: 'Par de Protetores de Mãos e Guarda-Guidão em Alumínio Naval + Polímero',
    brand: 'Circuit',
    warranty: '3 meses contra defeito de fabricação (garantia Circuit com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motos com guidão tubular de 22mm ou 28mm'],
    description:
      'Barra interna em alma de alumínio que salva os manetes e protege as mãos em batidas e tombos.',
    fullDescription:
      'Em caso de queda leve ou esbarrão em retrovisores de carros no corredor, o protetor de mão absorve o impacto frontal e lateral, evitando que o manete de freio quebre ou esmague os dedos do piloto. Construído com alma interna de alumínio e defletor de vento envolvente em termoplástico flexível.',
    category: 'Proteção',
    price: 89.9,
    supplierCost: 52.0, // Margem ~42.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20handguards&color=black',
    speed: 20.3,
    tag: 'Segurança & Impacto',
    highlight: true,
    isSafetyCrash: false,
    variations: [
      {
        name: 'Cor do Defletor',
        options: ['Preto Fosco Total', 'Preto com Friso Branco', 'Vermelho Racing'],
      },
      {
        name: 'Estrutura',
        options: ['Com Alma Interna de Barra de Alumínio', 'Polímero Sem Alma'],
      },
    ],
    features: [
      'Marca Circuit consagrada em protetores',
      'Alma estrutural em barra maciça de alumínio',
      'Evita quebra de manetes em tombos laterais',
      'Encaixe universal para motos de guidão 22mm',
    ],
  },

  // --- ACESSÓRIOS EXISTENTES (Proteção, Conforto, Tecnologia, Carga/Entrega) ---
  {
    id: 'capacete-escamoteavel-articulado',
    name: 'Capacete Escamoteável Articulado Robocop Pro',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito de fabricação (garantia com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas (tamanhos 56 a 62)'],
    description:
      'Sistema flip-up de abertura com 1 botão, óculos solar interno fumê integrado e certificação INMETRO.',
    fullDescription:
      'Projetado para viagens longas e uso urbano diário. Conta com queixeira escamoteável com trava metálica segura, óculos de sol retrátil acionado por alavanca lateral externa, casco em resina termoplástica de alta pressão (HPTT) e forração hipoalergênica removível e lavável.',
    category: 'Proteção',
    price: 389.9,
    supplierCost: 249.0, // Margem ~36.1%
    image: 'https://img.usecurling.com/p/800/600?q=helmet%20motorcycle&color=black',
    speed: 14.5,
    tag: 'Mais vendido',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['56 (P)', '58 (M)', '60 (G)', '62 (GG)'] },
      { name: 'Cor', options: ['Preto Fosco', 'Grafite Metálico', 'Preto com Amarelo Fluo'] },
    ],
    features: [
      'Marca Pro Tork com certificado INMETRO',
      'Óculos solar retrátil embutido',
      'Queixeira escamoteável 180°',
      'Forro removível e lavável',
    ],
  },
  {
    id: 'luva-motociclista-touch-kevlar',
    name: 'Luvas Motoqueiro Touchscreen com Proteção Kevlar',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de costura e acabamento',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para condutores de motocicleta'],
    description:
      'Dedos sensíveis a telas de celular sem tirar a luva, protetor rígido nas articulações e palma anti-impacto.',
    fullDescription:
      'Construção mista em poliéster respirável com reforço na palma em camurça sintética e fibra de carbono nos nós dos dedos. Ponta dos dedos indicador e polegar com tecido condutivo para operar GPS e apps de entrega com agilidade.',
    category: 'Proteção',
    price: 89.9,
    supplierCost: 49.0, // Margem ~45.5%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20gloves&color=black',
    speed: 24.8,
    tag: 'Campeão de giro',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['P', 'M', 'G', 'GG'] },
      { name: 'Cor', options: ['Preto Total', 'Preto com Vermelho', 'Preto com Azul'] },
    ],
    features: [
      'Touchscreen no polegar e indicador',
      'Casquilho rígido nos nós dos dedos',
      'Tecido 3D ventilado anti-suor',
      'Fecho em velcro reforçado',
    ],
  },
  {
    id: 'intercomunicador-bluetooth-capacete',
    name: 'Interfone Bluetooth 5.2 para Capacete com Rádio FM',
    brand: 'Magnetron',
    warranty: '6 meses contra defeito elétrico de fabricação',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (compatível com qualquer capacete aberto ou fechado)'],
    description:
      'Atenda ligações e ouça GPS com redução de ruído DSP/CVC em alta velocidade e pareamento duplo.',
    fullDescription:
      'Comunicação clara de piloto para garupa ou piloto para piloto em até 800m. Fones estéreo HD ultrafinos de 40mm que encaixam no rebaixo de qualquer capacete. Resistente a chuvas torrenciais (IP67) e bateria com autonomia de até 18 horas de música ou chamada contínua.',
    category: 'Tecnologia',
    price: 229.0,
    supplierCost: 139.0, // Margem ~39.3%
    image: 'https://img.usecurling.com/p/800/600?q=intercom%20headset&color=blue',
    speed: 12.3,
    tag: 'Alta tecnologia',
    highlight: true,
    variations: [
      { name: 'Kit', options: ['Individual (1 unidade)', 'Par Duplo (2 unidades)'] },
      { name: 'Microfone', options: ['Híbrido (Haste + Fio)'] },
    ],
    features: [
      'Bluetooth 5.2 Estéreo HD',
      'Resistência à água IP67',
      'Cancelamento ativo de vento CVC',
      'Bateria de 18h de uso',
    ],
  },
  {
    id: 'suporte-celular-garra-usb',
    name: 'Suporte de Celular Garra X com Carregador USB Rápido',
    brand: 'Magnetron',
    warranty: '3 meses contra defeito elétrico e mecânico',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (guidão 22 a 32mm ou base do retrovisor M10)'],
    description:
      'Fixação antifurto em guidão ou retrovisor com saída USB 5V/2A para manter a bateria sempre em 100%.',
    fullDescription:
      'Construção em alumínio fundido com pontas de silicone antiderrapante tipo garra X e elástico de borracha de segurança. Carregador USB integrado com chave liga/desliga e tampa emborrachada impermeável. Compatível com smartphones de 4.0 a 7.2 polegadas.',
    category: 'Tecnologia',
    price: 69.9,
    supplierCost: 34.0, // Margem ~51.4%
    image: 'https://img.usecurling.com/p/800/600?q=phone%20mount%20motorcycle&color=gray',
    speed: 28.5,
    tag: 'Mais vendido motoboy',
    highlight: true,
    variations: [
      { name: 'Fixação', options: ['Guidão (22-32mm)', 'Base do Retrovisor'] },
      { name: 'Conexão', options: ['USB Padrão', 'USB + Tipo-C Turbo'] },
    ],
    features: [
      'Garra X em alumínio naval',
      'Carregador USB integrado 2A',
      'Borracha spider de retenção inclusa',
      'Chave liga/desliga à prova d’água',
    ],
  },
  {
    id: 'jaqueta-impermeavel-corta-vento',
    name: 'Jaqueta Motoqueiro 100% Impermeável com Refletivo 3M',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeitos de costura e impermeabilização',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (modelagem M, G, GG, XG)'],
    description:
      'Barreira total contra vento e chuva forte, costuras termo-seladas e bolsos internos secos para celular.',
    fullDescription:
      'Desenvolvida para o motociclista que não para na chuva. Tecido em náilon rip-stop revestido de PVC interno, punhos elásticos com regulagem em velcro, gola alta que veda a entrada de água sob o capacete e faixas refletivas homologadas visíveis a mais de 150 metros à noite.',
    category: 'Conforto',
    price: 189.9,
    supplierCost: 115.0, // Margem ~39.4%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20jacket&color=black',
    speed: 15.8,
    tag: 'Proteção chuva',
    variations: [
      { name: 'Tamanho', options: ['M', 'G', 'GG', 'XG'] },
      { name: 'Acabamento', options: ['Preto com Faixa Prata', 'Preto com Amarelo Neon'] },
    ],
    features: [
      '100% Impermeável termo-selada',
      'Faixas refletivas 3M alta visibilidade',
      'Gola alta anti-infiltração',
      'Bolso interno selado para celular',
    ],
  },
  {
    id: 'bota-motociclista-impermeavel-couro',
    name: 'Bota Motociclista Couro Impermeável com Protetor de Marcha',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação e solado',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (numeração 38 a 44)'],
    description:
      'Solado tratorado antiderrapante com biqueira reforçada e palmilha em gel para conforto o dia todo.',
    fullDescription:
      'Produzida em couro legítimo semi-cromo com tratamento hidrofugado resistente a água e lama. Reforço no peito do pé para troca de marchas sem desgastar o couro, cano médio com zíper lateral que agiliza o calce e palmilha anatômica com absorção de impacto.',
    category: 'Proteção',
    price: 279.0,
    supplierCost: 175.0, // Margem ~37.3%
    image: 'https://img.usecurling.com/p/800/600?q=leather%20boots%20motorcycle&color=black',
    speed: 8.6,
    tag: 'Couro legítimo',
    variations: [
      { name: 'Numeração', options: ['38', '39', '40', '41', '42', '43', '44'] },
      { name: 'Cor', options: ['Preto Fosco', 'Marrom Café'] },
    ],
    features: [
      'Couro legítimo hidrofugado',
      'Protetor de marcha vulcanizado',
      'Zíper lateral com trava em velcro',
      'Solado de borracha antiderrapante',
    ],
  },
  {
    id: 'bag-mochila-termica-entregador-45l',
    name: 'Bag Mochila Térmica Delivery 45L com Isopor Reforçado',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação e zíper',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para entregadores de aplicativo e delivery'],
    description:
      'Compartimento para 4 pizzas grandes ou marmitex, 4 bolsos laterais para refrigerantes de 2L.',
    fullDescription:
      'Mochila padrão de aplicativos (iFood, Rappi e entregas expressas). Fabricada em lona de alta resistência impermeável (Nylon 600) com caixa de isopor prensada espessa de 45 litros que conserva o calor por até 4 horas. Alças acolchoadas ergonômicas com fecho peitoral.',
    category: 'Carga/Entrega',
    price: 159.9,
    supplierCost: 98.0, // Margem ~38.7%
    image: 'https://img.usecurling.com/p/800/600?q=delivery%20backpack&color=red',
    speed: 19.4,
    tag: 'Essencial delivery',
    highlight: true,
    variations: [
      { name: 'Capacidade', options: ['45 Litros com Isopor'] },
      { name: 'Cor dos Detalhes', options: ['Preto com Faixa Refletiva', 'Vermelho Delivery'] },
    ],
    features: [
      'Isopor reforçado térmico 45L',
      'Porta-garrafas para até 4 refris de 2L',
      'Alças antitranspirantes acolchoadas',
      'Fecho peitoral para equilíbrio na moto',
    ],
  },
  {
    id: 'balaclava-touca-termica-uv50',
    name: 'Balaclava Touca Ninja Térmica com Proteção Solar UV50+',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de tecido e costura',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (elastic fit para usar sob capacete)'],
    description:
      'Tecido dry-fit respirável para usar sob o capacete, evita suor no forro e protege pescoço e queixo.',
    fullDescription:
      'Confeccionada em poliamida com elastano de toque gelado. Mantém a temperatura fresca no calor e bloqueia o vento gelado no inverno, além de proteger a pele contra raios solares UV50+. Costuras planas que não marcam nem machucam a cabeça sob o capacete.',
    category: 'Conforto',
    price: 34.9,
    supplierCost: 14.5, // Margem ~58.5%
    image: 'https://img.usecurling.com/p/800/600?q=balaclava%20ski%20mask&color=black',
    speed: 31.0,
    tag: 'Giro recorde',
    variations: [
      { name: 'Tamanho', options: ['Tamanho Único Elastic Fit'] },
      { name: 'Cor', options: ['Preto Carbono', 'Camuflado Urbano', 'Cinza Chumbo'] },
    ],
    features: [
      'Proteção solar UV50+ certificada',
      'Tecido dry-fit que seca em minutos',
      'Não embaraça o cabelo nem esquenta',
      'Costura Flatlock sem atrito',
    ],
  },
  {
    id: 'farol-led-auxiliar-milha-u7',
    name: 'Kit Par Farol de Milha LED Auxiliar Angel Eye U7 com Botão',
    brand: 'Magnetron',
    warranty: '3 meses contra defeito elétrico de fabricação',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motos com bateria 12V e guidão 22mm'],
    description:
      '3 modos de iluminação (Forte, Fraco e Estroboscópico) com carcaça em alumínio naval e botão guidão.',
    fullDescription:
      'Iluminação de longo alcance para estradas sem luz e rodovias perigosas. Cada farol entrega 3000 lúmens reais com anel angel eye decorativo. Lente convexa de cristal e vedação IP68 à prova de imersão temporária. Acompanha chave liga/desliga para fixação no guidão.',
    category: 'Tecnologia',
    price: 139.9,
    supplierCost: 78.0, // Margem ~44.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20headlight%20led&color=blue',
    speed: 11.7,
    tag: 'Super luminosidade',
    variations: [
      { name: 'Cor do Angel Eye', options: ['Branco Frio', 'Azul Elétrico', 'Vermelho'] },
      { name: 'Kit', options: ['Par Completo (2 Faróis + Botão Guidão)'] },
    ],
    features: [
      'Potência de 3000 lúmens por farol',
      'Alumínio naval resistente à oxidação',
      'Lente óptica com foco concentrado',
      'Botão de guidão incluso no kit',
    ],
  },
  {
    id: 'capacete-feminino-aerodinamico',
    name: 'Capacete Integral Feminino Flowers Glossy com Narigueira',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas (tamanhos 54 a 58)'],
    description:
      'Design compacto e leve com pintura automotiva perolizada, forro antialérgico e viseira cristal 2mm.',
    fullDescription:
      'Projetado ergonomicamente para motociclistas femininas, oferecendo casco compacto em ABS virgem mais leve que reduz a fadiga cervical em trajetos urbanos. Viseira com tratamento antirrisco e sistema de engate micrométrico rápido na jugular.',
    category: 'Proteção',
    price: 299.9,
    supplierCost: 189.0, // Margem ~37.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20helmet%20pink&color=pink',
    speed: 9.8,
    tag: 'Pintura perolizada',
    variations: [
      { name: 'Tamanho', options: ['54 (PP)', '56 (P)', '58 (M)'] },
      { name: 'Grafismo', options: ['Preto com Rosa Perolizado', 'Branco com Roxo Lilás'] },
    ],
    features: [
      'Casco leve em ABS puro virgem Pro Tork',
      'Engate micrométrico de alta precisão',
      'Entradas e saídas de ar reguláveis',
      'Viseira de 2mm policarbonato óptico',
    ],
  },
  {
    id: 'pelicula-antiembacante-viseira-pinlock',
    name: 'Película Antiembaçante Universal para Viseiras de Capacete',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de colagem e película',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para viseiras de capacetes integrais e escamoteáveis'],
    description:
      'Visão 100% nítida em dias de chuva torrencial e frio sem precisar abrir a viseira em movimento.',
    fullDescription:
      'Película adesiva de nanotecnologia com membrana hidroabsorvente que impede a condensação da respiração sobre a viseira plástica. Instalação universal interna compatível com mais de 98% dos capacetes integrais e articulados do mercado.',
    category: 'Conforto',
    price: 49.9,
    supplierCost: 19.0, // Margem ~61.9%
    image: 'https://img.usecurling.com/p/800/600?q=helmet%20visor%20shield&color=cyan',
    speed: 22.1,
    tag: 'Item indispensável',
    variations: [
      { name: 'Tipo', options: ['Universal Cristal Transparente'] },
      {
        name: 'Kit',
        options: [
          '1 Película Antiembaçante',
          'Kit 2 Películas (Antiembaçante + Antichuva Externa)',
        ],
      },
    ],
    features: [
      'Nanotecnologia que drena a condensação',
      'Instalação fácil em menos de 2 minutos',
      'Compatível com qualquer modelo de viseira',
      'Não altera o foco nem a transparência óptica',
    ],
  },
  {
    id: 'baú-traseiro-bauleto-moto-45l',
    name: 'Bauleto Traseiro para Moto 45L com Base e Chave Dupla',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação e fechadura',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para qualquer moto com bagageiro tubular'],
    description:
      'Capacidade para 2 capacetes ou compras com trava antifurto em aço e refletor traseiro vermelho.',
    fullDescription:
      'Injetado em polipropileno de alto impacto flexível que suporta trepidações e buracos sem trincar. Acompanha base de fixação universal para qualquer bagageiro tubular, jogo completo de parafusos, chaves reservas e refletor de segurança integrado na tampa traseira.',
    category: 'Carga/Entrega',
    price: 199.9,
    supplierCost: 122.0, // Margem ~39.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20top%20case&color=black',
    speed: 13.4,
    tag: 'Suporta 2 capacetes',
    variations: [
      { name: 'Capacidade', options: ['45 Litros Universal'] },
      { name: 'Refletor', options: ['Vermelho Rubino', 'Fumê Cristal'] },
    ],
    features: [
      'Comporta 2 capacetes fechados',
      'Polipropileno virgem anti-impacto Pro Tork',
      'Base e parafusos universais inclusos',
      'Trava rápida com 2 chaves codificadas',
    ],
  },

  // --- BLOCO: Combos (Destaque "Melhor valor" & elevação de ticket médio) ---
  {
    id: 'combo-motoboy-seguro',
    name: 'Combo Motoboy Seguro (Capacete + Luva + Capa de Chuva + Balaclava)',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para condutores e entregadores profissionais'],
    description:
      'Conjunto completo de proteção para rodar seguro faça sol ou chuva. Capacete integral + par de luvas touch + conjunto capa de chuva selado + balaclava UV.',
    fullDescription:
      'O pacote essencial para o piloto urbano que busca economia máxima e equipamento homologado. Inclui: Capacete integral Pro Tork com certificado INMETRO, par de luvas de alta aderência touchscreen, conjunto de chuva completo com calça e jaqueta termoselada, além de balaclava térmica respirável. Compre tudo junto e economize R$ 60 em relação aos itens avulsos.',
    category: 'Combos',
    price: 399.9,
    supplierCost: 240.0, // Margem ~40.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20rider%20gear%20kit&color=blue',
    speed: 18.5,
    tag: 'Melhor valor',
    highlight: true,
    isCombo: true,
    bestValueHighlight: true,
    savingsPill: 'Economia de R$ 60',
    variations: [
      { name: 'Tamanho do Capacete', options: ['56 (P)', '58 (M)', '60 (G)', '62 (GG)'] },
      { name: 'Tamanho da Capa / Luva', options: ['M (Kit M)', 'G (Kit G)', 'GG (Kit GG)'] },
    ],
    features: [
      'Capacete Pro Tork com selo INMETRO',
      'Luva reforçada com grip antiderrapante',
      'Capa de chuva 100% impermeável termoselada',
      'Balaclava térmica UV50+ inclusa',
      'Economia de R$ 60 comparado aos avulsos',
    ],
  },
  {
    id: 'combo-queda-completa',
    name: 'Combo Proteção Total (Kit Reposição 4 Peças + Jaqueta Impermeável Reforçada)',
    brand: 'Pro Tork / X11',
    warranty: '6 meses contra defeito de fabricação com nota fiscal',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start (2016-2024)',
      'Honda CG 150 Titan (2004-2015)',
      'Yamaha Factor 125/150 (todos os anos)',
    ],
    description:
      'Renova a moto e protege o corpo: peças de impacto lateral (retrovisores, piscas, manoplas e pedana) + Jaqueta impermeável com proteções.',
    fullDescription:
      'Pacote completo de proteção e renovação para quem roda no dia a dia. Inclui todos os componentes do kit de reposição rápida de peças de impacto (par de retrovisores padrão original, par de piscas dianteiros flexíveis, manoplas com tubo e pesos, pedana estribo/cavalete) combinados com uma jaqueta impermeável de alta resistência à abrasão.',
    category: 'Combos',
    price: 649.9,
    supplierCost: 395.0, // Margem ~39.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20jacket%20and%20parts&color=black',
    speed: 11.2,
    tag: 'Melhor valor',
    highlight: true,
    isCombo: true,
    bestValueHighlight: true,
    savingsPill: 'Super Combo Reposição + Vestuário',
    isSafetyCrash: false,
    variations: [
      { name: 'Tamanho da Jaqueta', options: ['M', 'G', 'GG', 'XG'] },
      {
        name: 'Modelo da Moto (Peças)',
        options: ['CG 160 Titan/Fan (2016-2024)', 'CG 160 Start/Cargo', 'Yamaha Factor 150/125'],
      },
    ],
    features: [
      'Contém o Kit de Reposição Rápida completo (4 itens de impacto lateral)',
      'Acompanha jaqueta impermeável com refletivo 3M',
      'Margem de ~39% para o revendedor dropshipping',
      'Despacho unificado direto da distribuidora',
      'Garantia total de 6 meses com nota fiscal',
    ],
  },

  // --- BLOCO: Equipamento do Motoqueiro (Vestuário, Alto Ticket & Reposição Rápida de Giro) ---
  {
    id: 'capacete-pro-tork-new-atomic',
    name: 'Capacete Integral Pro Tork New Atomic Fosco com Viseira Solar',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito de fabricação (garantia Pro Tork com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas (tamanhos 56 a 62)'],
    description:
      'Casco injetado em ABS virgem de alto impacto, aerodinâmica esportiva, viseira de 2mm policarbonato e forração antialérgica.',
    fullDescription:
      'Um dos capacetes integrais mais vendidos do Brasil pela Pro Tork. O New Atomic reúne design agressivo com estabilidade aerodinâmica de alto nível, entradas de ar frontais reguláveis, forro termoformado hipoalergênico e jugular com engate micrométrico seguro.',
    category: 'Equipamento do Motoqueiro',
    price: 289.9,
    supplierCost: 170.0, // Margem ~41.4%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20helmet%20matte%20black&color=black',
    speed: 21.0,
    tag: 'Alto ticket Pro Tork',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['56 (P)', '58 (M)', '60 (G)', '62 (GG)'] },
      {
        name: 'Acabamento',
        options: ['Preto Fosco Titânio', 'Preto com Vermelho', 'Preto com Amarelo Fluo'],
      },
    ],
    features: [
      'Certificação INMETRO compulsória',
      'Casco ABS virgem antichoque',
      'Viseira 2mm cristal antirrisco',
      'Engate micrométrico rápido na jugular',
    ],
  },
  {
    id: 'capacete-x11-track',
    name: 'Capacete X11 Track Integral Esportivo com Narigueira e Spoiler',
    brand: 'X11',
    warranty: '6 meses contra defeito de fabricação (garantia X11 com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas urbanos e rodoviários'],
    description:
      'Casco aerodinâmico em polímero termoplástico X11, spoiler traseiro esportivo, bavete e narigueira antirruído removíveis.',
    fullDescription:
      'O X11 Track traz o visual dos circuitos para o dia a dia do motoqueiro. Excelente isolamento acústico contra ruídos do vento, bavete de queixo, narigueira esportiva e forro interno lavável com corte anatômico a laser.',
    category: 'Equipamento do Motoqueiro',
    price: 229.9,
    supplierCost: 135.0, // Margem ~41.3%
    image: 'https://img.usecurling.com/p/800/600?q=sports%20motorcycle%20helmet&color=gray',
    speed: 17.8,
    tag: 'Linha X11 Street',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['56 (P)', '58 (M)', '60 (G)', '61-62 (GG)'] },
      {
        name: 'Grafismo',
        options: ['Track Solid Matte Black', 'Track Titan Gray', 'Track Neon Sport'],
      },
    ],
    features: [
      'Marca X11 referência em vestuário moto',
      'Spoiler integrado para menor arrasto',
      'Viseira cristal com pinos para antiembaçante',
      'Garantia com NF e selo INMETRO',
    ],
  },
  {
    id: 'jaqueta-x11-iron-impermeavel',
    name: 'Jaqueta X11 Iron Impermeável com Protetores C.E. Ombros e Cotovelos',
    brand: 'X11',
    warranty: '6 meses contra defeitos de costura e impermeabilização',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal masculino e feminino (M a 3G)'],
    description:
      'Construção em poliéster Cordura 600D com membrana 100% impermeável, forro térmico removível e proteções com selo C.E.',
    fullDescription:
      'A jaqueta mais cobiçada da categoria no Brasil. A X11 Iron une blindagem contra chuva forte de verão com isolamento térmico destacável para madrugadas frias. Possui protetores homologados pela Comunidade Europeia (C.E.) nos ombros, cotovelos e placas nas costas, além de zíperes de ventilação direta.',
    category: 'Equipamento do Motoqueiro',
    price: 499.9,
    supplierCost: 300.0, // Margem ~40.0%
    image: 'https://img.usecurling.com/p/800/600?q=armored%20motorcycle%20jacket&color=black',
    speed: 12.4,
    tag: 'Âncora de alto ticket',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['M', 'G', 'GG', '3G'] },
      { name: 'Cor', options: ['Preto Total Monocromático', 'Preto com Frisos Cinza Refletivo'] },
    ],
    features: [
      'Tecido Cordura 600D ultra resistente',
      'Membrana interna 100% impermeável',
      'Protetores C.E. certificados',
      'Forro térmico destacável com zíper',
    ],
  },
  {
    id: 'jaqueta-masculina-ventilada-asw-core',
    name: 'Jaqueta Masculina Ventilada ASW Core com Painéis Mesh e Refletivo',
    brand: 'ASW',
    warranty: '6 meses contra defeito de fabricação (garantia oficial ASW)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas urbanos e estrada'],
    description:
      'Painéis em malha Mesh 3D respirável para pilotagem no calor escaldante sem abrir mão da proteção rígida nos impactos.',
    fullDescription:
      'Ideal para o clima tropical brasileiro. A ASW Core utiliza tecido de malha perfurada de alta densidade que canaliza o fluxo de ar para todo o tronco do piloto, mantendo a temperatura amena no trânsito pesado. Acompanha proteções removíveis nos braços e ajuste de punho e cintura em velcro.',
    category: 'Equipamento do Motoqueiro',
    price: 389.9,
    supplierCost: 235.0, // Margem ~39.7%
    image: 'https://img.usecurling.com/p/800/600?q=ventilated%20motorcycle%20jacket&color=black',
    speed: 10.9,
    tag: 'Verão e calor',
    variations: [
      { name: 'Tamanho', options: ['P', 'M', 'G', 'GG', 'XG'] },
      { name: 'Cor', options: ['Preto / Chumbo', 'Preto com Detalhes Vermelhos'] },
    ],
    features: [
      'Marca ASW nacional líder esportiva',
      'Malha Mesh 3D com fluxo de vento contínuo',
      'Refletivos de alta visibilidade 360°',
      'Ajustes ergonômicos nos braços e cintura',
    ],
  },
  {
    id: 'bota-motoboy-impermeavel-reforcada',
    name: 'Bota Motoboy Impermeável Reforçada com Biqueira e Solado Antióleo',
    brand: 'Pro Tork',
    warranty: '3 meses contra descolamento de sola e costura com NF',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para motociclistas e entregadores (37 a 44)'],
    description:
      'Cano médio em microfibra automotiva impermeável, protetor de marcha emborrachado e sola com canais de drenagem anti-escorregão.',
    fullDescription:
      'Desenvolvida para aguentar 12 a 14 horas de corre contínuo nas ruas brasileiras. O solado de borracha vulcanizada é imune a poças de óleo em postos de combustível e paralelepípedos molhados. Proteção acolchoada nos tornozelos e fechamento rápido lateral com zíper e lapela de proteção.',
    category: 'Equipamento do Motoqueiro',
    price: 249.9,
    supplierCost: 150.0, // Margem ~40.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20waterproof%20boots&color=black',
    speed: 15.1,
    tag: 'Essencial trabalho',
    highlight: true,
    variations: [{ name: 'Numeração', options: ['38', '39', '40', '41', '42', '43', '44'] }],
    features: [
      'Microfibra hidrofugada resistente à lama',
      'Solado antiderrapante vulcanizado',
      'Protetor de marcha com reforço duplo',
      'Zíper lateral com vedação impermeável',
    ],
  },
  {
    id: 'oculos-antiembacante-x11',
    name: 'Óculos Antiembaçante X11 com Lente Convexa UV400 e Tira Elástica',
    brand: 'X11',
    warranty: '3 meses contra defeito de fabricação (garantia X11)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para capacetes abertos, de cross e articulados'],
    description:
      'Lente em policarbonato com tratamento anti-risco e anti-embaçamento que elimina vapor em paradas de semáforo.',
    fullDescription:
      'Essencial para quem pilota de capacete aberto ou modelo cross nas entregas. O óculos X11 veda perfeitamente os olhos contra poeira fina, fuligem de ônibus e insetos em vias expressas. Espuma de contorno anatômico com orifícios de ventilação indireta.',
    category: 'Equipamento do Motoqueiro',
    price: 89.9,
    supplierCost: 52.0, // Margem ~42.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20goggles&color=gray',
    speed: 23.4,
    tag: 'Visão limpa',
    variations: [
      {
        name: 'Cor da Lente',
        options: ['Cristal Transparente Antirreflexo', 'Fumê Solar UV400', 'Amarela Noturna'],
      },
    ],
    features: [
      'Tratamento químico antiembaçante permanente',
      'Tira elástica com filetes de silicone antiderrapante',
      'Proteção contra impactos de cascalho e insetos',
      'Marca X11 consagrada',
    ],
  },
  {
    id: 'capa-chuva-emborrachada-pro-tork',
    name: 'Capa de Chuva Emborrachada Conjunto Calça + Jaqueta com Capuz Pro Tork',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de vulcanização e costura',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal (tamanhos P, M, G, GG, XG)'],
    description:
      'PVC laminado 100% vulcanizado com costuras seladas a quente, elásticos reforçados e faixas refletivas homologadas.',
    fullDescription:
      'O conjunto mais durável para tempestades urbanas. Confeccionado em PVC emborrachado com solda eletrônica contínua que não permite a passagem de uma única gota. Fechamento da jaqueta com zíper duplo e lapela com velcro impermeável, punhos elásticos e gola alta com capuz embutido.',
    category: 'Equipamento do Motoqueiro',
    price: 119.9,
    supplierCost: 68.0, // Margem ~43.3%
    image: 'https://img.usecurling.com/p/800/600?q=raincoat%20motorcycle%20suit&color=yellow',
    speed: 27.6,
    tag: 'Campeão em dias de chuva',
    highlight: true,
    variations: [
      { name: 'Tamanho', options: ['P', 'M', 'G', 'GG', 'XG'] },
      { name: 'Cor', options: ['Preto com Faixa Prata', 'Amarelo Fluo de Alta Visibilidade'] },
    ],
    features: [
      '100% impermeável em PVC vulcanizado',
      'Costuras com selagem eletrônica a quente',
      'Refletivo 3M para chuva noturna',
      'Zíper reforçado com canaleta anticondensação',
    ],
  },
  {
    id: 'kit-chuva-motoboy-premium',
    name: 'Kit Chuva Motoboy Premium (Conjunto Impermeável + Polaina + Luva Emborrachada)',
    brand: 'Pro Tork',
    warranty: '3 meses contra defeito de fabricação com nota fiscal',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para pilotos urbanos'],
    description:
      'Blindagem total contra chuva dos pés à cabeça: calça, jaqueta termoselada, par de polainas para botas e luva emborrachada.',
    fullDescription:
      'O kit definitivo para não molhar as meias nem as mãos nas entregas sob chuva torrencial. Combina o conjunto emborrachado Pro Tork com polainas de sola antiderrapante para vestir sobre o calçado e luvas térmicas revestidas de látex corrugado de alta pega na manete.',
    category: 'Equipamento do Motoqueiro',
    price: 189.9,
    supplierCost: 110.0, // Margem ~42.1%
    image: 'https://img.usecurling.com/p/800/600?q=waterproof%20motorcycle%20gear&color=black',
    speed: 19.3,
    tag: 'Kit completo chuva',
    highlight: true,
    variations: [
      {
        name: 'Tamanho do Conjunto',
        options: ['M (Veste calçado 38-40)', 'G (Veste calçado 41-43)', 'GG (Veste calçado 43-45)'],
      },
    ],
    features: [
      'Conjunto calça + jaqueta com capuz selado',
      'Par de polainas com solado vulcanizado inclusas',
      'Par de luvas impermeáveis de alta pega',
      'Economia de tempo e dinheiro em compra única',
    ],
  },
  {
    id: 'intercomunicador-bluetooth-duo',
    name: 'Intercomunicador Bluetooth Duo (Par Piloto + Garupa / Piloto a Piloto)',
    brand: 'Magnetron',
    warranty: '6 meses contra defeito elétrico de fabricação',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    compatibleModels: ['Universal para quaisquer modelos de capacetes'],
    description:
      'Kit completo com 2 unidades pareadas para conversa simultânea até 1.000m, som HD estéreo, rádio FM e comando por voz.',
    fullDescription:
      'Aumente o ticket médio da cesta oferecendo o pacote duplo para casais ou duplas de entrega. Comunicação em tempo real full-duplex sem precisar apertar botões enquanto pilota, cancelamento de ruído DSP contra rajadas de vento até 120 km/h e compatibilidade com Siri/Google Assistente.',
    category: 'Equipamento do Motoqueiro',
    price: 449.9,
    supplierCost: 270.0, // Margem ~40.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20intercom%20pair&color=blue',
    speed: 8.7,
    tag: 'Par duplo Bluetooth',
    highlight: true,
    variations: [
      { name: 'Pacote', options: ['Duo (2 Aparelhos Completos com Fones e Microfones)'] },
    ],
    features: [
      'Alcance de até 1.000 metros de comunicação',
      'Bateria com 20 horas de conversação contínua',
      'Resistente à chuva torrencial padrão IP67',
      'Atendimento automático de chamadas telefônicas',
    ],
  },
  {
    id: 'bateria-moto-cg-factor-12v-selada',
    name: 'Bateria Moto 12V Selada Livre de Manutenção — CG 160 / Factor 150 / Biz 125',
    brand: 'Magnetron',
    warranty: '9 meses de garantia nacional com certificado de fábrica',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start/Cargo (2016-2024)',
      'Honda CG 150 Titan/Fan (2004-2015)',
      'Honda Biz 125 / Biz 110i (2006-2024)',
      'Yamaha Factor 125/150 (2014-2024)',
      'Yamaha Fazer 150 (2014-2024)',
      'Honda Pop 110i / Pop 100',
    ],
    description:
      'Tecnologia AGM VRLA selada e ativada de fábrica. Partida instantânea no primeiro toque, sem vazamentos de ácido.',
    fullDescription:
      'Item de reposição emergencial que não pode esperar. Quando a bateria da moto arria, o motoboy fica sem trabalhar. Fornecida pronta para uso imediato pela Magnetron, livre de manutenção, com alta corrente de partida a frio (CCA) garantida mesmo em dias congelantes.',
    category: 'Equipamento do Motoqueiro',
    price: 179.9,
    supplierCost: 115.0, // Margem ~36.1%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20battery%2012v&color=black',
    speed: 26.2,
    tag: 'Item de urgência: troca imediata',
    highlight: true,
    urgentItem: true,
    variations: [
      {
        name: 'Amperagem / Modelo',
        options: [
          '5Ah 12V (CG 160 / Factor 150 / Biz 125)',
          '6Ah 12V Reforçada (Para motos com rastreador/farol auxiliar)',
          '4Ah 12V (Pop 110i / CG 125 sem partida elétrica)',
        ],
      },
    ],
    features: [
      'Garantia estendida de 9 meses Magnetron',
      'Tecnologia AGM ativada e selada de fábrica',
      'Despacho prioritário para retorno ágil às ruas',
      'Alta amperagem de partida a frio',
    ],
  },
  {
    id: 'pneu-traseiro-cg-160-factor-150-mag',
    name: 'Pneu Traseiro 90/90-18 Tubeless — CG 160 Titan/Fan & Factor 150',
    brand: 'Pro Tork',
    warranty: '5 anos contra defeitos de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan / Fan / Start / Cargo (Roda Traseira Aro 18)',
      'Honda CG 150 Titan / Fan / Job (Roda Traseira Aro 18)',
      'Yamaha Factor 125 / 150 / YBR (Roda Traseira Aro 18)',
      'Yamaha Fazer 150 (Roda Traseira Aro 18)',
      'Suzuki Yes 125 / GSR 150i',
    ],
    description:
      'Composto de sílica de alta aderência em asfalto molhado. Índice de carga 57P (suporta garupa e baú pesado de entrega).',
    fullDescription:
      'O item chave número 1 de reposição rápida e recompra previsível: o motoboy profissional troca o pneu traseiro a cada 8 a 12 mil km rodados. Com desenho otimizado de drenagem que expulsa a lâmina d’água sob frenagem brusca, este pneu suporta o asfalto castigado das cidades brasileiras com alta resistência a furos e cortes.',
    category: 'Equipamento do Motoqueiro',
    price: 199.9,
    supplierCost: 125.0, // Margem ~37.5%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20tire%20tread&color=black',
    speed: 31.8,
    tag: 'Reposição rápida (troca a cada 8-12k km)',
    highlight: true,
    quickReplacementKeyItem: true,
    variations: [
      {
        name: 'Aplicação e Medida',
        options: [
          '90/90-18 Traseiro (Sem Câmara / Tubeless)',
          '90/90-18 Traseiro (Com Câmara TT)',
          '80/100-18 Dianteiro Compatível',
        ],
      },
    ],
    features: [
      'Item chave de recompra recorrente a cada 8-12 mil km',
      'Composto reforçado para peso de entregador com baú',
      'Sulcos de drenagem de alta precisão anti-aquaplanagem',
      'Homologação INMETRO de segurança',
    ],
  },
  {
    id: 'kit-revisao-motoboy-10-mil-km',
    name: 'Kit Revisão Motoboy 10 Mil Km (Óleo Semissintético + Filtro de Ar + Lubrificante de Corrente)',
    brand: 'Cobreq / Vaz',
    warranty: '3 meses com nota fiscal e lacres de fábrica',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'nucleo-250cc',
    compatibleModels: [
      'Honda CG 160 Titan/Fan/Start (todos os anos)',
      'Honda CG 150 Titan (todos os anos)',
      'Yamaha Factor 150 / Fazer 150 (com filtro específico)',
      'Honda Biz 125',
    ],
    description:
      'Tudo para a manutenção periódica essencial: 2 litros de óleo 10W30 JASO MA2, elemento filtrante de ar novo e spray lubrificante graxa branca.',
    fullDescription:
      'Cesta prática de alta frequência de compra: a cada 2 a 3 meses todo motoboy ativo precisa trocar o óleo do motor, substituir o filtro saturado de poeira e manter a corrente lubrificada para evitar desgaste precoce do kit relação. Economia no frete unificado da distribuidora.',
    category: 'Equipamento do Motoqueiro',
    price: 129.9,
    supplierCost: 78.0, // Margem ~40.0%
    image:
      'https://img.usecurling.com/p/800/600?q=motorcycle%20engine%20oil%20maintenance&color=black',
    speed: 35.4,
    tag: 'Revisão periódica',
    highlight: true,
    quickReplacementKeyItem: true,
    variations: [
      {
        name: 'Aplicação da Moto',
        options: [
          'CG 160 / CG 150 (Óleo 10W30 + Filtro CG)',
          'Yamaha Factor 150 / Fazer 150 (Óleo 20W50 Yamalube + Filtro)',
          'Biz 125 / Pop 110i',
        ],
      },
    ],
    features: [
      '2 frascos de óleo semissintético homologado',
      'Elemento filtrante de ar de alta retenção',
      'Spray de lubrificação de corrente com alta aderência',
      'Recompra natural a cada 3.000 a 10.000 km',
    ],
  },

  // --- BLOCO: Camada 250–450cc (Ticket Maior, Menos Concorrência, Segmento em Alta) ---
  {
    id: 'pastilha-freio-sinterizada-cb500-ninja400-dominar400-cobreq',
    name: 'Jogo de Pastilhas Sinterizadas Racing Dianteiras — Dominar 400 / Ninja 400 / CB 500F',
    brand: 'Cobreq',
    warranty: '3 meses contra defeito de fabricação (garantia Cobreq com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Bajaj Dominar 400 (2022 a 2025)',
      'Kawasaki Ninja 400 / Z400 (2019 a 2024)',
      'Honda CB 500F / CB 500X (2014 a 2023)',
      'Yamaha MT-03 / YZF-R3 (2016 a 2024)',
    ],
    description:
      'Composto sinterizado de alta fricção Cobreq Racing para pinças de freio dianteiras de 300cc a 450cc.',
    fullDescription:
      'Projetada para a nova geração de médias cilindradas (300 a 450cc). O composto metálico sinterizado da Cobreq entrega frenagem cirúrgica e resistência a fading em velocidades de rodovia, suportando temperaturas acima de 600°C sem perda de coeficiente de atrito. Encaixe direto nas pinças ByBre e Nissin.',
    category: 'Peças',
    price: 149.9,
    supplierCost: 88.0, // Margem ~41.3%
    image: 'https://img.usecurling.com/p/800/600?q=racing%20brake%20pads%20motorcycle&color=gray',
    speed: 16.4,
    tag: 'Camada 250–450cc',
    highlight: true,
    variations: [
      {
        name: 'Aplicação Dianteira',
        options: [
          'Dominar 400 (Pinça ByBre Radial)',
          'Kawasaki Ninja 400 / Z400',
          'Honda CB 500F / CB 500X',
          'Yamaha MT-03 / R3',
        ],
      },
    ],
    features: [
      'Cobreq Racing Sinterizada metálica',
      'Frenagem de alta performance sem fading térmico',
      'Compatível com pinças radiais modernas',
      'Garantia de 3 meses com nota fiscal',
    ],
  },
  {
    id: 'kit-relacao-cb300-twister250-xr300-vaz-extreme',
    name: 'Kit Relação Transmissão Aço 1045 Extreme — CB 300F Twister / Twister 250 / XR 300 Tornado',
    brand: 'Vaz',
    warranty: '3 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Honda CB 300F Twister (2023 a 2025)',
      'Honda CB 250F Twister (2016 a 2022)',
      'Honda XR 300L Tornado (2024 a 2025)',
      'Honda XRE 300 / XRE 300 Rally (2010 a 2023)',
      'Yamaha Fazer 250 / FZ25 (2018 a 2024)',
    ],
    description:
      'Kit Vaz Extreme em aço 1045 com coroa temperada por indução e corrente reforçada 520H com emenda.',
    fullDescription:
      'Kit relação desenvolvido especificamente para motores de 250cc a 300cc que geram torque elevado. Aço 1045 certificado com tratamento térmico de revenimento nas bordas dos dentes para suportar arrancadas fortes sem deformação. Inclui coroa reforçada, pinhão usinado e corrente 520H de passo grosso.',
    category: 'Peças',
    price: 249.9,
    supplierCost: 152.0, // Margem ~39.2%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20chain%20sprockets&color=black',
    speed: 18.2,
    tag: 'Camada 250–450cc',
    highlight: true,
    variations: [
      {
        name: 'Modelo da Moto',
        options: [
          'CB 300F Twister (2023-2025)',
          'CB 250F Twister (2016-2022)',
          'XRE 300 / XR 300 Tornado',
          'Yamaha Fazer 250 / FZ25',
        ],
      },
      {
        name: 'Tipo de Corrente',
        options: ['Passo 520H Reforçada Sem Retentor', 'Passo 520H com Retentor O-Ring Selado'],
      },
    ],
    features: [
      'Marca Vaz líder nacional em transmissão',
      'Passo robusto 520H para alto torque',
      'Coroa temperada por indução térmica',
      'Garantia legal de 3 meses com procedência',
    ],
  },
  {
    id: 'corrente-520h-retentor-o-ring-vaz',
    name: 'Corrente de Transmissão 520H x 120 Elos com Retentor O-Ring — Dominar 400 / Himalayan 450 / Lander 250',
    brand: 'Vaz',
    warranty: '3 meses contra defeito de fabricação (garantia de fábrica com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Royal Enfield Himalayan 450 (2024 a 2025)',
      'Bajaj Dominar 400 (2022 a 2025)',
      'Yamaha Lander 250 ABS (2019 a 2024)',
      'Honda CB 300F / Twister 250',
      'Kawasaki Ninja 400 (2019 a 2024)',
    ],
    description:
      'Corrente de passo grosso 520H com retentores O-ring selados que preservam a graxa interna sob chuva e poeira.',
    fullDescription:
      'Essencial para motos do segmento 300cc a 450cc que rodam em viagens e uso misto asfalto/terra (Himalayan 450, Lander 250 e Dominar 400). Os anéis retentores O-ring mantêm a lubrificação de fábrica permanentemente vedada dentro dos pinos, reduzindo em 70% a necessidade de esticar a corrente e triplicando a vida útil.',
    category: 'Peças',
    price: 189.9,
    supplierCost: 114.0, // Margem ~39.9%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20chain%20o-ring&color=gray',
    speed: 14.8,
    tag: 'Camada 250–450cc',
    highlight: true,
    variations: [
      {
        name: 'Comprimento',
        options: [
          '120 Elos com Emenda de Rebite/Trava',
          '116 Elos Medida Dominar 400 / Lander',
          '122 Elos Himalayan 450',
        ],
      },
    ],
    features: [
      'Retentores O-Ring de alta durabilidade',
      'Passo 520H reforçado anti-alongamento',
      'Resistência superior a 3.400 kgf de tração',
      'Garantia de 3 meses com nota fiscal',
    ],
  },
  {
    id: 'protetor-motor-carenagem-stunt-lander-xre300-dominar',
    name: 'Protetor de Motor e Carenagem com Pedaleiras Retráteis — Lander 250 / XRE 300 / Dominar 400',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito estrutural e solda',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Yamaha Lander 250 ABS (2019 a 2025)',
      'Honda XRE 300 / XRE 300 Rally (2010 a 2023)',
      'Bajaj Dominar 400 (2022 a 2025)',
      'Honda CB 300F Twister (2023 a 2025)',
      'Royal Enfield Himalayan 450 (2024 a 2025)',
    ],
    description:
      'Gaiola protetora em tubo de aço carbono 1 polegada que evita a destruição de carenagens e tampas de motor em tombos.',
    fullDescription:
      'O filão da queda na camada 250-450cc: as carenagens de tanque e tampas laterais destas motos custam fortunas na concessionária. Este protetor Pro Tork absorve 100% do impacto lateral em tombos parados ou escorregões no asfalto. Acompanha pedaleiras de descanso para descanso de pernas em viagens longas.',
    category: 'Proteção',
    price: 349.9,
    supplierCost: 210.0, // Margem ~40.0%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20crash%20bars&color=black',
    speed: 12.1,
    tag: 'Camada 250–450cc',
    highlight: true,
    isSafetyCrash: true,
    variations: [
      {
        name: 'Compatibilidade da Moto',
        options: [
          'Yamaha Lander 250 (2019-2025)',
          'Honda XRE 300 / Rally',
          'Bajaj Dominar 400',
          'Himalayan 450',
        ],
      },
      {
        name: 'Pintura',
        options: ['Preto Fosco Eletrostático Epóxi', 'Cinza Metálico Tubular'],
      },
    ],
    features: [
      'Tubo de aço carbono 1 polegada reforçado',
      'Salva carenagens caras em tombos leves',
      'Pedaleiras retráteis de conforto inclusas',
      'Fixação direta no chassi sem furos',
    ],
  },
  {
    id: 'retentor-garfo-dianteiro-bucha-balanca-lander-xre300-nakata',
    name: 'Kit Retentores de Bengala + Guarda-Pó 41mm Nakata — Lander 250 / XRE 300 / Dominar 400',
    brand: 'Nakata',
    warranty: '3 meses contra defeito de fabricação (garantia Nakata com NF)',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Yamaha Lander 250 / Tenere 250 (41mm)',
      'Honda XRE 300 / XR 300 Tornado (41mm)',
      'Bajaj Dominar 400 (Garfo Invertido 43mm)',
      'Honda CB 300R / CB 300F (37mm / 41mm)',
    ],
    description:
      'Par de retentores de alta pressão com mola dupla em aço inox Nakata para suspensões dianteiras de curso longo.',
    fullDescription:
      'As motos de 250cc a 450cc possuem garfos dianteiros de diâmetro maior (41mm a 43mm) e curso longo que operam sob alta pressão de óleo. Fabricados pela Nakata com lábio duplo e anel elástico de mola de aço inox, vedam com perfeição contra poeira de trilha e impactos de buracos urbanos.',
    category: 'Peças',
    price: 69.9,
    supplierCost: 38.0, // Margem ~45.6%
    image: 'https://img.usecurling.com/p/800/600?q=fork%20seals%20suspension&color=black',
    speed: 17.5,
    tag: 'Camada 250–450cc',
    variations: [
      {
        name: 'Medida / Aplicação',
        options: [
          '41 x 53 x 8/10,5mm (Lander 250 / XRE 300 / Tenere)',
          '43 x 54 x 11mm (Bajaj Dominar 400 Invertida)',
          '37 x 50 x 11mm (CB 300F / Twister 250)',
        ],
      },
    ],
    features: [
      'Marca Nakata especialista em suspensão',
      'Molas duplas em aço inoxidável',
      'Vedação de alta pressão para curso longo',
      'Garantia de 3 meses contra vazamentos',
    ],
  },
  {
    id: 'bau-traseiro-givi-style-45l-trava-rapida-pro-tork',
    name: 'Baú Traseiro Bauleto 45L Adventure Givi-Style com Base Universal — Linha 250cc a 450cc',
    brand: 'Pro Tork',
    warranty: '6 meses contra defeito de fabricação com nota fiscal',
    origin: 'Produto nacional — fornecedor distribuidora brasileira',
    displacementLayer: 'camada-250-450cc',
    compatibleModels: [
      'Universal para bagageiros de Lander 250, XRE 300, Himalayan 450, CB 300F e Dominar 400',
    ],
    description:
      'Bauleto reforçado estilo aventura com capacidade de 45 litros (comporta 2 capacetes ou bagagem de viagem de fim de semana).',
    fullDescription:
      'O acessório de maior giro e ticket no segmento de 250cc a 450cc. Motociclistas de Lander, XRE 300, Himalayan 450 e Dominar 400 usam a moto tanto no dia a dia urbano quanto na estrada nos fins de semana. Construído em polipropileno de alto impacto com lente refletiva fumê, sistema de desengate rápido Monokey-style com 1 clique e 2 chaves.',
    category: 'Carga/Entrega',
    price: 289.9,
    supplierCost: 172.0, // Margem ~40.7%
    image: 'https://img.usecurling.com/p/800/600?q=motorcycle%20top%20case%20box&color=black',
    speed: 15.3,
    tag: 'Camada 250–450cc',
    highlight: true,
    variations: [
      {
        name: 'Capacidade',
        options: ['45 Litros Adventure (2 Capacetes)', '35 Litros Compacto Urbano'],
      },
      {
        name: 'Refletivo',
        options: ['Lente Fumê Escuro Esportivo', 'Lente Vermelha Tradicional'],
      },
    ],
    features: [
      'Comporta 2 capacetes fechados com folga',
      'Base de engate rápido e ferragens inclusas',
      'Polipropileno virgem imune a trincas de vibração',
      'Fechamento hermético com borracha anti-chuva',
    ],
  },
]

export interface SuggestedProduct {
  id: string
  name: string
  description: string
  estimatedPrice: number
  supplierCost: number
  probability: 'Alta probabilidade' | 'Média probabilidade'
  niche: string
  averageMargin: string
  steps: {
    title: string
    description: string
  }[]
}

export const INTERNET_SUGGESTED_PRODUCTS: SuggestedProduct[] = [
  {
    id: 'suporte-celular-antivibracao-moto',
    name: 'Suporte de Celular com Amortecedor de Vibração Mecânico',
    description:
      'Protege a câmera do iPhone e smartphones premium contra quebra do estabilizador ótico causada pela vibração do motor da moto.',
    estimatedPrice: 119.9,
    supplierCost: 45.0,
    probability: 'Alta probabilidade',
    niche: 'Tecnologia & Acessórios de Moto',
    averageMargin: '62%',
    steps: [
      {
        title: '1. Localize o importador ou fornecedor nacional',
        description:
          'Procure no atacado do Mercado Livre ou distribuidoras em SP (custo médio de R$ 38,00 a R$ 48,00 por peça para envio direto).',
      },
      {
        title: '2. Crie anúncio focado na dor do cliente',
        description:
          'Destaque o problema real: "A vibração da moto queima o foco da câmera do seu iPhone. Este suporte com 4 amortecedores de elastômero protege o sensor".',
      },
      {
        title: '3. Divulgue com vídeo demonstrativo de 15s',
        description:
          'Grave um vídeo acelerando a moto e mostrando como a haste balança mas o celular fica perfeitamente imóvel e sem ressonância.',
      },
      {
        title: '4. Receba o pedido no app e repasse ao fornecedor',
        description:
          'O cliente paga R$ 119,90 no seu checkout. Você repassa o pedido com o endereço do cliente ao fornecedor por R$ 45,00 e embolsa R$ 74,90 líquidos.',
      },
      {
        title: '5. Cole o código de rastreio e acompanhe a entrega',
        description:
          'Assim que o fornecedor postar, insira o rastreio no painel para que o cliente acompanhe a chegada até a sua porta.',
      },
    ],
  },
  {
    id: 'trava-disco-com-alarme-110db',
    name: 'Trava de Freio a Disco com Alarme Sonoro de 110dB e Sensor de Choque',
    description:
      'Alarme estrondoso que dispara imediatamente ao toque ou movimentação da moto, corpo maciço em aço inoxidável e cabo lembrete.',
    estimatedPrice: 79.9,
    supplierCost: 32.0,
    probability: 'Alta probabilidade',
    niche: 'Segurança & Proteção de Motos',
    averageMargin: '60%',
    steps: [
      {
        title: '1. Encontre o fornecedor dropshipping com estoque nacional',
        description:
          'Distribuidoras de segurança veicular despacham a trava por R$ 28,00 a R$ 34,00 a unidade com baterias sobressalentes inclusas.',
      },
      {
        title: '2. Preço de entrada competitivo',
        description:
          'Oferte por R$ 79,90 com o cabo espiral vermelho de aviso incluso. Lojas físicas de moto-peças cobram facilmente de R$ 120,00 a R$ 150,00.',
      },
      {
        title: '3. Demonstração prática do volume sonoro',
        description:
          'Mostre em vídeo curto a sensibilidade do sensor e a sirene de 110 decibéis assustando qualquer tentativa de furto em estacionamentos.',
      },
      {
        title: '4. Venda em grupos de motoboys e motoclubes locais',
        description:
          'Divulgue o link direto no WhatsApp e grupos de bairros onde furtos de motos são frequentes. A conversão de segurança é altíssima.',
      },
      {
        title: '5. Automatize o despacho',
        description:
          'Transfira os dados de entrega em segundos ao fornecedor e mantenha o cliente informado da expedição.',
      },
    ],
  },
  {
    id: 'antena-corta-pipa-retratil',
    name: 'Antena Corta-Pipa Retrátil em Aço Inox com Lâmina Dupla',
    description:
      'Item obrigatório de segurança que corta linha chilena e cerol antes que atinjam o peito e o pescoço do motociclista.',
    estimatedPrice: 39.9,
    supplierCost: 13.5,
    probability: 'Alta probabilidade',
    niche: 'Segurança Obrigatória para Motos',
    averageMargin: '66%',
    steps: [
      {
        title: '1. Encontre o fabricante nacional',
        description:
          'Fabricantes do interior de SP e MG vendem no atacado ou dropship direto a R$ 12,00 a R$ 15,00 o kit completo com braçadeira de guidão.',
      },
      {
        title: '2. Oferte em kits para aumentar o ticket',
        description:
          'Anuncie a unidade por R$ 39,90 ou "Par de antenas para guidão completo por R$ 69,90", gerando margem dobrada na mesma entrega.',
      },
      {
        title: '3. Foque no apelo de preservação de vida',
        description:
          'Destaque nos anúncios a lâmina chanfrada que rompe cerol instantaneamente. Item de compra emocional imediata para quem tem filhos e parceiros motociclistas.',
      },
      {
        title: '4. Repasse de encomenda',
        description:
          'Ao receber o pedido na Terrenotech, faça o pedido no fornecedor parceiro com a etiqueta de envio do destinatário.',
      },
      {
        title: '5. Ganhe escala de giro',
        description:
          'Por ser um item barato e de altíssima necessidade nos meses de vento e férias, a velocidade ultrapassa facilmente 25 unidades/dia.',
      },
    ],
  },
  {
    id: 'capa-termica-banco-moto-ventilada',
    name: 'Capa Térmica 3D Ventilada para Banco de Moto Antiaquecimento',
    description:
      'Malha espacial respirável que impede o banco preto de queimar sob o sol escaldante e drena a água da chuva ao sentar.',
    estimatedPrice: 49.9,
    supplierCost: 18.0,
    probability: 'Média probabilidade',
    niche: 'Conforto & Acessórios Diários',
    averageMargin: '64%',
    steps: [
      {
        title: '1. Mapeie fornecedores com pronta entrega nos tamanhos M/G/GG',
        description:
          'Fornecedores têxteis automotivos enviam por R$ 16,00 a R$ 20,00 por peça para modelos CG 160, Factor, Bros e PCX.',
      },
      {
        title: '2. Oferte na temperatura certa',
        description:
          'Destaque no calor: "Nunca mais queime as pernas no banco quente sob o sol das 13h". No inverno, destaque a drenagem sem molhar a calça.',
      },
      {
        title: '3. Vídeo do teste da água e do calor',
        description:
          'Jogue água sobre o banco com a capa mostrando o líquido caindo direto sem acumular poça sob o motociclista.',
      },
      {
        title: '4. Conclusão no sistema',
        description:
          'Registre os pedidos, pague o fornecedor pelo PIX com o dinheiro antecipado pelo cliente e marque o pedido como Concluído.',
      },
      {
        title: '5. Fidelize o cliente para outros acessórios',
        description:
          'Ofereça a balaclava ou a luva como oferta de pós-venda para quem comprou a capa de banco.',
      },
    ],
  },
]
