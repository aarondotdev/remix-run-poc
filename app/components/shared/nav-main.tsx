'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '~/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '~/components/ui/sidebar';
import { useSidebar } from '~/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { Fragment } from 'react';

import { cn } from '~/lib/utils';
import { Link, useLocation } from '@remix-run/react';
import { NavGroup } from '~/lib/resource-types';

export function NavMain({ navItems }: { navItems: NavGroup[] | null }) {
    const location = useLocation();
    const { open, isMobile } = useSidebar();

    return navItems?.map((navItem) => (
        <SidebarGroup key={navItem.group_name}>
            <SidebarGroupLabel>{navItem.group_name}</SidebarGroupLabel>
            <SidebarMenu>
                {navItem.group_item?.map((item) => {
                    if (item.items) {
                        return (
                            <Fragment key={item.title}>
                                {!open && !isMobile ? (
                                    <DropdownMenu>
                                        <SidebarMenuItem>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-48 space-y-1"
                                                align="start"
                                                side="right"
                                                sideOffset={16}
                                            >
                                                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                                {item.items?.map((subItem) => {
                                                    return subItem?.isVisible ? (
                                                        <DropdownMenuItem key={subItem.title} asChild>
                                                            <Link to={subItem.url as string}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <></>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </SidebarMenuItem>
                                    </DropdownMenu>
                                ) : (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={
                                            item.isActive ||
                                            item.items?.some(
                                                (child) => `${child.url}` === location.pathname
                                            )
                                        }
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map((subItem) => {
                                                        return subItem.isVisible ? (
                                                            <SidebarMenuSubItem key={subItem.url}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    className={cn(
                                                                        `/${subItem.url}` === location.pathname
                                                                            ? 'bg-[hsl(var(--sidebar-accent))]'
                                                                            : ''
                                                                    )}
                                                                >
                                                                    <Link to={subItem.url as string}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ) : (
                                                            <Fragment key={subItem.url}></Fragment>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )}
                            </Fragment>
                        );
                    }
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                className={cn(
                                    `/${item.url}` === location.pathname
                                        ? 'bg-[hsl(var(--sidebar-accent))]'
                                        : ''
                                )}
                            >
                                <Link to={item.url as string}>
                                    {item.icon && <item.icon />} {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    ));
}
