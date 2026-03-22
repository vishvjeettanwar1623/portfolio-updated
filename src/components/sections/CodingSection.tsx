"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  GitFork,
  Star,
  ExternalLink,
  Users,
  BookOpen,
  GitCommit,
  GitPullRequest,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref_type?: string;
  };
}

interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GITHUB_USERNAME = "vishvjeettanwar1623";
const LEETCODE_USERNAME = "vishvjeet1623";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Rust: "#dea584",
};

// ─── Animated Donut Chart (SVG) ─────────────────────────────────────────────

function LeetCodeDonut({
  easy,
  medium,
  hard,
  total,
}: {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}) {
  const size = 180;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const totalProblems = easy + medium + hard || 1;
  const easyPct = easy / totalProblems;
  const mediumPct = medium / totalProblems;
  const hardPct = hard / totalProblems;

  const easyLen = easyPct * circumference;
  const mediumLen = mediumPct * circumference;
  const hardLen = hardPct * circumference;

  const easyOffset = 0;
  const mediumOffset = -(easyLen);
  const hardOffset = -(easyLen + mediumLen);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
        }}
        animate={isInView ? { scale: [0.8, 1.1, 1], opacity: [0, 0.5, 0.3] } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Easy (green) — animated spin-in */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}`, strokeDashoffset: 0 }}
          animate={
            isInView
              ? { strokeDasharray: `${easyLen} ${circumference - easyLen}`, strokeDashoffset: easyOffset }
              : {}
          }
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.4))" }}
        />
        {/* Medium (amber) — animated spin-in */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}`, strokeDashoffset: mediumOffset }}
          animate={
            isInView
              ? { strokeDasharray: `${mediumLen} ${circumference - mediumLen}`, strokeDashoffset: mediumOffset }
              : {}
          }
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.4))" }}
        />
        {/* Hard (red) — animated spin-in */}
        {hard > 0 && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}`, strokeDashoffset: hardOffset }}
            animate={
              isInView
                ? { strokeDasharray: `${hardLen} ${circumference - hardLen}`, strokeDashoffset: hardOffset }
                : {}
            }
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.4))" }}
          />
        )}
      </svg>
      {/* Center text — count up */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {total}
        </motion.span>
        <motion.span
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Solved
        </motion.span>
      </div>
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (end === 0) { setCount(0); return; }
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 30);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-4 rounded-xl bg-card/40 border border-border/30 cursor-default group/stat"
      whileHover={{
        scale: 1.08,
        borderColor: "rgba(var(--primary-rgb, 139,92,246), 0.5)",
        boxShadow: "0 0 20px rgba(139,92,246,0.15), inset 0 0 20px rgba(139,92,246,0.05)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.p
        className="text-2xl font-bold text-foreground"
        key={count}
      >
        {count}
      </motion.p>
      <p className="text-xs text-muted-foreground mt-1 group-hover/stat:text-foreground transition-colors">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Event formatter ─────────────────────────────────────────────────────────

function formatEvent(event: GitHubEvent) {
  const repoName = event.repo.name.split("/")[1] || event.repo.name;
  const time = new Date(event.created_at);
  const ago = getTimeAgo(time);

  switch (event.type) {
    case "PushEvent": {
      const msg =
        event.payload.commits?.[0]?.message?.slice(0, 50) || "code changes";
      return { icon: GitCommit, text: `Pushed to ${repoName}`, detail: msg, ago };
    }
    case "CreateEvent":
      return {
        icon: Code2,
        text: `Created ${event.payload.ref_type || "repo"} in ${repoName}`,
        detail: "",
        ago,
      };
    case "PullRequestEvent":
      return {
        icon: GitPullRequest,
        text: `${event.payload.action || "Opened"} PR in ${repoName}`,
        detail: "",
        ago,
      };
    case "WatchEvent":
      return { icon: Star, text: `Starred ${repoName}`, detail: "", ago };
    case "ForkEvent":
      return { icon: GitFork, text: `Forked ${repoName}`, detail: "", ago };
    default:
      return {
        icon: Code2,
        text: `${event.type.replace("Event", "")} on ${repoName}`,
        detail: "",
        ago,
      };
  }
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// ─── Repo Card with blur/focus on hover ──────────────────────────────────────

function RepoCard({ repo, isHovered, isAnyHovered }: { repo: GitHubRepo; isHovered: boolean; isAnyHovered: boolean }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-border/50 bg-card/20 backdrop-blur-sm p-4 block"
      animate={{
        scale: isHovered ? 1.03 : 1,
        filter: isAnyHovered && !isHovered ? "blur(2px) brightness(0.5)" : "blur(0px) brightness(1)",
        borderColor: isHovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)",
        backgroundColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformOrigin: "center" }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {repo.name}
        </h4>
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
          transition={{ duration: 0.2 }}
        >
          <ExternalLink className="w-3.5 h-3.5 text-primary flex-shrink-0 ml-2" />
        </motion.div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">
        {repo.description || "No description"}
      </p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: LANG_COLORS[repo.language] || "#8b8b8b",
              }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </span>
      </div>
    </motion.a>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function CodingSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [leetcode, setLeetcode] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredRepoId, setHoveredRepoId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [profileRes, reposRes, eventsRes, lcRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=5`
          ),
          fetch(
            `/data/leetcode.json`
          ),
        ]);

        if (profileRes.status === "fulfilled" && profileRes.value.ok)
          setProfile(await profileRes.value.json());
        if (reposRes.status === "fulfilled" && reposRes.value.ok)
          setRepos(await reposRes.value.json());
        if (eventsRes.status === "fulfilled" && eventsRes.value.ok)
          setEvents(await eventsRes.value.json());
        if (lcRes.status === "fulfilled" && lcRes.value.ok)
          setLeetcode(await lcRes.value.json());
      } catch (e) {
        console.error("Failed to fetch coding stats:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const filteredRepos = repos.filter((r) => !r.fork).slice(0, 6);

  return (
    <section id="coding" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 flex items-center gap-4">
            <motion.span
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              <Code2 className="w-8 h-8 md:w-12 md:h-12 text-primary" />
            </motion.span>
            Code & Compete
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Live stats from my GitHub and LeetCode profiles.
          </p>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              className="flex items-center justify-center py-20"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* ─── LEFT: GitHub (2 cols) ──────────────────────────── */}
              <div className="lg:col-span-2 space-y-8">
                {/* Profile Card + Contribution Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-6 space-y-6"
                >
                  {/* Profile Row */}
                  {profile && (
                    <div className="flex items-center gap-5">
                      <motion.img
                        src={profile.avatar_url}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full border-2 border-border/50"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="flex-1 min-w-0">
                        <a
                          href={profile.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        >
                          {profile.name}
                          <ExternalLink className="w-4 h-4 opacity-50" />
                        </a>
                        <p className="text-sm text-muted-foreground truncate">
                          {profile.bio}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {profile.public_repos} repos
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {profile.followers} followers
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {profile.following} following
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contribution Chart with hover effects */}
                  <div className="overflow-x-auto group/chart">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                      Contribution Activity
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                      alt="GitHub Contribution Chart"
                      className="w-full max-w-full rounded-lg opacity-90 invert"
                    />
                  </div>
                </motion.div>

                {/* Repos Grid — blur/focus effect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                    Recent Repositories
                  </p>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onMouseLeave={() => setHoveredRepoId(null)}
                  >
                    {filteredRepos.map((repo, i) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * i }}
                        onMouseEnter={() => setHoveredRepoId(repo.id)}
                      >
                        <RepoCard
                          repo={repo}
                          isHovered={hoveredRepoId === repo.id}
                          isAnyHovered={hoveredRepoId !== null}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>

              {/* ─── RIGHT: LeetCode ──────────────────────────────── */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        LeetCode
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        @{LEETCODE_USERNAME}
                      </p>
                    </div>
                    <motion.a
                      href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {leetcode ? (
                    <div className="space-y-6">
                      {/* Animated Donut Chart */}
                      <div className="flex justify-center">
                        <LeetCodeDonut
                          easy={leetcode.easySolved}
                          medium={leetcode.mediumSolved}
                          hard={leetcode.hardSolved}
                          total={leetcode.solvedProblem}
                        />
                      </div>

                      {/* Breakdown — staggered entry */}
                      <div className="space-y-3">
                        {[
                          { label: "Easy", color: "#22c55e", value: leetcode.easySolved },
                          { label: "Medium", color: "#f59e0b", value: leetcode.mediumSolved },
                          { label: "Hard", color: "#ef4444", value: leetcode.hardSolved },
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="flex items-center justify-between p-3 rounded-xl border cursor-default"
                            style={{
                              backgroundColor: `${item.color}10`,
                              borderColor: `${item.color}33`,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <motion.span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: i * 0.5 }}
                              />
                              <span className="text-sm font-medium text-foreground">
                                {item.label}
                              </span>
                            </div>
                            <span className="text-sm font-bold" style={{ color: item.color }}>
                              {item.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Unable to load LeetCode stats
                    </p>
                  )}
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
