import { useLayoutEffect, useRef, useState } from "react";
import { classNames } from "../lib/classNames";
import Link from "next/link";
import { PopoverButton } from "./Popover";

export default function SkillsTable({
  skill,
  selectedSeniority,
}: {
  skill: any;
  selectedSeniority: number;
}) {
  const title = skill.title;
  const description = skill.description;
  const url = `https://ddat-capability-framework.service.gov.uk/skills.html#${title
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const attributes = skill.levels[Object.keys(skill.levels)[selectedSeniority]];

  const [checked, setChecked] = useState(false);

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (selectedAttributes.length === attributes.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [attributes.length, selectedAttributes]);

  function toggleAll() {
    setSelectedAttributes(
      selectedAttributes.length === attributes.length ? [] : attributes
    );
  }

  if (attributes.length === 0) return null;
  return (
    <div className="mt-8 flow-root w-full">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="relative">
            <table className="min-w-full divide-y divide-gray-300  w-full">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6 hidden">
                    <input
                      type="checkbox"
                      className="absolute hidden left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className=" py-3.5 pr-3 text-left text-sm  text-gray-900 flex gap-2"
                  >
                    <Link
                      href={url}
                      target="_blank"
                      className="underline font-semibold"
                    >
                      {title}
                    </Link>
                    {description.length > 0 && (
                      <PopoverButton description={description} />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {attributes.map((attribute: any, index: number) => (
                  <tr key={index}>
                    <td className="relative px-7 sm:w-12 sm:px-6 hidden">
                      {selectedAttributes.includes(attribute) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute hidden left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        value={attribute}
                        checked={selectedAttributes.includes(attribute)}
                        onChange={(e) =>
                          setSelectedAttributes(
                            e.target.checked
                              ? [...selectedAttributes, attribute]
                              : selectedAttributes.filter(
                                  (p) => p !== attribute
                                )
                          )
                        }
                      />
                    </td>
                    <td
                      className={classNames(
                        "py-4 pr-3 text-sm text-gray-500 ",
                        selectedAttributes.includes(attribute)
                          ? "text-blue-600"
                          : "text-gray-900"
                      )}
                    >
                      {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
