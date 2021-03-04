import { earthStore } from "../../../store";

class PostStageModel {
  constructor(options) {
    const { type } = options;
    console.log(options, type);
    switch (type) {
      case "lensFlare": //耀斑
        this.stage = GeoVis.PostProcessStageLibrary.createLensFlareStage();
        break;
      case "blackAndWhite": //黑白
        this.stage = GeoVis.PostProcessStageLibrary.createBlackAndWhiteStage();
        break;
      case "blur": //马赛克
        this.stage = GeoVis.PostProcessStageLibrary.createBlurStage();
        break;
      case "bright": //亮度
        this.stage = GeoVis.PostProcessStageLibrary.createBrightnessStage();
        break;
      case "depthOfField": //景深
        this.stage = GeoVis.PostProcessStageLibrary.createDepthOfFieldStage(earth.scene); // isEdgeDetectionSupported = false
        this.stage.uniforms.enabled = true;
        break;
      case "bloom": //泛光
        this.stage = earth.scene.postProcessStages.bloom;
        this.stage.enabled = true;
        this.stage.uniforms.glowOnly = false;
        break;
      case "nightVision": //夜视
        this.stage = GeoVis.PostProcessStageLibrary.createNightVisionStage();
        break;
      case "silhouette": //轮廓
        this.stage = GeoVis.PostProcessStageLibrary.createSilhouetteStage(); //isSilhouetteSupported = false;
        // this.stage.uniforms.enabled = true;
        break;
      case "ambientOcclusion": //环境遮蔽
        this.stage = earth.scene.postProcessStages.ambientOcclusion; //isAmbientOcclusionSupported = false
        break;
      case "shadow": //阴影
        earth.scene.shadowMap = new GeoVis.ShadowMap({
          lightCamera: earth.camera,
          context: earth.scene.context
        });
        earth.scene.shadowMap.enabled = true;
        break;
      case "light": //强制光照
        earth.scene.globe.enableLighting = true;
        earth.shadows = true;
        break;
      case "sun": //太阳
        earth.scene.sun.show = true;
        break;
      case "moon": //月亮
        earth.scene.moon.show = true;
        break;
      case "skyBox":
        earth.scene.skyBox.show = true;
        break;
      case "skyAtmosphere": //大气
        earth.scene.skyAtmosphere.show = true;
        break;
      case "rain": //下雨
        this.stage = this.rainfall();
        break;
      case "snow": //下雨
        this.stage = this.snowfall();
        break;
      case "fog": //雾
        earth.scene.fog.enabled = true;
        break;
      case "fullfog": //全屏雾
        this.stage = this.fog();
        break;
    }
    if (type == "ambientOcclusion" || (type == "bloom" && this.stage)) {
      console.log("hi");
    } else if (this.stage) {
    earthStore.earth.scene.postProcessStages.add(this.stage);
    }
  }

  rainfall() {
    const Rain = `
uniform sampler2D colorTexture;//输入的场景渲染照片
uniform float  vate;
uniform float speed;
  varying vec2 v_textureCoordinates;
  float hash(float x){
       return fract(sin(x*133.3)*13.13);
  }
  void main(void){
   
      float time = czm_frameNumber / (130.0-speed);
      vec2 resolution = czm_viewport.zw;
  
      vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
      vec3 c=vec3(.6,.7,.8);
  
      float a=-.4;
      float si=sin(a),co=cos(a);
      uv*=mat2(co,-si,si,co);
      uv*=length(uv+vec2(0,4.9))*.3+1.;
  
      float v=1.-sin(hash(floor(uv.x*100.))*2.);
      float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;
      c*=v*b; //屏幕上雨的颜色
  
      gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); //将雨和三维场景融合
  }`; 
    GeoVis.PostProcessStageLibrary.createRainStage = function() {
      const rain = new GeoVis.PostProcessStage({
        name: "czm_rain",
        fragmentShader: Rain,
        uniforms:{
          speed:70.0
        }
      });
      return rain;
    };
    const rain = GeoVis.PostProcessStageLibrary.createRainStage();
    return rain;
    // const scene = earth.scene;
    // scene.skyAtmosphere.hueShift = -0.8;
    // scene.skyAtmosphere.saturationShift = -0.7;
    // scene.skyAtmosphere.brightnessShift = -0.33;

    // scene.fog.density = 0.001;
    // scene.fog.minimumBrightness = 0.8;
  }

  snowfall() {
    const Snow = `
uniform sampler2D colorTexture; //输入的场景渲染照片
  varying vec2 v_textureCoordinates;
  uniform float speed;
  float snow(vec2 uv,float scale)
  {
      float time = czm_frameNumber / (90.0-speed);
      float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;
      uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;
      uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;
     p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);
     k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
     return k*w;
 }
 
 void main(void){
     vec2 resolution = czm_viewport.zw;
     vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
     vec3 finalColor=vec3(0);
     //float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));
     float c = 0.0;
     c+=snow(uv,30.)*.0;
     c+=snow(uv,20.)*.0;
     c+=snow(uv,15.)*.0;
     c+=snow(uv,10.);
     c+=snow(uv,8.);
     c+=snow(uv,6.);
     c+=snow(uv,5.);
     finalColor=(vec3(c)); //屏幕上雪的颜色
      gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5);  //将雪和三维场景融合
}
  `;

    GeoVis.PostProcessStageLibrary.createSnowStage = function() {
      const snow = new GeoVis.PostProcessStage({
        name: "czm_snow",
        fragmentShader: Snow,
        uniforms:{
          speed:30.0
        }
      });
      return snow;
    };
    const snow = GeoVis.PostProcessStageLibrary.createSnowStage();
    return snow;
  }


  fog() {
    const Fog = `
    uniform sampler2D colorTexture;
    uniform sampler2D depthTexture;
    uniform float potency;
    varying vec2 v_textureCoordinates;
    void main(void){
      vec4 origcolor = texture2D(colorTexture,v_textureCoordinates);
      vec4 fogcolor = vec4(0.8,0.8,0.8,0.5);
      float depth = czm_readDepth(depthTexture,v_textureCoordinates);
      vec4 depthColor = texture2D(depthTexture,v_textureCoordinates);
      float  f=(depthColor.r-0.22)/(11.0-potency); //1-10
      if(f<0.0)f=0.0;
      else if(f>1.0)f=1.0;
      gl_FragColor = mix(origcolor,fogcolor,f);
    } `;
    //调节f的值可以调节雾的浓度，修改1.5即可
    GeoVis.PostProcessStageLibrary.createFogStage = function() {
      const fogstage = new GeoVis.PostProcessStage({
        name: "czm_fog",
        fragmentShader: Fog,
            uniforms : {
              potency : 9.5
           }
      });
      return fogstage;
    };
    const fog = GeoVis.PostProcessStageLibrary.createFogStage();
      return fog;
  }

  updateValue(type, key, value) {
    console.log(1);
  }

  destroy() {
    earthStore.earth.scene.postProcessStages.remove(this.stage);
  }
}

export default PostStageModel;
