"use strict";
const sequence_1 = require("./sequence");
const assert_1 = require("./assert");
/**
 * Manages the populations of a sequence.
 * Has the necessary methods to observe the current population, and create a new generation based on set parameters.
 *
 */
class Genetics {
    constructor(popSize, seqSize, target, crossOverRate, mutationRate) {
        this.seqSize = seqSize;
        this.popSize = popSize;
        this.target = target;
        this.crossoverRate = crossOverRate;
        this.population = new Array(popSize);
        this.fitness = new Array(popSize);
        this.totalFitness = 0;
        for (var i = 0; i < popSize; i++) {
            this.population[i] = new sequence_1.default(this.randomBitcode());
            this.fitness[i] = this.population[i].fitness(target);
            assert_1.assert(this.fitness[i] >= 0 && this.fitness[i] < 10, "Incorrect fitness value");
            this.totalFitness += this.population[i].fitness(target);
        }
    }
    randomBitcode() {
        let bitcode = "";
        for (var i = 0; i < this.seqSize * 4; i++) {
            bitcode += Math.round(Math.random());
        }
        return bitcode;
    }
    randomCrossoverPoint() {
        return Math.floor(Math.random() * this.seqSize);
    }
    nextGen() {
        /* Auxiliary loop variables */
        let cross;
        let substring;
        let newPopulation = new Array(this.popSize);
        for (var i = 0; i < this.popSize; i++) {
            /*
            We cross the strings at a given point to create two new strings,
            consisting of the start of the one and the end of another, respectively.
            */
            if (Math.random() <= this.crossoverRate) {
                cross = this.randomCrossoverPoint();
                substring = this.select().getSubstring(cross);
                newPopulation[i] = this.select().recode(substring);
            }
            else {
                newPopulation[i] = this.select();
            }
            if (Math.random() <= this.mutationRate) {
                newPopulation[i] = newPopulation[i].mutate();
            }
        }
        this.population = newPopulation;
        /*
        Now we need to recalculate fitnesses.
        */
        this.totalFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            this.fitness[i] = this.population[i].fitness(this.target);
            this.totalFitness += this.fitness[i];
        }
    }
    /**
     * Selects an element of the population based on roulette wheel selection.
     */
    select() {
        let value = Math.random() * this.totalFitness;
        let pos = 0;
        for (pos; pos < this.popSize; pos++) {
            value -= this.fitness[pos];
            if (value <= 0)
                return this.population[pos];
        }
        return this.population[pos];
    }
    print() {
        this.population.forEach(element => {
            console.log(element.bitcode + " ==> " + element.evaluate());
        });
        console.log("--------- Total fitness: " + this.totalFitness);
    }
    state() {
        console.log("Population state:");
        console.log(this.totalFitness);
        for (var i = 0; i < this.popSize; i += 20) {
            console.log(this.population[i].bitcode + " ==> " + this.population[i].evaluate());
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Genetics;
//# sourceMappingURL=genetics.js.map