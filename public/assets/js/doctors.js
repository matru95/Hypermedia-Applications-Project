/* Get all doctors from server database and sort them in alphabetical order (sorted by "surname") */
$.get("doctors", result => {
  let sortedDoctors = sortByAttribute(result, "surname")
  for (let i = 0; i < sortedDoctors.length; i++) {
    let currentResult = sortedDoctors[i];
    
    /*Append html code */
    if (currentResult.isResponsible === 1 )
       $("#myDoctors").append("<tr><td><a href=\"doctor.html?id=" + currentResult.id + "\"><img class=\"img-responsive table-img\" src=\"" + currentResult.picture + "\"/>" + currentResult.name + " <b>" + currentResult.surname + "</b></a></td><td id=\"myTable-margin\">" + currentResult.service + "<p>[Responsible]</p></td></tr>");
    else $("#myDoctors").append("<tr><td><a href=\"doctor.html?id=" + currentResult.id + "\"><img class=\"img-responsive table-img\" src=\"" + currentResult.picture + "\" />" + currentResult.name + " <b>" + currentResult.surname + "</b></a></td><td id=\"myTable-margin\">" + currentResult.service + "</td></tr>");
  }
});