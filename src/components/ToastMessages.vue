<template>
    <div class="toast-container position-fixed top-3 pe-3 top-0 end-0">
        <ToastCp v-for="(msg, key) in messages" :key="key"
        :msg="msg"/>
    </div>
</template>
<script>
import ToastCp from './Toast.vue';

export default {
  components: { ToastCp },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => { // 將push-message事件 加在emitter上
      // 黃色括弧message是外部傳來的
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      // 每次push-message被觸發 訊息就會被加進訊息列表
    });
  },
};
</script>
