import React from "react";
import * as Table from "@/components/elements/table";

import useRoles from "@/hooks/useRoles";
import StatusCard from "@/components/elements/StatusCard";
import { formattedDate } from "@/utils/utils";
import { Avatar, AvatarGroup } from "@mui/material";
import { startCase } from "lodash-es";

const ExtensionServicesContent = ({
  _id,
  extension_type,
  extension_title,
  proponents,
  extension_agenda,
  status,
  created_at,
  project_duration,
}) => {
  const { isAdmin, isPersonnel, isProponent } = useRoles();

  let navLinkContent;

  if (isProponent) {
    navLinkContent = (
      <Table.Link
        title={extension_title}
        href={`/proponent/extension-services/${_id}`}
      />
    );
  }

  if (isPersonnel) {
    navLinkContent = (
      <Table.Link
        title={extension_title}
        href={`/personnel/extension-services/${_id}`}
      />
    );
  }

  if (isAdmin) {
    navLinkContent = (
      <Table.Link
        title={extension_title}
        href={`/admin/extension-services/${_id}`}
      />
    );
  }

  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data sm:pl-6">{extension_type}</td>
      <td className="tbl-data">{extension_title}</td>
      <td className="tbl-data">
        <AvatarGroup className="justify-end" max={3}>
          {proponents.map((value, idx) => {
            const name = `${value.first_name} ${value.last_name}`;

            return (
              <Avatar
                key={value._id}
                title={startCase(name)}
                src={value?.image?.url}
                alt={startCase(name)}
              />
            );
          })}
        </AvatarGroup>
      </td>
      <td className="tbl-data">{extension_agenda}</td>
      <td className="lowercase tbl-data">{project_duration}</td>
      <td className="tbl-data">{formattedDate(created_at)}</td>
      <td className="tbl-data">
        <StatusCard status={status} withLabel={false} />
      </td>

      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        {navLinkContent}
      </td>
    </Table.Row>
  );
};

export default ExtensionServicesContent;
