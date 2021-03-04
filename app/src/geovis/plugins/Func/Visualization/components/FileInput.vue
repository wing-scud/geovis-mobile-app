<template>
  <div class="addDataPage" v-drag>
    <div class="pageHeader">
      <button @click="showAddDataPage">X</button>
    </div>

    <div class="addPageTitle">
      <button @click="localFile">本地文件</button>
      <button @click="urlInput">URL导入</button>
      <button @click="serveResouce">服务器资源</button>
    </div>

    <div class="addPageBody">
      <div v-show="localFiles" class="fileUpload" id="drop-area">
        <div class="center">
          <label for="fileInput">
            <img src="../image/all/文件上传.png" class="upload_img" />
          </label>
          <input type="file" id="fileInput" v-show="false" ref="file" @change="handleFileUpload" />
          <p>拖动文件或点击图标以上传</p>
          <span>请上传geojson,csv格式的文件</span>
        </div>

        <div class="bottom" v-show="fileSuccess">
          <!--上传成功-->
          <div class="bottomstyle">
            <img src="../image/all/文件.png" />
            <div class="process">
              <div>{{ fileName }}</div>
              <!-- <el-progress :percentage="file.progress" :status="file.progerss==100?'success':'text'"></el-progress> -->
              <div class="processShow">
                <span class="rate">{{ fileSize }}</span>
                <button class="processnum success">!</button>
                <button class="processnum delete">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--url导入-->
      <div v-show="urlInputs" class="fileUpload">
        <div class="center urlUp">
          <p>远程服务器URL资源上传</p>
          <div class="bluebox">
            <img src="../image/all/服务器url.png" />
          </div>
          <input type="text" value="enter" class="serveInput" />
          <button class="blueBtn">
            <img src="../image/all/服务器上传.png" />
            <span>UPLOAD</span>
          </button>
        </div>
      </div>
      <!--服务器资源-->
      <div v-show="serveResouces" class="fileUpload">
        <div class="center">
          <p class="atention">
            <img src="../image/all/注意.png" />
            选择服务器中已存在的数据资源
          </p>
          <div class="serveDiv">
            <div class="servebox">
              选择数组
            </div>
            <input type="text" value="enter" class="serveInput" />
          </div>
          <div>
            <div class="servebox">
              选择数据
            </div>
            <input type="text" value="enter" class="serveInput" />
          </div>
          <button class="blueBtn">
            <img src="../image/all/服务器上传.png" />
            <span>UPLOAD</span>
          </button>
        </div>
      </div>
    </div>
    <!--底部-->
    <!-- <div class="addPageBottom"></div> -->
  </div>
