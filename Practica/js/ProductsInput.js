
function ProductsInput(config){ 
	this.container;
	this.checkAllButton;
	this.uncheckAllButton;
	this.removeButton;

	this.quantityInput;
	this.measureInput;
	this.nameInput;

	this.addButton;
	this.addItemEvent;

	this.initialize(config);
}



ProductsInput.prototype.createCheckAllButton=function(config){

	var button = document.createElement("abbr");
	button.setAttribute("title","Marcar todo");
	button.classList.add(CHECK_ICON_CLASS);
	button.style.textDecoration="none";

	if(config.check)
		button.addEventListener("click",config.check,true);

	this.checkAllButton=button;

	return button;
}

ProductsInput.prototype.createUncheckAllButton=function(config){

	var button = document.createElement("abbr");
	button.setAttribute("title","Desmarcar todo");
	button.classList.add(UNCHECK_ICON_CLASS);
	button.style.textDecoration="none";

	if(config.uncheck)
		button.addEventListener("click",config.uncheck,true);

	this.checkAllButton=button;

	return button;
}

ProductsInput.prototype.createRemoveButton=function(config){

	var button = document.createElement("abbr");
	button.setAttribute("title","Eliminar productos");
	button.classList.add(REMOVE_ICON_CLASS);
	button.style.textDecoration="none";

	if(config.remove)
		button.addEventListener("click",config.remove,true);

	this.removeButton=button;

	return button;
}

ProductsInput.prototype.pressEnterEvent=function(event){
	if(event.keyCode == 13){
		this.addItemEvent();
	}
}

ProductsInput.prototype.createQuantityInput=function(config){

	var input = document.createElement("input");
	input.setAttribute("type","number");
	input.setAttribute("placeholder","Cant.");
	input.setAttribute("min","1");
	input.setAttribute("max","1000");
	input.setAttribute("maxlength","4");
	input.setAttribute("aria-label","nombreProducto");
	input.setAttribute("role","entrada");
	input.setAttribute("title","Cantidad");

	input.style.width="60px";
	input.style.textAlign="center";

	if(config.add)
		input.addEventListener("keydown",this.pressEnterEvent.bind(this),true);

	this.quantityInput=input;

	return input;
}

ProductsInput.prototype.createMeasureInput=function(config){

	var input = document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("size","5");
	input.setAttribute("placeholder","Ud Medida");
	input.setAttribute("maxlength","6");
	input.setAttribute("aria-label","nombreProducto");
	input.setAttribute("role","entrada");
	input.setAttribute("title","Unidad de medida");

	input.style.textAlign="center";

	if(config.add)
		input.addEventListener("keydown",this.pressEnterEvent.bind(this),true);

	this.measureInput = input;

	return input;
}

ProductsInput.prototype.createNameInput=function(config){

	var input = document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("placeholder","Producto");
	input.setAttribute("size","17");
	input.setAttribute("maxlength","30");
	input.setAttribute("aria-label","nombreProducto");
	input.setAttribute("role","entrada");
	input.setAttribute("title","Nombre del Producto");

	if(config.add)
		input.addEventListener("keydown",this.pressEnterEvent.bind(this),true);

	this.nameInput = input;

	return input;
}

ProductsInput.prototype.createAddButton=function(config){

	var button = document.createElement("abbr");
	button.setAttribute("title","Agregar producto");
	button.classList.add(ADD_ICON_CLASS);
	button.style.textDecoration="none";

	if(config.add)
		button.addEventListener("click",config.add,true);

	this.addButton=button;

	return button;
}

ProductsInput.prototype.createContainer=function(){

	var container = document.createElement	("div");
	container.classList.add("input-box");

	container.style.display = "inline-block";

	this.container = container;

	return container;
}


ProductsInput.prototype.build=function(config){
	var checkAllButton = this.createCheckAllButton(config);
	var uncheckAllButton = this.createUncheckAllButton(config);
	var removeButton = this.createRemoveButton(config);
	var container = this.createContainer();
	var quantityInput = this.createQuantityInput(config);
	var measureInput = this.createMeasureInput(config);
	var nameInput = this.createNameInput(config);
	var addButton = this.createAddButton(config);

	container.appendChild(checkAllButton);
	container.appendChild(uncheckAllButton);
	container.appendChild(removeButton);
	container.appendChild(document.createElement("br"));
	container.appendChild(quantityInput);
	container.appendChild(measureInput);
	container.appendChild(nameInput);
	container.appendChild(addButton);
}

ProductsInput.prototype.initialize=function(config){
	this.addItemEvent=config.add || undefined;
	this.build(config);
}

ProductsInput.prototype.checkQuantityInput=function(){
	var quantityInputInt=parseInt(this.quantityInput.value);
	var quantityInputFloat=parseFloat(this.quantityInput.value);

	if(quantityInputInt == quantityInputFloat)
		if(typeof quantityInputInt == "number")
			return quantityInputInt > 0;

	return false;
}

ProductsInput.prototype.getProductQuantity=function(){
	if(this.checkQuantityInput())
		return parseInt(this.quantityInput.value);

	return undefined;
}

ProductsInput.prototype.getProductName=function(){
	if(this.nameInput.value.length>0)
		return this.nameInput.value;

	return undefined;
}

ProductsInput.prototype.getProductMeasure=function(){
	if(this.measureInput.value.length>0)
		return this.measureInput.value;

	return undefined;
}

ProductsInput.prototype.getElement=function(){
	return this.container;
}
