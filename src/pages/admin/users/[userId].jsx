import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import { FormProvider, useForm } from "react-hook-form";
import FormContainer from "@/components/elements/FormContainer";
import * as Form from "@/components/forms";
import SingleFileUpload from "@/components/forms/SingleFileUpload";
import Button from "@/components/elements/Button";
import SectionHeader from "@/components/elements/SectionHeader";
import BackLink from "@/components/elements/links/BackLink";
import { useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import toast from "react-hot-toast";

const defaultValues = {
  image: null,
  role: "",
  first_name: "",
  last_name: "",
  suffix: "",
  doctorate_degree: "",
};

const UserDetailsPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const user_id = router.query.userId;
  const queryClient = useQueryClient();

  const methods = useForm({ defaultValues });

  const { handleSubmit, setFocus, reset } = methods;

  const { getUserById, updateUserById } = useUsers();

  const { data } = useQuery({
    queryKey: ["users", user_id],
    queryFn: () => getUserById(user_id),
    enabled: !!user_id,
  });

  const { image, ...others } = data ?? {};

  useEffect(() => {
    if (data) {
      reset({
        image: image?.url,
        ...others,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, data]);

  useEffect(() => {
    if (isEdit) {
      setFocus("first_name");
    }
  }, [setFocus, isEdit]);

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (values) => updateUserById(user_id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user_id] });
      toast.success("Successfully saved");
      handleEdit();
    },
    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const handleUpdateUser = async (values) => {
    await updateUser(values);
  };

  return (
    <AdminLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="text-2xl font-bold text-bc-primary"
          title={"User"}
        />
        <div className="space-x-4">
          <BackLink href={`/admin/users`} />
        </div>
      </SectionHeader>

      <FormContainer>
        <FormProvider {...methods}>
          <div className="w-full md:w-[560px] space-y-8">
            <SingleFileUpload name="image" btnText="Change" withIcon={false} />

            <Form.Group>
              <Form.Input
                name="first_name"
                label="First name"
                disabled={!isEdit}
                validation={{
                  required: "This field is required",
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                name="last_name"
                label="Last name"
                disabled={!isEdit}
                validation={{
                  required: "This field is required",
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                name="suffix"
                label="Suffix (optional)"
                disabled={!isEdit}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                name="doctorate_degree"
                label="Doctorate degree (optional)"
                disabled={!isEdit}
              />
            </Form.Group>

            <div>
              {!isEdit ? (
                <Button
                  className="w-full py-3 text-sm font-medium text-gray-600 bg-gray-300 rounded-md"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="w-full py-3 btn-primary"
                    onClick={handleSubmit(handleUpdateUser)}
                  >
                    Save
                  </Button>
                  <Button
                    className="w-full py-3 mt-4 text-sm font-medium text-gray-600 bg-gray-200 rounded-md"
                    onClick={handleEdit}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </FormProvider>
      </FormContainer>
    </AdminLayout>
  );
};

export default UserDetailsPage;

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

  if (session && role !== Roles.ADMIN) {
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
