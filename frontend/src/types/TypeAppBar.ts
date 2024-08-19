export namespace TypeAppBar {
  export type AppBarProps = {
    open?: boolean;
    drawerWidth: number;
  };

  export type CustomAppBarProps = {
    open: boolean;
    appBarText: string;
    toggleDrawer: () => void;
    drawerWidth: number;
  };
}
