"use client";

import { useState } from "react";
import RoleSelector from "./RoleSelector";
import SenioritySelector from "./SenioritySelector";
import SkillsTable from "./SkillsTable";
import { ExportButtons } from "./ExportButtons";
import Link from "next/link";
import { Role } from "../types/sfia";
import { KeyStats } from "./KeyStats";

interface ConfigureRoleProps {
  data: Role[];
}

export const ConfigureRole = ({ data }: ConfigureRoleProps) => {
  const [selectedRole, setSelectedRole] = useState("");
  
  const [selectedSeniority, setSelectedSeniority] = useState<any>("");
  const [relevantRoles, setRelevantRoles] = useState<Role[] | null>(null);
  
  const roleDetail = data.find((role: Role) => role.title === selectedSeniority) || null;
  console.log(roleDetail)

  return (
    <>
      <div className="text-2xl font-bold">DDaT/SFIA Template Generator</div>
      <p className="mt-2">
        Generate job descriptions based on the{" "}
        <Link
          href="https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework"
          className="underline"
          target="_blank"
        >
          DDaT capability framework
        </Link> and the <Link
          href="https://www.sfia-online.org/en/framework/sfia-7"
          className="underline"
          target="_blank"
        >
          SFIA skills and competency framework
        </Link>
      </p>
      <div className="flex gap-4 mt-6 w-full border-t pt-6">
        <RoleSelector
          roles={data}
          selectedRole={selectedRole}
          onSelectRole={(roleSelected: string) => {
            setSelectedRole(roleSelected);
            const relevantRoles = data.filter((role: Role) => role.ddatParentTitle === roleSelected);
            setRelevantRoles(relevantRoles)
            setSelectedSeniority(relevantRoles[0].title);
          }}
        />
        {selectedRole && (
          <SenioritySelector
          relevantRoles={relevantRoles}
            selectedSeniority={selectedSeniority}
            onSelectSeniority={(level: string) => setSelectedSeniority(level)}
          />
        )}
      </div>
      <KeyStats roleDetail={roleDetail} />
      {/* {relevantSkills && (
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
      )} */}
    </>
  );
};
