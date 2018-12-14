"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { readFileSync } from "fs";

let macros: string[];
// let currentMacro = 0;

export function activate(context: vscode.ExtensionContext) {
  const reloadMacros = () => {
    let folders = vscode.workspace.workspaceFolders;
    if (folders) {
      let rootDir = folders[0].uri.fsPath;
      const content = readFileSync(rootDir + "/.macros.json", {
        encoding: "utf8"
      });
      macros = JSON.parse(content);
    }
  };
  reloadMacros();

  let disposable = vscode.commands.registerCommand("extension.nextMacro", e => {
    let editor = vscode.window.activeTextEditor;
    let macro = macros.pop();

    if(!macro) {
      vscode.window.showInformationMessage("No more macros");
      return;
    }

    let pos = new vscode.Position(0, 0);
    if(editor){
       pos = editor.selection.start;
    }

    function type(text: string, pos: vscode.Position) {
      if (editor) {
        editor
          .edit(editBuilder => {
            if (editor) {
              if (text.length > 0) {
                let char = text[0];
                editBuilder.insert(pos, char);
              } else{
                return;
              }
            } else {
              vscode.window.showInformationMessage("No editor");
            }
          })
          .then(() => {
            if(text) {
              let _pos = pos.translate(0,1);//new vscode.Position(0, pos.character + 1);
              setTimeout(() => {
                type(text.substring(1, text.length), _pos)
              }, 20 + 80 * Math.random());
            }
          });
      }
    }

    type(macro || '', pos);
  });
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    "extension.reloadMacros",
    reloadMacros
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
