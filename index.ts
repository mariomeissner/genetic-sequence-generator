import Sequence from "./sequence";
import Genetics from "./genetics";
let gen = new Genetics(200, 7, 5000, 0.4, 0.3);

for (let i = 0; i<400; i++){
    gen.nextGen();
    gen.state();
}