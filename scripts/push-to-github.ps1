<#
  Helper script to push this repo to GitHub.
  Run this after installing Git for Windows and configuring your GitHub credentials.

  Usage: Open PowerShell as your user, then:
    cd C:\Users\alnaj\Desktop\FixFinder.no
    .\scripts\push-to-github.ps1
#>

Write-Host "Checking for git..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "git not found. Install Git for Windows: https://git-scm.com/download/win" -ForegroundColor Yellow
  exit 1
}

Write-Host "Initializing repo and pushing to https://github.com/Abdaln1/FixFinder.git" -ForegroundColor Cyan
git init
git remote remove origin 2>$null
git remote add origin https://github.com/Abdaln1/FixFinder.git
git branch -M main
git add .
if ((git status --porcelain) -ne $null) {
  Write-Host "Committing changes..."
  git commit -m "Initial commit - FixFinder MVP" || Write-Host "No changes to commit"
}

Write-Host "Pushing to GitHub (you may be asked for credentials)..."
git push -u origin main

Write-Host "If the push succeeded, go to: https://github.com/Abdaln1/FixFinder" -ForegroundColor Green
