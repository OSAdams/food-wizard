export default function arrayToString(array) {
  if (!array) {
    return { error: 'invalid array' };
  }
  if (array.length === 0) {
    return 'Sorry! No diet information found. Please be careful!';
  }
  const arrayToString = array.join(', ');
  return `${arrayToString} friendly!`;
}
