import { BatteryLow, BookOpen, ClipboardCheck, Compass, Flame, GraduationCap, HeartPulse, LineChart, Scale, Search, Settings2, Users, type LucideProps } from "lucide-react";

const map = { Flame, HeartPulse, Users, ClipboardCheck, Scale, BatteryLow, BookOpen, Search, GraduationCap, Settings2, LineChart, Compass };
export type IconName = keyof typeof map;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.6} aria-hidden="true" {...props} />;
}
