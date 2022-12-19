## 課題1： ドキュメント読む
- toBeとtoEqual
  - toBe は Object.is を使用して厳密な等価性をテストします
  - オブジェクトの値をチェックしたい場合は、代わりにtoEqualまたはtoStrictEqualを使用します
  - toEqual は、オブジェクトまたは配列のすべてのフィールドを再帰的にチェックします
    - toEqualは未定義の値を単に無視するのに対し、toStrictEqualは未定義の値を考慮するため、toEqualよりもtoStrictEqualを使用することが望ましいとされています
  - [jest の toBe と toEqual の違いを比較](https://qiita.com/shts/items/99c36c4b84c3d63e7f19)

## 課題2
- [単体テストはこちら](./jestSample/__tests__/functions.test.ts)
- ビルド時にエラーが発生するケースをテストする必要があるか？
  - 不要だと思う
  - もしカバーするとなると、かなりのテストケースを網羅する必要があり現実的ではない
- 