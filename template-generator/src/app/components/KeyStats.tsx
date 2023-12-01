import { Role } from "../types/sfia";

interface KeyStatsProps {
  roleDetail: Role;
  titleRef: React.RefObject<HTMLDivElement>;
  descriptionRef: React.RefObject<HTMLDivElement>;
  dateRef: React.RefObject<HTMLInputElement>;
}

export const KeyStats = ({
  roleDetail,
  titleRef,
  descriptionRef,
  dateRef,
}: KeyStatsProps) => {
  return (
    <div className="mt-16">
      <div className="flex w-full mb-6 gap-6">
        <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col flex-grow">
          <div className="text-sm font-medium text-gray-500">
            Role Title (Editable)
          </div>
          <h3
            className="text-2xl font-semibold leading-6 text-gray-900 mt-4 outline-transparent"
            contentEditable
            ref={titleRef}
          >
            {roleDetail.title}
          </h3>
        </div>
        <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col">
          <div className="text-sm font-medium text-gray-500">
            Ideal Start Date
          </div>
          <div className="text-2xl font-semibold leading-6 text-gray-900 mt-4 outline-transparent">
            <input type="date" ref={dateRef} className="border-0 p-0" />
          </div>
        </div>
        <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col">
          <div className="text-sm font-medium text-gray-500">
            SFIA Responsibility Level
          </div>
          <div className="text-2xl font-semibold leading-6 text-gray-900 mt-4 outline-transparent">
            {roleDetail.sfiaResponisbility}
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white py-5 shadow col-span-3 p-4">
        <div className="truncate text-sm font-medium text-gray-500">
          Role Description (Editable)
        </div>
        <div
          className="mt-4 text-base text-gray-900 whitespace-pre-line outline-transparent"
          contentEditable
          ref={descriptionRef}
        >
          {roleDetail.ddatDescription !=
          "No separate description for this level"
            ? roleDetail.ddatDescription
            : roleDetail.ddatParentDescription}
        </div>
      </div>
    </div>
  );
};
