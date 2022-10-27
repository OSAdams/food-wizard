export default function arrayToString(array) {
  if (!array) {
    return { error: 'invalid array' };
  }
  return array.join(', ');
}
