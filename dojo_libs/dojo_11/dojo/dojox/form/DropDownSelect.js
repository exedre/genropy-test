/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dojox.form.DropDownSelect"]){
dojo._hasResource["dojox.form.DropDownSelect"]=true;
dojo.provide("dojox.form.DropDownSelect");
dojo.require("dijit.form.Button");
dojo.require("dijit.Menu");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.declare("dojox.form.DropDownSelect",dijit.form.DropDownButton,{baseClass:"dojoxDropDownSelect",options:null,emptyLabel:"",_isPopulated:false,_addMenuItem:function(_1){
var _2=this.dropDown;
if(!_1.value){
_2.addChild(new dijit.MenuSeparator());
}else{
var _3=dojo.hitch(this,"setAttribute","value",_1);
var mi=new dijit.MenuItem({id:this.id+"_item_"+_1.value,label:_1.label,onClick:_3});
_2.addChild(mi);
}
},_resetButtonState:function(){
var _5=this.options.length;
var _6=this.dropDown;
dojo.forEach(_6.getChildren(),function(_7){
_7.destroyRecursive();
});
this._isPopulated=false;
this.setAttribute("readOnly",(_5===1));
this.setAttribute("disabled",(_5===0));
this.setAttribute("value",this.value);
},_updateSelectedState:function(){
var _8=this.value;
if(_8){
var _9=this.id+"_item_"+_8;
dojo.forEach(this.dropDown.getChildren(),function(_a){
dojo[_a.id===_9?"addClass":"removeClass"](_a.domNode,this.baseClass+"SelectedOption");
},this);
}
},addOption:function(_b,_c){
this.options.push(_b.value?_b:{value:_b,label:_c});
},removeOption:function(_d){
this.options=dojo.filter(this.options,function(_e,_f){
return !((typeof _d==="number"&&_f===_d)||(typeof _d==="string"&&_e.value===_d)||(_d.value&&_e.value===_d.value));
});
},setOptionLabel:function(_10,_11){
dojo.forEach(this.options,function(_12){
if(_12.value===_10){
_12.label=_11;
}
});
},destroy:function(){
if(this._labelHackHandle){
clearTimeout(this._labelHackHandle);
}
this.inherited(arguments);
},setLabel:function(_13){
_13="<div class=\" "+this.baseClass+"Label\">"+_13+"</div>";
if(this._labelHackHandle){
clearTimeout(this._labelHackHandle);
}
if(dojo.isFF===2){
this._labelHackHandle=setTimeout(dojo.hitch(this,function(){
this._labelHackHandle=null;
dijit.form.DropDownButton.prototype.setLabel.call(this,_13);
}),0);
}else{
this.inherited(arguments);
}
},setAttribute:function(_14,_15){
if(_14==="value"){
if(typeof _15==="string"){
_15=dojo.filter(this.options,function(_16){
return _16.value===_15;
})[0];
}
if(!_15){
_15=this.options[0]||{value:"",label:""};
}
this.value=_15.value;
if(this._started){
this.setLabel(_15.label||this.emptyLabel||"&nbsp;");
}
this._handleOnChange(_15.value);
_15=this.value;
}else{
this.inherited(arguments);
}
},_fillContent:function(){
var _17=this.options;
if(!_17){
_17=this.options=this.srcNodeRef?dojo.query(">",this.srcNodeRef).map(function(_18){
if(_18.getAttribute("type")==="separator"){
return {value:"",label:""};
}
return {value:_18.getAttribute("value"),label:String(_18.innerHTML)};
},this):[];
}
if(_17.length&&!this.value){
var si=this.srcNodeRef.selectedIndex;
this.value=_17[si!=-1?si:0].value;
}
this.dropDown=new dijit.Menu();
},postCreate:function(){
this.inherited(arguments);
var fx=function(){
dojo[this._opened?"addClass":"removeClass"](this.focusNode,this.baseClass+"ButtonOpened");
};
this.connect(this,"_openDropDown",fx);
this.connect(this,"_closeDropDown",fx);
this.connect(this,"onChange","_updateSelectedState");
this.connect(this,"addOption","_resetButtonState");
this.connect(this,"removeOption","_resetButtonState");
this.connect(this,"setOptionLabel","_resetButtonState");
},startup:function(){
this.inherited(arguments);
if(dojo.isFF===2){
setTimeout(dojo.hitch(this,this._resetButtonState),0);
}else{
this._resetButtonState();
}
},_populate:function(_1b){
var _1c=this.dropDown;
dojo.forEach(this.options,this._addMenuItem,this);
this._updateSelectedState();
dojo.addClass(this.dropDown.domNode,this.baseClass+"Menu");
this._isPopulated=true;
if(_1b){
_1b.call(this);
}
},_toggleDropDown:function(){
var _1d=this.dropDown;
if(_1d&&!_1d.isShowingNow&&!this._isPopulated){
this._populate(dojox.form.DropDownSelect.superclass._toggleDropDown);
}else{
this.inherited(arguments);
}
}});
}
