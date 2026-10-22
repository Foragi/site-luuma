# Design System — Cardápio Luuma

## 1. Cores

Paleta alinhada aos tokens existentes em `styles/styles.css` do site principal Luuma. A tela de cardápio usa os mesmos neutros, carvão e cinzas; os vermelhos da referência foram substituídos para manter a identidade do projeto.

| Grupo | Token | HEX | Uso recomendado |
|---|---|---|---|
| Primária | Carvão | `#242424` | Faixa superior, capa e áreas de destaque |
| Primária escura | Preto suave | `#171717` | Títulos, texto principal e categoria ativa |
| Secundária | Cinza claro | `#C9C8C3` | Filetes, bordas e realces discretos |
| Neutro | Papel | `#F1F0EC` | Fundo e superfícies principais |
| Neutro | Texto auxiliar | `#72716E` | Legendas e informação secundária |
| Neutro | Linha | `rgba(23,23,23,.2)` | Separadores e contornos sutis |
| Estado | Hover | `#C9C8C3` | Fundo do link com ponteiro fino; texto carvão |
| Estado | Ativo | `#171717` | Categoria destacada e estados selecionados |
| Estado | Erro | `#A33A32` | Aviso semântico; não usar como cor decorativa |
| Estado | Sucesso | `#3F6B50` | Confirmação semântica; não usar como cor decorativa |

As categorias são links de navegação por âncora até cada seção. Não há ações de pedido, filtros ou modais no cardápio.

## 2. Tipografia

O cardápio reutiliza a família Manrope definida no site principal (`styles/styles.css`), com os mesmos arquivos de fonte e pesos. A hierarquia do hero também segue a página inicial: título grande, peso 438, entrelinha curta e tracking negativo.

| Papel | Família/fallback | Escala | Peso | Altura de linha | Tracking |
|---|---|---:|---:|---:|---:|
| Título do hero | `Manrope`, Arial, sans-serif | `clamp(63px, 9vw, 135px)` | 438 | 0.88 | `-0.075em` |
| Título de seção | `Manrope`, Arial, sans-serif | `clamp(1.35rem, 2.4vw, 1.8rem)` | 700 | 1.08 | 0 |
| Nome do prato | `Manrope`, Arial, sans-serif | 0.72–0.76rem | 700 | 1.3 | 0 |
| Descrição | `Manrope`, Arial, sans-serif | 0.65–0.68rem | 400 | 1.45 | 0 |
| Preço | `Manrope`, Arial, sans-serif | 0.65–0.78rem | 700 | 1.2 | 0 |
| Rótulos e metadados | `Manrope`, Arial, sans-serif | 0.62–0.75rem | 500–600 | 1.35 | `0.02em` |

## 3. Tokens CSS

```css
:root {
  color-scheme: light;
  --color-primary: #242424;
  --color-primary-strong: #171717;
  --color-accent: #c9c8c3;
  --color-paper: #f1f0ec;
  --color-ink: #171717;
  --color-muted: #72716e;
  --color-line: rgba(23, 23, 23, .2);
  --color-error: #a33a32;
  --color-success: #3f6b50;

  --font-display: "Manrope", Arial, sans-serif;
  --font-body: "Manrope", Arial, sans-serif;
  --text-xs: .6875rem;
  --text-sm: .8125rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-section: clamp(1.7rem, 2.8vw, 2rem);
  --text-hero: clamp(63px, 9vw, 135px);

  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  --radius-sm: .125rem;
  --radius-card: .25rem;
  --radius-pill: 999px;
  --shadow-paper: 0 1rem 3rem rgb(23 23 23 / 14%);
  --shadow-photo: 0 .5rem 1.5rem rgb(23 23 23 / 12%);
  --content-max: 1200px;
  --page-gutter: clamp(1rem, 4vw, 3rem);
  --line: 1px solid var(--color-line);
}
```

| Token | Valor | Aplicação |
|---|---:|---|
| `--space-1` | 4 px | Ícone e texto |
| `--space-2` | 8 px | Espaço compacto entre rótulos |
| `--space-3` | 12 px | Conteúdo de navegação |
| `--space-4` | 16 px | Padding de item |
| `--space-6` | 24 px | Separação de blocos |
| `--space-8` | 32 px | Margem entre grupos |
| `--space-12` | 48 px | Seção e capa |
| `--space-16` | 64 px | Intervalos editoriais amplos |

## 4. Layout

| Elemento | Desktop | Tablet | Mobile |
|---|---|---|---|
| Container | Máximo 1200 px, centralizado | 100%, gutter 24 px | 100%, gutter 16 px |
| Cabeçalho | Marca sobreposta à foto, com divisor branco translúcido | Mantém sobreposição e marca | Compacto, alinhado às margens laterais |
| Navegação de categorias | Linha horizontal de células | Grade de cinco colunas | Grade de três colunas, links de âncora |
| Hero | Foto em tela cheia, sombra em gradiente e texto sobreposto | Altura fluida próxima à janela | Imagem reposicionada, título e metadados adaptados |
| Corpo do menu | Apoio lateral estreito + coluna principal | Apoio acima ou ao lado do conteúdo | Uma coluna; apoio precede o conteúdo |
| Itens | Uma coluna editorial com divisórias | Uma coluna | Uma coluna, sem valores truncados |

