import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Heading from "@/components/elements/Heading";
import Button from "@/components/elements/Button";
import FileUpload from "@/components/forms/FileUpload";
import SectionHeader from "@/components/elements/SectionHeader";
import * as Form from "@/components/forms";
import {
  isFile,
  NOTIFICATION_ACTION_TYPE,
  research_agenda_opts,
  Roles,
  statusOptions,
} from "@/utils/utils";
import FormContainer from "@/components/elements/FormContainer";
import KeywordsInput from "@/components/forms/KeywordsInput";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import useResearch from "@/hooks/useResearch";
import useProponents from "@/hooks/useProponents";
import { SocketContext } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";

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
  const research_id = router.query.researchId;
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  // context
  const { sendNotification } = useContext(SocketContext);
  const { current_user } = useAuth();

  // hooks
  const { getResearchById, updateResearchById } = useResearch();
  const { proponentOptions } = useProponents();

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [statusValue] = watch(["status"]);

  const { data, isLoading } = useQuery({
    queryKey: ["research", research_id],
    queryFn: () => getResearchById(research_id),
    enabled: !!research_id,
  });

  const { proponents, ...others } = data ?? {};

  const proponentIds = proponents?.map((proponent) => proponent._id);
  const receiverIds = proponents
    ?.filter((proponent) => proponent._id !== current_user)
    ?.map((p) => p._id);

  useEffect(() => {
    if (research_id && !isLoading) {
      reset({
        proponents: proponentIds,
        file: data?.research_file?.file,
        ...others,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [research_id, reset, isLoading]);

  const isStatusCompleted = statusValue?.toLowerCase() === "completed";

  const { mutateAsync } = useMutation({
    mutationFn: (updatedValues) =>
      updateResearchById(research_id, updatedValues),

    onSuccess: (values) => {
      queryClient.invalidateQueries({
        queryKey: ["research", values.currentResearch._id],
      });
      router.replace(`/proponent/research-innovation/${research_id}`);
      toast.success("Successfully saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        research_id,
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
          <Link href={`/proponent/research-innovation/${research_id}`}>
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

            <FileUpload name="file" />

            <div className="grid items-start grid-cols-1 mt-12 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              <Form.Group className="md:col-span-2">
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
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input name="project_duration" label="Project Duration" />
              </Form.Group>

              <Form.Group>
                <Form.Select
                  name="proponents"
                  label="Proponents"
                  options={proponentOptions}
                  multiple
                  positionValue="outside"
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
