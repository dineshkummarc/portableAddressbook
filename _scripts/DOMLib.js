function ExtendedDOMElement(element,recursive,strongattr){
 if(element.nodeType!=1||element.SetAttributes)
  return element;
 element.SetAttributes = function(attributesarray){
  for(var i in attributesarray)
   this.setAttribute(attributesarray[i][0],attributesarray[i][1]);
 }
 element.AppendChilds = function(objectsarray){
  for(var i in objectsarray)
   if(element.ownerDocument==objectsarray[i].ownerDocument)
    this.appendChild(objectsarray[i]);
 }
 element.Drop = function(){
  this.parentNode.removeChild(this);
 }
 element.ReplaceBy = function(newelement){
  return this.parentNode.replaceChild(newelement,this);
 }
 element.Clear = function(){
  while(this.childNodes.length>0)
   this.removeChild(this.firstChild);
 }
 element.ReWriteAttributes=function(){
  for(var i in this.attributes)
   if(this.attributes[i].nodeType==2)
    this.setAttribute(this.attributes[i].name,this.attributes[i].value);
 }
 element.getChildElementsByTagName = function(TagName){
  elements = new Array();
  for(var i=0; i<this.childNodes.length; i++)
   if(this.childNodes[i].tagName==TagName)
    elements[elements.length]=this.childNodes[i];
  if(elements.length==0)
   return false;
  else
   return elements;
 }
 element.UpdateChilds = function(newrecursive,newstrongattr){
  if(this.childNodes)
   for(var i=0; i<this.childNodes.length; i++)
    this.replaceChild(new ExtendedDOMElement(this.childNodes[i],newrecursive,newstrongattr),this.childNodes[i]);
 }
 if(recursive)
  element.UpdateChilds(recursive,strongattr);
 if(strongattr)
  element.ReWriteAttributes();
 return element;
}

function ExtendedDOMDocument(TheDocument){
 if(!TheDocument)
  TheDocument=document;
 else
  if(TheDocument.nodeType!=9)
   return false;
 TheDocument.CreateElement = function(type,attributes,childs){
  element = this.createElement(type);
  element = new ExtendedDOMElement(element);
  element.SetAttributes(attributes);
  element.AppendChilds(childs);
  return element;
 }
 for(var i=0; i<TheDocument.childNodes.length; i++)
  TheDocument.replaceChild(new ExtendedDOMElement(TheDocument.childNodes[i],true,true),TheDocument.childNodes[i]);
 return TheDocument;
}
