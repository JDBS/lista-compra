const SAVE_COLOR_KEY="colorInput";
const MAX_COLORS=7;


function CategoryInput(config){
	this.container;
	this.reorderButton;
	//this.addColorButton; próxima mente
	this.colorInputList=[];

	this.colorSetEvent;

	this.initialize(config);
}

CategoryInput.prototype.createReorderButton=function(config){

	var button = document.createElement("abbr");
	button.setAttribute("title","Reordenar");
	button.classList.add(REFRESH_ICON_CLASS);
	button.style.textDecoration="none";

	if(config.reorder)
		button.addEventListener("click",config.reorder,true);

	this.reorderButton;

	return button;
}

CategoryInput.prototype.createAddColorButton=function(){

	var button = document.createElement("abbr");
	button.setAttribute("title","Agregar color");
	button.classList.add(ADD_ICON_CLASS);
	button.style.textDecoration="none";

	button.addEventListener("click",this.addNewColor.bind(this),true);

	this.removeButton=button;

	return button;
}

CategoryInput.prototype.addNewColor=function(){
	if(this.colorInputList.length<MAX_COLORS){
		var colorInput = this.createColorInput();

		this.container.appendChild(colorInput);
	}
}

CategoryInput.prototype.getRandomHexDigit=function(){
	const MAX_VALUE=15;
	const MIN_VALUE=8;

	var value=parseInt(Math.random()*(MAX_VALUE-MIN_VALUE+1)+MIN_VALUE);

	switch(value){
		case 10:
			value="A";
			break;
		case 11:
			value="B";
			break;
		case 12:
			value="C";
			break;
		case 13:
			value="D";
			break;
		case 14:
			value="E";
			break;
		case 15:
			value="F";
			break;
	}

	return value;
}

CategoryInput.prototype.getRandomHexColor=function(){
	const HEX_DIGITS=6;

	var color="#";
	for(var i=0; i<HEX_DIGITS; i++){
		color+=this.getRandomHexDigit();
	}

	return color;
}

CategoryInput.prototype.createColorInput=function(){
	const INPUT_WIDTH="22px";
	const INPUT_HEIGHT="22px";

	var input = document.createElement("input");
	input.setAttribute("type","color");
	input.setAttribute("disabled","disabled");
	input.value=this.getRandomHexColor();

	input.style.width=INPUT_WIDTH;
	input.style.height=INPUT_HEIGHT;

	var inputContainer = document.createElement("div");
	inputContainer.appendChild(input);
	inputContainer.style.display="inline-block";

	if(this.colorSetEvent)
		inputContainer.addEventListener("click",this.colorSetEvent, true);

	this.colorInputList.push(input);

	return inputContainer;
}



CategoryInput.prototype.createContainer=function(){
	var container = document.createElement	("div");
	container.classList.add("input-box");
	container.style.display = "inline-block";
	container.style.verticalAlign="top";

	this.container=container;

	return container;
}


CategoryInput.prototype.build=function(config){
	var reorderButton = this.createReorderButton(config);
	var addColorButton = this.createAddColorButton();
	var colorInput = this.createColorInput();
	var container = this.createContainer();

	container.appendChild(reorderButton);
	container.appendChild(addColorButton);
	container.appendChild(colorInput);
}

CategoryInput.prototype.initialize=function(config){
	this.colorSetEvent=config.setColor || undefined;
	this.build(config);
}

CategoryInput.prototype.setColors=function(colorArray){
	if(colorArray.length>MAX_COLORS)	//Si hay más colores de los permitidos
		return							//No hace nada

	while(this.colorInputList.length<colorArray.length){
		let colorInput = this.createColorInput();
		this.container.appendChild(colorInput);
	}

	for(var i = 0; i<colorArray.length; i++){
		this.colorInputList[i].value=colorArray[i];
	}
}

CategoryInput.prototype.getFirstColor=function(){
	if(this.colorInputList.length>0)
		return this.colorInputList[0].value;

	return undefined;
}

CategoryInput.prototype.getElement=function(){
	return this.container;
}