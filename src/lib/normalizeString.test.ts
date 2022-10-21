import fillDefaultOptions from './fillDefaultOptions.js'
import normalizeString from './normalizeString.js'

test('caseSensitive', () => {
  expect(
    normalizeString(
      'AbC',
      fillDefaultOptions({
        caseSensitive: false,
      }),
    ),
  ).toBe('abc')

  expect(
    normalizeString(
      'AbC',
      fillDefaultOptions({
        caseSensitive: true,
      }),
    ),
  ).toBe('AbC')
})

test('deburr', () => {
  expect(
    normalizeString(
      'THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG',
      fillDefaultOptions({
        deburr: true,
        caseSensitive: true,
      }),
    ),
  ).toBe('THE QUICK BROWN ƑOX JUMPS OVER DE LAZY DOG')

  expect(
    normalizeString(
      'THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG',
      fillDefaultOptions({
        deburr: true,
        caseSensitive: false,
      }),
    ),
  ).toBe('the quick brown ƒox jumps over de lazy dog')

  expect(
    normalizeString(
      'THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG',
      fillDefaultOptions({
        deburr: false,
        caseSensitive: true,
      }),
    ),
  ).toBe('THÈ QÛÌÇK BRÒWÑ ƑÓX JÚMPŠ ØVËR ÐË LÅŽŸ DÕG')
})

test('trimSpaces', () => {
  expect(
    normalizeString(
      '   abc   def  g ',
      fillDefaultOptions({
        trimSpaces: false,
      }),
    ),
  ).toBe('   abc   def  g ')

  expect(
    normalizeString(
      '   abc   def  g ',
      fillDefaultOptions({
        trimSpaces: true,
      }),
    ),
  ).toBe('abc def g')
})
