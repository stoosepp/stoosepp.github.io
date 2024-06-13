class Events {
  static whatson = [
    "Questions & Qoffee: ",
    "Live Session: ",
    "Nothing On this Week. Have a look around at the first few 'tiles' below and finish up the Week 0 section and we'll get started next week!",
    "Remember to Complete the Unit Outline Quiz in Week 0 to unlock the rest of the unit!",
    "Nothing going on this Week.",
    "Final Questions & Qoffee Wrap up session! Check for details below.",
  ];
  static whatson313 = [

  ];
}

function getDateList(startDate, trimester) {
  let dateList = [];
  //Add Week 0
  const week0 = new Date(startDate);
  week0.setDate(week0.getDate() - 7);
  week0.setHours(0, 0, 0, 0);
  dateList.push({ week: 0, date: week0 });
  //Add First Week
  dateList.push({ week: 1, date: startDate });

  var currentWeek = 2;
  while (currentWeek <= 14) {
    //Add interval Week to list
    let thisDate = new Date(week0);
    thisDate.setDate(week0.getDate() + currentWeek * 7);

    if (trimester == "T3" && currentWeek >= 9) {
      //console.log("It's Tri 3! Skipping the holidays");
      thisDate.setDate(thisDate.getDate() + 14);
    }
    dateList.push({ week: currentWeek, date: thisDate });
    currentWeek += 1;
    //console.log("Current Week: " + currentWeek + " -> Date: " + thisDate);
  }
  return dateList;
}

function getCurrentWeek(forToday, fromDateList) {
  //Get List of Dates
  var thisDateList = fromDateList.map(function (item) {
    return item.date;
  });
  console.log(thisDateList);
  for (let i = 0; i < thisDateList.length; i++) {
    const fromDate = thisDateList[i];
    const toDate = thisDateList[i + 1];
    if (forToday < thisDateList[0]) {
      //Before Tri Starts
      return 0;
    } else if (forToday > fromDate && forToday < toDate) {
      //During Tri
      console.log(`${fromDate} ... ${toDate}`);
      return i;
    } else if (forToday > thisDateList[thisDateList.length - 1]) {
      //After Tri ends
      return thisDateList.length - 1;
    }
  }
}
export function displayWhatsOn({
  forStartDate: theStartDate,
  forTri: trimester,
}) {
  const classStartDate = new Date(theStartDate);
  classStartDate.setHours(0, 0, 0, 0);
  //const today = new Date("2022-10-5");//Test Date

  const today = new Date();
  today.setHours(0, 0, 0, 1);
  //console.log("Today is  " + today);
  var messages = Events.whatson;
  const dateList = getDateList(classStartDate, trimester);
  const thisWeek = getCurrentWeek(today, dateList);
  //console.log("It's Week " + thisWeek);
  var message = "";
  let heading = `Week ${thisWeek}: What's on this week?`;
  const result = thisWeek % 2;

  if (result == 1) {
    //console.log("Even Week! Live Session");
    message = messages[1] + "Specific date/time and Zoom Join link below.";
  } else {
    //console.log("Odd Week! Questions & Qoffee");
    // message = messages[0] + "Specific date/time and Zoom Join link below.";
    message =
      "Nothing going on this week. Study and work on your project and reach out if you have any questions!"; //Mo Q&A Sessions
  }
  if (thisWeek == 0) {
    heading = "It's Zero Week!";
    //message = messages[2] + " " + messages[3];
  } else if (thisWeek == 1) {
    //message = message + messages[3];
  } else if (thisWeek == 7 || thisWeek == 8) {
    heading = "Assessment & Intensive Period";
   //message = messages[4];
  } else if (thisWeek == 13) {
    //message = messages[5];
  } else if (thisWeek > 13) {
    heading = "Teaching has ended for this Trimester";
    //message = "";
  }
  message = "Check below for Live Session Dates and Times."

  document.getElementById("heading").innerHTML = heading;
  document.getElementById("details").innerHTML = message;
}
