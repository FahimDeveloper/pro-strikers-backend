export interface IAddonInfo {
  sport: string;
  facility: string;
  addons: Array<IAddon>;
  old_addons?: Array<IAddon>;
  new_addons?: Array<IAddon>;
}

export interface IAddon {
  addon_title: string;
  addon_description: string;
  addon_price: number;
  addon_image: string;
}
