import * as vscode from 'vscode';
import { homedir } from 'node:os';

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
    .getConfiguration('vscode-blur-linux')
    .get('blur');

  if (typeof blur !== 'boolean') return DEFAULT_BLUR_VALUE;
  return blur;
}

export function createTransparencyCommand(transparencyLevel: number) {
  return `xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * ${transparencyLevel} / 100)));`;
}

/** Runs commands in the terminal */
export function commandRunner(command: string) {
  const shellPath = homedir();
  const terminal = vscode.window.createTerminal(EXTENSION_NAME, shellPath);
  
  terminal.sendText(command, true);
  terminal.sendText('clear', true);
  terminal.sendText('exit');
}
