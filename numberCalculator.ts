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
     * Looks for nonsense such as two consecutive operators, consecutive numbers or blocks without meaning. 
     * Blocks flagged as nonsense will be deleted leaving a shorter sequence.
     * This should be called before working with the sequence.
     */
    clean(){
        let shouldBeNumber : boolean = true; //next block should be a number or not
        let iterator : number = 0;
        let current : number;
        let correct : boolean;
        while (iterator < this.size) {
            current = this.getBlockValue(iterator);
            //This variable will only resolve to true if it 
            correct = (shouldBeNumber && current<=9) || (!shouldBeNumber && current >= 10 && current <=13);
            if (!correct){ //Not correct. We delete block. 
                this.deleteBlock(iterator);
                //We should not update shouldBeNumber or iterator since a new block has been shifted to current position. 
                continue;
            } else { //Current block seems to be ok so we advance to next block;
                shouldBeNumber = !shouldBeNumber;
                iterator++;
            }
        }
    }


    getBitcode() : string{
        return this.sequence;
    }

    /**
     * Returns the actual number or operator represented by a block of genetic code
     * A number above 9 indicates an operator.
     * 10 = +; 11 = *; 12 = *; 13 = /
     */
    getBlockValue(position : number) : number {
        let block : string = this.sequence.substr(position*4, 4);
        return parseInt(block, 2);
    } 

    /**
     * Deletes the block at indicated position and updates the sequence.
     */
    deleteBlock(position : number) : void {
        /**
         * We will create two substrings: The string until the block to be deleted,
         * and the string from that block onwards.
         */
        let firstPart : string = this.sequence.substr(0, position*4);
        let lastPart : string = this.sequence.substr((position+1)*4, this.size*4-1);
        this.sequence = firstPart + lastPart; //Overriding sequence
        this.size--;
    }

    sequenceString(){
        let iterator : number = 0;
        let string : string = "";
        let current : number;
        while (iterator < this.size){
            current = this.getBlockValue(iterator);
            if (current <= 9){
                string += current;
            } else {
                switch (current) {
                    case 10:
                        string+="+";
                        break;
                    case 11:
                        string+="-";
                    case 12:
                        string+="*";
                    case 12:
                        string+="/";
                    default:
                        console.log("Error while evaluating. Sequence not clean?");
                }
            }
            iterator++;
        }
        return string;
    }

    /**
     * Returns the outcome value of the sequence according to its representation
     */
    evaluate() : number {
        return eval(this.sequenceString());
    }

}

console.log("Basic Sequence Calculator using Genetic Algorithms");
console.log("This program will attempt to produce sequences of the type [number] [operator] [number] [operator] [number] ... that generate the desired outcome")

let test = new Sequence("00011010001010100011101001001010");
console.log(test.getBitcode());
test.clean();
console.log(test.getBitcode());
console.log("Result of evaluation of sequence " + test.sequenceString() + " is: " + test.evaluate());
