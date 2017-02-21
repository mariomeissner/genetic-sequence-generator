import Sequence from "./sequence.js";
/**
 * Manages the populations of a sequence. 
 * Has the necessary methods to observe the current population, and create a new generation based on set parameters. 
 * 
 */
export default class Genetics {
    private population : Sequence[];
    private fitness : number[];
    private bits : number;
    private crossoverRate : number = 0.7 //DEFAULT
    private mutationRate : number = 0.001 //DEFAULT
    private popSize : number;
    private target : number;

    /**
     * Build an initial population with indicated size and random bitcodes.
     * @param popSize Size of the population
     * @param numOfBlocks Number of blocks (numbers and operators, 4 bits each) per sequence
     */
    constructor(popSize : number, bits : number, target : number){
        for (var i = 0; i < popSize; i++) {
            this.population[i] = new Sequence(this.randomBitcode(bits));
            this.bits = bits;
            this.target = target;
        }
    }

    private randomBitcode(numOfBlocks : number) {
        let bitcode : string = "";
        for (var i = 0; i < numOfBlocks; i++) {
            bitcode+=Math.round(Math.random()); 
        }
        return bitcode;
    }

    private randomCrossoverPoint() : number{
        return Math.floor(Math.random()*this.bits);
    }

    public setCrossoverRate(rate : number){
        this.crossoverRate = rate;
    }

    public nextGen(){
        for (var i = 0; i < this.population.length; i=i+2) {
            if (Math.random() <= this.crossoverRate){
                this.population[i].recode(this.population[i+1].getSubstring(this.randomCrossoverPoint()));
            }

            if (Math.random() <= this.mutationRate) {
                this.population[i].mutate();
            } 
        } 
    }

    public print(){
        this.population.forEach(element => {
            console.log(element.getBitcode() + " ==> " + element.evaluate())
        });
    }

    public evaluate() {
        for (var i = 0; i < this.population.length; i++) {
            this.fitness[i] = 1 / Math.abs(this.target - this.population[i].evaluate());
        }
    }

    

}