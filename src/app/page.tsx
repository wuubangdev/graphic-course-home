import ListCourses from "@/components/courses/ListCourses";
import FeedBack from "@/components/feedback/FeedBack";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ListCourses />
      <FeedBack />
    </>
  );
}
