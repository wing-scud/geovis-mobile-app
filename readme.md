# 规范
## CSS 样式规范
1. 全部采用连字符命名 main-title
2. 属性书写顺序：定位属性>自身属性>文字属性>文字样式 
> 1. 定位属性：position  display  float  left  top  right  bottom   overflow  clear   z-index  
> 2. 自身属性：width  height  padding  border  margin   background   
> 3. 文字样式：font-family   font-size   font-style   font-weight   font-varient   color     
> 4. 文本属性：text-align   vertical-align   text-wrap   text-transform  text-indent    text-decoration   letter-spacing    word-spacing    white-space   text-overflow   
> 5. css3中新增属性：content   box-shadow   border-radius  transform…  


## JS 规范


# 运行
## 运行
1. cordova platform add android
cordova install
3. 添加 cordova 插件
4. cd app => npm install => npm run build
5. 打开新终端
6. cordova run android
   
## 打包,签名
密钥库口令同name.keystore口令:aircas
1. cordova build --release android 获取未签名版apk
2. keytool -genkeypair -alias name.keystore -keyalg RSA -validity 4000 -keystore name.keystore 添加名称
3. 将apk名称改为name_unsigned,并和name.keystore置于同级目录下
4. jarsigner -verbose -keystore name.keystore -signedjar name.apk name_unsigned.apk name.keystore 获取签名后apk