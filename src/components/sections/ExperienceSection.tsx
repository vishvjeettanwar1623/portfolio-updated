"use client";

import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

import { SectionWrapper } from "@/components/sections/SectionWrapper";

export function ExperienceSection() {
  const data = [
    
    {
      title: "2026",
      content: (
        <div>
          <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8 space-y-2">
            <p> • Got Certified from Google in Data Analytics </p>
            <p> • Qualified Google Big Code Qualifiers Round </p>
            <p> • Scored 9.35 SGPA in my 3rd Semester </p>
            <p> • Won $100 prize at Monad Blitz V3 </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/experience/google-data-analytics.jpg"
              alt="Google Data Analytics Certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/big-code.png"
              alt="Big-code-qualifiers"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/3rd-sem.png"
              alt="3rd-sem-result"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/achievements/monad.jpg"
              alt="more-to-come-image"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8 space-y-2">
            <p> • Completed the Forward Learning program from Mckinsey & Company </p>
            <p> • Completed Google Arcade with Champion Badge </p>
            <p> • Secured AIR 30 ACPC AlgoHour 3.0 </p>
            <p> • Secured 3rd Position in EduChain Delhi Regional Hackathon </p>
            <p> • Completed Internship in 3d Modelling with GauravGo Games </p>
            <p> • Completed 3 Virtual Job Simulations from Deloitte </p>
            <p> • Mentored in 2 Co-learning camps at HackQuest </p>
            <p> • Scored 9.45 SGPA in my 2nd Semester </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/experience/forward.jpg"
              alt="forward-certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/google-arcade.png"
              alt="google-arcade"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/algohour.jpg"
              alt="acpc-algohour"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/internship.jpg"
              alt="internship"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Late 2024",
      content: (
        <div>
          <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8 space-y-2">
            <p> • Started B.Tech journey at JSS University Noida </p>
            <p> • Scored 9.29 SGPA in my 1st Semester </p>
            <p> • Started learning about Blockchains </p>
            <p> • Joined HackQuest as a Advocate </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/experience/2nd-sem.png"
              alt="2nd-sem-result"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/hackquest.png"
              alt="hackquest-advocate"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/college.jpg"
              alt="college-id"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
            <Image
              src="/assets/experience/blockchain.png"
              alt="blockchain-certificate"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white dark:bg-neutral-900 h-20 md:h-44 lg:h-60 w-full border-2 border-neutral-200 dark:border-white/40 transition-transform duration-300 hover:scale-150 hover:z-50 relative z-10 cursor-pointer"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper id="experience" animate={false}>
        <Timeline data={data} />
    </SectionWrapper>
  );
}

