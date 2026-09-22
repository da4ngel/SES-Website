import {
  Activity,
  Clock,
  Gauge,
  LayoutGrid,
  MonitorSmartphone,
  PiggyBank,
  ScanSearch,
  Sunrise,
  Users,
  Wind,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/solutions";

// One line icon set (Lucide) at a consistent 1.5px stroke.
const icons = {
  scan: ScanSearch,
  savings: PiggyBank,
  wrench: Wrench,
  remote: MonitorSmartphone,
  gauge: Gauge,
  wind: Wind,
  users: Users,
  zones: LayoutGrid,
  sunrise: Sunrise,
  activity: Activity,
  clock: Clock,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp strokeWidth={1.5} aria-hidden="true" {...props} />;
}
