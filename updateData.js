import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "recordID",
      message: "Enter Record ID",
    },
  ]);

  let user;

    info.forEach((element) => {
      if (element.id === answers.recordID) {
        user = element;

        updateDetails(user, info);
      }
    });

  try {
    
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

async function updateDetails(user, info) {
    try {
        const feedbacks = await inquirer.prompt([
            {
              type: "input",
              default: user.Name,
              name: "name",
              message: "What's your name?",
            },
            {
              type: "number",
              default: user.Phone,
              name: "phone",
              message: "What's your phone?",
            },
            {
              type: "list",
              default: user.Age,
              name: "age",
              message: "Are an adult?",
              choices: [
                { name: "Y", value: "Adult" },
                { name: "N", value: "Minor" },
              ],
            },
          ]);
          user.Name = feedbacks.name;
          user.Phone = feedbacks.phone;
          user.Age = feedbacks.age;

        await fs.writeFile("db.json", JSON.stringify(info), function (err) {
            if (err) {
              console.log(err);
            }
            console.log("updated");
          });
      
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  }

  queryDB(updateData)