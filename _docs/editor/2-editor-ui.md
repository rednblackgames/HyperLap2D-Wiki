---
title: Editor UI - The Basics
category: Editor
order: 2
---

![editor-ui]({{ site.baseurl }}/images/wiki/editor-ui.png)

## Menu bar

At the topmost part of the screen is the menu bar. Here all the common controls for the current program and project can be found. Functionalities of this bar can be extended with [plugins]({% link _docs/plugins/1-plugins-system.md %}).

## Scene hierarchy

![scene-hierarchy]({{ site.baseurl }}/images/wiki/scene-hierarchy.png)

Indicates the current scene and the specific composite hierarchy currently being viewed or edited.

## Sandbox

The Sandbox is the core of HyperLap2D. Here you can graphically position assets and compose your scene. The Sandbox can also be focused to edit a single library item or composite in isolation.

### Guidelines
Guidelines can be placed on the screen by dragging from the rulers into the sandbox.

![guidelines]({{ site.baseurl }}/images/wiki/guidelines.gif)

### Sandbox toolbar
The toolbar offers quick access to essential Sandbox controls.

![sandbox-toolbar]({{ site.baseurl }}/images/wiki/sandbox-toolbar.png)

- `Scene`: Manage multiple scenes.
- `Lock lines`: Lock guidelines at their current position.
- `Grid size`: Adjust the virtual grid for element snapping.
- `Zoom`: Control the Sandbox magnification.
- `Pan`: Manually set the camera position in world coordinates.
- `Resolution`: Manage multiple resolutions for multi-platform support.
- `Live Preview`: Open a real-time preview window of the current scene.

---

## Workspace Panels

### Resources
The Resources panel is where all project assets are managed. It is divided into tabs for different asset types: **Images**, **Animations**, **Particle Effects**, and **Library Items**.

![resources]({{ site.baseurl }}/images/wiki/resources.png)

To add an element to your scene, simply **drag and drop** the asset from this panel directly into the Sandbox.

### Items Tree
The Items Tree provides a hierarchical view of all entities present in the current scene or composite.

![tree-view]({{ site.baseurl }}/images/wiki/tree-view.png)

It allows for easy selection of overlapping objects and provides a clear overview of how complex compositions are structured.

### Layers
HyperLap2D uses a layer-based system to manage the rendering order and visibility of your objects.

![layers]({{ site.baseurl }}/images/wiki/layers.png)

Objects on higher layers are rendered on top. You can toggle visibility, lock layers to prevent accidental edits, or reorder them to change the visual stacking.

### Alignment Tools
When multiple entities are selected, the Align panel becomes essential for organizing the layout.

![align]({{ site.baseurl }}/images/wiki/align.png)

It provides options for **Simple** alignment (top, left, etc.), **Centering** objects relative to each other, or snapping them **At Edge**.

### Scene Properties
This panel defines the global settings for the active scene.

![scene-properties]({{ site.baseurl }}/images/wiki/scene-properties.png)

The top section allows you to configure:
- **Pixels per WU**: Defines the scale ratio between pixels and World Units.
- **World size**: The actual dimensions of the scene.
- **Scene Shader**: The default shader applied to the entire scene.
- **Physics**: Enable and configure global gravity and sleep velocity for Box2D.

> For detailed information on the lighting system (Ambient Color, Shadows, and Light Types), please refer to the [Dynamic Lights]({% link _docs/editor/5-dynamic-lights.md %}) documentation.

---

HyperLap2D handles multiple scenes within the same project. Each scene shares the same project assets and libraries but is saved as an individual file for better modularity.