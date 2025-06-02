import {
  CalendarCheck,
  ChartColumn,
  ClipboardPlus,
  Heart,
  IndianRupee,
  Users,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-4 py-10 space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-1.5">
        <Heart className="w-10 h-10" fill="var(--color-primary)" />
        <h1 className="text-xl font-semibold">NGO Impact Tracker</h1>
        <p className="text-center text-sm font-light text-muted-foreground">
          Empowering NGOs across India to track, report, and showcase their
          impact. Submit monthly reports and view comprehensive analytics.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <CustomCard
          title={"Submit Monthly Report"}
          description={
            "Submit your NGO's monthly impact data including people helped, events conducted, and funds utilized."
          }
          icon={<ClipboardPlus />}
          link={"/report"}
          linkText={"Submit Report"}
        />
        <CustomCard
          title={"View Dashboard"}
          description={
            "Access comprehensive analytics and view aggregated impact data across all participating NGOs."
          }
          icon={<ChartColumn />}
          link={"/dashboard"}
          linkText={"View Dashboard"}
        />
      </div>
      <CustomCard2
        icon={<Users />}
        title={"People Helped"}
        description={
          "Track the number of people your NGO has helped each month"
        }
      />
      <CustomCard2
        icon={<CalendarCheck />}
        title={"Events Conducted"}
        description={"Monitor the events and activities organized by your NGO"}
      />
      <CustomCard2
        icon={<IndianRupee />}
        title={"Funds Utilized"}
        description={"Keep track of funds utilized for various NGO activities"}
      />
    </div>
  );
}

const CustomCard = ({ title, description, icon, link, linkText }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button size={"lg"} asChild className="w-full mt-4">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardHeader>
    </Card>
  );
};

const CustomCard2 = ({ title, description, icon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
