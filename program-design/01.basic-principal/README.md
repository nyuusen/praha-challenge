## 課題1
### SOLID原則とは？
オブジェクト指向プログラミングにおいて、変更しやすい・理解しやすい・再利用しやすいモジュール（クラスや関数などの、ソフトウェアのを構成する部品）を設計・開発するための原則のことで、Robert C. Martinに提唱された多くの設計原則を5つにまとめたものの頭文字をとって命名されたもの。

これらの原則を守ることで、保守性(コード変更時の影響範囲が小さく、その特定もしやすい)や拡張性(モジュールを再利用できる)を高められるメリットがある。

### S … Single Responsibility Principle: 単一責任の原則
関数やクラスは、1つの責務のみを果たすべきという原則のこと。
つまり、関数やクラスで1つ以上のことをやってはいけないという設計ルール。

- 単純にファイルを細かなファイルに分解することとの違いは？
  - 「責務」という観点を持っているか/責務は1つかどうかが異なる。細かくファイルを分割をしても、クラスや関数が2つ以上の責務を負っている可能性がある。

- トリオセッションmemo
  - 責務が1つかどうか？の判断軸＝**その関数やクラスの変更理由が1つであるか？**

### O … Open-Closed Principle: 開放閉鎖の原則
ソフトウェアを構成するモジュールは、拡張に対して開いていて（Open）、修正に対して閉じている（Closed）べきであるという原則。
つまり、既存機能の修正時は既存コードを変更をせずに修正できること、新機能の追加時は新しいモジュールを追加するだけで実装できる設計ルール。

- Open-Closed-Principleの実例を一つ考えて、作成してみる
  - 後でやる。

### L … Liskov Substitution Principle: リスコフの置換原則
部品Tとその派生型である部品Sがあるとき、部品Tが使われている箇所はすべて部品Sで置換可能になるように部品Sはつくられているべきであるという原則。ここでいう「部品」は、TypeScriptでいう型やクラスのこと。
つまり、「親の決まりを子が破ってはいけない」という、クラス設計のルール。

- リスコフの置換原則に違反した場合、どのような不都合が生じるか？
  - 子が親のインタフェースを変更して実装するとバグの原因となる,拡張性が下がる。

### I … Interface Segregation Principle: インターフェイス分離の原則
インターフェイスとクライアント（インターフェイスの利用者）がいるときに、インターフェイスに用意されてある不必要なメソッドやプロパティ（利用するクライアントにとって不必要）にクライアントが依存しなくてもよいように、分割できるインターフェイスは分割するべきであるという原則のこと。

- インターフェースを用いる事で、設計上どのようなメリットがあるでしょうか？
  - 変更に強い設計になる。
    - 不要なメソッドやプロパティに依存していると、本来必要ないメソッドやプロパティの変更による影響を受けてしまうので、コード修正時の影響範囲が大きくなる。
  
### D … Dependency Inversion Principle: 依存性逆転の原則
あるモジュールが別のモジュールを利用するとき、モジュールはお互いに直接依存すべきではなく、どちらのモジュールも、共有された抽象（インターフェイスや抽象クラスなど）に依存すべきであるという原則。

- どんな時に依存性の逆転を用いる必要が生じるのでしょうか？
  - 変更する可能性が高い実装の詳細を行うときに用いる（ex.外部モジュールに依存している等）

### デメトルの法則
「知らない人とは話さないで、親しい人とだけ話して」ということ。
要は「親クラス.子クラス.子クラスのメソッド/プロパティ」の様な形で、メソッド/プロパティを呼び出すのはNGという意味。

[wiki](https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%A1%E3%83%86%E3%83%AB%E3%81%AE%E6%B3%95%E5%89%87)に書いてあった分かりやすい例：
> 簡単な例として、犬を散歩に連れ出すことを考える。この際、犬の足に直接「歩け」と命じるのはおかしいだろう。この場合は、犬に対して命令し、自分の足の面倒は自分で見させるのが正しい方法だといえる。

