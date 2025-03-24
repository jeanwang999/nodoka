<template>
<!-- DelModal -->
<div class="modal fade" id="exampleModal" tabindex="-1"
aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal" >
<div class="modal-dialog modal-ms" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <!-- <h5 class="modal-title" id="exampleModalLabel" v-for="i in item" :key="i.id">
        <span>刪除</span>
        <span>刪除{{ i.title }}?</span>
      </h5> -->
      <h5 class="modal-title" id="exampleModalLabel" >
        <span>刪除產品</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" >
      <p >是否刪除 {{ item.title }}?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <button type="button" class="btn btn-danger"
      @click="$emit('del-item')">確認刪除
      </button>
    </div>
  </div>
</div>
</div></template>

<script>
import modalMixin from '../../mixins/modalMixin';

export default {
  props: {
    item: {},
  },
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
};
</script>
