# Environment Setup
## Jekyll
Ref: https://jekyllrb.com/docs/installation/macos/

The below environment setup is for MacOS.

Use `chruby` because of its simplicity.
```
$ brew install chruby ruby-install xz

# Install latest version of Ruby, supported by Jekyll
$ ruby-install ruby 3.1.3

$ echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
$ echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
$ echo "chruby ruby-3.1.3" >> ~/.zshrc # run 'chruby' to see actual version

$ gem install jekyll

$ gem install jekyll bundler
```

# Edit Site
To create a new post:
1. Create a folder with `YYYY-MM-dd` format in `assets/images` and drop the images into that directory.
2. Create a new `.md` file in `_posts` with format `YYYY-MM-dd-photos.md`, where the `YYYY-MM-dd` matches that in step 1.
3. With the file created in step 2, use the below, replacing `<TITLE>` and `<SUBTITLE>` as well as the `YYYY-MM-dd` from step 1.:
```
---
layout: gallery
title: "<TITLE>"
subtitle: "<SUBTITLE>"
date: YYYY-MM-dd
categories: gallery
---
```

# Building and Deploying Site
The build and deploy process is performed via a GitHub action workflow. Because of 3rd party plugin(s) utilizations, a custom workflow must be written. This includes changing the source to "GitHub Actions" at https://github.com/eychung/eychung.github.io/settings/pages.

# Preview Site
```
$ bundle exec jekyll serve
```

# Plugins
## JavaScript
### PhotoSwipe
https://photoswipe.com/

PhotoSwipe is a JavaScript image gallery and lightbox.

## Jekyll
### jekyll-thumbnail-img
https://github.com/abpaudel/jekyll-thumbnail-img

jekyll-thumbnail-img is a Jekyll plugin to generate image thumbnails with specified width.
