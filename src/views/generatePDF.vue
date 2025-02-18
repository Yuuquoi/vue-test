<script setup>
// 執行程式碼前先輸入以下：
// npm install jspdf --save

  import { ref } from 'vue';
  import jsPDF from 'jspdf';

  const print = ref(null);  // 要轉換的 html el

  function generatePdf(){
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.html(print.value, {
      callback: function (doc) {  // 等待頁面轉換完畢之後，才去呼叫儲存
        doc.save('example.pdf'); // 儲存檔案，記得修改檔案名稱
      },
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10
    });
  }
</script>

<template>
  <div ref="print">
    <h1>Test heading </h1>
    <div class="card">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    <div class="card">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  </div>

  <button @click="generatePdf">產生ＰＤＦ</button>
</template>

<style scoped lang="scss">
</style>
