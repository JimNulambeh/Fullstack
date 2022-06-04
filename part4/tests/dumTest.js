const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const notes = []

  const result = listHelper.dummy(notes)
  expect(result).toBe(1)
})