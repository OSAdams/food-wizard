export default function searchString(string) {
  const keyword = string.includes(',')
    ? string.split(' ').join('').split(',').join('+')
    : string.includes(' ')
      ? string.split(' ').join('+')
      : string;
  return keyword;
}
