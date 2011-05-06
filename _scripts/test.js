/*ExtendedDOMDocument();
contacto_vCard = new XMLHttpRequest();
contacto_vCard.open('GET','contactos/Frank_Baltodano de León.vcf',false);
contacto_vCard.send('');

contacto_vCard = contacto_vCard.responseText;
frank = new Tcontacto_vcard30(contacto_vCard);
// -*/
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
		NuevoIntegrante = new Tcontacto_vcard30(Comm.responseText);
		NuevoIntegrante.NombreCorto = integrante.firstChild.nodeValue;
		return NuevoIntegrante;
	}
	else
		alert('No hay archivo definido para el integrante '+integrante.firstChild.nodeValue);
}

function seleccionarintegrante(selector){
	Contenido=document.getElementById('EspacioDeContenido');
	Contenido.Clear();
	Contenido.AppendChilds(T_ContactToDOMArray(Grupo.Integrantes[selector.options[selector.selectedIndex].value]));
	if(SeleccionNula=document.getElementById('SeleccionNula')){
		SeleccionNula.Drop();
	}
}

ExtendedDOMDocument();
Comm = new XMLHttpRequest();
Paths=new Array();
Paths['contactos']='contactos/';
Paths['grupos']='';

Comm.open('GET','XXX.3-14.vcf.xml',false);
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
				Contenido.AppendChilds(T_ContactToDOMArray(Grupo.Integrantes[evento.originalTarget.options[evento.originalTarget.options.selectedIndex].getAttribute('value')],Paths));
				if(SeleccionNula=document.getElementById('SeleccionNula'))
				SeleccionNula.Drop();
			}
			return Seleccionar; break;
		}
	}
}

document.getElementById('SeleccionDePersonaje').AppendChilds(ObtenerLista(Grupo));
// document.getElementById('SeleccionDePersonaje').addEventListener('change',window.EventHandler('seleccionarintegrante'),true);