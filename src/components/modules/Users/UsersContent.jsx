import React, { useContext } from "react";
import * as Table from "@/components/elements/table";
import Image from "next/image";
import Avatar from "@/assets/images/avatar.png";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import { UserContext } from "@/context/UserContext";

const UsersContent = ({
  _id,
  first_name,
  last_name,
  username,
  image,
  role,
}) => {
  const userName = `${first_name} ${last_name}`;

  const { handleGetUserId, toggleModal } = useContext(UserContext);

  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data whitespace-nowrap sm:pl-6">
        <div className="inline-flex items-center gap-2">
          <div className="flex-shrink-0">
            <Image
              src={!image?.url ? Avatar : image?.url}
              width={50}
              height={50}
              className="flex-shrink-0 rounded-full"
              alt={userName}
              objectFit="cover"
            />
          </div>
          <span>{userName}</span>
        </div>
      </td>
      <td className="normal-case tbl-data whitespace-nowrap">{username}</td>
      <td className="tbl-data whitespace-nowrap">{role}</td>
      {/* <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        <Table.Link href="/proponents/1" title={userName} />
      </td> */}
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <Button
          type="button"
          onClick={() => {
            handleGetUserId(_id);
            toggleModal();
          }}
        >
          <PencilSquareIcon className="w-6 h-6 text-bc-primary hover:text-bc-tertiary" />
        </Button>
      </td>
    </Table.Row>
  );
};

export default UsersContent;
