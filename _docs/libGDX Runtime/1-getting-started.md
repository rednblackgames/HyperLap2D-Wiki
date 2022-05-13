---
title: Getting Started
category: libGDX Runtime
order: 1
---

Runtime needs to be included into your `core` project.

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

Use [compatibility table](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx#support) to choose right version for each dependence.

> Box2D and FreeType extensions needs additionals configuration for platform specific module

### Architecture

HyperLap2D's libGDX runtime is based on Entity Component System (ECS) architecture using [Artemis-odb](https://github.com/junkdog/artemis-odb) library. If you are not familiar with this kind of design pattern, please consider to [learn more](https://en.wikipedia.org/wiki/Entity_component_system) before continue reading.

### SceneLoader

A `SceneLoader` is the object that helps you to setup minimal working configuration for HyperLap2D to work. It parse `JSON` format to build ECS Engine, Entities and all required Components to render your scenes and assets.

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

If don't specified, by default SceneLoader create a ScreenViewPort, in many cases this is not what you want, especially if you target Pixel per World Unit other than 1. You can measure the size of your world using [guidelines]({{ site.baseurl }}{% link _docs/editor/2-editor-ui.md %}#guidelines) in order to choose the best ViewPort for your scene.

### Loading with `AssetManager`

libGDX's [AssetManager](https://libgdx.com/wiki/managing-your-assets){:target="_blank"} can be used to load HyperLap2D project.

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

Runtime Engine already have all necessary Systems for rendering and basic entities manipulation. SceneLoader is a wrapper for all these features. This will make rendering very easy, just update ECS Engine.

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

Entities are represented as integer, any definition is provided by their `Components`. To help navigation and manipulation of elements `ItemWrapper` class can be used, that expose some useful methods. By default all objects are placed in a single `root` Composite.

```java
ItemWrapper root = new ItemWrapper(mSceneLoader.getRoot(), mSceneLoader.getEngine());
```

Composites are group of entities. They can be retrieved with `ItemWrapper#getChild` method using object's unique identifier.

```java
ItemWrapper foo = root.getChild("foo");
```

### Default Components

There are several default components created for each Entity.

* `MainItemComponent` : This is present almost in any object and contains core information like entity type, identifier, unique Id, custom variables etc.
* `TransformComponent`, `DimensionsComponent` `TintComponent` `ZIndexComponent` : These are present in almost any object too and contains information like position, dimension, origin point, rotation, z-index, color etc.
* `NodeComponent` : Is present in any `Composite Item`, it stores children references as `Integer` objects.
* `ViewportComponent` : Can be present only on a single Entity. It's the point where rendering pipeline starts from. Usually `root` composite has this component.

Specific components are created based on entity's type, for example `TextureRegionComponent`, `LabelComponent`, `ActionComponent` ,`LightObjectComponent`, `ParticleComponent`, `SpriteAnimationComponent`, `PhysicsBodyComponent` and much more. [Full list](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx/tree/master/src/main/java/games/rednblack/editor/renderer/components)

### Actions System

HyperLap2D uses an Actions System similar to [libGDX's Scene2D actions](https://github.com/libgdx/libgdx/wiki/Scene2d#actions) but for ECS pattern. You can manually create actions in Java, or use [Node Graph Editor](https://github.com/rednblackgames/HyperLap2D/wiki/Actions).

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

And a script can be easly attached to any entity with:
 ```java
ItemWrapper player = root.getChild("player");
PlayerScript playerScript = player.addScript(PlayerScript.class);
 ```

Scripts can intercept physics collision events if the entity is a physic object.
```java
public class PhysicsTestScript extends BasicScript implements PhysicsContact {
	//No needs to init these fields because scripts are injected using artemis 
	protected ComponentMapper<PhysicsBodyComponent> physicMapper;
	protected com.artemis.World engine;

	//This has to be initialized!
	private PhysicsBodyComponent physicsBodyComponent;

	@Override
	public void init (int item) {
		super.init(item);

		physicsBodyComponent = physicMapper.get(item);
	}

	@Override
	public void act (float delta) {
		//body can be used here, because act method is called after PhysicsSystem,
		//so all bodies should already be created
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

### Resource Management

Each asset (image, font, etc.) needs to be loaded and unloaded according to game needs. This can be done using `IResourceRetriever` interface and pass it to `SceneConfiguration`.

Methods in `IResourceRetriever` are invoked whenever `EntityFactory` needs an asset. You are free to implement this part according to needs of your game. You can use the default [`ResourceManager`](https://github.com/rednblackgames/hyperlap2d-runtime-libgdx/blob/master/src/main/java/games/rednblack/editor/renderer/resources/ResourceManager.java).
