interface IItem {
  title: string;
  link: string;
}

interface INavigationItem {
  group: boolean;
  item?: IItem;
  title?: string;
  items?: IItem[];
}

export const navigationsItems: INavigationItem[] = [
  // { group: false, item: { title: 'Home', link: '/admin' } },
  { group: false, item: { title: 'Docentes', link: '/admin/docentes' } },
  { group: false, item: { title: 'Periodos', link: '/admin/periodos' } },
  { group: false, item: { title: 'Unidades Unasp', link: '/admin/unidades_unasp' } },
  { group: false, item: { title: 'Usuarios', link: '/admin/users' } },
];
