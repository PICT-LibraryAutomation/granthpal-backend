
import fs from 'fs';

export interface IGranthpalSettings {
  issuePeriod: number,
  fineAmount: number,
}

export function getGranthpalSettings(): IGranthpalSettings {
  const res = fs.readFileSync(process.env.GRANTHPAL_SETTINGS_FILE).toString();
  try {
    const settings = JSON.parse(res);
    return settings;
  } catch (e) {
    throw new Error(`Could not parse settings file: ${process.env.GRANTHPAL_SETTINGS_FILE}`);
  }
}

export function setGranthpalSettings(data: IGranthpalSettings) {
  fs.writeFileSync(process.env.GRANTHPAL_SETTINGS_FILE, JSON.stringify(data));
  return data;
}