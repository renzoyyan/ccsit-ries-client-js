import Heading from "@/components/elements/Heading";
import * as Detail from "@/components/elements/detail";
import useRoles from "@/hooks/useRoles";
import EditLink from "../../elements/links/EditLink";
import _ from "lodash-es";

const ResearchInnovationDetails = ({ data }) => {
  const { isProponent, isAdmin } = useRoles();

  const {
    _id,
    flag,
    research_title,
    research_agenda,
    project_budget,
    project_duration,
    proponents,
    collaborating_agencies,
    implementing_agencies,
    created_by,
  } = data ?? {};

  const createdBy = `${created_by?.first_name} ${created_by?.last_name}`;

  const path = isAdmin
    ? `/admin/research-innovation/edit/${_id}`
    : isProponent
    ? `/proponent/research-innovation/edit/${_id}`
    : "#";

  return (
    <section aria-labelledby="research-innovation-basic-information">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <Heading
            as="h2"
            className="text-lg font-medium leading-6 text-gray-900"
            title="Basic Information"
            id="research-innovation-basic-information"
          />
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
          <Detail.Lists className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <Detail.List
              label="Flag"
              text={flag ?? "N/A"}
              className="xl:col-span-2"
            />
            {/* <Detail.List label="Status" text={_.capitalize(status) ?? "N/A"} /> */}
            <Detail.List
              label="Research Title"
              text={research_title ?? "N/A"}
            />
            <Detail.List
              label="Research Agenda"
              text={research_agenda ?? "N/A"}
              className="pr-4"
            />

            <Detail.List
              label="Project Budget"
              text={project_budget ?? "N/A"}
            />

            <Detail.List
              label="Project Duration"
              text={project_duration ?? "N/A"}
            />
            <Detail.List label="Proponents(s)">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {proponents?.map((value, idx) => {
                    const name = `${value.first_name} ${value.last_name}`;

                    return (
                      <li key={value._id || idx} className="capitalize">
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </Detail.List>
            <Detail.List label="Implementing Agency(ies)">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {implementing_agencies?.length ? (
                    implementing_agencies?.map((item, idx) => (
                      <li key={idx}>{item.agency_name}</li>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      N/A
                    </span>
                  )}
                </ul>
              </dd>
            </Detail.List>
            <Detail.List label="Collaborating Agency(ies)">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {collaborating_agencies?.length ? (
                    collaborating_agencies?.map((item, idx) => (
                      <li key={idx}>{item.agency_name}</li>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      N/A
                    </span>
                  )}
                </ul>
              </dd>
            </Detail.List>

            {/* <Detail.List label="Created by" text={createdBy ?? "N/A"} /> */}
          </Detail.Lists>
        </div>
        {(isProponent || isAdmin) && <EditLink href={path} />}
      </div>
    </section>
  );
};

export default ResearchInnovationDetails;
