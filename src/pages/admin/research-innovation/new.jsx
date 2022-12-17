import React from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import Button from "@/components/elements/Button";
import FileUpload from "@/components/forms/FileUpload";
import SectionHeader from "@/components/elements/SectionHeader";
import * as Form from "@/components/forms";
import { research_agenda_opts } from "@/utils/utils";
import FormContainer from "@/components/elements/FormContainer";
import KeywordsInput from "@/components/forms/KeywordsInput";

const defaultValues = {
  project_status: "Proposal",
  project_title: "",
  research_agenda: "",
  project_duration: "",
  project_budget: 0,
  implementing_agencies: [],
  collaborating_agencies: [],
  proponents: [],
};

const NewResearchInnovation = () => {
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, watch } = methods;
  const statusValue = watch("project_status");

  const isStatusCompleted = statusValue.toLowerCase() === "completed";

  const onSubmit = async (values) => console.log(values);

  return (
    <AdminLayout>
      <SectionHeader
        className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20"
        title="New Research Proposal"
      >
        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-x-10">
          <Link href="/admin/research-innovation">
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
            <FileUpload name="research_project" />

            <div className="grid items-start mt-12 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              <Form.Group className="col-span-2">
                <Form.Input
                  name="project_title"
                  label="Research Title"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Select
                  options={research_agenda_opts}
                  name="research_agenda"
                  label="Research Agenda"
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
              {/* 
              <Form.Group>
                <Form.Input
                  type="date"
                  name="start_project_date"
                  label="Start date project"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type="date"
                  name="end_project_date"
                  label="End date project"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group> */}

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
                  label="Name"
                  headingTitle="Implementing Agency(ies)"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.AgencyFieldArray
                  name="collaborating_agencies"
                  label="Name"
                  headingTitle="Collaborating Agency(ies)"
                />
              </Form.Group>
            </div>
          </form>
        </FormProvider>
      </FormContainer>
    </AdminLayout>
  );
};

export default NewResearchInnovation;
