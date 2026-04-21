// 2026-04-18 | Mini-project: Simple event emitter
class EventEmitter {
  #events = {};
  on(event, fn)  { (this.#events[event] ??= []).push(fn); return this; }
  off(event, fn) { this.#events[event] = (this.#events[event]||[]).filter(f=>f!==fn); }
  emit(event, ...args) { (this.#events[event]||[]).forEach(fn => fn(...args)); }
}
const ee = new EventEmitter();
ee.on('greet', name => console.log(`Hello, ${name}!`));
ee.emit('greet', 'World'); // Hello, World!
