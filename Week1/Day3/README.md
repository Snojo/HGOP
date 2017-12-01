# Setting up AWS
## How far I got
On day 3 I got to the point where I could create and delete an instance. I could push all my scripts to it and locally run my docker image. I had some hickups in my script that meant that I couldn't deploy automatically. I can now though, and the provision directory is the updated one. 

Run create-new-aws-docker-host-instance, then deploy-on-instance and you can delete the instance by running destroy-instance.

The url is: http://ec2-18-217-134-66.us-east-2.compute.amazonaws.com/

## Setting up Amazon Web Service.
http://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html

Root Account: snorri13
PW: in manager

IAM account: Admin
PW: In Manager

AWS Access Key: 539209897567

IAM user sign in link: https://539209897567.signin.aws.amazon.com/console 

The .pem key is created and stored automatically in the ec2_instance directory when that is created.
use the ./connect.sh command to connect to your current instance.

To install AWSCLI
'''
$ pip install awscli --upgrade --user
'''




