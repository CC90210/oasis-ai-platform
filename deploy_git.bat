@echo off
echo Checking git status... > git_debug.log
git status >> git_debug.log 2>&1
echo. >> git_debug.log
echo Adding files... >> git_debug.log
git add . >> git_debug.log 2>&1
echo. >> git_debug.log
echo Committing... >> git_debug.log
git commit -m "Update portal design system and fix styling" >> git_debug.log 2>&1
echo. >> git_debug.log
echo Pushing... >> git_debug.log
git push origin main >> git_debug.log 2>&1
echo Done. >> git_debug.log
