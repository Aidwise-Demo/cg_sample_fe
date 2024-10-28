/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from 'next/image'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { ChatbotProps, MilestoneOutcomeData } from '@/types'
import axios from 'axios'
import { BASE_URL } from '@/lib/constants'
import { Milestone } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'

const Chatbot: FC<ChatbotProps> = ({ value, setValue, fetchNewMilestonesData, newMilestoneOutcomeData, setNewMilestoneOutcomeData, setIsSubmitted, setIsChatbotOpen }) => {
    const [searchResults, setSearchResults] = useState<string[]>()
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    useEffect(() => {
        if (isCompleted) {
            setTimeout(() => {
                setIsCompleted(false)
            }, 500)
        }
    }, [isCompleted])
    const fetchSearchData = useCallback(async () => {
        if (value.length === 0) {
            setSearchResults([])
            return
        }
        try {
            const { data } = await axios.get(`${BASE_URL}/search?q=${value}`)
            setSearchResults(data)
        } catch (error) {
            console.log("Error while searching", error)
        }
    }, [value])

    const handleNewMilestoneOutcomeAdd = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newOutcome = newMilestoneOutcomeData.filter((item) => item.isAccepted)
        const newData = newOutcome.map((item) => {
            if (item.milestones.every((milestone) => milestone.isAccepted)) {
                return item
            } else {
                let newMilestones = item.milestones.filter((milestone) => milestone.isAccepted)
                return ({
                    ...item,
                    milestones: newMilestones
                })
            }
        })
        setNewMilestoneOutcomeData(newData)
        setIsSubmitted(true)
        setSearchResults([])
        setIsCompleted(true)
    }, [newMilestoneOutcomeData, setIsSubmitted, setNewMilestoneOutcomeData])

    useEffect(() => {
        fetchSearchData()
    }, [fetchSearchData])


    return (
        <div className="bg-[#1F2C56] absolute h-[320px] overflow-y-auto top-[16rem] -right-4 w-[391px] rounded-md p-3 py-2">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center'>
                    <span className="text-[#FFFFFF] font-medium">AI Assist</span>
                    <Image src={"/assets/stars.svg"} width={58} height={58} alt="Stars" />
                </div>
                <div className='text-white cursor-pointer px-2 text-xl' onClick={() => { setIsChatbotOpen(false) }}>x</div>
            </div>
            <Image
                className="m-auto"
                src={"/assets/line.svg"}
                width={258}
                height={2}
                alt="lines"
            />
            <div className="flex flex-col pt-5 min-h-[250px] overflow-y-auto justify-between">
                <div className="bg-[#1F2C56] p-3 rounded-md gap-3">
                    <div className="text-white">👋 Hello, I can help you add new outcomes and milestones to your charter. Just type your project name below!</div>
                </div>
                <div className='space-y-2 my-3'>
                    {!!searchResults?.length && searchResults.map((result, idx) => (
                        <div onClick={() => { fetchNewMilestonesData(result) }} className="bg-[#1F2C56] text-white p-3 w-fit text-sm cursor-pointer rounded-md gap-3" key={idx}>
                            {result}
                        </div>
                    ))}
                </div>
                <div className='space-y-2 my-3'>
                    {!!newMilestoneOutcomeData?.length && (
                        <div className="bg-[#1F2C56] p-3 mb-4 rounded-md gap-3">
                            <div className="text-white text-sm">I found the following outcomes with their respective milestones. Select those you want to add.</div>
                        </div>
                    )}
                    <form onSubmit={handleNewMilestoneOutcomeAdd}>
                        {!!newMilestoneOutcomeData?.length && newMilestoneOutcomeData.map((item, idx) => (
                            <div key={idx} className='flex flex-col space-y-2'>
                                <div className='flex items-center space-x-2 py-1'>
                                    <Checkbox className='bg-white' onCheckedChange={(checked) => {
                                        item.isAccepted = Boolean(checked)
                                        item.milestones.forEach((milestone) => {
                                            milestone.isAccepted = true
                                        })
                                    }} />
                                    <div className="bg-[#1F2C56] text-white p-2 w-fit text-sm rounded-md gap-3">
                                        {item.outcome_name}
                                    </div>
                                </div>
                                {item.milestones.map((milestone, index) => (
                                    <div key={index} className='flex items-center space-x-2 py-1 px-3'>
                                        <Checkbox className='bg-white' onCheckedChange={(checked) => {
                                            milestone.isAccepted = Boolean(checked)
                                            item.milestones.forEach((milestone) => {
                                                if (milestone.isAccepted) {
                                                    item.isAccepted = true
                                                }
                                            })
                                        }} />
                                        <div className="bg-[#1F2C56] text-white p-2 w-fit text-sm rounded-md gap-3">
                                            {milestone.milestone_name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        {!!newMilestoneOutcomeData?.length && (
                            <div className='flex justify-end p-3'>
                                <Button variant={'secondary'} type='submit'>Submit</Button>
                            </div>
                        )}
                    </form>
                </div>
                <div className='flex relative items-center'>
                    <div className='flex w-full flex-col'>
                        {isCompleted ? (
                            <Input
                                value={''}
                                placeholder='Enter Project Name'
                                className="font-normal rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none focus:outline-none focus:border-none focus:ring-offset-0 focus:ring-0"
                            />

                        ) : <Input
                            onChange={(e) => setValue(e.target.value)}
                            placeholder='Enter Project Name'
                            className="font-normal rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none focus:outline-none focus:border-none focus:ring-offset-0 focus:ring-0"
                        />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chatbot