#!/bin/sh

#set -e doesn't work.... how to log pls

echo "Hello " | $USER
echo "This is your go-to installation script for everything you want to install!"
echo "You are currently running on " | uname -a
read -p "Would you like to install optional software? (VSCode, Guake) [Y/n] " response2
read -p "Are you ready to start? [Y/n] " response

#The if statment if you want to continue or not.
case $response in [yY][eE][sS]|[yY]|[jJ]|'') 

    echo
    res1=$(date +%s.%N)
    echo "Started on: " | date
    echo
    #Lets Start!
    echo "LETS GOOOOOO"
    #This if statement is for optional software.
    case $response2 in [yY][eE][sS]|[yY]|[jJ]|'') 
        sudo add-apt-repository -y ppa:ubuntu-desktop/ubuntu-make
        sudo apt-get -y update
        sudo apt-get -y install ubuntu-make

        sudo umake ide visual-studio-code
        sudo apt-get install -y quake
        ;;
        *) #Else
        ;;
    esac
    ############### Real install starts here ################## 
    sudo apt-get install -y git
    ############### Ends Here ########################
    #We're Finished!
    echo
    res2=$(date +%s.%N)
    echo "Finished on: " | date
    #This is all to calculate and display time in a pretty way :)
    dt=$(echo "$res2 - $res1" | bc)
    dd=$(echo "$dt/86400" | bc)
    dt2=$(echo "$dt-86400*$dd" | bc)
    dh=$(echo "$dt2/3600" | bc)
    dt3=$(echo "$dt2-3600*$dh" | bc)
    dm=$(echo "$dt3/60" | bc)
    ds=$(echo "$dt3-60*$dm" | bc)

    printf "Total runtime: %d:%02d:%02d:%02.4f\n" $dd $dh $dm $ds
    ;;
    *) #ELSE
    echo
    echo "Opperation terminated... Goodbye :'( "
    echo
    ;;
esac