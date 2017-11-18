function Product(config){
	this.container;
	this.checkBox;
	this.count;
	this.nameText;
	this.measureText;

	this.bgColorHex;

	this.initialize(config);
}

Product.prototype.createCheckBox=function(){

	var checkBox = document.createElement("input");

	checkBox.setAttribute("type","checkbox");
	checkBox.style.display="inline-block";

	this.checkBox=checkBox;

	return checkBox;
}

Product.prototype.createCount=function(count){

	var countBox= document.createElement("p");

	countBox.classList.add("count-box");
	countBox.innerHTML=parseInt(count) || 0;
	countBox.style.display="inline-block";

	this.count=countBox;

	return countBox;
}

Product.prototype.createNameText=function(name){

	var textBox= document.createElement("p");
	if(textBox)
		textBox.innerHTML=name || "Indefinido";

	textBox.style.display="inline-block";
	textBox.style.marginLeft="5px";

	this.nameText=textBox;

	return textBox;
}
Product.prototype.createMeasureText=function(measure){

	var textBox= document.createElement("p");
	if(textBox)
		textBox.innerHTML=measure || "Indf.";

	textBox.style.display="inline-block";
	textBox.style.marginLeft="5px";

	this.measureText=textBox;


	return textBox;
}

Product.prototype.createContainer=function(color){

	var container = document.createElement("div");
	container.classList.add("product");

	this.container = container;
	this.setColor(color || "");

	return container;
}

Product.prototype.build=function(config){
	var checkBox=this.createCheckBox();
	var countBox=this.createCount(config.count);
	var measureText=this.createMeasureText(config.measure);
	var nameText=this.createNameText(config.name);
	var container=this.createContainer(config.color);

	container.appendChild(checkBox);
	container.appendChild(countBox);
	container.appendChild(measureText);
	container.appendChild(nameText);
}

Product.prototype.initialize=function(config){
	this.build(config);
}

Product.prototype.setCount=function(count){
	this.count.innerHTML=parseInt(count);
}

Product.prototype.getColor=function(){
	return this.bgColorHex;
}

Product.prototype.setColor=function(color){
	this.container.style.backgroundColor=color;
	this.bgColorHex=color;
	this.container.setAttribute("colorOrder",this.getColorDecimal());
}

Product.prototype.getColorDecimal=function(){
	var hexCode=this.bgColorHex.slice(1,7);

	return parseInt(hexCode,16);
}

Product.prototype.getCount=function(){
	return parseInt(this.count.innerHTML);
}

Product.prototype.setName=function(name){
	this.nameText.innerHTML=name;
}

Product.prototype.getName=function(){
	return this.nameText.innerHTML;
}

Product.prototype.setMeasure=function(measure){
	this.measureText.innerHTML=measure;
}

Product.prototype.getMeasure=function(){
	return this.measureText.innerHTML;
}

Product.prototype.checked=function(){
	return this.checkBox.checked; 
}

Product.prototype.check=function(){
	return this.checkBox.checked=true; 
}

Product.prototype.uncheck=function(){
	return this.checkBox.checked=false; 
}

Product.prototype.getElement=function(){
	return this.container;
}

Product.prototype.getSaveData=function(){
	var data={
		name:this.getName(),
		measurement:this.getMeasurement(),
		count:this.getCount(),
		color:this.getColor()
	}

	return data;
}


Product.prototype.delete=function(){
	this.container.removeChild(this.check);
	this.container.removeChild(this.count);
	this.container.removeChild(this.nameInput);
	this.container.removeChild(this.measureInput);
}
