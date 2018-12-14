"use strict";
import * as vscode from "vscode";
import { getMacros, typeMacro } from "./functions/MacroHandler";

let macros: string[][];

export function activate(context: vscode.ExtensionContext) {
  let register = vscode.commands.registerCommand;
  macros = getMacros() || [];

  let reload = register("extension.reloadMacros", () => {
    macros = getMacros() || [];
  });

  let next = register("extension.nextMacro", () => {
    if(macros) {
      typeMacro(macros.shift() || []);
      return;
    }
    vscode.window.showWarningMessage("No more macros")
  });

  context.subscriptions.push(reload, next);
}

export function deactivate() {}