</template>
<script>
import   visManager from  "../model/VisManager.js";

 export default {
  name: "FileInput",

  data() {
    return {
      localFiles: true,
      urlInputs: false,
      serveResouces: false,
      dropActive: false,
      fileSuccess: false,
      fileName: "",
      fileSize: 0
    };
  },
  methods: {
   
    showAddDataPage() {
      this.$emit("showAddDataPage");
    },
    localFile() {
      this.localFiles = true;
      this.urlInputs = false;
      this.serveResouces = false;
    },
    urlInput() {
      this.localFiles = false;
      this.urlInputs = true;
      this.serveResouces = false;
    },
    serveResouce() {
      this.localFiles = false;
      this.urlInputs = false;
      this.serveResouces = true;
    },
    dropEvent(e) {
      this.dropActive = false;
      e.stopPropagation();
      e.preventDefault();
      this.uploadFile(e.dataTransfer.files);
    },
    uploadFile(file) {
       if (file && file.length) {
        console.log(file);
        this.filehandle(file[0]);
      }
    },
     handleFileUpload() {
      const file = this.$refs.file.files[0];
      this.filehandle(file);
    },
    filehandle(file){
      this.file = file;
      this.fileSuccess = true;
      this.fileName = file.name;
      this.fileSize = file.size / 1024 > 1024 ? (file.size / Math.pow(1024, 2)).toFixed(0) + "MB" : (file.size / 1024).toFixed(0) + "KB";
      this.$emit("fileChange",this.fileName);
      
    }
  },
  mounted() {
     const dropArea = document.getElementById("drop-area");
    dropArea.addEventListener("dragenter", e => {
      e.stopPropagation();
      e.preventDefault();
      this.dropActive = true;
    });
    dropArea.addEventListener("dragover", e => {
      e.stopPropagation();
      e.preventDefault();
      this.dropActive = true;
    });
    dropArea.addEventListener("dragleave", e => {
      e.stopPropagation();
      e.preventDefault();
      this.dropActive = false;
    });
    dropArea.addEventListener("drop", this.dropEvent, false);
  }
};
</script>
<style lang="scss">
.addDataPage {
  position: absolute;
  width: 700px;
  background: white;
  left: 300px;
  top: 200px;
}
.pageHeader {
  height: 30px;
  background: rgb(10, 117, 255);
  button {
    width: 30px;
    height: 30px;
    background: lightgray;
    border: 0;
    color: white;
    float: right;
  }
}
.addPageTitle {
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  //font-size:16px;
  button {
    width: 100%;
    border: 0;
    background: white;
  }
  button:hover,
  button:focus {
    border-bottom: 1px solid rgb(10, 117, 255);
    outline: none;
    color: rgb(10, 117, 255);
  }
}
.addPageBody {
  // position:relative;
  width: 100%;
  //   height: 350px;
  padding-bottom: 30px;
}
.fileUpload {
  width: 100%;
 // height: 270px;
  // position:absolute;
  // left:0;
  // top:0;
}
.center {
  width: 75%;
  height: 260px;
  margin: 15px auto;
  border: 1px dashed gray;
  background: rgb(232, 247, 254);
  text-align: center;
}
.upload-demo {
  width: 100% !important;
  height: 100%;
  // visibility:hidden;
}
.upload_img {
  margin-top: 60px;
  margin-bottom: 20px;
}
.urlUp {
  vertical-align: middle;
  p {
    margin: 60px 0 20px 0;
    font-weight: bolder;
    font-size: 19px;
  }
}
.serveInput {
  width: 360px;
  height: 24px;
  padding-left: 10px;
  color: gray;
  font-size: 16px;
  vertical-align: middle;
}
.bluebox {
  width: 40px;
  height: 30px;
  background: rgb(10, 117, 255);
  display: inline-block;
  vertical-align: middle;
  img {
    width: 20px;
    height: 20px;
  }
}
.blueBtn {
  width: 120px;
  height: 32px;
  line-height: 30px;
  border: 0;
  background: rgb(10, 117, 255);
  display: block;
  margin: 20px auto;
  img {
    margin: -10px 5px 0 0;
  }
  span {
    font-size: 12px;
    color: white;
  }
}
.atention {
  margin-top: 50px;
  text-align: left;
  font-size: 12px;
  width: 80%;
  margin-left: 35px;
  img {
    width: 16px;
    margin-top: -3px;
  }
}
.serveDiv {
  margin: 20px 0;
}
.servebox {
  width: 65px;
  height: 30px;
  line-height: 30px;
  background: rgb(10, 117, 255);
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  color: white;
  text-align: center;
}
.bottom {
  text-align: left;
  width: 500px;
  margin: auto;
  img {
    width: 40px;
    height: 40px;
  }
  .bottomstyle {
    width: 200px;
    padding:10px;
    border:1px solid lightgray;
    border-radius:10px;
    text-align: left;
  }
  .bottomstyle:hover{
      border:1px solid red;
      border:1px solid rgba(10, 116, 255, 0.678);
  }
}
.process {
  display: inline-block;
  width: 160px;
  height: 30px;
  vertical-align: middle;

  font-size: 12px;
  div {
    text-align: left;
  }
  .el-progress-bar__outer {
    width: 110% !important;
    background-color: lightgray !important;
    height: 3px !important;
  }
  .el-progress-bar__inner {
    background-color: rgb(88, 197, 245);
  }
  .el-progress__text {
    display: none;
  }
}
.processShow {
  width: 100%;
  .rate {
    color: lightgray;
    margin-right: 60px;
  }
  .processnum{
      border:0;
      width:20px;
      height:20px;
      line-height:20px;
      text-align:center;
      border-radius:20px;
      color:white;
  }
  .success{
    background:rgb(10, 117, 255);
    margin-right:15px;
  }
  .delete{
     background:tomato;
          background:red;

  }
}
.addPageBottom {
  width: 100%;
  height: 20px;
  background: rgb(10, 117, 255);
}
</style>