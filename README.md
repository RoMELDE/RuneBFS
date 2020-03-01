All rune data rights belong to XinDong. ←本家READMEより

---- ここから----

# ラグマスのルーン盤シミュレータです。海外のRoMELDEさんの派生版です。
- 本職PGではなくOSSコミュニティのお作法もちゃんとわかってない素人なので、本家へのcommitは行いません。
- 本家のドキュメントが整っていないので、環境については自分で調べてやってみたレベルのものです。
  ※教えて偉い人…


### 環境構築
- webpack を利用しています。以下のツール群のインストールが必要です
  - node.js
  - yarn or npm (以下はyarnで解説）
  - webpack
  - webpack plugin
  	- html-webpack-plugin
  	- clean-webpack-plugin
  	- mini-css-extract-plugin
  	- offline-plugin
  	
- yarnからwebpack およびプラグインのインストール
  - yarn add webpack --dev
  - yarn add webpack-cli --dev
  - yarn add html-webpack-plugin --dev
  - yarn add clean-webpack-plugin --dev
  - yarn add mini-css-extract-plugin --dev
  - yarn add offline-plugin --dev
  
- webpack によるビルド実行
  - yarn run build
  
  
