import * as func from '../functions'

test('sumOfArrayが正しい計算結果を返す', () => {
  expect(func.sumOfArray([1,2,3])).toBe(6);
})

test('asyncSumOfArrayが正しい計算結果を返す', () => {
  func.asyncSumOfArray([1,2,3]).then((res) => expect(res).toBe(6))
})