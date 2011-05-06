function ActivateSelection(ArchivoDePersonaje){
 Comm.open('GET',Paths['contactos']+ArchivoDePersonaje,false);
 Comm.send('');
 Personaje = new T_Contact(Comm.responseXML.documentElement);
 Contenido=document.getElementById('EspacioDeContenido');
 Contenido.Clear();
 Contenido.AppendChilds(T_ContactToDOMArray(Personaje,Paths));
 if(SeleccionNula=document.getElementById('SeleccionNula'))
  SeleccionNula.Drop();
}

function ObtenerLista(ArchivoDeGrupo){
 Comm.open('GET',ArchivoDeGrupo,false);
 Comm.send('');
 ListaXML=Comm.responseXML;
 Lista=ListaXML.documentElement.getElementsByTagName('integrante');
 Options=new Array();
 for(var i=0;i<Lista.length;i++)
  Options.push(document.CreateElement('option',[['value',Lista[i].getAttribute('archivo')]],[document.createTextNode(Lista[i].firstChild.nodeValue)]));
 return Options;
}

prueba = new Object();
prueba.handleEvent = function(evento){
 evento.stopPropagation();
 ActivateSelection(evento.originalTarget.options[evento.originalTarget.options.selectedIndex].getAttribute('value'))
}

//document.getElementById('SeleccionDePersonaje').AppendChilds(ObtenerLista('XXX.3-14.xml'));
//document.getElementById('SeleccionDePersonaje').addEventListener('change',prueba,true);