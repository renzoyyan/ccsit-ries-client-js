import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useContext, useRef } from "react";

import Heading from "@/components/elements/Heading";
import Button from "@/components/elements/Button";
import FileUpload from "@/components/forms/FileUpload";
import SectionHeader from "@/components/elements/SectionHeader";
import * as Form from "@/components/forms";
import {
  classNames,
  NOTIFICATION_ACTION_TYPE,
  research_agenda_opts,
  Roles,
  statusOptions,
} from "@/utils/utils";
import FormContainer from "@/components/elements/FormContainer";
import KeywordsInput from "@/components/forms/KeywordsInput";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import useProponents from "@/hooks/useProponents";
import useResearch from "@/hooks/useResearch";
import { useAuth } from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import { values } from "lodash-es";

const defaultValues = {
  flag: "new",
  file: null,
  research_title: "",
  research_agenda: "",
  proponents: [],
  project_duration: "",
  project_budget: 0,
  implementing_agencies: [],
  collaborating_agencies: [],
  status: "proposal",
};

const NewResearchInnovation = () => {
  const router = useRouter();
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  // context
  const { sendNotification } = useContext(SocketContext);
  const { current_user } = useAuth();

  // hooks
  const { proponentOptions } = useProponents();
  const { createResearch } = useResearch();

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const [statusValue, flagValue, proponentIds] = watch([
    "status",
    "flag",
    "proponents",
  ]);
  const isStatusCompleted = statusValue.toLowerCase() === "completed";

  const { mutateAsync } = useMutation({
    mutationFn: createResearch,
    onSuccess: (values) => {
      queryClient.invalidateQueries(["research"]);
      router.replace(`/proponent/research-innovation`);
      toast.success("New research saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: proponentIds,
        research_id: values.new_research._id,
        action_type: NOTIFICATION_ACTION_TYPE.PROJECT.CREATED,
        isRead: false,
      };

      sendNotification(sendNotif);
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const onSubmit = async (values) => {
    notificationRef.current = toast.loading("Uploading file please wait...", {
      duration: 6000,
    });
    await mutateAsync(values);
  };

  return (
    <UserLayout>
      <SectionHeader
        className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20"
        title="New Research Proposal"
      >
        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-x-10">
          <Link href="/proponent/research-innovation">
            <a className="inline-block text-sm font-medium text-gray-500">
              Back
            </a>
          </Link>
          <Button
            type="submit"
            className="px-12 py-3 btn-primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving" : "Save"}
          </Button>
        </div>
      </SectionHeader>

      <FormContainer>
        <FormProvider {...methods}>
          <form>
            <div
              className={classNames(
                "flex flex-wrap gap-x-6 justify-between item-center mb-8"
              )}
            >
              <Heading
                as="h3"
                title="Basic Information"
                className="font-medium"
              />
              {flagValue !== "new" ? (
                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                  <Heading
                    as="h4"
                    title="Status"
                    className="text-sm font-medium text-gray-600"
                  />
                  <Form.Group>
                    <Form.Listbox options={statusOptions} name="status" />
                  </Form.Group>
                </div>
              ) : null}
            </div>
            <div className="flex items-center mb-10 gap-x-4">
              <Form.Group>
                <Form.Input type="radio" name="flag" label="New" value="new" />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type="radio"
                  name="flag"
                  label="Existing"
                  value="existing"
                />
              </Form.Group>
            </div>

            <FileUpload
              name="file"
              validation={{
                required: "This field is required",
              }}
            />

            <div className="grid items-start grid-cols-1 mt-12 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              <Form.Group className="sm:col-span-2">
                <Form.Input
                  name="research_title"
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
                    pattern: {
                      value: /^\d+$/,
                      message: "This field should have digits only",
                    },
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
                <Form.Select
                  name="proponents"
                  label="Proponents"
                  options={proponentOptions}
                  multiple
                  positionValue="outside"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>
              {isStatusCompleted && (
                <Form.Group>
                  <KeywordsInput
                    name="keywords"
                    label="Keywords"
                    validation={{
                      validate: {
                        isCompleted: (value) => {
                          if (!isStatusCompleted) {
                            return !!value || "This field is required";
                          }
                          return true;
                        },
                      },
                    }}
                  />
                </Form.Group>
              )}
            </div>

            <div className="grid mt-24 xl:grid-cols-2 lg:gap-x-16 2xl:gap-x-28 gap-y-24">
              <Form.Group>
                <Form.AgencyFieldArray
                  name="implementing_agencies"
                  label="Name"
                  headingTitle="Implementing Agency(ies)"
                  type="text"
                  validation={{
                    minLength: 1,
                    required: "Please append at least 1 item",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.AgencyFieldArray
                  name="collaborating_agencies"
                  label="Name"
                  headingTitle="Collaborating Agency(ies)"
                  type="text"
                />
              </Form.Group>
            </div>
          </form>
        </FormProvider>
      </FormContainer>
    </UserLayout>
  );
};

export default NewResearchInnovation;

export const getServerSideProps = async (ctx) => {
  const session = await getAuthSession(ctx);
  const role = session?.user?.user_details?.role;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session && role !== Roles.PROPONENT) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
