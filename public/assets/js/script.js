/* Function to get the current div height in pixels 
(total page height - (header + footer)) */
function getDivHeight() {
  var myHeight = 0;
  if( typeof(window.innerHeight) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if(document.documentElement && document.documentElement.clientHeight) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if(document.body && document.body.clientHeight) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
  return (myHeight - 128);
}

/* Function used for adding a style to resize a div */
function resizeDiv() {
  var sheet = document.createElement("style")
  sheet.innerHTML = "#divHeight { min-height: " + getDivHeight() + "px; }";
  document.body.appendChild(sheet);
}

// Resize the div on event (window resize)
window.addEventListener( "resize", resizeDiv() );

/* Function to sort a json by an attribute used as key. */
function sortByAttribute(json, attr) {
  return json.sort(function (x, y) {
    let prev = x[attr];
    let next = y[attr];
    if (prev < next)
      return -1;
    else if (prev > next)
      return 1
    else return 0;
  });
}