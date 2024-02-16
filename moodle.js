class VideoURLs {
  static EDIT426 = [
    "75Z7kif2Jtc", //Week 0
    "xg4h4aTMAos", //Week 1 & 2
    "cEbJXv2_GdM", //Week 3 & 4
    "tyJAJtANDLI", //Week 5 & 6
    "Week 7",
    "R62iY40QzFs", //Week 9 & 10
    "f9OQXtD3MzQ", //Week 11 & 12
    "x0z7J4uwfcI", //Week 13
  ];
  static EDIT425 = [
    "EB3Qe97fSNs", //Week 0
    "yRoaslCOOsY", //Week 1 & 2
    "PlKi2FJCKzg", //Week 3 & 4
    "DvS3q2VDJoQ", //Week 5 & 6
    "Week 7",
    "Dz12w87Q9x4", //Week 9 & 10
    "2Bu12b74aQU", //Week 11 & 12
    "MIWzlFJn2Ps", //Week 13
  ];
  static EDIT521 = [
    "XZLSHCIqWTM", //Week 0
    "ga-lHFJV1GA", //Week 1 & 2
    "HR2YRM7020w", //Week 3 & 4
    "gLxcRbhR1Ig", //Week 5 & 6
    "Week 7",
    "B9JRxTK6B7E", //Week 9 & 10
    "K5AzDP9hSF8", //Week 11 & 12
    "YugFzjazsn4", //Week 13
  ];
}

function setUpVideos({ forUnit: unit, andTri: trimester }) {
  const classStartDate = new Date("2022-12-17"); //Must be in format YYYY-MM-DD
  let weekStarts = [1, 3, 5, 7, 9, 11, 13, 14];
  //const today = new Date();
  const today = new Date("2022-10-24");
  var videoPlaceHolders = [];

  switch (unit) {
    case "EDIT426":
      videoPlaceHolders = VideoURLs.EDIT426;
      break;
    case "EDIT425":
      videoPlaceHolders = VideoURLs.EDIT425;
      break;
    case "EDIT521":
      videoPlaceHolders = VideoURLs.EDIT521;
      break;
    default:
    // code block
  }
  if (trimester === "T3") {
    console.log("Updating Week Intervals for HolidayBreak");
    weekStarts = [1, 3, 5, 7, 11, 13, 15, 16];
  }
  const vidStartDates = getBiWeeklyDates(weekStarts);
  console.log(vidStartDates);
  const index = getVideo();
  document.getElementsByClassName("embed-container")[0].innerHTML =
    '<iframe src="https://www.youtube.com/embed/' +
    videoPlaceHolders[index] +
    '"title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  function getVideo() {
    for (let i = 0; i < vidStartDates.length; i++) {
      if (today > vidStartDates[i] && today < vidStartDates[i + 1]) {
        //console.log("✅ date is between the 2 dates, with I:" + i);
        return i;
      } else {
        //console.log("⛔️ date is not in the range with I:" + i);
      }
    }
  }
  function etDate() {
    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    return day + "-" + month + "-" + year;
  }

  function getBiWeeklyDates(weeklyInvervals) {
    let weekStartArray = [];
    weekStartArray.push(classStartDate); //Adds the first stay of class
    weeklyInvervals.forEach(function (week) {
      const newWeek = addWeeks(week);
      weekStartArray.push(newWeek);
    });
    return weekStartArray;
  }

  function addWeeks(numWeeks) {
    let nextDate = new Date(classStartDate);
    nextDate.setDate(classStartDate.getDate() + numWeeks * 7);
    return nextDate;
  }
}
