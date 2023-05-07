export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, query] = hashRoute.split('?');
  console.log('path: ', path, 'query: ', query); // eslint-disable-line
  /*
    A bug is causing the home page to error out. It has to do with this function.

    Reset to default function definition.

    Window hash routing is causing this error.

    Previous update was refreshing the comment section of a page to view the most
    recently posted comment by the user.

    I used a window hash of '&post' to update the hash which will re-render the comment
    section. WIP
  */
  if (!query) {
    return 'home';
  }
  const [queryString, params] = query.split('&');
  const param = !params ? 'initial' : params;
  return { path, param, queryString };
}
