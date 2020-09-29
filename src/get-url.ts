export default function getURL(os: string, version: string): string {
  const ext = (os: string): string => {
    if (os === 'Windows') {
      return 'zip';
    } else {
      return 'tar.gz';
    }
  };

  const actName = `act_${os}_x86_64`;
  const baseURL = 'https://github.com/nektos/act/releases/download';
  const url = `${baseURL}/v${version}/${actName}.${ext(os)}`;

  return url;
}
