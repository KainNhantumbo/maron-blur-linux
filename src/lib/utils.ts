import * as vscode from 'vscode';

import {
  DEFAULT_BLUR_VALUE,
  DEFAULT_TRANSPARENCY_VALUE,
  EXTENSION_NAME
} from '../data/constants';

export function getTransparency(): number {
  const transparency: number | undefined | null = vscode.workspace
    .getConfiguration(EXTENSION_NAME)
    .get('transparency');
  return transparency || DEFAULT_TRANSPARENCY_VALUE;
}

export function getBlur(): boolean {
  const blur: boolean | undefined | null = vscode.workspace
    .getConfiguration('maron-blur')
    .get('blur');

  if (typeof blur !== 'boolean') {
    return DEFAULT_BLUR_VALUE;
  }
  return blur;
}

export function createTransparencyCommand(transparencyLevel: number) {
  return `xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * ${transparencyLevel} / 100)));`;
}

export function createDeactivateCommand() {
  const TRANSPARENCY_VALUE = 100;
  const command = `
            bash -c '
            for W in $(wmctrl -l | grep "Visual Studio Code" | awk "{print $1}"); do
                xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * ${TRANSPARENCY_VALUE} / 100)));
                xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32a -set _KDE_NET_WM_BLUR_BEHIND_REGION -1;
            done'
        `;
  return command.trim();
}

/** Runs commands in the terminal */
export function commandRunner(command: string) {
  const terminal = vscode.window.createTerminal(EXTENSION_NAME);

  terminal.sendText(command);
  terminal.sendText('exit');      
}
