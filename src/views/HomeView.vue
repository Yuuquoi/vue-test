<script setup>
import { useFirebaseStore } from '@/stores/firebase';
import { ref, onBeforeMount } from 'vue';

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
</script>

<template>
  <p>Hello World</p>
  <input ref="input" type="file">
  <button @click="uploadImg">上傳圖片</button>
  <button @click="getImgs">取得圖片</button>
  <button @click="delImg">刪除圖片</button>
  <img v-for="item in useFirebase.itemUrls" :src="item.src" alt="">
</template>