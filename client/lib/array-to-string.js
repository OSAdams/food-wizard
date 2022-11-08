export default function arrayToString(array) {
  if (!array) {
    return { error: 'invalid array' };
  }
  if (array.length === 0) {
    return 'no diet information found';
  }
  const arrayToString = array.join(', ');
  return `diet: ${arrayToString}`;
}
