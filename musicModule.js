import * as Vue from "./vue.esm-browser.js"

const module = {
    setup(){
        //响应式数据
        //音乐数据
        const musicInfo = Vue.reactive({
            isLjyNb:false,
            name:"雑踏、僕らの街",
            singer:"TOGRNASHI-TOGEARI",
            backgroundImageUrl:"./sources/images/TOGETOGE2.jpg",
            imageUrl:"./sources/images/TOGETOGE.png",
            musicUrl:"./sources/musics/BoKuNoMaChi.mp3",
        });

        //切歌
        const handleSong =()=>{
            if(musicInfo.isLjyNb){
                musicInfo.isLjyNb=false;
                musicInfo.name="雑踏、僕らの街";
                musicInfo.singer="TOGRNASHI-TOGEARI";
                musicInfo.backgroundImageUrl="./sources/images/TOGETOGE2.jpg",
                musicInfo.imageUrl="./sources/images/TOGETOGE.png"
                musicInfo.musicUrl="./sources/musics/BoKuNoMaChi.mp3";
            }else{
                musicInfo.isLjyNb=true;
                musicInfo.name="光年之外";
                musicInfo.singer="邓紫棋";
                musicInfo.backgroundImageUrl="./sources/images/StarNight.jpg",
                musicInfo.imageUrl="./sources/images/DengZiQi.jpg"
                musicInfo.musicUrl="./sources/musics/GuangNianZhiWai.mp3";
            }
            handleDuration();
        }


        //音乐状态
        const musicStatus = Vue.reactive({
            volume:100,
            isRepeat:false,                      
            isLove:false,
            isShowVolumeBox:false,                  
            currentTime:0,                      
            duration:100,
            isDragged:false,                  //进度条是否被拖动，防止拖动时受音乐播放进度干扰
            isPaused:true 
        });
        //音乐DOM元素
        const music = Vue.ref(null);

        //音量
        const volumeDown = ()=>{
            if(musicStatus.volume-10>=0){
                musicStatus.volume-=10;
            }else{
                musicStatus.volume=0;
            }
            console.log(musicStatus.volume);
        }
        const volumeUp = ()=>{
            if(musicStatus.volume+10<=100){
                musicStatus.volume+=10;
            }else{
                musicStatus.volume=100;
            }
            console.log(musicStatus.volume);
        }

        //处理循环
        const handleRepeat = ()=>{
            musicStatus.isRepeat = !musicStatus.isRepeat;
        }
        //处理喜欢
        const handleLove = ()=>{
            musicStatus.isLove=!musicStatus.isLove;
        }
        //处理音量盒
        const handleVolumeBox = ()=>{
            musicStatus.isShowVolumeBox = !musicStatus.isShowVolumeBox;
        }




        //秒变分钟：秒的格式
        const secondToStr = (second)=>{
            let m = Math.floor(second/60);
            let s = Math.floor(second%60);
            return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        }
        //进度条被拖动
        const handleProgressBar = ()=>{
            music.value.currentTime = musicStatus.currentTime;
            musicStatus.isDragged=false;
        }

        //处理音乐总时长
        const handleDuration = ()=>{
            musicStatus.duration=music.value.duration;
            musicStatus.isPaused=true;
        }
        //处理音乐当前进度对进度条的影响
        const handleCurrentTime = ()=>{
            if(!musicStatus.isDragged){
                musicStatus.currentTime=music.value.currentTime;
            }
        }

        //处理播放
        const handlePlay=()=>{
            if(musicStatus.isPaused){
                musicStatus.isPaused=false;
                music.value.play();
            }else{
                musicStatus.isPaused=true;
                music.value.pause();
            }
        }
        //处理结束
        const handleEnd=()=>{
            if(!musicStatus.isRepeat){
                musicStatus.isPaused=true;
                music.value.currentTime=0;
                musicStatus.currentTime=0;
            }
            console.log("end");
        }
        return {
            musicInfo,
            musicStatus,
            music,
            handleSong,
            volumeDown,volumeUp,                                                //音量箱
            handleRepeat,handleLove,handleVolumeBox,                            //按钮箱
            secondToStr,handleProgressBar,handleDuration,handleCurrentTime,     //进度条箱
            handlePlay,handleEnd
            };
    }
}
export {module};