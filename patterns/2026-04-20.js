// 2026-04-20 | Pattern: Singleton
class Config {
  static #instance;
  #settings = {};
  static getInstance() { return (Config.#instance ??= new Config()); }
  set(k, v) { this.#settings[k] = v; }
  get(k)    { return this.#settings[k]; }
}
const cfg = Config.getInstance();
cfg.set('theme', 'dark');
console.log(Config.getInstance().get('theme')); // dark
