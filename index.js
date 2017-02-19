"use strict";
function runTest(sequence) {
    console.log("Original Bitcode: " + sequence.getBitcode() + " ==> " + sequence.decode());
    console.log("Cleaned Bitcode: " + sequence.getBitcode() + " ==> " + sequence.decode());
    console.log("Result of evaluation: " + sequence.evaluate());
}
