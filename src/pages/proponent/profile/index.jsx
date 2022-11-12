import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import UserLayout from "@/components/layouts/users/UserLayout";
import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";

const personalDefaultValues = {
  first_name: "John",
  last_name: "Doe",
  suffix: "",
  doctorate_degree: "PhD.",
};
const accountDefaultValues = {
  username: "johndoe",
  password: "helloworld",
};

const ProponentProfile = () => {
  const personalMethods = useForm({ defaultValues: personalDefaultValues });

  const accountMethods = useForm({ defaultValues: accountDefaultValues });

  return (
    <UserLayout>
      <SectionHeader title="Profile" className="mt-16" />

      <div className="divide-y divide-gray-200 divide">
        <div className="grid grid-cols-1 pb-20 mt-6 xl:grid-cols-2">
          <Heading
            as="h2"
            title="Personal Information"
            className="font-medium"
          />

          <div className="bg-white rounded-md shadow-sm ">
            <FormProvider {...personalMethods}>
              <div className="p-8 space-y-6">
                <Form.Group>
                  <Form.Input name="first_name" label="First name" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Input name="last_name" label="Last name" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    name="suffix"
                    label="Suffix (optional)"
                    disabled
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    name="doctorate_degree"
                    label="Doctorate degree (optional)"
                    disabled
                  />
                </Form.Group>
              </div>

              <div className="px-8 py-4 text-right bg-gray-100">
                <Button className="px-5 btn-primary">Edit</Button>
              </div>
            </FormProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 pt-20 xl:grid-cols-2">
          <div>
            <Heading
              as="h2"
              title="Account Information"
              className="font-medium"
            />
            <span className="text-sm text-gray-400">
              Don't share your account information to anyone
            </span>
          </div>
          <div className="bg-white rounded-md shadow-sm ">
            <FormProvider {...accountMethods}>
              <div className="p-8 space-y-6">
                <Form.Group>
                  <Form.Input name="username" label="Username" disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    type="password"
                    name="password"
                    label="Password"
                    disabled
                  />
                </Form.Group>
              </div>

              <div className="px-8 py-4 text-right bg-gray-100">
                <Button className="px-5 btn-primary">Edit</Button>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProponentProfile;
