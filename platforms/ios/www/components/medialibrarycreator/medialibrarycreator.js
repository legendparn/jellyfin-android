define(["components/paperdialoghelper","paper-dialog","paper-input","paper-fab","paper-item-body","paper-icon-item"],function(){function e(){if(0==m.length)return Dashboard.alert({message:Globalize.translate("PleaseAddAtLeastOneFolder")}),!1;var e=this,t=$(e).parents("paper-dialog")[0],a=$("#txtValue",e).val(),r=$("#selectCollectionType",e).val();return"mixed"==r&&(r=null),ApiClient.addVirtualFolder(a,r,u.refresh,m).then(function(){d=!0,PaperDialogHelper.close(t)},function(){Dashboard.alert(Globalize.translate("ErrorAddingMediaPathToVirtualFolder"))}),!1}function t(e){return e.filter(function(e){return e.isSelectable!==!1}).map(function(e){return'<option value="'+e.value+'">'+e.name+"</option>"}).join("")}function a(a,i){$("#selectCollectionType",a).html(t(i)).val("").on("change",function(){if("mixed"!=this.value){var e=$(this).parents("paper-dialog")[0],t=this.selectedIndex;if(-1!=t){var a=this.options[t].innerHTML.replace("*","").replace("&amp;","&"),r=this.value;$("#txtValue",e).val(a);var n=i.filter(function(e){return e.value==r})[0];$(".collectionTypeFieldDescription",e).html(n.message||"")}}}),$(".btnAddFolder",a).on("click",r),$("form",a).off("submit",e).on("submit",e)}function r(){var e=$(this).parents(".editorContent")[0];require(["directorybrowser"],function(t){var a=new t;a.show({callback:function(t){t&&o(e,t),a.close()}})})}function i(e,t){var a="";return a+='<paper-icon-item role="menuitem" class="lnkPath">',a+='<paper-fab mini style="background:#52B54B;" icon="folder" item-icon></paper-fab>',a+="<paper-item-body>",a+=e,a+="</paper-item-body>",a+='<paper-icon-button icon="remove-circle" class="btnRemovePath" data-index="'+t+'"></paper-icon-button>',a+="</paper-icon-item>"}function n(e){var t=m.map(i).join(""),a=e.querySelector(".folderList");a.innerHTML=t,t?a.classList.remove("hide"):a.classList.add("hide"),$(e.querySelectorAll(".btnRemovePath")).on("click",l)}function o(e,t){0==m.filter(function(e){return e.toLowerCase()==t.toLowerCase()}).length&&(m.push(t),n(e))}function l(){var e=this,t=parseInt(e.getAttribute("data-index")),a=m[t];m=m.filter(function(e){return e.toLowerCase()!=a.toLowerCase()});var r=$(this).parents(".editorContent")[0];n(r)}function s(){$(this).remove(),Dashboard.hideLoadingMsg(),p.resolveWith(null,[d])}function c(){var e=this;e.show=function(e){var t=DeferredBuilder.Deferred();u=e,p=t,d=!1;var r=new XMLHttpRequest;return r.open("GET","components/medialibrarycreator/medialibrarycreator.template.html",!0),r.onload=function(){var t=this.response,r=PaperDialogHelper.createDialog({size:"small",theme:"a",modal:!1}),i="";i+='<h2 class="dialogHeader">',i+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>';var o=Globalize.translate("ButtonAddMediaLibrary");i+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+o+"</div>",i+="</h2>",i+='<div class="editorContent" style="max-width:800px;margin:auto;">',i+=Globalize.translateDocument(t),i+="</div>",r.innerHTML=i,document.body.appendChild(r);var l=r.querySelector(".editorContent");a(l,e.collectionTypeOptions),$(r).on("iron-overlay-closed",s),PaperDialogHelper.openWithHash(r,"medialibrarycreator"),$(".btnCloseDialog",r).on("click",function(){PaperDialogHelper.close(r)}),m=[],n(l)},r.send(),t.promise()}}var p,d,u,m=[];return c});