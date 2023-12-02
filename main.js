// Elements
const dayIn = document.getElementById("dayIn");
const monthIn = document.getElementById("monthIn");
const yearIn = document.getElementById("yearIn");
const dayOut = document.getElementById("dayOut");
const monthOut = document.getElementById("monthOut");
const yearOut = document.getElementById("yearOut");
const calculateBtn = document.getElementById("calculateBtn");
const errorStyle = "0.5px solid var(--Red)";

// Add blur event listeners
dayIn.addEventListener("blur", () =>
  validateDay(dayIn.value, monthIn.value, yearIn.value)
);
monthIn.addEventListener("blur", () => validateMonth(monthIn.value));
yearIn.addEventListener("blur", () =>
  validateYear(dayIn.value, monthIn.value, yearIn.value)
);

// currentDate
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// calculateBtn
calculateBtn.addEventListener("click", () => {
  const D = dayIn.value;
  const M = monthIn.value;
  const Y = yearIn.value;

  if (!validateDay(D, M, Y) || !validateMonth(M) || !validateYear(Y, M, D))
    return;

  // Age calculation
  const birthday = new Date(Y, M - 1, D);
  let years = currentDate.getFullYear() - birthday.getFullYear();
  let months = currentDate.getMonth() - birthday.getMonth();
  let days = currentDate.getDate() - birthday.getDate();
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    days += getNoOfDays(Y, M - 1);
  }

  // Display Value
  dayOut.innerText = days;
  monthOut.innerText = months;
  yearOut.innerText = years;
});

// Get Number of Days in a paticular month
function getNoOfDays(y, m) {
  return new Date(y, m, 0).getDate();
}

// Validation Functions
function validateDay(D, M, Y) {
  if (D === "") {
    showMessage(dayIn, "This field is required");
    return false;
  } else if (!validDay(Y, M, D)) {
    showMessage(dayIn, "Must be a valid day");
    return false;
  }
  showMessage(dayIn, "");
  return true;
}

function validateMonth(M) {
  if (M === "") {
    showMessage(monthIn, "This field is required");
    return false;
  } else if (!validMonth(M)) {
    showMessage(monthIn, "Must be a valid month");
    return false;
  }
  showMessage(monthIn, "");
  return true;
}

function validateYear(D, M, Y) {
  if (Y === "") {
    showMessage(yearIn, "This field is required");
    return false;
  } else if (!validYear(D, M, Y)) {
    showMessage(yearIn, "Must be a valid year");
    return false;
  }
  showMessage(yearIn, "");
  return true;
}

// Validate Day
function validDay(y, m, d) {
  return d > 0 && d <= getNoOfDays(y, m);
}

// Validate Month
function validMonth(m) {
  return m >= 1 && m <= 12;
}

// Validate Year
function validYear(y, m, d) {
  return new Date(y, m - 1, d) <= currentDate;
}

// Show Message
function showMessage(elem, msg) {
  elem.style.border = msg ? errorStyle : "";
  elem.nextElementSibling.innerText = msg;

  // メッセージがある場合は赤くする、ない場合は元の色に戻す
  if (msg) {
    elem.previousElementSibling.style.color = "var(--Red)";
  } else {
    // 元の色に戻す
    elem.previousElementSibling.style.color = "var(--Grey)";
  }
}
