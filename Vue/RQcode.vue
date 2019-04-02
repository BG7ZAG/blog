<template>
  <div>
    <rqcode :dialog="dialog" :uuid="uuid" :imei="imei" @dialogChange="dialog = false"/>
  </div>
</template>

<script>
import rqcode from "./componenrts/RQcode";
export default {
  components: {
    rqcode
  },
  data() {
    return {
      dialog: false,
      imei: "",
      uuid: "",
    };
  },
  methods:{
    // 生成二维码事件
    getRQcode(){
      this.uuid = id;
      this.imei = imei;
      // 以上为参数 ，可以自定义添加或者组合
      this.dialog = true;
    },
  }
};
</script>