import JsonFormatter from './json-formatter';
const j = {
  a: 'hello',
};
const outputJson = new JsonFormatter(j);
outputJson.render();
