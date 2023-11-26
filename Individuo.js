export default class Individuo{
  constructor(cromossomo){
    this.cromossomo = {
      red: cromossomo.red,
      green: cromossomo.green,
      blue: cromossomo.blue
    }
    this.geracao = 1
    this.fitness = 0
  }

  avaliacao(){
    this.fitness = (1 - (this.cromossomo.red + this.cromossomo.green + this.cromossomo.blue) / 1000).toFixed(3)
  }

}