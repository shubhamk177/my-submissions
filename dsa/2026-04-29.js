// 2026-04-29 | DSA: Stack using array
class Stack {
  #data = [];
  push(val) { this.#data.push(val); }
  pop()     { return this.#data.pop(); }
  peek()    { return this.#data.at(-1); }
  isEmpty() { return this.#data.length === 0; }
  size()    { return this.#data.length; }
}

const s = new Stack();
s.push(1); s.push(2); s.push(3);
console.log(s.pop());  // 3
console.log(s.peek()); // 2