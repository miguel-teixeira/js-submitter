export default class {

  constructor (options) {
    this.options = options;

    this.resolves = [];

    this.rejects = [];

    this.everyTime = [];
  }

  option(name, value) {
    this.options[name] = value;

    return this;
  }

  method(method) {
    return this.option('method', method);
  }

  post() {
    return this.method('post');
  }

  url(url) {
    return this.option('url', url);
  }

  data(data) {
    return this.option('data', data);
  }

  then(callback) {
    this.resolves.push(callback);

    return this;
  }

  catch(callback) {
    this.rejects.push(callback);

    return this;
  }

  always(callback) {
    this.everyTime.push(callback);

    return this;
  }

  getOptions() {
    return this.options;
  }

  getResolves() {
    return this.resolves;
  }

  getRejects() {
    return this.rejects;
  }

  getAlways() {
    return this.everyTime;
  }
}