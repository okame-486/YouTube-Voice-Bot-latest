<h1 align="center">YouTube-Voice-Bot</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18.16.0-green" alt="Node.js version">
  <img src="https://img.shields.io/badge/license-none-red" alt="License">
</p>

<p align="center">
  YouTube-Voice-Botは、YouTubeの音楽をDiscordで再生するBotです。
</p>

<p align="center">
  Node.jsの勉強のために作った。飽きたら開発終了
</p>

## 機能

- [x] YouTube の URL を送信すると、ボイスチャンネルで再生します
- [x] 再生が終わったら Bot が切断します
- [ ] 一時停止,スキップ,キュー機能
- [ ] チャンネル ID を slash コマンドで指定できる

## インストール

Node.js v18.16.0 が必要です。公式サイトから[ダウンロード](https://nodejs.org/ja/download)してください。

GitHub からプロジェクトをクローンします。

```git
git clone https://github.com/okame-486/YouTube-Voice-Bot-latest.git
```

クローンしたフォルダに移動します。

```bash
cd YouTube-Voice-Bot-latest
```

モジュールをインストールします。

```bash
npm install
```

yt-dlp.exe をダウンロードします。

```bash
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o yt-dlp.exe
```

### 設定

config.json に以下の情報を入力してください。

```json
{
  "token": "DiscordのBotトークン",
  "channelID": "YoutubeのURLを入力するチャンネルID"
}
```

### 起動

以下のコマンドで Bot を起動できます。

```bash
node index.js
```

## 使い方

ボイスチャットに入った状態でチャンネル ID で指定したチェンネルに Youtube の URL を貼り付けると Bot が音楽を再生します。
