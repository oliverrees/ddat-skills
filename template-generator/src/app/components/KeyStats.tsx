import { Role } from "../types/sfia"

interface KeyStatsProps {
  roleDetail: Role | null; 
}

export const KeyStats = ({roleDetail}: KeyStatsProps) => {
  if (!roleDetail) return null

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold leading-6 text-gray-900">{roleDetail.title}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
          </div>

      </dl>
    </div>
  )
}