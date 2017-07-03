/* Get all doctors data from database, pick the doctor by id on URL */
$.get("doctors", result => {
  let url = document.URL;
  let id = url.substring(url.indexOf("?id=") + 1).substr(3);
  let currentResult = result[id];

  /* Get all services from database, and find the one who match the doctor's one */
  $.get("services", servicesList => {
    let thisServiceID;
    let thisServiceName;
    for (let i = 0; i < servicesList.length; i++) 
      if (servicesList[i].name === currentResult.service) {
        thisServiceID = i;
        thisServiceName = servicesList[i].extname;
      }

    /* Append html code */
    $("#myDoctorImg").append("<img class=\"single-image\" src=\"" + currentResult.picture + "\">");
    $("#myDoctorData").append("<h1 class=\"myText\">" + currentResult.name + " " + currentResult.surname + "</h1><h4><p>Email: <a href=\"mailto:" + currentResult.email + "\">" + currentResult.email + "</a></p><p>Phone: " + currentResult.phone + "</p><p>Curriculum Vitae: <a href=\"" + currentResult.cv + "\">CV.pdf</a></p><p>Doctor's Service: <a href=\"service.html?id=" + thisServiceID + "\"><b>" + thisServiceName + "</b></a></p></h4>");
    if (currentResult.isResponsible === "yes" )
      $("#myDoctorData").append("<p><h4>[Service Responsible]</h4></p>");
  });
});