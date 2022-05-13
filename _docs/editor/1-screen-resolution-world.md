---
title: Screen, Resolution and World
category: Editor
order: 1
---

To create a new project, navigate to `File → New Project`.

![new-project]({{ site.baseurl }}/images/wiki/new-project.png)

**Original Size** represent the base screen size where your assets are designed to. For example if resolution is set to 1920x1080 means that in a hypothetical canvas with that dimensions your assets has exactly the correct size and looks clear.

Then Pixel per **World Unit (PPWU)** needs to be set. This value changes the coordinate scales but not resolution, it's an arbitrary value. A world unit is the metrics for HyperLap2D object's dimensions or coordinates, for example if the player asset is `100x200px` and `PPWU = 100` this means that in HyperLap2D you'll see that the player will has dimensions `1x2 World Unit`, while if `PPWU = 1` coordinates will match pixels.

> This is just a convention to simplify coordinates, but sometimes is necessary. For example, physics is needed through Box2D. Since it has some limitation on coordinates dimensions, an high PPWU is necessary in order to fit Box2D limits (usually between 80-100).

`PPWU` also reflects in ViewPort settings. If your base resolution is 1920x1080 and `PPWU = 60` the size of a `FitViewPort` or `ExtendedViewPort` should be `32x18`. Once understand the link between resolution/ppwu and world size, the libGDX wiki on [Viewports](https://libgdx.com/wiki/graphics/viewports){:target="_blank"} will helps.

## Multiple Resolutions

HyperLap2D is able to manage automatically different resolutions. The default one `orig` is automatic generated and cannot be deleted. Additional resolution could be added in [Sandbox Toolbar]({{ site.baseurl }}{% link _docs/editor/2-editor-ui.md %}#sandbox-toolbar).

There is no restriction while create a new resolution, HyperLap2D will automatically scale all your assets and atlases. However, is highly recommended to only downscale your `orig` resolution. It's important to choose the right initial resolution during the project setup.