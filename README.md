This project is meant to help me practice creating binary search trees, particularly balanced ones.


    *1 (install it if images are referenced directly in HTML file) npm install --save-dev html-loader*
    *2 (once git push origin main has been run once):
        git branch gh-pages
        --don't forget to switch source branch to this in github pages*
    *3 (to run ESLint on any file or directory): npx eslint yourfile.js*
    *4 (to run Prettier on everything): npx prettier . --write
        (to run it on a certain directory): prettier --write app/
        (to run it on a certain file): prettier --write app/components/Button.js
        (to run it on tests): prettier --write "app/**/*.test.js"
    *5 (ensure everyone is using Pretter; if setup is CI; avoids merge conflicts/other collab issues):
        npx prettier . --check
    *6 (run to automatically run tests upon file saves): npm run watch
    *7 (change file names in eslint.config.js to match test files)
