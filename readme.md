# Empty blueprint starter with eslint setup
This is an empty project template with initial setup for better coding using vscode and eslint.  
Also can use as a starter for existing code to refactor  
The code in *index.js* is a node script to read data from a CSV file and load it into a DynamoDB table using **AWS SDK for JavaScript v3 (SDK v3)** 
# Usage
you can use this code in different ways:
1. [Use the script file along with the downloades basic blueprint](#usescript) to create new project with eslint setup
2. Follow the general steps in the readme file in order to refactor new code

## 🛠️ General Setup
```sh
mkdir try
cd try
npm init -y

```



 ## GIT - [optional]
  add git support
 ```sh
git init
add .githooks dir
inside .githooks dir add two files
pre-commit
pre-push
add .gitignore
```

## ESLint 
use ESLint to To check syntax, find problems, and enforce code style
```sh
npm init @eslint/config
OR
npx eslint --init
```


### [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
>Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.  

- npm install --save-dev eslint-plugin-prettier
- npm install --save-dev --save-exact prettier
- npm install --save-dev eslint-config-prettier
- add to .eslintrc.json
```JS
{
  "extends": ["plugin:prettier/recommended"]
}
```
Add **rules** in .eslintrc.  
Add **.prettierrc** with your code style,
for example
```JS
{
    "singleQuote": true,
    "semi": true,
    "arrowParens":"avoid",
    "printWidth": 140,
    "trailingComma": "none"
}
```
### vscode setup
Add Code Actions on Save in vscode  
click **cmd+shift+p** -> open preference setting json and add
```JSON
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
 }
```
> **finaly** add eslint extention on vscode

### check for vulnerabilities and update all

```
$ npm audit fix --force
```
### Update All Node Packages to Latest
- Install the tool npm install -g npm-check-updates
- Verify that your package.json is checked in to version control (the next command will overwrite the package.json)
- Update the package.json ncu --upgrade
- Validate the changes to your package.json
- Install the new packages npm install

>😊 happy coding

<a name="usescript"></a>
# USE setup_blueprint.sh Script
To make the script available from anywhere on your Mac, you can follow these steps:

First download the blueprint project  
you can clone it from https://github.com/odedas/empty-blueprint.git  
Update the **$SOURCE_DIR** in the script to the cloned directory  
Move the Script to a Directory in Your PATH: The simplest way is to move the script to a directory that's already in your **PATH**, such as **/usr/local/bin**.

```sh
mv /path/to/setup_blueprint.sh /usr/local/bin/setup_blueprint
```
Ensure the Script is Executable: If you haven't already, make sure the script is executable:

```sh
chmod +x /usr/local/bin/setup_blueprint
```
Open a New Terminal Window or Source Your Profile: For the changes to take effect in any currently open terminal windows, you might need to either open a new terminal window or source your profile:

```sh
source ~/.bash_profile  # For bash users
```
OR

```sh
source ~/.zshrc         # For zsh users (default in newer versions of macOS)
```
After doing this, you should be able to run the script from anywhere by simply typing 
```sh
setup_blueprint #name and path to your project
```






