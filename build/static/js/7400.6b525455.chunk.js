"use strict";(self.webpackChunkwebsite2_0=self.webpackChunkwebsite2_0||[]).push([[7400],{33581:function(t,r,e){e.d(r,{S:function(){return i}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(95360),o=e(60067),i=function(){function t(r,e,u){var i=this;(0,c.Z)(this,t),(0,s._)(this,"contractWrapper",void 0),(0,s._)(this,"storage",void 0),(0,s._)(this,"erc20",void 0),(0,s._)(this,"_chainId",void 0),(0,s._)(this,"transfer",(0,o.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.transfer.prepare(r,e));case 1:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,s._)(this,"transferFrom",(0,o.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.transferFrom.prepare(r,e,a));case 1:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}())),(0,s._)(this,"setAllowance",(0,o.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.setAllowance.prepare(r,e));case 1:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,s._)(this,"transferBatch",(0,o.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.transferBatch.prepare(r));case 1:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),this.contractWrapper=r,this.storage=e,this.erc20=new o.ap(this.contractWrapper,this.storage,u),this._chainId=u}return(0,u.Z)(t,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"get",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc20.get());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"balance",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.erc20.balance();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"balanceOf",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc20.balanceOf(r));case 1:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"totalSupply",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.erc20.totalSupply();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"allowance",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.erc20.allowance(r);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"allowanceOf",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.erc20.allowanceOf(r,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()}]),t}()},97400:function(t,r,e){e.r(r),e.d(r,{TokenDrop:function(){return d}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(97326),o=e(60136),i=e(29388),p=e(95360),f=e(60067),h=e(33581),l=e(68624),d=(e(80518),e(84255),e(98528),e(49675),e(20737),e(78262),e(66315),function(t){(0,o.Z)(e,t);var r=(0,i.Z)(e);function e(t,u,o){var i,h;(0,c.Z)(this,e);var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},d=arguments.length>4?arguments[4]:void 0,v=arguments.length>5?arguments[5]:void 0,Z=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new f.dD(t,u,d,l);return i=r.call(this,Z,o,v),h=(0,s.Z)(i),(0,p._)((0,s.Z)(i),"abi",void 0),(0,p._)((0,s.Z)(i),"metadata",void 0),(0,p._)((0,s.Z)(i),"app",void 0),(0,p._)((0,s.Z)(i),"roles",void 0),(0,p._)((0,s.Z)(i),"encoder",void 0),(0,p._)((0,s.Z)(i),"estimator",void 0),(0,p._)((0,s.Z)(i),"sales",void 0),(0,p._)((0,s.Z)(i),"platformFees",void 0),(0,p._)((0,s.Z)(i),"events",void 0),(0,p._)((0,s.Z)(i),"claimConditions",void 0),(0,p._)((0,s.Z)(i),"interceptor",void 0),(0,p._)((0,s.Z)(i),"claim",(0,f.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){var e,a=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=!(a.length>1&&void 0!==a[1])||a[1],t.t0=h.claimTo,t.next=4,h.contractWrapper.getSignerAddress();case 4:return t.t1=t.sent,t.t2=r,t.t3=e,t.abrupt("return",t.t0.prepare.call(t.t0,t.t1,t.t2,t.t3));case 8:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,p._)((0,s.Z)(i),"claimTo",(0,f.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){var a,c=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=!(c.length>2&&void 0!==c[2])||c[2],t.abrupt("return",h.erc20.claimTo.prepare(r,e,{checkERC20Allowance:a}));case 2:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,p._)((0,s.Z)(i),"delegateTo",(0,f.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=f.aU,t.t1=i.contractWrapper,t.next=4,(0,f.cN)(r);case 4:return t.t2=t.sent,t.t3=[t.t2],t.t4={contractWrapper:t.t1,method:"delegate",args:t.t3},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t4));case 8:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,p._)((0,s.Z)(i),"burnTokens",(0,f.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.burn.prepare(r));case 1:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,p._)((0,s.Z)(i),"burnFrom",(0,f.dt)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.erc20.burnFrom.prepare(r,e));case 1:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),i.abi=f.e.parse(d||[]),i.metadata=new f.ai(i.contractWrapper,f.dS,i.storage),i.app=new f.aW(i.contractWrapper,i.metadata,i.storage),i.roles=new f.aj(i.contractWrapper,e.contractRoles),i.encoder=new f.ah(i.contractWrapper),i.estimator=new f.aO(i.contractWrapper),i.events=new f.aP(i.contractWrapper),i.sales=new f.al(i.contractWrapper),i.platformFees=new f.aR(i.contractWrapper),i.interceptor=new f.aQ(i.contractWrapper),i.claimConditions=new f.an(i.contractWrapper,i.metadata,i.storage),i}return(0,u.Z)(e,[{key:"getVoteBalance",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,this.contractWrapper.getSignerAddress();case 3:return t.t1=t.sent,t.next=6,t.t0.getVoteBalanceOf.call(t.t0,t.t1);case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getVoteBalanceOf",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this.erc20,t.t1=this.contractWrapper.readContract,t.next=4,(0,f.cN)(r);case 4:return t.t2=t.sent,t.next=7,t.t1.getVotes.call(t.t1,t.t2);case 7:return t.t3=t.sent,t.next=10,t.t0.getValue.call(t.t0,t.t3);case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getDelegation",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,this.contractWrapper.getSignerAddress();case 3:return t.t1=t.sent,t.next=6,t.t0.getDelegationOf.call(t.t0,t.t1);case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getDelegationOf",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this.contractWrapper.readContract,t.next=3,(0,f.cN)(r);case 3:return t.t1=t.sent,t.next=6,t.t0.delegates.call(t.t0,t.t1);case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"isTransferRestricted",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.hasRole((0,f.bs)("transfer"),l.d);case 2:return r=t.sent,t.abrupt("return",!r);case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"prepare",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",f.aU.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:a}));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.contractWrapper.call(r,e,a));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()}]),e}(h.S));(0,p._)(d,"contractRoles",["admin","transfer"])}}]);
//# sourceMappingURL=7400.6b525455.chunk.js.map