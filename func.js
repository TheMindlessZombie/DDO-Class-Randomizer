function onLoadFunctions() {
	count = 0;
	aux = document.getElementsByClassName("Selected");
	for (let i = 0; i<aux.length; i++) {
		count++;
		aux[i].addEventListener("click", toggleSel);
		aux[i].id="toggle"+count;
	}
}
function changeSelPaid(sel){
	aux1 = document.getElementsByClassName("Prem")
	for (let i = 0; i<aux1.length; i++) {
		aux2 = aux1[i].children;
		for (let j = 0; j<aux2.length; j++) {
			if (sel) {
				aux2[j].className="notSelected";
			} else {
				aux2[j].className="Selected";
			}
		}
	}
}
function toggleSel(id){
	if (id.toElement.className == "Selected"){
		id.toElement.className = "notSelected";
	} else {
		id.toElement.className = "Selected";
	}
}
function getRaces() {
	aux = document.getElementById("race-sel");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i<aux2.length; i++){aux3.push(aux2[i].alt);}
	return aux3;
}
function getClasses() {
	aux = document.getElementById("class-sel");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i<aux2.length; i++){aux3.push(aux2[i].alt);}
	return aux3;
}
function getLevelOptions() {
	aux = document.getElementById("level-opts");
	aux2 = aux.getElementsByClassName("Selected");
	aux3 = [];
	for (let i = 0; i<aux2.length; i++){aux3.push(aux2[i].innerHTML);}
	if (aux3.length == 0) {aux3 = ["1"]}
	return aux3;
}
function sel_class(class_list,number) {
	aux = [];
	for (let i=0; i<number; i++){
		aux2 = randInt(0,class_list.length);
		aux = aux.concat(class_list[aux2]);
		class_list = class_list.filter(function(ele){return ele!=class_list[aux2]});
	}
	return aux;
}
function sel_levels(number) {
	min_level = Math.abs(document.getElementById("min_level").value);
	max_level = Math.abs(document.getElementById("max_level").value);
	if (number == 1) {return [20];}
	else {
		if (number == 2) {
			aux = randInt(Math.max(min_level,10),Math.min(max_level+1,20));
			return [aux, 20-aux];
		}
		else {
			aux = randInt(min_level,Math.min(max_level+1,19));
			aux2 = randInt(Math.max(1,Math.ceil((20-aux)/2)),Math.min(aux,20-aux));
			aux3 = 20-aux-aux2;
			return [aux, aux2, aux3];
		}
	}
}
function ddoRandomizer(){
	race_list = getRaces();
	class_list = getClasses();
	level_list = getLevelOptions();
	lvl_opts = level_list[randInt(0,level_list.length)];
	class_choices = sel_class(class_list,lvl_opts);
	level_choices = sel_levels(lvl_opts);
	race_choice = race_list[randInt(0,race_list.length)];
	
	ans_text = "<tr>"+"<th>"+race_choice+"</th>";
	for (let i=0;i<lvl_opts;i++) {
		ans_text += "<th>"+class_choices[i]+" "+level_choices[i]+"</th>"
	}
	
	ans_text += "</tr>"
		document.getElementById("rand_finished").innerHTML+=ans_text;
}
function checkNum(el){
	if (document.getElementById(el).value>20)
		{document.getElementById(el).value=20;}
	else if (document.getElementById(el).value<7)
		{document.getElementById(el).value=7;}
	else if (isNaN(document.getElementById(el).value))
		{if (el=="min_level")
			document.getElementById(el).value=7;
		else
			document.getElementById(el).value=20;}
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
function clearer() {
  document.getElementById("rand_finished").innerHTML="";
}