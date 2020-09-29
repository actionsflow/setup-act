import * as core from '@actions/core';
import * as main from './main';

(async (): Promise<void> => {
  try {
    const toolVersion: string = core.getInput('version');
    await main.run({
      version: toolVersion
    });
  } catch (e) {
    core.setFailed(`Action failed with error ${e.message}`);
  }
})();
