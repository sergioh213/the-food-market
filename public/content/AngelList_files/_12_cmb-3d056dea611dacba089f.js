webpackJsonp([29],{857:function(t,n,r){var e=function(t,n){return function(){return t.apply(n,arguments)}},o=function(t,n){function r(){this.constructor=t}for(var e in n)u.call(n,e)&&(t[e]=n[e]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},u={}.hasOwnProperty;t.exports=Promise.all([new Promise(function(t){t()}).then(r.bind(null,106)),new Promise(function(t){t()}).then(r.bind(null,33))]).then(function(){return function(t,n){var r;return r=function(t){function r(){return this.toSyncData=e(this.toSyncData,this),r.__super__.constructor.apply(this,arguments)}return o(r,t),r.prototype.parse=function(t,r){var e;return e=n.result(this,"prefix"),null!=t&&null!=t[e]?t[e]:t},r.prototype.sync=function(t,e,o){var u;return o=n.clone(o),this.trigger("presync",t,e,o),null==o.data&&null!=(u=e.toSyncData(o.attrs||e.toJSON(o),t,o))&&("create"===t||"update"===t||"patch"===t||"delete"===t?(o.contentType||(o.contentType="application/json"),o.data=JSON.stringify(u)):o.data=u),"patch"===t&&(t="update"),r.__super__.sync.call(this,t,e,o)},r.prototype.toSyncData=function(t,r,e){var o,u;return u=n.result(this,"prefix"),o=n.extend({},e.parameters),"create"!==r&&"update"!==r&&"patch"!==r||o[u]||(o[u]=t),n.isEmpty(o)&&(o=null),o},r}(t.Model),function(t){var n;return n=t.replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase(),function(e){function u(){return u.__super__.constructor.apply(this,arguments)}return o(u,r),u.toString=function(){return t},u.prototype.urlRoot="/"+n+"s",u.prototype.prefix=function(){return n},u}()}}.apply(void 0,arguments[0])}.bind(this))}});