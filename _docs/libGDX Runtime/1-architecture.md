---
title: Architecture & ECS
category: libGDX Runtime
order: 1
---

HyperLap2D is built on top of **Artemis-odb**, a high-performance Entity Component System (ECS) framework. Unlike traditional Object-Oriented Programming (OOP) where you use inheritance (e.g., `class Player extends GameObject`), ECS uses **composition**.

Understanding this architecture is key to writing clean, performant, and scalable game logic.

### The Core Concepts

ECS consists of three main pillars:

1.  **Entities**: They are just unique Integer IDs. They are distinct "things" in your world (a player, a tree, a bullet). They have no methods and no data directly attached to them.
2.  **Components**: They are pure data holders (POJOs). They contain *no logic*. They define the "what" of an entity (e.g., `EnemyComponent`, `HealthComponent`).
3.  **Systems**: They contain the logic. They process entities that possess a specific set of components. They define the "how" (e.g., `MovementSystem`, `RenderSystem`).
4.  **Scripts**: Specific logic attached to a single entity, useful for input handling or complex actor-specific behavior (like a Player Controller).

### 1. Entities

In Artemis-odb, an Entity is not a heavy object; it is simply an `int`.
When you use the `SceneLoader`, it creates entities for you based on the JSON data.

```java
// Retrieving an entity ID using ItemWrapper
int playerEntityId = root.getChild("player").getEntity();
```

### 2. Components (Data)

Components act as "Aspects" or "Properties" of an entity. If an entity has a `TransformComponent` and a `SpriteComponent`, it will be rendered. If you add a `PhysicsBodyComponent`, it becomes a physical object.

**HyperLap2D Standard Components:**
The runtime provides standard components for rendering (handling coordinates, sizes, tints, etc.).

**Creating Custom Components:**
For your game logic, you should create your own components.

```java
import com.artemis.PooledComponent;

public class HealthComponent extends PooledComponent {
    public float currentHealth = 100;
    public float maxHealth = 100;
    public boolean isDead = false;

    @Override
    protected void reset() {
        currentHealth = 100;
        isDead = false;
    }
}
```

> **Best Practice:** Keep components strictly for data. Do not add methods like `takeDamage()` inside a Component. That logic belongs in a System.

### 3. Systems (Logic)

Systems are where the magic happens. A System usually iterates over all entities that match a specific "Family" of components.

For example, a `HealthSystem` might care about entities that have both `HealthComponent` and `TransformComponent`.

```java
import com.artemis.systems.IteratingSystem;
import com.artemis.annotations.All;

@All({HealthComponent.class, TransformComponent.class})
public class HealthSystem extends IteratingSystem {

    // Artemis automatically injects ComponentMappers for fast access
    protected ComponentMapper<HealthComponent> mHealth;
    protected ComponentMapper<TransformComponent> mTransform;

    @Override
    protected void process(int entityId) {
        HealthComponent health = mHealth.get(entityId);
        
        // Logic example:
        if (health.currentHealth <= 0 && !health.isDead) {
            health.isDead = true;
            System.out.println("Entity " + entityId + " just died at " + mTransform.get(entityId).x);
        }
    }
}
```

### 4. Scripts (Specific Logic)

While Systems are great for global logic, they can be verbose for specific behaviors like a **Player Controller** or a **Button**.
Scripts bridge the gap between ECS and OOP, allowing you to attach logic to a single entity.

HyperLap2D offers `BasicScript` and `PhysicsBodyScript`. The latter is powerful because it wraps Box2D collision listeners specifically for the entity it is attached to.

### Registering your Systems

To make your system run, you must add it to the `SceneConfiguration` before loading the scene.

```java
SceneConfiguration config = new SceneConfiguration();

// Add your custom logic systems
config.addSystem(new PlayerControlSystem());
config.addSystem(new HealthSystem()); // The system we created above

mSceneLoader = new SceneLoader(config);
```

### Component Mappers

You might have noticed `ComponentMapper` in the example above. In Artemis-odb, you **never** want to retrieve components manually inside a loop (it's slow).

Instead, you define a `ComponentMapper` field. Artemis injects dependencies automatically when the system is added to the world.

```java
// Fast retrieval
mHealth.get(entityId).currentHealth -= 10;
```

### Communication between Systems

Since Systems are decoupled, how do they talk to each other?

1.  **Flags in Components:** One system sets a boolean flag in a component (e.g., `jumpRequested = true`), and another system processes it and resets it.
2.  **Events:** You can use a dedicated Event System, but keeping logic inside the ECS loop is usually cleaner.

### System vs Script: What to choose?

| Feature | System | Script |
| :--- | :--- | :--- |
| **Scope** | Global (All entities with X components) | Local (Attached to specific entity) |
| **Use Case** | Gravity, Rendering, AI Swarms, Cooldowns | Player Input, UI Buttons, Boss Phases |
| **Data Access** | Fast Iteration via Mappers | Direct access via Mappers + Local State |

### Best Practices for Game Structure

1.  **Granularity:** Don't make a giant `GameComponent` with all data. Split it into `StatsComponent`, `InventoryComponent`.
2.  **Systems do one thing:** Avoid a massive `GameLogicSystem`. Create a `MovementSystem`, `CombatSystem`, `UISystem`.
3.  **Separation of Concerns:**
    * Use **Systems** for rules of the world (e.g., "Bullets damage things").
    * Use **Scripts** for intentions of the actor (e.g., "I want to shoot a bullet").
4.  **Communication:**
    * Scripts should often just modify Component data (e.g., set `isJumping = true`).
    * Systems should react to that data (e.g., process the jump movement).
5.  **Tags vs Components:** Use Tags (via `MainItemComponent`) for creating Components for behavior (like "Walkable").