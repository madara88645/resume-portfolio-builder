import { ResumeSchema } from "@/lib/ai/schema";

describe("ResumeSchema", () => {
  const minimalValid = {
    experience: [],
    education: [],
    skills: [],
    projects: [],
    contact: {},
  };

  it("accepts a fully populated resume payload", () => {
    const input = {
      experience: [
        {
          company: "Acme Inc",
          title: "Engineer",
          startDate: "2020",
          endDate: "2023",
          responsibilities: ["Built things"],
          location: "Remote",
        },
      ],
      education: [
        {
          institution: "MIT",
          degree: "B.Sc. CS",
          startDate: "2016",
          endDate: "2020",
        },
      ],
      skills: ["TypeScript", "React"],
      projects: [
        {
          name: "Portfolio App",
          description: "An AI portfolio generator",
          link: "https://example.com",
          technologies: ["Next.js"],
        },
      ],
      contact: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "+1-555-0100",
        location: "New York",
        website: "https://janedoe.dev",
        social: [{ label: "LinkedIn", url: "https://linkedin.com/in/janedoe" }],
      },
    };

    const result = ResumeSchema.parse(input);
    expect(result.experience[0].company).toBe("Acme Inc");
    expect(result.contact.fullName).toBe("Jane Doe");
    expect(result.skills).toContain("TypeScript");
  });

  it("applies defaults for missing arrays and contact", () => {
    const result = ResumeSchema.parse({});
    expect(result.experience).toEqual([]);
    expect(result.education).toEqual([]);
    expect(result.skills).toEqual([]);
    expect(result.projects).toEqual([]);
    expect(result.contact).toEqual({ social: [] });
  });

  it("rejects experience entry with empty company string", () => {
    expect(() =>
      ResumeSchema.parse({
        ...minimalValid,
        experience: [{ company: "", title: "Dev", responsibilities: [] }],
      })
    ).toThrow();
  });

  it("rejects experience entry with empty title string", () => {
    expect(() =>
      ResumeSchema.parse({
        ...minimalValid,
        experience: [{ company: "Acme", title: "", responsibilities: [] }],
      })
    ).toThrow();
  });

  it("rejects an invalid email in contact", () => {
    expect(() =>
      ResumeSchema.parse({
        ...minimalValid,
        contact: { email: "not-an-email" },
      })
    ).toThrow();
  });

  it("rejects a non-URL website in contact", () => {
    expect(() =>
      ResumeSchema.parse({
        ...minimalValid,
        contact: { website: "not-a-url" },
      })
    ).toThrow();
  });

  it("rejects a project with an invalid link URL", () => {
    expect(() =>
      ResumeSchema.parse({
        ...minimalValid,
        projects: [{ name: "Test", description: "Desc", link: "bad-link" }],
      })
    ).toThrow();
  });

  it("defaults responsibilities to empty array when omitted", () => {
    const result = ResumeSchema.parse({
      ...minimalValid,
      experience: [{ company: "Corp", title: "Dev" }],
    });
    expect(result.experience[0].responsibilities).toEqual([]);
  });
});
