import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Mauricio",
    position: "Role",
    profileImg: "/images/member.png",
  },
  {
    name: "Mherlie",
    position: "Role",
    profileImg: "/images/member.png",
  },
  {
    name: "Gillie",
    position: "Role",
    profileImg: "/images/member.png",
  },
  {
    name: "Dhominick",
    position: "Role",
    profileImg: "/images/member.png",
  },
  {
    name: "Michael",
    position: "Role",
    profileImg: "/images/member.png",
  },
  {
    name: "Mariane",
    position: "Role",
    profileImg: "/images/member.png",
  },
];

const TeamSection = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "3rem 1rem", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "2rem" }}>Meet the Team</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          justifyItems: "center",
        }}
      >
        {teamMembers.map((member, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <Image
              src={member.profileImg}
              alt={member.name}
              width={150}
              height={150}
              style={{
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            />
            <p style={{ fontWeight: "bold" }}>{member.name}</p>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
