function loadSmileScript(e,t){var i=document,a=i.createElement("script");a.async=!1,a.defer=!0,a.src="https://js.smile.io/v1/"+e,t?a.type="module":a.setAttribute("nomodule",""),i.querySelector("head").appendChild(a)}"noModule"in document.createElement("script")||loadSmileScript("runtime-7308756793caaf8cd4d2.legacy.js",!1),function(){var e=document.querySelector(".smile-shopify-init");if("fetch"in window&&e){var{channelKey:t,digest:i,customerAcceptsMarketing:a,customerEmail:n,customerFirstName:s,customerId:o,customerLastName:r,customerOrdersCount:c,customerTags:m,customerTotalSpent:l}=e.dataset,d=function(){var e="smile_ncet",t=new URLSearchParams(window.location.search).has("smile_no_cache"),i=(new Date).getTime();try{t&&sessionStorage.setItem(e,(i+9e5).toString());var a=sessionStorage.getItem(e);a&&((t=Number.parseInt(a)>i)||sessionStorage.removeItem(e))}catch(e){}return t}(),p={Accept:"application/json","Smile-Channel-Key":t,"Smile-Client":"smile-ui","Content-Type":"application/json"},u=new URL("https://platform.smile.io/v1/smile_ui/init");u.searchParams.append("channel_key",t),d&&u.searchParams.append("no_cache",d),window.__smile_ui_init_data__=fetch(u.toString(),{headers:p}).then((function(e){return e.json()})),i&&(window.__smile_ui_customer_data__=fetch("https://platform.smile.io/v1/shopify/identify_customer",{method:"POST",headers:p,body:JSON.stringify({customer:{accepts_marketing:a,email:n,first_name:s,id:o,last_name:r,orders_count:c,tags:m,total_spent:l},digest:i})}).then((function(e){return e.json()})))}}(),window.addEventListener("smile:load-async-script",(function(e){loadSmileScript(e.detail,!0)})),"noModule"in document.createElement("script")?loadSmileScript("smile-lite-629626a04d.js",!0):(loadSmileScript("smile-shopify-4bd7096ecab275de81fe.modern.js",!0),loadSmileScript("vendor-734245a894cb7bb28df8.modern.js",!0),loadSmileScript("smile-shopify-88bbae0ea138b5af2bf8.legacy.js",!1),loadSmileScript("vendor-31673b91711f60f84190.legacy.js",!1));