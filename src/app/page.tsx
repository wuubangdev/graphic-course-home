import ListCourses from "@/components/courses/ListCourses";
import Feature from "@/components/feature/Feature";
import FeedBack from "@/components/feedback/FeedBack";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <ListCourses />
      <FeedBack />
    </>
  );
}
