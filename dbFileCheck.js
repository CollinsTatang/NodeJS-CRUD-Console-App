import fs from "fs";
import { exit } from "process";

export default async function dbFileCheck() {
    if(!fs.existsSync("db.json")){
    console.log("file does not exist")
    exit(1);
}

}
