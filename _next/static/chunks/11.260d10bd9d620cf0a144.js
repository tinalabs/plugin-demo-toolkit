(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{iLgQ:function(e,n,t){"use strict";t.r(n),t.d(n,"Test",(function(){return p})),t.d(n,"User",(function(){return m})),t.d(n,"TinaConfig",(function(){return b})),t.d(n,"code",(function(){return d})),t.d(n,"default",(function(){return f}));var s=t("CH9N"),a=t("wHK/"),o=t("2In8"),i=t("Alxx"),c=t("ERkP"),r=t.n(c),l=t("7ljp"),u=t("/zyf"),p=(r.a.createElement,function(){var e=Object(u.useCMS)();return console.log({cms:e}),e.api.user.sayHi(),Object(l.b)("div",null,"This is the first page")}),m=function(){function e(n){Object(o.a)(this,e),this.name=n}return Object(i.a)(e,[{key:"sayHi",value:function(){alert("Hello! "+this.name)}}]),e}(),b={enabled:!1,toolbar:!0,sidebar:!0,apis:{user:new m("logan")}},d="",h={Test:p,User:m,TinaConfig:b,code:d};function f(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(s.a)({},h,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h1",null,"The cms Object"),Object(l.b)("p",null,"In many cases you might want to edit or add to the cms object. Since tina is already setup for us this is really easy to to. First lets make a simple api to use as a test then lets add it to this pages tina config. Then we can access the cms object in a in a react component. (In this case its called test). Putting it all together looks like this."),Object(l.b)("pre",null,Object(l.b)("code",Object(s.a)({parentName:"pre"},{className:"language-js"}),"import {useCMS} from 'tinacms'\nexport const Test = ()=>{\n    const cms = useCMS()\n    console.log({cms})\n    cms.api.user.sayHi()\n    return (<div>This is the first page</div>)\n}\n\nexport class User {\n  constructor(name) {\n    this.name = name;\n  }\n  sayHi() {\n    alert('Hello! ' + this.name);\n  }\n}\n\nexport const TinaConfig = {\n    enabled: false,\n    toolbar: true,\n    sidebar: true,\n    apis: {\n        user: new User('logan')\n    }\n}\n")),Object(l.b)("p",null,"Now add the Test compoent somewere in your mdx file and it should work."))}f.isMDXComponent=!0}}]);