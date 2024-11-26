export const DEFAULT_TRANSPARENCY_VALUE = 90;
export const DEFAULT_BLUR_VALUE = true;

export const EXTENSION_NAME = 'maron-blur';

export const WINDOW_COMMAND = `bash -c 'for W in $(wmctrl -l | grep "Visual Studio Code" | awk '"'"'{print $1}'"'"'); do echo $W; done'`;

