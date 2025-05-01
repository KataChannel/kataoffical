addEventListener("message",({data:e})=>{try{postMessage({status:"success",data:e})}catch(s){console.log(s),postMessage({status:"error",message:s.message})}});
