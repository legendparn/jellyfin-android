!function(e){function n(){function e(r,i,o,t,s){var f=r.length;return i>=f?void o.resolve():void n(r[i],t).then(function(){e(r,i+1,o,t,s)},function(){e(r,i+1,o,t,s)})}function n(e,n){var r=DeferredBuilder.Deferred();return n.getOfflineUser(e.Id).then(function(e){require(["localassetmanager"],function(){LocalAssetManager.saveOfflineUser(e).then(function(){r.resolve()},function(){r.resolve()})})},function(){require(["localassetmanager"],function(){LocalAssetManager.deleteOfflineUser(e.Id).then(function(){r.resolve()},function(){r.resolve()})})}),r.promise()}var r=this;r.sync=function(n,r){var i=DeferredBuilder.Deferred(),o=r.Users||[];return e(o,0,i,n,r),i.promise()}}e.MediaBrowser||(e.MediaBrowser={}),e.MediaBrowser.OfflineUserSync=n}(this);