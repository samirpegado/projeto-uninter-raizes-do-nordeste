export interface ItemCardapio {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
  categoria: string
}

export interface Cardapio {
  id: string
  nome: string
  itens: ItemCardapio[]
}

import baiaoImg from '../assets/cardapio/baiao-dois.png'
import carneSolImg from '../assets/cardapio/carne-sol-macaxeira.png'
import tapiocaImg from '../assets/cardapio/tapioca-rechedada.png'
import buchadadImg from '../assets/cardapio/buchada-bode.png'
import caldoMocotoImg from '../assets/cardapio/caldo-mocoto.png'
import sucoUmbuImg from '../assets/cardapio/suco-umbu.png'
import cocadaImg from '../assets/cardapio/cocada-forno.png'
import caldeiradaImg from '../assets/cardapio/caldeirada-frutos-mar.png'
import aguaCocoImg from '../assets/cardapio/agua-coco.png'

export const cardapios: Cardapio[] = [
  {
    id: 'c-001',
    nome: 'Cardapio Principal',
    itens: [
      {
        id: 'p-001',
        nome: 'Baiao de Dois',
        descricao: 'Prato tipico nordestino com feijao verde, queijo coalho e carne seca desfiada',
        preco: 25.9,
        imagem: baiaoImg,
        categoria: 'Pratos',
      },
      {
        id: 'p-002',
        nome: 'Carne de Sol com Macaxeira',
        descricao: 'Carne de sol grelhada acompanhada de macaxeira cozida e manteiga de garrafa',
        preco: 32.5,
        imagem: carneSolImg,
        categoria: 'Pratos',
      },
      {
        id: 'p-003',
        nome: 'Tapioca Recheada',
        descricao: 'Tapioca com queijo coalho e manteiga de garrafa',
        preco: 12.0,
        imagem: tapiocaImg,
        categoria: 'Lanches',
      },
      {
        id: 'p-004',
        nome: 'Buchada de Bode',
        descricao: 'Prato tradicional nordestino, temperado com ervas e especiarias da regiao',
        preco: 28.0,
        imagem: buchadadImg,
        categoria: 'Pratos',
      },
      {
        id: 'p-005',
        nome: 'Caldo de Mocoto',
        descricao: 'Caldo encorpado feito com pe bovino, temperado com alho e coentro',
        preco: 18.0,
        imagem: caldoMocotoImg,
        categoria: 'Caldos',
      },
      {
        id: 'p-006',
        nome: 'Suco de Umbu',
        descricao: 'Suco natural de umbu, fruta tipica do sertao nordestino',
        preco: 8.0,
        imagem: sucoUmbuImg,
        categoria: 'Bebidas',
      },
      {
        id: 'p-007',
        nome: 'Cocada de Forno',
        descricao: 'Sobremesa tradicional feita com coco ralado e leite condensado',
        preco: 9.5,
        imagem: cocadaImg,
        categoria: 'Sobremesas',
      },
    ],
  },
  {
    id: 'c-002',
    nome: 'Cardapio Fortaleza',
    itens: [
      {
        id: 'p-008',
        nome: 'Caldeirada de Frutos do Mar',
        descricao: 'Caldeirada com camarao, peixe e mariscos frescos do litoral cearense',
        preco: 45.0,
        imagem: caldeiradaImg,
        categoria: 'Pratos',
      },
      {
        id: 'p-009',
        nome: 'Baiao de Dois',
        descricao: 'Prato tipico nordestino com feijao verde, queijo coalho e carne seca desfiada',
        preco: 25.9,
        imagem: baiaoImg,
        categoria: 'Pratos',
      },
      {
        id: 'p-010',
        nome: 'Agua de Coco',
        descricao: 'Agua de coco gelada, direto do coco verde',
        preco: 7.0,
        imagem: aguaCocoImg,
        categoria: 'Bebidas',
      },
    ],
  },
]
