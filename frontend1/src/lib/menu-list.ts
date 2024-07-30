import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Status",
          active: pathname.includes("/status"),
          icon: SquarePen,
          submenus: [
            {
              href: "/status",
              label: "All Update",
              active: pathname === "/status",
            },
            {
              href: "/status/new",
              label: "Update Status",
              active: pathname === "/status/new",
            },
          ],
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/manageTeam",
          label: "Team Management",
          active: pathname.includes("/manageTeam"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
