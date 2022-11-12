import Link from "next/link";
import { useRouter } from "next/router";
import { classNames, Roles } from "@/utils/utils";

const NavLink = ({ item, role }) => {
  const router = useRouter();

  switch (role) {
    case Roles.ADMIN:
      return (
        <Link key={item.name} href={item.href}>
          <a
            className={classNames(
              router.pathname.startsWith(item.href)
                ? "bg-gray-800"
                : "hover:bg-gray-800 hover:text-white",
              "group rounded-md py-3 px-6 flex items-center text-sm font-medium text-white"
            )}
          >
            {item.icon && (
              <item.icon
                className={classNames(
                  "mr-3 flex-shrink-0 h-6 w-6 text-bc-secondary group-hover:text-bc-secondary"
                )}
                aria-hidden="true"
              />
            )}
            {item.name}
          </a>
        </Link>
      );

    case Roles.PERSONNEL:
      return (
        <Link href={item.href}>
          <a
            className={classNames(
              router.pathname.startsWith(item.href)
                ? "border-bc-primary text-bc-primary"
                : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent",
              "inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 "
            )}
          >
            {item.name}
          </a>
        </Link>
      );

    default:
      return null;
  }
};

export default NavLink;
