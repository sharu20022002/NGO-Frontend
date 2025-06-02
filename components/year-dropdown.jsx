"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://ngo-backend-amww.onrender.com/api/dashboard/months"
        );
        const data = await response.json();
        const modifiedData = data.map((data) => ({
          label: data.month,
          value: data.month,
        }));
        setMonths(modifiedData);

        // ✅ Read and apply month from URL
        const params = new URLSearchParams(window.location.search);
        const monthFromURL = params.get("month");
        if (monthFromURL) setValue(monthFromURL);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch months");
        setIsLoading(false);
        router.push("/");
      }
    };
    fetchMonths();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[200px] w-full justify-between"
        >
          {value
            ? months.find((month) => month.value === value)?.label
            : "Select month..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search month..." className="h-9" />
          <CommandList>
            <CommandEmpty>No months found.</CommandEmpty>
            <CommandGroup>
              {months.map((month) => (
                <CommandItem
                  key={month.value}
                  value={month.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);

                    const params = new URLSearchParams(window.location.search);
                    if (newValue) {
                      params.set("month", newValue);
                    } else {
                      params.delete("month");
                    }

                    router.push(`?${params.toString()}`);
                  }}
                >
                  {month.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === month.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
