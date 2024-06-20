import React from 'react'
import Link from 'next/link'
import { FaChartSimple, FaCommentSms, FaGear, FaTriangleExclamation } from 'react-icons/fa6'

export default function ShortcutItems() {
    return (
        <div className="flex gap-x-4">
            <Link
                href="/admin-dashboard/messages"
                className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg  transition-all hover:-translate-y-1 hover:scale-110 duration-300"
            >
                <FaCommentSms />
                Messages
            </Link>
            <Link
                href="/admin-dashboard/issues"
                className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg  transition-all hover:-translate-y-1 hover:scale-110 duration-300"
            >
                <FaTriangleExclamation />
                Issues
            </Link>
            <Link
                href="/admin-dashboard/graphs"
                className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg  transition-all hover:-translate-y-1 hover:scale-110 duration-300"
            >
                <FaChartSimple />
                View Charts
            </Link>
            <Link
                href="/admin-dashboard/settings"
                className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base  dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg transition-all hover:-translate-y-1 hover:scale-110 duration-300"
            >
                <FaGear />
                Settings
            </Link>
        </div>
    )
}
