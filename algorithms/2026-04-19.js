// 2026-04-19 | Algorithm: Merge sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
function merge(l, r) {
  const out = [];
  let i = 0, j = 0;
  while (i < l.length && j < r.length)
    out.push(l[i] <= r[j] ? l[i++] : r[j++]);
  return out.concat(l.slice(i), r.slice(j));
}
console.log(mergeSort([5,3,8,1,9,2])); // [1,2,3,5,8,9]