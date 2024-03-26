import{lerp,getMousePos,calcWinsize,distance,getRandomFloat}from"./utils.js";let winsize=calcWinsize();window.addEventListener("resize",(()=>winsize=calcWinsize()));let mousepos={x:0,y:0};window.addEventListener("mousemove",(e=>mousepos=getMousePos(e)));export class MagneticFx{constructor(e){this.DOM={el:e},this.renderedStyles={tx:{previous:0,current:0,amt:.1},ty:{previous:0,current:0,amt:.1}},this.calculateSizePosition(),this.initEvents()}calculateSizePosition(){this.scrollVal={x:window.scrollX,y:window.scrollY},this.rect=this.DOM.el.getBoundingClientRect()}initEvents(){window.addEventListener("resize",(()=>this.calculateSizePosition())),this.DOM.el.addEventListener("mouseenter",(()=>{this.loopRender()})),this.DOM.el.addEventListener("mouseleave",(()=>{this.stopRendering(),this.renderedStyles.tx.previous=this.renderedStyles.ty.previous=0}))}loopRender(){this.requestId||(this.requestId=requestAnimationFrame((()=>this.render())))}stopRendering(){this.requestId&&(window.cancelAnimationFrame(this.requestId),this.requestId=void 0)}render(){this.requestId=void 0;const e=this.scrollVal.x-window.scrollX,t=this.scrollVal.y-window.scrollY;this.renderedStyles.tx.current=.3*(mousepos.x-(e+this.rect.left+this.rect.width/2)),this.renderedStyles.ty.current=.3*(mousepos.y-(t+this.rect.top+this.rect.height/2));for(const e in this.renderedStyles)this.renderedStyles[e].previous=lerp(this.renderedStyles[e].previous,this.renderedStyles[e].current,this.renderedStyles[e].amt);gsap.set(this.DOM.el,{x:this.renderedStyles.tx.previous,y:this.renderedStyles.ty.previous}),this.loopRender()}}