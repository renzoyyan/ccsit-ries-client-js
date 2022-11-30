import { Popover, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useContext, useEffect } from "react";
import TimeAgo from "react-timeago";
import { useRouter } from "next/router";

import Button from "@/components/elements/Button";
import { classNames, notificationActionMsg } from "@/utils/utils";
import Avatar from "@/assets/images/avatar.svg";
import NotificationBell from "@/assets/images/notification-bell.svg";
import { SocketContext } from "@/context/SocketContext";
import useNotification from "@/hooks/useNotification";

const UserNotification = () => {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { getUserNotifications, updateNotification } = useNotification();

  const { data } = useQuery({
    queryKey: ["user-notification"],
    queryFn: getUserNotifications,
    // refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!socket) return;

    const unsub = socket.on("receive-notification", () => {
      console.log("new notification");
      queryClient.invalidateQueries(["user-notification"]);
    });

    return () => unsub;
  }, [socket, queryClient]);

  const unreadNotifications = data?.filter((v) => v.isRead === false)?.length;

  const { mutateAsync: updateNotificationRead } = useMutation({
    mutationFn: (notification_id) => updateNotification(notification_id),

    onSuccess: () => {
      queryClient.invalidateQueries(["user-notification"]);
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bc-primary focus:ring-offset-2">
            <span className="sr-only">View notifications</span>
            <div className="relative">
              {!open && unreadNotifications !== 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -right-1 -top-1.5">
                  {unreadNotifications}
                </span>
              )}
              <BellIcon className="w-6 h-6" aria-hidden="true" />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 translate-x-[60px] z-10 max-w-sm px-4 mt-3 sm:transform  sm:translate-x-[5%] 2xl:translate-x-[18%] w-screen sm:px-0 lg:max-w-lg h-[516px] overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded">
              <div
                className={classNames(
                  "relative grid gap-8 py-4 sm:p-7 grid-rows-[auto_1fr]",
                  data?.length === 0 && "h-full"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 gap-x-4">
                    <h4 className="text-2xl font-bold text-gray-700">
                      Notifications
                    </h4>
                    <span
                      className={classNames(
                        "w-6 h-6 text-xs font-medium text-white bg-red-500 rounded-full place-content-center",
                        unreadNotifications === 0 ? "hidden" : "grid"
                      )}
                    >
                      {unreadNotifications}
                    </span>
                  </div>
                  <Button className="text-sm text-bc-tertiary hover:underline">
                    Mark all as read
                  </Button>
                </div>

                {data?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-sm text-center">
                    <div className="p-8 bg-blue-100 rounded-full">
                      <Image
                        src={NotificationBell}
                        alt={"you have notifications yet"}
                        width={100}
                        height={100}
                        className="rounded-full -rotate-12"
                        objectFit="cover"
                      />
                    </div>

                    <div className="mt-4">
                      <h2 className="text-base font-bold text-gray-700">
                        No notifications yet
                      </h2>
                      <p className="text-gray-400 ">
                        When you get notifications, they&apos;ll show up here
                      </p>
                    </div>
                  </div>
                ) : (
                  data?.map((item, idx) => (
                    <Button
                      key={item._id}
                      className={classNames(
                        "flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      )}
                      onClick={async () => {
                        let path = item?.research_id
                          ? `/proponent/research-innovation/${item?.research_id?._id}`
                          : `/proponent/extension-services/${item?.extension_id?._id}`;

                        router.push(path);

                        await updateNotificationRead(item._id);
                      }}
                    >
                      <div
                        className={classNames(
                          "flex items-center justify-center text-white bg-gray-400 rounded-full shrink-0 sm:h-12 sm:w-12"
                        )}
                      >
                        {/* <item.icon aria-hidden="true" className="w-6 h-6" /> */}
                        <Image
                          src={item?.sender?.image?.url ?? Avatar}
                          alt={
                            `${item?.sender?.first_name} ${item?.sender?.last_name}` ??
                            "sender"
                          }
                          width={50}
                          height={50}
                          className="rounded-full"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex items-center justify-between flex-1 ml-4 gap-x-3">
                        <div className="text-left">
                          <p
                            className={classNames(
                              "text-sm",
                              item.isRead ? "text-gray-600" : "text-gray-800"
                            )}
                          >
                            <span className="font-semibold capitalize">{`${item.sender.first_name} ${item.sender.last_name}`}</span>{" "}
                            {item?.action_type === 101
                              ? "added you in"
                              : notificationActionMsg(item?.action_type)}{" "}
                            <span className="font-semibold capitalize">
                              {item?.research_id?.research_title ||
                                item?.extension_id?.extension_title}
                            </span>
                          </p>

                          <TimeAgo
                            date={item.created_at}
                            className="text-sm text-gray-400"
                          />
                        </div>

                        {item.isRead ? null : (
                          <span className="flex-shrink-0 block w-3 h-3 rounded-full bg-bc-primary" />
                        )}
                      </div>
                    </Button>
                    // <p key={item._id}>{JSON.stringify(item, null, 4)}</p>
                  ))
                )}

                {/* {} */}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

export default UserNotification;
