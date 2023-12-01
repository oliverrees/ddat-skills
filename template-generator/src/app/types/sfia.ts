export interface Skill {
  skill: string;
  level: string;
}

export interface Role {
  ddatSkills: Skill[];
  sfiaSkills: string[];
  title: string;
  sfiaResponisbility: number;
  ddatParentDescription: string;
  ddatParentTitle: string;
}