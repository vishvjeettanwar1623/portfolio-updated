"use client";

import { GlassBlogCard } from "@/components/ui/glass-blog-card";
import { Trophy } from "lucide-react";

const achievements = [
  {
    title: "Google Data Analytics Certificate",
    excerpt:
      "Completed a comprehensive program in data analytics, covering data collection, cleaning, analysis, and visualization.",
    image:
      "/assets/achievements/data-analytics.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Certificate",
    tags: ["Google", "Data Analytics"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googleanalytics-dataanalytics-digitalmarketing-activity-7440993113424207872-Yvg_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg",
  },
  {
    title: "Forward Learner Badge",
    excerpt:
      "Completed the program offered by McKinsey and Company named Forward Learning Program. .",
    image:
      "/assets/achievements/forward.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Certificate",
    tags: ["McKinsey", "Forward"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_offline-sailing-for-a-while-for-the-past-activity-7408498174392229888-AD4J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", 
  },
  {
    title: "Live Project on Blockchain",
    excerpt:
      "Integrated my project QuestFi on the main net of the U2U network. .",
    image:
      "/assets/achievements/blockchain.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Project",
    tags: ["mainnnet", "U2U"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", 
  },
  {
    title: "Live Project on Blockchain",
    excerpt:
      "Integrated my project Data Roots on the main net of the U2U network. .",
    image:
      "/assets/achievements/blockchain2.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Project",
    tags: ["Mainnnet", "U2U"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_questfi-has-officially-integrated-on-u2u-activity-7383534299456811008-_sG6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", 
  },
  {
    title: "Champion Ranking",
    excerpt:
      "Secured Champion Ranking in the Google Facilitator Program. .",
    image:
      "/assets/achievements/google.png",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Recognition",
    tags: ["Google", "Facilitator"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_googlearcade-cloud-gamifiedlearning-activity-7338863061321023489-KBMa?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", 
  },
  {
    title: "ACPC AlgoHour 3.0",
    excerpt:
      "Secured AIR 30 in the ACPC AlgoHour 3.0, organized by AMITY University, in coding questions. ",
    image:
      "/assets/experience/algohour.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Recognition",
    tags: ["Award", "Coding"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_competitiveprogramming-coding-problemsolving-activity-7364514173751324672-9K6R?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", // Replace with your LinkedIn post URL
  },
  {
    title: "Hackathon Winner",
    excerpt:
      "One third place in the Delhi Regional Hackathon in Blockchain Competition. ",
    image:
      "/assets/achievements/hackathon.jpg",
    author: { name: "Vishvjeet", avatar: "https://github.com/shadcn.png" },
    date: "2025",
    readTime: "Award",
    tags: ["Hackathon", "Blockchain"],
    url: "https://www.linkedin.com/posts/vishvjeet-tanwar_hackathon-web3-educhain-activity-7308344042352746496-g1uL?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFIBkKIBG_IyfA1t4fcwDsPm1KaY9vKpWQg", 
  },
];

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 flex items-center gap-4">
          <Trophy className="w-8 h-8 md:w-12 md:h-12 text-primary" />
          Achievements
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Milestones and recognitions from my journey in the digital space.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="flex justify-center">
              <GlassBlogCard
                title={item.title}
                excerpt={item.excerpt}
                image={item.image}
                author={item.author}
                date={item.date}
                readTime={item.readTime}
                tags={item.tags}
                url={item.url}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
