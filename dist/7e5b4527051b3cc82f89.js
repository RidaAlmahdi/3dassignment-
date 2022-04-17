import*as THREE from"three";import{TWEEN}from"three/examples/jsm/libs/tween.module.min.js";import{TrackballControls}from"three/examples/jsm/controls/TrackballControls.js";import{CSS3DRenderer,CSS3DObject}from"three/examples/jsm/renderers/CSS3DRenderer.js";const table=["Rida Almohdi","Hydrogen","1.00794",1,1,"He","Helium","4.002602",18,1,"Li","Lithium","6.941",1,2,"Be","Beryllium","9.012182",2,2,"B","Boron","10.811",13,2,"C","Carbon","12.0107",14,2,"N","Nitrogen","14.0067",15,2,"O","Oxygen","15.9994",16,2,"F","Fluorine","18.9984032",17,2,"Ne","Neon","20.1797",18,2,"Na","Sodium","22.98976...",1,3,"Mg","Magnesium","24.305",2,3,"Al","Aluminium","26.9815386",13,3,"Si","Silicon","28.0855",14,3,"P","Phosphorus","30.973762",15,3,"S","Sulfur","32.065",16,3,"Cl","Chlorine","35.453",17,3,"Ar","Argon","39.948",18,3,"K","Potassium","39.948",1,4,"Ca","Calcium","40.078",2,4,"Sc","Scandium","44.955912",3,4,"Ti","Titanium","47.867",4,4,"V","Vanadium","50.9415",5,4,"Cr","Chromium","51.9961",6,4,"Mn","Manganese","54.938045",7,4,"Fe","Iron","55.845",8,4,"Co","Cobalt","58.933195",9,4,"Ni","Nickel","58.6934",10,4,"Cu","Copper","63.546",11,4,"Zn","Zinc","65.38",12,4,"Ga","Gallium","69.723",13,4,"Ge","Germanium","72.63",14,4,"As","Arsenic","74.9216",15,4,"Se","Selenium","78.96",16,4,"Br","Bromine","79.904",17,4,"Kr","Krypton","83.798",18,4,"Rb","Rubidium","85.4678",1,5,"Sr","Strontium","87.62",2,5,"Y","Yttrium","88.90585",3,5,"Zr","Zirconium","91.224",4,5,"Nb","Niobium","92.90628",5,5,"Mo","Molybdenum","95.96",6,5,"Tc","Technetium","(98)",7,5,"Ru","Ruthenium","101.07",8,5,"Rh","Rhodium","102.9055",9,5,"Pd","Palladium","106.42",10,5,"Ag","Silver","107.8682",11,5,"Cd","Cadmium","112.411",12,5,"In","Indium","114.818",13,5,"Sn","Tin","118.71",14,5,"Sb","Antimony","121.76",15,5,"Te","Tellurium","127.6",16,5,"I","Iodine","126.90447",17,5,"Xe","Xenon","131.293",18,5,"Cs","Caesium","132.9054",1,6,"Ba","Barium","132.9054",2,6,"La","Lanthanum","138.90547",4,9,"Ce","Cerium","140.116",5,9,"Pr","Praseodymium","140.90765",6,9,"Nd","Neodymium","144.242",7,9,"Pm","Promethium","(145)",8,9,"Sm","Samarium","150.36",9,9,"Eu","Europium","151.964",10,9,"Gd","Gadolinium","157.25",11,9,"Tb","Terbium","158.92535",12,9,"Dy","Dysprosium","162.5",13,9,"Ho","Holmium","164.93032",14,9,"Er","Erbium","167.259",15,9,"Tm","Thulium","168.93421",16,9,"Yb","Ytterbium","173.054",17,9,"Lu","Lutetium","174.9668",18,9,"Hf","Hafnium","178.49",4,6,"Ta","Tantalum","180.94788",5,6,"W","Tungsten","183.84",6,6,"Re","Rhenium","186.207",7,6,"Os","Osmium","190.23",8,6,"Ir","Iridium","192.217",9,6,"Pt","Platinum","195.084",10,6,"Au","Gold","196.966569",11,6,"Hg","Mercury","200.59",12,6,"Tl","Thallium","204.3833",13,6,"Pb","Lead","207.2",14,6,"Bi","Bismuth","208.9804",15,6,"Po","Polonium","(209)",16,6,"At","Astatine","(210)",17,6,"Rn","Radon","(222)",18,6,"Fr","Francium","(223)",1,7,"Ra","Radium","(226)",2,7,"Ac","Actinium","(227)",4,10,"Th","Thorium","232.03806",5,10,"Pa","Protactinium","231.0588",6,10,"U","Uranium","238.02891",7,10,"Np","Neptunium","(237)",8,10,"Pu","Plutonium","(244)",9,10,"Am","Americium","(243)",10,10,"Cm","Curium","(247)",11,10,"Bk","Berkelium","(247)",12,10,"Cf","Californium","(251)",13,10,"Es","Einstenium","(252)",14,10,"Fm","Fermium","(257)",15,10,"Md","Mendelevium","(258)",16,10,"No","Nobelium","(259)",17,10,"Lr","Lawrencium","(262)",18,10,"Rf","Rutherfordium","(267)",4,7,"Db","Dubnium","(268)",5,7,"Sg","Seaborgium","(271)",6,7,"Bh","Bohrium","(272)",7,7,"Hs","Hassium","(270)",8,7,"Mt","Meitnerium","(276)",9,7,"Ds","Darmstadium","(281)",10,7,"Rg","Roentgenium","(280)",11,7,"Cn","Copernicium","(285)",12,7,"Nh","Nihonium","(286)",13,7,"Fl","Flerovium","(289)",14,7,"Mc","Moscovium","(290)",15,7,"Lv","Livermorium","(293)",16,7,"Ts","Tennessine","(294)",17,7,"Og","Oganesson","(294)",18,7];let camera,scene,renderer,controls;const objects=[],targets={table:[],sphere:[],helix:[],grid:[]};function init(){camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,1e4),camera.position.z=3e3,scene=new THREE.Scene;for(let e=0;e<table.length;e+=5){const n=document.createElement("div");n.className="element",n.style.backgroundColor="rgba(0,127,127,"+(.5*Math.random()+.25)+")";const t=document.createElement("div");t.className="number",t.textContent=e/5+1,n.appendChild(t);const i=document.createElement("div");i.className="symbol",i.textContent=table[e],n.appendChild(i);const o=document.createElement("div");o.className="details",o.innerHTML=table[e+1]+"<br>"+table[e+2],n.appendChild(o);const r=new CSS3DObject(n);r.position.x=4e3*Math.random()-2e3,r.position.y=4e3*Math.random()-2e3,r.position.z=4e3*Math.random()-2e3,scene.add(r),objects.push(r);const a=new THREE.Object3D;a.position.x=140*table[e+3]-1330,a.position.y=-180*table[e+4]+990,targets.table.push(a)}const e=new THREE.Vector3;for(let n=0,t=objects.length;n<t;n++){const i=Math.acos(2*n/t-1),o=Math.sqrt(t*Math.PI)*i,r=new THREE.Object3D;r.position.setFromSphericalCoords(800,i,o),e.copy(r.position).multiplyScalar(2),r.lookAt(e),targets.sphere.push(r)}for(let n=0,t=objects.length;n<t;n++){const t=.175*n+Math.PI,i=-8*n+450,o=new THREE.Object3D;o.position.setFromCylindricalCoords(900,t,i),e.x=2*o.position.x,e.y=o.position.y,e.z=2*o.position.z,o.lookAt(e),targets.helix.push(o)}for(let e=0;e<objects.length;e++){const n=new THREE.Object3D;n.position.x=e%5*400-800,n.position.y=-Math.floor(e/5)%5*400+800,n.position.z=1e3*Math.floor(e/25)-2e3,targets.grid.push(n)}renderer=new CSS3DRenderer,renderer.setSize(window.innerWidth,window.innerHeight),document.getElementById("container").appendChild(renderer.domElement),controls=new TrackballControls(camera,renderer.domElement),controls.minDistance=500,controls.maxDistance=6e3,controls.addEventListener("change",render),document.getElementById("table").addEventListener("click",(function(){transform(targets.table,2e3)})),document.getElementById("sphere").addEventListener("click",(function(){transform(targets.sphere,2e3)})),document.getElementById("helix").addEventListener("click",(function(){transform(targets.helix,2e3)})),document.getElementById("grid").addEventListener("click",(function(){transform(targets.grid,2e3)})),transform(targets.table,2e3),window.addEventListener("resize",onWindowResize)}function transform(e,n){TWEEN.removeAll();for(let t=0;t<objects.length;t++){const i=objects[t],o=e[t];new TWEEN.Tween(i.position).to({x:o.position.x,y:o.position.y,z:o.position.z},Math.random()*n+n).easing(TWEEN.Easing.Exponential.InOut).start(),new TWEEN.Tween(i.rotation).to({x:o.rotation.x,y:o.rotation.y,z:o.rotation.z},Math.random()*n+n).easing(TWEEN.Easing.Exponential.InOut).start()}new TWEEN.Tween(this).to({},2*n).onUpdate(render).start()}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),render()}function animate(){requestAnimationFrame(animate),TWEEN.update(),controls.update()}function render(){renderer.render(scene,camera)}init(),animate();