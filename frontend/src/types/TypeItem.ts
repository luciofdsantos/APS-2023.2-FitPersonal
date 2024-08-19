export namespace TypeItem {
  export type Item = {
    text: string;
    Icon: React.ElementType;
    path: string;
  };

  export type ListItemsProps = {
    items: Item[];
    open: boolean;
  };
}
