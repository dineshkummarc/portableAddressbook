// C L A S S E S (classes)

function Tcontacto_vcard30(vcard){
	if(!vcard)
	 return;
	this.Nombre='';
	this.CarnetDeIdentidad='';
	this.Direccion='';
	this.Ubicacion='';
	this.Foto='';
	this.texto = new Array();
	this.Telefono = new Array();
	this.Correo = new Array();
	todavia=true;
	while(todavia){
		indice = vcard.indexOf('\r');
		linea = vcard.substr(0,indice);
		if(linea.charAt(0)!=' '){
			linea = linea.split(':');
			linea[0] = linea[0].split(';');
			ultimocampo = linea[0][0];
		}
		else
			linea = new Array('',linea);
		switch(ultimocampo){
			case 'FN':{
				this.Nombre+=linea[1];
				break;
			}
			case 'X-KADDRESSBOOK-ci':{
				this.CarnetDeIdentidad+=linea[1];
				break;
			}
			case 'TEL':{
				this.Telefono.push(linea[1]);
				break;
			}
			case 'ADR':{
				this.Direccion+=linea[1];
				break;
			}
			case 'X-KADDRESSBOOK-ubicacion':{
				this.Ubicacion+=linea[1];
				break;
			}
			case 'EMAIL':{
				this.Correo.push(linea[1]);
				break;
			}
			case 'PHOTO':{
				this.Foto+='\r\n'+linea[1];
				break;
			}
		}
		vcard = vcard.slice(indice+2);
		if(vcard.length==0){
			todavia=false;
		}
	}
	this.Foto=this.Foto.slice(2);
	this.Foto='data:image/jpeg;base64,'+this.Foto;
	this.Cumpleanyo = GetBirthdayFromCI(this.CarnetDeIdentidad);
	this.MailAddress = function(id){
		return this.Nombre+'<'+this.Correo[id].valueOf()+'>';
	}
	this.ShortMailAddress = function(id){
		return this.NombreCorto+'<'+this.Correo[id].valueOf()+'>';
	}
	this.MailAddresses = function(type){
		TheMailAddresses = new Array();
		for(var i=0; i<this.Correo.length; i++)
		if(this.Correo[i].Alcance==type)
		TheMailAddresses.push(this.Nombre+'<'+this.Correo[i].valueOf()+'>');
		return TheMailAddresses;
	}
	this.CompleanyoFormateado = function(){
		return this.Cumpleanyo['day'].toString()+'/'+this.Cumpleanyo['month'].toString()+'/'+this.Cumpleanyo['year'].toString();
	}
}

function T_Contact(XMLFrag){
 if(!XMLFrag)
  return;
 this.Nombre=XMLFrag.getElementsByTagName('nombre')[0].firstChild.nodeValue;
 this.CarnetDeIdentidad=XMLFrag.getElementsByTagName('carnetdeidentidad')[0].firstChild.nodeValue;
 this.Correo = new Array();
 this.Temp=XMLFrag.getElementsByTagName('correoelectronico');
 for(var i=0;i<this.Temp.length;i++){
  this.Correo[i]=new Object();
  this.Correo[i].value=this.Temp[i].firstChild.nodeValue;
  this.Correo[i].Alcance=this.Temp[i].getAttribute('alcance');
 }
 this.CarnetDeIdentidad=XMLFrag.getElementsByTagName('carnetdeidentidad')[0].firstChild.nodeValue;
 this.Cumpleanyo=GetBirthdayFromCI(this.CarnetDeIdentidad);
 this.Temp=XMLFrag.getElementsByTagName('telefono');
 this.Telefono = new Array();
 for(var i=0;i<this.Temp.length;i++){
  this.Telefono[i]=new Object();
  this.Telefono[i].value=this.Temp[i].firstChild.nodeValue;
  this.Telefono[i].Tipo=this.Temp[i].getAttribute('tipo');
 }
 this.Direccion=XMLFrag.getElementsByTagName('direccion')[0].firstChild.nodeValue;
 this.Ubicacion=XMLFrag.getElementsByTagName('ubicacion')[0].firstChild.nodeValue;
 this.Foto=XMLFrag.getElementsByTagName('foto')[0].getAttribute('nombre');
 this.MailAddress = function(id){
  return this.Nombre+'<'+this.Correo[id].value+'>';
 }
 this.ShortMailAddress = function(id){
  return this.NombreCorto+'<'+this.Correo[id].value+'>';
 }
 this.MailAddresses = function(type){
  TheMailAddresses = new Array();
  for(var i=0; i<this.Correo.length; i++)
   if(this.Correo[i].Alcance==type)
    TheMailAddresses.push(this.Nombre+'<'+this.Correo[i].value+'>');
  return TheMailAddresses;
 }
 this.CompleanyoFormateado = function(){
	 return this.Cumpleanyo['day'].toString()+'/'+this.Cumpleanyo['month'].toString()+'/'+this.Cumpleanyo['year'].toString();
 }
}

function T_Group(XMLFrag,CargarIntegrante){
 this.ID = XMLFrag.getAttribute('id');
 this.Integrantes = new Array();
 this.ListaDeCorreos = function(tipo){
  ListaDeCorreos = '';
  for(var i=0; i<this.Integrantes.length; i++)
   for(j=0; j<this.Integrantes[i].Correo.length; j++)
    if(this.Integrantes[i].Correo[j].Alcance==tipo)
	 ListaDeCorreos+=this.Integrantes[i].ShortMailAddress(j)+', ';
  return ListaDeCorreos;
 }
 this.ProximosCumpleanyos = function(){
  Cumpleanyos = new Array();
  this.Fecha = new Date();
  EsteMes = this.Fecha.getMonth();
  if(EsteMes < 11)
   ProximoMes = EsteMes + 1;
  else
   ProximoMes = 0;
  Cumpleanyos['estemes'] = new Array();
  for(var i=0; i<this.Integrantes.length; i++)
   if(this.Integrantes[i].Cumpleanyo['month']==EsteMes+1)
    Cumpleanyos['estemes'].push(this.Integrantes[i]);
  Cumpleanyos['proximomes'] = new Array();
  for(var i=0; i<this.Integrantes.length; i++)
   if(this.Integrantes[i].Cumpleanyo['month']==ProximoMes+1)
    Cumpleanyos['proximomes'].push(this.Integrantes[i]);
  return Cumpleanyos;  
 }
 this.PrimeraListaIntegrantes = XMLFrag.getElementsByTagName('integrante');
 for(var i=0; i<this.PrimeraListaIntegrantes.length; i++){
  this.Integrantes.push(CargarIntegrante(this.PrimeraListaIntegrantes[i]));
 }
}