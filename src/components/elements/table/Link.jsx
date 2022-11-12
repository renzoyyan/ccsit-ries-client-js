import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const TblLink = ({ href, title }) => {
  return (
    <Link href={href}>
      <a className="inline-block text-bc-primary hover:text-bc-tertiary">
        <ArrowTopRightOnSquareIcon className="w-6 h-6 text-bc-primary hover:text-bc-tertiary" />
        <span className="sr-only">,View {title}</span>
      </a>
    </Link>
  );
};

export default TblLink;
