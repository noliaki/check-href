!function(e){"use strict";var t,n=e,l=n.document,i=0,o=l.getElementsByTagName("body")[0],r="__rntHrefChecker-modalBg",a=l.getElementById(r),d="__rntHrefChecker-imgContainer",c=l.getElementById(d),s=0,m=l.createElement("div"),p=l.createElement("p"),g=l.createElement("img"),h=l.createElement("span"),y=/^(#|＃).*/,f=function(){e.removeEventListener("resize",u,!1),e.addEventListener("resize",u,!1),a||c?(o.removeChild(a),o.removeChild(c),s=0):(t=l.getElementsByTagName("a"),i=t.length,C())},u=function(){(a||c)&&(o.removeChild(a),o.removeChild(c),s=0),t=l.getElementsByTagName("a"),i=t.length,setImgChecker()},C=function(){var e=l.createDocumentFragment(),t=-1;for(a=m.cloneNode(),a.setAttribute("id",r),c=m.cloneNode(),c.setAttribute("id",d),o.appendChild(a),o.appendChild(c);++t<i;)e.appendChild(N(t));c.appendChild(e)},N=function(n){var i,o=l.createDocumentFragment(),r=m.cloneNode(),a=(m.cloneNode(),h.cloneNode(),g.cloneNode(),m.cloneNode(),p.cloneNode(),t[n].style.display),d=t[n].getAttribute("href");return("block"!==a||"inline-block"!==a)&&(t[n].style.display="inline-block"),i=t[n].getBoundingClientRect(),console.log(y.test(d)),r.className=y.test(d)||""===d?"anchor-container notice":"anchor-container",r.style.position="absolute",r.style.width=i.width+"px",r.style.height=i.height+"px",r.style.display="inline-block",r.style.top=i.top+e.pageYOffset+"px",r.style.left=i.left+e.pageXOffset+"px",r.innerHTML=t[n].innerHTML,t[n].style.display=a,r.appendChild(o),r};f()}(window);