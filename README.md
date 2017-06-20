# Genetic Sequence Generator 

## How it works
Based on the guide I found on this site: http://www.ai-junkie.com/ga/intro/gat1.html
Genetic algorithm that runs a population of sequences of numbers/operators. Sequences evaluate to a number and the goal is to evolve the sequences until they reach a certain target number. 

Sequences have 4-bit blocks, each of which evaluate to either a number 0-9, or an operator: 
- Blocks with value below 1010 represent their corresponding integer (ex: 0101 = 5)
- Blocks with value 1010 or above represent an operator:
  - 1010 = +
  - 1011 = -
  - 1100 = *
  - 1101 = /

## Current state
Sequences converge or get stuck at some point without really reaching the target. Mutations should be avoiding getting stuck at local maxima but apparently don't. I'm investigating the cause.

## Run it yourself
To run it, you can simply download the files inside bin, and execute index.js with Node, or in the browser (in that case you will have to open the browser console manually). 
You can also inspect the TS code, which is probably what you should to in case you want to look at the source code. 

## Why TS
Typescript is a superset of Javascript which allows for fancy Intellisense and compile-time warnings and error messages. It's strongly-typed, which helps avoid silly type mistakes. In all honesty JS is a pretty ugly language and TS helps turn it into something that looks more like Java and less like nonsense gibber.

I wanted to use TS/JS because this way I can integrate this into a web-terminal (probably with terminal.js).

