import{W as e,h as t,t as n,c as r,a as o,r as s}from"./vendor.cb1dc21e.js";var a=Object.defineProperty,i=Object.getOwnPropertyDescriptor;let l=class extends e{constructor(){super(...arguments),this.onClick=e=>{this.fire("Abc",{name:"omi",age:5}),e.stopPropagation()}}render(){return t("div",{onClick:this.onClick},t("div",null,"\tHello ",this.props.msg," Click Me!"))}};l.css="div {\n        color: red;\n        cursor: pointer;\n    }",l=((e,t,n,r)=>{for(var o,s=r>1?void 0:r?i(t,n):t,l=e.length-1;l>=0;l--)(o=e[l])&&(s=(r?o(t,n,s):o(s))||s);return r&&s&&a(t,n,s),s})([n("hello-omi")],l);var p=Object.defineProperty,c=Object.getOwnPropertyDescriptor;const d=r({target:new CSSStyleSheet}),{tw:g}=o({sheet:d});let h=class extends e{render(){return t("div",{class:g`container bg-gray-50`},t("img",{class:g`w-8`,src:"./assets/logo.a690a1ac.svg",alt:"logo"}),t("h1",{class:"app-title"},"OMI ADMIN"),t("button",{class:g`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`},"twind button"))}};h.css=d.target,h=((e,t,n,r)=>{for(var o,s=r>1?void 0:r?c(t,n):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,n,s):o(s))||s);return r&&s&&p(t,n,s),s})([n("admin-header")],h);var b=Object.defineProperty,u=Object.getOwnPropertyDescriptor;let m=class extends e{constructor(){super(...arguments),this.onAbc=e=>{this.abc=` by ${e.detail.name}`,this.update()}}render(e){return t("div",{class:"app"},t("admin-header",null),this.abc,t("hello-omi",{onAbc:this.onAbc,msg:"Omi"}),t("o-button",null,"button"))}};m.css=".app {\n  text-align: center;\n}\n.app-logo {\n  animation: app-logo-spin infinite 20s linear;\n  height: 80px;\n}\n.app-header {\n  background-color: #222;\n  height: 150px;\n  padding: 20px;\n  color: white;\n}\n.app-title {\n  font-size: 1.5em;\n}\n.app-logo {\n  cursor: pointer;\n}\n@keyframes app-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n",m=((e,t,n,r)=>{for(var o,s=r>1?void 0:r?u(t,n):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,n,s):o(s))||s);return r&&s&&b(t,n,s),s})([n("my-app")],m),s(t("my-app",{name:"Omi"}),"#root");