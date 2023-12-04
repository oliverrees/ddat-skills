import Link from "next/link";
import { Skill } from "../types/sfia";
import { SortableList } from "./SortableList";

interface KeySkillsProps {
  ddatskills: Skill[];
  setddatSkills(skills: Skill[]): void;
  sfiaSkills: Skill[];
  setSfiaSkills(skills: Skill[]): void;
}

export const KeySkills = ({
  ddatskills,
  setddatSkills,
  sfiaSkills,
  setSfiaSkills,
}: KeySkillsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full items-start">
      <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col flex-grow mt-6">
        <div className="text-sm font-medium text-gray-500 mb-4">
          DDaT Role Skills (Prioritise top 4)
        </div>
        <SortableList
          items={ddatskills}
          onChange={setddatSkills}
          renderItem={(skill: Skill, index: number) => {
            const skillLink = `https://ddat-capability-framework.service.gov.uk/skills.html#${skill.id}`;
            return (
              <SortableList.Item id={skill.id} index={index}>
                <div className="flex justify-between w-full mr-8 underline">
                  <Link href={skillLink} target="new">
                    {skill.skill}
                  </Link>
                </div>
                <div className="text-gray-400">{skill.level}</div>
                <SortableList.DragHandle />
              </SortableList.Item>
            );
          }}
        />
      </div>
      <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col flex-grow-0 mt-6">
        <div className="text-sm font-medium text-gray-500 mb-4">
          SFIA Skills (Prioritise top 4)
        </div>
        <SortableList
          items={sfiaSkills}
          onChange={setSfiaSkills}
          renderItem={(skill: Skill, index: number) => {
            const skillLink = `https://www.sfia-online.org/en/sfia-8/responsibilities/${skill.skill
              .toLowerCase()
              .replace(" ", "-")}`;
            return (
              <SortableList.Item id={skill.id} index={index}>
                <div className="flex justify-between w-full mr-8 underline">
                  <Link href={skillLink} target="new">
                    {skill.skill}
                  </Link>
                </div>
                <div className="text-gray-400">Level&nbsp;{skill.level}</div>
                <SortableList.DragHandle />
              </SortableList.Item>
            );
          }}
        />
      </div>
    </div>
  );
};
