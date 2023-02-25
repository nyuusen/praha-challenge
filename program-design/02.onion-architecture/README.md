## 課題1
### *オニオンアーキテクチャ*
> オニオンアーキテクチャはJeffrey Palermo氏により考案されたアーキテクチャパターンである。伝統的な階層化アーキテクチャとオブジェクト指向の考え方を踏襲しつつ、これまでよりも保守性、テスト容易性、依存性の点で優れたアプリケーションを構築することを目的としている。

### *オニオンアーキテクチャを図解する*
[Miro](https://miro.com/app/board/uXjVPleDet8=/?moveToWidget=3458764546828617644&cot=14)で作成

### *ドメイン層が他の層に依存していないことのメリット*
- ドメインがDBやユースケースに依存しないため、ドメイン以外の変更による影響を受けなくなる

### *インターフェイスに対する依存のみを許可するメリット*
- 依存関係が逆転し、実装の詳細の変更による影響を受けなくなる
  
### *「依存性の逆転」がどのように使われているかを説明する*
1. DomainService層にInfrastructure層(ex.Repository)のインターフェイスを実装する
2. 外側のApplicationService層は1のインターフェイスに依存する
3. Infrastructure層に1で公開しているインターフェイスに基づいて詳細の実装を行う

上記のようにすることで、従来ApplicationService層が依存していた実装の詳細(Infrastructureに書かれるDB処理等)との依存関係が逆転する。

参考：[依存関係逆転の原則](https://qiita.com/little_hand_s/items/2040fba15d90b93fc124#%E4%BE%9D%E5%AD%98%E9%96%A2%E4%BF%82%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87)

### *特定のユーザにしかリソースの追加や更新を許さないようなアクセス制限機能を実装したいとします。どの層に記述するのが適切か？*
- ApplicationService層に実装する
  - 理由：Domainでは純粋にリソースに対しての追加や更新するという処理を記述し、それに対して「特定のユーザーにしか」という条件は特定のユースケース(Application層)で実装するべきと考えるため

### *データベースをMySQLからPostgreSQLに変更するとします。どの層を変更する必要があるか？*
- Infrastructures層
  - この層で使用されるDBMSやライブラリを変更しやすい・剥がしやすい・テストしやすいのはオニオンアーキテクチャの大きなメリット

## 課題2 クイズ
- オニオンアーキテクチャが提唱された背景は何か？（ズバリ何を解決したかったか？）
  - Hint: ベースとなっているのは「レイヤードアーキテクチャ」らしい

- オニオンアーキテクチャとクリーンアーキテクチャの違いは何か？ 

- オニオンアーキテクチャが向かないシステムの特徴は？


## 参考記事
- [オニオンアーキテクチャとは何か](https://qiita.com/cocoa-maemae/items/e3f2eabbe0877c2af8d0)
- [オニオンアーキテクチャとは](https://qiita.com/Jazuma/items/cae61c78f240ed013598)
- [クリーンアーキわからんかった人のためのオニオンアーキテクチャ(Zenn)](https://zenn.dev/streamwest1629/articles/no-clean_hello-onion-architecture)
- [クリーンアーキわからんかった人のためのオニオンアーキテクチャ(SpeakerDeck)](https://speakerdeck.com/streamwest1629/kurinakiwakarankatutaren-falsetamefalseonionakitekutiya)