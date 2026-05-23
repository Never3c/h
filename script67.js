const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* DATABASE (TEMP ARRAY) */
let companies = [];

/* HOME ROUTE */
app.get("/", (req, res) => {
  res.send("Company Portal API Running");
});

/* GET ALL COMPANIES */
app.get("/companies", (req, res) => {
  res.json(companies);
});

/* CREATE COMPANY */
app.post("/companies", (req, res) => {

  const {
    companyName,
    orgNumber,
    companyType,
    email
  } = req.body;

  /* VALIDATION */
  if (!companyName || !orgNumber || !email) {
    return res.status(400).json({
      message: "Alla fält krävs"
    });
  }

  /* CREATE OBJECT */
  const newCompany = {
    id: Date.now(),
    companyName,
    orgNumber,
    companyType,
    email,
    status: "Under granskning",
    createdAt: new Date()
  };

  companies.push(newCompany);

  res.status(201).json({
    message: "Företag registrerat",
    data: newCompany
  });

});

/* UPDATE COMPANY */
app.put("/companies/:id", (req, res) => {

  const companyId = parseInt(req.params.id);

  const company = companies.find(
    c => c.id === companyId
  );

  if (!company) {
    return res.status(404).json({
      message: "Företag hittades inte"
    });
  }

  company.companyName =
    req.body.companyName || company.companyName;

  company.orgNumber =
    req.body.orgNumber || company.orgNumber;

  company.companyType =
    req.body.companyType || company.companyType;

  company.email =
    req.body.email || company.email;

  res.json({
    message: "Företag uppdaterat",
    data: company
  });

});

/* DELETE COMPANY */
app.delete("/companies/:id", (req, res) => {

  const companyId = parseInt(req.params.id);

  companies = companies.filter(
    c => c.id !== companyId
  );

  res.json({
    message: "Företag borttaget"
  });

});

/* START SERVER */
app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});