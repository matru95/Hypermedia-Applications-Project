/* Get all doctors data from database, pick the doctor by id on URL */
$.get("services", result => {
  let url = document.URL;
  let id = url.substring(url.indexOf("?id=") + 1).substr(3);
  let currentResult = result[id];

  /* Get all services from database, and find the one who match the doctor's one */
  $.get("doctors", doctorsList => {
    let thoseDoctors = currentResult.doctors.split(" ");
    let thoseDoctorsIDs = [], thoseDocAreResponsibles = [];
    for (let j = 0; j < thoseDoctors.length; j++)
      for (let i = 0; i < doctorsList.length; i++)
        if (doctorsList[i].surname === thoseDoctors[j]) {
          thoseDoctorsIDs[j] = i; 
          thoseDoctors[j] = doctorsList[i].name + " " + doctorsList[i].surname;
          thoseDocAreResponsibles[j] = doctorsList[i].isResponsible;
        }
    
    /* Append html code */
    $("#myServiceImg").append("<img class=\"single-image\" src=\"" + currentResult.picture + "\">");
    $("#myServiceData").append("<h1 class=\"myText\">" + currentResult.extname + "</h1><div class=\"table-responsive\"><table class=\"table\"><thead><tr><td><h4>Doctors operating in this service:</h4></td></tr></thead><tbody id=\"doctorsTable\"></tbody></table></div>");
    for(let j = 0; j < thoseDoctorsIDs.length; j++)
      if (thoseDocAreResponsibles[j] === true)
        $("#doctorsTable").append("<tr><td><h4><a href=\"doctor.html?id=" + thoseDoctorsIDs[j] + "\">" + thoseDoctors[j] + "<p>[Service Responsible]</p></a></h4></td></tr>");
      else $("#doctorsTable").append("<tr><td><h4><a href=\"doctor.html?id=" + thoseDoctorsIDs[j] + "\">" + thoseDoctors[j] + "</a></h4></td></tr>");
    $("#myServiceDesc").append("<p>" + currentResult.description + "</p>");

    /* Print the locations in which there is this service */
    $.get("locations", locationsList => {
      for (let i = 0; i < locationsList.length; i++) {
        let thoseServices = locationsList[i].services.split(" ");
        for (let j = 0; j < thoseServices.length; j++)
          if (thoseServices[j] === currentResult.name)        
            $("#myServiceTable").append("<tr><td><h4><a href=\"location.html?id=" + i + "\">" + locationsList[i].name + "</a></h4></td></tr>");
      }
    });
  });
});