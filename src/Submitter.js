export default class {

  constructor(http, url) {
    this.http = http;

    this.url = url;

    this.requests = [];

    this.timeoutHandle = null;
  }

  request(request, deferment = 100) {
    this.requests.push(request);

    if (this.timeoutHandle === null) {
      this.timeoutHandle = setTimeout(this.submit.bind(this), deferment);
    }

    return this;
  }

  submit() {
    clearInterval(this.timeoutHandle);
    this.timeoutHandle = null;

    if (!this.requests.length) {
      return;
    }

    this.http.post(
      this.url,
      this.requests.map((request) => request.getOptions())
    ).then(this.resolves.bind(this))
      .catch(this.rejects.bind(this));
  }

  resolves(response) {
    this.requests.forEach((request) => {
        request.getResolves().forEach((resolve) => resolve(request));
        request.getAlways().forEach((always) => always(request));
    });
  }

  rejects(error) {
    this.requests.forEach((request) => {
      request.getRejects().forEach((reject) => reject(request));
      request.getAlways().forEach((always) => always(error));
    });
  }
}