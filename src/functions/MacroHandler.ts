import * as vscode from "vscode";
import { getMacroFileContent, parseToMacros } from "./FileHandler";
import { promisify } from "util";

const sleep = promisify(setTimeout);

function getMacros() {
  let content;
  if ((content = getMacroFileContent())) {
    return parseToMacros(content);
  }
}

async function typeMacro(macroLines: string[]) {
  let editor = vscode.window.activeTextEditor as vscode.TextEditor;
  let pos;

  for (const line of macroLines) {
    pos = editor.selection.start;
    await type(editor, pos, line);
  }

  await vscode.commands.executeCommand('editor.action.formatDocument');
}

async function type(
  editor: vscode.TextEditor,
  pos: vscode.Position,
  text: string
) {
  let typingSpeed = 20 + 80 * Math.random();
  if (text !== "") {
    await editor.edit(buffer => buffer.insert(pos, text.slice(0, 1)));
    pos = pos.translate(0, 1);
    await sleep(typingSpeed);
    await type(editor, pos, text.slice(1));
    return;
  }

  await editor.edit(buffer => buffer.insert(pos, "\n"));
  await sleep(typingSpeed);
  return;
}

export { getMacros, typeMacro };
