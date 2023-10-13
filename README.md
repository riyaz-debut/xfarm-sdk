# xfarm-sdk

***Run following command one by one to setup the network***

***In xfarm machine***

  *** Clone the hyperledger repo :-

  

Then

  ****Inside xfarm machine go to***

  

  

  

  

>  **/hyperledger-xfarm folder**

  

  

  

  

using command

  

  

  

  

`cd hyperledger-xfarm`

  

  

  

  

and then move to scripts folder with command :-**

  

  

  

  

`cd scripts`

  

  

  

  

***Note :- Now every command will be run from this scripts folder.***

  

  

  

  

## Fabric CA

  

  

  

***In xfarm machine***

  

  

run

  

  

  

`./scratch/generate-msp.sh re-generate`

  

  

  

  

***(Note use this to re-generate network certs). This will clear the old certs.***

  

  

  

  

This will create fabric ca, register and enroll peers, users etc and created MSP, organizations folder will be created after running this command. (hlf-volume/hyperledger/organizations)

  

  

  

  

## Create ccp connection files

  

  

  

***In xfarm machine***

  

run

  

  

  

`./scratch/ccp-generate.sh`

  

  

  

  

This will create connection files for respective organizations in organization/peerOrganizations/{org_name}.xfarm.com where {org_name} is name of organization

  

  

  

  

***Note:- This file will be used for running explorer,SDK.***

  

  

  

  

## Generate Genesis block and channel tx

  

  

  

***In xfarm machine***

  

  

  

  

Run the following comand in xfarm machine

  

  

  

  

`./scratch/genesis.sh`

  

  

  

  

*** This will create genesis block and channel tx file

  

  

  

  

***Note:- system-genesis-file folder will be created (hyperledger-xfarm/system-genesis-file ) in xfarm Machine***

  ***Deploy the network containers for orgs. of xfarm:-***

  

  

  

*  **In xfarm machine***

  

  

  

  

*This is for xfarm organizations and orderer (org1,org2 and orderer)*

  

  

  

  

**From xfarm instance run the followings :-**

  

  

  

  

`./start-org.sh orderer`

  

  

  

  

`./start-org.sh org1`

  

  

  

  

`./start-org.sh org2`

  

  

  


## Create channel

  

  

  

***In xfarm machine***

  

  

  

  

**Create channel on xfarm machine**

  

  

  

  

  

` ./scratch/create-channel.sh`

  

  

  

  


  

## Join channel in xfarm

  

  

  

***In xfarm machine***

  

  

  

  

Now join peers of org1 and org2 to already created channel and also set and update anchor peers for organizations.

  

  

  

  

From scripts folders run below given commands

  

  

  

  

**If already in scripts folder then run :-**

  

  

  

  

`./scratch/join-channel-org.sh org1`

  

  

  

  

`./scratch/join-channel-org.sh org2`

  

## Install chaincode on xfarm Organizations

  

  

  

***In xfarm machine***

  

  

  

  

*** This will deploy the chaincode on org1 and org2 organizations of xfarm machine.

  

  

  

  

**org1**

  

  

  

***Install chaincode for org1 by following command:-***

  

  

  

  

`./chaincode/install-chaincode.sh org1 xfarm-cc ../xfarm-cc 1.0 1`

  

  

  

  

**Parameters here are :-**

  

  

  

**org1** is name of organization (1st parameter)

  

  

  

  

**xfarm-cc** is name of chaincode (2nd parameter)

  

  

  

  

**. . /xfarm-cc** is path of chaincode (3rd parameter) where chaincode is located.

  

  

  

  

**1.0** is the version of chaincode (4th parameter)

  

  

  

  

**1** is the sequence of chaincode (5th parameter)

  

  

  

  

**org2**

  

  

  

**Install chaincode for org2 by following command:-**

  

  

  

  

`./chaincode/install-chaincode.sh org2 xfarm-cc ../xfarm-cc 1.0 1`

  

  

  

  

*****Parameters here are :-**

  **org1** is name of organization (1st parameter)

  

  

  

  

**xfarm-cc** is name of chaincode (2nd parameter)

  

  

  

  

**. . /xfarm-cc** is path of chaincode (3rd parameter) where chaincode is located.

  

  

  

  

**1.0** is the version of chaincode (4th parameter)

  

  

  

  

**1** is the sequence of chaincode (5th parameter)

  

  

  



  

  

  

  


## Commit chaincode

  

  

  

***In xfarm machine***

  

  

  

  

** This will commit the chaincode after every organization in network has approved the chaincode.

  

  

  

  

**In xfarm machine from scripts folder run command:-**

  

  

  

`./chaincode/commit-chaincode.sh org1 xfarm-cc 1.0 1`

  

  

  

  

*****Parameters here are :-**

  

  

  

  

**org1** is name of organization (1st parameter)

  

  

  

  

**xfarm-cc** is name of chaincode (2nd parameter)

  

  

  

  

**1.0** is the version of chaincode (3rd parameter)

  

  

  

  

**1** is the sequence number of chaincode (5th parameter)

  
 
## Setup SDK

  

  

  

***In xfarm machine***

  

  

  

This will be used to interact with installed chaincode on network. It provides apis to submit transactions to ledger or query contents of ledger.

  

  

  

  

*****Clone the Xfarm-SDK repo at home**

  

  

  

***in xfarm machine***

  

  

  

  

***NOTE:- Add custom port 3000 in security groups in xfarm Instance***

  

  

  

  

*****First move to sdk root folder**

  

  

  

  

`cd Xfarm-SDK`

  

  

  

  

**From Xfarm-SDK root folder and run command inside terminal :-**

  

  

  

  

`./sdk-start.sh`

  

  

  

  

***NOTE:-Import xfarm postman collection from /Xfarm-SDK/XFarm Operations On Server.postman_collection into postman***

  

  

  

  

If you want to **run sdk on local** , run following commands :-

  

  

  

  

***Move to the path where app.js file is located and open terminal there

  

  

  

  

`npm install`

  

  

  

  

This will install all node packages and dependencies required to run node sdk application.

  

  

  

  

run the sdk app through command :-

  

  

  

  

`npm start`

  ## RESTART DOCKER CONTAINERS AUTOMATICALLY IN CASE OF RESTARTING MACHINE

  

**If you want all running docker containers to restart automatically in case of machine restart , do the followings :-

After setting up the whole network , installing chaincode, setting up sdk run the following command on xfarm machine :-**

  

(Before running this command all required containers should be in running state).

  

`docker update --restart unless-stopped $(docker ps -q)`

  

**Note:-** Run this command as last step on machine so that machine restart's, docker containers starts automatically.


## BELOW ARE THE INSTRUCTIONS TO BE FOLLOWED IN CASE OF MACHINE RESTART

  

  
**RESTART DOCKER CONTAINERS ON RESTARTING MACHINE (Only in case docker containers do not start automatically)**


  

**Run following commands to restart the containers:-**

  

`docker start $(docker ps -aq)`

  

**To check now whether docker containers are running or not , run following command :- **

`docker ps -a`

  

**If it will display all containers status as Up then containers are running well and ,

if status is exited then container is in not running state

  
  

***ENDS HERE

  
  
  
  

