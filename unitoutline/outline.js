import { Descriptions } from "./unitcontent.js";
import { Outcomes } from "./unitcontent.js";
import { HROutcomes } from "./unitcontent.js";
import { StaticContent } from "./staticcontent.js";
export function generateUnitOutline({ forUnit: unit, andTri: trimester }) {
  var outlineContent = "";
  //Headers
  const introHeader = "<h2 id='introduction'>Introduction</h2>";
  //Description
  const descHeader = "<h3>Description</h3>";
  //Visual Outline
  const vizHeader = "<h3>Visual Outline</h3>";
  //Official LO
  const loHeader = "<h3>Learning Objectives (Official)</h3>";
  //Unofficial LO
  const hrloHeader = "<h3>Human-Readable Learning Objectives (Unofficial)</h3>";

  //Deal with different Units
  var unitdesc = "";
  const tocMenu = StaticContent.stickyMenu;
  const loIntro = StaticContent.outcomesIntro;
  var unitlo = "";
  var unithrlo = "";
  switch (unit) {
    case "EDIT313":
      // code block
      break;
    case "EDIT415":
      // code block
      break;
    case "EDIT426":
      unitdesc = Descriptions.EDIT426;
      unitlo = loIntro + Outcomes.EDIT426;
      unithrlo = loIntro + HROutcomes.EDIT426;
      break;
    case "EDIT513":
      // code block
      break;
    case "EDIT517":
      // code block
      break;
    case "EDIT518":
      // code block
      break;
    case "EDIT521":
      // code block
      break;
    default:
    // code block
  }
  outlineContent += tocMenu;
  outlineContent += introHeader;
  outlineContent += descHeader + unitdesc;
  outlineContent += vizHeader + StaticContent.vizoutline;

  outlineContent += loHeader + unitlo;
  outlineContent += hrloHeader + unithrlo;

  //Academic Support
  const resourcesHeader = "<h2 id='resources'>Readings and Resources</h2>";
  const resources = StaticContent.resources;
  outlineContent += resourcesHeader + resources;

  //Academic Support
  const acsupportHeader = "<h2 id='academicsupport'>Academic Support</h2>";
  const academicSupport = StaticContent.academicSupport;
  outlineContent += acsupportHeader + academicSupport;

  const genHeader = "<h2 id='general'>General Information</h2>";
  const general = StaticContent.general;
  outlineContent += genHeader + general;

  const copyrightHeader = "<h2 id='copyright'>Copyright</h2>";
  const copyright = "Authorship, Attributions & Copyright";
  outlineContent += copyrightHeader + copyright;

  document.getElementById("unit-outline").innerHTML = outlineContent;
}
