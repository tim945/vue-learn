<template>
  <div v-if="isMessagebox" class="message-box" v-dialog-drag="{moveHeader: '.title', moveBox: '.custom-message'}">
    <p class="title">
      <span class="code" v-if="options.msgCode">{{ options.msgCode }}：</span>
      <span v-else v-html="options.message"></span>
    </p>    
  </div>

  <div v-else class="message-box">
    <p class="title">
      <span class="code" v-if="options.msgCode">{{ options.msgCode }}：</span>
      <span v-if="isISC999">{{ options.defaultMsg }}</span>
      <span v-else v-html="options.message"></span>
    </p>
    <p class="more-box" v-if="isISC999">
      <a class="show-more" @click="showMore">{{ options.showMoreText }}</a>
    </p>
    <el-scrollbar v-if="isISC999" v-show="scrollShow" :native="false"  :noresize="false" wrapClass='scroll-message'>
      {{ options.message }}
    </el-scrollbar>
  </div>
</template>  

<script>
export default {
  name: 'Message',
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }    
  },
  data() {
    return {
      scrollShow: false
    }
  },
  computed: {
    isISC999() {
      console.log(this)
      return this.options.msgCode == 'ISC-999'
    },
    isMessagebox() {
      return this.options.messageType == 'messagebox'
    }
  },
  methods: {
    showMore(event) {
      this.scrollShow = !this.scrollShow
    }
  },
  mounted() {
    // console.log(this.showMoreText, this.options)
  }
}
</script>