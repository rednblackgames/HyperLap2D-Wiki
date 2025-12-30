---
title: Getting Started
category: libGDX Runtime
order: 2
---

The Runtime needs to be included in your `core` project.

```groovy
dependencies {
    //HyperLap2D Runtime
    api "games.rednblack.hyperlap2d:runtime-libgdx:$h2dVersion"

    //Mandatory
    api "com.badlogicgames.gdx:gdx:$gdxVersion"
    api "com.badlogicgames.gdx:gdx-box2d:$gdxVersion"
    api "com.badlogicgames.gdx:gdx-freetype:$gdxVersion"
    api "net.onedaybeard.artemis:artemis-odb:$artemisVersion"
}
```

Use the [compatibility table](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx#support) to choose the right version for each dependency.

> Box2D and FreeType extensions need additional configuration for platform specific modules

### Architecture

HyperLap2D's libGDX runtime is based on the Entity Component System (ECS) architecture using the [Artemis-odb](https://github.com/junkdog/artemis-odb) library. If you are not familiar with this kind of design pattern, please consider [learning more](https://en.wikipedia.org/wiki/Entity_component_system) before reading further.

### SceneLoader

A `SceneLoader` is the object that helps you set up the minimal working configuration for HyperLap2D. It parses the `JSON` format to build the ECS Engine, Entities, and all required Components to render your scenes and assets.

```java
//Create a viewport
mViewport = new ExtendViewport(360, 640, 0, 0, mCamera);

//Create a configuration to setup SceneLoader object
SceneConfiguration configuration = new SceneConfiguration();
//Add User defined systems
configuration.addSystem( ... );
//Tells Runtime to automatically attach a component to entites loaded with a specific TAG.
configuration.addTagTransmuter( ... );

//Initialize HyperLap2D's SceneLoader, all assets will be loaded here
mSceneLoader = new SceneLoader(configuration);
//Load the desired scene with custom viewport
mSceneLoader.loadScene("MainScene", mViewport);
```

If not specified, by default the SceneLoader creates a ScreenViewport. In many cases this is not what you want, especially if you target a Pixel per World Unit other than 1. You can measure the size of your world using [guidelines]({{ site.baseurl }}{% link _docs/editor/2-editor-ui.md %}#guidelines) in order to choose the best Viewport for your scene.

#### SceneConfiguration

The `SceneConfiguration` class is the configuration object used to initialize the `SceneLoader`. It allows you to customize the rendering pipeline (Batch size, Stencil, MSAA), inject external physics worlds, and manage the ECS systems before the engine starts.

##### Rendering & FrameBuffer Settings

You can customize the `Batch` used by the engine, enable the Stencil buffer, or configure Multi-Sample Anti-Aliasing (MSAA).

**Note:** Using MSAA (samples > 0) usually requires a GLES 3.0+ context.

```java
// 1. Default setup (Batch size: 2000, No Stencil, No MSAA)
SceneConfiguration config = new SceneConfiguration();

// 2. Custom Batch size
// Useful to reduce draw calls in scenes with many sprites
SceneConfiguration config = new SceneConfiguration(4000);

// 3. Advanced Setup: Custom Batch, Stencil enabled, and 4x MSAA samples
SceneConfiguration config = new SceneConfiguration(new TextureArrayCpuPolygonSpriteBatch(), true, 4);
```

##### Systems Management

By default, `SceneConfiguration` adds all the standard HyperLap2D systems. You can inject your own Artemis-odb systems or replace existing ones.

```java
// Add a custom logic system
config.addSystem(new PlayerControllerSystem());

// Disable or Replace a built-in system
// If you add a system of the same class as a built-in one, it replaces the original.
config.removeSystem(LightSystem.class);
```

##### Physics & Lighting Injection

If your game architecture manages the Box2D `World` or Box2DLights `RayHandler` externally (outside of the SceneLoader), you must inject them here. If not set, `SceneLoader` will create new instances automatically.

```java
config.setWorld(myGameWorld);
config.setRayHandler(myRayHandler);
```

##### Tag Transmuters

Tag Transmuters allow you to automatically attach specific Components to entities based on the **Tag** assigned in the Editor. This is useful for binding game logic to entities without manual parsing.

```java
// Automatically adds 'EnemyComponent' to any entity tagged "enemy_walker"
config.addTagTransmuter("enemy_walker", EnemyComponent.class);
```

##### Other Configuration Methods

* **`setCullingEnabled(boolean)`**: Toggles the `CullingSystem`. When `true` (default), entities outside the camera view are not rendered.
* **`setResourceRetriever(IResourceRetriever)`**: Sets a custom resource manager strategy.
* **`setExternalItemTypes(ExternalTypesConfiguration)`**: Used to register custom entity types supported by editor plugins.
* **`setExpectedEntityCount(int)`**: Optimizes the Artemis world by hinting the expected number of entities (default is 128).

### Loading with `AssetManager`

libGDX's [AssetManager](https://libgdx.com/wiki/managing-your-assets){:target="_blank"} can be used to load a HyperLap2D project.

```java
mAssetManager = new AssetManager();
mAssetManager.setLoader(AsyncResourceManager.class, new ResourceManagerLoader(mAssetManager.getFileHandleResolver()));
mAssetManager.load("project.dt", AsyncResourceManager.class);


mAssetManager.finishLoading();
//or
mAssetManager.update();

//When AssetManager finish loading
AsyncResourceManager mAsyncResourceManager = mAssetManager.get("project.dt", AsyncResourceManager.class);

SceneConfiguration configuration = new SceneConfiguration();
config.setResourceRetriever(mAsyncResourceManager);

...

mSceneLoader = new SceneLoader(config);
```

### Rendering scene

The Runtime Engine already has all necessary Systems for rendering and basic entity manipulation. `SceneLoader` is a wrapper for all these features. This will make rendering very easy; just update the ECS Engine.

```java
@Override
public void render() {
    //Clear screen
    Gdx.gl.glClearColor(0, 0, 0, 1);
    Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

    //Apply ViewPort and update SceneLoader's ECS engine
    mViewport.apply();
    mSceneLoader.getEngine().process();
}
```

### Retrieve Entities and navigate through composites

Entities are represented as integers; any definition is provided by their `Components`. To help navigation and manipulation of elements, the `ItemWrapper` class can be used, which exposes some useful methods. By default, all objects are placed in a single `root` Composite.

```java
ItemWrapper root = new ItemWrapper(mSceneLoader.getRoot(), mSceneLoader.getEngine());
```

Composites are groups of entities. They can be retrieved with the `ItemWrapper#getChild` method using the object's unique identifier.

```java
ItemWrapper foo = root.getChild("foo");
```

### Default Components

There are several default components created for each Entity.

* `MainItemComponent` : This is present in almost any object and contains core information like entity type, identifier, unique Id, custom variables etc.
* `TransformComponent`, `DimensionsComponent`, `TintComponent`, `ZIndexComponent` : These are present in almost any object too and contain information like position, dimension, origin point, rotation, z-index, color etc.
* `NodeComponent` : Is present in any `Composite Item`; it stores children references as `Integer` objects.
* `ViewportComponent` : Can be present only on a single Entity. It's the point where the rendering pipeline starts from. Usually the `root` composite has this component.

Specific components are created based on the entity's type, for example `TextureRegionComponent`, `LabelComponent`, `ActionComponent` ,`LightObjectComponent`, `ParticleComponent`, `SpriteAnimationComponent`, `PhysicsBodyComponent` and much more. [Full list](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx/tree/master/src/main/java/games/rednblack/editor/renderer/components)

### Actions System

HyperLap2D uses an Actions System similar to [libGDX's Scene2D actions](https://github.com/libgdx/libgdx/wiki/Scene2d#actions) but for the ECS pattern. You can manually create actions in Java, or use the [Node Graph Editor](https://github.com/rednblackgames/HyperLap2D/wiki/Actions).

```java
ActionData rotation = Actions.sequence(
            Actions.delay(2),
            Actions.parallel(
                    Actions.moveBy(-30, -30, 5, Interpolation.pow2),
                    Actions.rotateBy(180, 2, Interpolation.exp5))
    );
ActionData repeatData = Actions.forever(rotation);

Actions.addAction(entity, repeatData, mSceneLoader.getEngine());
```

**Load Actions from library**

```java
//Simple Actions can be loaded and attached
ActionData actionData = mSceneLoader.loadActionFromLibrary("testAction");
Actions.addAction(entity, actionData, mSceneLoader.getEngine());

//Complex actions can be loaded with params and event listener
ObjectMap<String, Object> params = new ObjectMap<>();
params.put("delay", 2f);

ActionData actionData = mSceneLoader.getActionFactory().loadFromLibrary("test", params, new ActionEventListener() {
    @Override
    public void onActionEvent(String s) {
        System.out.println("Triggered event: " + s);
    }
});

Actions.addAction(entity, actionData, mSceneLoader.getEngine());
```

### Create entities at runtime with `EntityFactory`

`EntityFactory` helps you create objects ready to be used with this runtime. Before creating the real entity, you have to describe it using a `VO` class. Common `VO`s are: `SimpleImageVO`, `Image9patchVO`, `LabelVO`, `CompositeItemVO`, `ParticleEffectVO`, `LightVO`, `SpriteAnimationVO`, `ColorPrimitiveVO`, `TalosVO`, `SpineVO`. [Full list](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx/tree/master/src/main/java/games/rednblack/editor/renderer/data)

```java
LabelVO labelVO = new LabelVO();
labelVO.itemIdentifier = "unique_id_name";
labelVO.text = "This is a runtime label";
labelVO.style = "Lato";
labelVO.size = 26;
labelVO.layerName = "Default";
labelVO.x = 10;
labelVO.y = 10;
labelVO.width = 100;
labelVO.height = 100;

int label = mSceneLoader.getEntityFactory().createEntity(root.getEntity(), labelVO);
```

**Load Composite Item from HyperLap2D's Library**

```java
int newEntity = mSceneLoader.loadFromLibrary("libraryName", "LayerName/Default", x, y);
```

Or if a more fine control on Composite creation is needed:

```java
CompositeItemVO sheepData = mSceneLoader.loadVoFromLibrary("sheep");
sheepData.layerName = "Default";
sheepData.x = 100;
sheepData.y = 100;

int sheep = mSceneLoader.getEntityFactory().createEntity(root.getEntity(), sheepData);
mSceneLoader.getEntityFactory().initAllChildren(sheep, sheepData);
```

### Attaching Scripts to Entities

Scripts are very helpful to handle events both from users and from other internal objects. As like any other Artemis object, scripts are automatically injected when created.

```java
public class PlayerScript extends BasicScript {
    
    //Artemis and HyperLap2D objects will be injected with reflection
    //No needs to initialize them
    protected ComponentMapper<MainItemComponent> mainMapper;
    protected SceneLoader sceneLoader;

    @Override
    public void init(int item) {
        super.init(item);

        //Init scripts code here
        //`item` is the entity where the scripts is attached to.
    }

    @Override
    public void act(float delta) {
        //Called every frame
    }

    @Override
    public void dispose() {
        //Called when the script is removed from the entity
    }
}
```

And a script can be easily attached to any entity with:
 ```java
ItemWrapper player = root.getChild("player");
PlayerScript playerScript = player.addScript(PlayerScript.class);
 ```

Scripts can intercept physics collision events if the entity is a physic object.
```java
public class PhysicsTestScript extends PhysicsBodyScript {
    //No needs to init these fields because scripts are injected using artemis 
    protected ComponentMapper<PhysicsBodyComponent> physicMapper;
    protected com.artemis.World engine;

    //This has to be initialized!
    private PhysicsBodyComponent physicsBodyComponent;

    @Override
    public void init (int item) {
        super.init(item);

        //PhysicsBodyComponent#body is not null in `init` ONLY 
        //for PhysicsBodyScript which wait box2d before initialization
        physicsBodyComponent = physicMapper.get(item);
    }

    @Override
    public void act (float delta) {
        //act method is called each frame
        Body body = physicsBodyComponent.body;
    }

    @Override
    public void beginContact (int contactEntity, Fixture contactFixture, Fixture ownFixture, Contact contact) {

    }

    @Override
    public void endContact (int contactEntity, Fixture contactFixture, Fixture ownFixture, Contact contact) {

    }

    @Override
    public void preSolve (int contactEntity, Fixture contactFixture, Fixture ownFixture, Contact contact) {

    }

    @Override
    public void postSolve (int contactEntity, Fixture contactFixture, Fixture ownFixture, Contact contact) {

    }

    @Override
    public void dispose () {

    }
}
```

### Systems

HyperLap2D logic is driven by the **Artemis-odb** Entity Component System. Systems are where the logic lives; they iterate over entities or perform global actions. You will primarily use `IteratingSystem` (for processing entities) and `BaseSystem` (for global logic).

#### Subscribing to Entities

To define which entities a System should process, you use **Aspect Annotations** above the class definition. This creates an "Aspect" that filters entities based on their components.

```java
// Anotations can be combined.
// The entity MUST have ComponentA AND ComponentB
@All(ComponentA.class, ComponentB.class)
// The entity MUST have EITHER ComponentC OR ComponentD
@One(ComponentC.class, ComponentD.class)
// The entity MUST NOT have ComponentE
@Exclude(ComponentE.class)
public class MyGameSystem extends IteratingSystem {
    @Override
    protected void process(int entityId) {
        // Logic applied to matching entities
    }
}
```

#### Dependency Injection

Artemis-odb automatically handles dependency injection for your Systems during initialization. By declaring fields for `ComponentMapper`s, other `System`s, or registered managers, the engine will populate them for you.

```java
@Wire(injectInherited = true) // Optional: allows injection into fields defined in superclasses
public class MovementSystem extends IteratingSystem {
    
    // Automatically injected Mappers to retrieve components efficiently
    protected ComponentMapper<TransformComponent> transformMapper;
    
    // Injects reference to another system
    protected AnimationSystem animationSystem;

    @Override
    protected void process(int entityId) {
         TransformComponent transform = transformMapper.get(entityId);
         // Logic using mappers...
    }
}
```

#### Fixed Timestep and Interpolation

For systems that require deterministic updates (like Physics or strict gameplay timers), you can use the `@FixedTimestep` annotation. However, to prevent visual stuttering when the rendering frame rate differs from the logic update rate, you should implement `InterpolatingSystem`.

```java
// Configures the system to run logic at a fixed time step
@FixedTimestep
public class CameraSystem extends IteratingSystem implements InterpolatingSystem {

    @Override
    protected void process(int entityId) {
        // This code runs strictly at the fixed step rate
        // Ideal for physics simulation, systems that depends from physics, or deterministic logic
    }

    @Override
    public void interpolate(float alpha) {
        // This method is called every frame (variable timestep)
        // 'alpha' (0.0 to 1.0) represents the time accumulation between fixed steps.
        
        // Use this to smooth out visual positions:
        // visualPosition = previousPosition + (currentPosition - previousPosition) * alpha;
    }
}
```

The fixed time step can be configured via `HyperLap2dInvocationStrategy.setFixedTimeStep(targetFps)`. This method should be invoked only once at startup and remain constant throughout execution. The fixed timestep will be set to 1/targetFps.

#### Engine Time Scaling

HyperLap2D provides built-in support for time scaling to create slow-motion or fast-forward effects. Scaling time acts globally and affects all systems, including physics simulation.

To change the engine's time scale, use `HyperLap2dInvocationStrategy#setTimeScale`.

**Examples:**
* `1`: Normal speed.
* `2`: 2x speed (double velocity).
* `0.5`: 0.5x speed (half time).

### Resource Management

Each asset (image, font, etc.) needs to be loaded and unloaded according to game needs. This can be done using `IResourceRetriever` interface and pass it to `SceneConfiguration`.

Methods in `IResourceRetriever` are invoked whenever `EntityFactory` needs an asset. You are free to implement this part according to needs of your game. You can use the default [`ResourceManager`](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx/blob/master/src/main/java/games/rednblack/editor/renderer/resources/ResourceManager.java).