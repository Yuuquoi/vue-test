// `npm install firebase` at first

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

import { defineStore } from 'pinia'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export const useFirebaseStore = defineStore('firebase', {
  state: ()=>({
    storage: null,
    itemUrls: [],  // {src: , fullPath: }
  }),

  actions: {

    // 初始化
    setupFirebaseStorage(){
      console.log("init firebase");
      this.storage = getStorage(initializeApp(firebaseConfig));
    },

    // 取得圖片
    async getImgs(){
      console.log("get all files");
      // ref: https://firebase.google.com/docs/storage/web/list-files?hl=zh-tw
      const listRef = ref(this.storage);   // 如果要搜尋特定檔案夾，第二個參數輸入檔案夾名稱
      listAll(listRef)
      .then((res)=>{
        console.log(res);
        this.itemUrls = [];
        // 如果要預覽圖片，請參考以下連結
        // ref: https://firebase.google.com/docs/storage/web/download-files?hl=zh-tw
        for(let i in res.items){
          let item = res.items[i];
          getDownloadURL(ref(this.storage, item.fullPath))
          .then((url)=>{
            this.itemUrls.push({
              src: url,
              fullPath: item.fullPath
            });
          });
        }
      })
    },

    // 上傳圖片
    uploadImg(input, newFileName, uploadProgress=null){
      // console.dir(input.files[0]);
      // return;
      // ref: https://firebase.google.com/docs/storage/web/upload-files?hl=zh-tw
      const storageName = ref(this.storage, newFileName);  // 若要存放在特定檔案夾，用 / 分隔
      const uploadTask = uploadBytesResumable(storageName, input.files[0]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          console.log('Upload state ', snapshot.state);
          // uploadProgress.value = parseInt(progress);
        },
        error => {
          console.log('Upload error', error);
        },
        async () => {
          // uploadProgress.value = null;
          input.files = '';
          this.getImgs();
        }
      );
    },

    // 刪除圖片
    delImg(index){
      const fullPath = this.itemUrls[index].fullPath;
      const desertRef = ref(this.storage, fullPath);
      deleteObject(desertRef).then(() => {
        console.log("成功刪除");
      }).catch((error) => {
        console.log(error);
      });
    },

    // 壓縮圖片
    // ref: https://ithelp.ithome.com.tw/m/articles/10299106
    // ref: https://blog.csdn.net/qq_37111820/article/details/121156771
    // ref: https://blog.csdn.net/pdd11997110103/article/details/108003214
    async compressImg(file){   
      return new Promise(resolve => {
          const ratio = this.photoLimit / file.size;        
          // 讀取圖片
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function(e){
              let img = new Image();
              img.src = e.target.result;
              img.onload = function(){
                  // 使用 canvas 縮放圖片
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  canvas.width = img.width * ratio;
                  canvas.height = img.height * ratio;
                  context.drawImage(img, 0, 0, canvas.width, canvas.height);
                  const dataUrl = canvas.toDataURL(file.type, 1.0);
  
                  // dataURL to file
                  var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                  while(n--){
                      u8arr[n] = bstr.charCodeAt(n);
                  }
                  let res = new File([u8arr], file.name, {type:mime});

                  // return
                  resolve(res);
              }
          }
      })
  },


  }
})
