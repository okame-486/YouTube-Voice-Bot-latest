// child_process モジュールから spawn をインポート
const { spawn } = require("child_process");

// note: 動きを詳しく
// YouTubeのURLからストリームを取得する関数
function getYoutubeStream(url) {
  // yt-dlp コマンドを実行するためのコマンド文字列を作成
  const command = `yt-dlp -x --audio-format mp3 -o - "${url}"`;
  // コマンドを実行し、子プロセスを生成
  const child = spawn(command, { shell: true, stdio: "pipe" });
  // 子プロセスの標準出力を返す
  return child.stdout;
}

// getYoutubeStream関数をエクスポート
module.exports = getYoutubeStream;
