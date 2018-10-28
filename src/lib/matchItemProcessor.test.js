import matchItemProcessor from './matchItemProcessor'

test('matchPath', () => {
  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC'
        }
      },
      {
        caseSensitive: false,
        matchPath: ['a', 'b']
      }
    )
  ).toBe('abc')

  expect(
    matchItemProcessor(
      {
        a: {
          b: 'AbC'
        }
      },
      {
        caseSensitive: true,
        matchPath: ['a', 'b']
      }
    )
  ).toBe('AbC')
})
