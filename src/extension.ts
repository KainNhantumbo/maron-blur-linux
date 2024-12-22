import * as vscode from 'vscode';
import { WINDOW_COMMAND } from './data/constants';
import {
  commandRunner,
  createDeactivateCommand,
  createTransparencyCommand,
  getBlur,
  getTransparency
} from './lib/utils';

function runExtension() {
  const transparency = getTransparency();
  const isBlurEnabled = getBlur();

  // commands
  const SET_TRANSPARENCY_COMMAND = createTransparencyCommand(transparency);
  const SET_BLUR_COMMAND = `xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0; `;
  const REMOVE_BLUR_COMMAND = `xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32a -set _KDE_NET_WM_BLUR_BEHIND_REGION -1; `;
  const END_LINE_COMMAND = ` done'`;

  // create the final command
  let command = WINDOW_COMMAND + SET_TRANSPARENCY_COMMAND;

  if (isBlurEnabled) {
    command += SET_BLUR_COMMAND;
    console.log(isBlurEnabled)
    console.log(isBlurEnabled)
  }

  if (!isBlurEnabled) {
    command += REMOVE_BLUR_COMMAND;
  }

  command += END_LINE_COMMAND;
  commandRunner(command);
}

export function activate(context: vscode.ExtensionContext) {
  runExtension();
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand('maron-blur.start', () => {
      runExtension();
      vscode.window.showInformationMessage('Blur Effect Activated!');
    })
  );
}

export function deactivate() {
  const DEACTIVATE_COMMAND = createDeactivateCommand();
  commandRunner(DEACTIVATE_COMMAND);
}
