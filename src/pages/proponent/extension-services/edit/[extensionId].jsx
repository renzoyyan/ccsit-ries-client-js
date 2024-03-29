import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useRef } from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import FormContainer from "@/components/elements/FormContainer";
import Heading from "@/components/elements/Heading";
import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import {
  extension_types_opts,
  isFile,
  NOTIFICATION_ACTION_TYPE,
  research_agenda_opts,
  Roles,
  statusOptions,
} from "@/utils/utils";
import KeywordsInput from "@/components/forms/KeywordsInput";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import useExtension from "@/hooks/useExtension";
import useProponents from "@/hooks/useProponents";
import { useAuth } from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import NumberFormat from "@/components/forms/NumberFormat";

const defaultValues = {
  file: null,
  flag: "new",
  extension_type: "",
  extension_title: "",
  extension_agenda: "",
  project_duration: "",
  project_budget: 0,
  proponents: [],
  implementing_agencies: [],
  collaborating_agencies: [],
  project_sites: [],
  target_beneficiaries: [],
  keywords: [],
  status: "proposal",
  sdg: "",
};

const EditExtensionServicesPage = () => {
  const router = useRouter();
  const extension_id = router.query.extensionId;

  const notificationRef = useRef(null);

  const queryClient = useQueryClient();

  // context
  const { current_user } = useAuth();
  const { sendNotification } = useContext(SocketContext);

  // hooks
  const { getExtensionById, updateExtensionById } = useExtension();
  const { proponentOptions } = useProponents();

  const { data, isLoading } = useQuery({
    queryKey: ["extension", extension_id],
    queryFn: () => getExtensionById(extension_id),
    enabled: !!extension_id,
  });
  const { proponents, ...rest } = data ?? {};
  const proponentIds = proponents?.map((proponent) => proponent._id);

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const statusValue = watch("status");
  const isStatusCompleted = statusValue?.toLowerCase() === "completed";

  const receiverIds = proponents
    ?.filter((proponent) => proponent._id !== current_user)
    ?.map((p) => p._id);

  useEffect(() => {
    if (extension_id && !isLoading) {
      reset({
        proponents: proponentIds,
        // file: data?.extension_file?.file,
        ...rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, extension_id, isLoading]);

  const { mutateAsync } = useMutation({
    mutationFn: (updatedValues) =>
      updateExtensionById(extension_id, updatedValues),

    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["extension", values._id] });
      router.replace(`/proponent/extension-services/${extension_id}`);
      toast.success("Updated successfully", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        extension_id,
        action_type: NOTIFICATION_ACTION_TYPE.PROJECT.UPDATED,
        isRead: false,
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
    notificationRef.current = isFile(values?.file)
      ? toast.loading("Uploading file please wait...")
      : toast.loading("Saving");

    await mutateAsync(values);
  };

  return (
    <UserLayout>
      <SectionHeader
        className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20"
        title="Edit Details"
      >
        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-x-10">
          <Link href={`/proponent/extension-services/${extension_id}`}>
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
            <div className="flex justify-between item-center">
              <Heading
                as="h3"
                title="Basic Information"
                className="mb-8 font-medium"
              />
              <div className="flex items-center gap-x-4">
                <Heading
                  as="h4"
                  title="Status"
                  className="text-sm font-medium text-gray-600"
                />
                <Form.Group>
                  <Form.Listbox
                    options={statusOptions}
                    name="status"
                    disabled={statusValue === "pending"}
                  />
                </Form.Group>
              </div>
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

            {/* <FileUpload name="file" /> */}

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
                  <KeywordsInput name="keywords" label="Keywords" />
                </Form.Group>
              )}
            </div>

            <div className="grid mt-24 xl:grid-cols-2 lg:gap-x-16 2xl:gap-x-28 gap-y-24">
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
    </UserLayout>
  );
};

export default EditExtensionServicesPage;

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
