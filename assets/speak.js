// 共用日文語音朗讀（Web Speech API，跟 Google 翻譯喇叭同類技術，免費、不用金鑰）
let __jaVoice = null;
function pickJaVoice(){
  if(!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  __jaVoice = voices.find(v=>v.lang && v.lang.toLowerCase().startsWith("ja")) || null;
}
if("speechSynthesis" in window){
  pickJaVoice();
  speechSynthesis.onvoiceschanged = pickJaVoice;
}
function speakJa(text, rate){
  if(!("speechSynthesis" in window)){
    alert("這個瀏覽器不支援語音朗讀，換 Chrome 試試看。");
    return;
  }
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = rate || 0.85;
  if(__jaVoice) utter.voice = __jaVoice;
  speechSynthesis.speak(utter);
}

// 「漢字{よみ}」語法轉成 <ruby> 標籤
function renderFurigana(text){
  return text.replace(/([一-鿿々]+)\{([^}]+)\}/g, "<ruby>$1<rt>$2</rt></ruby>");
}
// 播放用：把 漢字{よみ} 語法去掉大括號部分，還原成純日文（讓語音引擎念完整句子）
function stripFuriganaForSpeech(text){
  return text.replace(/([一-鿿々]+)\{[^}]+\}/g, "$1");
}
