cordova.define("org.nypr.cordova.vlcplugin.AudioPlayer",function(o,e,t){var i=o("cordova/exec"),n=function(){};n.prototype.configure=function(o,e){i(o,e,"AudioPlayerPlugin","init",[])},n.prototype.getaudiostate=function(o,e){i(o,e,"AudioPlayerPlugin","getaudiostate",[])},n.prototype.playstream=function(o,e,t,n,u){i(o,e,"AudioPlayerPlugin","playstream",[t,n,u])},n.prototype.playfile=function(o,e,t,n,u,p){i(o,e,"AudioPlayerPlugin","playfile",[t,n,u,p])},n.prototype.pause=function(o,e){i(o,e,"AudioPlayerPlugin","pause",[])},n.prototype.stop=function(o,e){i(o,e,"AudioPlayerPlugin","stop",[])},n.prototype.setaudioinfo=function(o,e,t){i(o,e,"AudioPlayerPlugin","setaudioinfo",t)},n.prototype.seek=function(o,e,t){i(o,e,"AudioPlayerPlugin","seek",[t])},n.prototype.seekto=function(o,e,t){i(o,e,"AudioPlayerPlugin","seekto",[t])},t.exports=new n});