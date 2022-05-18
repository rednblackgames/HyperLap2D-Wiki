---
title: Extensions
category: libGDX Runtime
order: 3
---

Runtime for libGDX can be extended to supports new features or assets. Adding extensions in your code is straightforward.

## Spine 2D

First include both Spine runtime and HyperLap2D Spine Extension to your core project.

```groovy
dependencies {
    api "com.esotericsoftware.spine:spine-libgdx:$spineVersion"
    api "games.rednblack.hyperlap2d:libgdx-spine-extension:$h2dSpineExtension"
}
```

Please use [compatibility table](https://github.com/rednblackgames/h2d-libgdx-spine-extension) for correct versions.

Once included, extension needs to be injected into `SceneLoader` using `SceneConfiguration`.

```java
ExternalTypesConfiguration externalItemTypes = new ExternalTypesConfiguration();
externalItemTypes.addExternalItemType(new SpineItemType());
//... add any other extensions

SceneConfiguration config = new SceneConfiguration();
// ... add any other configuration

config.setExternalItemTypes(externalItemTypes);
```

## Talos VFX

First include both Talos VFX runtime and HyperLap2D Talos Extension to your core project.

```groovy
dependencies {
    api "com.talosvfx:talos-libgdx:$talosVersion"
    api "games.rednblack.hyperlap2d:libgdx-talos-extension:$h2dTalosExtension"
}
```

Please use [compatibility table](https://github.com/rednblackgames/h2d-libgdx-talos-extension) for correct versions.

Once included, extension needs to be injected into `SceneLoader` using `SceneConfiguration`.

```java
ExternalTypesConfiguration externalItemTypes = new ExternalTypesConfiguration();
externalItemTypes.addExternalItemType(new TalosItemType());
//... add any other extensions

SceneConfiguration config = new SceneConfiguration();
// ... add any other configuration

config.setExternalItemTypes(externalItemTypes);
```

## TinyVG

First include both [gdx-tinyvg](https://github.com/lyze237/gdx-TinyVG) runtime and HyperLap2D TinyVG Extension to your core project.

```groovy
dependencies {
    //See https://github.com/lyze237/gdx-TinyVG#installation
    api "com.github.lyze237:gdx-TinyVG:$gdxTinyVGVersion"
    
    api "games.rednblack.hyperlap2d:libgdx-tinyvg-extension:$h2dTinyVGExtension"
}
```

Please use [compatibility table](https://github.com/rednblackgames/h2d-libgdx-tinyvg-extension) for correct versions.

Once included, extension needs to be injected into `SceneLoader` using `SceneConfiguration`.

```java
ExternalTypesConfiguration externalItemTypes = new ExternalTypesConfiguration();
externalItemTypes.addExternalItemType(new TinyVGItemType());
//... add any other extensions

SceneConfiguration config = new SceneConfiguration();
// ... add any other configuration

config.setExternalItemTypes(externalItemTypes);
```
