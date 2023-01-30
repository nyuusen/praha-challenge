## 課題1
### 片方のプレイヤーが勝利した状態を再現したe2eテストを書く
[ref](https://github.com/nyuusen/react-storybook-testing/commit/6ae60a6918fffaa0db0668356bebc53d19bbc6a2)

### なぜdata-e2eという属性を追加する必要があるか？
- スタイリングやスクリプトの変更からセレクタを分離させるため
  - classやidで指定すると、コーディング時の変更がe2eテストに影響してしまう
- 参考：https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

### 引き分けの時はDraw！と表示する実装に変更する　&　テストケース追加
[ref](https://github.com/nyuusen/react-storybook-testing/commit/5a761a955911d98cb44f3905b4cc736400ad87ad)

### 引き分けの状態を表示するStoryを追加する
[ref](https://github.com/nyuusen/react-storybook-testing/commit/3f718e1cae0ac9140e2eea58ed2f730d3ed5ac83)

### （任意）「Presentational」と「Container」コンポーネントの分け方
- ロジックとUIを分けて分けて実装し、関心の分離を図るフロントエンドのデザインパターン
- 責務が明確になる、テストがしやすくなる、Presentationalの再利用性が向上する効果がある
- Presentational
  - UIに関心を持ち、Propsで受け取ったデータをどのように表示するかのみを役割
- Container
  - アプリケーションのロジックに関心を持ち、APIや状態管理ライブラリから取得したデータをそれぞれのPresentational Componentに渡す役割を持つ

[Container/Presentationalパターン再入門](https://zenn.dev/kazu777/articles/9460c75b7cd8d1)
[コンテナ・プレゼンテーションパターン](https://zenn.dev/morinokami/books/learning-patterns-1/viewer/presentational-container-pattern)

### （任意）「Presentational」と「Container」の考え方は陳腐化しているという考えに対して
陳腐化しているという意見があまり拾えなかった。。
- フックを使えば分ける必要がない
- コード量が多くなる＝バンドルサイズが大きくなる
- 小規模なアプリケーションでは不要に複雑になりがち

## 課題2
### e2eテストのメリット
- 品質が良くなる
  - 単体テストレベルでは検知できないバグを発見できる
  - リグレッションテストやマルチブラウザテストが簡単に実行できる
- 繰り返し行われるテストにかかる時間を節約できる
- TDDがしやすくなる

### e2eテストのデメリット
- テストを書く工数の増加やCIに組み込んだ場合にビルドが遅くなる等、開発速度の低下に繋がる
  - 異常系も含めてテストを書くと結構な工数がかかる
  - 過去のPJでは、e2eテストを全てpassさせるために開発部隊の半分の人員がe2eテスター部隊に一時吸収されるなんてことがありました...
- 本来アプリケーション実行に不要な属性(data-hoge)がコードに紛れ込むので、コードの見通しが悪くなる
- 各テストの実行環境にゴミデータが増える

### テスト手法（単体、統合、E2Eなど）を選択する際、どのような基準で選ぶと良いでしょうか？
- 例えば要素のcssのclassを識別子に使うと、どのような時にどのような問題が起きるでしょうか？（cy.get('.red-button').click()など）
  - classの変更が行われた場合に、セレクタが特定されずエラーで落ちてしまう

- 例えば要素のcssのidを識別子に使うと、どのような時にどのような問題が起きるでしょうか？（cy.get('#button1').click()）
  - idの変更が行われた場合に、セレクタが特定されずエラーで落ちてしまう

- 例えば要素の文言を識別子に使うと、どのような時にどのような問題が起きるでしょうか？（cy.contains('ほげ').click()）
  - 文言の変更が行われた場合に、セレクタが特定されずエラーで落ちてしまう

- どのように要素を指定すればテストが壊れにくくなるでしょうか？
  - 開発時に変更される可能性が無い、テスト用の属性を指定するようにする

## 課題3 CypressStudio
[CypressStudioを用いてテスト作成](https://github.com/nyuusen/react-storybook-testing/commit/b328dc865d2b4c08a0e80998a60a222a95ce3dd5)

> Cypress Studioは実験的な機能であり、Cypressの設定にexperimentalStudio属性を追加することで有効にすることができます。

参考記事:[Cypress Studio](https://docs.cypress.io/guides/references/cypress-studio#Overview)

## 課題4　クイズ
1. e2eテストツールを自身で管理していないアプリに採用するのは慎重になる必要がある。なぜか？
2. (cypress)アプリケーションのベースURLの入力を省略したい場合、どうすればよいか？
3. (cypress)テストコードを短くするために各要素を変数に代入する方法は正しいか？
```exmple.ts
const a = cy.get('a')
a.first().click()
```

## 参考にした記事
[公式doc](https://www.cypress.io/)
[【入門】はじめての Cypress](https://qiita.com/eyuta/items/a2454719c2d82c8bacd5)
[E2EテストフレームワークのCypressに入門した](https://zenn.dev/manalink_dev/articles/manalink-cypress-introduce)