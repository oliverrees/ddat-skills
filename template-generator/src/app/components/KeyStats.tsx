import { Role } from "../types/sfia";

interface KeyStatsProps {
  roleDetail: Role;
}

export const KeyStats = ({ roleDetail }: KeyStatsProps) => {
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
          >
            {roleDetail.title}
          </h3>
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
        >
          {roleDetail.ddatDescription}
        </div>
      </div>
    </div>
  );
};
