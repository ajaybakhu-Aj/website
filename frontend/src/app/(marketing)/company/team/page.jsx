import React, { useEffect } from "react";
import TeamSection from "../../../../components/company/TeamSection";

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen pt-12">
      <TeamSection />
    </div>
  );
}
