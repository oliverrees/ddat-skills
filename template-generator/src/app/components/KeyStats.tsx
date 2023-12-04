import { Role } from "../types/sfia";

interface KeyStatsProps {
  roleDetail: Role;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onStartDateChange: (startDate: string) => void;
  title: string;
  description: string;
  startDate: string;
}

export const KeyStats = ({
  roleDetail,
  onTitleChange,
  onDescriptionChange,
  onStartDateChange,
  title,
  description,
  startDate,
}: KeyStatsProps) => {
  return (
    <div className="mt-6 md:mt-6">
      <div className="flex flex-col md:flex-row w-full mb-6 gap-6">
        <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col flex-grow">
          <div className="text-sm font-medium text-gray-500">
            Role Title (Editable)
          </div>
          <h3
            className="text-2xl font-semibold leading-6 text-gray-900 mt-4 outline-transparent"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTitleChange(e.target.textContent || "")}
          >
            {title}
          </h3>
        </div>
        <div className="rounded-lg bg-white shadow p-4 py-6 flex flex-col">
          <div className="text-sm font-medium text-gray-500">
            Ideal Start Date
          </div>
          <div className="text-2xl font-semibold leading-6 text-gray-900 mt-4 outline-transparent">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border-0 p-0"
            />
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
          suppressContentEditableWarning
          onBlur={(e) => onDescriptionChange(e.target.textContent || "")}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
