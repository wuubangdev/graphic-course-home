import ListCourses from "@/components/courses/ListCourses";
import Hero from "@/components/hero/Hero";
import Organization from "@/components/organization/Organization";
export default function Home() {
  return (
    <>
      <Hero />
      <Organization />
      <ListCourses />
    </>
  );
}
