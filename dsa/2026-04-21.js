// 2026-04-21 | DSA: Linked list
class Node { constructor(val) { this.val = val; this.next = null; } }
class LinkedList {
  constructor() { this.head = null; }
  append(val) {
    const n = new Node(val);
    if (!this.head) { this.head = n; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = n;
  }
  toArray() {
    const out = []; let cur = this.head;
    while (cur) { out.push(cur.val); cur = cur.next; }
    return out;
  }
}
const ll = new LinkedList();
[1,2,3].forEach(v => ll.append(v));
console.log(ll.toArray()); // [1,2,3]