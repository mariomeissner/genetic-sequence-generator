import Sequence from "./sequence";
let sequence : Sequence = new Sequence("0000000000000000000000000000");
let sequence2 : Sequence = new Sequence("1111111111111111111111111111");
console.log(sequence.evaluate());
console.log(sequence.mutate());
console.log(sequence2.mutate());
