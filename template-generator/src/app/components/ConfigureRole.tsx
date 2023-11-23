"use client";

import { useState } from "react";
import RoleSelector from "./RoleSelector";
import SenioritySelector from "./SenioritySelector";
import SkillsTable from "./SkillsTable";
import { ExportButtons } from "./ExportButtons";
import Link from "next/link";

interface ConfigureRoleProps {
  processedData: any;
}

export const ConfigureRole = ({ processedData }: ConfigureRoleProps) => {
  const [role, setRole] = useState("");
  const [selectedSeniority, setSelectedSeniority] = useState<any>({
    id: 0,
    name: "Junior",
  });
  const { uniqueRoles, skillsByRole } = processedData;

  const relevantSkills = role
    ? skillsByRole.filter((skill: any) => skill.role === role)[0].skills
    : null;

  return (
    <>
      <div className="text-2xl font-bold">DDaT Template Generator</div>
      <p className="mt-2">
        Generate a job descriptions and interview scoring sheets based on the{" "}
        <Link
          href="https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework"
          className="underline"
          target="_blank"
        >
          DDaT capability framework
        </Link>
      </p>
      <div className="flex gap-4 mt-6 w-full border-t pt-6">
        <RoleSelector
          uniqueRoles={uniqueRoles}
          selectedRole={role}
          onSelectRole={(roleSelected: string) => {
            setRole(roleSelected);
          }}
        />
        {role && (
          <SenioritySelector
            selectedSeniority={selectedSeniority}
            onSelectSeniority={(level: string) => setSelectedSeniority(level)}
          />
        )}
      </div>
      {relevantSkills && (
        <>
          <ExportButtons
            role={role}
            relevantSkills={relevantSkills}
            selectedSeniority={selectedSeniority.id}
          />
          {relevantSkills.map((skill: any, index: number) => (
            <SkillsTable
              key={index}
              skill={skill}
              selectedSeniority={selectedSeniority.id}
            />
          ))}
        </>
      )}
    </>
  );
};
