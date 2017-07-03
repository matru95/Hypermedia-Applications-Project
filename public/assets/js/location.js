/* Get all locations data from database, and find the location with id from URL */
$.get("locations", result => {
  let url = document.URL;
  let id = url.substring(url.indexOf("?id=") + 1).substr(3);
  let currentResult = result[id];
  let thoseServices = currentResult.services.split(" ");
  
  /* Append html code */
  $("#myLocation").append("<h1 class=\"myText\">" + currentResult.name + "</h1><h5>Address: " + currentResult.address + ", " + currentResult.city + " " + currentResult.cap + "</h5><h5>" + "Opening: " + currentResult.openingdays + " " + currentResult.openingtime + "</h5><h5 class=\"myText\">Telephone Number: " + currentResult.phone + "</h5><iframe src=\"" + currentResult.map + "\"width=\"100%\" height=\"500px\" frameborder=\"0\" style=\"border:0\" allowfullscreen></iframe><div class=\"col-md-12 myDiv\"><table class=\"table\"><thead><tr><th><h4 class=\"center-aligned\">A list of all services availables in this location:</h4></th></tr></thead><tbody id=\"theServices\"></tbody></table></div>");

  /* Fill the table with services data */
  $.get("services", servicesList => {
    for (let i = 0; i < thoseServices.length; i++)
      for (let j = 0; j < servicesList.length; j++)
        if (servicesList[j].name === thoseServices[i])
          $("#theServices").append("<tr><td><a href=\"service.html?id=" + j + "\"><h4>" + servicesList[j].extname + "</h4></a></td></tr>");
  });
});