import { adminNav, Roles } from "@/utils/utils";
import Logo from "@/components/elements/Logo";
import NavLink from "../../elements/links/NavLink";
import useRoles from "@/hooks/useRoles";

export default function Sidebar() {
  const { isAdmin } = useRoles();

  let navigationContent;

  if (isAdmin) {
    navigationContent = adminNav.map((item, idx) => (
      <NavLink key={idx} item={item} role={Roles.ADMIN} />
    ));
  }

  return (
    <>
      {/* Static sidebar for desktop */}
      <aside className="z-10 w-[281px] hidden transition-all duration-150 ease-in-out lg:fixed lg:inset-y-0 lg:grid">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col pt-8 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-6 mb-12">
            <Logo />
          </div>
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-4 space-y-4">{navigationContent}</nav>
          </div>
        </div>
      </aside>
    </>
  );
}
