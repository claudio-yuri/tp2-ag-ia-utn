/*jshint esversion: 6 */
const Genetic = require('genetic-js');

var genetic = Genetic.create();

function Individuo(p1, p2, p3, p4, p5, p6){
  this.Luisa = p1;
  this.Penelope = p2;
  this.Angela = p3;
  this.Daniela = p4;
  this.Miriam = p5;
  this.Cecilia = p6;
}
//individuos*******************
var individuos = [
  new Individuo("000","001","010","011","100","101"),
  new Individuo("001","000","010","011","100","101"),
  new Individuo("010","001","000","011","100","101"),
  new Individuo("011","001","010","000","100","101"),
  new Individuo("100","001","010","011","000","101"),
  new Individuo("101","001","010","011","100","000"),
  new Individuo("001","010","000","011","100","101"),
  new Individuo("001","000","011","010","100","101"),
  new Individuo("001","000","011","100","010","101"),
  new Individuo("001","000","011","100","010","101"),
  new Individuo("001","000","011","010","101","100")
];
//*****************************

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function() {

};
genetic.mutate = function(entity) {

};
genetic.crossover = function(mother, father) {

};
genetic.fitness = function(entity) {
  if(entity.Luisa === "000" && entity.Penelope === "001" && entity.Angela === "010" && entity.Daniela === "011" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 99;
  else if(entity.Luisa === "001" && entity.Penelope === "000" && entity.Angela === "010" && entity.Daniela === "011" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 10;
  else if(entity.Luisa === "010" && entity.Penelope === "001" && entity.Angela === "000" && entity.Daniela === "011" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 10;
  else if(entity.Luisa === "011" && entity.Penelope === "001" && entity.Angela === "010" && entity.Daniela === "000" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 10;
  else if(entity.Luisa === "100" && entity.Penelope === "001" && entity.Angela === "010" && entity.Daniela === "011" && entity.Miriam === "000" && entity.Cecilia === "101")
    return 10;
  else if(entity.Luisa === "101" && entity.Penelope === "001" && entity.Angela === "010" && entity.Daniela === "011" && entity.Miriam === "100" && entity.Cecilia === "000")
    return 10;
  else if(entity.Luisa === "001" && entity.Penelope === "010" && entity.Angela === "000" && entity.Daniela === "011" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 10;
  else if(entity.Luisa === "001" && entity.Penelope === "000" && entity.Angela === "011" && entity.Daniela === "010" && entity.Miriam === "100" && entity.Cecilia === "101")
    return 6;
  else if(entity.Luisa === "001" && entity.Penelope === "000" && entity.Angela === "011" && entity.Daniela === "100" && entity.Miriam === "010" && entity.Cecilia === "101")
    return 4;
  else if(entity.Luisa === "001" && entity.Penelope === "000" && entity.Angela === "011" && entity.Daniela === "010" && entity.Miriam === "101" && entity.Cecilia === "100")
    return -5;
};
genetic.generation = function(pop, generation, stats) {

};
genetic.notification = function(pop, generation, stats, isFinished) {

};

//config de la corrida
var config = {
  iterations: 4000,
  size: 250,
  crossover: 0.3,
  mutation: 0.3,
  skip: 20
};

//solución
var userData = {
	solution: ""
};

//realizar la corrida
genetic.evolve(config, userData);
