"use strict";(self.webpackChunkwebsite2_0=self.webpackChunkwebsite2_0||[]).push([[9676],{59676:function(e,t,n){n.r(t),n.d(t,{walletConnect:function(){return L}});var i=n(1413),o=n(74165),a=n(15861),r=n(15671),s=n(43144),c=n(97326),l=n(60136),u=n(29388),d=n(41146),h=n(46170),v=n(63700),p=n(72705),b=n(81501),w=n(58755),f=(n(65892),n(19766),new WeakMap),Z=new WeakMap,_=new WeakMap,k=new WeakMap,m=new WeakMap,M=new WeakMap,q=new WeakMap,W=new WeakMap,g=new WeakSet,C=new WeakSet,I=function(e){(0,l.Z)(i,e);var t=(0,u.Z)(i);function i(e){var n;return(0,r.Z)(this,i),n=t.call(this,(null===e||void 0===e?void 0:e.walletId)||i.id,e),(0,d._)((0,c.Z)(n),C),(0,d._)((0,c.Z)(n),g),(0,v._)((0,c.Z)(n),f,{writable:!0,value:void 0}),(0,v._)((0,c.Z)(n),Z,{writable:!0,value:void 0}),(0,h._)((0,c.Z)(n),"connector",void 0),(0,h._)((0,c.Z)(n),"projectId",void 0),(0,h._)((0,c.Z)(n),"qrcode",void 0),(0,v._)((0,c.Z)(n),_,{writable:!0,value:function(e){if(e)throw e}}),(0,v._)((0,c.Z)(n),k,{writable:!0,value:function(e){if((0,v.a)((0,c.Z)(n),Z,e.provider),!(0,v.b)((0,c.Z)(n),Z))throw new Error("WalletConnect provider not found after connecting.")}}),(0,v._)((0,c.Z)(n),m,{writable:!0,value:function(){(0,d.a)((0,c.Z)(n),C,y).call((0,c.Z)(n))}}),(0,v._)((0,c.Z)(n),M,{writable:!0,value:function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.chain||t.account;case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),(0,v._)((0,c.Z)(n),q,{writable:!0,value:function(e){if("display_uri"===e.type)n.emit("open_wallet",e.data)}}),(0,v._)((0,c.Z)(n),W,{writable:!0,value:function(){n.emit("open_wallet")}}),n.projectId=(null===e||void 0===e?void 0:e.projectId)||"145769e410f16970a79ff77b2d89a1e0",n.qrcode=!1!==(null===e||void 0===e?void 0:e.qrcode),n}return(0,s.Z)(i,[{key:"walletName",get:function(){return"WalletConnect"}},{key:"getConnector",value:function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){var t,i,a;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.connector){e.next=15;break}return e.next=3,n.e(6186).then(n.bind(n,6186));case 3:return i=e.sent,a=i.WalletConnectConnector,(0,v.a)(this,f,new a({chains:this.chains,options:{qrcode:this.qrcode,projectId:this.projectId,dappMetadata:this.dappMetadata,storage:this.walletStorage,qrModalOptions:null===(t=this.options)||void 0===t?void 0:t.qrModalOptions}})),this.connector=new p.W((0,v.b)(this,f)),e.t0=v.a,e.t1=this,e.t2=Z,e.next=12,(0,v.b)(this,f).getProvider();case 12:e.t3=e.sent,(0,e.t0)(e.t1,e.t2,e.t3),(0,d.a)(this,g,j).call(this);case 15:return e.abrupt("return",this.connector);case 16:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),i}(b.a);function j(){var e;(0,v.b)(this,f)&&((0,d.a)(this,C,y).call(this),(0,v.b)(this,f).on("connect",(0,v.b)(this,k)),(0,v.b)(this,f).on("disconnect",(0,v.b)(this,m)),(0,v.b)(this,f).on("change",(0,v.b)(this,M)),(0,v.b)(this,f).on("message",(0,v.b)(this,q)),null===(e=(0,v.b)(this,Z))||void 0===e||e.signer.client.on("session_request_sent",(0,v.b)(this,W)))}function y(){var e;(0,v.b)(this,f)&&((0,v.b)(this,f).removeListener("connect",(0,v.b)(this,k)),(0,v.b)(this,f).removeListener("disconnect",(0,v.b)(this,m)),(0,v.b)(this,f).removeListener("change",(0,v.b)(this,M)),(0,v.b)(this,f).removeListener("message",(0,v.b)(this,q)),null===(e=(0,v.b)(this,Z))||void 0===e||e.signer.client.removeListener("session_request_sent",(0,v.b)(this,W)))}(0,h._)(I,"id",w.w.walletConnect),(0,h._)(I,"meta",{name:"WalletConnect",iconURL:"ipfs://QmX58KPRaTC9JYZ7KriuBzeoEaV2P9eZcA3qbFnTHZazKw/wallet-connect.svg"});var L=function(e){var t=(null===e||void 0===e?void 0:e.projectId)||"145769e410f16970a79ff77b2d89a1e0";return{id:I.id,meta:I.meta,create:function(n){return new I((0,i.Z)((0,i.Z)({},n),{},{qrcode:!0,projectId:t,qrModalOptions:null===e||void 0===e?void 0:e.qrModalOptions}))},config:{projectId:t,qrModalOptions:null===e||void 0===e?void 0:e.qrModalOptions}}}}}]);
//# sourceMappingURL=9676.42bd8958.chunk.js.map