import CompanyMarquee from "@/components/CompanyMarquee";
import FeaturedJobs from "@/components/FeaturedJobs";
import JobStatistics from "@/components/JobStatistics";
import Pricing from "@/components/Pricing";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <CompanyMarquee/>
      <JobStatistics/>
      <FeaturedJobs/>
      <WhyChooseUs/>
      <Pricing/>
    </div>
  );
}
