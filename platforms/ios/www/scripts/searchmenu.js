!function(){function e(){function e(e,n){var t=[{opacity:"0",offset:0},{opacity:"1",offset:1}],i={duration:200,iterations:n};return e.animate(t,i)}var n=this;n.show=function(){require(["css!css/search.css"],function(){$(".headerSearchInput").val(""),$(".btnCloseSearch").hide();var n=$(".viewMenuSearch").removeClass("hide")[0];e(n,1).onfinish=function(){$(".headerSearchInput").focus(),$(".btnCloseSearch").show()}})},n.hide=function(){var e=document.querySelector(".viewMenuSearch");e&&(e.classList.contains("hide")||($(".btnCloseSearch").hide(),e.classList.add("hide")))},$(".viewMenuSearchForm").on("submit",function(){return!1}),$(".btnCloseSearch").on("click",function(){n.hide(),Events.trigger(n,"closed")}),$(".headerSearchInput").on("keyup",function(e){return 40==e.keyCode?!1:void Events.trigger(n,"change",[this.value])}).on("search",function(){this.value||Events.trigger(n,"change",[""])})}window.SearchMenu=new e}();