---
title: Shortcuts
category: Editor
order: 3
---

HyperLap2D supports many shortcuts to speed up your work, both for Windows/Linux and macOS:

- `Ctrl + N` (`⌘ + N`) : Show `New Project` dialog

- `Ctrl + O` (`⌘ + O`) : Show `Open Project` dialog

- `Ctrl + S` (`⌘ + S`) : Save current project

- `Ctrl + I` (`⌘ + I`) : Show `Import` panel

- `Ctrl + E` (`⌘ + E`) : Export project

- `Ctrl + Alt + S` (`⌘ + ⌥ + S`) : Show `Settings` dialog

- `⌘ + Q` : Exit

- `Ctrl + X` (`⌘ + X`) : Cut

- `Ctrl + C` (`⌘ + C`) : Copy

- `Ctrl + V` (`⌘ + V`) : Paste

- `Ctrl + Z` (`⌘ + Z`) : Undo

- `Ctrl + Shift + Z` (`⌘ + ⇧ + Z`) : Undo

- `Ctrl + A` (`⌘ + A`) : Select all object on the screen

- `Ctrl + ↑` (`⌘ + ↑`) : Z-index change up

- `Ctrl + ↓` (`⌘ + ↓`) : Z-index change down

- `0` : Reset camera and zoom to (0, 0) coordinates

- `Ctrl + Plus` : Zoom plus

- `Ctrl + Minus` : Zoom minus

### Tools

- `V` : Selection Tool

- `Ctrl + T` (`⌘ + T`) : Transform Tool

- `Space + Click` / `Mouse middle click` : Pan Tool

- `Drag + Mouse Scroll` : Rotate object


### Custom Key Mapping

You can customize key mapping through `.keymap` config file. Custom layouts has to be placed in HyperLap2D's `keymaps` folder:

- Windows : `<AppData>\Roaming\.hyperlap2d\configs\keymaps`.
- Linux : `<Home>/.hyperlap2d/configs/keymaps`.
- macOS : `/Library/Application Support/.hyperlap2d/configs/keymaps`.

A `.keymap` file is in libGDX's JSON format as following example:
```libgdx
{
   0:{ // 0 indicates the HyperLap2D action ID
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true, // true if needs CONTROL_LEFT, CONTROL_RIGHT or SYM pressed
      isShift:true, // true if needs SHIFT_LEFT or SHIFT_RIGHT
      isAlt:true, // true if needs ALT_LEFT or ALT_RIGHT pressed
      keyCodes:[
         42 // Array of libGDX's KeyCodes, the first entry is the main key while others may be key variants
      ],
      action:0 // 0 indicates the HyperLap2D action ID
   }

   ...
```

To get a complete list of all action ID recognized by the editor please check [KeyBindingsLayout](https://github.com/rednblackgames/HyperLap2D/blob/master/src/main/java/games/rednblack/editor/utils/KeyBindingsLayout.java).

To get a complete list of all libGDX's KeyCodes please check [Input.Keys](https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/Input.java#L67).


Custom key mapping can be switched in [Settings](Settings).


Use this `default.keymap` file as reference:
```libgdx
{
   0:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         42
      ],
      action:0
   },
   13:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         20
      ],
      action:13
   },
   5:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      isAlt:true,
      keyCodes:[
         47
      ],
      action:5
   },
   18:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         54
      ],
      action:18
   },
   10:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         69,
         76
      ],
      action:10
   },
   23:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         11
      ],
      action:23
   },
   2:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         47
      ],
      action:2
   },
   15:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         31
      ],
      action:15
   },
   7:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      keyCodes:[
         50,
         131
      ],
      action:7
   },
   20:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         7,
         144
      ],
      action:20
   },
   12:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         19
      ],
      action:12
   },
   25:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      keyCodes:[
         67
      ],
      action:25
   },
   4:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         37
      ],
      action:4
   },
   17:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         50
      ],
      action:17
   },
   9:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      keyCodes:[
         62
      ],
      action:9
   },
   22:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         8
      ],
      action:22
   },
   1:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         43
      ],
      action:1
   },
   14:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         29
      ],
      action:14
   },
   6:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         45
      ],
      action:6
   },
   19:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      isShift:true,
      keyCodes:[
         54
      ],
      action:19
   },
   11:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         81,
         72
      ],
      action:11
   },
   24:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         10
      ],
      action:24
   },
   3:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         33
      ],
      action:3
   },
   16:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         52
      ],
      action:16
   },
   8:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         48
      ],
      action:8
   },
   21:{
      class:games.rednblack.editor.utils.KeyBindingsLayout$KeyMapper,
      isControl:true,
      keyCodes:[
         9
      ],
      action:21
   }
}
```