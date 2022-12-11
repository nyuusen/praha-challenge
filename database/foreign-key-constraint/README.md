## 課題1
### 外部キー制約を定義しない場合に生じる問題
- 参照整合性を担保できない
  - author_idに存在しない値が入る可能性がある
- author削除時の制約や動作をアプリケーション側にロジックを書く必要がある
  - 例えばauthorが削除されたら、紐づくbookを削除したい/bookが存在する場合はauthorを削除できないようにする等

### 外部キー制約を定義した場合に生じる問題
- bookが存在している場合、authorを削除することができない
- 意図しない子テーブルの削除等が発生する可能性がある(他の開発者から見えずらい)
  - 例えば開発者のミスによりDDLを書き間違える
- DBレベルでの余分なチェックにより、パフォーマンスに影響が生じる可能性がある

## 課題2
### 選択可能な参照アクション
|    |  UPDATE  |  DELETE  |
| ---- | ---- | ---- |
|  RESTRICT  |  エラーになる  |  エラーになる  |
|  CASCADE  |  参照先の変更に追従する  |  参照先が無くなると同時に削除される  |
|  SET NULL  |  NULLに置き換わる  |  NULLに置き換わる  |
|  NO ACTION  |  RESTRICTと同じ  |  RESTRICTと同じ  |

### 従業員管理サービス
- 部署が削除されたら、その部署に所属している従業員も削除されてしまう
- 例えば、部署の統合や廃止が発生し、所属している従業員は他の部署に異動する場合、先に部署を削除してしまうと誤って従業員が削除されてしまう
  
### プロジェクトマネジメントツール
- 従業員が退職などの理由で削除された場合、その従業員が任命されていたIssueは担当者が任命されていないデータになってしまう

### ORMの参照アクションに設定されているデフォルト値
- Prisma
  - onDelete: SetNull
  - onUpdate: Cascade
    - DBMSのデフォルト値と異なるのはちょっと違和感がある（意図もあまり分からない）
  - [参照アクションのデフォルト](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions#referential-action-defaults)
- TypeORM
  - onDelete: Restrict
  - onUpdate: Restrict
    - defaultで最も制限を強くしておくことで、開発者が設定を忘れた場合に意図しないデータ更新や削除が発生しないようにしている（MySQLのデフォルトでもある）


### MySQLとPostgreSQL RestrictとNo Actionの違い
- MySQL
  - RestrictとNo Actionは同じ挙動であり、すぐに存在チェックが実行される
  - https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
- PostgreSQL
  - No Actionはdeferred check(遅延チェック)のことであり、同一トランザクション中で存在チェックを後回しにすることができる
  - Restrictは、MySQLのRestrict/No Actionと同じく、すぐに存在チェックが実行される
  - https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK
  - https://www.postgresql.jp/document/8.0/html/ddl-constraints.html

## 課題3
- 外部キー制約は全ての親子間で使用すべきか？
- 現場でDB設計をする際、どのような判断軸で外部キー制約要否を判断すべきか？

## 参考
- [外部キー制約は何も考えずに適用するとよくない](https://blog.j5ik2o.me/entry/2020/06/16/105311)
- [MySQLの外部キー制約RESTRICT,CASCADE,SET NULL,NO ACTIONの違いは？](https://qiita.com/suin/items/21fe6c5a78c1505b19cb#%E3%81%BE%E3%81%A8%E3%82%81)
- [外部キー制約が一切ないと何に困るのか？](https://zenn.dev/praha/articles/2667cbb1ab7233)