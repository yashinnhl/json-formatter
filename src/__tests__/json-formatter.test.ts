import jsonFormatter from '../../lib/json-formatter';


test('test renderer', () => {
    const jsFormatter = new jsonFormatter({a:'b'});
    expect(jsFormatter.render()).toBe('<pre class=\"table-json-formatter\"><div><span class=\"key\">a</span>: <span class=\"string\"> b</span></div></pre>');
});

test('test empty object', () => {
    const jsFormatter = new jsonFormatter({});
    expect(jsFormatter.render()).toBe('<pre class=\"table-json-formatter\"></pre>');
});