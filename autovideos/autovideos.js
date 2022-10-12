class VideoURLs {
  static EDIT426 = [
    "qOVQHOF02bk", //Welcome
    //"75Z7kif2Jtc", //Week 0
    "xg4h4aTMAos", //Week 1 & 2
    "cEbJXv2_GdM", //Week 3 & 4
    "tyJAJtANDLI", //Week 5 & 6
    "DGIXT7ce3vQ",
    "R62iY40QzFs", //Week 9 & 10
    "f9OQXtD3MzQ", //Week 11 & 12
    "x0z7J4uwfcI", //Week 13
  ];
  static EDIT425 = [
    "-A3ENshdsyI", //Welcome
    //"EB3Qe97fSNs", //Week 0
    "yRoaslCOOsY", //Week 1 & 2
    "PlKi2FJCKzg", //Week 3 & 4
    "DvS3q2VDJoQ", //Week 5 & 6
    "DGIXT7ce3vQ",
    "Dz12w87Q9x4", //Week 9 & 10
    "2Bu12b74aQU", //Week 11 & 12
    "MIWzlFJn2Ps", //Week 13
  ];
  static EDIT518 = [
    "e_SFRVM-9Hs", //Welcome
    //"rUGDNUxCrn8", //Week 0
    "hWUMq0lpbXE", //Week 1 & 2
    "aMQIqKEihKA", //Week 3 & 4
    "97W7jvlXRWw", //Week 5 & 6
    "DGIXT7ce3vQ",
    "vJ1OoyawmdU", //Week 9 & 10
    "uRQ2XDU1z3Y", //Week 11 & 12
    "_Kon2wKSyoo", //Week 13
  ];
  static EDIT521 = [
    "Pc0UaFgJivg", //Welcome
    //"XZLSHCIqWTM", //Week 0
    "ga-lHFJV1GA", //Week 1 & 2
    "HR2YRM7020w", //Week 3 & 4
    "gLxcRbhR1Ig", //Week 5 & 6
    "DGIXT7ce3vQ",
    "B9JRxTK6B7E", //Week 9 & 10
    "K5AzDP9hSF8", //Week 11 & 12
    "YugFzjazsn4", //Week 13
  ];
}

class Events {
  static whatson = [
    "Nothing On this Week. Review all the materials an we'll get started next week!",
    "Questions & Qoffee: ",
    "Live Session: ",
    "Nothing going on this Week.",
  ];
}

//const today = new Date();

function getDateList(startDate, weeklyInterval, trimester) {
  let dateList = [];
  //Add Week 0
  const week0 = new Date(startDate);
  week0.setDate(week0.getDate() - 7);
  week0.setHours(0, 0, 0, 0);

  dateList.push({ week: 0, date: week0 });
  //Add First Week
  dateList.push({ week: 1, date: startDate });

  var currentWeek = 2;
  if (weeklyInterval == 2) {
    currentWeek = 3;
  }

  while (currentWeek <= 14) {
    //Add interval Week to list
    let thisDate = new Date(week0);
    thisDate.setDate(week0.getDate() + currentWeek * 7);

    if (trimester == "T3" && currentWeek >= 9) {
      //console.log("It's Tri 3! Skipping the holidays");
      thisDate.setDate(thisDate.getDate() + 14);
    }
    dateList.push({ week: currentWeek, date: thisDate });

    if (weeklyInterval == 2 && currentWeek == 13) {
      let week14 = new Date(thisDate);
      week14.setDate(thisDate.getDate() + 7);
      dateList.push({ week: 14, date: week14 });
    }
    currentWeek += weeklyInterval;
    //console.log("Current Week: " + currentWeek + " -> Date: " + thisDate);
  }
  return dateList;
}

function getCurrentVideoIndex(forToday, fromDateList) {
  //Get List of Dates
  var thisDateList = fromDateList.map(function (item) {
    return item.date;
  });
  //console.log(thisDateList);

  for (let i = 0; i < thisDateList.length; i++) {
    const fromDate = thisDateList[i];
    const toDate = thisDateList[i + 1];
    if (forToday < thisDateList[0]) {
      //Before Tri Starts
      return 0;
    } else if (forToday > fromDate && forToday < toDate) {
      //During Tri
      //console.log(`${fromDate} ... ${toDate}`);
      return i;
    } else if (forToday > thisDateList[thisDateList.length - 1]) {
      //After Tri ends
      return thisDateList.length - 1;
    }
  }
}

export function setUpVideos({ forUnit: unit, andTri: trimester }) {
  const classStartDate = new Date("2022-10-24"); //Must be in format YYYY-MM-DD
  classStartDate.setHours(0, 0, 0, 0);
  const today = new Date();
  const dateList = getDateList(classStartDate, 2, "T3");

  //Load up video URLs from static Class.
  var videoPlaceHolders = [];
  switch (unit) {
    case "EDIT426":
      videoPlaceHolders = VideoURLs.EDIT426;
      break;
    case "EDIT425":
      videoPlaceHolders = VideoURLs.EDIT425;
      break;
    case "EDIT518":
      videoPlaceHolders = VideoURLs.EDIT518;
      break;
    case "EDIT521":
      videoPlaceHolders = VideoURLs.EDIT521;
      break;

    default:
  }

  //get Index of Current Video
  const index = getCurrentVideoIndex(today, dateList);
  document.getElementsByClassName("embed-container")[0].innerHTML =
    '<iframe src="https://www.youtube.com/embed/' +
    videoPlaceHolders[index] +
    '"title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}
