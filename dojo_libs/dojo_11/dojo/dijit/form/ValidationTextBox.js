/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dijit.form.ValidationTextBox"]){
dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.require("dojo.i18n");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.Tooltip");
dojo.requireLocalization("dijit.form","validate",null,"ar,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ru,sv,tr,ROOT,zh,zh-tw");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:"<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\n\tid=\"widget_${id}\"\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\" waiRole=\"presentation\"\n\t><div style=\"overflow:hidden;\"\n\t\t><div class=\"dijitReset dijitValidationIcon\"><br></div\n\t\t><div class=\"dijitReset dijitValidationIconText\">&Chi;</div\n\t\t><div class=\"dijitReset dijitInputField\"\n\t\t\t><input class=\"dijitReset\" dojoAttachPoint='textbox,focusNode' dojoAttachEvent='onfocus:_update,onkeyup:_onkeyup,onblur:_onMouse,onkeypress:_onKeyPress' autocomplete=\"off\"\n\t\t\ttype='${type}' name='${name}'\n\t\t/></div\n\t></div\n></div>\n",baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(_1){
return this.regExp;
},state:"",tooltipPosition:[],setValue:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_2,_3){
return (new RegExp("^("+this.regExpGen(_3)+")"+(this.required?"":"?")+"$")).test(_2)&&(!this.required||!this._isEmpty(_2))&&(this._isEmpty(_2)||this.parse(_2,_3)!==undefined);
},isValid:function(_4){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_5){
return /^\s*$/.test(_5);
},getErrorMessage:function(_6){
return this.invalidMessage;
},getPromptMessage:function(_7){
return this.promptMessage;
},validate:function(_8){
var _9="";
var _a=this.isValid(_8);
var _b=this._isEmpty(this.textbox.value);
this.state=(_a||(!this._hasBeenBlurred&&_b))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",_a?"false":"true");
if(_8){
if(_b){
_9=this.getPromptMessage(true);
}
if(!_9&&this.state=="Error"){
_9=this.getErrorMessage(true);
}
}
this.displayMessage(_9);
return _a;
},_message:"",displayMessage:function(_c){
if(this._message==_c){
return;
}
this._message=_c;
dijit.hideTooltip(this.domNode);
if(_c){
dijit.showTooltip(_c,this.domNode,this.tooltipPosition);
}
},_refreshState:function(){
this.validate(this._focused);
},_update:function(e){
this._refreshState();
this._onMouse(e);
},_onkeyup:function(e){
this._update(e);
this.onkeyup(e);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
var p=this.regExpGen(this.constraints);
this.regExp=p;
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(val,_11){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.getValue());
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},setAttribute:function(_13,_14){
this.inherited(arguments);
switch(_13){
case "disabled":
if(this.valueNode){
this.valueNode.disabled=this.disabled;
}
}
},postCreate:function(){
var _15=this.textbox;
var _16=(this.valueNode=dojo.doc.createElement("input"));
_16.setAttribute("type",_15.type);
_16.setAttribute("value",this.toString());
dojo.style(_16,"display","none");
_16.name=this.textbox.name;
_16.disabled=this.textbox.disabled;
this.textbox.name=this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(_16,_15,"after");
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(_17,_18){
return _17-_18;
},rangeCheck:function(_19,_1a){
var _1b="min" in _1a;
var _1c="max" in _1a;
if(_1b||_1c){
return (!_1b||this.compare(_19,_1a.min)>=0)&&(!_1c||this.compare(_19,_1a.max)<=0);
}
return true;
},isInRange:function(_1d){
return this.rangeCheck(this.getValue(),this.constraints);
},isValid:function(_1e){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_1e));
},getErrorMessage:function(_1f){
if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(_1f)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},postCreate:function(){
this.inherited(arguments);
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}
},setValue:function(_20,_21){
dijit.setWaiState(this.focusNode,"valuenow",_20);
this.inherited("setValue",arguments);
}});
}
