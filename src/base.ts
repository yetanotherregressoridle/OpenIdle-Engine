import { CategoryConfig, ResourceConfig, EncounterConfig, EncounterID, EnemyConfig, ActionConfig, ActionID, ResourceID, ItemConfig, EnemyID, SkillID, SkillConfig, ProgressionConfig } from "./types";
import * as ResourcesModule from "./data/resources";
import * as EncountersModule from "./data/encounters";
import * as EnemiesModule from "./data/enemies";
import * as ActionsModule from "./data/actions";
import * as ItemsModule from "./data/items";
import * as SkillsModule from "./data/skills";
import * as ProgressionModule from "./data/progression";
import * as MetaProgressionModule from "./data/metaprogression";
import * as CategoriesModule from "./data/categories";

const allCategories: CategoryConfig[] = [];
const allResources: ResourceConfig[] = [];
const allEncounters: EncounterConfig[] = [];
const allEnemies: EnemyConfig[] = [];
const allActions: ActionConfig[] = [];
const allItems: ItemConfig[] = [];
const allSkills: SkillConfig[] = [];
const allProgression: ProgressionConfig[] = [];
const allMetaProgression: ProgressionConfig[] = [];

const modules: any[] = [
    CategoriesModule,
    ResourcesModule,
    EncountersModule,
    EnemiesModule,
    ActionsModule,
    ItemsModule,
    SkillsModule,
    ProgressionModule,
    MetaProgressionModule,
];

modules.forEach(mod => {
    if (mod.CATEGORIES) allCategories.push(...mod.CATEGORIES);
    if (mod.RESOURCES) allResources.push(...mod.RESOURCES);
    if (mod.ENCOUNTERS) allEncounters.push(...mod.ENCOUNTERS);
    if (mod.ENEMIES) allEnemies.push(...mod.ENEMIES);
    if (mod.ACTIONS) allActions.push(...mod.ACTIONS);
    if (mod.ITEMS) allItems.push(...mod.ITEMS);
    if (mod.SKILLS) allSkills.push(...mod.SKILLS);
    if (mod.PROGRESSION) allProgression.push(...mod.PROGRESSION);
    if (mod.META_PROGRESSION) allMetaProgression.push(...mod.META_PROGRESSION);
});

export const CATEGORIES = allCategories;
export const RESOURCES = allResources;
export const RESOURCE_CONFIG_MAP = allResources.reduce((acc, resource) => {
    acc[resource.id] = resource;
    return acc;
}, {} as Record<ResourceID, ResourceConfig>);
export const ENCOUNTERS = allEncounters;
export const ENCOUNTER_CONFIG_MAP = allEncounters.reduce((acc, encounter) => {
    acc[encounter.id] = encounter;
    return acc;
}, {} as Record<EncounterID, EncounterConfig>);
export const ENEMIES = allEnemies;
export const ENEMY_CONFIG_MAP = allEnemies.reduce((acc, enemy) => {
    acc[enemy.id] = enemy;
    return acc;
}, {} as Record<EnemyID, EnemyConfig>);
export const ACTIONS = allActions;
export const ACTION_CONFIG_MAP = allActions.reduce((acc, action) => {
    acc[action.id] = action;
    return acc;
}, {} as Record<ActionID, ActionConfig>);
export const SKILLS = allSkills;
export const SKILL_CONFIG_MAP = allSkills.reduce((acc, skill) => {
    acc[skill.id] = skill;
    return acc;
}, {} as Record<SkillID, SkillConfig>);