import{r}from"./index.yGrMsBkE.js";/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(t,s)=>{const a=r.forwardRef(({color:c="currentColor",size:o=24,strokeWidth:e=2,absoluteStrokeWidth:n,className:l="",children:m,...i},d)=>r.createElement("svg",{ref:d,...f,width:o,height:o,stroke:c,strokeWidth:n?Number(e)*24/Number(o):e,className:["lucide",`lucide-${p(t)}`,l].join(" "),...i},[...s.map(([h,g])=>r.createElement(h,g)),...Array.isArray(m)?m:[m]]));return a.displayName=`${t}`,a};function k(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function u(t){document.documentElement.classList.toggle("dark",t==="dark")}function C(){const[t,s]=r.useState("light"),[a,c]=r.useState(!1);r.useEffect(()=>{const e=localStorage.getItem("theme"),n=e==="light"||e==="dark"?e:k();s(n),u(n),c(!0)},[]);const o=r.useCallback(e=>{s(e),localStorage.setItem("theme",e),u(e)},[]);return{theme:t,resolvedTheme:t,setTheme:o,mounted:a}}export{b as c,C as u};
