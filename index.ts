import Sequence from "./sequence";

function randomBitcode() {
    let bitcode : string = "";
    for (var i = 0; i < 7*4; i++) {
        bitcode+=Math.round(Math.random()); 
    }
    return bitcode;
}

function runTest(sequence : Sequence){
    console.log("Original Bitcode: " + sequence.getBitcode() + " ==> " + sequence.sequenceString());
    sequence.clean();
    console.log("Cleaned Bitcode: " + sequence.getBitcode() +  " ==> " + sequence.sequenceString());
    console.log("Result of evaluation: " + sequence.evaluate());
}

console.log("Basic Sequence Calculator using Genetic Algorithms");

for (var i = 0; i < 10; i++) {
    runTest(new Sequence(randomBitcode()));
};