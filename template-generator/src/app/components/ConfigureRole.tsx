"use client";

import { useRef, useState } from "react";
import RoleSelector from "./RoleSelector";
import SenioritySelector from "./SenioritySelector";
import { ExportButtons } from "./ExportButtons";
import Link from "next/link";
import { Role, Skill } from "../types/sfia";
import { KeyStats } from "./KeyStats";
import { KeySkills } from "./KeySkills";

interface ConfigureRoleProps {
  data: Role[];
}

export const ConfigureRole = ({ data }: ConfigureRoleProps) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSeniority, setSelectedSeniority] = useState<any>("");
  const [relevantRoles, setRelevantRoles] = useState<Role[] | null>(null);
  const [roleDetail, setRoleDetail] = useState<Role | null>(null);
  const [ddatSkills, setDdatSkills] = useState<Skill[]>([]);
  const [sfiaSkills, setSfiaSkills] = useState<Skill[]>([]);

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

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
        </Link>{" "}
        and the{" "}
        <Link
          href="https://www.sfia-online.org/en/framework/sfia-7"
          className="underline"
          target="_blank"
        >
          SFIA skills and competency framework
        </Link>
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full border-t pt-6">
        <RoleSelector
          roles={data}
          selectedRole={selectedRole}
          onSelectRole={(roleSelected: string) => {
            setSelectedRole(roleSelected);
            const relevantRoles = data.filter(
              (role: Role) => role.ddatParentTitle === roleSelected
            );
            const defaultSeniority = relevantRoles[0].title;
            setRelevantRoles(relevantRoles);
            setSelectedSeniority(defaultSeniority);
            const roleDetail =
              data.find((role: Role) => role.title === defaultSeniority) ||
              null;
            setRoleDetail(roleDetail);
            if (roleDetail) {
              setDdatSkills(roleDetail.ddatSkills);
              setSfiaSkills(roleDetail.sfiaSkills);
            }
          }}
        />
        {selectedRole && (
          <SenioritySelector
            relevantRoles={relevantRoles}
            selectedSeniority={selectedSeniority}
            onSelectSeniority={(level: string) => {
              setSelectedSeniority(level);
              const roleDetail =
                data.find((role: Role) => role.title === level) || null;
              setRoleDetail(roleDetail);
              if (roleDetail) {
                setDdatSkills(roleDetail.ddatSkills);
              }
            }}
          />
        )}
      </div>
      {roleDetail && (
        <>
          <KeyStats
            roleDetail={roleDetail}
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            dateRef={dateRef}
          />
          <KeySkills
            ddatskills={ddatSkills}
            setddatSkills={setDdatSkills}
            sfiaSkills={sfiaSkills}
            setSfiaSkills={setSfiaSkills}
          />

          <ExportButtons
            title={titleRef.current?.innerHTML}
            startDate={dateRef.current?.value}
            description={descriptionRef.current?.innerHTML}
            ddatSkills={ddatSkills}
            sfiaSkills={sfiaSkills}
            roleDetail={roleDetail}
          />
        </>
      )}
    </>
  );
};
