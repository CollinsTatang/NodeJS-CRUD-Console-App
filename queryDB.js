import fs from "fs";
import { exit } from "process";

export default async function queryDB(externalFunction) {
    try{
        let info = [];

        if(fs.existsSync("db.json")){
            await fs.readFile("db.json", function(error, data){
                if(error){
                    console.log("Reading file failed", error);
                    return;
                }

                info = JSON.parse(data.toString());
                console.log(info);
                if(externalFunction && !error){
                    externalFunction(info)
                    return;
                }
            })
        } else {
            if (externalFunction) {
                externalFunction(info);
                return;
            }
        }

    } catch (error) {
        console.log("Something went wrong");
    }

}

queryDB()