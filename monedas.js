/*jshint esversion: 6 */
const Genetic = require('genetic-js');

var genetic = Genetic.create();

//datos para la corrida
//en este objeto se le pasan al algoritmo algunos datos que necesita para correr
const userData = {
  //esto lo usamos como referencia para pasar los posibles valores de las fichas
  fichas: ["000","001","010","011","100","101"],
  //esto lo usamos como referencia para pasar los posibles nombres
  nombres: ["Luisa", "Penelope", "Angela", "Daniela", "Miriam", "Cecilia"],
  //el individuo solución que será utilzado para definir el criterio de paro
  solucion: { Luisa: "000", Penelope: "001", Angela: "010", Daniela: "011", Miriam: "100", Cecilia: "101" },
  //este es el constructor que usamos para generar individuos (lo tenemos que para así porque dentro del contexto del objeto de genetic no se pueden referrnciar funciones externas)
  newIndividuo: (p1, p2, p3, p4, p5, p6) => {
    return { Luisa: p1, Penelope: p2, Angela: p3, Daniela: p4, Miriam: p5, Cecilia: p6 };
  },
  date: new Date().getTime(),
  //verifica que la entidad sea válida (no tiene que ver con el fitness)
  esValida: (entity) => {
    return entity.hasOwnProperty('Luisa') && entity.Luisa !== undefined &&
           entity.hasOwnProperty('Penelope') && entity.Penelope !== undefined &&
           entity.hasOwnProperty('Angela') && entity.Angela !== undefined &&
           entity.hasOwnProperty('Daniela') && entity.Daniela !== undefined &&
           entity.hasOwnProperty('Miriam') && entity.Miriam !== undefined &&
           entity.hasOwnProperty('Cecilia') && entity.Cecilia !== undefined;
  }
};
genetic.seedCounter = 0;
genetic.seed = function() {
  //copio las fichas
  var nuevasFichas = this.userData.fichas.slice();
  //en este array guardo las fichas que le voy a dar al individuo del seed
  var fichasParaIndividuo = [];
  //DESHABILITADO -- voy iterando por todo el array y extrayendo cada elemento del random para asegurarme que agarro todas las fichas en órdenes distintos
  // while(nuevasFichas.length > 0){
  //   fichasParaIndividuo.push(nuevasFichas.splice(Math.floor(Math.random()*nuevasFichas.length), 1)[0]);
  // }
  //genero las fichas completamente al azar
  for (var i = 0; i < nuevasFichas.length; i++) {
    fichasParaIndividuo.push(nuevasFichas[Math.floor(Math.random()*nuevasFichas.length)]);
  }

  var nuevoIndividuo = this.userData.newIndividuo(fichasParaIndividuo[0], fichasParaIndividuo[1], fichasParaIndividuo[2], fichasParaIndividuo[3], fichasParaIndividuo[4], fichasParaIndividuo[5]);

  //guardo al individuo en un file
  const fs = require("fs");
  // fs.appendFileSync("poblacion"+ this.userData.date +".json", JSON.stringify(nuevoIndividuo) + "\n");
  if(this.seedCounter === 0){
    fs.appendFileSync("poblacion"+ this.userData.date +".csv", "Individuo;Luisa;Penelope;Angela;Daniela;Miriam;Cecilia\n");
  }
  fs.appendFileSync("poblacion"+ this.userData.date +".csv", ++this.seedCounter + ";'" + nuevoIndividuo.Luisa + "';'" + nuevoIndividuo.Penelope + "';'" + nuevoIndividuo.Angela + "';'" + nuevoIndividuo.Daniela + "';'" + nuevoIndividuo.Miriam + "';'" + nuevoIndividuo.Cecilia + "'\n");

  //creo el individuo y lo retorno
  return nuevoIndividuo;
};
genetic.mutate = function(entity) {
  var original = entity.toString().length;
  //copio los nombres
  var nombresACambiar = this.userData.nombres.slice();
  //elijo 2 nombres al azar para intercambiar posiciones
  var nombre1 = nombresACambiar.splice(Math.floor(Math.random()*nombresACambiar.length), 1)[0];
  var nombre2 = nombresACambiar.splice(Math.floor(Math.random()*nombresACambiar.length), 1)[0];

  //intercambio posiciones
  var aux = entity[nombre1];
  entity[nombre1] = entity[nombre2];
  entity[nombre2] = aux;

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
  if(!this.userData.esValida(entity)){
    return -99;
  }

  //verifico valores duplicados
  var values = [];
  values.push(entity.Luisa);
  values.push(entity.Penelope);
  values.push(entity.Angela);
  values.push(entity.Daniela);
  values.push(entity.Miriam);
  values.push(entity.Cecilia);
  var isDuplicate = values.some(function(item, idx){
      return values.indexOf(item) != idx;
  });
  if(isDuplicate){
    return -99;
  }

  var matches = 0;
  if(entity.Luisa === this.userData.solucion.Luisa){
    matches++;
  }
  if(entity.Penelope === this.userData.solucion.Penelope){
    matches++;
  }
  if(entity.Angela === this.userData.solucion.Angela){
    matches++;
  }
  if(entity.Daniela === this.userData.solucion.Daniela){
    matches++;
  }
  if(entity.Miriam === this.userData.solucion.Miriam){
    matches++;
  }
  if(entity.Cecilia === this.userData.solucion.Cecilia){
    matches++;
  }
  /*
  +99 si es la solución correcta
  +10 si todos los números de las fichas son correctos menos 2.
  +8 si todos los números de las fichas son correctos menos 3.
  +6 si todos los números de las fichas son correctos menos 4.
  +4 si todos los números de las fichas son correctos menos 5.
  -5 si todos los números de las fichas son incorrectos.
  -99 si algún número es inválido o repetido.
   */
  switch (matches) {
    case 6: return 99;
    case 4: return 10;
    case 3: return 8;
    case 2: return 6;
    case 1: return 4;
    case 0: return -5;
    default:
      return -99;
  }
};
genetic.generation = function(pop, generation, stats) {
  //resultado potencial
  var rp = pop[0].entity;
  if(!this.userData.esValida(rp)) {
    return true;
  }
  var solucion = this.userData.solucion;

  //guardo el estado del individuo más apto
  const fs = require("fs");
  // fs.appendFileSync("fitness"+ this.userData.date +".json", JSON.stringify({ iteracion: generation, fitness: pop[0].fitness, entity: pop[0].entity }) + "\n");
  if(generation === 0){
    fs.appendFileSync("fitness"+ this.userData.date +".csv", "Generación;Aptitud;Luisa;Penelope;Angela;Daniela;Miriam;Cecilia\n");
  }
  fs.appendFileSync("fitness"+ this.userData.date +".csv", generation + ";" + pop[0].fitness + ";'" +
        rp.Luisa + "';'" + rp.Penelope + "';'" + rp.Angela + "';'" + rp.Daniela + "';'" + rp.Miriam + "';'" + rp.Cecilia + "'\n");

  //cirterio de paro
  if(rp.Luisa === solucion.Luisa && rp.Penelope === solucion.Penelope && rp.Angela === solucion.Angela && rp.Daniela === solucion.Daniela && rp.Miriam === solucion.Miriam && rp.Cecilia === solucion.Cecilia) {
    return false;
  }
  else{
    return true;
  }
};
genetic.notification = function(pop, generation, stats, isFinished) {
  if(isFinished){
    console.log("\nSolución ", pop[0].entity);
    console.log("Estadísticas:",stats);
    console.log("Cantidad de generaciones:", generation);
    var len = pop.length;
    //guardo el estado de la muestra al finalizar la corrida
    // var sample = pop.map((x) => { return JSON.stringify({ fitness: x.fitness, entity: x.entity }); });
    var sample = pop.map((x) => { return x.fitness + ";'" + x.entity.Luisa + "';'" + x.entity.Penelope + "';" + x.entity.Angela + "';'" +
                                                             x.entity.Daniela + "';'" + x.entity.Miriam + "';'" + x.entity.Cecilia + "'" ; });
    const fs = require("fs");
    fs.appendFileSync("sample"+ this.userData.date +".csv", "Aptitud;Luisa;Penelope;Angela;Daniela;Miriam;Cecilia\n" + (sample.join("\n")));
  }
};

//config de la corrida
genetic.optimize = Genetic.Optimize.Maximize;
//métodos de selección
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament3;

var config = {
  iterations: 400, //cantidad de iteraciones
  size: 500, //tamaño de la población
  crossover: 0.9, //probabilidad de cruce
  mutation: 0.2, //probabilidad de mutación
  fittestAlwaysSurvives: false
};

console.log("Configuración: ",config);

//realizar la corrida
genetic.evolve(config, userData);
