# Typewriter Macro Presenter
From a file in your workspace, the editor itself "types" some predetermined codes, you can use for an code presentation without the need of type while speaking or see the text appearing directly on the screen in an artificial way.

## How to use
Create a `./macros` file in your project and write some code divided by `%%%` for each new macro, to the macros, press `CTRL+P` and search for `Next Macro` (or press `CTRL+Numpad6`), they will be typed in the order written in the macro file, to reload macros use the `Reload Macros`.

## To be done
- It will be rewrited to type code as the button is pressed without the need to set the cursor position.
  - For this, a kinda of parser will be used, with JISON maybe, all the configuration of **when and where** to type will be in the code file in `./macros` folder

## Release Notes

### 0.0.1
- It just works

### 0.0.2
- Break lines works perfectly now;
- It calls "format document" command after typing

