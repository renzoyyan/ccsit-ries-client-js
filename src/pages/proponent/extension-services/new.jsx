import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useContext, useRef } from "react";
import { useRouter } from "next/router";

import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import FormContainer from "@/components/elements/FormContainer";
import Heading from "@/components/elements/Heading";
import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import {
  classNames,
  extension_types_opts,
  NOTIFICATION_ACTION_TYPE,
  research_agenda_opts,
  Roles,
  statusOptions,
} from "@/utils/utils";
import KeywordsInput from "@/components/forms/KeywordsInput";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import useProponents from "@/hooks/useProponents";
import useExtension from "@/hooks/useExtension";
import NumberFormat from "@/components/forms/NumberFormat";
import { SocketContext } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";

const defaultValues = {
  file: null,
  flag: "new",
  extension_type: "",
  extension_title: "",
  extension_agenda: "",
  project_duration: "",
  project_budget: "",
  proponents: [],
  implementing_agencies: [],
  collaborating_agencies: [],
  project_sites: [],
  target_beneficiaries: [],
  sdg: "",
  status: "pending",
  keywords: [],
};

const NewExtensionServices = () => {
  const router = useRouter();
  const notificationRef = useRef(null);

  // context
  const { sendNotification } = useContext(SocketContext);
  const { current_user, user } = useAuth();

  const { proponentOptions } = useProponents();
  const { createExtension } = useExtension();
  const queryClient = useQueryClient();
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
    mutationFn: (values) => createExtension(values),

    onSuccess: (values) => {
      queryClient.invalidateQueries("extension");
      router.replace(`/proponent/extension-services`);
      toast.success("New extension saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: proponentIds,
        extension_id: values.new_extension._id,
        action_type: NOTIFICATION_ACTION_TYPE.PROJECT.CREATED,
        isRead: false,
        text: "New Extension Proposal",
        role: user?.role,
        file: values?.log?.file?.url,
      };

      sendNotification(sendNotif);
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const onSubmit = async (values) => {
    notificationRef.current = toast.loading("Uploading file please wait...");
    await mutateAsync(values);
  };

  return (
    <UserLayout>
      <SectionHeader
        className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20"
        title="New Extension"
      >
        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-x-10">
          <Link href="/proponent/extension-services">
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
                "flex flex-wrap justify-between item-center mb-8"
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
                <NumberFormat name="project_budget" label="Project Budget" />
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
                <Form.Input name="sdg" label="SDG" />
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
                  label="Agency name"
                  headingTitle="Implementing Agency(ies)"
                  validation={{
                    minLength: 1,
                    required: "Please append at least 1 item",
                  }}
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
    </UserLayout>
  );
};

export default NewExtensionServices;

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
