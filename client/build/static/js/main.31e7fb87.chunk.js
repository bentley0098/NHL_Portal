(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{152:function(e,t,n){},416:function(e,t,n){},419:function(e,t,n){},421:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(42),s=n.n(r),o=(n(152),n(47)),i=n(21),l=(n(83),n(4));var u=Object(i.f)((function(e){var t=sessionStorage.getItem("token"),n=JSON.parse(t).username;return Object(l.jsx)("div",{className:"navigation",children:Object(l.jsx)("nav",{class:"navbar navbar-expand navbar-dark grid-bg-colour",children:Object(l.jsxs)("div",{class:"container",children:[Object(l.jsxs)(o.b,{class:"navbar-brand",to:"/",children:[n,"'s WMS Portal"]}),Object(l.jsx)("div",{children:Object(l.jsxs)("ul",{class:"navbar-nav ml-auto",children:[Object(l.jsx)("li",{class:"nav-item  ".concat("/"===e.location.pathname?"active":""),children:Object(l.jsxs)(o.b,{class:"nav-link",to:"/",children:["Stock",Object(l.jsx)("span",{class:"sr-only",children:"(current)"})]})}),Object(l.jsx)("li",{children:Object(l.jsx)("div",{className:"spacer"})}),Object(l.jsx)("li",{class:"nav-item  ".concat("/Login"===e.location.pathname?"active":""),children:Object(l.jsx)(o.b,{class:"nav-link",to:"/",onClick:function(){sessionStorage.removeItem("token"),window.location.reload(!1)},children:"Sign Out"})})]})})]})})})}));var j=function(){return Object(l.jsx)("footer",{class:"grid-bg-colour fixed-bottom",style:{paddingTop:10},children:Object(l.jsx)("div",{class:"container",children:Object(l.jsx)("p",{class:"m-0 text-center text-white",children:"Copyright \xa9 HQ Software 2021, v0.02"})})})},d=n(36),b=n(81),h=n.n(b);n(413),n(414),n(415);n(416);var O=n(35);var p=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)([]),s=Object(d.a)(r,2),o=s[0],i=s[1],u=Object(a.useState)(""),j=Object(d.a)(u,2),b=j[0],p=j[1];Object(a.useEffect)((function(){c(function(e){var t=0;return{data:function(e){var n=e;return""===n&&(n="EMPTY_SEARCH_STRING"),fetch("/returnStock/"+n).then((function(e){return e.json().then((function(e){return t=e.length,{data:e,count:e.length}}))}))}(e),count:t}}(b).data)}),[b]);var x={height:"83vh",margin:10},f=Object(a.useCallback)((function(e){var t=e.selected;i(function(e){return fetch("/returnLocations/"+e).then((function(e){return e.json()}))}(t))}),[]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{className:"stock-container",children:[Object(l.jsx)("div",{className:"filter",children:Object(l.jsx)(O.a.Control,{className:"text-input",size:"sm",type:"text",placeholder:"Search...",value:b,onChange:function(e){return p(e.target.value)}})}),Object(l.jsxs)("div",{className:"grid-container",children:[Object(l.jsx)("div",{className:"stock-grid",children:Object(l.jsx)(h.a,{idProperty:"Product",columns:[{name:"Product",header:"Product",type:"string",defaultFlex:0},{name:"Description",header:"Description",type:"string",defaultFlex:1},{name:"Quantity",header:"Total",type:"number",defaultFlex:0}],dataSource:n,style:x,theme:"default-dark",enableSelection:!0,onSelectionChange:f})}),Object(l.jsx)("div",{className:"location-grid",children:Object(l.jsx)(h.a,{idProperty:"Location",columns:[{name:"Location",header:"Location",type:"string",defaultFlex:1},{name:"BatchID",header:"Batch",type:"string",defaultFlex:1},{name:"Expiry",header:"Expiry",type:"string",defaultFlex:1},{name:"Qty",header:"Quantity",type:"number",defaultFlex:1}],dataSource:o,style:x})})]})]})})};var x=n(54),f=n.n(x),v=n(82),m=(n(419),n.p+"static/media/HQicon.9e6c548a.ico"),g=n(147);n(420);function y(e){return S.apply(this,arguments)}function S(){return(S=Object(v.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){var t=e.setToken,n=Object(a.useState)(""),c=Object(d.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(""),i=Object(d.a)(o,2),u=i[0],b=i[1],h=function(){var e=Object(v.a)(f.a.mark((function e(n){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,y({username:r,password:u});case 3:"q>)*8n[TfhTyZAW"!==(a=e.sent).token?(alert("Invalid Username/Password"),s(""),b("")):t(a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"login-logo",children:Object(l.jsx)("img",{src:m,alt:"logo"})}),Object(l.jsxs)("div",{className:"login-wrapper",children:[Object(l.jsx)("h2",{children:"HQ Business - Log In"}),Object(l.jsxs)(O.a,{children:[Object(l.jsxs)(O.a.Group,{className:"mb-3",controlId:"emailInput",children:[Object(l.jsx)(O.a.Label,{children:"User:"}),Object(l.jsx)(O.a.Control,{type:"email",placeholder:"Enter username",onChange:function(e){return s(e.target.value)}})]}),Object(l.jsxs)(O.a.Group,{className:"mb-3",controlId:"passwordInput",children:[Object(l.jsx)(O.a.Label,{children:"Password:"}),Object(l.jsx)(O.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return b(e.target.value)}})]}),Object(l.jsx)(g.a,{variant:"secondary",type:"submit",onClick:h,className:"button-to-the-right",children:"Submit"})]})]}),Object(l.jsx)(j,{})]})}var N=function(){var e=function(){var e=Object(a.useState)(function(){var e=sessionStorage.getItem("token"),t=JSON.parse(e);return null===t||void 0===t?void 0:t.token}()),t=Object(d.a)(e,2),n=t[0],c=t[1];return{setToken:function(e){sessionStorage.setItem("token",JSON.stringify(e)),c(e.token)},token:n}}(),t=e.token,n=e.setToken;return t&&"q>)*8n[TfhTyZAW"!==t&&(alert("Invalid Log-in Token"),localStorage.removeItem("token")),t?Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)(o.a,{children:[Object(l.jsx)(u,{}),Object(l.jsx)(i.c,{children:Object(l.jsx)(i.a,{path:"/",exact:!0,component:function(){return Object(l.jsx)(p,{})}})}),Object(l.jsx)(j,{})]})}):Object(l.jsx)(k,{setToken:n})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,422)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(N,{})}),document.getElementById("root")),w()},83:function(e,t,n){}},[[421,1,2]]]);
//# sourceMappingURL=main.31e7fb87.chunk.js.map