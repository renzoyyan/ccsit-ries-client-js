import React from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import FormContainer from "@/components/elements/FormContainer";
import Heading from "@/components/elements/Heading";
import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import { extension_types_opts, research_agenda_opts } from "@/utils/utils";
import KeywordsInput from "@/components/forms/KeywordsInput";

const defaultValues = {
  project_status: "Proposal",
  extension_title: "",
  extension_agenda: "",
  project_duration: "",
  project_budget: 0,
  proponents: [],
  implementing_agencies: [],
  collaborating_agencies: [],
  project_sites: [],
  target_beneficiaries: [],
};

const NewExtensionServices = () => {
  const methods = useForm({ defaultValues });

  const { handleSubmit, watch } = methods;
  const statusValue = watch("project_status");

  const isStatusCompleted = statusValue.toLowerCase() === "completed";

  const onSubmit = async (data) => console.log(data);

  return (
    <AdminLayout>
      <SectionHeader
        className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20"
        title="New Extension"
      >
        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-x-10">
          <Link href="/admin/extension-services">
            <a className="inline-block text-sm font-medium text-gray-500">
              Back
            </a>
          </Link>
          <Button
            className="px-12 py-3 btn-primary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </SectionHeader>

      <FormContainer>
        <Heading
          as="h3"
          title="Basic Information"
          className="mb-8 font-medium"
        />

        <FormProvider {...methods}>
          <form>
            <FileUpload name="project_file" />
            <div className="grid items-start mt-12 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              <Form.Group>
                <Form.Select
                  options={extension_types_opts}
                  name="extension_type"
                  label="Extension Type"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group className="lg:col-span-2">
                <Form.Input
                  name="extension_title"
                  label="Extension Title"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Select
                  options={research_agenda_opts}
                  name="extension_agenda"
                  label="Trust and Priorities / Extension Services Agenda"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="project_budget"
                  label="Project Budget"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="project_duration"
                  label="Project Duration"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  name="project_sdg"
                  label="SDG"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Select
                  options={["Proposal", "On Going", "Completed"]}
                  name="project_status"
                  label="Status"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              {isStatusCompleted && (
                <Form.Group>
                  <KeywordsInput name="keywords" label="Keywords" />
                </Form.Group>
              )}
            </div>

            <div className="grid mt-24 xl:grid-cols-2 lg:gap-x-16 2xl:gap-x-28 gap-y-24">
              <Form.Group>
                <Form.FieldArray
                  name="proponents"
                  label="Name"
                  headingTitle="Proponent(s)"
                />
              </Form.Group>

              <Form.Group>
                <Form.AgencyFieldArray
                  name="implementing_agencies"
                  label="Agency name"
                  headingTitle="Implementing Agency(ies)"
                />
              </Form.Group>
              <Form.Group>
                <Form.AgencyFieldArray
                  name="collaborating_agencies"
                  label="Agency name"
                  headingTitle="Collaborating Agency(ies)"
                />
              </Form.Group>

              <Form.Group>
                <Form.SitesFieldArray
                  name="project_sites"
                  label="Site name"
                  headingTitle="Project Sites"
                />
              </Form.Group>

              <Form.Group>
                <Form.BeneficiaryFieldArray
                  name="target_beneficiaries"
                  label="Beneficiary name"
                  headingTitle="Target Beneficiaries"
                  type="text"
                />
              </Form.Group>
            </div>
          </form>
        </FormProvider>
      </FormContainer>
    </AdminLayout>
  );
};

export default NewExtensionServices;
