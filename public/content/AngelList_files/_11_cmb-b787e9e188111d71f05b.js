webpackJsonp([83],{1094:function(t,e,r){var n={}.hasOwnProperty;t.exports=Promise.all([r.e(29).then(r.bind(null,857)),r.e(28).then(r.bind(null,853)),r.e(67).then(r.bind(null,990))]).then(function(){return function(t,e,r){return function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return function(t,e){function r(){this.constructor=t}for(var o in e)n.call(e,o)&&(t[o]=e[o]);r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype}(o,t("User")),o.prototype.urlRoot="/profiles",o.prototype.toSyncData=function(t,e,r){return r.parameters||(r.parameters={}),r.parameters.use_status_codes=1,o.__super__.toSyncData.apply(this,arguments)},o.prototype.autocomplete_parameters=function(){return{tag_type:"PeopleTag"}},o.prototype.set_autocomplete_data=function(t){return this.set({id:t.tag.follower_id,name:t.tag.name,slug_url:t.tag.slug_url,avatar:t.tag.pic})},o.prototype.autocomplete=function(t){return new r(t,{selectCallback:function(t){return function(e){return t.set({id:e.id,name:e.name,slug_url:e.item.slug_url,avatar:e.item.pic}),t.trigger("autocomplete",e)}}(this),queryOptions:{tag_type:"PeopleTag"},tags:!0})},o}()}.apply(void 0,arguments[0])}.bind(this))}});