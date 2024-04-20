"use client"

import { useContext } from "react"

import { PageTitle } from "@/components/ui/page-title"

export default function EventLogsPage() {
  return (
    <div className="p-4 md:p-6">
      <PageTitle
        title={"Event Logs"}
        subtitle={
          "Logs of each create, update, and delete action on users, companies, news items, and program entries"
        }
      />
      <div>Test</div>
    </div>
  )
}
