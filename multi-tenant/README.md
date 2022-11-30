## 課題1
1. データベースを分離する
2. データベーススキーマを分離する
3. Row-Level Securty（行レベルセキュリティ）による制御

- 1はコストがかかるのと運用管理が非常に大変
- 2はテナント数が増えた場合にマイグレーションに時間がかかる→RLSに移行という記事をいくつか見たので最適解ではなさそう
 - https://buildersbox.corp-sansan.com/entry/2021/05/10/110000
- 2と3で迷うが、あえて2を選ぶ理由もないので3を採用する

- 参考にした記事
  - [マルチテナント SaaS を設計する際に参考になった資料](https://qiita.com/nassy20/items/99ff3d7ac0fb00989aef)
  - [【PostgreSQL】PostgreSQLのスキーマ（Schema）について](https://tech.pscsrv.co.jp/2021/08/02/%E3%80%90postgresql%E3%80%91postgresql%E3%81%AE%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%EF%BC%88schema%EF%BC%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)
  - [マルチテナント化で知っておきたいデータベースのこと](https://www.slideshare.net/AmazonWebServicesJapan/20220107-multi-tenant-database)


## 課題2
### 各手法メリットとデメリット
1. データベースを分離する
   - メリット
     - WHERE句でのテナントを絞ること、スキーマの特定が不要であるため、SQL起因によるバグが最も少ない
     - あるテナントでのDB障害が他テナントに影響しない
     - 可用性やスケールアップなどDB構成をテナント毎に設定可能
   - デメリット
     - DBがテナント数分必要になるのでコストがかかる
     - DBが多い分、マイグレーションなどの運用管理が大変

2. データベーススキーマを分離する
- メリット
  - 1と比較して、
    - テナント作成が容易（スキーマを作成するだけ）
    - コストがかからない
  - - 同一テナントのデータが同テーブルに混ざらないためセキュリティ性が高い
  - デメリット
    - テナントに比例してテーブルが増える
      - キャッシュ上限に達し、パフォーマンスが極端に劣化するケースがあるらしい
    - 障害発生時に全テナントが停止する
   
3. すべてのテナントで同じスキーマを使う
    - メリット
      - 2と比較して、
        - テナント作成が容易（テナントテーブルにレコードを追加するだけ）
        - コストがかからない 
      - マイグレーションに最も時間がかからない
    - デメリット
      - WHERE句での絞り込み漏れが発生した場合、他テナントのデータが表示されてしまうリスクがある
      - 障害発生時に全テナントが停止する

### RLS（Row-Level Security）の実装方法
- 作成したテーブルの`ENABLE ROW LEVEL SECURITY`を適用する
```
ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;
```

- 作成したテーブルに対して、`CREATE POLICY`する
```
CREATE POLICY tenant_policy ON invoice
    USING (tenant_id = current_setting('app.tenant_id'));
```

- コネクション取得時にテナントIDを設定する
```
SELECT set_config('app.tenant_id', :tenantId, false);
```