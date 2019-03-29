// Utility for sorting an array of data using a custom accessor fucntion

export function sortBy(arr, fn) {
  return arr.sort((a, b) => {
    const fa = fn(a);
    const fb = fn(b);
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
  });
}
