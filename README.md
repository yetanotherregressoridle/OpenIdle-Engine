# Yet Another Regressor Idle

This is an experimental project to see how to make a looping incremental/idle game using the OpenIdle Engine.

[Play at yetanotherregressoridle.github.io](https://yetanotherregressoridle.github.io).

## Game Idea

In each loop, the player increases their character's non-persistent stats/equipment/skills (resources that are reset on looping) and advances the story by defeating enemies and meeting other resource requirements.

The player increases their persistent progress by earning achievements.

As the player earns achievements, the set of choices available in each loop increases.

## Concepts

| Concept | Explanation |
| --- | --- |
| Loop | Player does tasks and actions until the loop's time is reached. Once the time is reached, the player's tasks/actions/items/stats are reset. |
| Achievement | Resource that persists through loops. Main form of permanent progression. |

## Gaps Using OpenIdle Engine

| Gameplay Feature | Engine Feature | Explanation/Approaches |
| --- | --- | --- |
| Achievement | Resource with effect/always-equipped, auto-equipped item | The engine currently doesn't support resources that applies a benefit once, only recurring benefits. Items don't model achievements perfectly because the engine user would need to define a unique achievement slot for each achievement and the player would need to manually equip the achievement.<br><b>Potential Implementation:</b><br>Add an effects field to the resource config. The challenge here is that I wouldn't be able to use reset_resource_modifiers with this approach because it would remove the achievement's benefit. Perhaps it would make more sense to have achievements as a special time of item that are always equipped without player intervention. |
| Varied combat | Potential failure for tasks/variable amount of progress | I want to represent combat as tasks where each enemy is a task and the progressRequired field is the enemy's health.<br>Currently, tasks don't fit well into the regular idea of combat or any encounter that can fail.<br>Progress through tasks are currently based on time only, the progressRequired field.<br>If a task is unlocked for the player, this means the player will always succeed at the task if the cost can be met.<br>This would lead to uninteresting combat because there is no way to have combat-based stats like attack or defense that would modify how much health a task costs or how much progress is made.<br>This feature could be used for more than combat. As an example, if a user has a better pickaxe, the user might perform the same "mine for resources" task at a faster rate or with reduced stamina cost.<br><b>Potential Implementation:</b><br>Add a concept of an encounter that allows engine users to define the progressRequired, define how progress is calculated, and define how cost is calculated. |
| Loop mechanic | Reset task/action execution count | Once a loop is finished, the task/action execution count should be reset to prevent temporary progress from persisting.<br><b>Potential Implementation:</b><br> Add set_executions effect. |
| Change player options based on stats/achievements | Lock tasks/actions based on whether a resource's capacity is exceeded | Rather than lock a task/action based on other tasks/actions, lock a task/action based on whether a resource capacity was exceeded.<br>Example usage: A set of "achievements" that can be tackled in any order but gets progressively harder for each "achievement" by locking out actions that grant the "achievement" with lower conditions.<br><b>Potential Implementation:</b><br>https://github.com/simonfruehauf/OpenIdle-Engine/commit/9c29dce778013cac63c6fc5838d20f9f2f897199 |
| Choice reminder | Locked but visible tasks/actions | The player will make choices that restrict them from certain other choices, such as selecting a faction.<br>The player should be able to view choices that they can no longer choose in the current loop but might prefer in a future loop.<br>This is different from choices that the player has not been aware of yet and are locked and invisible.<br><b>Potential Implementation:</b><br>Add and use a wasVisible field that is a one-way gate that starts with the same value as startUnlocked and can be set to true if checkIsVisible is ever true. |





## License

MIT
