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

  return (
    <div className="flex gap-4 mt-4 justify-end border-b pb-6">
      <button
        type="button"
        disabled
        className="rounded-md w-full opacity-20 bg-blue-600 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
