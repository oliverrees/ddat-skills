import fs from 'fs';
const inputFilePath = 'SFIA-DDAT.json';
const inputJson = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

let previousSkills = {}
const reformattedJson = inputJson.map(obj => {
  if (obj["FIELD4"] != "Working" && obj["FIELD4"] != "Awareness" && obj["FIELD4"] != "Working" && obj["FIELD4"] != "Practitioner" && obj["FIELD4"] != "Expert" && obj["FIELD4"] != "") {
   previousSkills = obj
  } else if (obj["FIELD4"] != "") {
    const potentialArray = ["FIELD4", "FIELD5", "FIELD6", "FIELD7", "FIELD8", "FIELD9", "FIELD10", "FIELD11", "FIELD12", "FIELD13", "FIELD14", "FIELD15", "FIELD16"]
    
    const skills = potentialArray.filter(key => obj[key] !== "" && obj[key] !== undefined && obj[key] !== null)
    const skillLevels = skills.map(key => obj[key])
    const skillNames = skills.map(key => previousSkills[key])
    const skillObjects = skillNames.map((skill, index) => ({ "skill": skill, "level": skillLevels[index] }))
    obj["ddatSkills"] = skillObjects

    // Delete potentialArray fields
    delete obj["FIELD4"];
    delete obj["FIELD5"];
    delete obj["FIELD6"];
    delete obj["FIELD7"];
    delete obj["FIELD8"];
    delete obj["FIELD9"];
    delete obj["FIELD10"];
    delete obj["FIELD11"];
    delete obj["FIELD12"];
    delete obj["FIELD13"];
    delete obj["FIELD14"];
    delete obj["FIELD15"];
    delete obj["FIELD16"];


    const sfiaArray = ["FIELD24", "FIELD25", "FIELD26", "FIELD27", "FIELD28"]
    const sfiaSkills = sfiaArray.filter(key => obj[key] !== "" && obj[key] !== undefined && obj[key] !== null)
    
    
    obj["sfiaSkills"] = sfiaSkills.map(key => obj[key])

    // Delete sfiaArray fields
    delete obj["FIELD24"];
    delete obj["FIELD25"];
    delete obj["FIELD26"];
    delete obj["FIELD27"];
    delete obj["FIELD28"];

    const title = obj["FIELD3"]
    obj["title"] = title
    delete obj["FIELD3"];
    delete obj["Data"];

    const respon = obj["FIELD22"]
    obj["sfiaResponisbility"] = respon
    delete obj["FIELD22"];

    const ddatParentDescription = previousSkills["FIELD20"]
    obj["ddatParentDescription"] = ddatParentDescription
    delete obj["FIELD20"];

    const ddatParentTitle = previousSkills["FIELD2"]
    obj["ddatParentTitle"] = ddatParentTitle


    const ddatDesc = obj["FIELD20"]
    obj["ddatDesc"] = ddatDesc
    delete obj["FIELD22"];

    delete obj["FIELD2"];
    delete obj["FIELD17"];
    delete obj["FIELD18"];
    delete obj["FIELD19"];
    delete obj["FIELD21"];
    delete obj["FIELD23"];


  }
  // if (obj["FIELD3"]) {
  //   obj["skills"] = Object.keys(obj)
  //     .filter(key => key.startsWith("FIELD") && obj[key] !== "" && key !== "FIELD3")
  //     .map(key => ({ "skill": obj[key], "level": obj["FIELD3"] }));

  //   // Remove unwanted fields
  //   delete obj["FIELD4"];
  //   delete obj["FIELD5"];
  //   delete obj["FIELD6"];
  //   delete obj["FIELD7"];
  //   delete obj["FIELD8"];
  //   delete obj["FIELD9"];
  //   delete obj["FIELD10"];
  //   delete obj["FIELD11"];
  //   delete obj["FIELD12"];
  //   delete obj["FIELD13"];
  //   delete obj["FIELD21"];
  // }
  return obj;
}).filter(obj => obj["ddatParentTitle"] != null)


// Write reformatted JSON to output file
const outputFilePath = 'output.json';
fs.writeFileSync(outputFilePath, JSON.stringify(reformattedJson, null, 2));

console.log(`Reformatted JSON written to: ${outputFilePath}`);