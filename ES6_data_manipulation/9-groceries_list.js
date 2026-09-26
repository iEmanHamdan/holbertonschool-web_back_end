export default function grokList(list) {
  const map = new Map();
  list.forEach((item, index) => {
    map.set(item, index + 1);
  });
  return map;
}
