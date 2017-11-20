
const SCRIPTS=[
	"LocalSaver.js",
	"Config.js",
	"Product.js",
	"CategoryInput.js",
	"ProductsInput.js",
	"BuyList.js", 
	"BuyChartContainer.js"
	];

const PATH="js";

var container=null;

//Crea un script
async function createScript(src){
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", PATH + "/" + src);
	document.body.appendChild(script);
}

//Carga librerías
function loadScripts(){
	SCRIPTS.forEach(
		(scriptPath)=>createScript(scriptPath)
		);
}

//Ejecuta la aplicación
function runApp(event){
	if(event.target.readyState=="complete"){
		container = new BuyChartContainer({});
		document.removeEventListener("readystatechange",runApp);
	}
}

//Inicia la aplicación
function startApp(){
	loadScripts();
	document.addEventListener("readystatechange", runApp ,false);
}

startApp();