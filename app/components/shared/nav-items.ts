import { NavGroup } from "@/lib/resource-types";
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
          // {
          //     title: 'Manage Guests',
          //     url: '/manage-guests/view/:id',
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
      {
        title: "Roles Management",
        icon: KeyRound,
        isActive: false,
        items: [
          {
            title: "Roles",
            url: "/roles",
            guard_name: "role.viewAny",
            isVisible: true,
          },
          {
            title: "Create Role",
            url: "/roles/create",
            guard_name: "role.create",
            isVisible: true,
          },
        ],
      },
      {
        title: "Options Management",
        icon: Menu,
        isActive: true,
        items: [
          {
            title: "Game Types",
            url: "/game-types",
            guard_name: "gameType.viewAny",
            isVisible: true,
          },
          {
            title: "Rollers",
            url: "/rollers",
            guard_name: "roller.viewAny",
            isVisible: true,
          },
        ],
      },
    ],
  },
];
