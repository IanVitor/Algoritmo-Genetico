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

import Individuo from "./Individuo.js";

export default class AlgoritmoGenetico {
  constructor(tamanhoPopulacao) {
    this.tamanhoPopulacao = tamanhoPopulacao;
    this.geracaoAtual = 0
  }

  inicializarPopulacao(arrayPopulacao) {
    
    for (let i = 0; i < this.tamanhoPopulacao; i++) {
      arrayPopulacao.push(new Individuo(randomRgb(), 1));
    }
  }

  calcularFitness(arrayPopulacao) {
    for (let i = 0; i < arrayPopulacao.length; i++) {
      arrayPopulacao[i].avaliacao();
    }
  }

  avaliarIndividuos(arrayPopulacao) {
    arrayPopulacao.sort((a, b) => {
      if (a.fitness > b.fitness) return -1;
      if (a.fitness < b.fitness) return 1;

      return 0;
    });
  }

  somaAvaliacoes(arrayPopulacao) {
    let soma = 0;
    for (let i = 0; i < arrayPopulacao.length; i++) {
      soma += parseFloat(arrayPopulacao[i].fitness);
    }
    return soma;
  }

  selecionaPai(somaAvaliacoes, arrayPopulacao) {
    let valorSorteado = Math.random() * somaAvaliacoes;
    let i = 0,
      indexPai = -1,
      soma = 0;
    while (i < arrayPopulacao.length && soma < valorSorteado) {
      soma += parseFloat(arrayPopulacao[i].fitness);
      i++;
      indexPai++;
    }
    return indexPai;
  }

  crossOver(arrayPopulacao, novaPopulacao) {
    let corte = parseInt((Math.random() * 1 + 1).toFixed(0));

    let pai1 = this.selecionaPai(this.somaAvaliacoes(arrayPopulacao),arrayPopulacao);
    let pai2 = this.selecionaPai(this.somaAvaliacoes(arrayPopulacao),arrayPopulacao);

    let cromossomo1 = [
      arrayPopulacao[pai1].cromossomo.red,
      arrayPopulacao[pai1].cromossomo.green,
      arrayPopulacao[pai1].cromossomo.blue,
    ];
    let cromossomo2 = [
      arrayPopulacao[pai2].cromossomo.red,
      arrayPopulacao[pai2].cromossomo.green,
      arrayPopulacao[pai2].cromossomo.blue,
    ];

    if (corte === 1) {
      let teste = cromossomo1[0];
      cromossomo1[0] = cromossomo2[0];
      cromossomo2[0] = teste;
    } else {
      let teste = [];
      teste[0] = cromossomo1[0];
      teste[1] = cromossomo1[1];
      cromossomo1[0] = cromossomo2[0];
      cromossomo1[1] = cromossomo2[1];
      cromossomo2[0] = teste[0];
      cromossomo2[1] = teste[1];
    }

    let cromossomoFilho1 = {
      red: cromossomo1[0],
      green: cromossomo1[1],
      blue: cromossomo1[2],
    }

    novaPopulacao.push(new Individuo(cromossomoFilho1, this.geracaoAtual+1))

    let cromossomoFilho2 = {
        red: cromossomo2[0],
        green: cromossomo2[1],
        blue: cromossomo2[2]
    }  

    novaPopulacao.push(new Individuo(cromossomoFilho2, this.geracaoAtual+1))
  }

  calculaMutacao(taxaMutacao, novaPopulacao){
    for(let i = 0; i < novaPopulacao.length; i++){
      let valorSorteadoR = Math.random().toFixed(2);
      if(valorSorteadoR < taxaMutacao){
        let novoValor = parseFloat((Math.random() * novaPopulacao[i].cromossomo.red).toFixed(0));
        novaPopulacao[i].cromossomo.red = novoValor;
      }
      
      let valorSorteadoG = Math.random().toFixed(2);
      if(valorSorteadoG < taxaMutacao){
        let novoValor = parseFloat((Math.random() * novaPopulacao[i].cromossomo.green).toFixed(0));
        novaPopulacao[i].cromossomo.green = novoValor;
      }
      
      let valorSorteadoB = Math.random().toFixed(2);
      if(valorSorteadoB < taxaMutacao){
        let novoValor = parseFloat((Math.random() * novaPopulacao[i].cromossomo.blue).toFixed(0));
        novaPopulacao[i].cromossomo.blue = novoValor;
      } 
      this.arrayPopulacao = (novaPopulacao[i].cromossomo)
    }
  }

  imprimirGeracao(arrayPopulacao) {
    console.log(
      `Melhor da Geração\nGeração: ${ arrayPopulacao[0].geracao}\nFitness: ${arrayPopulacao[0].fitness}\nCromossomo: [${arrayPopulacao[0].cromossomo.red},${arrayPopulacao[0].cromossomo.green},${arrayPopulacao[0].cromossomo.blue}]`
    );
  }
}

const randomRgb = () => {
  let cromossomo = {
    red: parseInt((Math.random() * 255).toFixed(0)),
    green: parseInt((Math.random() * 255).toFixed(0)),
    blue: parseInt((Math.random() * 255).toFixed(0)),
  };

  return cromossomo;
};
