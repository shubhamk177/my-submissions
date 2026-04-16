import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const today = new Date().toISOString().split('T')[0]; // e.g. 2026-04-16
const dayIndex = Math.floor(Date.now() / 86400000); // changes daily

const categories = [
  { folder: 'dsa',           fn: generateDSA },
  { folder: 'mini-projects', fn: generateMiniProject },
  { folder: 'algorithms',    fn: generateAlgorithm },
  { folder: 'patterns',      fn: generatePattern },
];

const { folder, fn } = categories[dayIndex % categories.length];
const code = fn(today);

if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
writeFileSync(`${folder}/${today}.js`, code);
console.log(`✅ Written: ${folder}/${today}.js`);

// ── Generators ────────────────────────────────────────────────────────────────

function generateDSA(date) {
  const problems = [
    [`// ${date} | DSA: Binary Search`,
     `function binarySearch(arr, target) {`,
     `  let lo = 0, hi = arr.length - 1;`,
     `  while (lo <= hi) {`,
     `    const mid = (lo + hi) >> 1;`,
     `    if (arr[mid] === target) return mid;`,
     `    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;`,
     `  }`,
     `  return -1;`,
     `}`,
     ``,
     `console.log(binarySearch([1,3,5,7,9,11], 7)); // 3`],

    [`// ${date} | DSA: Stack using array`,
     `class Stack {`,
     `  #data = [];`,
     `  push(val) { this.#data.push(val); }`,
     `  pop()     { return this.#data.pop(); }`,
     `  peek()    { return this.#data.at(-1); }`,
     `  isEmpty() { return this.#data.length === 0; }`,
     `  size()    { return this.#data.length; }`,
     `}`,
     ``,
     `const s = new Stack();`,
     `s.push(1); s.push(2); s.push(3);`,
     `console.log(s.pop());  // 3`,
     `console.log(s.peek()); // 2`],

    [`// ${date} | DSA: Linked list`,
     `class Node { constructor(val) { this.val = val; this.next = null; } }`,
     `class LinkedList {`,
     `  constructor() { this.head = null; }`,
     `  append(val) {`,
     `    const n = new Node(val);`,
     `    if (!this.head) { this.head = n; return; }`,
     `    let cur = this.head;`,
     `    while (cur.next) cur = cur.next;`,
     `    cur.next = n;`,
     `  }`,
     `  toArray() {`,
     `    const out = []; let cur = this.head;`,
     `    while (cur) { out.push(cur.val); cur = cur.next; }`,
     `    return out;`,
     `  }`,
     `}`,
     `const ll = new LinkedList();`,
     `[1,2,3].forEach(v => ll.append(v));`,
     `console.log(ll.toArray()); // [1,2,3]`],
  ];
  return problems[dayIndex % problems.length].join('\n');
}

function generateMiniProject(date) {
  const projects = [
    [`// ${date} | Mini-project: Word frequency counter`,
     `function wordFreq(text) {`,
     `  return text.toLowerCase()`,
     `    .replace(/[^a-z\\s]/g, '')`,
     `    .split(/\\s+/)`,
     `    .reduce((map, w) => (w && (map[w] = (map[w] || 0) + 1), map), {});`,
     `}`,
     ``,
     `const result = wordFreq('The quick brown fox jumps over the lazy dog the');`,
     `console.log(Object.entries(result).sort((a,b) => b[1]-a[1]));`],

    [`// ${date} | Mini-project: Simple event emitter`,
     `class EventEmitter {`,
     `  #events = {};`,
     `  on(event, fn)  { (this.#events[event] ??= []).push(fn); return this; }`,
     `  off(event, fn) { this.#events[event] = (this.#events[event]||[]).filter(f=>f!==fn); }`,
     `  emit(event, ...args) { (this.#events[event]||[]).forEach(fn => fn(...args)); }`,
     `}`,
     ``,
     `const ee = new EventEmitter();`,
     `ee.on('greet', name => console.log(\`Hello, \${name}!\`));`,
     `ee.emit('greet', 'World'); // Hello, World!`],
  ];
  return projects[dayIndex % projects.length].join('\n');
}

function generateAlgorithm(date) {
  const algos = [
    [`// ${date} | Algorithm: Merge sort`,
     `function mergeSort(arr) {`,
     `  if (arr.length <= 1) return arr;`,
     `  const mid = arr.length >> 1;`,
     `  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));`,
     `}`,
     `function merge(l, r) {`,
     `  const out = [];`,
     `  let i = 0, j = 0;`,
     `  while (i < l.length && j < r.length)`,
     `    out.push(l[i] <= r[j] ? l[i++] : r[j++]);`,
     `  return out.concat(l.slice(i), r.slice(j));`,
     `}`,
     `console.log(mergeSort([5,3,8,1,9,2])); // [1,2,3,5,8,9]`],

    [`// ${date} | Algorithm: Fibonacci with memoization`,
     `function fib(n, memo = {}) {`,
     `  if (n <= 1) return n;`,
     `  return memo[n] ??= fib(n-1, memo) + fib(n-2, memo);`,
     `}`,
     `console.log([...Array(10).keys()].map(fib)); // [0,1,1,2,3,5,8,13,21,34]`],
  ];
  return algos[dayIndex % algos.length].join('\n');
}

function generatePattern(date) {
  const patterns = [
    [`// ${date} | Pattern: Observer`,
     `class Subject {`,
     `  #observers = [];`,
     `  #state;`,
     `  subscribe(o)   { this.#observers.push(o); }`,
     `  unsubscribe(o) { this.#observers = this.#observers.filter(x => x !== o); }`,
     `  setState(v)    { this.#state = v; this.#observers.forEach(o => o.update(v)); }`,
     `  getState()     { return this.#state; }`,
     `}`,
     `const sub = new Subject();`,
     `const obs = { update: v => console.log('Got:', v) };`,
     `sub.subscribe(obs);`,
     `sub.setState(42); // Got: 42`],

    [`// ${date} | Pattern: Singleton`,
     `class Config {`,
     `  static #instance;`,
     `  #settings = {};`,
     `  static getInstance() { return (Config.#instance ??= new Config()); }`,
     `  set(k, v) { this.#settings[k] = v; }`,
     `  get(k)    { return this.#settings[k]; }`,
     `}`,
     ``,
     `const cfg = Config.getInstance();`,
     `cfg.set('theme', 'dark');`,
     `console.log(Config.getInstance().get('theme')); // dark`],
  ];
  return patterns[dayIndex % patterns.length].join('\n');
}