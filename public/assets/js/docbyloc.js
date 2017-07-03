/* Get Locations data as json and append html code */
$.get("locations", result => {
  for (let i = 0; i < result.length; i++) {
    let currentResult = result[i];
    /* Pick the doctors which are in a certain location and append html code*/
    $.get("doctors", doctorsList => {
      $("#myDocByLoc").append("<div class=\"col-md-4 div-margin\"><a href=\"location.html?id=" + currentResult.id +"\"><h3 class=\"myText\">" + currentResult.name + "</h3></a><div class=\"table-responsive\"><table class=\"table\"><tbody id=\"myDocTable" + i + "\"></tbody></table></div></div>");
      for (let j = 0; j < doctorsList.length; j++)
        if (doctorsList[j].location === currentResult.city)
          $("#myDocTable" + i).append("<tr><td><a href=\"doctor.html?id=" + j + "\">" + doctorsList[j].name + " " + doctorsList[j].surname + "</a></td></tr>");
    });
  }
});