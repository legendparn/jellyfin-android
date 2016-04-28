define(["layoutManager","jQuery","scrollStyles"],function(e,a){function t(){var e=getParameterByName("id");if(e)return ApiClient.getItem(Dashboard.getCurrentUserId(),e);var a=getParameterByName("genre");if(a)return ApiClient.getGenre(a,Dashboard.getCurrentUserId());if(a=getParameterByName("musicgenre"))return ApiClient.getMusicGenre(a,Dashboard.getCurrentUserId());if(a=getParameterByName("gamegenre"))return ApiClient.getGameGenre(a,Dashboard.getCurrentUserId());if(a=getParameterByName("musicartist"))return ApiClient.getArtist(a,Dashboard.getCurrentUserId());throw new Error("Invalid request")}function i(e){Dashboard.showLoadingMsg(),t().then(function(a){r(e,a)})}function r(t,i){ta=i;var r=d(i);LibraryMenu.setBackButtonVisible(!0),LibraryMenu.setMenuButtonVisible(!1),LibraryBrowser.renderName(i,a(".itemName",t),!1,r),LibraryBrowser.renderParentName(i,a(".parentName",t),r),LibraryMenu.setTitle(i.SeriesName||i.Name),Dashboard.getCurrentUser().then(function(s){n(t,i,s),m(t,i,r,s),u(t,i,r);var o=!1;"MusicArtist"!=i.Type&&"MusicAlbum"!=i.Type&&"Playlist"!=i.Type&&"BoxSet"!=i.Type&&"Audio"!=i.MediaType&&e.mobile?o=LibraryBrowser.renderDetailPageBackdrop(t,i):(a("#itemBackdrop",t).addClass("noBackdrop").css("background-image","none"),require(["backdrop"],function(e){e.setBackdrops([i])}));var l=o&&t.classList.contains("noSecondaryNavPage");LibraryMenu.setTransparentMenu(l);var d=!1;if("Program"==i.Type){var c=new Date;c>=parseISO8601Date(i.StartDate,{toLocal:!0})&&c<parseISO8601Date(i.EndDate,{toLocal:!0})?(a(".btnPlay",t).removeClass("hide"),d=!0):a(".btnPlay",t).addClass("hide")}else MediaController.canPlay(i)?(a(".btnPlay",t).removeClass("hide"),d=!0):a(".btnPlay",t).addClass("hide");i.LocalTrailerCount&&"Full"==i.PlayAccess?a(".btnPlayTrailer",t).removeClass("hide"):a(".btnPlayTrailer",t).addClass("hide"),LibraryBrowser.enableSync(i,s)?a(".btnSync",t).removeClass("hide"):a(".btnSync",t).addClass("hide"),"Program"==i.Type&&i.TimerId?a(".btnCancelRecording",t).removeClass("hide"):a(".btnCancelRecording",t).addClass("hide"),"Program"!=i.Type||i.TimerId||i.SeriesTimerId?(a(".btnRecord",t).addClass("hide"),a(".btnFloatingRecord",t).addClass("hide")):d?(a(".btnRecord",t).removeClass("hide"),a(".btnFloatingRecord",t).addClass("hide")):(a(".btnRecord",t).addClass("hide"),a(".btnFloatingRecord",t).removeClass("hide")),!i.LocalTrailerCount&&i.RemoteTrailers.length&&"Full"==i.PlayAccess?a(".btnPlayExternalTrailer",t).removeClass("hide").attr("href",i.RemoteTrailers[0].Url):a(".btnPlayExternalTrailer",t).addClass("hide").attr("href","#");var p=(i.MediaSources||[]).filter(function(e){return"Grouping"==e.Type});if(s.Policy.IsAdministrator&&p.length?a(".splitVersionContainer",t).show():a(".splitVersionContainer",t).hide(),LibraryBrowser.getMoreCommands(i,s).length>0?a(".btnMoreCommands",t).removeClass("hide"):a(".btnMoreCommands",t).addClass("hide"),s.Policy.IsAdministrator?a(".chapterSettingsButton",t).show():a(".chapterSettingsButton",t).hide(),LiveTvHelpers.renderOriginalAirDate(a(".airDate",t),i),"Person"==i.Type&&i.PremiereDate)try{var h=parseISO8601Date(i.PremiereDate,{toLocal:!0}).toDateString();a("#itemBirthday",t).show().html(Globalize.translate("BirthDateValue").replace("{0}",h))}catch(g){a("#itemBirthday",t).hide()}else a("#itemBirthday",t).hide();if("Person"==i.Type&&i.EndDate)try{var y=parseISO8601Date(i.EndDate,{toLocal:!0}).toDateString();a("#itemDeathDate",t).show().html(Globalize.translate("DeathDateValue").replace("{0}",y))}catch(g){a("#itemBirthday",t).hide()}if("Person"==i.Type&&i.ProductionLocations&&i.ProductionLocations.length){var b='<a class="textlink" target="_blank" href="https://maps.google.com/maps?q='+i.ProductionLocations[0]+'">'+i.ProductionLocations[0]+"</a>";a("#itemBirthLocation",t).show().html(Globalize.translate("BirthPlaceValue").replace("{0}",b))}else a("#itemBirthLocation",t).hide()}),"Offline"==i.LocationType?a(".offlineIndicator",t).show():a(".offlineIndicator",t).hide();var s=!1;if("Virtual"==i.LocationType&&"Episode"==i.Type)try{i.PremiereDate&&(new Date).getTime()>=parseISO8601Date(i.PremiereDate,{toLocal:!0}).getTime()&&(s=!0)}catch(o){}s?a(".missingIndicator",t).show():a(".missingIndicator",t).hide(),l(t,i),t.dispatchEvent(new CustomEvent("displayingitem",{detail:{item:i,context:r},bubbles:!0})),Dashboard.hideLoadingMsg()}function n(e,a,t){LibraryBrowser.renderDetailImage(e.querySelector(".detailImageContainer"),a,t.Policy.IsAdministrator&&"Photo"!=a.MediaType)}function s(e,a){LibraryBrowser.refreshDetailImageUserData(e.querySelector(".detailImageContainer"),a)}function o(e,t){var i=t,r=a(a.mobile.activePage)[0];if("UserDataChanged"===i.MessageType&&ta&&i.Data.UserId==Dashboard.getCurrentUserId()){var n=ta.UserData.Key,o=i.Data.UserDataList.filter(function(e){return e.Key==n})[0];o&&(ta.UserData=o,Dashboard.getCurrentUser().then(function(e){s(r,ta,e)}))}}function l(e,t){a("#peopleHeader",e).html("Audio"==t.MediaType||"MusicAlbum"==t.Type||"Book"==t.MediaType||"Photo"==t.MediaType?Globalize.translate("HeaderPeople"):Globalize.translate("HeaderCastAndCrew"))}function d(){return getParameterByName("context")}function c(e,t,i){var r=e.querySelector(".nextUpSection"),n=t.UserData||{};return"Series"==t.Type&&n.PlayedPercentage?void ApiClient.getNextUpEpisodes({SeriesId:t.Id,UserId:i.Id}).then(function(e){e.Items.length?r.classList.remove("hide"):r.classList.add("hide");var i=LibraryBrowser.getPosterViewHtml({items:e.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==t.Type&&t.IndexNumber,overlayText:!0,lazy:!0,overlayPlayButton:!0}),n=r.querySelector(".nextUpItems");n.innerHTML=i,ImageLoader.lazyChildren(n),a(n).createCardMenus()}):void r.classList.add("hide")}function m(e,t,i,r){a(".collectionItems",e).empty(),"TvChannel"==t.Type?(a("#childrenCollapsible",e).removeClass("hide"),D(e,t,r)):"Playlist"==t.Type?(a("#childrenCollapsible",e).removeClass("hide"),A(e,t,r)):"Studio"==t.Type||"Person"==t.Type||"Genre"==t.Type||"MusicGenre"==t.Type||"GameGenre"==t.Type||"MusicArtist"==t.Type?(a("#childrenCollapsible",e).removeClass("hide"),L(e,t,r)):t.IsFolder?("BoxSet"==t.Type?a("#childrenCollapsible",e).addClass("hide"):a("#childrenCollapsible",e).removeClass("hide"),w(e,t,r,i)):a("#childrenCollapsible",e).addClass("hide"),"Series"==t.Type?c(e,t,r):e.querySelector(".nextUpSection").classList.add("hide"),t.MediaSources&&t.MediaSources.length&&E(e,t);var n=t.Chapters||[];n.length&&AppInfo.enableDetailPageChapters?(a("#scenesCollapsible",e).show(),q(e,t,r,3)):a("#scenesCollapsible",e).hide(),t.SpecialFeatureCount&&0!=t.SpecialFeatureCount&&"Series"!=t.Type?(a("#specialsCollapsible",e).removeClass("hide"),X(e,t,r,6)):a("#specialsCollapsible",e).addClass("hide"),t.People&&t.People.length?(a("#castCollapsible",e).show(),Y(e,t,i,b()?null:6)):a("#castCollapsible",e).hide(),t.PartCount&&t.PartCount>1?(a("#additionalPartsCollapsible",e).removeClass("hide"),U(e,t,r)):a("#additionalPartsCollapsible",e).addClass("hide"),a("#themeSongsCollapsible",e).hide(),a("#themeVideosCollapsible",e).hide(),"MusicAlbum"==t.Type?N(e,t,r):a("#musicVideosCollapsible",e).hide(),F(e,t,r),b()?x(e,t):x(e,t,1)}function u(e,t,i,r){C(e,t,i),r||y(e,t,i),t.Taglines&&t.Taglines.length?a(".tagline",e).html(t.Taglines[0]).show():a(".tagline",e).hide();var n=e.querySelector(".topOverview"),s=e.querySelector(".bottomOverview"),o=screen.availHeight<800||screen.availWidth<600;"MusicAlbum"==t.Type||"MusicArtist"==t.Type||"Season"==t.Type&&o?(LibraryBrowser.renderOverview([s],t),n.classList.add("hide"),s.classList.remove("hide")):(LibraryBrowser.renderOverview([n],t),n.classList.remove("hide"),s.classList.add("hide")),a(".itemCommunityRating",e).html(LibraryBrowser.getRatingHtml(t)),LibraryBrowser.renderAwardSummary(a("#awardSummary",e),t),a(".itemMiscInfo",e).html(LibraryBrowser.getMiscInfoHtml(t)),LibraryBrowser.renderGenres(a(".itemGenres",e),t,null,r),LibraryBrowser.renderStudios(a(".itemStudios",e),t,r),R(e,t),LibraryBrowser.renderLinks(e.querySelector(".itemExternalLinks"),t),a(".criticRatingScore",e).html((t.CriticRating||"0")+"%"),t.CriticRatingSummary?(a("#criticRatingSummary",e).show(),a(".criticRatingSummaryText",e).html(t.CriticRatingSummary)):a("#criticRatingSummary",e).hide(),S(e,t),T(e,t,r),t.Players?a("#players",e).show().html(t.Players+" Player"):a("#players",e).hide(),t.ArtistItems&&t.ArtistItems.length&&"MusicAlbum"!=t.Type?a(".artist",e).show().html(g(t.ArtistItems,i)):a(".artist",e).hide(),t.MediaSources&&t.MediaSources.length&&t.Path?a(".audioVideoMediaInfo",e).removeClass("hide"):a(".audioVideoMediaInfo",e).addClass("hide"),"Photo"==t.MediaType?(a(".photoInfo",e).removeClass("hide"),p(e,t)):a(".photoInfo",e).addClass("hide"),h(e,t)}function p(e,t){var i="",r=[];if(t.CameraMake&&r.push(j(Globalize.translate("MediaInfoCameraMake"),t.CameraMake)),t.CameraModel&&r.push(j(Globalize.translate("MediaInfoCameraModel"),t.CameraModel)),t.Altitude&&r.push(j(Globalize.translate("MediaInfoAltitude"),t.Altitude.toFixed(1))),t.Aperture&&r.push(j(Globalize.translate("MediaInfoAperture"),"F"+t.Aperture.toFixed(1))),t.ExposureTime){var n=1/t.ExposureTime;r.push(j(Globalize.translate("MediaInfoExposureTime"),"1/"+n+" s"))}t.FocalLength&&r.push(j(Globalize.translate("MediaInfoFocalLength"),t.FocalLength.toFixed(1)+" mm")),t.ImageOrientation,t.IsoSpeedRating&&r.push(j(Globalize.translate("MediaInfoIsoSpeedRating"),t.IsoSpeedRating)),t.Latitude&&r.push(j(Globalize.translate("MediaInfoLatitude"),t.Latitude.toFixed(1))),t.Longitude&&r.push(j(Globalize.translate("MediaInfoLongitude"),t.Longitude.toFixed(1))),t.ShutterSpeed&&r.push(j(Globalize.translate("MediaInfoShutterSpeed"),t.ShutterSpeed)),t.Software&&r.push(j(Globalize.translate("MediaInfoSoftware"),t.Software)),i+=r.join("<br/>"),a(".photoInfoContent",e).html(i)}function h(e){var t=a(".tabDetails",e)[0],i=t.textContent||t.innerText||"";i.trim()?a(".detailsSection",e).removeClass("hide"):a(".detailsSection",e).addClass("hide")}function g(e){for(var a=[],t=0,i=e.length;i>t;t++){var r=e[t];a.push('<a class="textlink" href="itemdetails.html?id='+r.Id+'">'+r.Name+"</a>")}return a=a.join(" / "),1==e.length?Globalize.translate("ValueArtist",a):e.length>1?Globalize.translate("ValueArtists",a):a}function y(e,t,i){if(a(".lnkSibling",e).addClass("hide"),"Episode"==t.Type||"Season"==t.Type||"Audio"==t.Type||"Photo"==t.Type){var r;r="Season"==t.Type?ApiClient.getSeasons(t.SeriesId,{userId:Dashboard.getCurrentUserId(),AdjacentTo:t.Id}):"Episode"==t.Type&&t.SeasonId?ApiClient.getEpisodes(t.SeriesId,{seasonId:t.SeasonId,userId:Dashboard.getCurrentUserId(),AdjacentTo:t.Id}):ApiClient.getItems(Dashboard.getCurrentUserId(),{AdjacentTo:t.Id,ParentId:t.ParentId,SortBy:"SortName"}),i=i||"",r.then(function(r){for(var n=!1,s=0,o=r.Items.length;o>s;s++){var l=r.Items[s];l.Id==t.Id?n=!0:n?a(".lnkNextItem",e).removeClass("hide").attr("href","itemdetails.html?id="+l.Id+"&context="+i):a(".lnkPreviousItem",e).removeClass("hide").attr("href","itemdetails.html?id="+l.Id+"&context="+i)}})}}function b(){return browserInfo.mobile&&AppInfo.enableAppLayouts&&screen.availWidth<=1e3}function v(){return b()?"overflowPortrait":"detailPagePortrait"}function f(){return b()?"overflowSquare":"detailPageSquare"}function I(){return b()?"overflowBackdrop":"detailPage169"}function C(e,t,i){if("Movie"!=t.Type&&"Trailer"!=t.Type&&"Series"!=t.Type&&"Program"!=t.Type&&"Recording"!=t.Type&&"Game"!=t.Type&&"MusicAlbum"!=t.Type&&"MusicArtist"!=t.Type&&"ChannelVideoItem"!=t.Type)return void a("#similarCollapsible",e).hide();a("#similarCollapsible",e).show();var r="MusicAlbum"==t.Type||"MusicArtist"==t.Type?f():v(),n=a(window).width(),s=a(window).height(),o={userId:Dashboard.getCurrentUserId(),limit:n>800&&"detailPagePortrait"==r?4:4,fields:"PrimaryImageAspectRatio,UserData,SyncInfo,CanDelete"};n>=800&&s>=1e3&&(o.limit*=2),b()&&(o.limit=12),ApiClient.getSimilarItems(t.Id,o).then(function(n){if(!n.Items.length)return void a("#similarCollapsible",e).hide();var s=a("#similarCollapsible",e).show();a(".similiarHeader",s).html(Globalize.translate("HeaderIfYouLikeCheckTheseOut",t.Name));var o="";o+=b()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',o+=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:r,showParentTitle:"MusicAlbum"==t.Type,centerText:!0,showTitle:"MusicAlbum"==t.Type||"Game"==t.Type||"MusicArtist"==t.Type,borderless:"Game"==t.Type,context:i,lazy:!0,showDetailsMenu:!0,coverImage:"MusicAlbum"==t.Type||"MusicArtist"==t.Type,overlayPlayButton:!0}),o+="</div>",a("#similarContent",e).html(o).lazyChildren().createCardMenus()})}function T(e,t,i){if("Series"!=t.Type)return void a("#seriesAirTime",e).hide();var r="";t.AirDays&&t.AirDays.length&&(r+=7==t.AirDays.length?"daily":t.AirDays.map(function(e){return e+"s"}).join(",")),t.AirTime&&(r+=" at "+t.AirTime),t.Studios.length&&(r+=i?" on "+t.Studios[0].Name:' on <a class="textlink" href="itemdetails.html?id='+t.Studios[0].Id+'">'+t.Studios[0].Name+"</a>"),r?(r=("Ended"==t.Status?"Aired ":"Airs ")+r,a("#seriesAirTime",e).show().html(r)):a("#seriesAirTime",e).hide()}function S(e,t){if(t.Tags&&t.Tags.length){var i="";i+="<p>"+Globalize.translate("HeaderTags")+"</p>";for(var r=0,n=t.Tags.length;n>r;r++)i+='<div class="itemTag">'+t.Tags[r]+"</div>";a(".itemTags",e).show().html(i)}else a(".itemTags",e).hide()}function M(e,t){return t=a.extend({},t),function(a,i,r){return t.StartIndex=a,t.Limit=i,t.Fields=r,ApiClient.getEpisodes(e,t)}}function P(e){return e=a.extend({},e),function(a,t,i){return e.StartIndex=a,e.Limit=t,e.Fields=i,ApiClient.getItems(Dashboard.getCurrentUserId(),e)}}function w(e,t,i,r){ia=null;var n="ItemCounts,AudioInfo,PrimaryImageAspectRatio,SyncInfo,CanDelete",s={ParentId:t.Id,Fields:n};"BoxSet"!==t.Type&&(s.SortBy="SortName");var o;"Series"==t.Type?o=ApiClient.getSeasons(t.Id,{userId:i.Id,Fields:n}):"Season"==t.Type?(o=ApiClient.getEpisodes(t.SeriesId,{seasonId:t.Id,userId:i.Id,Fields:n}),ia=M(t.SeriesId,{seasonId:t.Id,userId:i.Id,Fields:n})):"MusicAlbum"==t.Type&&(ia=P(s)),o=o||ApiClient.getItems(Dashboard.getCurrentUserId(),s),o.then(function(n){var s="",o=!1;"MusicAlbum"==t.Type?s=LibraryBrowser.getListViewHtml({items:n.Items,smallIcon:!0,showIndex:!0,index:"disc",showIndexNumber:!0,playFromHere:!0,defaultAction:"playallfromhere",lazy:!0}):"Series"==t.Type?(o=b(),s=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:v(),showTitle:!0,centerText:!0,lazy:!0,overlayPlayButton:!0})):"Season"==t.Type?s=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==t.Type&&t.IndexNumber,playFromHere:!0,overlayText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:AppInfo.enableAppLayouts}):"GameSystem"==t.Type&&(s=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0}));var l=e.querySelector(".childrenItemsContainer");if(l.innerHTML=s,ImageLoader.lazyChildren(l),o?l.classList.add("hiddenScrollX"):l.classList.remove("hiddenScrollX"),a(l).createCardMenus(),"BoxSet"==t.Type){var d=[{name:Globalize.translate("HeaderMovies"),type:"Movie"},{name:Globalize.translate("HeaderSeries"),type:"Series"},{name:Globalize.translate("HeaderAlbums"),type:"MusicAlbum"},{name:Globalize.translate("HeaderGames"),type:"Game"},{name:Globalize.translate("HeaderBooks"),type:"Book"}];z(e,t,d,n.Items,i,r)}}),e.querySelector("#childrenTitle").innerHTML=Globalize.translate("Season"==t.Type?"HeaderEpisodes":"Series"==t.Type?"HeaderSeasons":"MusicAlbum"==t.Type?"HeaderTracks":"GameSystem"==t.Type?"HeaderGames":"HeaderItems"),"MusicAlbum"==t.Type?a(".childrenSectionHeader",e).hide():a(".childrenSectionHeader",e).show()}function L(e,a){require("scripts/itembynamedetailpage".split(","),function(){window.ItemsByName.renderItems(e,a)})}function A(e,a){require("scripts/playlistedit".split(","),function(){PlaylistViewer.render(e,a)})}function D(e,a){require("scripts/livetvcomponents,scripts/livetvchannel,livetvcss".split(","),function(){LiveTvChannelPage.renderPrograms(e,a.Id)})}function z(e,t,i,r,n){e.querySelector(".collectionItems").innerHTML="";for(var s=0,o=i.length;o>s;s++){var l=i[s],d=r.filter(function(e){return e.Type==l.type});d.length&&B(e,t,l,d,n)}var c={name:Globalize.translate("HeaderOtherItems")},m=r.filter(function(e){return!i.filter(function(a){return a.type==e.Type}).length});m.length&&B(e,t,c,m,n),r.length||B(e,t,{name:Globalize.translate("HeaderItems")},r,n),a(".collectionItems .itemsContainer",e).createCardMenus()}function B(e,t,i,r,n,s){var o="";o+='<div class="detailSection">',o+="<h1>",o+="<span>"+i.name+"</span>",o+="</h1>",o+='<div class="detailSectionContent itemsContainer">';var l="MusicAlbum"==i.type?"detailPageSquare":"detailPagePortrait";o+=LibraryBrowser.getPosterViewHtml({items:r,shape:l,showTitle:!0,centerText:!0,context:s,lazy:!0,showDetailsMenu:!0,overlayMoreButton:!0,showAddToCollection:!1,showRemoveFromCollection:!0}),o+="</div>",o+="</div>";var d=e.querySelector(".collectionItems");a(d).append(o),ImageLoader.lazyChildren(d),a(d).off("removefromcollection").on("removefromcollection",function(a,i){G(e,t,[i],n,s)})}function G(e,a,t,i,r){Dashboard.showLoadingMsg();var n=ApiClient.getUrl("Collections/"+a.Id+"/Items",{Ids:t.join(",")});ApiClient.ajax({type:"DELETE",url:n}).then(function(){w(e,a,i,r),Dashboard.hideLoadingMsg()})}function R(e,t){a(".userDataIcons",e).html(LibraryBrowser.getUserDataIconsHtml(t,!0,"icon-button"))}function x(e,t,i){if("Movie"!=t.Type&&"Trailer"!=t.Type&&"MusicVideo"!=t.Type)return void a("#criticReviewsCollapsible",e).hide();var r={};i&&(r.limit=i),ApiClient.getCriticReviews(t.Id,r).then(function(r){r.TotalRecordCount||t.CriticRatingSummary||t.AwardSummary?(a("#criticReviewsCollapsible",e).show(),k(e,r,i)):a("#criticReviewsCollapsible",e).hide()})}function k(e,a,t){for(var i="",r=a.Items,n=0,s=r.length;s>n;n++){var o=r[n];i+='<div class="paperList criticReviewPaperList">',i+='<paper-icon-item style="padding-top:.5em;padding-bottom:.5em;">',null!=o.Score||null!=o.Likes&&(i+=o.Likes?"<paper-fab mini style=\"background-color:transparent;background-image:url('css/images/fresh.png');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>":"<paper-fab mini style=\"background-color:transparent;background-image:url('css/images/rotten.png');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>"),i+="<paper-item-body three-line>",i+='<div style="white-space:normal;">'+o.Caption+"</div>";var l=[];if(o.ReviewerName&&l.push(o.ReviewerName),o.Publisher&&l.push(o.Publisher),i+="<div secondary>"+l.join(", ")+".",o.Date)try{var d=parseISO8601Date(o.Date,{toLocal:!0}).toLocaleDateString();i+='<span class="reviewDate">'+d+"</span>"}catch(c){}i+="</div>",o.Url&&(i+='<div secondary><a class="textlink" href="'+o.Url+'" target="_blank">'+Globalize.translate("ButtonFullReview")+"</a></div>"),i+="</paper-item-body>",i+="</paper-icon-item>",i+="</div>"}t&&a.TotalRecordCount>t&&(i+='<p style="margin: 0;"><paper-button raised class="more moreCriticReviews">'+Globalize.translate("ButtonMore")+"</paper-button></p>");var m=e.querySelector("#criticReviewsContent");m.innerHTML=i,b()?m.classList.add("hiddenScrollX"):m.classList.remove("hiddenScrollX")}function F(e,a){ApiClient.getThemeMedia(Dashboard.getCurrentUserId(),a.Id,!0).then(function(t){var i=t.ThemeSongsResult.OwnerId==a.Id?t.ThemeSongsResult.Items:[],r=t.ThemeVideosResult.OwnerId==a.Id?t.ThemeVideosResult.Items:[];H(e,i),V(e,r),e.dispatchEvent(new CustomEvent("thememediadownload",{detail:{themeMediaResult:t},bubbles:!0}))})}function H(e,t){if(t.length){a("#themeSongsCollapsible",e).show();var i=LibraryBrowser.getListViewHtml({items:t,smallIcon:!0});e.querySelector("#themeSongsContent").innerHTML=i}else a("#themeSongsCollapsible",e).hide()}function V(e,t,i){t.length?(a("#themeVideosCollapsible",e).show(),a("#themeVideosContent",e).html(W(t,i)).lazyChildren()):a("#themeVideosCollapsible",e).hide()}function N(e,t,i){ApiClient.getItems(i.Id,{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"MusicVideo",Recursive:!0,Fields:"DateCreated,SyncInfo,CanDelete",Albums:t.Name}).then(function(t){t.Items.length?(a("#musicVideosCollapsible",e).show(),a("#musicVideosContent",e).html(W(t.Items,i)).lazyChildren()):a("#musicVideosCollapsible",e).hide()})}function U(e,t,i){ApiClient.getAdditionalVideoParts(i.Id,t.Id).then(function(t){t.Items.length?(a("#additionalPartsCollapsible",e).show(),a("#additionalPartsContent",e).html(W(t.Items,i)).lazyChildren()):a("#additionalPartsCollapsible",e).hide()})}function q(e,a,t,i,r){var n="",s=a.Chapters||[],o=LibraryBrowser.getPosterViewInfo().backdropWidth;b()?(n+='<div class="hiddenScrollX itemsContainer">',i=null):n+='<div class="itemsContainer">';for(var l=0,d=s.length;d>l&&!(i&&l>=i);l++){var c=s[l],m=c.Name||"Chapter "+l,u="Full"!=a.PlayAccess||r?"":' onclick="ItemDetailPage.play('+c.StartPositionTicks+');"';n+='<a class="card '+I()+'Card" href="#"'+u+">",n+='<div class="cardBox">',n+='<div class="cardScalable">';var p;p=c.ImageTag?ApiClient.getScaledImageUrl(a.Id,{maxWidth:o,tag:c.ImageTag,type:"Chapter",index:l}):"css/images/items/list/chapter.png",n+='<div class="cardPadder"></div>',n+='<div class="cardContent">',n+='<div class="cardImage lazy" data-src="'+p+'"></div>',n+='<div class="cardFooter">',n+='<div class="cardText">'+m+"</div>",n+='<div class="cardText">',n+=Dashboard.getDisplayTime(c.StartPositionTicks),n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</a>"}n+="</div>",i&&s.length>i&&(n+='<p style="margin: 0;"><paper-button raised class="more moreScenes">'+Globalize.translate("ButtonMore")+"</paper-button></p>");var h=e.querySelector("#scenesContent");h.innerHTML=n,ImageLoader.lazyChildren(h)}function E(e,a){var t=a.MediaSources.map(function(e){return O(a,e)}).join('<div style="border-top:1px solid #444;margin: 1em 0;"></div>');a.MediaSources.length>1&&(t="<br/>"+t);var i=e.querySelector("#mediaInfoContent");i.innerHTML=t}function O(e,a){var t="";a.Name&&e.MediaSources.length>1&&(t+='<div><span class="mediaInfoAttribute">'+a.Name+"</span></div><br/>");for(var i=0,r=a.MediaStreams.length;r>i;i++){var n=a.MediaStreams[i];if("Data"!=n.Type){t+='<div class="mediaInfoStream">';var s=Globalize.translate("MediaInfoStreamType"+n.Type);t+='<div class="mediaInfoStreamType">'+s+"</div>";var o=[];n.Language&&"Video"!=n.Type&&o.push(j(Globalize.translate("MediaInfoLanguage"),n.Language)),n.Codec&&o.push(j(Globalize.translate("MediaInfoCodec"),n.Codec.toUpperCase())),n.CodecTag&&o.push(j(Globalize.translate("MediaInfoCodecTag"),n.CodecTag)),null!=n.IsAVC&&o.push(j("AVC",n.IsAVC?"Yes":"No")),n.Profile&&o.push(j(Globalize.translate("MediaInfoProfile"),n.Profile)),n.Level&&o.push(j(Globalize.translate("MediaInfoLevel"),n.Level)),(n.Width||n.Height)&&o.push(j(Globalize.translate("MediaInfoResolution"),n.Width+"x"+n.Height)),n.AspectRatio&&"mjpeg"!=n.Codec&&o.push(j(Globalize.translate("MediaInfoAspectRatio"),n.AspectRatio)),"Video"==n.Type&&(null!=n.IsAnamorphic&&o.push(j(Globalize.translate("MediaInfoAnamorphic"),n.IsAnamorphic?"Yes":"No")),o.push(j(Globalize.translate("MediaInfoInterlaced"),n.IsInterlaced?"Yes":"No"))),(n.AverageFrameRate||n.RealFrameRate)&&o.push(j(Globalize.translate("MediaInfoFramerate"),n.AverageFrameRate||n.RealFrameRate)),n.ChannelLayout&&o.push(j(Globalize.translate("MediaInfoLayout"),n.ChannelLayout)),n.Channels&&o.push(j(Globalize.translate("MediaInfoChannels"),n.Channels+" ch")),n.BitRate&&"mjpeg"!=n.Codec&&o.push(j(Globalize.translate("MediaInfoBitrate"),parseInt(n.BitRate/1024)+" kbps")),n.SampleRate&&o.push(j(Globalize.translate("MediaInfoSampleRate"),n.SampleRate+" khz")),n.BitDepth&&o.push(j(Globalize.translate("MediaInfoBitDepth"),n.BitDepth+" bit")),n.PixelFormat&&o.push(j(Globalize.translate("MediaInfoPixelFormat"),n.PixelFormat)),n.RefFrames&&o.push(j(Globalize.translate("MediaInfoRefFrames"),n.RefFrames)),n.NalLengthSize&&o.push(j("NAL",n.NalLengthSize)),"Video"!=n.Type&&o.push(j(Globalize.translate("MediaInfoDefault"),n.IsDefault?"Yes":"No")),"Subtitle"==n.Type&&(o.push(j(Globalize.translate("MediaInfoForced"),n.IsForced?"Yes":"No")),o.push(j(Globalize.translate("MediaInfoExternal"),n.IsExternal?"Yes":"No"))),"Video"==n.Type&&a.Timestamp&&o.push(j(Globalize.translate("MediaInfoTimestamp"),a.Timestamp)),t+=o.join("<br/>"),t+="</div>"}}if(a.Container&&(t+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoContainer")+'</span><span class="mediaInfoAttribute">'+a.Container+"</span></div>"),a.Formats&&a.Formats.length,a.Path&&"Http"!=a.Protocol&&(t+='<div style="max-width:600px;overflow:hidden;"><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoPath")+'</span><span class="mediaInfoAttribute">'+a.Path+"</span></div>"),a.Size){var l=(a.Size/1048576).toFixed(0);t+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoSize")+'</span><span class="mediaInfoAttribute">'+l+" MB</span></div>"}return t}function j(e,a){return'<span class="mediaInfoLabel">'+e+'</span><span class="mediaInfoAttribute">'+a+"</span>"}function W(e,a,t,i){for(var r="",n=LibraryBrowser.getPosterViewInfo().backdropWidth,s=0,o=e.length;o>s&&!(t&&s>=t);s++){var l=e[s],d="card detailPage169Card",c="itemdetails.html?id="+l.Id,m="Full"==l.PlayAccess?" onclick=\"MediaController.play('"+l.Id+"'); return false;\"":"";r+='<a class="'+d+'" href="'+c+'"'+m+">",r+='<div class="cardBox">',r+='<div class="cardScalable">';var u,p=l.ImageTags||{};u=p.Primary?ApiClient.getScaledImageUrl(l.Id,{maxWidth:n,tag:p.Primary,type:"primary"}):"css/images/items/detail/video.png",r+='<div class="cardPadder"></div>',r+='<div class="cardContent">',r+='<div class="cardImage lazy" data-src="'+u+'"></div>',r+='<div class="cardFooter">',r+='<div class="cardText">'+l.Name+"</div>",r+='<div class="cardText">',r+=""!=l.RunTimeTicks?Dashboard.getDisplayTime(l.RunTimeTicks):"&nbsp;",r+="</div>",r+="</div>",r+="</div>",r+="</div>",r+="</div>",r+="</a>"}return t&&e.length>t&&(r+='<p style="margin: 0;padding-left:5px;"><paper-button raised class="more '+i+'">'+Globalize.translate("ButtonMore")+"</paper-button></p>"),r}function X(e,a,t,i){ApiClient.getSpecialFeatures(t.Id,a.Id).then(function(a){var r=e.querySelector("#specialsContent");r.innerHTML=W(a,t,i,"moreSpecials"),ImageLoader.lazyChildren(r)})}function Y(e,a,t,i,r){if(b())return void K(e,a,t,r);for(var n="",s=a.People||[],o=0,l=s.length;l>o&&!(i&&o>=i);o++){var d=s[o],c=r?"#":"itemdetails.html?id="+d.Id;n+='<a class="tileItem smallPosterTileItem" href="'+c+'">';var m,u=!0;d.PrimaryImageTag?m=ApiClient.getScaledImageUrl(d.Id,{maxWidth:100,tag:d.PrimaryImageTag,type:"primary",minScale:2}):(m="css/images/items/list/person.png",u=!1),n+=u?'<div class="tileImage lazy" data-src="'+m+'"></div>':'<div class="tileImage" style="background-image:url(\''+m+"');\"></div>",n+='<div class="tileContent">',n+="<p>"+d.Name+"</p>";var p=d.Role?Globalize.translate("ValueAsRole",d.Role):d.Type;"GuestStar"==p&&(p=Globalize.translate("ValueGuestStar")),p=p||"";var h=40;p.length>h&&(p=p.substring(0,h-3)+"..."),n+="<p>"+p+"</p>",n+="</div>",n+="</a>"}i&&s.length>i&&(n+='<p style="margin: 0;padding-left:5px;"><paper-button raised class="more morePeople">'+Globalize.translate("ButtonMore")+"</paper-button></p>");var g=e.querySelector("#castContent");g.innerHTML=n,ImageLoader.lazyChildren(g)}function K(e,a,t,i){var r="";r+=b()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">';var n=a.People||[];n=n.filter(function(e){return e.PrimaryImageTag}),n.length||(n=a.People||[]);for(var s=0,o=n.length;o>s;s++){var l=n[s],d=i?"#":"itemdetails.html?id="+l.Id;r+='<div class="card '+v()+'Card">',r+='<div class="cardBox">',r+='<div class="cardScalable">';var c,m=!0;l.PrimaryImageTag?c=ApiClient.getScaledImageUrl(l.Id,{maxWidth:100,tag:l.PrimaryImageTag,type:"primary",minScale:2}):(c="css/images/items/list/person.png",m=!1),r+='<div class="cardPadder"></div>',r+='<a class="cardContent" href="'+d+'">',r+=m?'<div class="cardImage coveredCardImage lazy" data-src="'+c+'"></div>':'<div class="cardImage coveredCardImage" style="background-image:url(\''+c+"');\"></div>",r+="</div>",r+="</a>",r+="</div>",r+='<div class="cardFooter outerCardFooter">',r+='<div class="cardText">'+l.Name+"</div>",r+='<div class="cardText">';var u=l.Role?Globalize.translate("ValueAsRole",l.Role):l.Type;"GuestStar"==u&&(u=Globalize.translate("ValueGuestStar")),u=u||"";var p=40;u.length>p&&(u=u.substring(0,p-3)+"..."),r+=u,r+="</div>",r+="</div>",r+="</div>"}r+="</div>";var h=e.querySelector("#castContent");h.innerHTML=r,ImageLoader.lazyChildren(h)}function _(e){MediaController.play({items:[ta],startPositionTicks:e})}function Q(e){var a=getParameterByName("id");require(["confirm"],function(t){t("Are you sure you wish to split the media sources into separate items?","Split Media Apart").then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Videos/"+a+"/AlternateSources")}).then(function(){Dashboard.hideLoadingMsg(),i(e)})})})}function J(){ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),ta.Id).then(function(e){MediaController.play({items:e})})}function Z(e,a){ta&&ta.Id==a&&("Recording"==ta.Type?LibraryBrowser.showTab("livetv.html",3):Dashboard.navigate("home.html"))}function $(e){if("Program"==ta.Type)return void ApiClient.getLiveTvChannel(ta.ChannelId,Dashboard.getCurrentUserId()).then(function(e){LibraryBrowser.showPlayMenu(null,e.Id,e.Type,!1,e.MediaType,(e.UserData||{}).PlaybackPositionTicks)});var a=ta.UserData||{},t=ta.MediaType;("MusicArtist"==ta.Type||"MusicAlbum"==ta.Type)&&(t="Audio"),LibraryBrowser.showPlayMenu(e,ta.Id,ta.Type,ta.IsFolder,t,a.PlaybackPositionTicks)}function ea(e,a){require(["confirm"],function(t){t(Globalize.translate("MessageConfirmRecordingCancellation"),Globalize.translate("HeaderConfirmRecordingCancellation")).then(function(){Dashboard.showLoadingMsg(),ApiClient.cancelLiveTvTimer(a).then(function(){require(["toast"],function(e){e(Globalize.translate("MessageRecordingCancelled"))}),i(e)})})})}function aa(){var e=this;e.play=_,e.setInitialCollapsibleState=m,e.renderDetails=u,e.renderCriticReviews=x,e.renderCast=Y,e.renderScenes=q,e.renderMediaSources=E}var ta;a.fn.lazyChildren=function(){for(var e=0,a=this.length;a>e;e++)ImageLoader.lazyChildren(this[e]);return this};var ia=null;pageIdOn("pageinit","itemDetailPage",function(){var e=this;a(".btnPlay",e).on("click",function(){$(this)}),a(".btnPlayTrailer",e).on("click",function(){J(e)}),a(".btnSplitVersions",e).on("click",function(){Q(e)}),a(".btnSync",e).on("click",function(){require(["syncDialog"],function(e){e.showMenu({items:[ta]})})}),a(".btnRecord,.btnFloatingRecord",e).on("click",function(){var a=getParameterByName("id");require(["components/recordingcreator/recordingcreator"],function(t){t.show(a).then(function(){i(e)})})}),a(".btnCancelRecording",e).on("click",function(){ea(e,ta.TimerId)}),a(".btnMoreCommands",e).on("click",function(){var e=this;Dashboard.getCurrentUser().then(function(a){LibraryBrowser.showMoreCommands(e,ta.Id,LibraryBrowser.getMoreCommands(ta,a))})}),a(".childrenItemsContainer",e).on("playallfromhere",function(e,a){LibraryBrowser.playAllFromHere(ia,a)}).on("queueallfromhere",function(e,a){LibraryBrowser.queueAllFromHere(ia,a)}),a(e).on("click",".moreScenes",function(){Dashboard.getCurrentUser().then(function(a){q(e,ta,a)})}).on("click",".morePeople",function(){Y(e,ta,d(ta))}).on("click",".moreSpecials",function(){Dashboard.getCurrentUser().then(function(a){X(e,ta,a)})}).on("click",".moreCriticReviews",function(){x(e,ta)})}),pageIdOn("pagebeforeshow","itemDetailPage",function(){var e=this;i(e),Events.on(ApiClient,"websocketmessage",o),Events.on(LibraryBrowser,"itemdeleting",Z)}),pageIdOn("pagebeforehide","itemDetailPage",function(){Events.off(LibraryBrowser,"itemdeleting",Z),ta=null;Events.off(ApiClient,"websocketmessage",o),LibraryMenu.setTransparentMenu(!1)
}),window.ItemDetailPage=new aa});