class VideoURLs {
  static EDIT415 = [
    "X", //Welcome
    //"EB3Qe97fSNs", //Week 0
    "X", //Week 1 & 2
    "X", //Week 3 & 4
    "X", //Week 5 & 6
    "X",
    "X", //Week 9 & 10
    "X", //Week 11 & 12
    "X", //Week 13
  ];
  static EDIT425 = [
    "lYDw05HIayE", //Welcome
    //"EB3Qe97fSNs", //Week 0
    "14qnVK60YXM", //Week 1 & 2
    "NAmeFmSnJqA", //Week 3 & 4
    "fml5R_r4DLo", //Week 5 & 6
    "DGIXT7ce3vQ",
    "kffeQ3_CLqQ", //Week 9 & 10
    "yNSs6PKChRI", //Week 11 & 12
    "3UEbA1D7Y-0", //Week 13
  ];
  static EDIT426 = [
    "alhCYDrtgzs", //Welcome
    //"75Z7kif2Jtc", //Week 0
    "r_fTa8QmIRQ", //Week 1 & 2
    "Mt8UdXTMLW0", //Week 3 & 4
    "HRbNPuBJ-F4", //Week 5 & 6
    "DGIXT7ce3vQ",
    "kP9hgtJpW9w", //Week 9 & 10
    "S9jirJlhP0U", //Week 11 & 12
    "3UEbA1D7Y-0", //Week 13
  ];

  static EDIT518 = [
    "iayVJ8VdHvM", //Welcome
    //"rUGDNUxCrn8", //Week 0
    "GmKJJ1VDoUE", //Week 1 & 2
    "4S-dsxI1EnY", //Week 3 & 4
    "WuFJokLqF1I", //Week 5 & 6
    "DGIXT7ce3vQ",
    "A8X_UrMPu5Y", //Week 9 & 10
    "zBhnWRT8J7M", //Week 11 & 12
    "3UEbA1D7Y-0", //Week 13
  ];
  static EDIT521 = [
    "e5oJX_jEzD0", //Welcome
    //"XZLSHCIqWTM", //Week 0
    "9wAcxp55Bco", //Week 1 & 2
    "Q5t1eaLhM18", //Week 3 & 4
    "o7xXdjoEjlk", //Week 5 & 6
    "DGIXT7ce3vQ",
    "5H7CMePLyVg", //Week 9 & 10
    "SB08-lkRmHA", //Week 11 & 12
    "3UEbA1D7Y-0", //Week 13
  ];
}

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
    case "EDIT415":
      videoPlaceHolders = VideoURLs.EDIT415;
      break;
    case "EDIT425":
      videoPlaceHolders = VideoURLs.EDIT425;
      break;
    case "EDIT426":
      videoPlaceHolders = VideoURLs.EDIT426;
      break;
    case "EDIT513":
      videoPlaceHolders = VideoURLs.EDIT513;
      break;
    case "EDIT517":
      videoPlaceHolders = VideoURLs.EDIT517;
      break;
    case "EDIT518":
      videoPlaceHolders = VideoURLs.EDIT518;
      break;
    case "EDIT521":
      videoPlaceHolders = VideoURLs.EDIT521;
      break;

    default:
  }
  //const videoList = getVideosFor();

  //get Index of Current Video
  const index = getCurrentVideoIndex(today, dateList);
  document.getElementsByClassName("embed-container")[0].innerHTML =
    '<iframe src="https://www.youtube.com/embed/' +
    videoPlaceHolders[index] +
    '"title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

// async function getVideosFor() {
//   fetch("../data.json")
//     .then((res) => res.json()) // the .json() method parses the JSON response into a JS object literal
//     .then((data) => {
//       console.log(data.videos);
//       console.log(data.videos.EDIT425);
//       //return data.videos;
//     });
// }
