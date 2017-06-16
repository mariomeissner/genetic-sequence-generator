"use strict";
const sequence_1 = require("./sequence");
let sequence = new sequence_1.default("0000000000000000000000000000");
let sequence2 = new sequence_1.default("1111111111111111111111111111");
console.log(sequence.evaluate());
console.log(sequence.mutate());
console.log(sequence2.mutate());
