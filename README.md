# road-asset-management-system

Workflow Steps:
1. Always Start by Pulling the Latest Changes from main
Before you start working on a new feature or bugfix, always ensure you have the latest code from the main branch.

bash
Copy
git checkout main      # Switch to the main branch
git pull origin main    # Pull the latest changes from the remote main branch
2. Create a New Feature Branch
Once you are on the latest version of main, create a new branch for the feature or bugfix you're working on. It’s important to name your branch clearly based on the feature or issue it addresses.

For example:

Feature branch: feature/login-system

Bugfix branch: bugfix/login-issue

bash
Copy
git checkout -b feature/your-feature-name    # Create and switch to a new branch
3. Work on the Feature
Now you can work on your code in this isolated feature branch. As you make changes, don’t forget to regularly stage and commit your changes:

bash
Copy
git add .                          # Stage all changed files
git commit -m "Your commit message"  # Commit your changes
Make sure your commit messages are clear and descriptive.

4. Sync with main Branch Regularly
If other team members are working on different features, there might be changes in main while you're working on your branch. To avoid merge conflicts, you should periodically update your feature branch with the latest changes from main.

bash
Copy
git checkout main        # Switch to the main branch
git pull origin main     # Fetch the latest changes from remote
git checkout feature/your-feature-name   # Switch back to your feature branch
git merge main           # Merge the latest changes from main into your feature branch
5. Resolve Conflicts if Any
If there are any conflicts during the merge, Git will mark the conflicted files. Open those files, resolve the conflicts manually, then stage the resolved files:

bash
Copy
git add <resolved-file>  # Stage the resolved files
git commit               # Commit the resolution
6. Push Your Feature Branch
Once you've completed your work on the feature branch, it’s time to push it to the remote repository.

bash
Copy
git push origin feature/your-feature-name   # Push your feature branch to the remote repository
7. Create a Pull Request (PR) on GitHub
Go to GitHub and open your repository. You'll see an option to create a pull request for the branch you've pushed. Follow these steps:

Go to the "Pull Requests" tab.

Click "New Pull Request".

Select your feature/your-feature-name branch as the source branch and main as the target branch.

Add a description of the changes you made.

Create the pull request (PR).

8. Code Review and Merge
Once your pull request is ready, the team can review your code. If everything looks good, the pull request can be merged into main.

If you have write access, you can merge the PR yourself.

If you don’t have write access, the repository owner or someone with write access will merge the PR for you.

Once the PR is merged, delete your feature branch from GitHub to keep the repository clean.

bash
Copy
git push origin --delete feature/your-feature-name  # Delete the feature branch remotely
9. Pull the Latest Changes from main Again
After the merge, it's always good to ensure you have the latest code in your main branch.

bash
Copy
git checkout main       # Switch to the main branch
git pull origin main    # Pull the latest changes after merging the PR
Summary of Commands:
Pull the latest changes:

bash
Copy
git checkout main
git pull origin main
Create a new feature branch:

bash
Copy
git checkout -b feature/your-feature-name
Commit and push changes:

bash
Copy
git add .
git commit -m "Your commit message"
git push origin feature/your-feature-name
Update your branch with the latest main changes:

bash
Copy
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main
Create a pull request on GitHub.

Merge the PR and delete your feature branch on GitHub.