import * as Table from "@/components/elements/table";
import Image from "next/image";
import Avatar from "@/assets/images/avatar.png";
import {
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/elements/Button";
import Link from "next/link";
import useConfirm from "@/hooks/useConfirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUsers from "@/hooks/useUsers";
import { toast } from "react-hot-toast";
import { useRef } from "react";

const UsersContent = ({
  _id,
  first_name,
  last_name,
  username,
  email,
  image,
  role,
  status,
  email_verified,
}) => {
  const userName = `${first_name} ${last_name}`;
  const queryClient = useQueryClient();
  const { sendEmailVerificationLink } = useUsers();
  const { isConfirmed } = useConfirm();
  const confirmRef = useRef(null);

  const { mutateAsync: sendEmail } = useMutation({
    mutationFn: (email) => sendEmailVerificationLink(email),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Email verification link has been sent!", {
        id: confirmRef.current,
      });
    },
    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, { id: confirmRef.current });
    },
  });

  const handleApproval = async () => {
    const confirm = await isConfirmed(
      "Are you sure you want to approve this account? It will send email verification once approved.",
      "Account Approval"
    );

    if (confirm) {
      confirmRef.current = toast.loading("Sending email verification link", {
        duration: 6000,
      });
      await sendEmail(email);

      return;
    }
  };

  const handleSendEmailVerification = async () => {
    const confirm = await isConfirmed(
      `Are you sure you want to send email verification to this email ${email}?`,
      "Send Email Verification Link"
    );

    if (confirm) {
      confirmRef.current = toast.loading("Sending email verification link", {
        duration: 6000,
      });
      await sendEmail(email);
    }
  };

  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data whitespace-nowrap sm:pl-6">
        <div className="inline-flex items-center gap-2">
          <div className="flex-shrink-0">
            <Image
              src={!image?.url ? Avatar : image?.url}
              width={50}
              height={50}
              className="flex-shrink-0 rounded-full"
              alt={userName}
              objectFit="cover"
            />
          </div>
          <span>{userName}</span>
        </div>
      </td>
      <td className="normal-case tbl-data whitespace-nowrap">{username}</td>
      <td className="normal-case tbl-data whitespace-nowrap">{email}</td>
      <td className="tbl-data whitespace-nowrap">{role}</td>
      <td className="tbl-data whitespace-nowrap">{status}</td>
      <td className="tbl-data whitespace-nowrap">
        {email_verified ? "Verified" : "Unverified"}
      </td>
      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        <div className="inline-block space-x-2">
          {status === "pending" ? (
            <Button
              className="p-2 text-sm btn-success"
              onClick={() => handleApproval()}
            >
              Approve
            </Button>
          ) : null}
          {!email_verified && status === "approved" ? (
            <Button
              className="p-2 text-sm font-medium text-white border rounded-md bg-bc-tertiary border-bc-tertiary hover:bg-bc-tertiary/80"
              onClick={() => handleSendEmailVerification()}
            >
              Send email verification
            </Button>
          ) : null}
          {/* <Table.Link href={`/admin/users/${_id}`} title={userName} /> */}
          <Link href={`/admin/users/${_id}`}>
            <a className="inline-block p-2 font-medium text-gray-900 bg-gray-200 border border-gray-200 rounded-md hover:bg-gray-300">
              {/* <ArrowTopRightOnSquareIcon className="w-6 h-6 text-bc-primary hover:text-bc-tertiary" /> */}
              <span className="sr-only">,View {userName}</span>
              <span>View</span>
            </a>
          </Link>
        </div>
      </td>
      {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <Link href={`/users/${_id}`}>
          <a className="inline-block text-bc-primary hover:text-bc-tertiary">
            <ArrowTopRightOnSquareIcon className="w-6 h-6 text-bc-primary hover:text-bc-tertiary" />
            <span className="sr-only">,View {userName}</span>
          </a>
        </Link>
      </td> */}
    </Table.Row>
  );
};

export default UsersContent;
