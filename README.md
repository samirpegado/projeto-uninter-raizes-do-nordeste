# Raizes do Nordeste — Front-end

Documentação do projeto Desenvolvimento Front-end.

Uninter - Centro Universitário Internacional

Curso: CST ANÁLISE E DESENVOLVIMENTO DE SISTEMAS - DISTÂNCIA

Aluno: SAMIR PEGADO GOMES

RU: 4616527

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar](#como-rodar)
- [Dados Mockados](#dados-mockados)
- [Fluxos Principais](#fluxos-principais)
- [Componentes](#componentes)
- [Estado Global](#estado-global)
- [LGPD](#lgpd)

---

## Visão Geral

Esse projeto é o front-end da rede de restaurantes **Raizes do Nordeste**. A ideia é simular um sistema real de pedidos, com cliente, admin, totem e pagamento externo — tudo sem backend, usando dados mockados.

Três canais disponíveis:
- **web** — experiência completa, inclusive painel admin
- **mobile** — fluxo simplificado, foco no pedido
- **totem** — direto ao ponto: escolhe, paga, vai embora

Perfis de usuário:
- `cliente` — faz pedido, acompanha status, acumula pontos
- `admin` — gerencia lojas, cardápios, colaboradores e clientes

---

## Tecnologias

- React 18
- Tailwind CSS
- React Router v6
- Context API (estado global)
- Dados mockados em módulos `.ts`

Não tem backend. Tudo é simulado no front.

---

## Estrutura de Pastas

```
src/
├── assets/           # imagens, icones
├── components/       # componentes reutilizaveis
│   ├── ui/           # botoes, inputs, cards genericos
│   └── shared/       # header, footer, loader
├── pages/            # paginas por rota
│   ├── client/       # fluxo do cliente
│   ├── admin/        # painel administrativo
│   └── totem/        # interface do totem
├── services/         # mock services (simulam chamadas de API)
├── store/            # context + reducers
├── data/             # dados mockados
└── utils/            # helpers, formatadores
```

---

## Como Rodar

```bash
npm install
npm run dev
```

Acessa em `http://localhost:5173`

---

## Dados Mockados

Os dados ficam em `src/data/`. Cada arquivo representa uma entidade do sistema.

### usuarios.ts

```js
export const usuarios = [
  {
    id: "u-001",
    nome: "Maria Silva",
    email: "maria@email.com",
    senha: "123456",
    tipo: "cliente",
    telefone: "84999990001",
    loja_id: "l-001",
    pontos: 120,
    aceitou_lgpd: true,
  },
  {
    id: "u-002",
    nome: "Carlos Admin",
    email: "admin@raizes.com",
    senha: "admin123",
    tipo: "admin",
    telefone: "84999990002",
    loja_id: "l-001",
    pontos: 0,
    aceitou_lgpd: true,
  },
];
```

### lojas.ts

```js
export const lojas = [
  {
    id: "l-001",
    nome: "Raizes do Nordeste - Natal",
    endereco: {
      rua: "Rua das Dunas",
      numero: "210",
      cidade: "Natal",
      estado: "RN",
    },
    cardapio_id: "c-001",
  },
  {
    id: "l-002",
    nome: "Raizes do Nordeste - Fortaleza",
    endereco: {
      rua: "Av. Beira Mar",
      numero: "450",
      cidade: "Fortaleza",
      estado: "CE",
    },
    cardapio_id: "c-002",
  },
];
```

### cardapios.ts

```js
export const cardapios = [
  {
    id: "c-001",
    nome: "Cardapio Principal",
    itens: [
      {
        id: "p-001",
        nome: "Baiao de Dois",
        descricao: "Prato tipico nordestino com feijao verde, queijo e carne seca",
        preco: 25.9,
        imagem: baiaoImg,
        categoria: "Pratos",
      },
      {
        id: "p-002",
        nome: "Carne de Sol com Macaxeira",
        descricao: "Carne de sol grelhada acompanhada de macaxeira cozida",
        preco: 32.5,
        imagem: carneSolImg,
        categoria: "Pratos",
      },
    ],
  },
];
```

### pedidos.ts

```js
export let pedidos = [
  {
    id: "ped-001",
    usuario_id: "u-001",
    loja_id: "l-001",
    itens: [
      {
        produto_id: "p-001",
        nome: "Baiao de Dois",
        quantidade: 2,
        preco_unitario: 25.9,
      },
    ],
    total: 51.8,
    status: "preparo",
    pagamento_status: "aprovado",
    data: "2024-11-10T14:32:00Z",
  },
];
```

### fidelidade.ts

```js
export const fidelidade = [
  {
    usuario_id: "u-001",
    pontos: 150,
    nivel: "Bronze",
  },
];
```

---

## Fluxos Principais

### Fluxo do Cliente

```
Login → Seleciona Loja → Vê Cardápio → Adiciona ao Carrinho
     → Checkout → Pagamento (simulado) → Acompanha Pedido → Finaliza
```

O pagamento é simulado numa página separada. O usuário escolhe se aprova ou recusa, o que atualiza o `pagamento_status` no pedido.

### Fluxo Admin

```
Login Admin → Dashboard → Gerencia (lojas / clientes / colaboradores / cardápios)
```

O admin não faz pedido, só gerencia. Para testar, usar `admin@raizes.com` / `admin123`.

### Fluxo Totem

```
Seleciona Produto → Carrinho → Pagamento → Confirmação
```

Sem login, sem histórico. Fluxo direto pensado pra tela touch.

---

## Componentes

Principais componentes e o que cada um faz:

| Componente | Onde fica | Responsabilidade |
|---|---|---|
| `Login` | `pages/client/Login.tsx` | formulário de login e cadastro |
| `StoreSelector` | `pages/client/StoreSelector.tsx` | lista de lojas disponíveis |
| `Menu` | `pages/client/Menu.tsx` | exibe itens do cardápio por categoria |
| `Checkout` | `pages/client/Checkout.tsx` | revisão do pedido antes de pagar |
| `PaymentSimulator` | `pages/PaymentSimulator.tsx` | simulação do gateway de pagamento |
| `OrderStatus` | `pages/client/OrderStatus.tsx` | acompanhamento do pedido |
| `MeusPedidos` | `pages/client/MeusPedidos.tsx` | histórico de pedidos do cliente |
| `Dashboard` | `pages/admin/Dashboard.tsx` | painel administrativo |
| `TotemFlow` | `pages/totem/TotemFlow.tsx` | fluxo completo do totem |
| `LgpdBanner` | `components/shared/LgpdBanner.tsx` | banner de consentimento LGPD |

---

## Estado Global

Usa Context API com três contextos:

```
AuthContext    → usuário logado, tipo, loja_id
CartContext    → itens, total, ações (add, remove, limpar)
OrderContext   → pedido atual e status
```

Exemplo de uso:

```js
import { useCart } from "../../store/CartContext";

function Menu() {
  const { adicionarItem } = useCart();

  function handleAdd(produto) {
    adicionarItem(produto);
  }
}
```

---

## LGPD

Implementações básicas de conformidade com a Lei 13.709/2018:

- checkbox obrigatório no cadastro (`aceitou_lgpd: true`)
- banner de aviso na primeira visita
- link para política de privacidade
- confirmação antes de excluir conta

Se o usuário não aceitar os termos, o botão de cadastro fica desabilitado.

---
