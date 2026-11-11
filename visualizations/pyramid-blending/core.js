'use strict';
const $=id=>document.getElementById(id), N=512;
const kernel=Array.from({length:5},(_,i)=>Math.exp(-((i-2)**2)/2));let ks=kernel.reduce((a,b)=>a+b);kernel.forEach((v,i)=>kernel[i]=v/ks);
function img(h,w,c,d){return {h,w,c,d:d||new Float64Array(h*w*c)}}
function reflect(i,n){while(i<0||i>=n)i=i<0?-i-1:2*n-i-1;return i}
function blur(a,gain=1){let t=img(a.h,a.w,a.c),o=img(a.h,a.w,a.c);for(let i=0;i<a.h;i++)for(let j=0;j<a.w;j++)for(let c=0;c<a.c;c++){let s=0;for(let q=-2;q<=2;q++)s+=kernel[q+2]*a.d[(i*a.w+reflect(j+q,a.w))*a.c+c];t.d[(i*a.w+j)*a.c+c]=s}for(let i=0;i<a.h;i++)for(let j=0;j<a.w;j++)for(let c=0;c<a.c;c++){let s=0;for(let q=-2;q<=2;q++)s+=kernel[q+2]*t.d[(reflect(i+q,a.h)*a.w+j)*a.c+c];o.d[(i*a.w+j)*a.c+c]=s*gain}return o}
function reduce(a){let b=blur(a),o=img(Math.ceil(a.h/2),Math.ceil(a.w/2),a.c);for(let i=0;i<o.h;i++)for(let j=0;j<o.w;j++)for(let c=0;c<o.c;c++)o.d[(i*o.w+j)*o.c+c]=b.d[(2*i*a.w+2*j)*a.c+c];return o}
function expand(a,target){let up=img(a.h*2,a.w*2,a.c);for(let i=0;i<a.h;i++)for(let j=0;j<a.w;j++)for(let c=0;c<a.c;c++)up.d[(2*i*up.w+2*j)*a.c+c]=a.d[(i*a.w+j)*a.c+c];let b=blur(up,4),o=img(target.h,target.w,a.c);for(let i=0;i<o.h;i++)o.d.set(b.d.subarray(i*b.w*a.c,(i*b.w+o.w)*a.c),i*o.w*a.c);return o}
function combine(a,b,f){return img(a.h,a.w,a.c,a.d.map((v,i)=>f(v,b.d[i],i)))}
function gaussian(a,n){let g=[a];while(g.length<n)g.push(reduce(g.at(-1)));return g}
function laplacian(g){return g.map((a,k)=>k===g.length-1?a:combine(a,expand(g[k+1],a),(v,w)=>v-w))}
function reconstruct(l){let r=[...l];for(let k=l.length-2;k>=0;k--)r[k]=combine(expand(r[k+1],l[k]),l[k],(a,b)=>a+b);return r}
