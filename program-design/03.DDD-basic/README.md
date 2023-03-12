# ドメイン駆動設計
## 課題1
それぞれの用語を説明する。
### **エンティティ**
- ドメインモデルをコードで表現するパターンの1つで、一意なものを表現する概念のこと。
- 変化する。
  - 例：社員番号001の山田さん。部署が変わろうが太ろうが山田さんであることに変わりはない。
- 識別子(IDなど)が同一であれば同一のものである。

### **値オブジェクト（バリューオブジェクト）**
- これもドメインモデルをコードで表現するパターンの1つで、何か特定の1つの概念をクラスで表すこと。
- 一意に識別して変更を管理する必要がないもの
- 同一性判定：保持する属性が全て同一であれば同一
- 可変性：不変。生成されたら、破棄されるのみ。
  - 例：10円玉。Aさんが持つ10円もBさんが持つ10円も金銭的価値は同じであるとしたい＝値オブジェクトとする。
  - ただし、文脈やモデリングにより、造幣局で考えた時はこれらの10円は別として扱いたい場合がある。
- 参考
  - [DDDにおける値オブジェクトの位置付け(モデルとコード事例あり)[ドメイン駆動設計]](https://little-hands.hatenablog.com/entry/2022/08/15/value-object-in-ddd)

### **エンティティと値オブジェクト**
- どちらもドメインモデルをコードで表現するもの。
- 頻繁にモデルを改善し、それをコードに反映し続けるためのただの手段である(制約ではない)
- モデルを「オブジェクト(値と振る舞いを持つモノ)」として表現するのがEntityとValueObjectである
- 同一性判定と可変性が異なる
- これら2つは「Entityが自身の属性としてValueObjectを保持する」という関係が成り立つ
- 私見：UserというIDなどで一意に特定できる大きい概念をEntity、その中にUserIDなどがValue-Object？
  - ではNameやEmail等のように変更され得る属性は何に該当するのか。。
- 参考
  - [DDD基礎解説：Entity、ValueObjectってなんなんだ](https://little-hands.hatenablog.com/entry/2018/12/09/entity-value-object)

### **集約**
- オブジェクトのまとまりを表し、整合性を保ちながらデータを更新する単位。
- 集約は主に「エンティティ」から構成される（IDで識別することが重視されるため）
- 外部から集約を操作する場合、集約ルートのみ参照することができる。
- 参考
  - 図が分かりやすい◎：[実践DDD本 第10章「集約」～トランザクション整合性を保つ境界～](https://codezine.jp/article/detail/10776) 

### **ユビキタス言語**
- 全員で同じ言葉でコミュニケーションを行うための共通言語

### **境界づけられたコンテキスト**
- 何か1つのモデルなどをある境界によって分割されたもの。
- システムが大規模になると、関係者すべてで統一したモデルを作ることは難しくなるため、大きなシステムを「境界づけられたコンテキスト」に分割し、それぞれの中でモデル、言語の統一を目指す
- 例：商品モデルを「販売コンテキスト」と「配送コンテキスト」に分割する
- 参考
  - [境界づけられたコンテキスト 概念編 - ドメイン駆動設計用語解説 [DDD]](https://little-hands.hatenablog.com/entry/2017/11/28/bouded-context-concept)

### **ドメイン**
- アプリケーションが対象とする業務領域

### **ドメインサービス**
- ドメインモデルが扱う「（EntityやValue-Objectで表現できないような）粒度の細かい処理」を担うオブジェクトのこと。
- モデルをオブジェクトとして表現すると無理がある時に使用する
  - 例：予約オブジェクトにおける「特定の時間に空きがあるか？」
  - その知識をドメインが答えられるとモデリングするのは無理があるのでドメインサービスとして扱う。
- 注意：極力EntityとValueObjectで表現できないかを検討して、どうしてもできない時のみ使うようにする

### **リポジトリ**
- エンティティや値オブジェクトから構成される集約の格納と取得を行うレイヤー。
- ドメインモデルを永続化する、保管庫的や役割を担う
  
### **アプリケーション（ユースケース層と呼ばれることも）**
- 特定のユースケースのイベントフローごとにメソッドを提供するレイヤー。
- あくまでタスクの調整役で、薄い処理を行うだけのレイヤーであり、この点でビジネスロジックを持つドメインサービスと対照的と言えます。
- 参考
  - [DDDにおけるアプリケーションサービスとドメインサービスの違い](https://qiita.com/takeshi_nozawa/items/5d47333674bb5e6a82a5)

### **CQS/CQRS（似ているため、違いを重点的に調べてみましょう）**
- CQS -> コマンドクエリ分離原則(Command-Query Separation:CQS)
  - オブジェクト単位でメソッドの責務を更新と取得に応じて明確に分離すること。
  - 安全性を高めるために「コマンド(更新)」と「クエリ(取得)」を分けようっていう原則、発想。

- CQRS -> コマンドクエリ責務分離原則(Command-Query Responsibility Segregation:CQRS)
  - 1つのオブジェクトをコマンド用オブジェクトとクエリ用オブジェクトに分離すること。
  - CQSをアーキテクチャレベルに適用したもの。
- 参考
  > CQRS自体の定義は「オブジェクトをコマンオブジェクトドとクエリオブジェクトに分離すること」で、明確に責務が分離したシステムが登場する副次的な効果としてデータベースレベルでの分離なども視野に入ってくる、みたいな理解に落ち着いています。
  - [CQRSとCQSの違い](https://zenn.dev/praha/articles/4da7c1f91fb91f)
  
### **DTO**
- Data Transfer Objectの略。
- 単なるデータの入れ物。メソッドは持たない。
- ドメインオブジェクトをアプリケーションより外の世界に流出させてしまうと、意図しない振る舞いの呼び出し等が行われてしまう可能性があるため、定義される。
- 私見：DTO＝ドメインオブジェクトーメソッド＋外の世界で良い感じに扱えるように加工？
- 参考
  - [DTO を用意してドメインオブジェクトの流出を防ぐ](https://bamboo-yujiro.hatenablog.com/entry/2020/03/08/140950)
  - [お前らがModelと呼ぶアレをなんと呼ぶべきか。近辺の用語(EntityとかVOとかDTOとか)について整理しつつ考える](https://qiita.com/takasek/items/70ab5a61756ee620aee6#data-transfer-objectdto)

### **ドメインモデル貧血症**
- オブジェクト指向設計の基本である「データと処理を一緒に取り扱う」ことを行わない、単なる手続き型設計のこと。一見、ドメインモデルと同じような構造を持ちつつも、オブジェクトの「振る舞い」が不足している状態を指している。

## 課題2　境界づけられたコンテキストとバリューオブジェクト
### 境界づけられたコンテキストの実例
商品モデルを販売と配送とで分割すると、それぞれが境界づけられたコンテキストとなる
- 「販売コンテキスト」：商品の金額や商品名
- 「配送コンテキスト」：配送先、配送状況

### プロパティがデータ型であることによって生じる問題は？
（値オブジェクトとの比較すると..）
- 品質が下がる＝バグ発生要因が多い
  - 値の取り違い(1つのクラスに異なる概念が入り混じるため)
  - 不正な値(値の検証が行われず意図しないnullが発生する可能性がある)
- 可読性が低い(1つのクラスに異なる概念が入り混じるため)
- 参考
  - [DDD に入門するなら、まずは ValueObject だけでもいいんじゃない？ - Qiita](https://qiita.com/t2-kob/items/9d9dd038fe7497756dbf#-%E3%81%BE%E3%81%9A%E3%81%AF-value-object-%E3%81%8B%E3%82%89)
  
### Humanエンティティの各プロパティを値オブジェクトに書き換える
値オブジェクトに書き換えたコード：[TypeScript: TS Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEASCuBbMA7AkgE2gbwFDQOgAcAnASwDcwAXAU2hNrAwHsUQBPaAfTIwC5oEauRQBzANy58hYG2El4waixIAKKiHi1BCsuICUOGYUJkAZtDUBCagAsyEAHSOAgiCJ3USWuWAawLVoDI3sSFgB3aBRaKIBREnD1AxNTaHtHJ14sAF5oTW1UgF9U1NJKGno3Dy8UHz8rAp0hEX0xA34AIxYWECYUYzTZeWpoQM9vRF8yYBg8pqdkamA7NQB6AD0AbTAAWgAvV12ALQBdAGoAEjWjAB9b6C3T1NNGangSAfHa+pnnPvE9mgAD5oAAGYq4Eq4OQoYTQABCIB6GAAKhwiPQ8nhTK5BAByMD4gA0qQRBM6JNSrnJ0EJlNJpgA8gSWPioWMYLDhNJqBj6EiUejMdA8nzMSxLIKWGj+VsANa0DiS9L8lXS2WY05SXBrNbQVFMgAiLOggF8VQCwKoBpBkAkQwAYXAUEASQyAKSVACZpgE0GQDRDDDHTANcLaA7IDAcYRylQ6AwmKx2FxuJ1kTLA7pWuIdaZuSIlCp1E1U6J2oMhtALFZbA5nI4AGqBPgBIIhdJ2cJRGLxRKqNQpEvNzIJpOarH5QKFUwlUxlciRqoQWsgPiNUfNPSGLo9PqoYtDN4fAZMzoAK1oyicTQgagD-IMTggLCmalGOVBT5y82XPcIJWhoBDiLIJD2EalTbsQ04gYwzBsJwPCdABQGVAWbQZsMcLZsoXb5i0hZGGGQxljYGRVnOdYYA22hNmEkTRLE0AJEk3YvIQRFZHBgF2MBUbvkEkKTqYEYgTWpFLkESFrt0vT9KBmYjNAGAgXk7bQJxtDkcETEELunzQNYjgAHJgHpajyXQThiLQ1Aqd2n4EN+0hZtAACyrgABrcHpriOXE3AADJxHpADiqKwKK0AAIwAJyctAWb2X60AGVMoECVGkGxjB3AoGAUxiZI0gyWhigYXmy65bhGmlpYhGVi4JELmRTSUS21FKfRXY2WkLGZdlw5NLxhBThUUZCfVInaGV66SVueFpFpAwLACYhAgAPHkzluR5Xm+f5QWwJCJRAA)

## 課題3　ドメイン知識が漏れる
- ドメイン知識が漏れているコードを書く：[TypeScript: TS Playground](https://www.typescriptlang.org/play?ssl=19&ssc=2&pln=1&pc=1#code/MYGwhgzhAECSAuBTAttA3gKGt6AHArgEYgCWw0JEAMiciUgCYBc0hA9myImAHYZY5gbHhHgAnfMHhsx0ABT0UsZtFFiSPAOYBKdAJw4A9IeiAFNMBZ2oDFVQIMqgaQZASQyASJXOBNBkDRDPoPR4AC0oA6Sho6RmgAXm8JRE8AX344jFBIGAB5MQZEMQBVCERgSEQ9AwJiMmgZDNk5XUwvQWFRcvTMhBRw6B5EAHc4JGQ5AHJEAA8wZFwuAH1FZGmGAe1PAxIAM3kKlr7A6lpFBhqluuhjQAAGMytrQHMGQCEGN0AWDUAIFUB7BgBGQFPTa8B9BkAohhfATodAOoMtkAPzGAU0VLoBZBkAVgyAEQZDtgEgY4jEgA)
  - 限定商品かどうかを外に公開し、ユースケースで限定商品の場合のロジックを書いている
- 参考
  - [ドメイン知識が漏れるとは何なのか](https://zenn.dev/praha/articles/92c6494570a4dc)

## 課題4 クイズ
- DDDとオニオンアーキテクチャはなぜ相性が良いか？

## その他
- [ドメイン駆動設計（DDD）の基礎知識を3つのキーワードで学ぶ - ログミーTech](https://logmi.jp/tech/articles/310424#s2:~:text=%E3%81%BE%E3%81%9A%E3%80%8C%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E8%A8%AD%E8%A8%88%E3%82%92%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%82%93%E3%81%A0%EF%BC%9F%E3%80%8D%E3%81%A8%E3%81%84%E3%81%86%E8%AD%B0%E8%AB%96%E3%81%8C%E5%A4%A7%E5%89%8D%E6%8F%90%E3%81%A8%E3%81%97%E3%81%A6%E3%81%82%E3%81%A3%E3%81%A6%E3%80%81%E3%81%9D%E3%81%AE%E4%B8%AD%E3%81%A7%E3%80%8C%E3%81%93%E3%81%86%E3%81%84%E3%81%86%E3%81%93%E3%81%A8%E3%82%92%E9%87%8D%E8%A6%96%E3%81%99%E3%82%8B%E3%80%8D%E3%80%8C%E3%81%93%E3%81%86%E3%81%84%E3%81%86%E3%81%93%E3%81%A8%E3%81%AF%E3%81%84%E3%81%A3%E3%81%9F%E3%82%93%E3%81%82%E3%81%BE%E3%82%8A%E8%A7%A6%E3%82%8C%E3%81%AA%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%82%88%E3%81%86%E3%80%8D%E3%81%A8%E3%81%84%E3%81%86%E3%82%88%E3%81%86%E3%81%AA%E3%80%81%E8%A8%AD%E8%A8%88%E3%81%AE%E3%83%A1%E3%83%AA%E3%83%8F%E3%83%AA%E3%81%AE%E3%81%A4%E3%81%91%E6%96%B9%E3%80%81%E8%A8%AD%E8%A8%88%E3%81%AE%E3%82%84%E3%82%8A%E6%96%B9%E3%81%A8%E3%81%84%E3%81%A3%E3%81%9F%E8%A9%B1%E3%81%A0%E3%81%A8%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B%E3%81%A8%E3%80%81%E3%81%93%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%A8%E3%81%84%E3%81%86%E3%82%82%E3%81%AE%E3%81%8C%E3%81%82%E3%82%8B%E7%A8%8B%E5%BA%A6%E3%81%A4%E3%81%8B%E3%81%BF%E3%82%84%E3%81%99%E3%81%8F%E3%81%AA%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%8B%E3%81%AA%E3%81%A8%E8%80%83%E3%81%88%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)
  - DDDってそもそも何だっけとなった時に振り返りたい記事