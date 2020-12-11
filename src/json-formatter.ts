import { JsonObject } from './types';

export default class JsonFormatter {
  jsonInput: any;
  constructor(data: any) {
    this.jsonInput = data;
  }

  render() {
    let html = '';
    for (const [key, value] of (Object as any).entries(this.jsonInput)) {
      html += this.checkPrimitives(key, value);
    }
    return `<pre class="table-json-formatter">${html}</pre>`;
  }

  checkPrimitives(key: any, value: any) {
    let html = '';
    const property: JsonObject = {
      key,
      value,
      type: this.getValueType(value),
    };
    if (this.isObject(property)) {
      html += this.generateObjectTemplate(property);
    } else if (this.isArray(property)) {
      html += this.generateArrayTemplate(property);
    } else {
      html += this.generateDefaultTemplate(property);
    }
    return html;
  }

  getValueType(value: any) {
    if (value === null) {
      return null;
    }
    return typeof value;
  }

  generateObjectTemplate(property: JsonObject): string {
    const { key, value } = property;
    let html = '';
    html += `<div class="arrow"><i></i><span class="key">${key}</span>: <span > Object</span> <ul>`;
    for (const [k, v] of (Object as any).entries(value)) {
      html += this.checkPrimitives(k, v);
    }
    html += `</ul></div>`;
    return html;
  }

  generateArrayTemplate(property: JsonObject) {
    const { key, value } = property;
    let html = '';
    html += `<div class="arrow"><i></i><span class="key">${key}</span>: <span >Array<span class="number">[${value.length}]`;
    html += `</span></span><ul>${value
      .map((el: any, index: number) => `<li>${this.checkPrimitives(index, el)}</li>`)
      .join('')}`;
    html += `</ul></div>`;
    return html;
  }

  generateDefaultTemplate(property: JsonObject): string {
    const { key, type, value } = property;
    return `<div><span class="key">${key}</span>: <span class="${type}"> ${value}</span></div>`;
  }

  isObject(property: JsonObject): boolean {
    return property.type === 'object' && !Array.isArray(property.value);
  }

  isArray(property: JsonObject): boolean {
    return Array.isArray(property.value);
  }
}
