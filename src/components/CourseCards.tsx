"use client";

import { Clock, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CourseItem {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  desc: string;
  milestones: string;
}

export default function CourseCards() {
  const courses: CourseItem[] = [
    {
      title: "Computer Vision Foundations",
      level: "Intermediate",
      duration: "6 Weeks",
      desc: "Train custom YOLOv8 models. Program real-time edge intelligence to recognize gestures, classify objects, and trigger actuators.",
      milestones: "4 Builds completed",
    },
    {
      title: "Embedded System Controls",
      level: "Beginner",
      duration: "8 Weeks",
      desc: "Understand microprocessors, GPIO register mapping, and basic sensor integration using micro-Python in our cloud IDE environment.",
      milestones: "6 Builds completed",
    },
    {
      title: "Spatial Autonomous Robotics",
      level: "Advanced",
      duration: "12 Weeks",
      desc: "Develop coordinate pathfinders, motor kinematics, and sonar boundary detection. Build rovers that navigate grids dynamically.",
      milestones: "3 Builds completed",
    },
    {
      title: "Distributed IoT Architectures",
      level: "Advanced",
      duration: "10 Weeks",
      desc: "Connect multiple microcontrollers via WebSocket. Stream live telemetry dashboards, manage datastores, and trigger remote relays.",
      milestones: "5 Builds completed",
    },
  ];

  return (
    <section className="py-24 border-t border-border" id="courses">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl text-left">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
              Curriculum Tracks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Featured Build Packages
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Choose a focused path. Every package is shipped with a dedicated physical hardware kit and matched digital curriculum nodes.
            </p>
          </div>
          <a href="#contact">
            <Button variant="outline" className="h-11 px-6 rounded-md font-heading text-sm font-semibold border-border hover:bg-white/5 cursor-pointer">
              View All Tracks
            </Button>
          </a>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(255,214,0,0.02)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[11px] font-bold font-heading px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                    course.level === "Beginner"
                      ? "bg-emerald-500/8 border border-emerald-500/20 text-emerald-400"
                      : course.level === "Intermediate"
                      ? "bg-sky-500/8 border border-sky-500/20 text-sky-400"
                      : "bg-primary/8 border border-primary/20 text-primary"
                  }`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.duration}</span>
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 text-foreground text-left">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-left">
                  {course.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-5 mt-4">
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span>{course.milestones}</span>
                </span>
                <a href="#contact">
                  <Button size="sm" className="h-9 px-4 rounded bg-zinc-950 border border-border text-foreground hover:bg-white/5 text-xs font-semibold cursor-pointer">
                    Get Kit Details
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
