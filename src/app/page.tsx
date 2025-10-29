import ListCourses from "@/components/courses/ListCourses";
import FeedBack from "@/components/feedback/FeedBack";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ListCourses />
      <FeedBack />
      <Footer />
    </>
  );
}
