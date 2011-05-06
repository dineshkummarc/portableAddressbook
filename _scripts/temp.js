function T_ContactToDOMArray(contact,prmdocument){
	if(!prmdocument){
		prmdocument=document;
	}
	DOMArray=new Array();
	DOMArray.push(prmdocument.CreateElement('h3',[['class','Name']],[prmdocument.createTextNode(contact.Nombre)]));
	DOMArray.push(prmdocument.CreateElement('object',[['type','image/jpeg'],['data',contact.Foto],['class','Photo']],false));
	DOMArray.push(prmdocument.CreateElement('h4',[['id','BirthdayLabel']],[prmdocument.createTextNode('Cumpleaños:')]));
	DOMArray.push(prmdocument.CreateElement('span',[['class','BirthdayDate']],[prmdocument.createTextNode(contact.CompleanyoFormateado())]));
	DOMArray.push(prmdocument.CreateElement('h4',[['id','UbicationLabel']],[prmdocument.createTextNode('Ubicación:')]));
	DOMArray.push(prmdocument.CreateElement('span',[['class','Ubication']],[prmdocument.createTextNode(contact.Ubicacion)]));
	DOMArray.push(prmdocument.CreateElement('h4',[['id','EMailsLabel']],[prmdocument.createTextNode('Correos: ')]));
	for(var i=0;i<contact.Correo.length;i++){
		DOMArray.push(prmdocument.CreateElement('a',[['class','EMail'],['href','mailto:'+contact.MailAddress(i)]],[prmdocument.createTextNode(contact.Correo[i].valueOf())]));
	}
	DOMArray.push(prmdocument.CreateElement('h4',[['id','PhonesLabel']],[prmdocument.createTextNode('Teléfonos: ')]));
	for(var i=0;i<contact.Telefono.length;i++){
		DOMArray.push(prmdocument.CreateElement('span',[['class','Phone']],[prmdocument.createTextNode(contact.Telefono[i].valueOf())]));
	}
	DOMArray.push(prmdocument.CreateElement('h4',[['id','HomeAddressLabel']],[prmdocument.createTextNode('Dirección:')]));
	DOMArray.push(prmdocument.CreateElement('address',[['class','HomeAddress']],[prmdocument.createTextNode(contact.Direccion)]));
	DOMArray.push(prmdocument.CreateElement('h4',[['id','CILabel']],[prmdocument.createTextNode('CI:')]));
	DOMArray.push(prmdocument.CreateElement('span',[['class','CI']],[prmdocument.createTextNode(contact.CarnetDeIdentidad)]));
	return DOMArray;
}
