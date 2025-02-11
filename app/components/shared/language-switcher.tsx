import { parseAsString, useQueryStates } from "nuqs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import US from "~/assets/icons/us.svg";
import JP from "~/assets/icons/jp.svg";
import KO from "~/assets/icons/ko.svg";
import { useLocale } from "remix-i18next/react";

function LanguageSwitcher() {
  const locale = useLocale();

  const [intl, setIntl] = useQueryStates(
    {
      lng: parseAsString.withDefault(locale),
    },
    {
      history: "push",
      shallow: false,
      clearOnDefault: false,
    }
  );

  const language = [
    {
      lng: {
        value: "en",
        label: "English",
      },
      image: US,
    },
    {
      lng: {
        value: "ja",
        label: "Japanese",
      },
      image: JP,
    },
    {
      lng: {
        value: "ko",
        label: "Korean",
      },
      image: KO,
    },
  ];

  const activeLang = language.find((data) => data.lng.value === intl.lng);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex h-8 w-8 gap-x-2 rounded-full bg-background text-foreground"
        >
          <img
            src={activeLang?.image}
            alt={`${activeLang?.lng.label} icon`}
            width={50}
            height={50}
            className="h-[1rem] w-[1rem] rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {language.map((data, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => setIntl({ lng: data.lng?.value })}
            className="flex gap-x-2"
          >
            <img
              src={data.image}
              alt={`${data.lng?.label} icon`}
              height={50}
              className="h-[1rem] w-auto rounded-full"
            />
            {data.lng?.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
