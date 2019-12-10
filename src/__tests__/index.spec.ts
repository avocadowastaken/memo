import * as api from '../index';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "MemoCache": [Function],
      "createMemo": [Function],
      "createPromiseMemo": [Function],
    }
  `);
});
