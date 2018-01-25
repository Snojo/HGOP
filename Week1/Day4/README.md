# Day4

## Link
http://ec2-18-217-134-66.eu-west-2.compute.amazonaws.com/

## Postgres
I got postgres up and running, but my javascript isn't the best and it's not working correctly. I can insert into the database and I can Select from it, but for some reason I can't return it and display it. My curl commands just hang and yeah... don't know what's going on.
I definitely connect to postgres and I recieve confirmation that my POST works (even if the curl hangs).
The pagecounter app works though, so that's something.

In order to connect Postgres I had to start with adding it to my docker-compose and dockerfile. 
In the database.js I create a connection string using the identification I gave in the docker-compose.

I use the tag of the current commit as a tag for docker so every docker file is correctly tagged with the corresponding git commit. I send this to the instance via the .env file so that this instance can pull the correct docker image. 

## Extra Scripts
I made a few extra scripts to make my life easier.
- pushToDocker.sh allows me to push the current commit to docker.
- connect.sh allows me to connect to the current AWS instance.

Scripting is the ultimate lazy tool. I love it! 
Like a wise man said. 

## Notes
I really enjoy this class. I just wanted to say that. 
It touches my inner System Admin and I feel like a god when I'm making these scripts and they actually work.
The first week handin isn't perfect. Mostly due to my poor javascript coding skills. I hope you can forgive that.
Also, I still have no idea how to properly create logs from a script (Day 1)... The internet has failed me completely.

