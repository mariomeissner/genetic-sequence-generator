import Sequence from "./sequence";



function runTest(sequence : Sequence){
    console.log("Original Bitcode: " + sequence.getBitcode() + " ==> " + sequence.decode());
    console.log("Cleaned Bitcode: " + sequence.getBitcode() +  " ==> " + sequence.decode());
    console.log("Result of evaluation: " + sequence.evaluate());
}