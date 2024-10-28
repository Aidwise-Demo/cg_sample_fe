"use client"
import Charter from '@/components/charter'
import Chatbot from '@/components/chatbot'
import RightProjectCharterBar from '@/components/right-project-charter-bar'
import { BASE_URL } from '@/lib/constants'
import { MilestoneOutcomeData, TransformedMilestoneOutcomeData } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const ProjectCharterPage = () => {
  const params = useParams()
  const [debouncedValue, setValue] = useDebounceValue('', 500)
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false)
  const [newMilestoneOutcomeData, setNewMilestoneOutcomeData] = useState<MilestoneOutcomeData[]>()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const fetchNewMilestonesData = useCallback(async (res: string) => {
    const { data } = await axios.post(`${BASE_URL}/Outcome_milestone_generation_Project_name`, {
      "get_project_details": res
    })
    setNewMilestoneOutcomeData(data)
  }, [])
  return (
    <div className='flex relative py-12 max-w-[85rem] m-auto'>
      <Charter id={params.id as string} setIsChatbotOpen={setIsChatbotOpen} isChatbotOpen={isChatbotOpen} newMilestoneOutcomeData={newMilestoneOutcomeData || []} isSubmitted={isSubmitted} setNewMilestoneOutcomeData={setNewMilestoneOutcomeData} setIsSubmitted={setIsSubmitted} />
      <RightProjectCharterBar />
      {isChatbotOpen && <Chatbot value={debouncedValue} setValue={setValue} fetchNewMilestonesData={fetchNewMilestonesData} newMilestoneOutcomeData={newMilestoneOutcomeData || []} setNewMilestoneOutcomeData={setNewMilestoneOutcomeData} setIsSubmitted={setIsSubmitted} setIsChatbotOpen={setIsChatbotOpen} />}
    </div>
  )
}

export default ProjectCharterPage