Breakpoints mobile-first: `600px` e `900px`; conteúdo amplo limitado por `--content-max`. Usar grid CSS com colunas explícitas e `minmax(0, 1fr)` para permitir quebra de texto. A lista do menu é editorial em uma coluna, como na referência, não uma grade de cartões.

## 5. Componentes

| Componente | Aparência/variantes | Estado e regra no cardápio estático |
|---|---|---|
| Botão | A referência usa células de navegação e controles, não CTA de pedido | Não renderizar botões de adicionar, comprar ou filtrar; links externos só aparecem se forem necessários e identificados como links |
| Input | Filtros de alergênicos vistos na referência | Omitido nesta versão estática; não desenhar campo falso |
| Card/item | Nome em caixa alta, descrição curta, preço alinhado; porções meia e inteira em dois painéis paralelos com quantidade e preço | Item de leitura sem borda arredondada; separadores cinza sutis e opções comparáveis sem aparência de controle |
| Navegação | Faixa de categorias com categoria destacada em carvão e células sobre papel | Links de âncora para as seções; foco visível e rolagem suave, respeitando movimento reduzido |
| Badge | Círculo de contorno para informação dietética/alergênica | Exibir apenas os identificadores documentados no PDF; acompanhar ícone com texto alternativo/legenda |
| Modal | Não aparece no fluxo de leitura essencial | Não usar |
| Hero | Foto em tela cheia, título Manrope grande, metadados e chamada para explorar | Imagem com texto alternativo; chamada leva à primeira categoria |
| Painel de apoio | Superfície papel, texto carvão e linhas cinza | Pode acolher nota editorial; não usar como filtro interativo |

## 6. Responsividade

Mobile-first. No mobile, manter o hero fotográfico em tela cheia, reposicionar a imagem e reduzir a escala do título e metadados; a navegação usa três colunas e a sidebar desaparece. No tablet, a navegação usa cinco colunas e o índice lateral sobe para antes do conteúdo. No desktop, usar sidebar de apoio e coluna de menu. Em todas as larguras, manter o preço junto ao prato correspondente e deixar descrições quebrarem naturalmente.

## 7. Usabilidade e acessibilidade

- Hierarquia semântica única: `h1` para o título, `h2` para categorias e `h3` para pratos.
- Usar texto real e selecionável; nome, descrição, preço e marcador dietético não podem depender só da imagem do PDF.
- Contraste mínimo WCAG AA: 4.5:1 para texto normal e 3:1 para texto grande. Confirmar as combinações finais; os HEX foram estimados visualmente.
- Links funcionais devem ter foco de teclado evidente e área de toque de pelo menos 44 × 44 px.
- Categorias são links de âncora nativos, com foco visível e área de toque confortável; não usar `role="tab"`.
- Marcadores de alergênicos precisam de uma legenda textual; nunca comunicar segurança alimentar apenas por cor ou ícone.
- Fornecer texto alternativo para fotos de pratos; imagens decorativas usam `alt=""`.
- O PDF é uma digitalização longa sem camada de texto; nomes, descrições e preços foram conferidos visualmente em ampliações e transcritos como texto HTML selecionável.

## 8. Direção de imagens

Usar fotografia gastronômica real, de mesa compartilhada e ambiente acolhedor. Na capa, recorte horizontal amplo com pessoas e pratos, mantendo o ponto de interesse na metade direita; overlay orgânico vermelho pode invadir a borda, sem cobrir rostos ou alimentos. Não aplicar filtro que altere a cor dos pratos. Na listagem, preferir imagens horizontais ou quadradas com enquadramento consistente, caso existam no PDF ou no acervo local. Ícones de categorias são lineares, pequenos, vermelhos e centralizados nas células. Não substituir imagens inexistentes por banco genérico.

## 9. Regras de implementação

- Classes em kebab-case (`menu-hero`, `menu-section`, `menu-item`); tokens semânticos com prefixo `--color-`, `--font-` e `--space-`.
- Preservar o conteúdo de `assets/docs/www_luumagastrobar.com.pdf`; conferir transcrição, nomes e valores com a digitalização antes de editar. Não acrescentar itens, preços, alergênicos ou horários por suposição.
- Não implementar busca, filtro, seleção de categoria, tabs, carrinho, pedido ou CTA de compra. A navegação de categorias é apenas visual nesta versão.
- Reservar GSAP para entrada breve de elementos decorativos de capa. Não animar pratos, preços ou texto de leitura. Curva de entrada `cubic-bezier(0.23, 1, 0.32, 1)`, até 250 ms, propriedades `transform` e `opacity`, e variante sem deslocamento para `prefers-reduced-motion`.
- Integrar Lenis ao ticker GSAP para a rolagem da página e desligar o movimento suave sob `prefers-reduced-motion`.
- Evitar `transition: all`, paralaxe, animação contínua, imagem com texto incorporado e alturas fixas que cortem o conteúdo.