- この法則を守ることで、どのようなメリットがあるのでしょうか？
  - 変更に強い設計になる。
    - `objA.objB.objC`のような呼び出しが行われることで、モジュール同士の結合度が高くなり、保守性や拡張性が低下する。
  - [このコード](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCuAnYALSBTaBvAsAKGmgAdEBLANzABdMB9eCdRASQBMAuaCKsgOwHN8hEhWp0SAe1bxgVNp259BBaMAm9FMqhMQAKBk3lcepAQBpiiKVqOLT-AJTYhhV1RSkIAOnqMWraABeaAN-F1dod08fSWlZNiDLa3jWFwBffBcAeizoQAbTQC65QBgGQGUGQDEGQBCGQGMGQDMGfnQqGkQsxkamQCSGQCztQEr-QHUGGsAhBkAlBkAYhkAHBkBxhkBDhkAJhkBrhkA7BkBVm0BxJUBrBkB7BkBVBMBZ5V7APwZAbQZAZIZACIZAWwZAQH-AWAYXIngAIxBSYGh6qhC-Nl0nXBUIxANJC8SIeby+QypFQZFT3J4vLgNT6Q3SkVi-cJuME+UIJYJo9J3R7PV7vJJxOSsH7Of6uQFUYGg6K0WI2KGEGHCYkI1rktmo9E0iKEKLg1kpRIE6H4NJAA)の保守性がないことを説明する
    - プロパティを直接見ており、内部の構造を知っているという点で変わりがない。Purchaseクラスに新たなプロパティが追加された場合、getter/setterも追加する必要があり、保守性は高くない。

## 課題2
### [このコード](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgAoFcoIBZwM4oDeAUMsugVAJIAmAXMnmFKAOanIAOUA9jegjC0GTFiHZlmcEHkRhgPEAxJkyeAUgg0tDZuggcyCHgFtOAGwiQaAQTAMAInEgcAvsXfFQkWIhSo4AE8TCHAAJQhjKBoIzh5kFWRWKwwsXAI8ACFAhgAKCmhhRmY2AEpkAF4APjRMHHwIAG0AXQ9iYgRzfDxatIaAZWgAN2AkBI5OdAAjc1HkYxk9QR4oXO5gIecUTiCQ8MiVmIg4hgDg0LAIqKO48sJPMkmZucm+gnzKItE2ABouXn4gi+JXEd0M80UTGQcHM5lS9QylWQYGwwDwADodud9tdYjx0ckwPD0hAsoEPoUaKVwQsoTsmMSGkiYXC6iSMTBQDRcmtytUuJiAQIhDRKhUKv8+MLaMgAGSygVSGRyBQgdHqBCabRU8HAGDINb4Ilshpg1SqFG8ADuyBAEBtAFEoLxVgByQDKDIA7BkAYqqAQZVAPYMgCkGQBODIALBkAUQyAVQZAH4MgAA5X2ABTTAFnagHMGQCaDIBAf9d1PND1UAHp88hAD8xgFNFQDSRoAs30AsgyAawZAEwJgACGNweIA)に潜んでいる問題点
- 「購入する」というサービスに購入という責務以外のロジックが混入しているため、このロジックに変更が入る度に肥大していく
- 修正方針：商品が購入できるかどうかのロジックは別のメソッドとして切り出すことによって、購入サービスは「商品を購入する」という1つの業務に集中できる。購入に関するロジック変更の影響を受けない。

