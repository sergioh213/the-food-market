webpackJsonp([111],{1118:function(t,e,n){var o=function(t,e){return function(){return t.apply(e,arguments)}},a=function(t,e){function n(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty;t.exports=Promise.all([new Promise(function(t){t()}).then(n.bind(null,2)),new Promise(function(t){t()}).then(n.bind(null,106)),n.e(167).then(n.bind(null,1191)),new Promise(function(t){t()}).then(n.bind(null,33)),n.e(42).then(n.bind(null,870)),n.e(26).then(n.bind(null,844)),n.e(30).then(n.bind(null,854)),n.e(35).then(n.bind(null,858)),new Promise(function(t){t()}).then(n.bind(null,57)),new Promise(function(t){t()}).then(n.bind(null,164))]).then(function(){return function(t,e,n,i,s,r,c,d,h){var l;return l=i.extend({},e.Events),{show_edge:function(s,c){return new(function(e){function c(){return this._onClose=o(this._onClose,this),this._onRequestIntro=o(this._onRequestIntro,this),c.__super__.constructor.apply(this,arguments)}return a(c,e),c.prototype.tpl=s(".js-metadata-row-template").html(),c.prototype.events={"change .js-context-select":"_onContextSelect","change .js-relationship-select":"_onRelationshipSelect","click .js-add-metadatas":"_onAddMetadatas","click .js-remove-metadata":"_onRemoveMetadata","click .js-confirm-metadata":"_onConfirmMetadata","click .js-unconfirm-metadata":"_onRemoveMetadata","click .js-request-intro":"_onRequestIntro","click .js-close":"_onClose","click .js-undo":"_onUndo","click .js-disconnect":"_onDisconnect","click .js-cancel-metadata":"_onCancelMetadata","click .js-next":"_onClickNext"},c.prototype.initialize=function(){var t,e,n,o,a,i,s,c;for(this.source=this.$el.data("source"),this.neighbor_id=this.$el.data("neighborId"),this.neighbor_first_name=this.$el.data("neighborFirstName"),this.user_graph_request_id=this.$el.data("userGraphRequestId"),r.track("UserGraph.MetadataShow",{source:this.source,neighbor_id:this.neighbor_id}),this.$el.data("track_guesses")&&r.track("UserGraph.NumGuesses",{source:this.source,neighbor_id:this.neighbor_id,num_guesses:this.$el.data("metadata").length}),this.metadata={},t=0,n=(i=this.$el.data("metadata")).length;t<n;t++)a=i[t],this._addMetadataRow(a);for(this.context_map=this.$(".js-add-metadata-container").data("context_map"),this.$(".js-loading-container").hide(),this.$(".js-show-edge-container").show(),this.$(".js-disconnect").magnificPopup({type:"ajax"}),this.freeform_relationships=["co-worker","collaborator","classmate","mentor","mentee","advisor","advisee","manager","employee"],e=0,o=(s=this.freeform_relationships).length;e<o;e++)c=s[e],this.context_map[c]||(this.context_map[c]=[]);return this.context_free_relationships=["family","friend","acquaintance"],this.$(".tiptip, .js-pending-button").qtip()},c.prototype._addMetadataRow=function(t){return this.metadata[t.id]=t,this.$(".js-existing-metadata-container").append(n.render(this.tpl,t))},c.prototype._onAddMetadatas=function(){return this.$(".js-add-metadatas-button-container").hide(),this.$(".js-add-metadatas-container").show(),r.track("UserGraph.ShowAddMetadata",{source:this.source,neighbor_id:this.neighbor_id})},c.prototype._onRelationshipSelect=function(){var t;return t=this.$(".js-relationship-select").val(),this.context_free_relationships.indexOf(t)>-1?(this.$(".js-context-autocomplete-container").empty().hide(),this.$(".js-context-select-container").addClass("u-hidden"),this.$(".js-context-select-at").addClass("u-hidden"),void this._onAddMetadata()):(0===this.$(".js-context-select-container").length?this._showAutocompleteContext():(this._refreshContextSelect(t),this.$(".js-context-select-container").removeClass("u-hidden"),this.$(".js-context-select-at").removeClass("u-hidden")),r.track("UserGraph.SelectRelationship",{source:this.source,neighbor_id:this.neighbor_id,relationship:t}))},c.prototype._onContextSelect=function(){var t;return t=this.$(".js-context-select").val(),r.track("UserGraph.SelectContext",{source:this.source,neighbor_id:this.neighbor_id,context:t}),"other"===t?this._showAutocompleteContext():(this.$(".js-context-autocomplete-container").empty().hide(),this._onAddMetadata())},c.prototype._showAutocompleteContext=function(){var e,n,o,a;return this.$(".js-context-autocomplete-container").empty().removeClass("u-hidden"),o=t("<input>",{type:"text",class:"js-context-autocomplete context-autocomplete"}),this.$(".js-context-autocomplete-container").append(o),"classmate"!==(a=this.$(".js-relationship-select").val())?(n="Startup",o.attr("placeholder","Type company name"),e=new d.TypedAutocomplete({el:o,types:["Startup"]})):"classmate"===a&&(n="NewTag",o.attr("placeholder","Type college name"),e=new d.TagAutocomplete({el:o,tag_type:"CollegeTag"})),this.listenTo(e,"select",function(t){return function(e){var o;return o="NewTag"===n?e.tag.id:e.id,t._onAddMetadata(o,n)}}(this)),this.$(".js-context-autocomplete").focus()},c.prototype._refreshContextSelect=function(e){var n,o,a,i,s;if(this.$(".js-context-select").empty(),this.context_map[e].length>0){for(this.$(".js-context-select").append(t("<option>",{value:"",disabled:!0}).text("Choose One")),o=0,a=(s=this.context_map[e]).length;o<a;o++)i=(n=s[o]).name.length>25?n.name.slice(0,23)+"...":n.name,this.$(".js-context-select").append(t("<option>",{value:n.id,title:n.name}).text(i));this.$(".js-context-select").val("")}if(!(this.freeform_relationships.indexOf(e)>-1&&(this.$(".js-context-select").append(t("<option>",{value:"other"}).text("Other")),0===this.context_map[e].length)))return this.$(".js-context-autocomplete-container").empty().addClass("u-hidden");this._showAutocompleteContext()},c.prototype._refreshRelationshipSelect=function(){if(i.keys(this.context_map).length)return this.$(".js-relationship-select").val(i.keys(this.context_map)[0]),this._onRelationshipSelect()},c.prototype._onAddMetadata=function(e,n){var o,a,i;if(a=this.$(".js-relationship-select").val()){if(this.context_free_relationships.indexOf(a)>-1)e=null,n=null;else if(!n){if("other"===(o=this.$(".js-context-select").val()))return;if(!o)return;i=o.indexOf("_"),e=o.slice(0,i),n=o.slice(i+1)}if(e&&n||this.context_free_relationships.indexOf(a)>-1)return s(".js-errors-container").slideUp(),this.$(".js-add-metadata-container").hide(),this.$(".js-add-metadata-loading-container").show(),t.ajax({url:this.$(".js-add-metadata-container").data("add_url"),type:"POST",data:{"user_graph_edge_metadata[context_id]":e,"user_graph_edge_metadata[context_type]":n,"user_graph_edge_metadata[relationship]":a,"user_graph_edge_metadata[user_graph_edge_id]":this.$(".js-add-metadata-container").data("user_graph_edge_id")},success:function(t){return function(e){return t.metadata[e.id]||t._addMetadataRow(e),t.$(".js-existing-metadata-container").animate({scrollTop:t.$(".js-metadata-container").last().offset().top}),t.$(".js-add-metadata-loading-container").hide(),t.$(".js-add-metadata-container").show(),t.$(".js-context-autocomplete-container").empty().addClass("u-hidden"),t.$(".js-context-select-container").addClass("u-hidden"),t.$(".js-context-select-at").addClass("u-hidden"),t.$(".js-relationship-select").val(""),r.track("UserGraph.AddMetadata",{source:t.source,neighbor_id:t.neighbor_id,relationship:a,context_type:n})}}(this)})}},c.prototype._onRemoveMetadata=function(e){var n,o;return(o=t(e.target).parents(".js-metadata-container")).find(".js-metadata-content").empty().append(t(this.$(".js-loading-container")[0]).clone().show()),n=this.metadata[o.data("id")],s(".js-errors-container").slideUp(),t.ajax({url:o.data("remove_url"),type:"POST",success:function(t){return function(e){return o.slideUp(300,function(){return o.remove()}),delete t.metadata[n.id],r.track("UserGraph.RemoveMetadata",{source:t.source,neighbor_id:n.neighbor_id,relationship:n.relationship,context_type:n.context_type,guessed:n.guessed,is_inviter:n.is_inviter})}}(this)})},c.prototype._onConfirmMetadata=function(e,o){var a;return o||(o=t(e.target).parents(".js-metadata-container")),o.find(".js-metadata-content").empty().append(t(this.$(".js-loading-container")[0]).clone().show()),a=this.metadata[o.data("id")],t.ajax({url:o.data("confirm_url"),type:"POST",success:function(t){return function(e){return o.empty().append(n.render(t.tpl,e.metadata))}}(this)},r.track("UserGraph.ConfirmMetadata",{source:this.source,neighbor_id:a.neighbor_id,relationship:a.relationship,context_type:a.context_type,guessed:a.guessed,is_inviter:a.is_inviter}))},c.prototype._onCancelMetadata=function(){return this.$(".js-context-select-container").addClass("u-hidden"),this.$(".js-context-select-at").addClass("u-hidden"),this.$(".js-relationship-select").val("")},c.prototype._onRequestIntro=function(e){return this.$(".js-undo").length>0&&this.$(".js-undo").click(),t.magnificPopup.close()},c.prototype._onClose=function(e){var n;return this._onAddMetadata(),this.$(".js-close").data("modal")?(t.magnificPopup.close(),n=!0,l.trigger("close_graph_modal",{neighbor_id:this.neighbor_id,connected:n}),l.trigger("user_graph_update")):window.location=this.$(".js-close").data("url")},c.prototype._onUndo=function(e){return t.post(t(e.target).data("href")),r.track("UserGraph.ConnectUndo",{source:this.source,neighbor_id:this.neighbor_id}),l.trigger("user_graph_update"),!1,l.trigger("close_graph_modal",{neighbor_id:this.neighbor_id,connected:!1}),t.magnificPopup.close()},c.prototype._onClickNext=function(){var e;if(l.trigger("intro_clicked_next"),l.trigger("close_graph_modal",{neighbor_id:this.neighbor_id}),t.magnificPopup.close(),e=this.$(".js-metadata-container[data-show_confirm=false]").length>0,("message_button"===this.source||"people_message_button"===this.source)&&e)return t.facybox({ajax:s(".js-next").data("href")})},c}(e.View))({el:c})},disconnect_edge:function(n,o){return new(function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return a(o,e),o.prototype.events={"click .js-disconnect":"_onDisconnect","click .js-cancel":"_onCancel"},o.prototype.initialize=function(){return this.neighbor_id=this.$el.data("neighborId"),this.source=this.$el.data("source"),this.modal=this.$el.data("modal")},o.prototype._onCancel=function(e){return r.track("UserGraph.DisconnectCancel",{source:this.source,neighbor_id:this.neighbor_id}),t.magnificPopup.close()},o.prototype._onDisconnect=function(e){if(t.ajax({url:n(".js-disconnect").data("href"),method:"DELETE",success:function(t){return function(e){return r.track("UserGraph.Disconnect",{source:t.source,neighbor_id:t.neighbor_id}),l.trigger("user_graph_update")}}(this)}),t.magnificPopup.close(),c("You are now disconnected."),!this.modal)return window.location.href="/"},o}(e.View))({el:o})},connections_index:function(e,n){return e(".js-more-button").click(function(){return t(this).hide(),e(".js-card-row").show()})},events:function(){return l}}}.apply(void 0,arguments[0])}.bind(this))}});