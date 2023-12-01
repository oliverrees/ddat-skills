export interface Skill {
  skill: string;
  level: string;
  id: string;
}

export interface Role {
  ddatSkills: Skill[];
  sfiaSkills: Skill[];
  title: string;
  sfiaResponisbility: number;
  ddatParentDescription: string;
  ddatParentTitle: string;
  ddatDescription: string;
}
