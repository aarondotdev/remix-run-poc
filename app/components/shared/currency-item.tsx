import { cn, createInitials } from "~/lib/utils";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Currency } from "~/lib/resource-types";

interface CurrencyItemProps {
  currency: Currency;
  className?: string;
}

export const CurrencyItem: FC<CurrencyItemProps> = ({
  currency,
  className,
}) => (
  <div
    className={cn("flex items-center gap-2", className)}
    role="item"
    aria-label={currency?.code}
  >
    {/* User Avatar */}
    <Avatar className="h-5 w-5">
      <AvatarImage
        className="object-cover"
        src={currency?.flag}
        alt={`${currency?.code}'s avatar`}
        loading="lazy"
      />
      <AvatarFallback
        aria-label={`${currency?.code}'s initials`}
        className="border border-stone-300 bg-stone-100 text-[6px] text-stone-500"
      >
        {createInitials(currency?.code)}
      </AvatarFallback>
    </Avatar>

    <span className="truncate">{currency?.code}</span>
  </div>
);
