export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, query] = hashRoute.split('?');
  const [queryString, params] = query.split('&');
  const param = !params ? 'initial' : params;
  return { path, param, queryString };
}
