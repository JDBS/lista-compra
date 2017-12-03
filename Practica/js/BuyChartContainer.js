function BuyChartContainer(config){
	this.container;
	this.headerIcon;
	this.title;

	this.productsInput;
	this.categoryInput;

	this.buyList;

	this.initialize(config);
}

BuyChartContainer.prototype.createHeaderIcon=function(){
	var headerIcon = document.createElement("div");
	headerIcon.classList.add(CHART_LOGO_CLASS);
	headerIcon.style.display="inline-block";

	this.headerIcon=headerIcon;

	return headerIcon;
}

BuyChartContainer.prototype.createTitle=function(){
	const TITLE_TEXT="Lista de la compra";

	var title = document.createElement("h1");
	title.id = APPLICATION_TITLE_ID;
	title.style.display = "inline-block";
	title.style.marginLeft = "1.5rem";
	title.innerHTML=TITLE_TEXT;

	this.title=title;

	return title;
}

BuyChartContainer.prototype.createProductsInput=function(){
	var productsInput= new ProductsInput({
		add:this.addItemEvent.bind(this),
		remove:this.removeItemEvent.bind(this),
		check:this.checkAllEvent.bind(this),
		uncheck:this.uncheckAllEvent.bind(this)
	});

	this.productsInput=productsInput;

	return productsInput;
}

BuyChartContainer.prototype.createCategoryInput=function(){
	var categoryInput= new CategoryInput({
		setColor:this.setColorEvent.bind(this),
		reorder:this.reorderColorEvent.bind(this)
	});

	this.categoryInput=categoryInput;
	
	return categoryInput;
}

BuyChartContainer.prototype.createBuyList=function(){
	var buyList = new BuyList({});

	this.buyList=buyList;

	return buyList;
}

BuyChartContainer.prototype.createContainer=function(){
	var container = document.createElement("div");
	container.setAttribute("role","application");
	container.setAttribute("arialabelledby",APPLICATION_TITLE_ID);
	container.id=CONTAINER_INPUT_ID;
	container.style.display = "inline-block";
	this.container=container;

	return container;
}

BuyChartContainer.prototype.build=function(config){
	var headerIcon=this.createHeaderIcon();
	var title=this.createTitle();
	var productsInput=this.createProductsInput();
	var categoryInput=this.createCategoryInput();
	var buyList=this.createBuyList();
	var container=this.createContainer();

	container.appendChild(headerIcon);
	container.appendChild(title);
	container.appendChild(document.createElement("br"));
	container.appendChild(productsInput.getElement());
	container.appendChild(categoryInput.getElement());
	container.appendChild(document.createElement("br"));
	container.appendChild(buyList.getElement());
}

BuyChartContainer.prototype.loadCategoryColors=function(){
	var colorsArray=this.buyList.getProductColors();
	this.categoryInput.setColors(colorsArray);
}

BuyChartContainer.prototype.initialize=function(config){
	this.build(config);
	var rootAnchor = document.getElementById(ROOT_NODE_ID);
	rootAnchor.appendChild(this.container);

	this.buyList.load();
	this.loadCategoryColors();
}

BuyChartContainer.prototype.addItemEvent=function(event){
	var name = this.productsInput.getProductName();
	var measure = this.productsInput.getProductMeasure();
	var count = this.productsInput.getProductQuantity();
	var color = this.categoryInput.getFirstColor();

	if(!measure)
		measure="ud";
	if(name && measure && count && color)
		this.buyList.addItem({name,measure,count,color}); //text:text, count:count, color:color
}

BuyChartContainer.prototype.removeItemEvent=function(event){
	var checkedList = this.buyList.getCheckedList();

	this.buyList.removeProducts(checkedList);
}

BuyChartContainer.prototype.checkAllEvent=function(event){
	this.buyList.checkAll();
}

BuyChartContainer.prototype.uncheckAllEvent=function(event){
	this.buyList.uncheckAll();
}

BuyChartContainer.prototype.setColorEvent=function(event){
	if(!event.target)	//si no existe un target
		return true;

	if(!event.target.value)	//si captura el contenedor
		return true;

	var checkedList = this.buyList.getCheckedList();

	var target=event.target;

	if(target && this.isIntputColor(target)){
		checkedList.forEach(
				(product)=>product.setColor(target.value)
			);
	}
}

BuyChartContainer.prototype.isIntputColor=function(element){
	return element.matches("input") && element.getAttribute("type") == "color";
}


BuyChartContainer.prototype.reorderColorEvent=function(){
	this.buyList.colorSort();
}

BuyChartContainer.prototype.getElement=function(){
	return this.container;
}
