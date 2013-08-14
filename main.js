var canvas;
var viewer;
var logoTimerID = 0;

function init() {
	canvas = document.getElementById('cv');
	viewer = new JSC3D.Viewer(canvas);
	viewer.setParameter('SceneUrl', 'models/1.obj');
	viewer.setParameter('InitRotationX', 20);
	viewer.setParameter('InitRotationY', 20);
	viewer.setParameter('InitRotationZ', 0);
	viewer.setParameter('ModelColor', '#ff4444');
	viewer.setParameter('BackgroundColor1', '#666666');
	viewer.setParameter('BackgroundColor2', '#565656');
	viewer.setParameter('Definition', 'standard');
	viewer.setParameter('SphereMapUrl', 'models/chrome.jpg');
	viewer.init();
	viewer.update();
	
	ocode = document.inputform.income.value;
	lcode = ocode.split("\n");
	lcnt = lcode.length;
	var income = parsing();
	
	vertices = new Array();
	faces = new Array();
	
	parseCommand(income);
}
function reset(){
	viewer.replaceSceneFromUrl('models/reset.obj');
	viewer.update();
}