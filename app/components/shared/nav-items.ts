import { NavGroup } from "~/lib/resource-types";
import {
  Briefcase,
  File,
  Calculator,
  CalendarClockIcon,
  Coins,
  Files,
  KeyRound,
  LayoutDashboardIcon,
  Torus,
  User,
  Users,
  Menu,
} from "lucide-react";

export let navItems: NavGroup[] = [
  {
    group_name: "General",
    group_item: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        isVisible: true,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: User,
        isVisible: true,
      },
    ],
  },
  {
    group_name: "Resources",
    group_item: [
      {
        title: "User Management",
        icon: Briefcase,
        isActive: true,
        items: [
          {
            title: "Users",
            url: "/users",
            guard_name: "user.viewAny",
            isVisible: true,
          },
          //   {
          //     title: "Manage Guests",
          //     url: "/manage-guests/view/:id",
          //     isVisible: false,
          //     guard_name: "player.viewAny",
          //   },
          {
            title: "Guests",
            url: "/guests",
            guard_name: "player.viewAny",
            isVisible: true,
          },
          {
            title: "Cashiers",
            url: "/cashiers",
            isVisible: true,
          },
          // {
          //     title: 'Merchant Registration',
          //     url: '/merchant-registration',
          //     isVisible: true
          // }
        ],
      },
    ],
  },
];
