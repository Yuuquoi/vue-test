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

    setupFirebaseStorage(){
      console.log("init firebase");
      this.storage = getStorage(initializeApp(firebaseConfig));
    },

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

    delImg(index){
      const fullPath = this.itemUrls[index].fullPath;
      const desertRef = ref(this.storage, fullPath);
      deleteObject(desertRef).then(() => {
        console.log("成功刪除");
      }).catch((error) => {
        console.log(error);
      });
    }

  }
})
