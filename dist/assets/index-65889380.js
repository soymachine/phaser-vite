var y=Object.defineProperty;var I=(a,e,t)=>e in a?y(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var l=(a,e,t)=>(I(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class s{}s.version="0.1.0";s.LEFT="LEFT";s.RIGHT="RIGHT";s.TOP="TOP";s.BOTTOM="BOTTOM";s.CENTER="CENTER";s.LANDSCAPE="LANDSCAPE";s.PORTRAIT="PORTRAIT";s.easing="Cubic.easeOut";class r{constructor(){this.events={}}subscribe(e="",t){this.events[e]==null&&(this.events[e]=[]),this.events[e].push(t)}unsubscribe(e="",t){this.events[e]!=null&&(this.events[e]=this.events[e].filter(n=>n!==t))}notify(e="",t){var n;(n=this.events[e])==null||n.forEach(i=>i(t))}}r.myInstance=null;r.getInstance=()=>(r.myInstance==null&&(r.myInstance=new r),r.myInstance);r.ON_NODE_CHANGE="ON_NODE_CHANGE";r.ON_NODE_START_IN="ON_NODE_START_IN";r.ON_NODE_END_IN="ON_NODE_END_IN";r.ON_NODE_START_OUT="ON_NODE_START_OUT";r.ON_NODE_END_OUT="ON_NODE_END_OUT";r.ON_SWIPE_GESTURE="ON_SWIPE_GESTURE";r.ON_REQUEST_NEW_NODE="ON_REQUEST_NEW_NODE";r.ON_PROGRESS_LOADING="ON_PROGRESS_LOADING";r.ON_LOADING_COMPLETED="ON_LOADING_COMPLETED";r.ON_ORIENTATION_CHANGED="ON_ORIENTATION_CHANGED";class b extends Phaser.Scene{constructor(){super({key:"BackgroundScene",active:!0});l(this,"gameScene");l(this,"layer");l(this,"onChange",t=>{switch(t){case s.LEFT:this.x-=this.offset;break;case s.RIGHT:this.x+=this.offset;break;case s.TOP:this.y-=this.offset;break;case s.BOTTOM:this.y+=this.offset;break}this.tweens.add({targets:this.view,x:this.x,y:this.y,duration:1e3,ease:s.easing,callbackScope:this,onComplete:function(){}})});this.offset=250,r.getInstance().subscribe(r.ON_NODE_CHANGE,this.onChange)}start(t){this.game=t,this.view=this.game.add.image(0,0,"bg").setOrigin(0,0),this.view.x=-1e3,this.view.y=-1e3,this.x=this.view.x,this.y=this.view.y}}class c{}c.W=0;c.H=0;class O{constructor(e){console.log("Constructor de Logger"),this.logs=[],this.label=e.text}log(e){this.logs.unshift(this.getNum()+" "+e),this.label.text=this.logs.join(`
`)}getNum(){return this.logs.length+1}}O.myInstance=null;O.getInstance=a=>(O.myInstance==null&&(O.myInstance=new O(a)),O.myInstance);class p{constructor(e){console.log("Constructor de Orientation"),this.updateOrientation();const t=r.getInstance(),n=this;window.onresize=function(){n.updateOrientation(),t.notify(r.ON_ORIENTATION_CHANGED,{orientation:n.orientation})}}updateOrientation(){window.innerWidth>window.innerHeight?this.orientation=s.LANDSCAPE:this.orientation=s.PORTRAIT}}p.myInstance=null;p.getInstance=a=>(p.myInstance==null&&(p.myInstance=new p(a)),p.myInstance);class _ extends Phaser.Scene{constructor(){super({key:"GameScene",active:!1});l(this,"cleanScenes",()=>{console.log("[cleanScenes]"),O.myInstance=null,this.globalevents.unsubscribe(r.ON_ORIENTATION_CHANGED,t=>{this.onOrientationChange2(t)}),this.scale.off("orientationchange",this.onOrientationChange,this),this.presentation1.scene.restart(),this.backgroundScene.scene.restart(),this.scene.restart("GameScene")});l(this,"addSection",({section:t,position:n})=>{t.setPosition(n),t.start({game:this,position:n}),this.sections.push(t)});l(this,"getSection",t=>this.sections.find(n=>n.id==t));l(this,"gotoNode",t=>{const n=this.getSection(t);if(this.currentNodeID!=null){const i=this.getSection(this.currentNodeID),o=this.getOutPosition(n.getPosition(),this.currentNodeID);console.log(`move started, currentNode:${this.currentNodeID}`);const h=this.currentNodeID;this.move(this.currentNodeID,o.top,o.left,()=>{this.globalevents.notify(r.ON_NODE_END_OUT,h)}),i.setPosition(o.positionResult)}this.globalevents.notify(r.ON_NODE_START_IN,t),this.globalevents.notify(r.ON_NODE_START_OUT,this.currentNodeID),this.move(t,0,0,()=>{this.globalevents.notify(r.ON_NODE_END_IN,this.currentNodeID)}),this.currentNodeID=t,this.globalevents.notify(r.ON_NODE_CHANGE,this.reversePosition(n.getPosition())),n.setPosition(s.CENTER)});l(this,"move",(t,n,i,o)=>{this.getSection(t).moveTo(n,i,o)});l(this,"getOutPosition",(t,n)=>{let i=0,o=0,h=s.LEFT,d=0;switch(t){case s.LEFT:i=this.W+d,h=s.RIGHT;break;case s.RIGHT:i=-(this.W+d),h=s.LEFT;break;case s.TOP:o=this.H+d,h=s.BOTTOM;break;case s.BOTTOM:o=-(this.H+d),h=s.TOP;break}return{top:o,left:i,positionResult:h}});l(this,"reversePosition",t=>{switch(t){case s.LEFT:return s.RIGHT;case s.RIGHT:return s.LEFT;case s.TOP:return s.BOTTOM;case s.BOTTOM:return s.TOP}})}preload(){console.log("preload"),this.orientationHelper=p.getInstance(),this.firstRunPortrait=this.orientationHelper.orientation==s.PORTRAIT,this.orientation=this.orientationHelper.orientation,console.log(`[preload] this.firstRunPortrait:${this.firstRunPortrait}`),console.log(`[preload] this.orientationHelper.orientation:${this.orientationHelper.orientation}`),console.log(`[preload] this.orientation:${this.orientation}`),c.H=this.scale.gameSize.height,c.W=this.scale.gameSize.width,this.load.plugin("rexbbcodetextplugin","https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js",!0),this.showDisplayMode()}onOrientationChange2(t){this.orientation=t.orientation,console.log(`[onOrientationChange2] newOrientation:${this.orientation}`),this.showDisplayMode()}create(){console.log("create"),this.sections=[],this.currentNode=void 0,this.presentation1=this.scene.get("Presentation1"),this.addSection({section:this.presentation1,position:s.BOTTOM}),this.backgroundScene=this.scene.get("BackgroundScene"),this.backgroundScene.start(this),this.FPStext=this.add.text(0,0,"FPS:"),this.versionText=this.add.text(0,0,`v${s.version}`,{align:"right"}),this.versionText.x=c.W-this.versionText.width,this.logText=this.add.text(0,0,"",{align:"left"}),this.logText.y=30,this.globalevents=r.getInstance(),this.logger=O.getInstance({text:this.logText}),this.logger.log(`firstRunPortrait:${this.firstRunPortrait}`),this.gotoNode("Presentation1"),this.globalevents.subscribe(r.ON_ORIENTATION_CHANGED,t=>{this.onOrientationChange2(t)})}showDisplayMode(){console.log(`showDisplayMode:${this.orientation}`),this.orientation==s.LANDSCAPE?(document.getElementById("turn").style.display="none",this.firstRunPortrait&&this.cleanScenes()):document.getElementById("turn").style.display="block"}handler(t){t.setTint(16711680)}update(){var t=this.sys.game.loop;this.FPStext.text=`FPS:${t.actualFps}`}}class f extends Phaser.Scene{constructor(e){super({key:e,active:!0}),this.id=e,this.globalevents=r.getInstance()}create({margin:e=0,position:t=s.LEFT}){switch(this.position=t,this.sectionW=c.W-e*2,this.sectionH=c.H-e*2,this.view=this.add.container(),t){case s.LEFT:this.view.x=-(c.W+e);break;case s.RIGHT:this.view.x=c.W+e;break;case s.TOP:this.view.y=-(c.H+e);break;case s.BOTTOM:this.view.y=c.H+e;break}}getPosition(){return this.position}setPosition(e){this.position=e}show(){this.tweens.add({targets:this.view,x:0,y:0,duration:1e3,ease:s.easing,callbackScope:this,onComplete:function(){}})}moveTo(e,t,n){this.tweens.add({targets:this.view,x:e,y:t,duration:1e3,ease:s.easing,callbackScope:this,onComplete:function(){n==null||n()}})}scaleImage({type:e,value:t,side:n,img:i}){const o=i.width,h=i.height,d=o/h,N=h/o;let u=0,g=0;e=="percent"?n=="width"?(u=o*t,g=N*u):(g=h*t,u=d*g):n=="width"?(u=t,g=N*u):(g=t,u=d*g),i.displayWidth=u,i.displayHeight=g}centerIMG(e){const t=e.displayWidth,n=e.displayHeight,i=this.scale.gameSize.width*.5-t*.5,o=this.scale.gameSize.height*.5-n*.5;return e.x=i,e.y=o,{x:i,y:o}}}class P{constructor({text:e,game:t,view:n,width:i=100,height:o=100,x:h=0,y:d=0,spriteName:N="bgButton",fontFamily:u='"Roboto", "Roboto-Bold", serif',color:g="white",fontSize:T=18,callback:m=void 0}){this.callback=m,this.button=t.add.container(),this.image=t.make.nineslice({x:0,y:0,key:N,width:i,height:o,leftWidth:0,rightWidth:0,topHeight:0,bottomHeight:0,add:!0}),this.text=t.add.rexBBCodeText(0,0,e,{fontFamily:u,fontSize:T,color:g}).setInteractive(),this.button.add(this.image),this.button.add(this.text),this.button.x=h,this.button.y=d,n.add(this.button),this.displayWidth=i,this.displayHeight=o;const E=this;this.text.on("pointerdown",function(){E.onClick()})}onClick(){var e;(e=this.callback)==null||e.call(this)}}class S extends f{constructor(){super("Presentation1")}start({game:e,position:t}){super.create({position:t}),this.game=e,this.perfume=this.game.add.image(0,0,"perfume").setOrigin(0,0).setInteractive(),this.perfume.name="perfume",this.view.add(this.perfume),this.scaleImage({img:this.perfume,type:"pixels",value:this.sectionH*.7,side:"height"}),this.centerIMG(this.perfume),this.presentationText=this.add.rexBBCodeText(0,0,"PRESENTACIÓN [b]TÍTULO[/b]",{fontFamily:'"Roboto", "Roboto-Bold", serif',fontSize:64,color:"#5656ee"}),this.centerIMG(this.presentationText),this.textButton=new P({game:this.game,text:"SIGUIENTE",view:this.view,x:100,y:100,width:219,height:168,spriteName:"bgButton"}),this.game.make.nineslice({x:200,y:500,key:"splash",add:!0}),this.centerIMG(this.textButton),this.game.input.on("gameobjectdown",(n,i)=>{i.name=="perfume"&&(this.moveRandom(),this.globalevents.notify(r.ON_NODE_CHANGE,s.BOTTOM))})}moveRandom(){const e=Phaser.Math.Between(this.perfume.displayWidth,c.W-this.perfume.displayWidth),t=Phaser.Math.Between(this.perfume.displayHeight,c.H-this.perfume.displayHeight);this.tweens.add({targets:this.perfume,x:e,y:t,duration:1e3,ease:s.easing,callbackScope:this,onComplete:function(){}})}}class w extends f{constructor(){super("Presentation2")}}class x extends Phaser.Scene{constructor(){super("PreloadScene")}preload(){this.load.image("splash","/splash.png"),this.load.image("perfume","/perfume.png"),this.load.image("bgButton","/buttons/bgButton.png"),this.load.image("bg","/background.jpg")}create(){console.log("Preloaded finished"),this.scene.switch("GameScene")}}console.log("Version: "+s.version);const v={type:Phaser.CANVAS,backgroundColor:"#000000",scale:{mode:Phaser.Scale.RESIZE,parent:"phaser-example",width:window.innerWidth,height:window.innerHeight},scene:[x,_,b,S,w]};p.getInstance();new Phaser.Game(v);
