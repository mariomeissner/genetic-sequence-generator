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
export default class Sequence {
    public bitcode : string //Should remain untouched.
    private cleanBitcode : string //Actual string we will work with.
    private numBlocks : number; //Number of blocks of the cleaned sequence.

    constructor(sequence : string) {
        this.bitcode = sequence;
        this.cleanBitcode = sequence;
        this.numBlocks = this.bitcode.length / 4;
        if (!Number.isInteger(this.numBlocks)){
            console.log("ERROR, Bad sequence length")
        }
        //Call to update cleanBitcode by cleaning the original
        this.clean();  //For convenience
    }

    /**
     * Looks for nonsense such as two consecutive operators, consecutive numbers or blocks without meaning. 
     * Blocks flagged as nonsense will be deleted leaving a shorter sequence.
     * This should be called before working with the sequence.
     */
    private clean(){
        let shouldBeNumber : boolean = true; //next block should be a number or not
        let iterator : number = 0;
        let current : number;
        let correct : boolean;
        while (iterator < this.numBlocks) {
            current = this.getBlockValue(iterator);
            //This variable will only resolve to true if the current block is correct
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
        //Now we need to check whether the last block is an operator, and delete it too.
        if (shouldBeNumber){ //Means last one was operator
            this.deleteBlock(this.numBlocks-1);
        } 
    }

    /**
     * Returns the actual number or operator represented by the block at the indicated position
     * A number above 9 indicates an operator.
     * 10 = +; 11 = *; 12 = *; 13 = /
     */
    public getBlockValue(position : number) : number {
        let block : string = this.cleanBitcode.substr(position*4, 4);
        return parseInt(block, 2);
    }

    /**
     * Returns the decoded string corresponding to the cleaned bitcode.
     */
    public decode(){
        let iterator : number = 0;
        let string : string = "";
        let current : number;
        while (iterator < this.numBlocks){
            current = this.getBlockValue(iterator);
            if (current <= 9){
                string += current;
            } else {
                switch (current) {
                    case 10:
                        string+=" + ";
                        break;
                    case 11:
                        string+=" - ";
                        break;
                    case 12:
                        string+=" * ";
                        break;
                    case 13:
                        string+=" / ";
                        break;
                    default:
                        string+=" NaN ";
                }
            }
            iterator++;
        }
        return string;
    }

    /**
     * Returns the outcome value of the sequence according to its representation
     * Uses JS eval function, which is why we needed to clean the 
     */
    public evaluate() : number {
        return eval(this.decode());
    }

    /**
     * Returns a new sequence consisting of the original until the last subseq.lengh characters,
     * which will have been replaced by subsec.
     * @param subSeq Subsequence replacing the tail of this sequence
     */
    public recode(subSeq : String) : Sequence{
        if (this.bitcode.length < subSeq.length){
            throw new Error("Bitcode index out of bounds");
        }
        let pos = this.bitcode.length - subSeq.length;
        return new Sequence(this.bitcode.substring(0, pos) + subSeq);
    }

    public mutate() : Sequence {
        //We take a random position
        let pos : number = Math.floor(Math.random()*this.bitcode.length);

        /*
        Now we take the bit at that position and change it to the opposite,
        this is the mutation.
        */
        let bit : String = this.bitcode.charAt(pos);
        if (bit == "0") bit = "1" 
        else bit = "0";
        return new Sequence(this.bitcode.substr(0, pos) +  bit + this.bitcode.substr(pos+1));
    }

    /**
     * Returns the fitness based on the distance between the current value,
     * and the target value we are aiming to achieve.
     * @param target Number the sequence is aiming for
     */
    public fitness(target : number) : number {
        let fitness =  1.0/Math.abs(target - this.evaluate());
        if (isFinite(fitness) && !isNaN(fitness)){
            return fitness;
        } else {
            return 0;
        }
    }

    //FROM HERE ONWARDS AUXILIARY FUNCTIONS//

    /**
     * Deletes a block of 4 bits of the sequence at indicated position, shifting the rest to the left.
     */
    private deleteBlock(position : number) : void {
        /**
         * We will create two substrings: The string until the block to be deleted,
         * and the string from that block onwards (not included, obviously).
         */
        let firstPart : string = this.cleanBitcode.substr(0, position*4);
        let lastPart : string = this.cleanBitcode.substr((position+1)*4, this.numBlocks*4-1);
        this.cleanBitcode = firstPart + lastPart; //Overriding sequence
        this.numBlocks--;
    }

    public getSubstring(pos : number){
        return this.bitcode.substring(pos);
    }
}