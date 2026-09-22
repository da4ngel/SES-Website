import { techNav } from "@/content/technology";
import { LocalNav } from "@/components/ui/LocalNav";

/** Shared by every /technology page, so the local nav (and its active pill) persists between them. */
export default function TechnologyLayout({ children }: LayoutProps<"/technology">) {
  return (
    <>
      <LocalNav items={techNav} label="Technology" />
      {children}
    </>
  );
}
