import fillDefaultOptions from './fillDefaultOptions'
import matchItemProcessor from './matchItemProcessor'

test('matchPath', () => {
  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC'
        }
      },
      fillDefaultOptions({
        caseSensitive: false,
        matchPath: ['a', 'b']
      })
    )
  ).toBe('abc')

  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC'
        }
      },
      fillDefaultOptions({
        caseSensitive: true,
        matchPath: ['a', 'b']
      })
    )
  ).toBe('AbC')

  expect(
    matchItemProcessor(
      {
        a: {
          b: 123
        }
      },
      fillDefaultOptions({
        matchPath: ['a', 'b']
      })
    )
  ).toBe('')
})
