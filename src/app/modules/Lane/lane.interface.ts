export interface ILane {
  lane_title: string;
  description: string;
  addon: boolean;
  addons: Array<IAddon>;
  isDeleted: boolean;
}

export interface IAddon {
  addon_title: string;
  addon_description: string;
  addon_price: number;
}
