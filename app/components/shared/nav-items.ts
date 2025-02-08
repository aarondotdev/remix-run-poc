import { type NavGroup } from '@/types';
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
    Menu
} from 'lucide-react';

export let navItems: NavGroup[] = [
    {
        group_name: 'General',
        group_item: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutDashboardIcon,
                isVisible: true
            },
            {
                title: 'Profile',
                url: '/profile',
                icon: User,
                isVisible: true
            }
        ]
    },
    {
        group_name: 'Admin Panel',
        group_item: [
            {
                title: 'Requests Management',
                icon: File,
                isActive: false,
                items: [
                    {
                        title: 'KYC Requests',
                        url: '/manage-kyc-requests',
                        guard_name: 'VIEWANY_KYC',
                        isVisible: true
                    },
                    {
                        title: 'Deposit Requests',
                        url: '/manage-deposit-requests',
                        guard_name: 'VIEWANY_DEPOSIT',
                        isVisible: true
                    },
                    {
                        title: 'Withdrawal Requests',
                        url: '/manage-withdrawal-requests',
                        guard_name: 'VIEWANY_WITHDRAWAL',
                        isVisible: true
                    },
                    {
                        title: 'Withdrawal Requests',
                        url: '/manage-withdrawal-requests/view/:id',
                        guard_name: 'VIEW_WITHDRAWAL',
                        isVisible: false
                    }
                ]
            },
            {
                title: 'Games Management',
                icon: Users,
                isActive: false,
                items: [
                    {
                        title: 'Manage Games',
                        url: '/manage-games',
                        guard_name: 'VIEWANY_GAME',
                        isVisible: true
                    }
                ]
            }
            // {
            //   title: 'Shifts Management',
            //   icon: CalendarClockIcon,
            //   isActive: false,
            //   items: [
            //     {
            //       title: 'Manage Shift Types',
            //       url: '/manage-shift-types',
            //       isVisible: true
            //     },
            //     {
            //       title: 'Manage Schedules',
            //       url: '/manage-schedules',
            //       isVisible: true
            //     }
            //   ]
            // },
            // {
            //   title: 'Chips Management',
            //   icon: Coins,
            //   isActive: false,
            //   items: [
            //     {
            //       title: 'Manage Chips',
            //       url: '/manage-chips',
            //       isVisible: true
            //     }
            //   ]
            // },
        ]
    },
    {
        group_name: 'Finance',
        group_item: [
            {
                title: 'Accounting Management',
                icon: Menu,
                isActive: false,
                items: [
                    {
                        title: 'Manage Chart of Accounts',
                        url: '/manage-chart-of-accounts',
                        guard_name: 'VIEWANY_CHARTOFACCOUNT',
                        isVisible: true
                    },
                    {
                        title: 'Manage Journal Entries',
                        url: '/manage-journal-entries',
                        guard_name: 'VIEWANY_CHARTOFACCOUNT',
                        isVisible: true
                    },
                    {
                        title: 'Fund Transfers',
                        url: '/fund-transfers',
                        guard_name: 'FUNDTRANSFER_HOUSEBALANCE',
                        isVisible: true
                    },
                    {
                        title: 'House Balances',
                        url: '/house-balances',
                        guard_name: 'VIEWANY_HOUSEBALANCE',
                        isVisible: true
                    }
                ]
            },
            {
                title: 'Exchange Management',
                icon: Coins,
                isActive: false,
                items: [
                    {
                        title: 'Buy And Sell',
                        url: '/buy-and-sell',
                        isVisible: true
                    },
                    {
                        title: 'Exchange Overview',
                        url: '/exchange-overview',
                        isVisible: true
                    }
                ]
            }
        ]
    },
    {
        group_name: 'Maintenance Pages',
        group_item: [
            {
                title: 'Options Management',
                icon: Menu,
                isActive: false,
                items: [
                    {
                        title: 'Manage Junket Sites',
                        url: '/manage-junkets',
                        guard_name: 'VIEWANY_JUNKETSITE',
                        isVisible: true
                    },
                    {
                        title: 'Manage Junket Site',
                        url: '/manage-junkets/view/:id',
                        guard_name: 'VIEW_JUNKETSITE',
                        isVisible: false
                    },
                    {
                        title: 'Manage Agents',
                        url: '/manage-agents',
                        isVisible: true,
                        guard_name: 'VIEWANY_AGENT'
                    },
                    {
                        title: 'Manage Game Types',
                        url: '/manage-game-types',
                        isVisible: true,
                        guard_name: 'VIEWANY_GAMETYPE'
                    },
                    {
                        title: 'Manage Currencies',
                        url: '/manage-currencies',
                        guard_name: 'VIEWANY_CURRENCY',
                        isVisible: true
                    },
                    {
                        title: 'Manage Banks',
                        url: '/manage-banks',
                        guard_name: 'VIEWANY_BANK',
                        isVisible: true
                    },
                    {
                        title: 'Manage Bank Accounts',
                        url: '/manage-bank-accounts',
                        guard_name: 'VIEWANY_BANKACCOUNT',
                        isVisible: true
                    },
                    {
                        title: 'Manage Fees',
                        url: '/manage-fees',
                        guard_name: 'VIEWANY_TRANSACTIONFEE',
                        isVisible: true
                    },
                    {
                        title: 'Manage Withdrawal Limits',
                        url: '/manage-withdrawal-limits',
                        // guard_name: 'VIEWANY_TRANSACTIONFEE',
                        isVisible: true
                    },
                    {
                        title: 'Manage Rollers',
                        url: '/manage-rollers',
                        guard_name: 'VIEWANY_ROLLER',
                        isVisible: true
                    }
                ]
            },
            {
                title: 'Roles Management',
                icon: KeyRound,
                isActive: false,
                items: [
                    {
                        title: 'Manage Roles',
                        url: '/manage-roles',
                        guard_name: 'VIEWANY_ROLE',
                        isVisible: true
                    },
                    {
                        title: 'Create Role',
                        url: '/manage-roles/create',
                        guard_name: 'CREATE_ROLE',
                        isVisible: true
                    }
                ]
            },
            {
                title: 'Users Management',
                icon: Briefcase,
                isActive: false,
                items: [
                    {
                        title: 'Manage Users',
                        url: '/manage-users',
                        guard_name: 'VIEWANY_USER',
                        isVisible: true
                    },
                    {
                        title: 'Manage Guests',
                        url: '/manage-guests/view/:id',
                        isVisible: false,
                        guard_name: 'VIEW_PLAYER'
                    },
                    {
                        title: 'Manage Guests',
                        url: '/manage-guests',
                        guard_name: 'VIEWANY_PLAYER',
                        isVisible: true
                    },
                    {
                        title: 'Manage Cashiers',
                        url: '/manage-cashiers',
                        isVisible: true
                    },
                    {
                        title: 'Merchant Registration',
                        url: '/merchant-registration',
                        isVisible: true
                    }
                ]
            }

            // {
            //   title: 'Shifts Management',
            //   icon: CalendarClockIcon,
            //   isActive: false,
            //   items: [
            //     {
            //       title: 'Manage Shift Types',
            //       url: '/manage-shift-types',
            //       isVisible: true
            //     },
            //     {
            //       title: 'Manage Schedules',
            //       url: '/manage-schedules',
            //       isVisible: true
            //     }
            //   ]
            // },
            // {
            //   title: 'Chips Management',
            //   icon: Coins,
            //   isActive: false,
            //   items: [
            //     {
            //       title: 'Manage Chips',
            //       url: '/manage-chips',
            //       isVisible: true
            //     }
            //   ]
            // },
            // {
            //   title: 'Exchange Management',
            //   icon: Coins,
            //   isActive: false,
            //   items: [
            //     {
            //       title: 'Buy And Sell',
            //       url: '/buy-and-sell',
            //       isVisible: true
            //     },
            //     {
            //       title: 'Exchange Overview',
            //       url: '/exchange-overview',
            //       isVisible: true
            //     },
            //     {
            //       title: 'Manage Currencies',
            //       url: '/manage-currencies',
            //       guard_name: 'VIEWANY_CURRENCY',
            //       isVisible: true
            //     }
            //   ]
            // }
        ]
    }
];
