## DBモデリング1（注文表）
- 元の回答: https://github.com/nyuusen/praha-challenge/tree/main/db-modeling/db-modeling-1
- `order`を注文者/支払い/注文内容でテーブルを分割
- `menu`という基底クラスを作り、`menu_item`という子テーブルを作ることで、セットメニュー内でA商品はわさび入り、B商品はわさび抜きなどを表現できるように修正

```mermaid
erDiagram
staff ||--o{ order: ""
order ||--|| order_user: ""
order ||--|| order_payment: ""
order_menu }o--o{ order: ""
order_menu }o--o{ menu: ""
menu ||--o{ menu_item: ""
category ||--o{ menu: ""

order {
    uuid order_id
    uuid staff_id
}

staff {
    uuid staff_id
    varchar name
}

order_user {
    varchar order_user_id
    varchar name
    varchar tel
}

order_payment {
    uuid order_payment_id
    uuid order_id
    varchar total_amount
}

order_menu {
    uuid order_id
    uuid menu_id
}

menu {
  uuid menu_id
  varchar name
  uuid category_id
}

menu_item {
  uuid menu_item_id
  uuid menu_id
  varchar name
  integer quantity
  boolean is_with_wasabi
}

category {
  uuid category_id
  varchar name
}

```

## DBモデリング2（Slack）
- 変更なし([参考](https://github.com/nyuusen/praha-challenge/tree/main/db-modeling/db-modeling-2))

## DBモデリング3（ドキュメント）
- 元の回答: https://github.com/nyuusen/praha-challenge/tree/main/db-modeling/db-modeling-3
- 「ドキュメントは必ず何らかのディレクトリに属する」という仕様を網羅できていなかったため、`object`という基底クラスを削除
- 閉包テーブルを採用する大枠の設計方針は変更なし
- 最新記事情報を格納する中間テーブル(`document_detail_latest`)を追加
  - これまではsubquery内でウィンドウ関数を用いることで最新記事を取得する方向で考えていたため中間テーブルを作っていなかったが、最新記事を取得するクエリは使用頻度が高いため中間テーブルを作成した
  - あえて中間テーブルを作成した理由は、問題のある副作用(`update`)が発生した場合に影響範囲を小さく抑えるため

```mermaid
erDiagram
user ||--o{ directory: ""
user ||--o{ document: ""
user ||--o{ document_detail: ""
directory ||--o{ document: ""
document ||--o{ document_detail: ""
document ||--|| document_detail_latest: ""
document_detail ||--|| document_detail_latest: ""
directory }o--o{ directory_path: ""

user {
  string id
  string name
}

directory {
  string id
  string name
  boolean is_root
  boolean is_deleted
  string create_user_id
  timestamp create_at
  string update_user_id
  timestamp update_at
}

document {
  string document_id
  string create_user_id
  timestamp create_at
}

document_detail_latest {
  string document_id
  string document_detail_id
  string create_user_id
  timestamp create_at
  string update_user_id
  timestamp update_at
}

document_detail {
  string document_detail_id
  string title
  string content
  string document_id
  string create_user_id
  timestamp create_at
}

directory_path {
  string parent_id
  string child_id
  integer path_length
}

```

## DBモデリング4(リマインダー)
- 元の回答: https://github.com/nyuusen/praha-challenge/tree/main/db-modeling/db-modeling-4
- 履歴テーブル(`reminder_history`)を削除
  - 履歴を追いたいユースケースが考えられなかったため
- 頻度は`reminder_cycle`にcron形式で格納し、実行時に`next_remind_at`を更新していく
- 1時間ごとのバッチ処理で`next_remind_at`の値が1時間以内のものを抽出し、実行する
- リマインド実行時は、`user_reminder`に宛先ごとにinsertする
  - 完了ボタンが押されたらdeleteする

```mermaid
erDiagram
user ||--o{ reminder: ""
user }o--o{ user_reminder: "" 
reminder }o--o{ user_reminder: "" 
reminder ||--o{ reminder_target: ""
reminder ||--|| reminder_cycle: ""

user {
  string user_id
  string slack_user_id
}

user_reminder {
  string user_id  
  string reminder_id
}

reminder {
  string reminder_id
  string content
  date next_remind_at
  string create_user_id
  timestamp create_at
  string update_user_id
  timestamp update_at
}

reminder_cycle {
  string reminder_id
  string reminder_id
  string cycle
}

reminder_target {
  string id
  string reminder_id
  string user_id
}

```

## 課題5（編集履歴を保存できるブログサービス）
- 元の回答: https://github.com/nyuusen/praha-challenge/tree/main/db-modeling/db-modeling-5
- DBモデリング3と同じ理由で最新記事テーブルを追加

```mermaid
erDiagram
article ||--o{ article_revision: ""
user ||--o{ article: ""
user ||--o{ article_revision: ""
article ||--|| article_latest: ""
article_revision ||--|| article_latest: ""

user {
  uuid id
  varchar name
}

article {
  uuid article_id
  integer status
  uuid create_user_id
  timestamp create_at
}

article_latest {
  uuid article_id
  uuid article_revision_id
}

article_revision {
  uuid article_revision_id
  varchar title
  text content
  uuid article_id
  uuid create_user_id
  timestamp create_at
}

```