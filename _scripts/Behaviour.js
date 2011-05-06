function ObtenerLista(ArchivoDeGrupo){
  Opciones = new Array();
  for(var i=0; i<ArchivoDeGrupo.Integrantes.length; i++)
   Opciones.push(document.CreateElement('option',[['value',i]],[document.createTextNode(ArchivoDeGrupo.Integrantes[i].NombreCorto)]));
  return Opciones;
}

function MakeMailList(ArchivoDeGrupo,type){
 MailAddresses = new Array();
 GroupList = ObtenerLista(ArchivoDeGrupo);
 Comm.open('GET',Paths['contactos']+ArchivoDePersonaje,false);
}

function CargarIntegrante(integrante){
  if(archivo=integrante.getAttribute('archivo')){
   Comm.open('GET',Paths['contactos']+archivo,false);
   Comm.send('');
   NuevoIntegrante = new T_Contact(Comm.responseXML.documentElement);
   NuevoIntegrante.NombreCorto = integrante.firstChild.nodeValue;
   return NuevoIntegrante;
  }
  else
   alert('No hay archivo definido para el integrante '+integrante.firstChild.nodeValue);
 }

ExtendedDOMDocument();
Comm = new XMLHttpRequest();
Paths=new Array();
Paths['fotos']='fotos/';
Paths['contactos']='contactos/';
Paths['grupos']='';

Comm.open('GET','XXX.3-14.xml',false);
Comm.send('');
Grupo = new T_Group(Comm.responseXML.documentElement,CargarIntegrante);

Hoy = new CubanDate();

window.EventHandler = function(claseevento){
 switch(claseevento){
  case 'seleccionarintegrante': {
   Seleccionar = new Object();
   Seleccionar.handleEvent = function(evento){
    evento.stopPropagation();
    Contenido=document.getElementById('EspacioDeContenido');
    Contenido.Clear();
    Contenido.AppendChilds(T_ContactToDOMArray(Grupo.Integrantes[evento.originalTarget.options[evento.originalTarget.options.selectedIndex].getAttribute('value')]));
    if(SeleccionNula=document.getElementById('SeleccionNula'))
     SeleccionNula.Drop();
   }
   return Seleccionar; break;
  }
 }
}

document.getElementById('SeleccionDePersonaje').AppendChilds(ObtenerLista(Grupo));
document.getElementById('SeleccionDePersonaje').addEventListener('change',window.EventHandler('seleccionarintegrante'),true);

document.getElementById('ListasDeCorreos_Nacional').setAttribute('href','mailto:'+Grupo.ListaDeCorreos('nacional'));
document.getElementById('ListasDeCorreos_Internacional').setAttribute('href','mailto:'+Grupo.ListaDeCorreos('internacional'));
document.getElementById('ListasDeCorreos_Todos').setAttribute('href','mailto:'+Grupo.ListaDeCorreos('nacional')+Grupo.ListaDeCorreos('internacional'));

ProximosCumpleanyos = Grupo.ProximosCumpleanyos();
for(var i=0; i<ProximosCumpleanyos['estemes'].length; i++)
 document.getElementById('ProximosCumpleanyos_EsteMes').appendChild(document.CreateElement('li',false,[document.createTextNode(ProximosCumpleanyos['estemes'][i].NombreCorto+' ('+ProximosCumpleanyos['estemes'][i].Cumpleanyo['day']+')')]));
for(var i=0; i<ProximosCumpleanyos['proximomes'].length; i++)
 document.getElementById('ProximosCumpleanyos_ProximoMes').appendChild(document.CreateElement('li',false,[document.createTextNode(ProximosCumpleanyos['proximomes'][i].NombreCorto+' ('+ProximosCumpleanyos['proximomes'][i].Cumpleanyo['day']+')')]));

document.getElementById('EtiquetaProximosCumpleanyos_EsteMes').appendChild(document.createTextNode('Este Mes ('+Hoy.getMonthName(Hoy.getMonth())+')'));
document.getElementById('EtiquetaProximosCumpleanyos_ProximoMes').appendChild(document.createTextNode('Mes que Viene ('+Hoy.getMonthName(Hoy.nextMonth())+')'));