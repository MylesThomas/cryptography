# Cryptography

## Project Setup

Open VSCode terminal or a command prompt in Windows.

Setup the local project directory:

```sh
mkdir cryptography
cd cryptography
```

Head to github.com and create a new repository named cryptography.

After completing that, create a new repository on the command line:

```sh
echo "# cryptography" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/MylesThomas/cryptography.git
git push -u origin main
```

Save this markdown file into cryptography as `instructions.md`, then open up a new VSCode instance and Open folder > cryptography.

Save this file and update git before beginning the project:

```sh
cd cryptography
git status
git add .
git commit -m "Completed project setup"
git push -u origin main
git status
git log --oneline
q
```