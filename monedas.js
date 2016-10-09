/*jshint esversion: 6 */
const Genetic = require('genetic-js');

var genetic = Genetic.create();

//datos para la corrida
const userData = {
  fichas: ["000","001","010","011","100","101"],
  nombres: ["Luisa", "Penelope", "Angela", "Daniela", "Miriam", "Cecilia"],
  solucion: { Luisa: "000", Penelope: "001", Angela: "010", Daniela: "011", Miriam: "100", Cecilia: "101" },
  newIndividuo: function(p1, p2, p3, p4, p5, p6){
    return { Luisa: p1, Penelope: p2, Angela: p3, Daniela: p4, Miriam: p5, Cecilia: p6 };
  }
};

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function() {
  //copio las fichas
  var nuevasFichas = this.userData.fichas.slice();
  //en este array guardo las fichas que le voy a dar al individuo del seed
  var fichasParaIndividuo = [];
  //voy iterando por todo el array y extrayendo cada elemento del random para asegurarme que agarro todas las fichas en órdenes distintos
  while(nuevasFichas.length > 0){
    fichasParaIndividuo.push(nuevasFichas.splice(Math.floor(Math.random()*nuevasFichas.length), 1));
  }
  console.log(fichasParaIndividuo);
  //creo el individuo y lo retorno
  return this.userData.newIndividuo(fichasParaIndividuo[0], fichasParaIndividuo[1], fichasParaIndividuo[2], fichasParaIndividuo[3], fichasParaIndividuo[4], fichasParaIndividuo[5]);
};
genetic.mutate = function(entity) {
  //copio los nombres
  var nombresACambiar = this.userData.nombres.slice();
  //elijo 2 nombres al azar para intercambiar posiciones
  var nombre1 = nombresACambiar.splice(Math.floor(Math.random()*nombresACambiar.length), 1);
  var nombre2 = nombresACambiar.splice(Math.floor(Math.random()*nombresACambiar.length), 1);
  //intercambio posiciones
  var aux = entity[nombre1];
  entity[nombre1] = entity[nombre2];
  entity[nombre2] = entity[aux];
  return entity;
};
genetic.crossover = function(mother, father) {
  //creo al hijo
  const hijo = this.userData.newIndividuo(father.Luisa, father.Penelope, mother.Angela, mother.Daniela, father.Miriam, father.Cecilia);
  //creo a la hija
  const hija = this.userData.newIndividuo(mother.Luisa, mother.Penelope, father.Angela, father.Daniela, mother.Miriam, mother.Cecilia);
  return [hijo, hija];
};
genetic.fitness = function(entity) {
  if(entity.Luisa == "000" && entity.Penelope == "001" && entity.Angela == "010" && entity.Daniela == "011" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 99;
  else if(entity.Luisa == "001" && entity.Penelope == "000" && entity.Angela == "010" && entity.Daniela == "011" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 10;
  else if(entity.Luisa == "010" && entity.Penelope == "001" && entity.Angela == "000" && entity.Daniela == "011" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 10;
  else if(entity.Luisa == "011" && entity.Penelope == "001" && entity.Angela == "010" && entity.Daniela == "000" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 10;
  else if(entity.Luisa == "100" && entity.Penelope == "001" && entity.Angela == "010" && entity.Daniela == "011" && entity.Miriam == "000" && entity.Cecilia == "101")
    return 10;
  else if(entity.Luisa == "101" && entity.Penelope == "001" && entity.Angela == "010" && entity.Daniela == "011" && entity.Miriam == "100" && entity.Cecilia == "000")
    return 10;
  else if(entity.Luisa == "001" && entity.Penelope == "010" && entity.Angela == "000" && entity.Daniela == "011" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 10;
  else if(entity.Luisa == "001" && entity.Penelope == "000" && entity.Angela == "011" && entity.Daniela == "010" && entity.Miriam == "100" && entity.Cecilia == "101")
    return 6;
  else if(entity.Luisa == "001" && entity.Penelope == "000" && entity.Angela == "011" && entity.Daniela == "100" && entity.Miriam == "010" && entity.Cecilia == "101")
    return 4;
  else if(entity.Luisa == "001" && entity.Penelope == "000" && entity.Angela == "011" && entity.Daniela == "010" && entity.Miriam == "101" && entity.Cecilia == "100")
    return -5;
  else
    //el resto de las conmbinaciones son inválidad porque implican que hay al menos dos personas con la misma ficha
    return -99;
};
genetic.generation = function(pop, generation, stats) {
  //resultado potencial
  var rp = pop[0].entity;
  var solucion = this.userData.solucion;
  //cirterio de paro
  if(rp.Luisa == solucion.Luisa && rp.Penelope == solucion.Penelope && rp.Angela == solucion.Angela && rp.Daniela == solucion.Daniela && rp.Miriam == solucion.Miriam && rp.Cecilia == solucion.Cecilia) {
    return true;
  }
  else {
    return false;
  }
};
genetic.notification = function(pop, generation, stats, isFinished) {
  if(isFinished){
    console.log("\nsolución ", pop[0].entity);
    console.log(stats);
  }
  else {
    console.log(".");
  }
};

//config de la corrida
var config = {
  iterations: 6000,
  size: 250,
  crossover: 0.3,
  mutation: 0.3,
  skip: 20
};

//realizar la corrida
genetic.evolve(config, userData);
