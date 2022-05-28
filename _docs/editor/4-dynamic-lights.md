---
title: Dynamic Lights
category: Editor
order: 4
---

Lights are one of the most important effects in a game. They give the scene a unique atmosphere and make your games look beautiful.HyperLap2D supports both dynamic lights and shadows, including normal maps!

## Basic Lights Setup

First of all, lights engine needs to be enabled in the scene properties panel by checking `Enable Lights` option.

![lights-setup]({{ site.baseurl }}/images/wiki/lights-setup.png)

There are three types of Ambient Light, which can be used to control global scene illuminance:

- `Diffuse`, blending option to makes lights more realistic but darker environment.
- `Directional`, simulate light source that location is at infinite distance. This means that direction and intensity is the same everywhere. -90 direction is straight from up. This type of light is good for simulating the sun.
- `Bright`, pure lights without blending.

## Dynamic shadows

HyperLap2D is able to cast dynamic shadows for objects that are physics objects. When attaching both a Shape (Circle or Polygon) and the Physics component shadows appears.

![lights-scene]({{ site.baseurl }}/images/wiki/lights-scene.png)

Lights are objects that can be create with Point and Cone Light tools. All settings can be controlled in properties:

- `Type` : The type of the current selected light
- `Ray count` : The number of light rays (more rays gives more realistic effect)
- `Softness Length` : The softness value for beams tips
- `Height` : The elevation of the light in the space, for Pseudo3D shadows and Normal maps rendering
- `Static` : Set static light
- `X-Ray` : Allow light to pass through Box2D bodies
- `Soft` : Set soft light
- `Active` : Enable or disable the light
- `Radius` : For **point lights only**, the radius of the light circle
- `Distance` : For **cone lights only**, the max distance of the light
- `Angle` :  For **cone lights only**, the angle size (in deg) of the light cone
- `Direction` :  For **cone lights only**, the direction (in deg) of the light cone

Lights may have different colors. You can control the tint in Properties.

#### Body Lights

Entities can emit light to create chain/neon effects. Add an additional `Light` component needs to be add to an object that has both `Physics` and a Shape component.

![chain-light-prop]({{ site.baseurl }}/images/wiki/chain-light-prop.png)


# Normal maps

Normal mapping is a common technique to make your assets look like 3D when illuminated by a light source. HyperLap2D supports normal mapping out of the box.

#### Simple images

To import normal maps for simple images just follow the naming convention. For any `<image>.png`, can be imported its normal map variant with the name `<image>.normal.png`. Rendering pipeline will automatically recognize normal maps and generate the effect.

![simple-normal-map]({{ site.baseurl }}/images/wiki/simple-normal-map.png)

The effects is made with following textures:

|   Texture                                           | Normal Map                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| ![wall]({{ site.baseurl }}/images/wiki/wall.png) | ![wall-normal]({{ site.baseurl }}/images/wiki/wall.normal.png) |
| wall.png | wall.normal.png |


#### Spine Animations

Normal mapping for Spine animations is supported too. First of all, an **empty** skin with the name `normalMap` must be created in the skeleton using Spine 2D Editor. Once imported, each attachment needs to have its respective normal map texture following the previous naming convention.

> To prevent name overlaps, HyperLap2D when import a Spine animation unpack the Spine atlas into multiple files, the name of those PNGs are structured as follow: `<animationName><attachmentName>.png`. So, normal maps textures needs to be imported following the schema: `<animationName><attachmentName>.normal.png`.

In the following examples the animation name is `raptor` and the attachment name is `head`.

|   Texture                                           | Normal Map                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| ![raptorhead]({{ site.baseurl }}/images/wiki/raptorhead.png) | ![raptorhead-normal]({{ site.baseurl }}/images/wiki/raptorhead.normal.png) |
| raptorhead.png | raptorhead.normal.png |

> All unpacked textures can be found at `<project-folder>/assets/orig/images`.

Normal map textures can be imported as simple PNG files wihtout special actions. HyperLap2D will automatically found textures and apply the effect.

![spine-normal-map]({{ site.baseurl }}/images/wiki/spine-normal-map.png)

Spine 2D is a commercial product by [**Esoteric Software**](http://it.esotericsoftware.com/). The example used on this page is just for demonstrating purposes.

### Generate Normal Maps with Laigter

There are many tools to generate normal maps from a texture. One that fits well with HyperLap2D is [**Laigter**](https://azagaya.itch.io/laigter), a free and open source software for normal maps generation. It has the useful option to export textures in batch with the same suffix to match the HyperLap2D naming convention. It works well for Spine animations too.

![laigter]({{ site.baseurl }}/images/wiki/laigter.png)

> Be sure to enable `use alpha` and disable the `invert x` and `invert y` options.

# Pseudo3D shadows

This is an experimental feature which allows objects to cast a fixed-length shadow. It's enough to check the `Enable Pseudo3D` option in the scene panel. This feature is still under development and may not always work properly.

![pseudo3d]({{ site.baseurl }}/images/wiki/pseudo3d.png)