import { Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { Fragment } from "react";

const buttonStyle = (active: boolean) =>
  clsx("flex w-full items-center", "px-2 py-2", "group rounded-md text-sm", {
    "bg-violet-500": active,
    "text-white": active,
    "text-gray-900": !active,
  });

const Profile = () => {
  return (
    <Fragment>
      <Menu
        as="div"
        className={clsx(
          "relative",
          "text-left",
          "mr-2",
          "hidden md:inline-block"
        )}
      >
        {({ open }) => {
          return (
            <Fragment>
              <div>
                <Menu.Button
                  className={clsx(
                    "inline-flex w-full justify-center rounded-md",
                    "bg-black bg-opacity-20 hover:bg-opacity-30",
                    "px-4 py-2",
                    "text-sm font-medium text-white",
                    "focus:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  )}
                >
                  Profile
                  <ChevronRightIcon
                    className={clsx(
                      "ml-2 -mr-1 h-5 w-5",
                      "text-violet-200 hover:text-violet-100",
                      {
                        transition: true,
                        "rotate-90": open,
                      }
                    )}
                    aria-hidden="true"
                  />
                  <Transition
                    show={open}
                    unmount={false}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                  ></Transition>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={clsx(
                    "absolute right-0 mt-2 w-56",
                    "origin-top-right",
                    "divide-y divide-gray-100",
                    "rounded-md bg-white shadow-lg",
                    "ring-1 ring-black ring-opacity-5 focus:outline-none"
                  )}
                >
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button className={buttonStyle(active)}>Edit</button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={buttonStyle(active)}>
                          Duplicate
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button className={buttonStyle(active)}>Archive</button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={buttonStyle(active)}>Move</button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button className={buttonStyle(active)}>Delete</button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Fragment>
          );
        }}
      </Menu>
    </Fragment>
  );
};

export default Profile;
