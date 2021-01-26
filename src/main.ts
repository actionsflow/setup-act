import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {getLatestVersion} from './get-latest-version';
import {installer} from './installer';
import {Tool} from './constants';
import os from 'os';
import fsPure from 'fs';
import path from 'path';
const fs = fsPure.promises;
export interface ActionResult {
  exitcode: number;
  output: string;
}

export async function showVersion(cmd: string, args: string[]): Promise<ActionResult> {
  const result: ActionResult = {
    exitcode: 0,
    output: ''
  };

  const options = {
    listeners: {
      stdout: (data: Buffer): void => {
        result.output += data.toString();
      }
    }
  };

  result.exitcode = await exec.exec(cmd, args, options);
  core.debug(`command: ${cmd} ${args}`);
  core.debug(`exit code: ${result.exitcode}`);
  core.debug(`stdout: ${result.output}`);
  return result;
}
interface RunOptions {
  version: string;
}
export async function run(options?: RunOptions): Promise<ActionResult> {
  let toolVersion = '';
  if (options) {
    if (options.version) {
      toolVersion = options.version;
    }
  }
  let installVersion = '';

  let result: ActionResult = {
    exitcode: 0,
    output: ''
  };

  if (toolVersion === '' || toolVersion === 'latest') {
    installVersion = await getLatestVersion(Tool.Org, Tool.Repo, 'brew');
  } else {
    installVersion = toolVersion;
  }

  core.info(`${Tool.Name} version: ${installVersion}`);
  await installer(installVersion);
  // temp write actrc if not exist
  const actRcPath = path.resolve(os.homedir(), '.actrc');
  const isActRcExist = fsPure.existsSync(actRcPath);
  if (!isActRcExist) {
    // temp create
    // fix https://github.com/actionsflow/setup-act-for-actionsflow/issues/1
    const actRC = `-P ubuntu-latest=node:12.6-buster-slim\n-P ubuntu-12.04=node:12.6-buster-slim\n-P ubuntu-18.04=node:12.6-buster-slim\n-P ubuntu-16.04=node:12.6-stretch-slim`;
    await fs.writeFile(actRcPath, actRC);
  }

  result = await showVersion(Tool.CmdName, [Tool.CmdOptVersion]);
  // remove actrc
  if (!isActRcExist) {
    await fs.unlink(actRcPath);
  }
  return result;
}
