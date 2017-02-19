"use strict";
const sequence_js_1 = require("./sequence.js");
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
    constructor(popSize, bits) {
        this.crossoverRate = 0.7; //DEFAULT
        for (var i = 0; i < popSize; i++) {
            this.population[i] = new sequence_js_1.default(this.randomBitcode(bits));
            this.bits = bits;
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
        Math.round(Math.random() * this.bits);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Genetics;
