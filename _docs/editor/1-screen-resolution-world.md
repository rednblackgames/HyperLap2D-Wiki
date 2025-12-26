---
title: Screen, Resolution and World
category: Editor
order: 1
---

To create a new project, navigate to `File → New Project`.

![new-project]({{ site.baseurl }}/images/wiki/new-project.png)

### Original Size
**Original Size** represents the base screen dimensions for which your assets are designed. For example, if the resolution is set to `1920x1080`, it means that in a canvas of those dimensions, your assets will maintain their intended size and clarity.

### Pixels per World Unit (PPWU)
The **Pixels per World Unit (PPWU)** is an arbitrary value that defines the coordinate scale without affecting the resolution. A World Unit (WU) is the metric used for an object's dimensions and coordinates within HyperLap2D.

* If a player asset is `100x200px` and `PPWU = 100`, the player's dimensions in the editor will be `1x2 World Units`.
* If `PPWU = 1`, the coordinates will match the pixel values exactly.

> While this is primarily a convention to simplify coordinates, it is often a technical requirement. For instance, **Box2D** physics has limitations regarding coordinate magnitudes; a high PPWU (typically between 80-100) is necessary to keep values within Box2D's optimal range.

### Viewports and Scaling
The `PPWU` directly affects Viewport settings. If your base resolution is `1920x1080` and `PPWU = 60`, the size of a `FitViewport` or `ExtendViewport` in your code should be `32x18` (1920/60 and 1080/60). Understanding the relationship between resolution, PPWU, and world size is essential—refer to the libGDX wiki on [Viewports](https://libgdx.com/wiki/graphics/viewports){:target="_blank"} for further details.

---

## Multiple Resolutions

HyperLap2D can automatically manage multiple resolutions. The default resolution, `orig`, is automatically generated and cannot be deleted. You can add additional resolutions via the [Sandbox Toolbar]({{ site.baseurl }}{% link _docs/editor/2-editor-ui.md %}#sandbox-toolbar).

While there are no strict restrictions when creating a new resolution, HyperLap2D will automatically scale all assets and atlases accordingly. 

**Best Practice:** It is highly recommended to only **downscale** from your `orig` resolution. For this reason, choosing a sufficiently high initial resolution during project setup is critical for maintaining visual quality across different devices.