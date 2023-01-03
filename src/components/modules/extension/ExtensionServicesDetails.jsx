import React from "react";
import Heading from "@/components/elements/Heading";
import * as Detail from "@/components/elements/detail";
import Link from "next/link";
import useRoles from "@/hooks/useRoles";

const ExtensionServicesDetails = ({ data }) => {
  const { isAdmin, isProponent } = useRoles();

  const path = isAdmin ? "admin" : "proponent";

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
            <Detail.List label="Flag" text={data?.flag ?? "N/A"} />
            <Detail.List
              label="Extension Type"
              text={data?.extension_type ?? "N/A"}
            />
            <Detail.List
              label="Publication Status"
              text={data?.publication_status ? "Yes" : "No"}
            />
            <Detail.List
              label="Presentation Status"
              text={data?.presentation_status ? "Yes" : "No"}
            />
            <Detail.List
              label="Extension Title"
              text={data?.extension_title ?? "N/A"}
            />
            <Detail.List
              label="Trust and Priorities/ Extension Services Agenda"
              text={data?.extension_agenda ?? "N/A"}
              className="pr-4"
            />

            <Detail.List
              label="Project Budget"
              text={data?.project_budget ?? "N/A"}
            />
            {/* <Detail.List label="Project start date" text="08/12/2022" />
            <Detail.List label="Project end date" text="01/12/2023" /> */}
            <Detail.List
              label="Project Duration"
              text={data?.project_duration ?? "N/A"}
              listClassName="normal-case"
            />
            <Detail.List label="SDG" text={data?.sdg ?? "N/A"} />
            <Detail.List label="Proponents(s)">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {data?.proponents?.map((value, idx) => {
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
                  {data?.implementing_agencies?.length ? (
                    data?.implementing_agencies?.map((item, idx) => (
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
                  {data?.collaborating_agencies?.length > 0 ? (
                    data?.collaborating_agencies?.map((item, idx) => (
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
            <Detail.List label="Project Sites">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {data?.project_sites?.length ? (
                    data?.project_sites?.map((item, idx) => (
                      <li key={idx}>{item.site_name}</li>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      N/A
                    </span>
                  )}
                </ul>
              </dd>
            </Detail.List>
            <Detail.List label="Target Beneficiaries">
              <dd className="mt-1 text-gray-900">
                <ul role="list">
                  {data?.target_beneficiaries?.length ? (
                    data?.target_beneficiaries?.map((item, idx) => (
                      <li key={idx}>{item.beneficiary_name}</li>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      N/A
                    </span>
                  )}
                </ul>
              </dd>
            </Detail.List>
          </Detail.Lists>
        </div>
        {(isProponent || isAdmin) && (
          <div>
            <Link href={`/${path}/extension-services/edit/${data?._id}`}>
              <a className="block px-4 py-4 font-semibold text-center text-gray-500 bg-gray-100 hover:text-gray-700 sm:rounded-b-lg">
                Edit
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtensionServicesDetails;
