   //変数
var pazle = document.getElementById("pazle")
var script;//innerHTML代入用
var arr_correct = [];//模範解答
var arr = [];//現在の状態
var ver = 3;//縦の長さ
var side = 4;//横の長さ
var tile_num = ver*side;//合計枚数
var scount = 100;//シャッフルするときの回数
var suggest = 4;//入れ替えれる方向数
var empty = tile_num-1;//arr[empty]が空白
var sidewall//入れ替えられない方向
var verwall//入れ替えられない方向
var target=[-side,1,side,-1]//入れ替える場所
var target_id;
var direct//target[direct]で方向指定
var bool//エラー等の判定
var next//arr[next]でemptyの入れ替え先
var click_num
var i;
var j;
var time;


//   関数
//パネル配置
function display(){
    script = ""
    for(i=0;i<ver;i++){
        script = script + "<div>"
        for(j=0;j<side;j++){
            script = script + "<div class=\"tile\" data-id=\""+ (i*side+j) +"\">"
            //script = script + arr[i*side+j];
            script=script+"<canvas id=\"image"+arr[i*side+j]+"\" width=\"200px\" height=\"200px\"></canvas>"
            script = script + "</div>"
        }
        script = script + "</div>"
        console.log(i)
    }
pazle.innerHTML = script;
$(".tile").on("click",function(){

    console.log("error0");
    console.log($(this).data('id'),empty);
    click_num = $(this).data('id');
    bool = false;
    for(i in target){
        if(empty==click_num+target[i]){
            console.log("change")
            bool = true;
            break
        }
    }
    if(bool){
        console.log(empty,click_num)
        change(empty,click_num)
        empty=click_num;
    }
    display();
    can()
})
console.log("display")
}
//パネル表示
function can(){
    
    const canvas =[]
    const context=[];

    for(i=0;i<tile_num;i++){

        target_id="#image"+i
        canvas[i]=document.querySelector(target_id)
        context[i]=canvas[i].getContext("2d");
    }

    const img = new Image();
    img.onload=()=>{
        for(i=0;i<ver;i++){
            for(j=0;j<side;j++){
                if(i*side+j!=tile_num-1){
                    context[i*side+j].drawImage(img,j*200,i*200,200,200,0,0,200,200)
                }
            }
        }
    }
    img.src="img/dog12.jpg"
}
//入れ替え
function change(a,b){
    //参照渡しできねぇ‼　やり方知ってたら教えて下さい。
    let es = arr[a];
    arr[a] = arr[b];
    arr[b] = es;
    console.log("change")
}
//答え合わせ
function check(){
    bool=0
    for(i=0;i<tile_num;i++){
        if(arr[i]!=arr_correct[i]){
            bool=1
            break
        }
    }
    if(bool==0){
        //クリア処理
    }
    console.log(check)
}
//シャッフル
function shuffle(){
    for(i=0;i<scount;i++){
        sidewall=4
        verwall=4
        suggest=4
        direct = 0
        if(empty%side==0){
            sidewall=3
            suggest--
        }else if(empty%side==side-1){
            suggest--
            sidewall=1
        }
        if(0>(empty-side)){
            verwall=0
            suggest--
        }else if(tile_num<=empty+side){
            verwall=2
            suggest--
        }
        direct = Math.floor(Math.random()*suggest)
        if(direct%2==0){
            if(direct>=verwall){
                direct++;
            }
            if(direct>=sidewall){
                direct++
            }
        }else{
            if(direct>=sidewall){
                direct++
            }
            if(direct>=verwall){
                direct++;
            }
        }
        next=empty+target[direct]
        change(next,empty)
        empty=next
    }
    console.log("shufful")
}



//   実行

//初期化
for(i=0;i<tile_num;i++){
    arr_correct[i]=i
    arr[i]=i;
}

//シャッフル
shuffle()
console.log(empty)
display()
can();
console.log(arr[1],arr[2])


//   反応

$(".tile").on("click",function(){

    console.log("error0");
    console.log($(this).data('id'),empty);
    click_num = $(this).data('id');
    bool = false;
    for(i in target){
        if(empty==click_num+target[i]){
            console.log("change")
            bool = true;
            break
        }
    }
    if(bool){
        console.log(empty,click_num)
        change(empty,click_num)
    }
    display();
    can();
})
