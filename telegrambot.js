var TelegramBot=require('node-telegram-bot-api'); 
var request = require('request'); 
var cheerio = require('cheerio'); 
token = '468929032:AAF8DHjAbdTRWQhcaDpJsqvveXAIWw7G4W0'; 
var bot =new TelegramBot(token, 
{ 
polling:true, 
}); 
var msgtext=''; 
bot.onText(/\/start/,function(msg,match) 
{ 
var id= msg.from.id; 
bot.sendMessage(id,'Чтобы посмотреть расписание преподавателя напишите: *Фамилия И.О.*'+'\n'+'Пример:'+'\n'+'Костюк Д.М.'+'\n'+'Стасилевич Д.П.'); 
}); 
bot.onText(/(.+)/, function(msg,match){ 
var id= msg.from.id; 
msgtext=match[1]; 
var metadata1=[],metadata2=[],metadata3=[],metadata4=[],metadata5=[],metadata6=[]; 
var k=0; 
var z1=0,z2=0,z3=0,z4=0,z5=0,z6=0; 
var url,j,group=''; 
var Kostuk=1; 
var da = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота",]; 
var qr = ["9:00","10:50","12:40","14:30","16:20","18:10","20:00"]; 
var Imya=msgtext; 
request('http://table.nsu.ru/teacher', function (error, response, html) { 
if (!error && response.statusCode == 200) { 
var $ = cheerio.load(html) 
$('div[class=tutors__column]').each(function(i, element){ 
var b=$('div[class=tutors__column]').eq(i).children().length 
for (j = 0; j < b; j++) { 
var a =$('div[class=tutors__column]').eq(i).children().eq(j) 
if (a.text() == Imya) { 
url= 'http://table.nsu.ru' +a.attr('href'); 
Kostuk=0; 
console.log(url); 
console.log(a.text()); 
} 
} 
}); 
} 
else{ 
console.log("Траблы:"+ error); 
} 
console.log(Kostuk, ' '); 
if(Kostuk===0) 
{ 
request(url, function (error, response, html) { 
if (!error && response.statusCode == 200) { 
var $ = cheerio.load(html); 
$('div[class=cell]').each(function(i, element){ 
a = $(this); 
q=$(a).parent(); 
q=$(q).prev(); 
var t=0; 
var f=0; 
while(t!=1){ 
var h=0; 
f++; 
for(j = 0; j < 7; j++) 
{if(q.text()== qr[h]){ 
t=1; 
} 
else{ 
h++; 
} 
} 
if(t==0){ 
q=$(q).prev(); 
} 
} 
b=0; 
group=''; 
day=0; 
week=''; 
var para = $(a).children().eq(0).text(); 
var name = $(a).children().eq(1).text(); 
var aud = $(a).children().eq(2).text(); 
var week = $(a).children().eq(4).text(); 
var time = $(a).parent().parent().children().eq(0).text(); 
b=$(a).children().find('a').length 
for (j = 0; j < b; j++) { 
if(group == ''){ 
group =$(a).children().find($('.group')).eq(j).text(); 
} 
else{ 
group =group + ' ' + $(a).children().find($('.group')).eq(j).text(); 
} 
} 
if(group!='') 
{ 
if(da[f-1]=="Понедельник") 
{ 
if(metadata1.length==0) 
{ 
if(week=='') metadata1.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata1.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata1.push(metadata1[metadata1.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata1.push(metadata1[metadata1.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z1++; 
} 
if(da[f-1]=="Вторник") 
{ 
if(metadata2.length==0) 
{ 
if(week=='') metadata2.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata2.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata2.push(metadata2[metadata2.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata2.push(metadata2[metadata2.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z2++; 
} 
if(da[f-1]=="Среда") 
{ 
if(metadata3.length==0) 
{ 
if(week=='') metadata3.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata3.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata3.push(metadata3[metadata3.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata3.push(metadata3[metadata3.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z3++; 
} 
if(da[f-1]=="Четверг") 
{
if(metadata4.length==0) 
{ 
if(week=='') metadata4.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata4.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata4.push(metadata4[metadata4.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata4.push(metadata4[metadata4.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z4++; 
} 
if(da[f-1]=="Пятница") 
{ 
if(metadata5.length==0) 
{ 
if(week=='') metadata5.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata5.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata5.push(metadata5[metadata5.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata5.push(metadata5[metadata5.length-1]+ '\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z5++; 
} 
if(da[f-1]=="Суббота") 
{ 
if(metadata6.length==0) 
{ 
if(week=='') metadata6.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata6.push(da[f-1]+'\n'+time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
else 
{ 
if(week=='') metadata6.push(metadata6[metadata6.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group); 
else metadata6.push(metadata6[metadata6.length-1]+ '\n' +time+'; '+para+' '+name+'; '+aud+'; '+group+'; '+week+' неделя'); 
} 
z6++; 
} 
} 
}); 
} 
else{ 
console.log("Траблы:"+ error); 
} 
var metadata=[]; 
if(z1!=0) 
{ 
metadata.push(metadata1[metadata1.length-1]); 
} 
if(z2!=0) 
{ 
metadata.push(metadata2[metadata2.length-1]); 
} 
if(z3!=0) 
{ 
metadata.push(metadata3[metadata3.length-1]); 
} 
if(z4!=0) 
{ 
metadata.push(metadata4[metadata4.length-1]); 
} 
if(z5!=0) 
{ 
metadata.push(metadata5[metadata5.length-1]); 
} 
if(z6!=0) 
{ 
metadata.push(metadata6[metadata6.length-1]); 
} 
var met=[]; 
met=metadata.join('\n\n'); 
console.log(met); 
bot.sendMessage(id,met); 
}); 
} 
else{ 
if(msgtext!='/start') bot.sendMessage(id,'Неверная фамилия'); 
} 
}); 
});