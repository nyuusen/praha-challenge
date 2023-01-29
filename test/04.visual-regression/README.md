## 課題1
- `npm run test`実行時に`Cannot find module 'puppeteer-core/internal/puppeteer-core.js'` が発生
  - https://stackoverflow.com/questions/74078944/cannot-find-module-puppeteer-core-internal-common-device-js を発見
  - 似たようなエラーなので`npm i puppeteer@18.1.0`を実行
- `spawn Unknown system error -86`が発生
  - issueを検索するとM1の場合に発生する問題ぽい。。
    - https://github.com/puppeteer/puppeteer/issues/9011
    - https://github.com/puppeteer/puppeteer/issues/8960
  - 解決策としてはRossetaをインストールすれば直るようですが、コストが高すぎるのでやめました。。

## 課題2 2つを比較した時のメリデメ
### ビジュアルリグレッションテスト
- メリット
  - ツールによっては差分を赤く表示してくれたりするので、テスト結果が視覚的で分かりやすい
  - デザイン崩れなど主にレイアウトに関するバグを防止しやすい
- デメリット
  - ピクセル単位の比較・テストになるため、少しのスタイル調整でも簡単にテストが失敗してしまう。その度に正解にスナップショットを登録したりとメンテナンスコストが発生する
  - ライブラリによっては、出力したスクリーンショットを保存する先として、クラウドストレージを用意する必要があり、コストと手間がかかる
  - スナップショットテストより実行時間が長い

### スナップショットテスト
- メリット
  - 画面に現れない属性（altなど）の変更を検知できる
  - コードベースでの比較になるため、
    - 差分をテキストエディタなどで容易に確認できる
    - 差分があった箇所を特定しやすい
- デメリット
  - 差分が発生した場合、その差分が意図した変更なのかどうか即座に判断しづらい
  - 描画されたものを比較するわけではないので、デザイン面でのバグを防止するのが難しい
  - 実際の描画内容、例えば参照しているimageのpathは変更ないが中身が変更された場合などの検知が難しい

## 課題3
1. ビジュアルリグレッションテストはプロダクトのどのフェーズで導入するのが良いか？（クイズというか皆さんの意見を聞いてみたいだけです..）
2. 画像にalt属性が含まれるかを確認したい場合、ビジュアルリグレッションテストとスナップショットテストのどちらを採用すべきか？

## 参考にした記事
- [制作現場におけるビジュアルリグレッションテストの導入 - 「LINEのお年玉」4年目の挑戦](https://engineering.linecorp.com/ja/blog/visual-regression-otoshidama/)
- [Visual Regression Testing はじめました - 具体的な運用Tips](https://blog.recruit.co.jp/rmp/front-end/visual-regression-testing/)
- [ビジュアルリグレッションテストのツールを導入するまでの意思決定プロセス](https://devblog.thebase.in/entry/process-of-introduction-of-chromatic)

