# GitBranchBoard
Simple express js application to show the git branch for each jenkins job.
The jenkins jobs should contain a build step to execute something like this: 
`echo "${branches}" > currentBranch` or `echo "develop" > currentBranch` (if you not using build variables)