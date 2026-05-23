const companyForm = document.getElementById("companyForm");

companyForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const companyName =
    document.getElementById("companyName").value;

  const orgNumber =
    document.getElementById("orgNumber").value;

  if (companyName === "") {
    alert("Skriv företagsnamn");
    return;
  }

  if (orgNumber === "") {
    alert("Skriv organisationsnummer");
    return;
  }

  alert("Företag registrerat!");
});