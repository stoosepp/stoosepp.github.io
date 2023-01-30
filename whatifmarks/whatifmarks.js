window.addEventListener("load", (event) => {
  const inputs = document.getElementsByClassName("percentageLabel");
  console.log("Number of inputs: " + inputs.length);

  Array.prototype.forEach.call(inputs, function (input) {
    // Do stuff here
    input.addEventListener("input", function () {
      updateTotal(input);
    });
  });

  function updateTotal(input) {
    console.log("Value from input: " + input.value);
    if (Number.isInteger(parseFloat(input.value)) == false) {
      input.value = "0";
      console.log("Value is not a number");
    } else {
      if (input.classList.contains("formative")) {
        if (input.value > 5) {
          input.value = 5;
        }
      } else if (input.classList.contains("collaborative")) {
        if (input.value > 10) {
          input.value = 10;
        }
      } else if (input.classList.contains("submission")) {
        if (input.value > 30) {
          input.value = 30;
        }
      } else if (input.classList.contains("revision")) {
        if (input.value > 20) {
          input.value = 20;
        }
      }
    }

    const inputs = document.getElementsByClassName("percentageLabel");

    var projectSubPoints = 0;
    var projectRevPoints = 0;
    var formativePoints = 0;
    var collaborativePoints = 0;

    //Iterate Through inputs to calculate total
    Array.prototype.forEach.call(inputs, function (thisInput) {
      if (thisInput.classList.contains("formative")) {
        formativePoints = (
          parseFloat(thisInput.value) + parseFloat(formativePoints)
        ).toFixed(0);
      }
      if (thisInput.classList.contains("collaborative")) {
        collaborativePoints = (
          parseFloat(thisInput.value) + parseFloat(collaborativePoints)
        ).toFixed(0);
      }
      if (thisInput.classList.contains("submission")) {
        projectSubPoints = (
          parseFloat(thisInput.value) + parseFloat(projectSubPoints)
        ).toFixed(0);
      }
      if (thisInput.classList.contains("revision")) {
        projectRevPoints = (
          parseFloat(thisInput.value) + parseFloat(projectRevPoints)
        ).toFixed(0);
      }
    });
    displayTotal(
      formativePoints,
      collaborativePoints,
      projectSubPoints,
      projectRevPoints
    );
  }

  function displayTotal(
    formativePoints,
    collaborativePoints,
    projectSubPoints,
    projectRevPoints
  ) {
    console.log("Formative: " + formativePoints);
    console.log("Collaborative: " + collaborativePoints);
    console.log("Project Submission: " + projectSubPoints);
    console.log("Project Revision: " + projectRevPoints);

    //Formative
    formative = document.getElementById("formativetotal");
    formativePercentage = parseFloat((15 * formativePoints) / 25);
    if (formativePercentage % 1 != 0) {
      formative.textContent = formativePercentage.toFixed(2);
    } else {
      formative.textContent = formativePercentage.toFixed(0);
    }

    //Collaborative
    collaborative = document.getElementById("collaborativetotal");
    collaborativePercentage = parseFloat((25 * collaborativePoints) / 50);
    if (collaborativePercentage % 1 != 0) {
      collaborative.textContent = collaborativePercentage.toFixed(2);
    } else {
      collaborative.textContent = collaborativePercentage.toFixed(0);
    }

    //Project
    project = document.getElementById("projecttotal");
    projectPercentage =
      parseFloat((40 * projectSubPoints) / 30) +
      parseFloat((20 * projectRevPoints) / 20);
    if (projectPercentage % 1 != 0) {
      project.textContent = projectPercentage.toFixed(2);
    } else {
      project.textContent = projectPercentage.toFixed(0);
    }

    //Total
    totalMark =
      parseFloat(formativePercentage) +
      parseFloat(collaborativePercentage) +
      parseFloat(projectPercentage);

    currentPercentage = document.getElementById("totalmarkpercentage");

    if (totalMark % 1 != 0) {
      currentPercentage.textContent = parseFloat(totalMark).toFixed(2);
    } else {
      currentPercentage.textContent = parseFloat(totalMark).toFixed(0);
    }

    var letter = "";
    if (totalMark >= 85) {
      letter = "High Distinction";
    } else if (totalMark < 85 && totalMark >= 75) {
      letter = "Distinction";
    } else if (totalMark < 75 && totalMark >= 65) {
      letter = "Credit";
    } else if (totalMark < 64 && totalMark >= 50) {
      letter = "Pass";
    } else if (totalMark < 50) {
      letter = "N (Fail)";
    }

    console.log("Letter Grade is " + letter);
    currentLetter = document.getElementById("totalmarkletter");
    currentLetter.textContent = letter;
    total = document.getElementsByClassName("grandtotal")[0];
    if (letter == "N (Fail)") {
      total.classList.remove("pass");
      total.classList.add("fail");
    } else {
      total.classList.remove("fail");
      total.classList.add("pass");
    }
  }
});
