---
title: Editor UI - The Basics
category: Editor
order: 2
---

![editor-ui]({{ site.baseurl }}/images/wiki/editor-ui.png)


## Menu bar

At the topmost part of the screen is the menu bar. Here all the common controls for the current program and project can be found. Functionalities of this bar can be extended with [plugins]({{ site.baseurl }}{% link _docs/plugins/1-plugins-system.md %}).

## Scene hierarchy

![editor-ui]({{ site.baseurl }}/images/wiki/scene-hierarchy.png)

Indicate current scene and current viewing composite hierarchy.

## Sandbox

The Sandbox is the main part of HyperLap2D. Here you can graphically place all your assets and compose the scene. The Sandbox can be also focused on a single composite.

### Guidelines

Guidelines can be placed on the screen by dragging from rule to the sandbox.

![guidelines]({{ site.baseurl }}/images/wiki/guidelines.gif)

### Sandbox toolbar

Toolbar offers a fast access to Sandbox controls.

![sandbox-toolbar]({{ site.baseurl }}/images/wiki/sandbox-toolbar.png)

- `Scene` : Manage multiple scenes.
- `Lock lines` : Lock guidelines at current position.
- `Grid size` : Size of the virtual grid size to align elements.
- `Zoom` : Control Sandbox's zoom (you can use [shortcuts]({{ site.baseurl }}{% link _docs/editor/3-shortcuts.md %}) too).
- `Resolution` : Manage multiple resolutions.
- `Live Preview` : Open the Live Preview window.

HyperLap2D can handle multiple scenes inside the same project. Each Scene share all assets and libraries of the project. All scenes are saved in different files.