export namespace TypeDrawer {
  export type DrawerProps = {
    open?: boolean;
    drawerWidth: number;
  };

  export type CustomDrawerProps = {
    open: boolean;
    drawerWidth: number;
    toggleDrawer: () => void;
    items: {
      text: string;
      Icon: React.ElementType;
      path: string;
    }[];
  };
}
