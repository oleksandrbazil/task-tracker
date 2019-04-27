(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{282:function(e,t,a){e.exports=a(626)},292:function(e,t,a){},623:function(e,t,a){},626:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(27),c=a.n(s),l=a(33),i=a(24),o=a(258),u=a(45),m="tasks/ADD_TASK",d="tasks/REMOVE_TASK",p="tasks/REMOVE_ALL_TASKS",h="tasks/UPDATE_CURRENT_TASK",f="tasks/FINISH_CURRENT_TASK",b="tasks/RESET_CURRENT_TASK",v="tasks/GENERATE_TASKS",E=function(e){var t=e.name,a=e.start,n=e.end;return{type:h,payload:{start:a,name:t,end:n}}},k=function(e){var t=e.callback,a=(new Date).getTime();return{type:f,payload:{end:a},options:{callback:t}}},y=function(e){var t=e.id;return{type:d,payload:{id:t}}},g=function(){return{type:v,payload:{}}},O={current:{name:"",start:"",end:""},list:[]},j="modal/OPEN_MODAL",x=function(){return{type:"modal/CLOSE_MODAL",payload:{isOpen:!1}}},T={isOpen:!1,title:"",message:""},w=Object(i.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:var a=t.payload,n=a.start,r=void 0===n?e.current.start:n,s=a.name,c=void 0===s?e.current.name:s,l=a.end,i=void 0===l?e.current.end:l;return Object(u.a)({},e,{current:{start:r,name:c,end:i}});case f:return Object(u.a)({},e,{current:Object(u.a)({},e.current,{end:t.payload.end})});case b:return Object(u.a)({},e,{current:O.current});case m:return Object(u.a)({},e,{list:e.list.concat([t.payload.task])});case d:return Object(u.a)({},e,{list:e.list.filter(function(e){return e.id!==t.payload.id})});case p:return Object(u.a)({},e,{list:[]});default:return e}},modal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:return{isOpen:!0,title:t.payload.title,message:t.payload.message};case"modal/CLOSE_MODAL":return T;default:return e}}}),S=a(39),N=a.n(S),C=a(35),M=function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(a){}},D=N.a.mark(H),I=N.a.mark(L),F=N.a.mark(B),_=N.a.mark(K),A=N.a.mark(W),R=function(e){return e.tasks};function H(){var e;return N.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(C.c)(R);case 2:e=t.sent,M({tasks:e});case 4:case"end":return t.stop()}},D)}function L(){var e,t,a,n,r,s,c=arguments;return N.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return e=c.length>0&&void 0!==c[0]?c[0]:{},l.next=3,Object(C.c)(R);case 3:return t=l.sent,a=t.list,n=t.current,l.prev=6,Object.keys(n).forEach(function(e){if(!n[e]){var t;t="You are trying to finish task without ".concat(e,e?", enter the title and try again":". ");var a=new Error(t);throw a.title="Empty task ".concat(e),a}}),n.id=a.length>0?a[a.length-1].id+1:1,l.next=11,Object(C.b)({type:m,payload:{task:n}});case 11:return l.next=13,Object(C.b)({type:b});case 13:r=e.action,"function"===typeof(s=(r=void 0===r?{}:r).callback)&&s(),l.next=23;break;case 19:return l.prev=19,l.t0=l.catch(6),l.next=23,Object(C.b)({type:j,payload:{title:l.t0.title||"Error",message:l.t0.message}});case 23:case"end":return l.stop()}},I,null,[[6,19]])}function B(){var e,t,a,n,r,s,c,l,i,o,u,m,d,f;return N.a.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return l=function(e,t){return Math.floor(Math.random()*(t-e))+e},e=10,t=15,a=10,n=90,r=new Date,s=new Date(r.toLocaleDateString()),c=new Date((new Date).setDate(s.getDate()+1)),b.next=10,Object(C.b)({type:p,payload:{}});case 10:i=l(e,t),o=0;case 12:if(!(o<=i)){b.next=23;break}return u=l(s.getTime(),c.getTime()),m=new Date(u),d="Random task #".concat(o),f=l(m.setMinutes(m.getMinutes()+a),m.setMinutes(m.getMinutes()+n)),b.next=19,Object(C.b)({type:h,payload:{start:u,name:d,end:f}});case 19:return b.delegateYield(L(),"t0",20);case 20:o++,b.next=12;break;case 23:case"end":return b.stop()}},F)}function K(){return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.d)(f,L);case 2:return e.next=4,Object(C.d)(v,B);case 4:return e.next=6,Object(C.e)([h,d,p,b],H);case 6:case"end":return e.stop()}},_)}function W(){return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)([K()]);case 2:case"end":return e.stop()}},A)}var P=Object(o.a)(),U=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return}}(),V=[],J=window.__REDUX_DEVTOOLS_EXTENSION__;"function"===typeof J&&V.push(J());var G=i.d.apply(void 0,[Object(i.a)(P)].concat(V)),X=Object(i.e)(w,U,G);P.run(W);var Y=a(57),z=(a(292),a(61)),$=a(28),q=a(29),Q=a(44),Z=a(42),ee=a(43),te=a(25),ae=a(36),ne=a.n(ae),re=a(152),se=a.n(re),ce=a(87),le=a.n(ce),ie=a(62),oe=a.n(ie),ue=function(){function e(t){var a=t.id,n=t.name,r=t.start,s=void 0===r?new Date:r,c=t.end,l=void 0===c?new Date:c;Object($.a)(this,e),this.id=a,this.name=n,this.startMoment=oe()(s),this.finishMoment=oe()(l)}return Object(q.a)(e,[{key:"spent",value:function(e){return this.finishMoment.diff(this.startMoment,e)}},{key:"timeStart",get:function(){return this.startMoment.format("HH:mm:ss")}},{key:"timeEnd",get:function(){return this.finishMoment.format("HH:mm:ss")}},{key:"timeSpent",get:function(){var e=oe.a.utc(this.finishMoment.diff(this.startMoment));return e.isValid()?e.format("HH:mm:ss"):"00:00:00"}},{key:"startHours",get:function(){return oe()(this.startMoment).hours()}}]),e}(),me={end:""},de=function(e){function t(e){var a;return Object($.a)(this,t),(a=Object(Q.a)(this,Object(Z.a)(t).call(this,e))).state=me,a.timer=null,a}return Object(ee.a)(t,e),Object(q.a)(t,[{key:"componentDidMount",value:function(){this.props.start&&this.setTimer()}},{key:"componentWillUnmount",value:function(){this.unsetTimer()}},{key:"componentWillReceiveProps",value:function(e,t){e.start?this.setTimer():this.unsetTimer()}},{key:"setTimer",value:function(){var e=this;this.timer||(this.timer=setInterval(function(){e.setState({end:(new Date).getTime()})},1e3))}},{key:"unsetTimer",value:function(){clearInterval(this.timer),this.timer=null,this.setState(me)}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.start,n=this.state.end,s=new ue({start:a,end:n});return r.a.createElement("div",{className:t.root},r.a.createElement("div",null,s.timeSpent))}}]),t}(r.a.Component),pe=Object(te.withStyles)(function(e){return{root:{height:"200px",width:"200px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:e.palette.primary[900],margin:20,fontSize:30,boxShadow:"0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"}}})(de),he={name:""},fe=function(e){function t(e){var a;Object($.a)(this,t);var n=(a=Object(Q.a)(this,Object(Z.a)(t).call(this,e))).props.name;return a.state=Object(u.a)({},he,{name:n}),a}return Object(ee.a)(t,e),Object(q.a)(t,[{key:"handleOnSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props,n=a.start,r=a.finishTask,s=a.updateCurrentTask;this.renameTask(),n?r({callback:function(){return t.resetForm()}}):s({start:(new Date).getTime()})}},{key:"resetForm",value:function(){this.setState(he)}},{key:"handleOnChange",value:function(e){this.setState({name:e.target.value})}},{key:"handleOnBlur",value:function(){this.renameTask()}},{key:"renameTask",value:function(){var e=this.state.name;this.props.updateCurrentTask({name:e})}},{key:"render",value:function(){var e=this,t=this.state.name,a=this.props,n=a.start,s=a.classes;return r.a.createElement("div",{className:s.root},r.a.createElement("form",{onSubmit:function(t){return e.handleOnSubmit(t)},className:s.form},r.a.createElement(se.a,null,r.a.createElement(le.a,{type:"text",name:"name",id:"name",value:t,placeholder:"Name of your task",onChange:function(t){return e.handleOnChange(t)},onBlur:function(){return e.handleOnBlur()}})),r.a.createElement(pe,{start:n}),r.a.createElement(ne.a,{type:"submit"},n?"Stop":"Start")))}}]),t}(r.a.Component),be=Object(te.withStyles)(function(e){return{root:{display:"flex",alignItems:"center",justifyContent:"center"},form:{textAlign:"center",margin:20}}})(Object(l.b)(function(e){return{name:e.tasks.current.name,start:e.tasks.current.start}},function(e){return Object(i.b)({finishTask:k,updateCurrentTask:E},e)})(fe)),ve=a(255),Ee=a.n(ve),ke=a(256),ye=a.n(ke),ge=a(160),Oe=a.n(ge),je=a(238),xe=a.n(je),Te=a(240),we=a.n(Te),Se=a(31),Ne=a.n(Se),Ce=a(239),Me=a.n(Ce),De=a(155),Ie=a.n(De),Fe=Object(te.withStyles)(function(e){return{button:{margin:"10px"}}})(Object(l.b)(function(e){return{list:e.tasks.list}},function(e){return Object(i.b)({removeTask:y},e)})(function(e){var t=e.list,a=e.removeTask,n=e.classes;return r.a.createElement("div",null,r.a.createElement(xe.a,null,r.a.createElement(Me.a,null,r.a.createElement(Ie.a,null,r.a.createElement(Ne.a,null,"\u2116"),r.a.createElement(Ne.a,null,"Task"),r.a.createElement(Ne.a,null,"Time start"),r.a.createElement(Ne.a,null,"Time end"),r.a.createElement(Ne.a,null,"Time spend"),r.a.createElement(Ne.a,null,"Info"),r.a.createElement(Ne.a,null,"Delete"))),r.a.createElement(we.a,{className:n.tableBody},t.map(function(e,t){var s=new ue(e),c=s.id,l=s.name,i=s.timeStart,o=s.timeEnd,u=s.timeSpent;return r.a.createElement(Ie.a,{key:"row".concat(t)},r.a.createElement(Ne.a,null,c),r.a.createElement(Ne.a,null,l),r.a.createElement(Ne.a,null,i),r.a.createElement(Ne.a,null,o),r.a.createElement(Ne.a,null,u),r.a.createElement(Ne.a,null,r.a.createElement(ne.a,{component:Y.b,to:"/tasks/".concat(c)},"Info")),r.a.createElement(Ne.a,null,r.a.createElement(ne.a,{className:n.button,onClick:function(){return a({id:c})}},"Delete")))}))))})),_e=a(51),Ae=24,Re=function(){function e(t){var a=t.name;Object($.a)(this,e),this.name=a,this.total=0}return Object(q.a)(e,[{key:"setTotal",value:function(e){this.total=Number(e).toFixed(2)}},{key:"setItem",value:function(e,t){this[e]=Number(t).toFixed(2)}},{key:"getTotal",get:function(){return Number(this.total)}}]),e}(),He=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object($.a)(this,e),this.tasks=t,this.data=[];for(var a=0;a<Ae;a++){var n=oe.a.utc().hours(a).minutes(0).format("HH:mm");this.data.push(new Re({name:n}))}}return Object(q.a)(e,[{key:"getData",get:function(){var e=[].concat(this.data);return this.tasks.forEach(function(t){for(var a=new ue(t),n=a.startHours,r=a.spent("hours"),s=a.spent("minutes"),c=0;c<=r;c++){var l=n+c,i=e[l-=l>=Ae?Ae:0],o=Number(60-i.getTotal);if(o<=0)return;o<=s?(i.setTotal(60),i.setItem(a.name,o),s=Number(s-o)):(i.setTotal(i.getTotal+s),i.setItem(a.name,s))}}),e}},{key:"getSimultaneousData",get:function(){var e=[].concat(this.data);return this.tasks.forEach(function(t){for(var a=new ue(t),n=a.startHours,r=a.spent("hours"),s=a.spent("minutes"),c=!1,l=0;l<=r;l++){var i=n+l,o=e[i-=i>=Ae?Ae:0],u=Number(60-o.getTotal);u<=0||c?(c=!0,s>=60?(o.setItem(a.name,60),s=Number(s-60)):(o.setItem(a.name,s),c=!1)):u<=s?(o.setTotal(60),o.setItem(a.name,u),s=Number(s-u)):(o.setTotal(o.getTotal+s),o.setItem(a.name,s))}}),e}}]),e}(),Le=function(e){function t(){return Object($.a)(this,t),Object(Q.a)(this,Object(Z.a)(t).apply(this,arguments))}return Object(ee.a)(t,e),Object(q.a)(t,[{key:"generateTasks",value:function(){this.props.generateTasks()}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(ne.a,{className:t.button,onClick:function(){return e.generateTasks()}},"GENERATE")}}]),t}(r.a.Component),Be=Object(te.withStyles)(function(e){return{button:{float:"right"}}})(Object(l.b)(null,function(e){return Object(i.b)({generateTasks:g},e)})(Le)),Ke=a(254),We=a.n(Ke),Pe=a(253),Ue=a.n(Pe),Ve=function(e){function t(e){var a;return Object($.a)(this,t),(a=Object(Q.a)(this,Object(Z.a)(t).call(this,e))).state={simultaneous:!1},a}return Object(ee.a)(t,e),Object(q.a)(t,[{key:"render",value:function(){var e=this,t=this.state.simultaneous,a=this.props.tasks,n=new He(a),s=t?n.getSimultaneousData:n.getData;return r.a.createElement("div",{ref:this.rootEl},r.a.createElement(_e.e,{width:"100%",height:600},r.a.createElement(_e.b,{data:s},r.a.createElement(_e.c,{strokeDasharray:"3 3"}),r.a.createElement(_e.g,{dataKey:"name",domain:[0,60]}),r.a.createElement(_e.h,null),r.a.createElement(_e.f,null),r.a.createElement(_e.d,{legendType:"circle"}),a.map(function(e){return r.a.createElement(_e.a,{key:e.id,dataKey:e.name,stackId:t?null:"taskOneByOne",fill:"#"+Math.random().toString(16).substr(-6)})}))),r.a.createElement("div",null,r.a.createElement(Be,null),r.a.createElement(Ue.a,{control:r.a.createElement(We.a,{checked:t,onChange:function(){e.setState({simultaneous:!t})}}),label:"Simultaneous tasks"}),r.a.createElement("div",{style:{maxWidth:"700px"}},r.a.createElement("p",null,"\u0422\u0440\u0435\u043a\u0435\u0440 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u0440\u0435\u0434\u043f\u043e\u0441\u044b\u043b\u043a\u0438 \u0447\u0442\u043e \u0432 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0439 \u043c\u043e\u043c\u0435\u043d\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e 1 \u0437\u0430\u0434\u0430\u0447\u0430. \u041f\u043e \u044d\u0442\u043e\u043c\u0443, \u0432 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u043c \u0433\u0440\u0430\u0444\u0438\u043a\u0435 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u0435\u0435 60 \u043c\u0438\u043d\u0443\u0442 \u0432 1 \u0447\u0430\u0441\u0435."),r.a.createElement("p",null,"\u0412 \u0442\u043e\u0436\u0435 \u0432\u0440\u0435\u043c\u044f, \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440 \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447 \u043d\u0435 \u0443\u0447\u0438\u0442\u044b\u0432\u0430\u0435\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0435 \u043d\u0430\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0437\u0430\u0434\u0430\u0447 \u043c\u0435\u0436\u0434\u0443 \u0441\u043e\u0431\u043e\u0439 \u043f\u0440\u0438 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0438 \u043c\u0430\u0441\u0441\u0438\u0432\u0430. \u042d\u0442\u043e \u043c\u043e\u0436\u0435\u0442 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e \u043f\u0440\u0438 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 2 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u044e\u0442\u044c\u0441\u044f \u043e\u0434\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e."),r.a.createElement("p",null,'\u0412 \u044d\u0442\u043e\u043c \u0441\u043b\u0443\u0447\u0430\u0435 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c "simultaneous" \u043c\u043e\u0434, \u043e\u043d \u043f\u043e\u043c\u043e\u0436\u0435\u0442 \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u043d\u0430\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0437\u0430\u0434\u0430\u0447.'))))}}]),t}(r.a.Component),Je=Object(l.b)(function(e){return{tasks:e.tasks.list}})(Ve),Ge=function(e){function t(){return Object($.a)(this,t),Object(Q.a)(this,Object(Z.a)(t).apply(this,arguments))}return Object(ee.a)(t,e),Object(q.a)(t,[{key:"handleChangeTab",value:function(e,t){this.props.history.push(t)}},{key:"render",value:function(){var e=this,t=this.props.history.location,a="/",n="/#chart",s=t.pathname+t.hash===n?n:a;return r.a.createElement("div",null,r.a.createElement(Ee.a,{position:"static"},r.a.createElement(ye.a,{value:s,onChange:function(t,a){return e.handleChangeTab(t,a)},variant:"fullWidth"},r.a.createElement(Oe.a,{label:"Tasks Log",value:a,fullWidth:!0}),r.a.createElement(Oe.a,{label:"Tasks chart",value:n,fullWidth:!0}))),s===a&&r.a.createElement(Fe,null),s===n&&r.a.createElement(Je,null))}}]),t}(r.a.Component),Xe=Object(z.e)(Ge),Ye=function(){return r.a.createElement("div",null,r.a.createElement(be,null),r.a.createElement(Xe,null))},ze=a(58),$e=a.n(ze),qe=a(79),Qe=a.n(qe),Ze=function(){return r.a.createElement("div",null,r.a.createElement($e.a,{variant:"h4"},"Task not found"))},et=Object(te.withStyles)(function(e){return{container:{},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,display:"block",width:200}}})(Object(l.b)(function(e,t){return{tasks:e.tasks.list}})(function(e){var t=e.classes,a=e.tasks,n=e.match.params.taskId,s=a.find(function(e){return e.id===parseInt(n)});if(!s)return r.a.createElement(Ze,null);var c=new ue(s),l=c.id,i=c.name,o=c.timeEnd,u=c.timeStart,m=c.timeSpent;return r.a.createElement("div",null,r.a.createElement($e.a,{variant:"h4"},"Task Info"),r.a.createElement("form",{className:t.container},r.a.createElement(Qe.a,{id:"id",label:"ID",type:"text",value:l,className:t.textField,disabled:!0}),r.a.createElement(Qe.a,{id:"name",label:"Name",type:"text",value:i,className:t.textField}),r.a.createElement(Qe.a,{id:"start",label:"TimeStart",type:"text",value:u,className:t.textField,InputLabelProps:{shrink:!0}}),r.a.createElement(Qe.a,{id:"end",label:"TimeEnd",type:"text",value:o,className:t.textField,InputLabelProps:{shrink:!0}}),r.a.createElement(Qe.a,{id:"spent",label:"TimeSpent",type:"text",value:m,className:t.textField})))})),tt=function(e){var t=e.match;return r.a.createElement("div",null,r.a.createElement(ne.a,{component:Y.b,to:"/",color:"secondary"},"Homepage"),r.a.createElement(z.c,null,r.a.createElement(z.a,{exact:!0,path:"".concat(t.url,"/:taskId"),component:et}),r.a.createElement(z.a,{component:Ze})))},at=function(){return r.a.createElement("div",null,r.a.createElement(z.c,null,r.a.createElement(z.a,{path:"/",exact:!0,component:Ye}),r.a.createElement(z.a,{path:"/tasks",component:tt}),r.a.createElement(z.a,{render:function(){return r.a.createElement("div",null,"Page Not Found")}})))},nt=a(161),rt=a.n(nt),st=a(257),ct=a.n(st),lt=a(63),it=a.n(lt),ot=Object(te.createMuiTheme)({palette:{primary:it.a},overrides:{MuiInput:{underline:{color:it.a[900]}},MuiButton:{text:{backgroundColor:"#FFFFFF",borderRadius:5,boxShadow:"0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",color:it.a[900],"&:hover":{backgroundColor:it.a[900],color:"#FFFFFF"}}},MuiAppBar:{root:{backgroundColor:ct.a[600]}},MuiTableHead:{root:{backgroundColor:"#fdfdfd"}},MuiTableBody:{root:{backgroundColor:"#eaf6ff"}},MuiTableCell:{root:{color:it.a[900]}}},typography:{useNextVariants:!0}}),ut=a(154),mt=a.n(ut),dt=Object(te.withStyles)(function(e){return{modal:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:50*e.spacing.unit,backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],padding:4*e.spacing.unit,outline:"none"},closeButton:{float:"right"}}})(Object(l.b)(function(e){return{isOpen:e.modal.isOpen,title:e.modal.title,message:e.modal.message}},function(e){return Object(i.b)({closeModal:x},e)})(function(e){var t=e.classes,a=e.isOpen,n=e.title,s=e.message,c=e.closeModal;return r.a.createElement("div",null,r.a.createElement(mt.a,{open:a,onClose:function(){return c()}},r.a.createElement("div",{className:t.modal},r.a.createElement($e.a,{variant:"h6",id:"modal-title",color:"secondary"},n),r.a.createElement($e.a,{variant:"subtitle1"},s),r.a.createElement(ne.a,{className:t.closeButton,onClick:function(){return c()}},"Close"))))}));a(623);var pt=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(te.MuiThemeProvider,{theme:ot},r.a.createElement(rt.a,{container:!0,justify:"center"},r.a.createElement(rt.a,{item:!0,xs:10},r.a.createElement(dt,null),r.a.createElement(at,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(l.a,{store:X},r.a.createElement(Y.a,{basename:"/task-tracker"},r.a.createElement(pt,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[282,1,2]]]);
//# sourceMappingURL=main.5fb6c08b.chunk.js.map