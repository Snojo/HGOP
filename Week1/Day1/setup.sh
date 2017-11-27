#!/bin/sh

#set -e

echo "Hello " | $USER
echo "This is your go-to installation script for everything you want to install!"
echo "You are currently running on " | uname -a
read -p "Would you like to install everything, including Visual Studio Code? [Y/n] " response2
read -p "Are you ready to start? [Y/n] " response


case $response in [yY][eE][sS]|[yY]|[jJ]|'') 

    echo
    res1=$(date +%s.%N)
    echo "Started on: " | date
    echo
    #Lets Start!
    echo "LETS GOOOOOO"
    case $response2 in [yY][eE][sS]|[yY]|[jJ]|'') 
        sudo add-apt-repository -y ppa:ubuntu-desktop/ubuntu-make
        sudo apt-get -y update
        sudo apt-get -y install ubuntu-make

        sudo umake ide visual-studio-code
        ;;
        *)
        ;;
    esac
    sudo apt-get install -y git
    #We're Finished!
    echo
    res2=$(date +%s.%N)
    echo "Finished on: " | date
    #This is all to calculate time. using the
    dt=$(echo "$res2 - $res1" | bc)
    dd=$(echo "$dt/86400" | bc)
    dt2=$(echo "$dt-86400*$dd" | bc)
    dh=$(echo "$dt2/3600" | bc)
    dt3=$(echo "$dt2-3600*$dh" | bc)
    dm=$(echo "$dt3/60" | bc)
    ds=$(echo "$dt3-60*$dm" | bc)

    printf "Total runtime: %d:%02d:%02d:%02.4f\n" $dd $dh $dm $ds
    ;;
    *)
    echo
    echo "Opperation terminated... Goodbye :'( "
    echo
    ;;
esac