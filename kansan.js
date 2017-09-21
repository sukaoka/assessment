(function () {
    'use strict';
    
    const dist = document.getElementById('dist');
    const times = document.getElementById('times');
    const min = document.getElementById('min');
    const sec = document.getElementById('sec');
    const comma = document.getElementById('comma');
    const tweetDivided = document.getElementById('tweet-area');
    const assesmentButton = document.getElementById('assesment');
    const resultDivided = document.getElementById('result-area');
    
    //TODO 平均艇速の算出

    //heikin 平均亭速
    
   

    assesmentButton.onclick = () =>{
        // TODO無効な値の時の処理
        // 画面をリセット
        removeAllChildren(resultDivided);

        //換算距離を出す
        //係数=250mは0.09, 500mは0.2, 1000mは0.375, 1500mが0.475?、2000m以上？が0.5
        let keisuu = 0
        if (dist.value*1 <=499){keisuu = 0.09
        } else if(dist.value*1 <=999){keisuu = 0.2
        } else if(dist.value*1 <=1499){keisuu = 0.375
        } else if(dist.value*1 <=1999){keisuu = 0.475
        } else {keisuu = 0.5};
       // console.log(keisuu)
        //換算距離を出す (1+(本数-1)*係数)*距離
        let kyori = (1+(times.value*1-1)*keisuu)*dist.value*1
      //  console.log(kyori)

      //画面に出力する
        const paragraph0 = document.createElement('p');
        const paragraph1 = document.createElement('p');
        const paragraph2 = document.createElement('p');
        paragraph0.innerText = 'これは' +kyori+'[m]相当のメニューです。'
        resultDivided.appendChild(paragraph0);
        const result = '私は'+kyori+'m相当のメニューにて、2000m換算'+assessment(timeketsugou(Number(min.value),Number(sec.value),Number(comma.value)) ,kyori,2000)+'/500mの艇速を出し、圧倒的成長を遂げました。';
        console.log(result)
        paragraph1.innerText = '2000m換算で、'+assessment(timeketsugou(Number(min.value),Number(sec.value),Number(comma.value)) ,kyori,2000)+'/500m';
        resultDivided.appendChild(paragraph1);
        paragraph2.innerText = '1000m換算で、'+assessment(timeketsugou(Number(min.value),Number(sec.value),Number(comma.value)) ,kyori,1000)+'/500mでした。お疲れ様。';
        resultDivided.appendChild(paragraph2);
        //ツイートすえう
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%83%9C%E3%83%BC%E3%83%88%E3%82%92%E6%BC%95%E3%81%84%E3%81%A7%E5%9C%A7%E5%80%92%E7%9A%84%E6%88%90%E9%95%B7&text='
            + encodeURIComponent(result);
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%83%9C%E3%83%BC%E3%83%88%E3%82%92%E6%BC%95%E3%81%84%E3%81%A7%E5%9C%A7%E5%80%92%E7%9A%84%E6%88%90%E9%95%B7';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    }

   /**
     * 平均艇速(s)を渡すと換算亭速(s)を返す
     * @param {num} teisoku ユーザーの名前
     *   * @param {num} kyori ユーザーの名前
     *   * @param {num} honsuu ユーザーの名前 
     * @return {str} 診断結果
     */

    function assessment(teisoku , kyori ,kijyun) {
        //計算。出力は入力* (2000/距離)^(1/18)
        let result =  teisoku * (kijyun/kyori)**(1/18) ;
       // console.log(result)
        let min = parseInt(result/60);
        let sec = result - min * 60;
        return min + ':'+sec;
    }

    function timeketsugou(min,sec,comma) {
        //計算。min*60+sec+comma*0.1
       // console.log(min*60+sec*1+comma*0.1)
        return min*60+sec*1+comma*0.1
    }

 

     //画面クリア用関数
     function removeAllChildren(element){
        while (element.firstChild){//子供が要る限り消去する
            element.removeChild(element.firstChild);
        }
    }



})();