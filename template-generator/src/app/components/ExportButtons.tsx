import { saveAs } from "file-saver";
const ExcelJS = require("exceljs");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.async-iterator");
require("regenerator-runtime/runtime");

import { CSVLink } from "react-csv";
import { Role, Skill } from "../types/sfia";
interface ExportButtonsProps {
  title?: string;
  description?: string;
  startDate?: string;
  ddatSkills: Skill[];
  sfiaSkills: Skill[];
  roleDetail: Role;
}

export const ExportButtons = ({
  title,
  description,
  ddatSkills,
  sfiaSkills,
  roleDetail,
  startDate,
}: ExportButtonsProps) => {
  const csvData = [["Skill", "Rating (1-5)", "Notes"]];

  ddatSkills.forEach((skill: Skill, index: number) => {
    csvData.push([skill.skill, "", ""]);
  });

  const downloadWorkbook = async () => {
    const workbook = new ExcelJS.Workbook();
    const defaultStyle = { font: { size: 12 } };
    const boldStyle = { font: { bold: true } };
    const titleStyle = {
      font: { bold: true, size: 14 },
    };
    const gridTitleStyle = {
      font: { bold: true, size: 14 },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const gridTitleStyleNoBold = {
      font: { size: 12 },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };
    const inputStyle = {
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      size: 12,
      alignment: {
        vertical: "middle",
        horizontal: "left",
      },
    };
    const explainerStyle = {
      font: { size: 9, italic: true },
      alignment: {
        vertical: "top",
        horizontal: "left",
      },
    };

    const sheet = workbook.addWorksheet("Who we are looking for");

    sheet.style = { ...defaultStyle };
    sheet.views = [{ showGridLines: false }];
    const cellC3 = sheet.getCell("C3");
    cellC3.value = "Role Title";
    cellC3.style = { ...titleStyle };

    const cellC4 = sheet.getCell("C4");
    cellC4.value = "What is the title for this search?";
    cellC4.style = { ...explainerStyle };
    sheet.getRow(4).height = 20;

    const cellC5 = sheet.getCell("C5");
    cellC5.value = title;
    cellC5.style = { ...inputStyle };
    sheet.mergeCells("C5:G6");

    const cellI3 = sheet.getCell("I3");
    cellI3.value = "Ideal start date";
    cellI3.style = { ...titleStyle };
    sheet.mergeCells("I3:K3");

    const cellI4 = sheet.getCell("I4");
    cellI4.value = "When do you want this person to start?";
    cellI4.style = { ...explainerStyle };
    sheet.mergeCells("I4:K4");

    const cellI5 = sheet.getCell("I5");
    cellI5.value = startDate;
    cellI5.style = { ...inputStyle };
    sheet.mergeCells("I5:K6");

    const cellC9 = sheet.getCell("C9");
    cellC9.value = "DDaT role";
    cellC9.style = { ...titleStyle };

    const cellC10 = sheet.getCell("C10");
    cellC10.value = "What DDaT role does this person match?";
    cellC10.style = { ...explainerStyle };
    sheet.getRow(10).height = 20;

    const cellC11 = sheet.getCell("C11");
    cellC11.value = roleDetail.title;
    cellC11.style = { ...inputStyle };
    sheet.mergeCells("C11:G12");

    const cellI9 = sheet.getCell("I9");
    cellI9.value = "SFIA Level";
    cellI9.style = { ...titleStyle };

    const cellI10 = sheet.getCell("I10");
    cellI10.value = "What SFIA level does this person match?";
    cellI10.style = { ...explainerStyle };

    const cellI11 = sheet.getCell("I11");
    cellI11.value = roleDetail.sfiaResponisbility;
    cellI11.style = { ...inputStyle };
    sheet.mergeCells("I11:K12");

    const cellC15 = sheet.getCell("C15");
    cellC15.value = "Role Description";
    cellC15.style = { ...titleStyle };

    const cellC17 = sheet.getCell("C17");
    cellC17.style = { ...inputStyle };
    cellC17.value = description;
    cellC17.alignment = { wrapText: true, vertical: "top" };
    sheet.mergeCells("C17:K30");

    const cellC33 = sheet.getCell("C33");
    cellC33.value = "Essential DDaT skills";
    cellC33.style = { ...titleStyle };

    const cellC35 = sheet.getCell("C35");
    cellC35.style = { ...inputStyle, ...boldStyle };
    sheet.mergeCells("C35:G35");
    cellC35.value = "Skill";
    const cellH35 = sheet.getCell("H35");
    cellH35.style = { ...inputStyle, ...boldStyle };
    sheet.mergeCells("H35:K35");
    cellH35.value = "Level";

    // Only take first 3 skills 
    const ddatSliced = ddatSkills.slice(0, 4)
    const sfiaSliced = sfiaSkills.slice(0, 4)


    ddatSliced.forEach((skill: Skill, index: number) => {

      const cell = sheet.getCell(`C${index + 36}`);
      cell.value = skill.skill;
      cell.style = { ...inputStyle };
      sheet.mergeCells(`C${index + 36}:G${index + 36}`);

      const cell2 = sheet.getCell(`H${index + 36}`);
      cell2.value = skill.level;
      cell2.style = { ...inputStyle };
      cell2.dataValidation = {
        type: "list",
        allowBlank: true,
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Select a level",
        error: "Please select a DDaT level from the dropdown.",
        formulae: ['"Awareness,Working,Practitioner,Expert"'],
      };
      sheet.mergeCells(`H${index + 36}:K${index + 36}`);
    });

    const cellSfia = sheet.getCell(`C${ddatSliced.length + 38}`);
    cellSfia.value = "Essential SFIA skills needed";
    cellSfia.style = { ...titleStyle };

    const cellSfiaTitle = sheet.getCell(`C${ddatSliced.length + 40}`);
    cellSfiaTitle.style = { ...inputStyle, ...boldStyle };
    sheet.mergeCells(`C${ddatSliced.length + 40}:G${ddatSliced.length + 40}`);
    cellSfiaTitle.value = "Skill";

    const cellSfiaSubTitle = sheet.getCell(`H${ddatSliced.length + 40}`);
    cellSfiaSubTitle.style = { ...inputStyle, ...boldStyle };
    sheet.mergeCells(`H${ddatSliced.length + 40}:K${ddatSliced.length + 40}`);
    cellSfiaSubTitle.value = "Level";

    sfiaSliced.forEach((skill: Skill, index: number) => {

      const cell = sheet.getCell(`C${index + 41 + ddatSliced.length}`);
      cell.value = skill.skill;
      cell.style = { ...inputStyle };
      sheet.mergeCells(
        `C${index + 41 + ddatSliced.length}:G${index + 41 + ddatSliced.length}`
      );

      const cell2 = sheet.getCell(`H${index + 41 + ddatSliced.length}`);
      cell2.value = skill.level;
      cell2.style = { ...inputStyle };

      sheet.mergeCells(
        `H${index + 41 + ddatSliced.length}:K${index + 41 + ddatSliced.length}`
      );
    });

    const sheet2 = workbook.addWorksheet("Who we've found");

    sheet2.style = { ...defaultStyle };
    sheet2.views = [{ showGridLines: false }];

    const titleCell = sheet2.getCell("A1");
    titleCell.value = "Candidate Name";
    titleCell.style = { ...gridTitleStyle };
    sheet2.mergeCells("A1:B2");

    const titleCell2 = sheet2.getCell("C1");
    titleCell2.style = { ...gridTitleStyle };
    titleCell2.value = "DDaT Skills";
    titleCell2.alignment = { horizontal: "center" };
    const numberOfDdatSkills = ddatSliced.length;
    sheet2.mergeCells(`C1:${String.fromCharCode(66 + numberOfDdatSkills)}1`);

    const titleCell3 = sheet2.getCell(
      `${String.fromCharCode(67 + numberOfDdatSkills)}1`
    );

    titleCell3.style = { ...gridTitleStyle };
    titleCell3.value = "SFIA Skills";
    titleCell3.alignment = { horizontal: "center" };
    const numberOfSfiaSkills = sfiaSliced.length;

    sheet2.mergeCells(
      `${String.fromCharCode(67 + numberOfDdatSkills)}1:${String.fromCharCode(
        66 + numberOfDdatSkills + numberOfSfiaSkills
      )}1`
    );

    ddatSliced.forEach((skill: Skill, index: number) => {
      const cell = sheet2.getCell(`${String.fromCharCode(67 + index)}2`);
      cell.value = skill.skill;
      cell.style = { ...gridTitleStyleNoBold };
      sheet2.getColumn(index + 3).width = 20;
      cell.alignment = {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      };
    });

    sfiaSliced.forEach((skill: Skill, index: number) => {
      const cell = sheet2.getCell(
        `${String.fromCharCode(67 + numberOfDdatSkills + index)}2`
      );
      cell.value = skill.skill;
      cell.style = { ...gridTitleStyleNoBold };
      sheet2.getColumn(index + 3 + numberOfDdatSkills).width = 20;
      cell.alignment = {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      };
    });

    const candidateArray = Array.from({ length: 5 }, () => "");

    candidateArray.forEach((candidate, index) => {
      const row = sheet2.getRow(index + 3);
      row.height = 40;
      const cell = row.getCell("A");
      cell.style = { ...inputStyle };
      sheet2.mergeCells(`A${index + 3}:B${index + 3}`);

      ddatSliced.forEach((skill: Skill, index: number) => {
        const cell = row.getCell(`${String.fromCharCode(67 + index)}`);
        cell.value = "";
        cell.style = { ...inputStyle };
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Select a level",
          error: "Please select a DDaT level from the dropdown.",
          formulae: ['"Awareness,Working,Practitioner,Expert"'],
        };
      });

      sfiaSliced.forEach((skill: Skill, index: number) => {
        const cell = row.getCell(
          `${String.fromCharCode(67 + numberOfDdatSkills + index)}`
        );
        cell.value = "";
        cell.style = { ...inputStyle };
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          showErrorMessage: true,
          errorStyle: "error",
          errorTitle: "Select a level",
          error: "Please select a SFIA level from the dropdown.",
          formulae: ['"1,2,3,4,5"'],
        };
      });
    });

    const border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thick" },
    };
    sheet2
      .getColumn(String.fromCharCode(66 + numberOfDdatSkills))
      .eachCell((cell: any) => {
        cell.border = border;
      });
    sheet2.getColumn("B").eachCell((cell: any) => {
      cell.border = border;
    });

    await workbook.xlsx
      .writeBuffer()
      .then((buffer: any) =>
        saveAs(new Blob([buffer]), `${roleDetail.title}_Job_Description.xlsx`)
      )
      .catch((err: any) => {
        console.log("Error writing excel export", err);
      });
  };

  return (
    <div className="flex gap-4 mt-6  pb-6">
      <button
        type="button"
        className="rounded-md w-full bg-blue-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={downloadWorkbook}
      >
        Export Template Job Description
      </button>
    </div>
  );
};
