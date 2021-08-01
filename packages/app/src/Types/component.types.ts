export interface DrawerTreeItem<T> {
  _id: string;
  children: DrawerTreeItem<T>[];
  name: string;
}
