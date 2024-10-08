import{c as s,t as p,K as d,S as y,L as w,J as h,B as m,M as f}from"./index-CKlgDJWv.js";import{l as k}from"./index-CCCONDI3.js";const T=new TextEncoder,v=new TextDecoder,u="AES-GCM";async function l(t){return await crypto.subtle.importKey("raw",t.buffer,u,!0,["encrypt","decrypt"])}async function S({data:t,secretEncryptionKey:e}){const n=globalThis.crypto.getRandomValues(new Uint8Array(12)),r=await crypto.subtle.encrypt({name:u,iv:n},await l(a(e)),a(t));return{encryptedData:new Uint8Array(r),publicInitVector:n}}async function g({encryptedData:t,secretEncryptionKey:e,publicInitVector:n}){const r=await crypto.subtle.decrypt({name:u,iv:a(n)},await l(a(e)),a(t));return v.decode(r)}function a(t){return s.isString(t)?T.encode(t):t}const c=k.createInstance({description:"Store for review-vir auth tokens.",name:"review-vir-auth-tokens",storeName:"review-vir-auth-tokens"});async function b(t,e){const n=await g({secretEncryptionKey:t,encryptedData:e.data,publicInitVector:e.publicInitVector}),r=JSON.parse(n);return m(r,f)?r:void 0}async function A({secretEncryptionKey:t}){try{return p((await Promise.all(d(y).map(async e=>{const n=w.devAuthTokens[e],r=await c.getItem(e)||void 0;if(!r)return n?.length?[e,n]:void 0;const o=(await Promise.all(r.map(async i=>await b(t,i)))).filter(s.isTruthy);return[e,o]}))).filter(s.isTruthy))}catch{return console.error("Failed to load auth tokens. Wiping store."),await c.clear(),{}}}async function V({secretEncryptionKey:t,authToken:e}){const{encryptedData:n,publicInitVector:r}=await S({data:JSON.stringify(e),secretEncryptionKey:t});return{data:n,publicInitVector:r}}async function I({secretEncryptionKey:t,authTokensByService:e}){if(!t)throw new Error("Missing encryption key.");await Promise.all(d(y).map(async n=>{const r=e[n];if(r){const o=await Promise.all(r.map(async i=>await V({secretEncryptionKey:t,authToken:i})));await c.setItem(n,o)}else await c.removeItem(n)}))}const E=h({saveServiceAuthTokens:I,loadServiceAuthTokens:A});export{E as authStoreClient,A as loadServiceAuthTokens,c as reviewVirAuthTokensStore,I as saveServiceAuthTokens};
