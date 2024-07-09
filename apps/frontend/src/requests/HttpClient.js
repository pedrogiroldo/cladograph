export default class HttpClient {
  constructor(opts) {
    if (opts.baseUrl) {
      // Strip trailing '/' from base URL
      this.baseUrl =
        opts.baseUrl.slice(-1) === "/"
          ? opts.baseUrl.slice(0, -1)
          : opts.baseUrl;
    }
    this.defaultOpts = opts.defaultOpts ?? {};
  }

  fetch(resource, opts) {
    if (resource.slice(0, 1) !== "/") {
      resource = `/${resource}`;
    }
    const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource;
    return fetch(url, { ...this.defaultOpts, ...opts });
  }
}
