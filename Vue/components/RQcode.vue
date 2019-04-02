<template>
  <el-dialog
    title="设备二维码"
    :visible="dialogVisible"
    width="30%"
    close-on-press-escape
    close-on-click-modal
    show-close
  >
    <div style="text-align: center;">
      <canvas ref="myCanvas" id="msg"></canvas>
      <p>uuid: {{ uuid }}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false; $emit('dialogChange', false)">关 闭</el-button>
      <el-button type="primary" @click="downRQcode">下 载</el-button>
    </span>
  </el-dialog>
</template>

<script>
import QRCode from "qrcode";

export default {
  props: {
    uuid: {
      default: ""
    },
    imei: {
      default: ""
    },
    dialog: {
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    dialog(e) {
    this.dialogVisible = e;
    this.useqrcode(this.uuid)
    }
  },
  methods: {
    // 生成二维码
    useqrcode(val) {
      const that = this;
      setTimeout(() => {
        var canvas = document.getElementById("msg");
        QRCode.toCanvas(canvas, val, function(error) {
          if (error) console.error(error);
          console.log("QRCode success!");
        });
      }, 500);
    },

    // 下载图片按钮
    downRQcode() {
      this.saveImg();
    },
    // 下载图片
    saveImg() {
      const canvasData = document.getElementById("msg");
      const a = document.createElement("a");
      a.href = canvasData.toDataURL();
      a.download = this.imei;
      a.click();
    }
  }
};
</script>
