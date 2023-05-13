import fs from "fs";
import { exit } from "process";

//Check if db.json file exist (The datastore file)
export default async function dbFileCheck() {
    if(!fs.existsSync("db.json")){
    console.log("File Dose not Exist");
    exit(1);
}

}
