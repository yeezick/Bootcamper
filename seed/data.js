import bcrypt from "bcrypt";
import db from "../db/connection.js";
import Project from "../models/project.js";
import User from "../models/user.js";

const insertData = async () => {
  //reset database

  await db.dropDatabase();

  const user1 = new User({
    about:
      "American whole magazine truth stop whose. On traditional measure example sense peace. Would mouth relate own chair. Role together range line. Government first policy daughter.",
    email: "firstUser@mail.com",
    first_name: "Wiggle",
    interested_projects: [],
    last_name: "Jones",
    member_of_projects: [],
    password_digest: await bcrypt.hash("gumballs", 11),
    portfolio: "www.wigglejones.com",
    rejected_projects: [],
    role: "Engineer",
  });
  await user1.save();

  const user2 = new User({
    about: "Designer for LA",
    email: "laguy@mail.com",
    first_name: "Mike",
    interested_projects: [],
    last_name: "Hunt",
    member_of_projects: [],
    password_digest: await bcrypt.hash("pizza12", 11),
    portfolio: "www.ladesigner.com",
    rejected_projects: [],
    role: "Designer",
  });
  await user2.save();

  const user3 = new User({
    about: "I code for fun",
    email: "barbra@mail.com",
    first_name: "Barbra",
    last_name: "Woo",
    interested_projects: [],
    member_of_projects: [],
    password_digest: await bcrypt.hash("gumballs", 11),
    portfolio: "www.bras.com",
    rejected_projects: [],
    role: "Engineer",
  });
  await user3.save();

  const user4 = new User({
    about: "I like all the colors!",
    email: "wondergirl@mail.com",
    first_name: "Stephanie",
    interested_projects: [],
    last_name: "Carter",
    member_of_projects: [],
    password_digest: await bcrypt.hash("gumballs", 11),
    portfolio: "www.colorsofrainbows.com",
    rejected_projects: [],
    role: "Designer",
  });
  await user4.save();

  const projects = [
    {
      description: "building gaming app",
      interested_applicants: [user3, user4],
      seeking: true,
      team_members: [user1, user2],
      title: "GameBot",
      owner: user1,
    },
    {
      description: "Painting app",
      interested_applicants: [user2, user4],
      seeking: true,
      team_members: [user1, user3],
      title: "PaintBot",
      owner: user2,
    },
    {
      description: "gardening app",
      interested_applicants: [user4],
      seeking: false,
      team_members: [user3, user1],
      title: "GardenBot",
      owner: user3,
    },
    {
      description: "babysitter app",
      interested_applicants: [user2],
      seeking: true,
      team_members: [user1, user2, user3, user4],
      title: "BabysitterBot",
      owner: user4,
    },
    {
      description: "finance app",
      interested_applicants: [user2],
      seeking: true,
      team_member: [user1, user4],
      title: "MyMoney.io",
      owner: user4,
    },
  ];
  await Project.insertMany(projects);
  console.log("Created users & projects!");

  db.close();
};

insertData();
