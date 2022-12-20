import * as func from '../functions'
import { NameApiService } from '../nameApiService';
import { DatabaseMock } from '../util'

jest.mock('../util');
jest.mock('../nameApiService')

describe('課題2', () => {
  describe('sumOfArray', () => {
    it('[1]を渡すと1が返却される', () => {
      expect(func.sumOfArray([1])).toBe(1);
    })
    it('[1,2,3]を渡すと6が返却される', () => {
      expect(func.sumOfArray([1,2,3])).toBe(6);
    })
    it('空配列[]を渡すと例外が投げられる', () => {
      expect(() => func.sumOfArray([])).toThrow();
    })
  })
  describe('asyncSumOfArray', () => {
    it('[1]を渡すと1が返却される', () => {
      expect(func.asyncSumOfArray([1])).resolves.toBe(1);
    })
    it('[1,2,3]を渡すと6が返却される', () => {
      expect(func.asyncSumOfArray([1,2,3])).resolves.toBe(6);
    })
    it('空配列[]を渡すと例外が投げられる', () => {
      expect(() => func.asyncSumOfArray([])).rejects.toThrow();
    })
  })
  describe('asyncSumOfArraySometimesZero', () => {
    const mockedDb = new DatabaseMock();
    beforeEach(() => {
      jest.restoreAllMocks();
    })
    describe('saveが正常に処理される', () => {
      beforeEach(() => {
        jest.spyOn(mockedDb, 'save').mockImplementation(() => {});
      })
      it('[1]を渡すと1が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([1], mockedDb)).resolves.toBe(1)
      })
      it('[1,2,3]を渡すと6が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([1,2,3], mockedDb)).resolves.toBe(6)
      })
      it('[]を渡すと0が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([], mockedDb)).resolves.toBe(0)
      })
    })
    describe('saveが例外をthrowする', () => {
      beforeEach(() => {
        jest.spyOn(mockedDb, 'save').mockImplementation(() => {throw new Error();});
      })
      it('[1]を渡すと0が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([1], mockedDb)).resolves.toBe(0)
      })
      it('[1,2,3]を渡すと0が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([1,2,3], mockedDb)).resolves.toBe(0)
      })
      it('[]を渡すと0が返却される', async() => {
        expect(func.asyncSumOfArraySometimesZero([], mockedDb)).resolves.toBe(0)
      })
    })
  })
  describe('getFirstNameThrowIfLong',() => {
    const nameApiServiceMock = new NameApiService();
    beforeEach(() => {
      jest.restoreAllMocks();
    })
    describe('getFirstNameがtaro(4字)を返す', () => {
      beforeEach(() => {
        jest.spyOn(nameApiServiceMock, 'getFirstName').mockImplementation(() => Promise.resolve('taro'));
      })
      it('最大値5字を渡すとtaroが返却される', () => {
        expect(func.getFirstNameThrowIfLong(5, nameApiServiceMock)).resolves.toBe('taro');
      })
      it('最大値4字を渡すとtaroが返却される', () => {
        expect(func.getFirstNameThrowIfLong(4, nameApiServiceMock)).resolves.toBe('taro');
      })
      it('最大値3字を渡すとtaroが返却される', () => {
        expect(func.getFirstNameThrowIfLong(3, nameApiServiceMock)).rejects.toThrow('first_name too long');
      })
    })
    describe('getFirstNameが例外をthrowする', () => {
      const errorMessage = 'firstName is too long!'
      beforeEach(() => {
        jest.spyOn(nameApiServiceMock, 'getFirstName').mockImplementation(() => { throw new Error(errorMessage); });
      })
      it('最大値5字を渡すと例外が返却される', () => {
        expect(func.getFirstNameThrowIfLong(5, nameApiServiceMock)).rejects.toThrow(errorMessage);
      })
      it('最大値4字を渡すと例外が返却される', () => {
        expect(func.getFirstNameThrowIfLong(4, nameApiServiceMock)).rejects.toThrow(errorMessage);
      })
      it('最大値3字を渡すと例外が返却される', () => {
        expect(func.getFirstNameThrowIfLong(3, nameApiServiceMock)).rejects.toThrow(errorMessage);
      })
    })
  })
  
})

