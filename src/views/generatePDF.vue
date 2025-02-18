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


  import { font } from '../../public/NotoSansTC-Regular-normal';

  const printCn = ref(null);
  function generatePdfChinese(){
    // jsPDF 字體中不支援中文，若要顯示中文字，需先配置相關字體
    // 1. 自行搜尋並下載要使用的中文字體 .ttf 檔案（如果使用 google font，注意下載後的字體包含所有樣式，需要再打開細節，一次選擇一種樣式的 .ttf）
    // 2. 使用 jsPDF 提供的轉換頁面，將 .ttf 檔轉換為 Base64 編碼 https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html
    // 3. 將轉換後的 .js 檔案複製到專案中，接著有兩種做法
    // 4-1. 使用檔案裡面的內容配置字體 
    //      => 直接使用在需要產生 pdf 的檔案中 import .js（import 時就會自動執行裡面的程式碼）
    // 4-2. 自行配置字體(此處範例) 
    //      => 將檔案中的其餘方法移除，只留下裝有 base64 編碼的變數 font(如有多個，建議修改變數名稱)
    //      => 在虛擬文件系統（VFS）中，新增字體簿：doc.addFileToVFS('MyFont.ttf', font);
    //      => 在此份 pdf 中下載此字體簿，並自定義字體名稱：doc.addFont('MyFont.ttf', 'CustomFontName', 'normal');
    // 5. 根據輸出的方式，做以下設定：
    // 5-1. 要使用文字作為 pdf 輸出內容：doc.text(0, 0, "我是要輸出的文字")
    //      => 設定文字樣式：doc.setFont('CustomFontName');
    // 5-2. 要使用 html 作為 pdf 輸出內容：doc.html("<p>我是html</p>", obj)
    //      => 需要在 html 內，以自定義的字體名稱設定樣式：doc.html("<p style='font-family: CustomFontName'>我是html</p>", obj)
    // 5.3 其他，若要使用 table 等樣式，需另外設定字體
    //    ref: https://blog.csdn.net/lingliu0824/article/details/113872067

    var doc = new jsPDF('p', 'pt', 'A4');
    doc.addFileToVFS('NotoSansTC-Regular-normal.ttf', font);
    doc.addFont('NotoSansTC-Regular-normal.ttf', 'NotoSansTC-Regular', 'normal');
    doc.html(printCn.value, {
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
  </div>

  <div ref="printCn" style="font-family: NotoSansTC-Regular">
    <h1>我是你夢寐以求的中文 </h1>
    <div class="card">
    <div class="card-header">
        特徵
    </div>
    <div class="card-body">
        <h5 class="card-title">我是標題</h5>
        <p class="card-text">我則是一些有的沒的文字</p>
        <a href="#" class="btn btn-primary">我是去某個地方的某種連結</a>
    </div>
    </div>
  </div>

  <button @click="generatePdf">產生 PDF</button>
  <button @click="generatePdfChinese">產生中文 PDF</button>
</template>

<style scoped lang="scss">
</style>
