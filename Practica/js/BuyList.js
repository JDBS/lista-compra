const SAVE_PRODUCT_KEY = "products";

function BuyList(config){
	this.container;
	this.productList=[];

	this.initialize(config);
}

BuyList.prototype.createContainer=function(){
	var container = document.createElement	("div");
	container.classList.add("buy-chart");

	this.container=container;

	return container;
}

BuyList.prototype.initialize=function(config){
	this.createContainer();
	window.addEventListener("beforeunload",this.save.bind(this),true);
}

BuyList.prototype.getProductByName=function(name){
	return this.productList.find(
				(element)=>element.getName()==name
		);
}

BuyList.prototype.getProductByNameAndMeasure=function(name,measure){
	return this.productList.find(
				(element)=>element.getName()==name && element.getMeasure()==measure
		);
}

BuyList.prototype.getPlural=function(text){
	if(text.slice(-1)!="s")
		text+="s";
	return text;
}

BuyList.prototype.getSingular=function(text){
	if(text.slice(-1)=="s")
		text=text.slice(0,-1);
	return text;
}

BuyList.prototype.addItem=function(config){

	//busca el producto con medidas en singular
	var product = this.getProductByNameAndMeasure(
		config.name,
		this.getSingular(config.measure)
		);

	//busca el producto con medidas en pluiral
	if(!product)
		product=this.getProductByNameAndMeasure(
					config.name,
					this.getPlural(config.measure)
					);

	if(product){
		var count=product.getCount();
		if(count==1 && config.count>0){
			var productMeasure=product.getMeasure();
			productMeasure=this.getPlural(productMeasure);
			product.setMeasure(productMeasure);
		}
		count+=parseInt(config.count);
		product.setCount(count);
	}else{
		if(config.count>1){
			product = new Product({
				name:config.name,
				measure:this.getPlural(config.measure),
				count:config.count,
				color:config.color
			});
		}else{
			product = new Product({
				name:config.name,
				measure:config.measure,
				count:config.count,
				color:config.color
			});
		}
		if(product){
			this.productList.push(product);
			this.container.appendChild(product.getElement());
		}
	}

}

BuyList.prototype.removeItemByNameAndMeasure=function(itemName,measure){
	var removeIndex=this.productList.findIndex(
			(element)=>element.getName()==itemName && element.getMeasure()==measure
		);

	var removeItem=this.productList.splice(removeIndex,1)[0];

	if(removeItem){
		this.container.removeChild(removeItem.getElement());
	}
}

BuyList.prototype.removeProducts=function(productList){
	productList.forEach(
			(product)=>this.removeItemByNameAndMeasure(product.getName(),product.getMeasure())
		)
}

BuyList.prototype.getCheckedList=function(){
	var checkedList=this.productList.filter(
			(element)=>element.checked()
		);

	return checkedList;
}

BuyList.prototype.checkAll=function(){
	this.productList.forEach(
			(product)=>product.check()
		);
}

BuyList.prototype.uncheckAll=function(){
	this.productList.forEach(
			(product)=>product.uncheck()
		);
}

BuyList.prototype.getElement=function(){
	return this.container;
}

BuyList.prototype.getProductColors=function(){
	var colorArray=[];

	this.productList.forEach(
			function(product){
				if(!colorArray.includes(product.getColor()))
					colorArray.push(product.getColor())
			}
		);

	return colorArray;
}

BuyList.prototype.colorSort=function(){
	this.productList.sort(
		(product1,product2)=>product2.getColorDecimal()-product1.getColorDecimal()
		);
	
	this.productList.forEach(
		(product)=>this.container.appendChild(product.getElement())
		);
}

BuyList.prototype.delete=function(){
	this.productList.forEach(
				(product)=>this.container.removeChild(product.getElement()).delete()
		);
}

//Método que guarda los productos
BuyList.prototype.save=function(){
	var data=[];
	this.productList.forEach(
		(product)=>data.push(product.getSaveData())
		)
	save(data,SAVE_PRODUCT_KEY); //guarda usando el método del fichero LocalSaver.js
}

//Método que carga los productos
BuyList.prototype.load=function(){
	data=load(SAVE_PRODUCT_KEY); //carga usando el método del fichero LocalSaver.js
	if(data)
		data.forEach(
			(config)=>this.addItem(config)
			)
}