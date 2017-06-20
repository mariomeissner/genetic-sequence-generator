"use strict";
const genetics_1 = require("./genetics");
let gen = new genetics_1.default(200, 7, 5000, 0.4, 0.3);
for (let i = 0; i < 400; i++) {
    gen.nextGen();
    gen.state();
}
//# sourceMappingURL=index.js.map