- トリオセッションを受けて追記
  - このコードの問題点はアプリケーションで重い処理を行なっていること
    - 例えば、ユーザーが大規模テナントの場合、毎処理で何万ものレコードが取得される
    - インフラ的なコストが高く、メモリも食いそうなのでパフォーマンスも懸念される
  - では、、SQLレベルで購入歴のある商品を取得すれば良いか？
    - 性能やコスト面でメリットがありそう
    - ロジックが複雑になった時に、膨大なSQLが出来上がる
  - 元々のアプリケーション側で実装するのはどうか？
    - 上で述べたようにコストやパフォーマンス面で懸念がある
    - ただ、要件変更に対する拡張性や保守性はSQL高そうではある
  - どちらが良いか？
    - 要件が簡単だったり変更可能性が低い場合：SQLレベルで実装する
      - 取得するデータ量があまりに多い場合も、SQLで実装した方が良いかもしれない
    - 要件が難しい（SQLでの実装が難しい・膨大になりそう）とか変更可能性が高い場合：アプリケーションレベルで実装する


## 課題3
### [このコード](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCmAnCB7AdtA3gWAFDQOgAcBXAIxAEtho0wBbeALmggBdFK0BzPQ48lRrswiAOopEAay7cAgmxYARMG3h9CwdO0QlgbSQAo6jFjtkAaVm1FsJ02QuWr4ASiwb+BNgAtKEADoTeGgAXloGdXwvbz9AkXFJGR4FMOtbe2T5Nk9oAF88Atw8UEgYAGEUeiIwNABPD2iCUgpqYngUIhBmOCRUNABtAF1crTQdPQNEQyIOrp6EZHRh9xwmr19-ANnO7rSd+dyiopLtNmgtatqG8LR4AHdoSqv6wwG7x8X+wwByMB+rB9oCo1L8AEwABjBAEYALQQuEIn6uVyAh69JZoX5kAG0dEg+DgqGIuHQ5GuIauU7jc4AM0oyDYX3QaUuNXq2zm3QGEJGxVwAHoBdBAKrygEiGQDSDIA7BkAtwyADoZAMMMgHqGQDWDIB-eUAFK6ATQZANEMgH0GQCBDIBABmZGDkUsAJ0qATaVANGpgGnNQCnpoAkhkAa8qAKIZAF+KWup7GgABMXGl6YzTQEEplHDl+ULoIBVBkAfgyANQZ44ArBnlysA5gyawDqDIAzBkAIgw6lMSjOAEqjAMYMucAL2aABtM89n44AxBjwAbUYfgbAAYiQQCAAJrwUSGaEQ0dU3DB9ih4JpH70FB+yj0+B+iKMH54H0oboBEAobiGNnXdwxo-1KWAWjkVYBqFXjgBiGAt603Qc3W+0OwAyDIBITUA8QyVhuNoAgP94EAA)に潜んでいる問題点
- 外からプロパティを書き換えられてしまう
- 修正方針：readonly属性をつける

### getter/setterだけでは解決しない理由
- getter/setterを用いた所で外から直に操作されることは防げないから

## 参考記事
- [TypeScriptでSOLID原則〜単一責任の原則〜](https://www.membersedge.co.jp/blog/typescript-solid-single-responsibility-principle/)
- [TypeScriptでSOLID原則〜開放閉鎖の原則〜](https://www.membersedge.co.jp/blog/typescript-solid-open-closed-principle/)
- [リスコフの置換原則（LSP）をしっかり理解する](https://qiita.com/yuki153/items/142d0d7a556cab787fad)
- [【SOLID原則】リスコフの置換原則 - LSP](https://zenn.dev/chida/articles/5373e135be11f0)
- [TypeScriptでSOLID原則〜リスコフの置換原則〜](https://www.membersedge.co.jp/blog/typescript-solid-liskov-substitution-principle/)
- [TypeScriptでSOLID原則〜インターフェイス分離の原則〜](https://www.membersedge.co.jp/blog/typescript-solid-interface-segregation-principle/)
- [TypeScriptでSOLID原則〜依存性逆転の原則〜](https://www.membersedge.co.jp/blog/typescript-solid-dependency-inversion-principle/)
- [デメテルの法則とは？深堀してみた](https://zenn.dev/miya_tech/articles/b59916140347e2)
- [デメテルの法則を厳密に守るにはどうすればいいの？](https://qiita.com/br_branch/items/37cf71dd5865cae21401)