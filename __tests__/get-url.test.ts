import getURL from '../src/get-url';

describe('getURL()', () => {
  test('test', () => {
    const baseURL = 'https://github.com/nektos/act/releases/download/v0.2.14';
    const urlLinux = `${baseURL}/act_Linux_x86_64.tar.gz`;
    const urlMacOS = `${baseURL}/act_macOS_x86_64.tar.gz`;
    const urlWindows = `${baseURL}/act_Windows_x86_64.zip`;
    expect(getURL('Linux', '0.2.14')).toBe(urlLinux);
    expect(getURL('MyOS', '0.2.14')).not.toBe(urlLinux);
    expect(getURL('Linux', '0.58.1')).not.toBe(urlLinux);
    expect(getURL('macOS', '0.2.14')).toBe(urlMacOS);
    expect(getURL('Windows', '0.2.14')).toBe(urlWindows);
  });
});
