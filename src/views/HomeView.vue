<script setup>
import { useFirebaseStore } from '@/stores/firebase';
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const useFirebase = useFirebaseStore();

const input = ref(null);

onBeforeMount(()=>{
  useFirebase.setupFirebaseStorage();
})

function getImgs(){
  useFirebase.getImgs();
}

function uploadImg() {
  useFirebase.uploadImg(input.value, "test/test.jpg");
}

function delImg(index) {
  useFirebase.delImg(0);
}

function downloadImg(url){
  axios.get(url, {responseType: 'blob'})
  .then(res => {
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    // 運用 a 標籤來模擬點擊下載
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'todo-1.jpg';  // 需要重新輸入檔案名稱與資料型態
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  })
}
</script>

<template>
  <p>Hello World</p>
  <input ref="input" type="file">
  <button @click="uploadImg">上傳圖片</button>
  <button @click="getImgs">取得圖片</button>
  <button @click="delImg">刪除圖片</button>
  <div class="img" v-for="item in useFirebase.itemUrls">
    <button @click="downloadImg(item.src)">下載此圖片</button>
    <img style="width: 400px;" :src="item.src" alt="">
  </div>
</template>