"use strict";(self.webpackChunkwebsite2_0=self.webpackChunkwebsite2_0||[]).push([[5856],{33581:function(r,t,e){e.d(t,{S:function(){return o}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(95360),i=e(60067),o=function(){function r(t,e,u){var o=this;(0,c.Z)(this,r),(0,s._)(this,"contractWrapper",void 0),(0,s._)(this,"storage",void 0),(0,s._)(this,"erc20",void 0),(0,s._)(this,"_chainId",void 0),(0,s._)(this,"transfer",(0,i.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.transfer.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,s._)(this,"transferFrom",(0,i.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e,a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.transferFrom.prepare(t,e,a));case 1:case"end":return r.stop()}}),r)})));return function(t,e,n){return r.apply(this,arguments)}}())),(0,s._)(this,"setAllowance",(0,i.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.setAllowance.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,s._)(this,"transferBatch",(0,i.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.transferBatch.prepare(t));case 1:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),this.contractWrapper=t,this.storage=e,this.erc20=new i.ap(this.contractWrapper,this.storage,u),this._chainId=u}return(0,u.Z)(r,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(r){this.contractWrapper.updateSignerOrProvider(r)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"get",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc20.get());case 1:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"balance",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.erc20.balance();case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"balanceOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc20.balanceOf(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"totalSupply",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.erc20.totalSupply();case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"allowance",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.erc20.allowance(t);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"allowanceOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.erc20.allowanceOf(t,e);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r,this)})));return function(t,e){return r.apply(this,arguments)}}()}]),r}()},35856:function(r,t,e){e.r(t),e.d(t,{Token:function(){return Z}});var n=e(74165),a=e(15861),c=e(15671),u=e(43144),s=e(97326),i=e(60136),o=e(29388),p=e(95360),f=e(60067),h=e(68624),l=e(2257),v=function(){function r(t,e){(0,c.Z)(this,r),(0,p._)(this,"events",void 0),(0,p._)(this,"contractWrapper",void 0),this.contractWrapper=t,this.events=e}return(0,u.Z)(r,[{key:"getAllHolderBalances",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t,e,c,u=this;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.events.getEvents("Transfer");case 2:return t=r.sent,e=t.map((function(r){return r.data})),c={},e.forEach((function(r){var t=null===r||void 0===r?void 0:r.from,e=null===r||void 0===r?void 0:r.to,n=null===r||void 0===r?void 0:r.value;t!==h.d&&(t in c||(c[t]=l.O$.from(0)),c[t]=c[t].sub(n)),e!==h.d&&(e in c||(c[e]=l.O$.from(0)),c[e]=c[e].add(n))})),r.abrupt("return",Promise.all(Object.keys(c).map(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=t,r.next=3,(0,f.c0)(u.contractWrapper.getProvider(),u.contractWrapper.readContract.address,c[t]);case 3:return r.t1=r.sent,r.abrupt("return",{holder:r.t0,balance:r.t1});case 5:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())));case 7:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()}]),r}(),d=e(33581),Z=(e(80518),e(84255),e(98528),e(49675),e(20737),e(78262),e(66315),function(r){(0,i.Z)(e,r);var t=(0,o.Z)(e);function e(r,u,i){var o;(0,c.Z)(this,e);var h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=arguments.length>4?arguments[4]:void 0,d=arguments.length>5?arguments[5]:void 0,Z=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new f.dD(r,u,l,h);return o=t.call(this,Z,i,d),(0,p._)((0,s.Z)(o),"abi",void 0),(0,p._)((0,s.Z)(o),"metadata",void 0),(0,p._)((0,s.Z)(o),"app",void 0),(0,p._)((0,s.Z)(o),"roles",void 0),(0,p._)((0,s.Z)(o),"encoder",void 0),(0,p._)((0,s.Z)(o),"estimator",void 0),(0,p._)((0,s.Z)(o),"history",void 0),(0,p._)((0,s.Z)(o),"events",void 0),(0,p._)((0,s.Z)(o),"platformFees",void 0),(0,p._)((0,s.Z)(o),"sales",void 0),(0,p._)((0,s.Z)(o),"signature",void 0),(0,p._)((0,s.Z)(o),"interceptor",void 0),(0,p._)((0,s.Z)(o),"mint",(0,f.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.mint.prepare(t));case 1:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),(0,p._)((0,s.Z)(o),"mintTo",(0,f.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.mintTo.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),(0,p._)((0,s.Z)(o),"mintBatchTo",(0,f.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.mintBatchTo.prepare(t));case 1:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),(0,p._)((0,s.Z)(o),"delegateTo",(0,f.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=f.aU,r.t1=o.contractWrapper,r.next=4,(0,f.cN)(t);case 4:return r.t2=r.sent,r.t3=[r.t2],r.t4={contractWrapper:r.t1,method:"delegate",args:r.t3},r.abrupt("return",r.t0.fromContractWrapper.call(r.t0,r.t4));case 8:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())),(0,p._)((0,s.Z)(o),"burn",(0,f.dt)((function(r){return o.erc20.burn.prepare(r)}))),(0,p._)((0,s.Z)(o),"burnFrom",(0,f.dt)(function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",o.erc20.burnFrom.prepare(t,e));case 1:case"end":return r.stop()}}),r)})));return function(t,e){return r.apply(this,arguments)}}())),o.abi=f.e.parse(l||[]),o.metadata=new f.ai(o.contractWrapper,f.dT,o.storage),o.app=new f.aW(o.contractWrapper,o.metadata,o.storage),o.roles=new f.aj(o.contractWrapper,e.contractRoles),o.sales=new f.al(o.contractWrapper),o.events=new f.aP(o.contractWrapper),o.history=new v(o.contractWrapper,o.events),o.encoder=new f.ah(o.contractWrapper),o.estimator=new f.aO(o.contractWrapper),o.platformFees=new f.aR(o.contractWrapper),o.interceptor=new f.aQ(o.contractWrapper),o.signature=new f.as(o.contractWrapper,o.roles),o}return(0,u.Z)(e,[{key:"getVoteBalance",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=this,r.next=3,this.contractWrapper.getSignerAddress();case 3:return r.t1=r.sent,r.next=6,r.t0.getVoteBalanceOf.call(r.t0,r.t1);case 6:return r.abrupt("return",r.sent);case 7:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"getVoteBalanceOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=this.erc20,r.next=3,this.contractWrapper.readContract.getVotes(t);case 3:return r.t1=r.sent,r.next=6,r.t0.getValue.call(r.t0,r.t1);case 6:return r.abrupt("return",r.sent);case 7:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"getDelegation",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=this,r.next=3,this.contractWrapper.getSignerAddress();case 3:return r.t1=r.sent,r.next=6,r.t0.getDelegationOf.call(r.t0,r.t1);case 6:return r.abrupt("return",r.sent);case 7:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"getDelegationOf",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=this.contractWrapper.readContract,r.next=3,(0,f.cN)(t);case 3:return r.t1=r.sent,r.next=6,r.t0.delegates.call(r.t0,r.t1);case 6:return r.abrupt("return",r.sent);case 7:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"isTransferRestricted",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.contractWrapper.readContract.hasRole((0,f.bs)("transfer"),h.d);case 2:return t=r.sent,r.abrupt("return",!t);case 4:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"getMintTransaction",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc20.getMintTransaction(t,e));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e){return r.apply(this,arguments)}}()},{key:"prepare",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e,a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",f.aU.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:e,overrides:a}));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e,n){return r.apply(this,arguments)}}()},{key:"call",value:function(){var r=(0,a.Z)((0,n.Z)().mark((function r(t,e,a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.contractWrapper.call(t,e,a));case 1:case"end":return r.stop()}}),r,this)})));return function(t,e,n){return r.apply(this,arguments)}}()}]),e}(d.S));(0,p._)(Z,"contractRoles",["admin","minter","transfer"])}}]);
//# sourceMappingURL=5856.3eddc5cf.chunk.js.map