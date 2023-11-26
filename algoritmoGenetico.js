// besouro = [51, 51, 51]

/*

Estrutura do Algoritmo

  - Inicialização da população - v
  - Avaliação dos indivíduos/Fitness - v
  - Seleção dos indivíduos
  - Cross-over e Mutação
  - Concepção da nova geração

fitness

  -soma dos valores RGB, ex: [51, 51, 51] = 1 - 153 / 1000
  - valor máximo 0.765
  - Quanto maior o valor, mais apto o individuo

*/

import Individuo from './Individuo.js'

export default class AlgoritmoGenetico{
  constructor(tamanhoPopulacao){
    this.tamanhoPopulacao = tamanhoPopulacao
    this.populacao = []
    this.melhorPopulacao = []
  }

  inicializarPopulacao() {
    for(let i =0; i<this.tamanhoPopulacao; i++){
      this.populacao.push(new Individuo(randomRgb()))
    }
  }

  calcularFitness(){
    for(let i =0; i<this.tamanhoPopulacao; i++){
      this.populacao[i].avaliacao()
    }
  }

  avaliarIndividuos(){
    this.populacao.sort((a, b) =>{
      if(a.fitness > b.fitness)
        return -1
      if(a.fitness < b.fitness)
        return 1

      return 0
    })

    console.log(this.populacao)

  }

  somaAvaliacoes(){
    let soma = 0
    for(let i=0; i< this.populacao.length; i++){
      soma += parseFloat(this.populacao[i].fitness)
    }
    return soma
  }

  selecionaPai(somaAvaliacoes){
    let valorSorteado = Math.random()*somaAvaliacoes
    let i = 0, indexPai = -1, soma = 0
    while(i< this.populacao.length && soma < valorSorteado){
      soma += parseFloat(this.populacao[i].fitness)
      i++
      indexPai++
    }
    return indexPai
  }

  imprimirGeracao(){
    console.log(`Melhor da Geração\nGeração: ${this.populacao[0].geracao}\nFitness: ${this.populacao[0].fitness}\nCromossomo: [${this.populacao[0].cromossomo.red},${this.populacao[0].cromossomo.green},${this.populacao[0].cromossomo.blue}]`)
  }
}

const randomRgb = () => {
  let cromossomo = {
    red: parseInt((Math.random() * 255).toFixed(0)),
    green: parseInt((Math.random() * 255).toFixed(0)),
    blue: parseInt((Math.random() * 255).toFixed(0))
  }

  return cromossomo
}