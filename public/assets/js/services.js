/* Get services json data from database */
$.get("services", result => {
  for (let i = 0; i < result.length; i++) {
    let currentResult = result[i];
    /* Append html code */
    $("#myServices").append("<tr><td><a href=\"service.html?id=" + currentResult.id + "\"><img class=\"img-responsive table-img\" src=\"" + currentResult.picture + "\"/><h3>" + currentResult.extname + "</h3></a></td><td id=\"myTable-margin\">" + currentResult.title + "</td></tr>");
  }
});