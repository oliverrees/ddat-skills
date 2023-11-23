import { Popover } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export function PopoverButton({ description }: { description: string }) {
  return (
    <Popover className="relative ">
      <Popover.Button>
        <div className="text-blue-500 w-5 h-5">
          <QuestionMarkCircleIcon />
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute w-96 border-blue-500 border-2 font-normal z-10 bg-white p-4 shadow-xl">
        {description}
      </Popover.Panel>
    </Popover>
  );
}
