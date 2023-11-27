import { saveAs } from 'file-saver';
const ExcelJS = require('exceljs');
require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');


import { CSVLink } from "react-csv";
interface ExportButtonsProps {
  role: string;
  relevantSkills: any;
  selectedSeniority: number;
}

export const ExportButtons = ({
  relevantSkills,
  selectedSeniority,
  role,
}: ExportButtonsProps) => {
  const csvData = [["Skill", "Rating (1-5)", "Notes"]];

  relevantSkills.forEach((skill: any, index: number) => {
    const subSkills =
      skill.levels[Object.keys(skill.levels)[selectedSeniority]];
    if (subSkills.length === 0) return;
    index > 0 && csvData.push(["", "", ""]);
    csvData.push([skill.title, "", ""]);
    subSkills.map((level: any) => {
      level = level.charAt(0).toUpperCase() + level.slice(1);
      csvData.push([level, "0", ""]);
    });
  });


  const downloadWorkbook = async () => {
    const workbook = new ExcelJS.Workbook();
    const defaultStyle = { font: { size: 12 } };
    const boldStyle = { font: { bold: true } };
    const titleStyle = { font: { bold: true, size: 14 } };
    const inputStyle = {
        border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        },
        size: 12,
        alignment: {
            vertical: 'middle',
            horizontal: 'left'
        }
    };
    const explainerStyle = {
        font: { size: 9, italic: true },
        alignment: {
            vertical: 'top',
            horizontal: 'left'
        }
    };


    const sheet = workbook.addWorksheet('Who we are looking for');
    
    sheet.style = {...defaultStyle};
    sheet.views = [{ showGridLines: false }];
    const cellC3 = sheet.getCell('C3');
    cellC3.value = "Search Title";
    cellC3.style = {...titleStyle};

    const cellC4 = sheet.getCell('C4');
    cellC4.value = "What is the title for this search?";
    cellC4.style = {...explainerStyle};
    sheet.getRow(4).height = 20;

    const cellC5 = sheet.getCell('C5');
    cellC5.value = "";
    cellC5.style = {...inputStyle};
    sheet.mergeCells('C5:K6');
    

    const cellC9 = sheet.getCell('C9');
    cellC9.value = "DDaT role";
    cellC9.style = {...titleStyle};

    const cellC10 = sheet.getCell('C10');
    cellC10.value = "What DDaT role does this person match?";
    cellC10.style = {...explainerStyle};
    sheet.getRow(10).height = 20;

    const cellC11 = sheet.getCell('C11');
    cellC11.value = role;
    cellC11.style = {...inputStyle};
    sheet.mergeCells('C11:K12');

    const cellC15 = sheet.getCell('C15');
    cellC15.value = "What kind of problems will this person be working on?";
    cellC15.style = {...titleStyle};

    const cellC17 = sheet.getCell('C17');
    cellC17.style = {...inputStyle};
    sheet.mergeCells('C17:K30');

    
    const cellC33 = sheet.getCell('C33');
    cellC33.value = "What are the essential skills needed?";
    cellC33.style = {...titleStyle};

    const cellC35 = sheet.getCell('C35');
    cellC35.style = {...inputStyle, ...boldStyle};
    sheet.mergeCells('C35:G35');
    cellC35.value = "Skill";
    const cellH35 = sheet.getCell('H35');
    cellH35.style = {...inputStyle, ...boldStyle};
    sheet.mergeCells('H35:K35');
    cellH35.value = "Level";

    relevantSkills.forEach((skill: any, index: number) => {
     const cell = sheet.getCell(`C${index + 36}`);
      cell.value = skill.title;
      cell.style = {...inputStyle};
      sheet.mergeCells(`C${index + 36}:G${index + 36}`);
      
      const cell2 = sheet.getCell(`H${index + 36}`);
      cell2.value = "Select";
      cell2.style = {...inputStyle};
      cell2.dataValidation = {
        type: 'list',
        allowBlank: true,
        showErrorMessage: true,
        errorStyle: 'error',
        errorTitle: 'Select a level',
        error: 'Please select a DDaT level from the dropdown.',
        formulae: ['"Awareness,Working,Practitioner,Expert"']
      };
      sheet.mergeCells(`H${index + 36}:K${index + 36}`);
    }
    );

    const relevantCount = relevantSkills.length;

    const techStack = sheet.getCell(`C${relevantCount + 38}`);
    techStack.value = "What technology will they be using?";
    techStack.style = {...titleStyle};
    sheet.mergeCells(`C${relevantCount + 38}:K${relevantCount + 38}`);

    const techStackInput = sheet.getCell(`C${relevantCount + 40}`);
    techStackInput.style = {...inputStyle, ...boldStyle};
    sheet.mergeCells(`C${relevantCount + 40}:G${relevantCount + 40}`);

    techStackInput.value = "Technology";
    const techStackLevel = sheet.getCell(`H${relevantCount + 40}`);
    techStackLevel.style = {...inputStyle, ...boldStyle};
    sheet.mergeCells(`H${relevantCount + 40}:K${relevantCount + 40}`);
    techStackLevel.value = "Level";

    
    const techStackArray = Array.from(Array(5).keys());  

    techStackArray.forEach((_, index:number) => {
      const cell = sheet.getCell(`C${relevantCount + index + 41}`);
       cell.style = {...inputStyle};
       sheet.mergeCells(`C${relevantCount + index + 41}:G${relevantCount + index + 41}`);
       
       const cell2 = sheet.getCell(`H${relevantCount + index + 41}`);
       cell2.style = {...inputStyle};
       cell2.dataValidation = {
         type: 'list',
         allowBlank: true,
         showErrorMessage: true,
         errorStyle: 'error',
         errorTitle: 'Select a level',
         error: 'Please select a DDaT level from the dropdown.',
         formulae: ['"Awareness,Working,Practitioner,Expert"']
       };
       sheet.mergeCells(`H${relevantCount + index + 41}:K${relevantCount + index + 41}`);
     }
     );

     const startCell = sheet.getCell(`C${relevantCount + techStackArray.length + 43}`);
     startCell.value = "What's the ideal start date?";
     startCell.style = {...titleStyle};
      sheet.mergeCells(`C${relevantCount + techStackArray.length + 43}:K${relevantCount + techStackArray.length + 43}`);
 
     const startCell2 = sheet.getCell(`C${relevantCount + techStackArray.length + 45}`);
     startCell2.style = {...inputStyle};
      sheet.mergeCells(`C${relevantCount + techStackArray.length + 45}:K${relevantCount + techStackArray.length + 46}`);

      const compromiseCell = sheet.getCell(`C${relevantCount + techStackArray.length + 49}`);
      compromiseCell.value = "Are you willing to compromise on any of the essential skills?";
      compromiseCell.style = {...titleStyle};
       sheet.mergeCells(`C${relevantCount + techStackArray.length + 49}:K${relevantCount + techStackArray.length + 49}`);
  
      const compromiseCell2 = sheet.getCell(`C${relevantCount + techStackArray.length + 51}`);
      compromiseCell2.style = {...inputStyle};
       sheet.mergeCells(`C${relevantCount + techStackArray.length + 51}:K${relevantCount + techStackArray.length + 52}`);

       const cExplainer = sheet.getCell(`C${relevantCount + techStackArray.length + 50}`);
       cExplainer.value = "If a candidate has the right attitude and aptitude, can we compromise on skills?";
       cExplainer.style = {...explainerStyle};
       sheet.getRow(relevantCount + techStackArray.length + 49).height = 20;

       // border around the whole form 
      


    await workbook.xlsx.writeBuffer()
  .then((buffer: any)  => saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
  .catch((err : any) => {console.log('Error writing excel export', err)})
  }


  return (
    <div className="flex gap-4 mt-4 justify-end border-b pb-6">
      <button
        type="button"
        className="rounded-md w-full bg-blue-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={downloadWorkbook}
      >
        Export Job Description
      </button>
      <CSVLink
        data={csvData}
        filename={`${role} Scoring.csv`}
        className="rounded-md w-full text-center bg-blue-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Export Scoring Sheet
      </CSVLink>
    </div>
  );
};
