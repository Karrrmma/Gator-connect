In this file, write all the credentials needed to access to your application. For example, your app and database credentials.
This information will be used by your CTO and leads to have access some components of your app. 

In addition, you should provide short tutorials to teach people how to access to all the 
components of your application. For instance, if you created a MySQL instance, you must provide 
a short description of how to use the credentials provided here to access to your database instance via ssh or 
using MySQLWorkbench. 

Points will be deducted if teams do not add their credentials here once they have chosen their 
technology stack or if their step-by-step descriptions are not clear enough. You have been warned! 




## Important Credentials:

|             Item               |                            Credentials                              |
|            :---:               |                               :---:                                 |
|          Website URL           |             https://testing.dibp09spwik8y.amplifyapp.com/           | 
|          SSH URL               |             ec2-100-26-46-76.compute-1.amazonaws.com                | 
|          SSH Username          |             ec2-user                                                | 
|          SSH Password/Key      |             california.pem                                       | 
|          Database URL          |             gatorconnect.czw66eimcldr.us-east-1.rds.amazonaws.com   | 
|          Database Username     |             thream                                                  | 
|          Database Password     |             Jose*ortiz3                                             | 





## To connect to the Server via SSH
  1. Download the `california.pem` in the directory
  2. Change the permission via `chmod 400 "california.pem`
  3. Use `ssh -i "california.pem" ec2-user@ec2-100-26-46-76.compute-1.amazonaws.com` as a command in the shell

## To connect to the Database via MySQL Workbench
  1. Setup new connection.
  2. Set Hostname to Database URL (gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com)
  3. Leave Port as default.
  4. Set username to the database username (thream), click Store in Vault and input the database password (Jose*ortiz3)
  5. Hit OK then open.

