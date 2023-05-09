import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";
import { error } from "console";

export default async function addData(info) {
    try {
      const answer = await inquirer.prompt([
            { type: "input", name: "name", massage: "Please Enter Your name" },
            { type: "number", name: "phone", massage: "Please Enter Your phone" },
            { 
              type: "list",
              name: "age", 
              massage: "Please are you an adult", 
              choices: [
                {name: "Y", value: "Adult"},
                {name: "N", value: "Minor"}
              ],
            },
        ]);

        const data = {
            id: uuidv4(),
           Name: answer.name,
           Phone: answer.phone,
           Age: answer.age
        };

        info.push(data);

        if (fs.existsSync("db.json file created successfully")) {
            addDetails(info);
        } else {
            fs.appendFile("db.json", "[]", function(error) {
                if (error) {
                    console.log("Create file unsuccessful", error);
                }
                console.log("db.json file created successfully");
                addDetails(info);
            });
        }

    } catch (error) {
        console.log("Something went wrong", error);
    }
}

async function addDetails(info) {
    await fs.writeFile("db.json", JSON.stringify(info), function(error){
        if (error) {
            console.log("Error Writing To The Database", error);
            return;
        }
        console.log("Data Add Successful");
    });
}

queryDB(addData);