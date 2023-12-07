// besouro = [51, 51, 51]

/*

Estrutura do Algoritmo

  - Inicialização da população - v
  - Avaliação dos indivíduos/Fitness - v
  - Seleção dos indivíduos
  - Cross-over: Ponto de corte entre R e G, [R,*Ponto de corte* G, B]
  - Mutação
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
    this.populacao = []
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

  crossOver(){
    let corte = parseInt((Math.random() * 1+1).toFixed(0))
    let filhos = []

    let pai1 = this.selecionaPai(this.somaAvaliacoes())
    let pai2 = this.selecionaPai(this.somaAvaliacoes())

    let cromossomo1 = [this.populacao[pai1].cromossomo.red, this.populacao[pai1].cromossomo.green, this.populacao[pai1].cromossomo.blue]
    let cromossomo2 = [this.populacao[pai2].cromossomo.red, this.populacao[pai2].cromossomo.green, this.populacao[pai2].cromossomo.blue]

    console.log('----Teste de Crossover----')

    console.log('Posição do corte: '+corte)
    console.log('Cromossomo 1: '+cromossomo1)
    console.log('Cromossomo 2: '+cromossomo2)

    let aux = cromossomo2.slice(0,corte)

    console.log('aux: '+aux)

    console.log('cromossomo 2: '+cromossomo2.slice(0,corte))
    console.log('cromossomo teste: '+cromossomo1.slice(corte,3))

    console.log('\ncromossomo 1: '+cromossomo1.slice(0,corte))
    console.log('cromossomo teste: '+cromossomo2.slice(corte,3))

    aux.push(cromossomo1.slice(corte,3))
    console.log('filho 2: '+aux)
    console.log('filho: '+(aux.splice(1)).shift())

    filhos.push({
      cromossomo: {
        red: aux[0],
        green: aux[1],
        blue: aux[2],
      },
      geracao: this.populacao[0].geracao+1,
      fitness: 0.5
    })

    aux = cromossomo1.slice(0,corte)
    aux.push(cromossomo2.slice(corte,3))
    console.log('filho 1: '+aux)


    return filhos
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
