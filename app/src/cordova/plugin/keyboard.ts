const Keyboard =window['Keyboard'];
Keyboard.shrinkView(false);
/**
 * 收缩视图无效,只能通过config.xml的edit-config配置android:windowSoftInputMode="adjustPan"
 * 原来为adjustResize改为adjustPan ,
 * 最后移除platform android ,再重新添加android,=>重新根据config.xml生成AndroidManifest.xml
 */