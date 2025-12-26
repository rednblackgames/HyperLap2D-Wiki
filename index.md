---
title: Create something awesome!
---

**[HyperLap2D](https://hyperlap2d.rednblack.games/){:target="_blank"}** is a general-purpose visual editor designed to compose complex scenes through an intuitive drag-and-drop interface. It focuses purely on scene description, maintaining a clean separation between graphical assets and business logic.

Scenes are brought to life via dedicated Runtime libraries, which handle efficient rendering and allow you to focus entirely on game logic.

> Currently, development is primarily focused on the [libGDX](https://libgdx.com){:target="_blank"} framework, though HyperLap2D is architected for easy integration into any other engine or framework.

### Getting Started

HyperLap2D is distributed through two main release channels:

* **Stable:** Recommended for production. Download it from the [official website](https://hyperlap2d.rednblack.games/download){:target="_blank"} or the [GitHub Releases](https://github.com/rednblackgames/HyperLap2D/releases){:target="_blank"} page.
* **Snapshots:** Automated builds reflecting the latest repository changes. Available via [GitHub Actions](https://github.com/rednblackgames/HyperLap2D/actions){:target="_blank"} (GitHub account required). Ideal for testing recent bug fixes or upcoming features.

*Note: Runtimes and extensions follow the same release/snapshot structure. Refer to their respective README files for specific setup instructions.*

### Features

HyperLap2D provides comprehensive support for industry-standard assets and tools:

**Rendering & Animation**
* Images and Sprite Animations
* Vector Graphics support via [TinyVG](https://tinyvg.tech/){:target="_blank"}
* [Spine Animation](http://esotericsoftware.com/){:target="_blank"} integration
* Particle Effects and [Talos VFX Legacy](https://github.com/rednblackgames/Talos-VFX-Legacy){:target="_blank"} support

**Engine & World Building**
* Physics integration with Box2D
* Dynamic Lights and Shadows
* Custom Tiled Map editor
* Action Node Editor for behavioral logic

**Workflow & Integration**
* Open JSON output for easy parsing
* Full extensibility
* Seamless import/export and composition sharing