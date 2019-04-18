import defaults from '~/scope/defaults';

test(`are defaults`, () => {
  expect(defaults).toMatchInlineSnapshot(`
    Object {
      "Error": [Function],
      "Errorish": [Function],
      "allow": Array [
        "string",
      ],
      "capture": true,
      "message": "An error occurred",
      "name": "Error",
      "normalize": true,
    }
  `);
});
