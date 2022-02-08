import bcrypt from "bcrypt";
import db from "../db/connection.js";
import Project from "../models/project.js";
import Tool from "../models/tool.js";
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
      interested_applicants: [user3, user4], // projects[0]
      seeking: true,
      team_members: [user1, user2],
      title: "GameBot",
      owner: user1,
    },
    {
      description: "Painting app",
      interested_applicants: [user4], //projects[1]
      seeking: true,
      team_members: [user1, user2, user3],
      title: "PaintBot",
      owner: user2,
    },
    {
      description: "gardening app",
      interested_applicants: [user4], //projects[2]
      seeking: false,
      team_members: [user3, user1],
      title: "GardenBot",
      owner: user3,
    },
    {
      description: "babysitter app",
      interested_applicants: [user2], //projects[3]
      seeking: true,
      team_members: [user3, user4],
      title: "BabysitterBot",
      owner: user4,
    },
    {
      description: "finance app",
      interested_applicants: [user2], //projects[4]
      seeking: true,
      team_member: [user1, user4],
      title: "MyMoney.io",
      owner: user4,
    },
  ];
  await Project.insertMany(projects);
  const allProjects = await Project.find();
  // const projArr = (await project1).forEach((project) =>
  //   console.log("Project:", project)
  // );

  // console.log("first", project1[0]);
  // adding allProjects to each user's member_of_projects array:
  user1.member_of_projects.push(
    allProjects[0],
    allProjects[1],
    allProjects[2],
    allProjects[4]
  );
  user2.member_of_projects.push(allProjects[0], allProjects[1]);
  user3.member_of_projects.push(allProjects[1], allProjects[2], allProjects[3]);
  user4.member_of_projects.push(allProjects[3], allProjects[4]);

  // adding projects to each user's interested_projects array:
  user2.interested_projects.push(allProjects[3], allProjects[4]);
  user3.interested_projects.push(allProjects[0]);
  user4.interested_projects.push(
    allProjects[0],
    allProjects[1],
    allProjects[2]
  );

  // adding projects to each user's rejected_projects array:
  user2.rejected_projects.push(allProjects[2]);
  user3.rejected_projects.push(allProjects[3]);

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();

  console.log("Created users & projects!");
  console.log(user1)

  // tools 

  const tools = [
    {
      category: 'Engineering',
      icon: '/assets/icons/javascript.svg',
      name: 'JavaScript',
    },
    {
      category: 'Engineering',
      icon: '/assets/icons/react.svg',
      name: 'React',
    },
    {
      category: 'Engineering',
      icon: '/assets/icons/html.svg',
      name: 'HTML',
    },
    {
      category: 'Engineering',
      icon: '/assets/icons/css.png',
      name: 'CSS',
    },
    {
      category: 'Engineering',
      icon: '/assets/icons/rails.png',
      name: 'Rails',
    },
    {
      category: 'Engineering',
      icon: '/assets/icons/ruby.svg',
      name: 'Ruby',
    },
    {
      category: 'Design',
      icon: '/assets/icons/figma.svg',
      name: 'Figma',
    },
    
  ];
  await Tool.insertMany(tools);
  console.log('Created tools!')
  const allTools = await Tool.find()
  console.log(allTools)
  db.close();
};

insertData();
