import * as vscode from "vscode";
import { existsSync, readFileSync } from "fs";

function getMacroFileContent(): string | undefined {
  let wsFolder = vscode.workspace.workspaceFolders;

  if (wsFolder) {
    let fileName = wsFolder[0].uri.fsPath + "/.macros";

    if (existsSync(fileName)) {
      return readFileSync(fileName, { encoding: "utf-8" });
    }

    vscode.window.showWarningMessage(
      "There is no macro file in this workspace"
    );
    return;
  }
}

function parseToMacros(text: string) {
  let macroArray: string[][] = text
    .split("%%%")
    .map((macro: string) => macro.trim().split("\n"));

    return macroArray;
}

export { 
  getMacroFileContent,
  parseToMacros
};