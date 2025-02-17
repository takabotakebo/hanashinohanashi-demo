window.addEventListener('load',function(){

    // var screen_box = document.getElementById('screen');
    var soundcheckOk = document.getElementById('soundcheckOk');
    var screen_box = document.getElementById('screen');
    var mess_box = document.getElementById('textbox');
    var mess_text = document.getElementById('text');
    var mswin_flg = true; //文字送り開始のフラグ
    var stop_flg = false; //文字送り停止フラグ
    var end_flg = false; //シナリオ文字送り終了のフラグ
    var scene_cnt = 0; //シーンのカウント
    var line_cnt = 0; //１文章のカウント
    // var select_cnt = 0; //選択肢での分岐のカウント
    const interval = 30;
    var firstclick = 0;
    var select_num1 = 0;
    var select_num2 = 0;
    var select_num3 = 0;
    var select1 = document.getElementById('select1');
    var select2 = document.getElementById('select2');
    var select3 = document.getElementById('select3');
    var select_text1 = document.getElementById('selectText1');
    var select_text2 = document.getElementById('selectText2');
    var select_text3 = document.getElementById('selectText3');

    //音量設定
    var baseVol = 0.1; // audioのベースの音量
    var fadeSpeed = 1500; // フェードイン・フェードアウトのスピード

    //BGM１の読み込み
    const BGM_main = new Audio('sound/BGM_main.mp3');
    BGM_main.preload = 'auto';
    BGM_main.volume = baseVol;
    BGM_main.addEventListener('canplaythrough', () => {
      console.log('音声ファイルのプリロードが完了しました');
    });

    //BGM２の読み込み
    const BGM_scene1 = new Audio('sound/BGM_scene1.mp3');
    BGM_scene1.preload = 'auto';
    BGM_scene1.volume = baseVol;
    BGM_scene1.addEventListener('canplaythrough', () => {
      console.log('音声ファイルのプリロードが完了しました');
    });

    //SE読み込み
     const SE_nextpage = new Audio('sound/SE_nextpage.mp3');
     SE_nextpage.preload = 'auto';
     SE_nextpage.volume = baseVol;
     SE_nextpage.addEventListener('canplaythrough', () => {
       console.log('音声ファイルのプリロードが完了しました');
     });
     const SE_pressstart = new Audio('sound/SE_pressstart.mp3');
     SE_pressstart.preload = 'auto';
     SE_pressstart.volume = baseVol;
     SE_pressstart.addEventListener('canplaythrough', () => {
       console.log('音声ファイルのプリロードが完了しました');
     });

    // テキスト要素の配列
    var text = [];

    // 最初のタイトル表示
    text[0] = ["<skip 1>"];

    text[1] = [
        "おや、お客とはめずらしい。",
        "ここは私の図書館。",
        "君は迷いこんでしまったようだね。",
        "この場所に来るには条件があるはずなんだが・・・<break>まあ今はそのことはおいておこうか。",
        "せっかくこんな場所に来たんだ。<break>私と「噺」を使ったゲームをしないかい？",
        "これから私が、ひとつ「噺」を語る。<break>一見不可解な状況の物語だ。",
        "君は、私に質問を投げかけることで、<break>「噺」の真相を解き明かしていくんだ。",
        "ただし、私は<break>「はい」「いいえ」「関係ない」しか答えない。",
        "<skip 2>ルールはわかったかな？"
    ];
    text[2] = [
        "「噺」の真相に迫るには、<break>固定観念を捨てて自由な発想で考えること。",
        "それじゃあ、さっそくやってみようか。",
    ];

    text[3] = [
        "・本棚<break>オカルトコーナーで、気になる本を発見した。",
        "<item 2>タイトル：ぞわぞわする神様<break>蛇やトカゲなどの爬虫類、クモやハエなどの虫をモチーフとした神々、アメーバのように不定形の神々など、見ているだけでぞわぞわする挿絵付きの図鑑。",
        "<select1 4><select2 5><select3 none><text1 読む><text2 読まない><selectBox>読む？"
    ];
    text[4] = [
        "写真で見たようなシルエットの項目を見つけた。",
        "<skip 5><item 3>項目のタイトルは「蛇たちの父」と書かれており、ブードゥー教の神であることと、現れた場所には大量の蛇が出現することが記載されている。",
    ];
    text[5] = [
        "<item 0><chara 1 1>「この事件はつい先日起こった事件だったよな…」",
        "新聞コーナーに行くことにした。",
        "・新聞<break>10月23日～10月30日朝刊までのニュース見ることができる。",
        "ざっと目を通して手に入った情報は",
        "・蛇に関係する事件が多い蛇にかまれて病院送りになる人が続出しているようだ。",
        "10月26日には女子高校生が病院送りになっているようだ。",
        "また、蛇は本来この地域に生息していない種も目撃されているようだ。",
        "<skip 6>めぼしいものはこのくらいだろうか。"
    ];

    text[6] = [
        "<item 0>調べ物をしていると誰かに見られている気がする。",
        "それが気になって、周囲を見回すと一人の男が立っていた。",
        "<chara 1 4>男は笑みを浮かべながら",
        "「君もあの事件を追っているのかい？」",
        "と、手に持つ資料を指さす。",
        "白髪の憎たらしいほど美人なこの男は、職業は不明だがネタを漁るために通う古本屋での顔なじみだ。",
        "どうやらこいつも同じ事件を追っているらしい。",
        "名前を佐藤太郎（さとう　たろう）という。",
        "「僕もついて行っていいかな？」",
        "太郎の申し出を快諾し共に事件を追うことにした。",
        "図書館で手に入る情報はこのくらいだろうか。",
        "図書館を後にした。",
        "<chara 1 0>手に入った情報によると、どうやら事件の原因は公園と病院に手掛かりがあるらしい。",
        "<select1 7><select2 8><select3 none><text1 公園><text2 病院><selectBox>どちらに行こうか？"
    ];

    text[7] = [
        "<bg 3>・公園昼の公園は、家族連れが多く見られる。",
        "写真が撮られたのは、広場から少し外れた茂みだろう。",
        "茂みに行くと、うっすらと怪しげな幾何学模様が見えた。",
        "<chara 1 4>「海斗、これは？」",
        "<chara 1 0><item 1>太郎が指さした先には、派手なピンク色のファーの装丁の手帳が落ちていた。",
        "手帳を手に取ってみてみても、表に名前などは書いていなかった。",
        "「こんなところに落ちていたのだから、何か手掛かりになるかもしれない。中身を少し拝見してみようじゃないか。」",
        "太郎の提案に、中身を覗いてみることにする。",
        "中身はどうやら日記帳のようだ。",
        "内容から、持ち主がクトゥルフ神話の小説に心酔している様子がわかる。",
        "10月20～31日の間にオカルト的な儀式で何かしらと交信を図るようだ。",
        "<item 4>手帳の最後にメモ用紙が挟まっていた。",
        "「クトゥルフ神話なんて持ち主は随分マニアックな物が好きなんだね。",
        "<item 0>この周辺でそんな本、近所の古本屋にしか売ってないんじゃないかな？」",
        "<bg 4><chara 1 0>・古本屋図書館と違い、薄暗く札な整頓の店内。その店主はのんびりと茶を飲んで、おそらく売り物であろう本を読んでいる。",
        "どこから仕入れたのか想像できない本が多く、日本語ではないものも見える。",
        "<chara 1 16>「今日は若いのがよく来るなぁ」",
        "ふてぶてしい態度の店主がめんどくさそうにため息をついた。",
        "<chara 1 0><chara 4 16>「今日は何かお探しで？残念ながら前来た時と変わっちゃいないよ。」",
        "<chara 1 1>「いや、今日は人探しをしに来た。",
        "氷堂儀子という名前に心当たりはないか？女子高校生らしいんだが。」",
        "店主は「名前には心当たりはないが…」と続ける。",
        "「金髪の女子高校生ならさっき来たよ。ニューイングランドの楽園に置ける魔術的脅威って本を買って転がるように出て行ったさ。",
        "そういえば…高台とか、広場とか…なんか言ってたなぁ。」",
        "思いのほか手がかりを知っていた店主に礼を言ってその場を後にした。",
        "どうやら自分たちの思っていた以上に時間はないらしい。",
        "<chara 5 6>「氷堂とかいう女性を早急に止めないといけないみたいだね。」",
        "「あぁ。」",
        "太郎も同じ考えのようで、ため息をついた。",
        "<bg 2><chara 5 0><chara 4 0><chara 1 8>「今までのことを整理してみようか。」",
        "太郎とともに今までの情報を整理することにした。",
        "・元凶の人物の名前は氷堂儀子（ひょうどうのりこ）女子高校生らしい。",
        "・10月20～31日の間にオカルト的な儀式で何かしらと交信を図るようだ。",
        "・クトゥルフ神話に心酔しているようでその影響で儀式を行うらしい。",
        "・公園に落ちていた手帳に挟まっていたメモは、儀式の場所らしい。",
        "・店主によると高台や広場なんて言っていたからこの近所の開けた場所で行うのだろう。",
        "・現在10月30日で儀式とやらは早朝。つまり、明日の朝が止める最後のチャンスとなる。",
        "まとめられる情報はこのくらいだろうか。",
        "「考えられる場所としては公園、高台、校庭の3か所くらいじゃないかな？」",
        "太郎の言う通り、この近辺では開けた場所などそのくらいしかない。",
        "<chara 1 0><chara 4 0><chara 5 0><select1 9><select2 10><select3 9><text1 公園><text2 高台><text3 校庭><selectBox>どこだろうか？"
    ];

    text[8] = [
        "<bg 7>・病院清潔な印象を与える白い内装が海斗たちを出迎える。この地域の患者のほとんどはこの病院に来る総合病院だ。",
        "受付には看護師がいる",
        "<chara 1 4>「氷堂について看護師の人に聞いてみよっか。」",
        "太郎がためらうことなく一直線にカウンターへと向かう。太郎の後を追って行った。",
        "「すみません。」",
        "<chara 1 0><chara 2 14>「いかがなさいましたか？」",
        "<chara 3 4>「ここに氷堂儀子という女性が入院していたと思うのですが…」",
        "「ご親戚ですか？」",
        "「いえ、共通の趣味の友人です。」",
        "「そうだったんですね。氷堂さんは今さっき退院なされましたよ。」",
        "看護師が「少々お待ちください。」とカウンターを離れてしまう。戻ってきた彼女の手には派手なピンク色のファーの装丁の手帳があった。",
        "「これ、忘れ物なんです。よければ届けてくださいませんか？」",
        "<chara 3 7>「ありがとう。彼女に渡しておくよ。」",
        "太郎が嘘など感じさせないほど爽やかな笑みを浮かべてさっさとその場を後にした。",
        "<bg 2><chara 2 2><chara 3 0>「おい、あんな嘘いいのかよ。」",
        "<chara 3 4>「情報を手に入れられたんだ、いいだろう？",
        "それより、手帳の中身を見てみようじゃないか。」",
        "中身は日記帳でそれなりにきれいな文字で、名状しがたい文章が書かれていた。",
        "・儀子ちゃんの門外不出☆日記9月26日：クトゥルフ神話マジヤバ！ニャル様激推し！会ってパーリナイしたい！ニャル様にで会っちゃうパーティーするには、なむなむが必要みたい…",
        "10月15日：ラブドッキュンで、りしたからニャル様コールしちゃお！会うなら、綺麗な場所がいいよね！広場か海の見える場所かな～",
        "10月25日：なむなむバッテンじゃね？ニャル様なむなむは、にゅーいんぐらんどのなんとかっていうのにもあるらしい。ピーポーに大量プレゼントらしいし、これもあるっしょ？",
        "・ニャル様☆召喚大作戦♡スケジュール10月20日：場所確認10月21～30日：確認した場所で召喚♡10月31日：とっておきで召喚♡",
        "付け足されたように10月30日いにしえ屋さんでまどーしょ探し♡とも書かれている。",
        "<chara 2 0><chara 3 0><item 4>手帳の最後にメモ用紙が挟まっていた。",
        "<item 0><chara 2 3>「…」",
        "<chara 3 6>「…",
        "…思った以上に時間はないようだね…その儀式絶対やらせたらまずいよ…」",
        "「だな…とりあえず情報を整理してみるか…」",
        "・元凶の人物の名前は氷堂儀子（ひょうどうのりこ）女子高校生らしい。",
        "・10月15日から30日は練習のようなスケジュールの書き方で10月31日が本命のようだ。",
        "・現在10月30日で儀式とやらは早朝。つまり、明日の朝が止める最後のチャンスとなる。",
        "手帳に挟まっていたメモは、儀式の場所らしい。とっておきだとか、広場とか、海とか、若干ロマンチックな場所を選んでいるのがむかつく。",
        "・あまり量は多くないが、まとめられる情報としてはこの程度だろうか。",
        "<chara 3 8>「考えられる場所としては公園、高台、校庭の3か所くらいじゃないかな？」",
        "太郎の言う通り、この近辺では開けた場所などそのくらいしかない。",
        "<chara 2 0><chara 3 0><select1 9><select2 10><select3 9><text1 公園><text2 高台><text3 校庭><selectBox>どこだろうか？"
    ];

    text[9] = [
        "<bg 2>氷堂がいると推理した場所へ向かう。",
        "そこには人の姿はなく、シンと静まり返っていた。",
        "頭上を巨大な鳥の影が通る。その姿をたどると、沿岸へ向かっているようだ。",
        "<chara 1 1>「なんだあれ…」",
        "遠くに見える高台に黒くうねる不定形の謎の生命体がはっきりと見える。",
        "人ならざるもの。その姿を見た俺は、目の前の現象に理解ができず、くらりとめまいがした。",
        "化け物の咆哮がこの街へ響く。",
        "その咆哮に吸い取られるように俺は意識を手放した。",
        "・バッドエンド：混沌との邂逅",
        "<stop>"
    ];

    text[10] = [
        "<bg 0>氷堂がいると推理した場所へ向かう。",
        "<bg 5>海の見える高台にやってくると、一人の女性がかがんで何かを描いていた。",
        "女性は金髪、褐色の肌で、近所の高校の制服を着ている。おそらく彼女が探していた氷堂儀子だろう。",
        "その手には、古くなりボロボロになった表紙の本を持っている。",
        "<chara 4 2>「あんたが氷堂儀子か。」",
        "ゆっくりと女性が立ち上がり振り返った。",
        "<chara 1 11>「そうだけど、なに？今忙しいんだけど。」",
        "<chara 5 5>「こんな儀式やめるんだ！」",
        "太郎の怒声が響いた。どうやら奴はこの事件の最悪のシナリオがわかっているらしい。",
        "<select1 11><select2 12><select3 none><text1 止める><text2 止めない><selectBox>怒涛の勢いで怒りを表す太郎を"
    ];

    text[11] = [
        "<chara 4 1>「太郎、ちょっと待て。」",
        "あまりにも語調の強い太郎をたしなめる。相手をあまり刺激しても危ないのではないか？",
        "「ここは慎重にいこう。」",
        "不満そうな太郎を尻目に氷堂の説得を試みる。",
        "「氷堂、どうやらあんたのやろうとしていることはとても危険なことらしい。",
        "もしかしたら、あんたの命だってなくなってしまうかもしれない。」",
        "<chara 1 12>「でも…」",
        "それに、多くの人に迷惑をかけて今うかもしれない。それで呼び出して願いをかなえてもらっても嫌だろう？」",
        "なるべく怒りをあらわにしないように冷静な口調で説得をした。",
        "氷堂が頭を垂れる。",
        "「…わかったよ…」",
        "「すぅ」と氷堂が息を吸った。",
        "<chara 1 10>「わかった！ニャル様と付き合うのは妄想だけにする！」",
        "顔を上げて自信満々といった様子で言い放った。",
        "<chara 5 6>「…」",
        "<chara 4 3>「まあ…うん。その程度にとどめておいてくれ。」",
        "妄想程度ならいいだろう。太郎が氷堂の持っていた本を取り上げて氷堂の描いていた幾何学模様を消し、それぞれの日常に戻っていった。",
        "・トゥルーエンド：現実への生還",
        "<stop>"
    ];

    text[12] = [
        "<chara 5 5>「あんな化け物を召喚しようだなんて君は大バカ者だ！」",
        "<chara 1 11>「んなっ！ニャル様を化け物ですって⁉」",
        "「あぁ！あんなの呼んだところで君…いや、人類の特になんて一切ならない！」",
        "「はぁ⁉」",
        "あまりにも無遠慮な太郎の怒声に氷堂は苛立たしく口調を荒げる。",
        "「顔がいいからってねぇ！何言っても許されると思ってんの⁉",
        "もういいし！ニャル様召喚して皆やっつけてもらうもん！」",
        "氷堂が口早に自分の知る言語ではない言葉を口走り始める。",
        "<bg 6>背後の幾何学模様が赤く光り始めた。",
        "ずるり、アメーバ状の黒い何かが円の中心から這い出てくる。",
        "這い出るのが止まるとそれは人の形を成し、",
        "<chara 4 15>「かわいい女の子に呼ばれて飛び出てニャル様デス☆」",
        "思わず殴りたくなるむかつく口調と面を下げた褐色の男だった。",
        "「ンも～、ニャル様のカワイ子ちゃんに手を出しちゃダメダメ～！太郎チャンひっさしぶり～！元気してた？残念ながらカワイ子ちゃんはニャル様のことがだーい好きみたいだよ！",
        "だ・か・ら！ニャル様本気出して、君たちの存在を消しちゃいたいとおもいま～す！",
        "<chara 1 0><chara 4 0><chara 5 0>ぐにゃりと目の前の男の形が崩れる。ぐちゃりと肉の濡れた音がしてバキリと骨の変形する音がする。",
        "徐々に肥大化していくその物体は万物の光を飲み込む漆黒で、うねうねとその醜い体をくねらせていた。",
        "人ならざるもの。その姿を見た俺は、目の前の現象に理解ができず、くらりとめまいがした。",
        "化け物の咆哮がこの街へ響く。",
        "その咆哮に吸い取られるように俺は意識を手放した。",
        "・バッドエンド：■■■■■■■■■",
        "<stop>"
    ];

    //メインエンジン
    function main(){
        var tmp = split_chars.shift();
        if(tmp == '<'){
                let tagget_str = '';
                tmp = split_chars.shift();
                while(tmp != '>'){
                    tagget_str += tmp;
                    tmp = split_chars.shift();
                }
                tagget_str = tagget_str.split(/\s/);
                switch(tagget_str[0]){
                    case 'stop':
                        stop_flg = true;
                        //終了時の処理を書く
                        break;
                    case 'selectBox':
                        $('.selectBox').addClass('show');
                        break;
                    case 'text1':
                        select_text1.innerHTML = tagget_str[1];
                        break;
                    case 'text2':
                        select_text2.innerHTML = tagget_str[1];
                        break;
                    case 'text3':
                        select_text3.innerHTML = tagget_str[1];
                        break;
                    case 'select1':
                        if(tagget_str[1] === "none"){
                            $('#select1').addClass('none');
                        }else{
                            select_num1 = tagget_str[1];
                            select1.addEventListener('click',function(){
                                scene_cnt = select_num1;
                                line_cnt  = -1;
                                $('.selectBox').removeClass('show');
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    case 'select2':
                        if(tagget_str[1] === "none"){
                            $('#select2').addClass('none');
                        }else{
                            select_num2 = tagget_str[1];
                            select2.addEventListener('click',function(){
                                scene_cnt = select_num2;
                                line_cnt  = -1;
                                $('.selectBox').removeClass('show');
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    case 'select3':
                        if(tagget_str[1] === "none"){
                            $('#select3').addClass('none');
                        }else{
                            select_num3 = tagget_str[1];
                            select3.addEventListener('click',function(){
                                scene_cnt = select_num3;
                                line_cnt  = -1;
                                $('.selectBox').removeClass('show');
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    case 'break':
                        mess_text.innerHTML += '<br>';
                        break;
                    case 'bg':
                        document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.png';
                        break;
                    case 'fadeIn_bg':
                        function fadeIn_bg_remove(){
                            $('#bgimg').removeClass('fadein');
                        }
                        $('#bgimg').addClass('fadein');
                        setTimeout(fadeIn_bg_remove,500);
                        break;
                    case 'fadeOut_bg':
                        function fadeOut_bg_remove(){
                            $('#bgimg').removeClass('fadeout');
                            document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.jpg';
                        }
                        $('#bgimg').addClass('fadeout');
                        setTimeout(fadeOut_bg_remove,500);
                        break;
                    case 'fadeOutIn_bg':
                        function fadeOutIn_bg_change(){
                            document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.jpg';
                        }
                        function fadeOutIn_bg_remove(){
                            $('#bgimg').removeClass('fadeoutin');
                            $('#textbox').removeClass('none');
                            $('#textbox').trigger('click');
                        }
                        $('#bgimg').addClass('fadeoutin');
                        $('#textbox').addClass('none');
                        setTimeout(fadeOutIn_bg_change,1500);
                        setTimeout(fadeOutIn_bg_remove,3000);
                        break;
                    case 'fadeIn_chara':
                        function fadeIn_chara_remove(){
                            $('#charaposition' + tagget_str[1]).removeClass('fadein');
                        }
                        $('#charaposition' + tagget_str[1]).addClass('fadein');
                        setTimeout(fadeIn_chara_remove,500);
                        break;
                    case 'skip':
                        scene_cnt = tagget_str[1];
                        line_cnt = -1;
                        break;
                }
            }
        if(!stop_flg){
            if(tmp){
                if(tmp != '>') mess_text.innerHTML += tmp;
                setTimeout(main,interval);
            }
        }else{
            mess_text.innerHTML += '<span class="blink-text"></span>';
        }
    }

    // //ダイアログボックスクリック時の文章送り
    // mess_box.addEventListener('click',function(){
    //     if(end_flg)return;
    //     if(mswin_flg){
    //         if(!stop_flg){
    //             line_cnt++;
    //             if(line_cnt >= text[scene_cnt].length){
    //                 line_cnt = 0;
    //             }
    //         }else if(scene_cnt>=text.length){
    //             end_flg = true;
    //             return;
    //         }
    //         split_chars=text[scene_cnt][line_cnt].split('');
    //         mess_text.innerHTML='';
    //         main();
    //     }
    // });

    //音声再生の確認
    soundcheckOk.addEventListener('click',function(){
        $('#screen').removeClass('none');
        $('#UIBOX').removeClass('none');
        $('#soundcheck').addClass('none');
        BGM_main.play();
    });

    //最初の画面送り
    screen_box.addEventListener('click',function(){
        if(firstclick==0){

            function fadeIn_messbox_remove(){
                $('#messbox').removeClass('fadein');
                $('#messbox').removeClass('fadein-slow');
                $('#messbox').removeClass('fadein-slow3s');
                $('#messbox').removeClass('fadein-slow5s');
            }
            function fadeIn_bg_remove(){
                $('#bgimg').removeClass('fadein');
                $('#bgimg').removeClass('fadein-slow');
                $('#bgimg').removeClass('fadein-slow3s');
                $('#bgimg').removeClass('fadein-slow5s');
            }
            
            function gonext(){
                $('#textbox').trigger('click');
                $('#textbox').trigger('click');
            }
            
            // テキストボックス出現の関数
            function showtextbox(){
                $('#messbox').removeClass('none');
                $('#messbox').addClass('fadein-slow');
            }
                        
            // キャラ出現の関数
            function showchara(){
                $('#character').removeClass('none');
                $('#character').addClass('fadein-slow3s');
            }


            //BGMのフェードアウト
            var end_func = setInterval(function() {
                BGM_main.volume = BGM_main.volume - (baseVol / 100);
                if(BGM_main.volume <= (baseVol / 100)) {
                    BGM_main.volume = baseVol;
                    BGM_main.pause();
                    clearInterval(end_func);
                }
            }, fadeSpeed * baseVol / 100);

            //シーン切り替えSE
            SE_pressstart.play();

            //BGMのフェードイン
            BGM_scene1.volume = 0;
            BGM_scene1.play();
            BGM_scene1.loop = true
            var start_func = setInterval(function() {
                BGM_scene1.volume = BGM_scene1.volume + (baseVol / 100);
                if(BGM_scene1.volume >= baseVol - (baseVol / 100)) {
                    BGM_scene1.volume = baseVol;
                    clearInterval(start_func);
                }
            }, fadeSpeed * baseVol / 100);

            // ロゴ非表示
            $('#logo').addClass('none');

            // 背景オーバーレイ非表示
            $('#bgimg-overlay').addClass('none');

            // 背景切り替え
            fadeIn_bg_remove();
            $('#bgimg').addClass('fadein-slow5s');
            document.getElementById('bgimg').src = 'img/bg1.png';

            //メッセージボックス出現
            $('#messbox').removeClass('fadein-slow');

            // キャラ出現
            setTimeout(showchara,500);
            // テキストボックス出現       
            setTimeout(showtextbox,2000);

            // 自動クリック
            setTimeout(gonext,3300);
            setTimeout(fadeIn_messbox_remove,500);

            firstclick++;

        }else{
            if(end_flg)return;
            if(mswin_flg){
                if(!stop_flg){
                    line_cnt++;
                    if(line_cnt >= text[scene_cnt].length){
                        line_cnt = 0;
                    }
                }else if(scene_cnt>=text.length){
                    end_flg = true;
                    return;
                }
                split_chars=text[scene_cnt][line_cnt].split('');
                mess_text.innerHTML='';
                SE_nextpage.play();
                main();
            }
        }
    });

    function textClick(){
        $('#textbox').trigger('click');
    }

    function selectNoneRemove(){
        $('#select1').removeClass('none');
        $('#select2').removeClass('none');
        $('#select3').removeClass('none');
    }


});