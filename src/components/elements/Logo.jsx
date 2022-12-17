import Image from "next/image";
import Heading from "@/components/elements/Heading";
import { classNames } from "../../utils/utils";

const Logo = ({ headingClassName, divClass }) => {
  return (
    <div
      className={classNames(
        divClass,
        "flex items-center gap-x-3 cursor-default"
      )}
    >
      <Image src={"/assets/logo.svg"} alt="CCSIT-RIES" width={36} height={36} />
      <Heading
        as="h2"
        className={classNames(
          headingClassName ? headingClassName : "text-bc-primary",
          "text-sm font-bold"
        )}
        title="CCSIT - RIES"
      />
    </div>
  );
};

export default Logo;
