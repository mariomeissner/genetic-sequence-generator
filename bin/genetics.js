"use strict";
const sequence_1 = require("./sequence");
/**
 * Manages the populations of a sequence.
 * Has the necessary methods to observe the current population, and create a new generation based on set parameters.
 *
 */
class Genetics {
    /**
     * Build an initial population with indicated size and random bitcodes.
     * @param popSize Size of the population
     * @param numOfBlocks Number of blocks (numbers and operators, 4 bits each) per sequence
     */
    constructor(popSize, bits, target) {
        this.crossoverRate = 0.4; //DEFAULT
        this.mutationRate = 0.02; //DEFAULT
        for (var i = 0; i < popSize; i++) {
            this.population[i] = new sequence_1.default(this.randomBitcode(bits));
            this.bits = bits;
            this.target = target;
        }
    }
    randomBitcode(numOfBlocks) {
        let bitcode = "";
        for (var i = 0; i < numOfBlocks; i++) {
            bitcode += Math.round(Math.random());
        }
        return bitcode;
    }
    randomCrossoverPoint() {
        return Math.floor(Math.random() * this.bits);
    }
    setCrossoverRate(rate) {
        this.crossoverRate = rate;
    }
    nextGen() {
        /**
        for (var i = 0; i < this.population.length; i=i+2) {
            if (Math.random() <= this.crossoverRate){
                this.population[i].recode(this.population[i+1].getSubstring(this.randomCrossoverPoint()));
            }

            if (Math.random() <= this.mutationRate) {
                this.population[i].mutate();
            }
        }
        */
        let total = 0;
        for (var i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness(this.target);
        }
    }
    print() {
        this.population.forEach(element => {
            console.log(element.getBitcode() + " ==> " + element.evaluate());
        });
    }
    evaluate() {
        for (var i = 0; i < this.population.length; i++) {
            this.fitness[i] = 1 / Math.abs(this.target - this.population[i].evaluate());
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Genetics;
