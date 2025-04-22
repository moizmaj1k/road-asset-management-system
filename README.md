# Road Asset Management System - Git Workflow

## 1. Pull the Latest Changes from `main`
Before starting work on a new feature or bugfix, ensure your local `main` branch is up to date.

```bash
git checkout main          # Switch to the main branch
git pull origin main       # Pull the latest changes from the remote main branch
```

## 2. Create a New Feature Branch
Once you're on the latest version of `main`, create a new branch for your work. Use descriptive names for the branches:

- **Feature branch**: `feature/login-system`
- **Bugfix branch**: `bugfix/login-issue`

```bash
git checkout -b feature/your-feature-name    # Create and switch to a new branch
```

## 3. Work on the Feature
Now, you can start working on your feature or bugfix. Regularly stage and commit your changes:

```bash
git add .                          # Stage all changed files
git commit -m "Your commit message"  # Commit your changes
```

## 4. Sync with `main` Branch Regularly
To keep your feature branch up to date and avoid merge conflicts, pull changes from `main` into your feature branch periodically:

```bash
git checkout main                  # Switch to the main branch
git pull origin main               # Fetch the latest changes from remote
git checkout feature/your-feature-name   # Switch back to your feature branch
git merge main                     # Merge the latest changes from main into your feature branch
```

## 5. Resolve Conflicts if Any
If there are any conflicts, Git will mark the conflicted files. Open the files and resolve the conflicts manually. After resolving, stage and commit the resolved files:

```bash
git add <resolved-file>  # Stage the resolved files
git commit               # Commit the resolution
```

## 6. Push Your Feature Branch
Once your work is complete, push your feature branch to the remote repository:

```bash
git push origin feature/your-feature-name   # Push your feature branch to the remote repository
```

## 7. Create a Pull Request (PR) on GitHub
Go to GitHub and open your repository. You'll see an option to create a pull request for your pushed branch.

- Go to the **Pull Requests** tab.
- Click **New Pull Request**.
- Select your `feature/your-feature-name` branch as the **source** branch and `main` as the **target** branch.
- Add a description of your changes.
- Create the pull request (PR).

## 8. Code Review and Merge
Once the PR is ready, the team will review your code. If everything looks good, the PR can be merged into `main`.

- If you have write access, you can merge the PR yourself.
- If not, the repository owner or someone with write access will merge the PR.

Once the PR is merged, **delete your feature branch** from GitHub to keep the repository clean:

```bash
git push origin --delete feature/your-feature-name  # Delete the feature branch remotely
```

## 9. Pull the Latest Changes from `main` Again
After merging the PR, ensure your local `main` branch is up to date by pulling the latest changes:

```bash
git checkout main       # Switch to the main branch
git pull origin main    # Pull the latest changes after merging the PR
```

---

## Summary of Commands:

### 1. **Pull the latest changes**:
```bash
git checkout main
git pull origin main
```

### 2. **Create a new feature branch**:
```bash
git checkout -b feature/your-feature-name
```

### 3. **Commit and push changes**:
```bash
git add .
git commit -m "Your commit message"
git push origin feature/your-feature-name
```

### 4. **Update your branch with the latest main changes**:
```bash
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main
```

### 5. **Create a pull request on GitHub**.

### 6. **Merge the PR and delete your feature branch**:
```bash
git push origin --delete feature/your-feature-name
```

---