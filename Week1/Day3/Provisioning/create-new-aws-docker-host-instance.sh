#!/bin/sh

INSTANCE_DIR="ec2_instance"
SECURITY_GROUP_NAME=$1
if [ -d "${INSTANCE_DIR}" ]; then
    exit
fi

[ -d "${INSTANCE_DIR}" ] || mkdir ${INSTANCE_DIR}

echo "Turns out we need a way into the machine after we create it... who knew?"
aws ec2 create-key-pair --key-name ${SECURITY_GROUP_NAME} --query 'KeyMaterial' --output text > ${INSTANCE_DIR}/${SECURITY_GROUP_NAME}.pem
chmod 400 ${INSTANCE_DIR}/${SECURITY_GROUP_NAME}.pem
SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name ${SECURITY_GROUP_NAME} --description "security group for dev environment in EC2" --query "GroupId"  --output=text)
echo ${SECURITY_GROUP_ID} > ./ec2_instance/security-group-id.txt
echo ${SECURITY_GROUP_NAME} > ./ec2_instance/security-group-name.txt
MY_PUBLIC_IP=$(curl http://checkip.amazonaws.com)
echo "Security group has been created"

MY_CIDR=${MY_PUBLIC_IP}/32
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 80 --cidr ${MY_CIDR}
aws ec2 authorize-security-group-ingress --group-name ${SECURITY_GROUP_NAME} --protocol tcp --port 22 --cidr ${MY_CIDR}

echo "security group autorized"
INSTANCE_ID=$(aws ec2 run-instances --user-data file://ec2-instance-init.sh --image-id ami-15e9c770 --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${SECURITY_GROUP_NAME} --query 'Instances[0].InstanceId'  --output=text)
echo ${INSTANCE_ID} > ./ec2_instance/instance-id.txt
aws ec2 wait --region eu-west-1 instance-running --instance-ids ${INSTANCE_ID}
export INSTANCE_PUBLIC_NAME=$(aws ec2 describe-instances --instance-ids ${INSTANCE_ID} --query "Reservations[*].Instances[*].PublicDnsName" --output=text)
echo ${INSTANCE_PUBLIC_NAME} > ./ec2_instance/instance-public-name.txt

sh ./update-running-containers.sh
