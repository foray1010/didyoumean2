import fillDefaultOptions from './fillDefaultOptions.js'
import matchItemProcessor from './matchItemProcessor.js'

test('matchPath', () => {
  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC',
        },
      },
      fillDefaultOptions({
        caseSensitive: false,
        matchPath: ['a', 'b'],
      }),
    ),
  ).toBe('abc')

  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC',
        },
      },
      fillDefaultOptions({
        caseSensitive: true,
        matchPath: ['a', 'b'],
      }),
    ),
  ).toBe('AbC')

  expect(
    matchItemProcessor(
      {
        a: {
          b: 123,
        },
      },
      fillDefaultOptions({
        matchPath: ['a', 'b'],
      }),
    ),
  ).toBe('')

  expect(
    matchItemProcessor(
      {
        a: null,
      },
      fillDefaultOptions({
        matchPath: ['a', 'b'],
      }),
    ),
  ).toBe('')
})
