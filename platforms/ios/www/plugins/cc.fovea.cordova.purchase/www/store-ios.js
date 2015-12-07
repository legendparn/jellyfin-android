cordova.define("cc.fovea.cordova.purchase.InAppPurchase",function(e,t,r){var o={};o.verbosity=0,function(){"use strict";o.FREE_SUBSCRIPTION="free subscription",o.PAID_SUBSCRIPTION="paid subscription",o.CONSUMABLE="consumable",o.NON_CONSUMABLE="non consumable";var e=6777e3;o.ERR_SETUP=e+1,o.ERR_LOAD=e+2,o.ERR_PURCHASE=e+3,o.ERR_LOAD_RECEIPTS=e+4,o.ERR_CLIENT_INVALID=e+5,o.ERR_PAYMENT_CANCELLED=e+6,o.ERR_PAYMENT_INVALID=e+7,o.ERR_PAYMENT_NOT_ALLOWED=e+8,o.ERR_UNKNOWN=e+10,o.ERR_REFRESH_RECEIPTS=e+11,o.ERR_INVALID_PRODUCT_ID=e+12,o.ERR_FINISH=e+13,o.ERR_COMMUNICATION=e+14,o.ERR_SUBSCRIPTIONS_NOT_AVAILABLE=e+15,o.ERR_MISSING_TOKEN=e+16,o.ERR_VERIFICATION_FAILED=e+17,o.ERR_BAD_RESPONSE=e+18,o.ERR_REFRESH=e+19,o.ERR_PAYMENT_EXPIRED=e+20,o.ERR_DOWNLOAD=e+21,o.REGISTERED="registered",o.INVALID="invalid",o.VALID="valid",o.REQUESTED="requested",o.INITIATED="initiated",o.APPROVED="approved",o.FINISHED="finished",o.OWNED="owned",o.DOWNLOADING="downloading",o.DOWNLOADED="downloaded",o.QUIET=0,o.ERROR=1,o.WARNING=2,o.INFO=3,o.DEBUG=4,o.INVALID_PAYLOAD=6778001,o.CONNECTION_FAILED=6778002,o.PURCHASE_EXPIRED=6778003}(),function(){"use strict";function e(e,t,r){setTimeout(function(){t.call(e)},r||1)}var t=e;o.Product=function(e){e||(e={}),this.id=e.id||null,this.alias=e.alias||e.id||null;var t=this.type=e.type||null;if(t!==o.CONSUMABLE&&t!==o.NON_CONSUMABLE&&t!==o.PAID_SUBSCRIPTION&&t!==o.FREE_SUBSCRIPTION)throw new TypeError("Invalid product type");this.state=e.state||"",this.title=e.title||e.localizedTitle||null,this.description=e.description||e.localizedDescription||null,this.price=e.price||null,this.currency=e.currency||null,this.loaded=e.loaded,this.valid=e.valid,this.canPurchase=e.canPurchase,this.owned=e.owned,this.downloading=e.downloading,this.downloaded=e.downloaded,this.transaction=null,this.stateChanged()},o.Product.prototype.finish=function(){o.log.debug("product -> defer finishing "+this.id),e(this,function(){o.log.debug("product -> finishing "+this.id),this.state!==o.FINISHED&&this.set("state",o.FINISHED)})},o.Product.prototype.verify=function(){var r=this,i=0,n=function(){},s=n,a=n,c=n,d=n,u=function(){r.state===o.APPROVED&&o._validator(r,function(e,n){if(o.log.debug("verify -> "+JSON.stringify(e)),e)o.log.debug("verify -> success: "+JSON.stringify(n)),o.utils.callExternal("verify.success",a,r,n),o.utils.callExternal("verify.done",s,r),r.trigger("verified");else{o.log.debug("verify -> error: "+JSON.stringify(n));var l=n&&n.error&&n.error.message?n.error.message:"",p=new o.Error({code:o.ERR_VERIFICATION_FAILED,message:"Transaction verification failed: "+l});n.code===o.PURCHASE_EXPIRED&&(p=new o.Error({code:o.ERR_PAYMENT_EXPIRED,message:"Transaction expired: "+l})),n.code===o.PURCHASE_EXPIRED?2>i&&o._refreshForValidation?(i+=1,o._refreshForValidation(function(){t(r,u,300)})):(o.error(p),o.utils.callExternal("verify.error",d,p),o.utils.callExternal("verify.done",s,r),r.trigger("expired"),r.set("state",o.VALID),o.utils.callExternal("verify.expired",c,r)):4>i?(i+=1,t(this,u,1e3*i*i)):(o.log.debug("validation failed 5 times, stop retrying, trigger an error"),o.error(p),o.utils.callExternal("verify.error",d,p),o.utils.callExternal("verify.done",s,r),r.trigger("unverified"))}})};e(this,function(){if(r.state!==o.APPROVED){var e=new o.Error({code:o.ERR_VERIFICATION_FAILED,message:"Product isn't in the APPROVED state"});return o.error(e),o.utils.callExternal("verify.error",d,e),void o.utils.callExternal("verify.done",s,r)}}),t(this,u,1e3);var l={done:function(e){return s=e,this},expired:function(e){return c=e,this},success:function(e){return a=e,this},error:function(e){return d=e,this}};return l}}(),function(){"use strict";o.Error=function(e){e||(e={}),this.code=e.code||o.ERR_UNKNOWN,this.message=e.message||"unknown error"},o.error=function(e,t){var r=e;return e instanceof o.Error?o.error.callbacks.trigger(e):e.code&&e.message?o.error.callbacks.trigger(new o.Error(e)):"function"==typeof e?o.error.callbacks.push(e):"function"==typeof t&&(r=function(r){r.code===e&&t()},o.error(r)),r},o.error.unregister=function(e){o.error.callbacks.unregister(e)}}(),function(){"use strict";function e(e){for(var r=0;r<e.length;++r){e[r].state=o.REGISTERED;var i=new o.Product(e[r]);i.alias||(i.alias=i.id),i.id===o._queries.uniqueQuery(i.id)&&i.alias===o._queries.uniqueQuery(i.alias)&&(t(i.id)||t(i.alias)||o.products.push(i))}}function t(e){if(!e)return!1;for(var t=e.split(" "),o=0;o<t.length;++o)for(var i=t[o],n=0;n<r.length;++n)if(i===r[n])return!0;return!1}o.register=function(t){t&&(t.length?e(t):o.register([t]))};var r=["product","order",o.REGISTERED,o.VALID,o.INVALID,o.REQUESTED,o.INITIATED,o.APPROVED,o.OWNED,o.FINISHED,o.DOWNLOADING,o.DOWNLOADED,"refreshed"]}(),function(){"use strict";o.get=function(e){var t=o.products.byId[e]||o.products.byAlias[e];return t}}(),function(){"use strict";o.when=function(e,t,r){if("undefined"==typeof e&&(e=""),"object"==typeof e&&e instanceof o.Product&&(e=e.id),"function"==typeof t)return o.when("",e,t);if("string"!=typeof t){var i={},n=function(r){i[r]=function(i){return o._queries.callbacks.add(e,r,i,t),this}};return n("loaded"),n("updated"),n("error"),n("approved"),n("owned"),n("cancelled"),n("refunded"),n("registered"),n("valid"),n("invalid"),n("requested"),n("initiated"),n("finished"),n("verified"),n("unverified"),n("expired"),n("downloading"),n("downloaded"),i}var s=t;o._queries.callbacks.add(e,s,r)},o.when.unregister=function(e){o._queries.callbacks.unregister(e)}}(),function(){"use strict";o.once=function(e,t,r){return"function"==typeof t?o.when(e,t,!0):"undefined"==typeof t?o.when(e,!0):void o._queries.callbacks.add(e,t,r,!0)},o.once.unregister=o.when.unregister}(),function(){"use strict";var e={},t=0;o.order=function(r){function i(){delete a.then,delete a.error,delete e[s]}var n=r;"string"==typeof r&&(n=o.products.byId[r]||o.products.byAlias[r],n||(n=new o.Product({id:r,loaded:!0,valid:!1})));var s=t++,a=e[s]={};return o.ready(function(){n.set("state",o.REQUESTED)}),{then:function(e){return a.then=e,o.once(n.id,"initiated",function(){a.then&&(i(),e(n))}),this},error:function(e){return a.error=e,o.once(n.id,"error",function(t){a.error&&(i(),e(t))}),this}}},o.order.unregister=function(t){for(var r in e)e[r].then===t&&delete e[r].then,e[r].error===t&&delete e[r].error}}(),function(){"use strict";var e=!1,t=[];o.ready=function(r){if(r===!0){if(e)return this;e=!0;for(var i=0;i<t.length;++i)o.utils.callExternal("ready.callback",t[i]);t=[]}else{if(!r)return e;if(e)return setTimeout(function(){o.utils.callExternal("ready.callback",r)},1),this;t.push(r)}return this},o.ready.unregister=function(e){t=t.filter(function(t){return t!==e})},o.ready.reset=function(){e=!1,t=[]}}(),function(){"use strict";o.off=function(e){o.ready.unregister(e),o.when.unregister(e),o.order.unregister(e),o.error.unregister(e)}}(),function(){"use strict";o.validator=null,o._validator=function(e,t,r){return o.validator||t(!0,e),o._prepareForValidation&&r!==!0?void o._prepareForValidation(e,function(){o._validator(e,t,!0)}):void("string"==typeof o.validator?o.utils.ajax({url:o.validator,method:"POST",data:e,success:function(e){t(e&&e.ok,e.data)},error:function(e,r){t(!1,"Error "+e+": "+r)}}):o.validator(e,t))}}(),function(){"use strict";var e=!0;o.refresh=function(){if(o.trigger("refreshed"),e)return void(e=!1);o.log.debug("refresh -> checking products state ("+o.products.length+" products)");for(var t=0;t<o.products.length;++t){var r=o.products[t];o.log.debug("refresh -> product id "+r.id+" ("+r.alias+")"),o.log.debug("           in state '"+r.state+"'"),r.state===o.APPROVED?r.trigger(o.APPROVED):r.state!==o.OWNED||r.type!==o.FREE_SUBSCRIPTION&&r.type!==o.PAID_SUBSCRIPTION||r.set("state",o.APPROVED)}o.trigger("re-refreshed")}}(),function(){"use strict";function e(e,r){var i=o.verbosity===!0?1:o.verbosity;e>i||("string"!=typeof r&&(r=JSON.stringify(r)),t[e])}var t={};t[o.ERROR]="ERROR",t[o.WARNING]="WARNING",t[o.INFO]="INFO",t[o.DEBUG]="DEBUG",o.log={error:function(t){e(o.ERROR,t)},warn:function(t){e(o.WARNING,t)},info:function(t){e(o.INFO,t)},debug:function(t){e(o.DEBUG,t)}}}(),function(){"use strict";o.products=[],o.products.push=function(e){Array.prototype.push.call(this,e),this.byId[e.id]=e,this.byAlias[e.alias]=e},o.products.byId={},o.products.byAlias={},o.products.reset=function(){for(;this.length>0;)this.shift();this.byAlias={},this.byId={}}}(),function(){"use strict";o.Product.prototype.set=function(e,t){if("string"==typeof e)this[e]=t,"state"===e&&this.stateChanged();else{var r=e;for(e in r)t=r[e],this.set(e,t)}},o.Product.prototype.stateChanged=function(){this.canPurchase=this.state===o.VALID,this.loaded=this.state&&this.state!==o.REGISTERED,this.owned=this.owned||this.state===o.OWNED,this.downloading=this.downloading||this.state===o.DOWNLOADING,this.downloaded=this.downloaded||this.state===o.DOWNLOADED,this.valid=this.state!==o.INVALID,this.state&&this.state!==o.REGISTERED||delete this.valid,this.state&&this.trigger(this.state)},o.Product.prototype.on=function(e,t){o.when(this.id,e,t)},o.Product.prototype.once=function(e,t){o.once(this.id,e,t)},o.Product.prototype.off=function(e){o.when.unregister(e)},o.Product.prototype.trigger=function(e,t){o.trigger(this,e,t)}}(),function(){"use strict";function e(e){return!e.once}function t(e){setTimeout(function(){throw e},1)}o._queries={uniqueQuery:function(e){if(!e)return"";for(var t="",r=e.split(" "),o=0;o<r.length;++o){var i=r[o];"order"!==i&&"product"!==i&&(""!==t&&(t+=" "),t+=i)}return t},callbacks:{byQuery:{},add:function(e,t,r,i){var n=o._queries.uniqueQuery(e?e+" "+t:t);this.byQuery[n]?this.byQuery[n].push({cb:r,once:i}):this.byQuery[n]=[{cb:r,once:i}],o.log.debug("queries ++ '"+n+"'")},unregister:function(e){var t=function(t){return t.cb!==e};for(var r in this.byQuery)this.byQuery[r]=this.byQuery[r].filter(t)}},triggerAction:function(t,r){var i=o._queries.callbacks.byQuery[t];if(o.log.debug("queries !! '"+t+"'"),i){for(var n=0;n<i.length;++n)try{i[n].cb.apply(o,r)}catch(s){o.utils.logError(t,s)}o._queries.callbacks.byQuery[t]=i.filter(e)}},triggerWhenProduct:function(r,i,n){var s=[];r&&r.id&&s.push(r.id+" "+i),r&&r.alias&&r.alias!==r.id&&s.push(r.alias+" "+i),r&&r.type&&s.push(r.type+" "+i),r&&r.type&&(r.type===o.FREE_SUBSCRIPTION||r.type===o.PAID_SUBSCRIPTION)&&s.push("subscription "+i),r&&r.valid===!0&&s.push("valid "+i),r&&r.valid===!1&&s.push("invalid "+i),s.push(i);var a;for(a=0;a<s.length;++a){var c=s[a];o.log.debug("store.queries !! '"+c+"'");var d=o._queries.callbacks.byQuery[c];if(d){for(var u=0;u<d.length;++u)try{d[u].cb.apply(o,n)}catch(l){o.utils.logError(c,l),t(l)}o._queries.callbacks.byQuery[c]=d.filter(e)}}"updated"!==i&&"error"!==i&&this.triggerWhenProduct(r,"updated",[r])}}}(),function(){"use strict";o.trigger=function(e,t,r){return t||r||"string"!=typeof e?void(("string"!=typeof e||(e=o.get(e)))&&("undefined"==typeof r||"object"==typeof r&&"number"==typeof r.length||(r=[r]),"undefined"==typeof r&&(r=[e]),o._queries.triggerWhenProduct(e,t,r))):(o.log.debug("store.trigger -> triggering action "+e),void o._queries.triggerAction(e))}}(),function(){"use strict";function e(e){setTimeout(function(){throw e},1)}o.error.callbacks=[],o.error.callbacks.trigger=function(t){for(var r=0;r<this.length;++r)try{this[r].call(o,t)}catch(i){o.utils.logError("error",i),e(i)}},o.error.callbacks.reset=function(){for(;this.length>0;)this.shift()},o.error.callbacks.unregister=function(e){var t=this.filter(function(t){return t!==e});if(t.length<this.length){this.reset();for(var r=0;r<t.length;++r)this.push(t[r])}}}(),function(){"use strict";o.utils={logError:function(e,t){o.log.warn("A callback in '"+e+"' failed with an exception."),"string"==typeof t?o.log.warn("           "+t):t&&(t.fileName&&o.log.warn("           "+t.fileName+":"+t.lineNumber),t.message&&o.log.warn("           "+t.message),t.stack&&o.log.warn("           "+t.stack))},callExternal:function(e,t){try{var r=Array.prototype.slice.call(arguments,2);t&&t.apply(this,r)}catch(i){o.utils.logError(e,i)}},ajax:function(e){var t=function(){},r=new XMLHttpRequest;return r.open(e.method||"POST",e.url,!0),r.onreadystatechange=function(){try{4===r.readyState&&(200===r.status?o.utils.callExternal("ajax.success",e.success,JSON.parse(r.responseText)):(o.log.warn("ajax -> request to "+e.url+" failed with status "+r.status+" ("+r.statusText+")"),o.utils.callExternal("ajax.error",e.error,r.status,r.statusText)))}catch(i){o.log.warn("ajax -> request to "+e.url+" failed with an exception: "+i.message),e.error&&e.error(417,i.message)}4===r.readyState&&o.utils.callExternal("ajax.done",t)},o.log.debug("ajax -> send request to "+e.url),e.data?(r.setRequestHeader("Content-Type","application/json;charset=UTF-8"),r.send(JSON.stringify(e.data))):r.send(),{done:function(e){return t=e,this}}}}}(),function(){"use strict";var e=function(e,t,r,o){cordova.exec(r,o,"InAppPurchase",e,t)},t=function(e,t){if(e)try{var r=Array.prototype.slice.call(arguments,2);e.apply(this,r)}catch(o){i("exception in "+t+': "'+o+'"')}},r=function(){this.options={},this.receiptForTransaction={},this.receiptForProduct={},window.localStorage&&window.localStorage.sk_receiptForTransaction&&(this.receiptForTransaction=JSON.parse(window.localStorage.sk_receiptForTransaction)),window.localStorage&&window.localStorage.sk_receiptForProduct&&(this.receiptForProduct=JSON.parse(window.localStorage.sk_receiptForProduct))},o=function(){},i=o,n=6777e3;r.prototype.ERR_SETUP=n+1,r.prototype.ERR_LOAD=n+2,r.prototype.ERR_PURCHASE=n+3,r.prototype.ERR_LOAD_RECEIPTS=n+4,r.prototype.ERR_CLIENT_INVALID=n+5,r.prototype.ERR_PAYMENT_CANCELLED=n+6,r.prototype.ERR_PAYMENT_INVALID=n+7,r.prototype.ERR_PAYMENT_NOT_ALLOWED=n+8,r.prototype.ERR_UNKNOWN=n+10,r.prototype.ERR_REFRESH_RECEIPTS=n+11,r.prototype.ERR_PAUSE_DOWNLOADS=n+12,r.prototype.ERR_RESUME_DOWNLOADS=n+13,r.prototype.ERR_CANCEL_DOWNLOADS=n+14;var s=!1;r.prototype.init=function(n,a,c){this.options={error:n.error||o,ready:n.ready||o,purchase:n.purchase||o,purchaseEnqueued:n.purchaseEnqueued||o,purchasing:n.purchasing||o,finish:n.finish||o,restore:n.restore||o,receiptsRefreshed:n.receiptsRefreshed||o,restoreFailed:n.restoreFailed||o,restoreCompleted:n.restoreCompleted||o,downloadActive:n.downloadActive||o,downloadCancelled:n.downloadCancelled||o,downloadFailed:n.downloadFailed||o,downloadFinished:n.downloadFinished||o,downloadPaused:n.downloadPaused||o,downloadWaiting:n.downloadWaiting||o},n.debug&&(e("debug",[],o,o),i=function(e){}),n.noAutoFinish&&e("noAutoFinish",[],o,o);var d=this,u=function(){i("setup ok"),t(d.options.ready,"options.ready"),t(a,"init.success"),s=!0,d.processPendingUpdates()},l=function(){i("setup failed"),t(n.error,"options.error",r.prototype.ERR_SETUP,"Setup failed"),t(c,"init.error")};this.loadAppStoreReceipt(),e("setup",[],u,l)},r.prototype.purchase=function(o,n){n=0|n||1;var s=this.options;if(!r._productIds||r._productIds.indexOf(o)<0){var a="Purchasing "+o+" failed.  Ensure the product was loaded first with storekit.load(...)!";return i(a),void("function"==typeof s.error&&t(s.error,"options.error",r.prototype.ERR_PURCHASE,"Trying to purchase a unknown product.",o,n))}var c=function(){i("Purchased "+o),"function"==typeof s.purchaseEnqueued&&t(s.purchaseEnqueued,"options.purchaseEnqueued",o,n)},d=function(){var e="Purchasing "+o+" failed";i(e),"function"==typeof s.error&&t(s.error,"options.error",r.prototype.ERR_PURCHASE,e,o,n)};e("purchase",[o,n],c,d)},r.prototype.canMakePayments=function(t,r){return e("canMakePayments",[],t,r)},r.prototype.restore=function(){this.needRestoreNotification=!0,e("restoreCompletedTransactions",[])},r.prototype.pause=function(){var o=function(){i("Paused active downloads"),"function"==typeof this.options.paused&&t(this.options.paused,"options.paused")},n=function(){var e="Pausing active downloads failed";i(e),"function"==typeof this.options.error&&t(this.options.error,"options.error",r.prototype.ERR_PAUSE_DOWNLOADS,e)};return e("pause",[],o,n)},r.prototype.resume=function(){var o=function(){i("Resumed active downloads"),"function"==typeof this.options.resumed&&t(this.options.resumed,"options.resumed")},n=function(){var e="Resuming active downloads failed";i(e),"function"==typeof this.options.error&&t(this.options.error,"options.error",r.prototype.ERR_RESUME_DOWNLOADS,e)};return e("resume",[],o,n)},r.prototype.cancel=function(){var o=function(){i("Cancelled active downloads"),"function"==typeof this.options.cancelled&&t(this.options.cancelled,"options.cancelled")},n=function(){var e="Cancelling active downloads failed";i(e),"function"==typeof this.options.error&&t(this.options.error,"options.error",r.prototype.ERR_CANCEL_DOWNLOADS,e)};return e("cancel",[],o,n)},r.prototype.load=function(o,n,s){var a=this.options;if("string"==typeof o&&(o=[o]),o)if(o.length){if("string"!=typeof o[0]){var c="invalid productIds given to store.load: "+JSON.stringify(o);return i(c),t(a.error,"options.error",r.prototype.ERR_LOAD,c),void t(s,"load.error",r.prototype.ERR_LOAD,c)}i("load "+JSON.stringify(o));var d=function(e){var r=e[0],o=e[1];i("load ok: { valid:"+JSON.stringify(r)+" invalid:"+JSON.stringify(o)+" }"),t(n,"load.success",r,o)},u=function(e){i("load failed"),i(e);var o="Load failed: "+e;t(a.error,"options.error",r.prototype.ERR_LOAD,o),t(s,"load.error",r.prototype.ERR_LOAD,o)};r._productIds=o,e("load",[o],d,u)}else t(n,"load.success",[],[]);else t(n,"load.success",[],[])},r.prototype.finish=function(t){e("finishTransaction",[t],o,o)};var a=[],c=[];r.prototype.processPendingUpdates=function(){for(var e=0;e<a.length;++e)this.updatedTransactionCallback.apply(this,a[e]);a=[];for(var t=0;t<c.length;++t)this.updatedDownloadCallback.apply(this,c[t]);c=[]},r.prototype.updatedTransactionCallback=function(e,r,o,i,n,c){if(!s){var d=Array.prototype.slice.call(arguments);return void a.push(d)}switch(c&&(this.receiptForProduct[n]=c,this.receiptForTransaction[i]=c,window.localStorage&&(window.localStorage.sk_receiptForProduct=JSON.stringify(this.receiptForProduct),window.localStorage.sk_receiptForTransaction=JSON.stringify(this.receiptForTransaction))),e){case"PaymentTransactionStatePurchasing":return void t(this.options.purchasing,"options.purchasing",n);case"PaymentTransactionStatePurchased":return void t(this.options.purchase,"options.purchase",i,n);case"PaymentTransactionStateFailed":return void t(this.options.error,"options.error",r,o,{productId:n});case"PaymentTransactionStateRestored":return void t(this.options.restore,"options.restore",i,n);case"PaymentTransactionStateFinished":return void t(this.options.finish,"options.finish",i,n)}},r.prototype.updatedDownloadCallback=function(e,r,o,i,n,a,d,u){if(!s){var l=Array.prototype.slice.call(arguments);return void c.push(l)}switch(e){case"DownloadStateActive":return void t(this.options.downloadActive,"options.downloadActive",i,n,d,u);case"DownloadStateCancelled":return void t(this.options.downloadCancelled,"options.downloadCancelled",i,n);case"DownloadStateFailed":return void t(this.options.downloadFailed,"options.downloadFailed",i,n,r,o);case"DownloadStateFinished":return void t(this.options.downloadFinished,"options.downloadFinished",i,n);case"DownloadStatePaused":return void t(this.options.downloadPaused,"options.downloadPaused",i,n);case"DownloadStateWaiting":return void t(this.options.downloadWaiting,"options.downloadWaiting",i,n)}},r.prototype.restoreCompletedTransactionsFinished=function(){this.needRestoreNotification&&(delete this.needRestoreNotification,t(this.options.restoreCompleted,"options.restoreCompleted"))},r.prototype.restoreCompletedTransactionsFailed=function(e){this.needRestoreNotification&&(delete this.needRestoreNotification,t(this.options.restoreFailed,"options.restoreFailed",e))},r.prototype.refreshReceipts=function(o,n){var s=this,a=function(e){var r=e[0],n=e[1],a=e[2],c=e[3],d=e[4];i("infoPlist: "+n+","+a+","+c+","+d),s.setAppStoreReceipt(r),t(s.options.receiptsRefreshed,"options.receiptsRefreshed",{appStoreReceipt:r,bundleIdentifier:n,bundleShortVersion:a,bundleNumericVersion:c,bundleSignature:d}),t(o,"refreshReceipts.success",r)},c=function(e){i("refresh receipt failed: "+e),t(s.options.error,"options.error",r.prototype.ERR_REFRESH_RECEIPTS,"Failed to refresh receipt: "+e),t(n,"refreshReceipts.error",r.prototype.ERR_REFRESH_RECEIPTS,"Failed to refresh receipt: "+e)};i("refreshing appStoreReceipt"),e("appStoreRefreshReceipt",[],a,c)},r.prototype.loadReceipts=function(o){function n(){t(o,"loadReceipts.callback",{appStoreReceipt:s.appStoreReceipt,forTransaction:function(e){return s.receiptForTransaction[e]||null},forProduct:function(e){return s.receiptForProduct[e]||null}})}var s=this,a=function(e){s.setAppStoreReceipt(e),n()},c=function(e){i("load failed: "+e),t(s.options.error,"options.error",r.prototype.ERR_LOAD_RECEIPTS,"Failed to load receipt: "+e)};s.appStoreReceipt?(i("appStoreReceipt already loaded:"),i(s.appStoreReceipt),n()):(i("loading appStoreReceipt"),e("appStoreReceipt",[],a,c))},r.prototype.setAppStoreReceipt=function(e){this.appStoreReceipt=e,window.localStorage&&e&&(window.localStorage.sk_appStoreReceipt=e)},r.prototype.loadAppStoreReceipt=function(){window.localStorage&&window.localStorage.sk_appStoreReceipt&&(this.appStoreReceipt=window.localStorage.sk_appStoreReceipt),"null"===this.appStoreReceipt&&(this.appStoreReceipt=null)},r.prototype.runQueue=function(){if(this.eventQueue.length&&(this.onPurchased||this.onFailed||this.onRestored)){var e,t=this.eventQueue.slice();for(this.eventQueue=[],e=t.shift();e;)this.updatedTransactionCallback.apply(this,e),e=t.shift();this.eventQueue.length||this.unWatchQueue()}},r.prototype.watchQueue=function(){this.timer||(this.timer=window.setInterval(function(){window.storekit.runQueue()},1e4))},r.prototype.unWatchQueue=function(){this.timer&&(window.clearInterval(this.timer),this.timer=null)},r.prototype.eventQueue=[],r.prototype.timer=null,window.storekit=new r}(),function(){"use strict";function e(e){if(e.type===o.CONSUMABLE)e.transaction.id&&storekit.finish(e.transaction.id);else if(e.transactions){o.log.debug("ios -> finishing all "+e.transactions.length+" transactions for "+e.id);for(var t=0;t<e.transactions.length;++t)o.log.debug("ios -> finishing "+e.transactions[t]),storekit.finish(e.transactions[t]);e.transactions=[]}}function t(){I||A||(A=!0,o.log.debug("ios -> initializing storekit"),storekit.init({debug:o.verbosity>=o.DEBUG?!0:!1,noAutoFinish:!0,error:l,purchase:u,purchasing:d,restore:p,restoreCompleted:f,restoreFailed:h,downloadActive:g,downloadFailed:R,downloadFinished:E},r,i))}function r(){o.log.info("ios -> storekit ready"),A=!1,I=!0,n()}function i(){o.log.warn("ios -> storekit init failed"),A=!1,S(t)}function n(){if(I&&!N&&!D){D=!0;for(var e=[],t=0;t<o.products.length;++t)e.push(o.products[t].id);o.log.debug("ios -> loading products"),storekit.load(e,s,a)}}function s(e,t){o.log.debug("ios -> products loaded");for(var r,i=0;i<e.length;++i)r=o.products.byId[e[i].id],o.log.debug("ios -> product "+r.id+" is valid ("+r.alias+")"),o.log.debug("ios -> owned? "+r.owned),r.set({title:e[i].title,price:e[i].price,description:e[i].description,state:o.VALID}),r.trigger("loaded"),y(r.id)&&(r.type===o.NON_CONSUMABLE?r.set("state",o.OWNED):r.set("state",o.APPROVED));for(var n=0;n<t.length;++n)r=o.products.byId[t[n]],r.set("state",o.INVALID),o.log.warn("ios -> product "+r.id+" is NOT valid ("+r.alias+")"),r.trigger("loaded");setTimeout(function(){D=!1,N=!0,o.ready(!0)},1)}function a(){o.log.warn("ios -> loading products failed"),D=!1,S(n)}function c(e){function t(){var e=P;P=[];for(var t=0;t<e.length;++t)e[t]()}e&&P.push(e),O||(O=!0,storekit.refreshReceipts(function(){O=!1,t()},function(){O=!1,t()}))}function d(e){o.log.debug("ios -> is purchasing "+e),o.ready(function(){var t=o.get(e);return t?void(t.state!==o.INITIATED&&t.set("state",o.INITIATED)):void o.log.warn("ios -> Product '"+e+"' is being purchased. But isn't registered anymore! How come?")})}function u(e,t){o.ready(function(){var r=o.get(t);if(!r)return void o.error({code:o.ERR_PURCHASE,message:"Unknown product purchased"});if(r.transactions)for(var i=0;i<r.transactions.length;++i)if(e===r.transactions[i])return;r.transaction={type:"ios-appstore",id:e},r.transactions||(r.transactions=[]),r.transactions.push(e),o.log.info("ios -> transaction "+e+" purchased ("+r.transactions.length+" in the queue for "+t+")"),r.set("state",o.APPROVED)})}function l(e,t,r){var i,n;if(r||(r={}),o.log.error("ios -> ERROR "+e+": "+t+" - "+JSON.stringify(r)),e===storekit.ERR_LOAD)for(i=0;i<o.products.length;++i)n=o.products[i],n.trigger("error",[new o.Error({code:o.ERR_LOAD,message:t}),n]);return e===storekit.ERR_PAYMENT_CANCELLED?(n=o.get(r.productId),void(n&&(n.trigger("cancelled"),n.set({transaction:null,state:o.VALID})))):void o.error({code:e,message:t})}function p(e,t){o.log.info("ios -> restored purchase "+t),u(e,t)}function f(){o.log.info("ios -> restore completed"),o.trigger("refresh-completed")}function h(){o.log.warn("ios -> restore failed"),o.error({code:o.ERR_REFRESH,message:"Failed to restore purchases during refresh"}),o.trigger("refresh-failed")}function g(e,t,r,i){o.log.info("ios -> is downloading "+t+"; progress="+r+"%; timeRemaining="+i+"s");var n=o.get(t);n.set({progress:r,timeRemaining:i,state:o.DOWNLOADING})}function R(e,t,r,i){o.log.error("ios -> download failed: "+t+"; errorCode="+r+"; errorText="+i);var n=o.get(t);n.trigger("error",[new o.Error({code:o.ERR_DOWNLOAD,message:i}),n]),o.error({code:r,message:i})}function E(e,t){o.log.info("ios -> download completed: "+t);var r=o.get(t);r.set("state",o.DOWNLOADED)}function y(e){return"1"===localStorage["__cc_fovea_store_ios_owned_ "+e]}function v(e,t){localStorage["__cc_fovea_store_ios_owned_ "+e]=t?"1":"0"}function _(e){return"1"===localStorage["__cc_fovea_store_ios_downloaded_ "+e]}function w(e,t){localStorage["__cc_fovea_store_ios_downloaded_ "+e]=t?"1":"0"}function S(e){var t=setTimeout(function(){T=T.filter(function(e){return t!==e.tid}),e()},b);T.push({tid:t,fn:e}),b*=2,b>12e4&&(b=12e4)}o.when("refreshed",function(){t(),n()}),o.when("requested",function(e){o.ready(function(){return e?e.valid?void storekit.purchase(e.id,1):void e.trigger("error",[new o.Error({code:o.ERR_PURCHASE,message:"`purchase()` called with an invalid product"}),e]):void o.error({code:o.ERR_INVALID_PRODUCT_ID,message:"Trying to order an unknown product"})})}),o.when("finished",function(t){o.log.debug("ios -> finishing "+t.id),e(t),t.type===o.CONSUMABLE?t.set("state",o.VALID):t.set("state",o.OWNED)}),o.when("owned",function(e){y(e.id)||v(e.id,!0)}),o.when("downloaded",function(e){_(e.id)||w(e.id,!0)}),o.when("registered",function(e){var t=y(e.id);e.owned=e.owned||t;var r=_(e.id);e.downloaded=e.downloaded||r,o.log.debug("ios -> product "+e.id+" registered"+(t?" and owned":"")+(r?" and downloaded":""))}),o.when("expired",function(t){o.log.debug("ios -> product "+t.id+" expired"),t.owned=!1,v(t.id,!1),w(t.id,!1),e(t),(t.state===o.OWNED||t.state===o.APPROVED)&&t.set("state",o.VALID)});var I=!1,A=!1,N=!1,D=!1,P=[],O=!1;o.when("expired",function(){c()}),o.when("re-refreshed",function(){storekit.restore(),storekit.refreshReceipts(function(e){if(e){var t=e.bundleIdentifier?o.get(e.bundleIdentifier):null;t||(t=new o.Product({id:e.bundleIdentifier||"application data",alias:"application data",type:o.NON_CONSUMABLE}),o.register(t)),t.version=e.bundleShortVersion,t.transaction={type:"ios-appstore",appStoreReceipt:e.appStoreReceipt,signature:e.signature},t.trigger("loaded"),t.set("state",o.APPROVED)}})}),o._refreshForValidation=function(e){c(e)},o._prepareForValidation=function(e,t){function r(){storekit.loadReceipts(function(i){if(e.transaction||(e.transaction={type:"ios-appstore"}),e.transaction.appStoreReceipt=i.appStoreReceipt,e.transaction.id&&(e.transaction.transactionReceipt=i.forTransaction(e.transaction.id)),!e.transaction.appStoreReceipt&&!e.transaction.transactionReceipt){if(o++,2>o)return void setTimeout(r,500);if(2===o)return void storekit.refreshReceipts(r)}t()})}var o=0;r()};var b=5e3,T=[];document.addEventListener("online",function(){var e=T;T=[],b=5e3;for(var t=0;t<e.length;++t)clearTimeout(e[t].tid),e[t].fn.call(this)},!1)}(),r.exports=o});