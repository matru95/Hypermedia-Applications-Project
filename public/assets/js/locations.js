/* Get all Locations from database as json */
$.get("locations", result => {
  for (let i = 0; i < result.length; i++) {
    let currentResult = result[i];
    
    /* Append html code */
    $("#myLocations").append("<div class=\"col-md-4\"><a href=\"location.html?id=" + currentResult.id +"\"><h3 class=\"myText\">" + currentResult.name + "</h3></a><p class=\"myText\">Address: " + currentResult.address + ", " + currentResult.city + " " + currentResult.cap + "</p><iframe class=\"myMap\" src=\"" + currentResult.map + "\"width=\"100%\" height=\"300px\" frameborder=\"0\" style=\"border:0\" allowfullscreen></iframe></div>");
  }
});