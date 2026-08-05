/**
 * Brand-safe FAQ for About page + FAQPage JSON-LD.
 * Answer-first: the first sentence is the direct answer.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const aboutFaq: FaqItem[] = [
  {
    question: "What is Aurigen?",
    answer:
      "Aurigen is an engineering institution that forges builders of intelligent machines. We train AI engineers, robotics innovators, researchers, and founders through labs, mentors, and systems that ship.",
  },
  {
    question: "Is Aurigen an EdTech company?",
    answer:
      "No. Aurigen is an engineering institution, not an EdTech product company. We focus on labs, craft standards, and shipped hardware and software rather than content platforms or coaching franchises.",
  },
  {
    question: "Who is Aurigen for?",
    answer:
      "Aurigen is for students, parents, and schools who want serious training in AI, robotics, and systems engineering. Builders who want to design, debug, and ship intelligent machines belong here.",
  },
  {
    question: "Where did Aurigen start?",
    answer:
      "Aurigen began inside the Robotics & Automation Club at Thakur Shyamnarayan Engineering College. The lab culture of prototypes, competitions, and late-night debugging became the foundation of the institution.",
  },
  {
    question: "How does Aurigen train builders?",
    answer:
      "Aurigen trains builders through sequential formation: orient, build, review, and lead. Learners work with sensors, models, motors, and control under mentorship, and progress is measured by working systems.",
  },
  {
    question: "Who founded Aurigen?",
    answer:
      "Aurigen was co-founded by Shubham Sahu and Neel Bhogle. Early work was supported by Prof. Rita Vora, Assistant Professor in Electronics & Computer Engineering and faculty in charge of the Robotics & Automation Club at Thakur Shyamnarayan Engineering College.",
  },
];
