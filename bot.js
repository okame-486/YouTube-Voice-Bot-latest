// 他のモジュールとconfigをインポート
const getYoutubeStream = require("./youtube");
const config = require("./config.json");
const log = require("./log");
// @discordjs/voice の初期設定
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const player = createAudioPlayer();
// Discord.js の初期設定
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    // 他に必要なフラグを追加
  ],
});
// Botにログインした際に処理
client.on("ready", () => {
  // コンソールにログを表示
  console.log(log.info, `${client.user.tag}`, log.login);
});
// メイン処理
async function Main(message) {
  // Bot から送信されたメッセージは無視
  if (message.author.bot) return;
  // 特定のチャンネルIDに一致する場合のみ反応
  if (message.channelId !== config.textChannelId) return;
  //変数の代入
  const youtubeUrl = message.content;
  // ユーザーの取得
  const member = message.member;
  // ボイスチャンネルにいるかの検証
  if (member.voice.channelId) {
    // YouTubeのURLを検証
    if (!youtubeUrl.startsWith("https://www.youtube.com/watch?v=")) return;
    // ユーザーのボイスチャンネルを取得
    const channelId = message.member.voice.channel.id;
    // チャンネルIDが存在する場合
    if (channelId) {
      // チャンネルに接続
      const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      try {
        const stream = await getYoutubeStream(youtubeUrl);
        if (stream) {
          // オーディオリソースの作成
          const resource = createAudioResource(stream);
          // オーディオプレイヤーにオーディオリソースを再生させる
          player.play(resource);
          // コネクションにオーディオプレイヤーをサブスクライブする
          connection.subscribe(player);
          //  再生が開始したらコンソールにログを表示
          player.on(AudioPlayerStatus.Playing, () => {
            // コンソールにログを表示
            console.log(log.info, log.play);
          });
          // 再生が終了したら切断する
          player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
            console.log(log.info, log.unconnected);
          });
        } else {
          // ストリームが存在しない場合はエラーを表示する
          console.error(youtubeUrl + log.upstream);
        }
      } catch (error) {
        // getYoutubeStream関数でエラーが発生した場合はエラーを表示する
        console.error(error);
      }
    }
  } else {
    // ボイスチャンネルにいない場合
    message.reply(log.novices);
  }
}

//モジュール処理
function start() {
  // ログイン処理
  client.login(config.token);
  // メイン指定
  client.on("messageCreate", Main);
}
// モジュールをエクスポート
module.exports = { start };
