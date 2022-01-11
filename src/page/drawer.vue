<template>
  <div class="right">
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      个人信息
    </el-button>

    <el-drawer
      :title=$store.state.user.username
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <!--<el-rate
        v-model="value2"
        :colors="colors">
      </el-rate>-->
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                    :options="playerOptions" />
    </el-drawer>
  </div>
</template>

<script>

  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import {videoPlayer} from 'vue-video-player'
  import 'videojs-flash'


  export default {

    components: {
      videoPlayer
    },
    //name: "drawer",
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          controls: true,
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - // // 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          techOrder: ['flash', 'html5'],
          hls: true,
          // flash: {
          // hls: { withCredentials: false },
          // swf: '../../static/js/video-js.swf' // video-js.swf本地文件（自行百度搜索下载）
          // },
          //html5: {hls: {withCredentials: false}},
          sources: [{
            //type: 'rtmp/flv', // 播放rtmp视频
            //src: this.cafe // 你直播视频的路径
            type: 'video/mp4', // 播放mp4视频
            src: require('@/assets/snow fairy story.mp4')
          }],
          poster: require('@/assets/back_hutao.png'), //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        },
      }
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
  }
</script>

<style scoped>
  .right {
    position: absolute;
  }
</style>
