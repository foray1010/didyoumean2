import matchItemProcessor from './matchItemProcessor'
import fillDefaultOptions from './fillDefaultOptions'

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
})
