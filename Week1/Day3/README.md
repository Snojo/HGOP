# Setting up AWS

## Setting up Amazon Web Service.
http://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html

Root Account: snorri13
PW: in manager

IAM account: Admin
PW: In Manager

AWS Access Key: 539209897567

IAM user sign in link: https://539209897567.signin.aws.amazon.com/console 

The PrivateKey is kept in .ssh under the name HGOP.pem
To connect to your Linux instance from a computer running Mac or Linux, specify the .pem file to your SSH client with the -i option and the path to your private key. 

To install AWSCLI
'''
$ pip install awscli --upgrade --user
'''

Connecting to ip through ssh is in connect.sh script.
EC2 instance ip; 18.216.226.42


