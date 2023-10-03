---
title: "Tauri instead of Puppeteer or Playwright?"
date: 2023-10-03T13:14:09+02:00
draft: false
tags: [tauri, rust, cli, webdev]
---

Tauri and Puppeteer/Playwright have different use cases. So it seems nothing to compare. But there is (at least) one use case where you may try to use Tuari instead of a headless browser - "snapshots". For example:

- [react-snap](https://github.com/stereobooster/react-snap) - HTML snapshot, uses Puppeteer
- [mermaid-cli](https://github.com/mermaid-js/mermaid-cli) - SVG/image snapshot, uses Puppeteer
- [cytosnap](https://github.com/cytoscape/cytosnap) - image snapshot, uses Puppeteer

**Why?** Because Tauri uses provided by OS browser and produces small binaries (let's say ~10 MB). While Puppeteer and Playwright need a full browser (let's say ~200 MB). And Tauri probably can be faster.

## Experiment

Let's see if this will work in practice. For an experiment, I decided to recreate `cytosnap` with Tauri. Functionality is trivial:

- read input from file or STDIN ([Elements JSON](https://js.cytoscape.org/#notation/elements-json))
- generate a graph with the help of Cytoscape.js
- write result (image from canvas) to file or STDOUT
- and this is supposed to be CLI, not GUI-app

### CLI

CLI applications are not a typical use case for Tauri, but it is possible.

Hide window (`tauri.conf.json`):

```
"windows": [{ "visible": false, ...
```

Hide icon from Dock bar (Mac OS only):

```rust
#[cfg(target_os = "macos")]
use tauri::ActivationPolicy;

tauri::Builder::default()
	.setup(|app| {
		#[cfg(target_os = "macos")]
		app.set_activation_policy(ActivationPolicy::Accessory);
		Ok(())
	})
```

Add CLI arguments  (`tauri.conf.json`):

```
 "cli": {
      "description": "Render graphs on the server side with Cytoscape.js, getting image file as output",
      "args": [
        {
          "name": "source",
          "short": "s",
          "takesValue": true,
          "multiple": false,
          "multipleOccurrences": false
        },
        {
          "name": "destination",
          "short": "d",
          "takesValue": true,
          "multiple": false,
          "multipleOccurrences": false
        }
      ],
    },
```

### Overcome security fences

Because Tauri's main use case is GUI, they care about security and limit what files/folders the application can access. Which doesn't work for the way people use CLI. So I had to write my own Tauri commands to write and read files, for example:

```rust
#[tauri::command]
fn write_destination(dst: String, res: String) -> Result<String, String> {
    if dst == "" {
        print!("{}", res);
        Ok(String::from("ok"))
    } else {
        let bytes = base64::engine::general_purpose::STANDARD.decode(res);
        let path = absolute_path(PathBuf::from(dst)).unwrap();
        match bytes {
            std::result::Result::Ok(v) => {
                std::fs::write(path, v).unwrap();
                Ok(String::from("ok"))
            }
            std::result::Result::Err(e) => Err(e.to_string()),
        }
    }
}
```

**Note**: I need to pass binary data from the front end to the rust, so I use Base64.

### Distribution

Initially, I wanted to distribute this CLI as [binary inside the npm package](content/posts/distributing-executable-binaries-in-npm/index.md). But then I realized that [Tauri can't really produce portable binaries](https://github.com/tauri-apps/tauri/discussions/3048). Tauri relies on the OS's browser - which is a neat trick to shrink down the size of the binary, but this is what makes it less portable. Trade-offs as always.

Not to stop an experiment I decided to distribute at least binary for Mac OS in npm. And it works (Mac OS only):

```
npx @stereobooster/cyto-snap -s g2.json -d g2.png
```

### Size of the npm package

```
npm notice package size:  2.9 MB
npm notice unpacked size: 7.4 MB
```

I didn't do any Tauri optimizations, so it probably can be smaller. Also, this is Mac OS-only binary, it will be bigger if we pack binaries for all platforms in one npm package.

And it has 0 dependencies.

### Source code

**Warning**: because this is an experiment, I didn't try to make it perfect. Just made it work. 

Source code: https://github.com/stereobooster/cyto-snap

## Next steps

### Homebrew

The idea of distributing binary in npm failed, so I think to try to distribute it via Homebrew. Homebrew works on Mac OS, Windows (WSL 2), and Linux (though they have their own package managers).

- Produce standard desktop installers for Tauri (`tauri-apps/tauri-action`)
- Upload installers to GitHub releases
- Run installers in silent mode with the Homebrew formula

### Full automation with GitHub Actions

It has a lot of steps to produce the final package. I started automation but didn't finish it. Ideally, it should:

- Build application
- Run tests (I do integration tests with [odiff](https://github.com/dmtrKovalenko/odiff))
- Create a tag and push it
- Create release and upload all binaries
- Update the Homebrew formula and publish it
- Publish the npm package (but it is not very useful without portable binaries)

## Conclusion

- This approach may work with Homebrew distribution
	- It is sad that you can't publish binaries to npm, which would make JS-developer use other means to install it (Homebrew, apt-get, cURL, etc)
	- On the other hand, it is fully independent of npm (and Node.js ecosystem in general), so can be used by none-JS developers
- This was my first time using Tauri, and it is awesome
