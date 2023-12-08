export default class Individuo{
  constructor(cromossomo, geracao){
    this.cromossomo = {
      red: cromossomo.red,
      green: cromossomo.green,
      blue: cromossomo.blue
    }
    this.geracao = geracao
    this.fitness = 0
  }

  avaliacao(){
    this.fitness = (1 - (this.cromossomo.red + this.cromossomo.green + this.cromossomo.blue) / 1000).toFixed(3)
  }

}