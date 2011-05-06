// C L A S S E S	S E C T I O N	(classes)

function CubanDate(){
 CubanDateObj = new Date();
 CubanDateObj.getHours12 = function(){
  if(this.getHours()<13)
   if(this.getHours()==0)
    return 12;
   else 
	return this.getHours();
  else
   return (this.getHours()-12);
 }
 CubanDateObj.getNoon = function(){
  if(this.getHours()<12)
   return 'a.m.';
  else
   return 'p.m.';
 }
 CubanDateObj.MinutesForClock = function(){
  if(this.getMinutes()<10)
   return '0'+this.getMinutes();
  else
   return this.getMinutes();
 }
 CubanDateObj.getYear2K = function(){
  if(this.getYear()<1000)
   return this.getYear()+1900;
  else
   return this.getYear();
 }
 CubanDateObj.getMonthName = function(monthprm){
  /*if(!monthprm)
   monthprm = this.getMonth();*/
  switch(monthprm){
   case 0: {return 'enero'; break;}
   case 1: {return 'febrero'; break;}
   case 2: {return 'marzo'; break;}
   case 3: {return 'abril'; break;}
   case 4: {return 'mayo'; break;}
   case 5: {return 'junio'; break;}
   case 6: {return 'julio'; break;}
   case 7: {return 'agosto'; break;}
   case 8: {return 'septiembre'; break;}
   case 9: {return 'octubre'; break;}
   case 10: {return 'noviembre'; break;}
   case 11: {return 'diciembre'; break;}
   default: {return 'error';}
  }
 }
 CubanDateObj.nextMonth = function(){
   if(this.getMonth()==11)
    return 0;
   else return this.getMonth()+1;
  }
 CubanDateObj.getYearName = function(){
  switch(this.getYear2K()){
   case 2006: {return 'A�o de la Revoluci�n Energ�tica en Cuba'; break;}
   case 2007: {return 'A�o 49 de la Revoluci�n'; break;}
   default: {return '"A�o Sin Nombre"'}
  }
 }
 return CubanDateObj;
}

// E L E M E N T S	S E C T I O N	(elements)

function DigitalClock(){
  DigitalClockObj = document.CreateElement('span',[['id','DigitalClock']],[
   document.CreateElement('span',[['id','DigitalClock_Hours']],[document.createTextNode('00')]),
   document.CreateElement('span',[['id','DigitalClock_Blinker']],[document.createTextNode(':')]),
   document.CreateElement('span',[['id','DigitalClock_Minutes']],[document.createTextNode('00')]),
   document.CreateElement('span',[['id','DigitalClock_Noon']],[document.createTextNode('__')]),
  ]);
  DigitalClockObj.Blink = function(){
   Blinker=document.getElementById('DigitalClock_Blinker');
   if(Blinker.style.visibility == 'visible')
    Blinker.style.visibility = 'hidden';
   else
    Blinker.style.visibility = 'visible';
   this.BlinkControl = setTimeout("document.getElementById('DigitalClock').Blink()",500);
  }
  DigitalClockObj.Update = function(){
   this.Date = new CubanDate();
   document.getElementById('DigitalClock_Hours').innerHTML=this.Date.getHours12();
   document.getElementById('DigitalClock_Minutes').innerHTML=this.Date.MinutesForClock();
   document.getElementById('DigitalClock_Noon').innerHTML=this.Date.getNoon();
   this.TimeControl = setTimeout("document.getElementById('DigitalClock').Update()",60000-this.Date.getSeconds()*1000);
  }
  DigitalClockObj.Start = function(){
   this.Update();
   this.Blink();
  }
  return DigitalClockObj;
}

function PerpetualCalendar(){
 PerpetualCalendarObj = document.CreateElement('span',[['id','PerpetualCalendar']],false); 
 PerpetualCalendarObj.Date = new CubanDate();
 PerpetualCalendarObj.Update = function(){
  this.Date = new CubanDate();
  document.getElementById('PerpetualCalendar_Month').innerHTML=this.Date.getMonthName();
  document.getElementById('PerpetualCalendar_Day').innerHTML=this.Date.getDate();
  document.getElementById('PerpetualCalendar_Year').innerHTML=this.Date.getYear2K();
  //document.getElementById('PerpetualCalendar_Formal_YearName').innerHTML=this.Date.getYearName();
  this.DateControl = setTimeout("document.getElementById('PerpetualCalendar').Update()",86400000-(this.Date.getHours()*3600000+this.Date.getMinutes()*60000+this.Date.getSeconds()*1000));
 }
 PerpetualCalendarObj.Start = function(){
  this.Update();
 }
 PerpetualCalendarObj.AppendChilds([
  document.CreateElement('span',[['id','PerpetualCalendar_Month']],[document.createTextNode(PerpetualCalendarObj.Date.getMonthName())]),
  document.CreateElement('span',[['id','PerpetualCalendar_Day']],[document.createTextNode(PerpetualCalendarObj.Date.getDate())]),
  document.CreateElement('span',[['id','PerpetualCalendar_Separator']],[document.createTextNode(',')]),
  document.CreateElement('span',[['id','PerpetualCalendar_Year']],[document.createTextNode(PerpetualCalendarObj.Date.getYear2K())]),
  document.CreateElement('span',[['id','PerpetualCalendar_YearName']],[document.createTextNode(PerpetualCalendarObj.Date.getYearName())]),
 ]);
 return PerpetualCalendarObj;
}

// D E C O D I N G   S E C T I O N (decoding)

function GetBirthdayFromCI(CINo){
 BirthNo=CINo.slice(0,6);
 BirthDate = new Array();
 BirthDate['day']=parseInt(BirthNo.slice(4,6));
 BirthDate['month']=parseInt(BirthNo.slice(2,4));
 BirthDate['year']=BirthNo.slice(0,2)
 if(BirthDate['year']>30)
  BirthDate['year']=parseInt('19'+BirthDate['year']);
 else
  BirthDate['year']=parseInt('20'+BirthDate['year']);
 return BirthDate;
}
