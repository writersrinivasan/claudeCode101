// A deliberately tiny router: exact method + path matching with :params.
export function createRouter() {
  const routes = [];

  function add(method, pattern, handler) {
    const keys = [];
    const regex = new RegExp(
      '^' + pattern.replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$'
    );
    routes.push({ method, regex, keys, handler });
  }

  function match(method, pathname) {
    for (const r of routes) {
      if (r.method !== method) continue;
      const m = pathname.match(r.regex);
      if (m) {
        const params = Object.fromEntries(r.keys.map((k, i) => [k, m[i + 1]]));
        return { handler: r.handler, params };
      }
    }
    return null;
  }

  return {
    get: (p, h) => add('GET', p, h),
    post: (p, h) => add('POST', p, h),
    patch: (p, h) => add('PATCH', p, h),
    delete: (p, h) => add('DELETE', p, h),
    match,
  };
}
