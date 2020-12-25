---
title: "Truly Integrated Development Environment"
date: 2019-05-05T00:00:00+01:00
draft: true
description: What does it take to create a development environment?
tags: [webdev, discuss, productivity, docker]
discuss:
  devto: truly-integrated-development-environment-1ogg
---

When people say IDE most of the time they mean just glorified text editor, sometimes with the debugger, sometimes with autocompletion. In my opinion, the text editor is not enough to qualify as a development environment. As well we will need:
- a compiler (or interpreter, or transpiler, etc)
- an automation tool (`make` or similar)
- a package manager (`bundler`, `yarn`, `cargo` or similar)
- probably a version switcher (`rbenv`, `nvm`, `rustup` or similar)
- a [language server](https://langserver.org/) for more intelligent autocompletion (`solargraph`, `typescript`, `flow`, `gocode` or similar)
- a linter or a type checker (`rubocop`, `eslint` or similar)
- a formatter (`prettier`, `gofmt` or similar)
- maybe a shell (`bash`, `zsh` or similar) and git

## Solution

Recently I found a potential solution for a truly integrated development environment: Docker + "cloud IDE" (in-browser IDE). We can pack all tools in Docker container and some "cloud" IDE and configure all tools to work together, then you would use one command to run Docker container and fully working editor will be available in the browser.

I wasn't the first one to come up with this idea, so there are some options:

[Theia](https://www.theia-ide.org/):

```sh
docker run -it -p 3000:3000 -v "$(pwd):/home/project:cached" theiaide/theia
```

[Coder](https://coder.com/):

```sh
docker run -it -p 127.0.0.1:8443:8443 -v "${PWD}:/home/coder/project" codercom/code-server --allow-http --no-auth
```

[Eclipse Che](https://www.eclipse.org/che/docs/che-6/quick-start.html):

```sh
docker run -ti -v /var/run/docker.sock:/var/run/docker.sock -v /local/path:/data eclipse/che start
```

What would you expect from IDE? What it should provide out of the box?
