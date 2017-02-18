/**
 * Sequence of 7 blocks of 4 bits. They represent a genetic string. They can be decoded 
 * to a sequence of numbers and operators, each block being one number or operator.
 * Blocks with value below 1010 represent their corresponding integer (ex: 0101 = 5)
 * Blocks with value 1010 or above represent an operator:
 * 1010 = +
 * 1011 = -
 * 1100 = *
 * 1101 = /
 * The remaining possible blocks will be ignored.
 * 
 */

class Sequence {
    sequence : string
    //Original size of all sequences is 7 but can be modified by clean()
    size : number = 7;

    constructor(sequence : string) {
        this.sequence = sequence;
    }

    /**
     * Looks for nonsense such as two consecutive operators or blocks without meaning. 
     * Blocks flagged as nonsense will be deleted leaving a shorter sequence.
     * This should be called before working with the sequence
     */
    clean(){
        let shouldBeNumber : boolean = true; //next block should be a number or not
        let iterator : number = 0;
        let current : number;

        while (iterator < this.size) {
            current = getNumber(this.getBlock(iterator));
            if (shouldBeNumber){ //CASE: SHOULD BE NUMBER
                if (current > 9){ //hould be a number but it isnt.
                    //This means its a consecutive operator. it will be deleted.
                    this.deleteBlock(iterator);
                    //We should not advance the iterator since a new block has been shifted to the current position.
                    continue;
                } else {
                    iterator++;
                    continue;
                }
            } else { //CASE: SHOULD BE OPERATOR
                if (current < 10) { //Should be operator but is number.
                    //This means it is a consecutive number. It will be deleted.
                    this.deleteBlock(iterator);
                }
            }
        }

    }

    getSequence() : string{
        return this.sequence;
    }

    /**
     * Returns the block at the requested position (0...6)
     */
    getBlock(position : number) : string{
        return this.sequence.substr(position*4, 4);
    } 

    /**
     * Deletes the block at indicated position and updates the sequence.
     */
    deleteBlock(position : number) : void {
        /**
         * We will create two substrings: The string until the block to be deleted,
         * and the string from that block onwards.
         */
        let firstPart : string = this.sequence.substr(0, position);
        let lastPart : string = this.sequence.substr((position+1)*4, this.size-1);
        this.sequence = firstPart + lastPart; //Overriding sequence
        this.size--;
    }
    /**
     * Returns the outcome value of the sequence according to its representation
     */
    outcome() : number {
        let outcome : number = 0;
        let nextBlock : number;
        let finished : boolean = false;
        let position : number = 0;

        while (!finished){
            nextBlock
        }



        return outcome;
    }

}

/**
 * Returns the actual number or operator represented by a block of genetic code
 * A number above 9 indicates an operator. 
 * 10 = +; 11 = *; 12 = *; 13 = /
 */
function getNumber(block : string) : number {
    return parseInt("0b"+block);
}

console.log("Basic Sequence Calculator using Genetic Algorithms");
console.log("This program will attempt to produce sequences of the type [number] [operator] [number] [operator] [number] ... that generate the desired outcome")

/**
 * para cada casilla
 * 
 */