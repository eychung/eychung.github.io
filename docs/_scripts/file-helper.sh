#!/bin/bash

# Example usage:
#   - bash _scripts/file-helper.sh thumbnail --cleanup
#   - bash _scripts/file-helper.sh thumbnail --process

IMG_DIR="assets/images"

show_usage() {
    echo -e "Usage:\tfile-helper.sh thumbnails [ --cleanup | --process ]"
    echo -e "\tfile-helper.sh --help"
}

# Remove all JPG files within the thumbnail directories.
cleanup_thumbnails() {
    if [ -d "$IMG_DIR" ]; then
        find "$IMG_DIR" -type f -path "*/thumbnails/*.jpg" | while read file; do
            if [ -f "$file" ]; then
                echo "Removing file: $file"
                rm $file
            fi
        done
    else
        echo "No path: assets/images"
    fi

}

# Replace existing JPG files within the thumbnail directories with progressive JPG
# using magick tool. Do not re-run without first running cleanup_thumbnails.
process_thumbnails() {
    if ! command -v magick >/dev/null 2>&1; then
        echo "Processing requires 'magick' program, which is not detected on system"
        exit 1
    elif [ -d "$IMG_DIR" ]; then
        find "$IMG_DIR" -type f -path "*/thumbnails/*.jpg" | while read file; do
            if [ -f "$file" ]; then
                echo "Replacing with progressive JPG file: $file"
                magick $file -interlace Plane $file
            fi
        done
    else
        echo "No path: assets/images"
    fi
}

if [ $(basename "$PWD") != "docs" ]; then
    echo "Please run from root work dir 'docs'"
    exit 0
fi

if [ $# -eq 0 ]; then
    echo "No arguments provided."
    show_usage
    exit 1
fi

if [ "$1" == "--help" ]; then
    show_usage
    exit 0
fi

if [ "$1" == "thumbnails" ] && [ -z "$2" ]; then
  echo "Usage: $0 thumbnails [ --cleanup | --process ]"
  exit 1
fi

case "$1" in
    thumbnails)
        case "$2" in
            --cleanup)
                cleanup_thumbnails
                ;;
            --process)
                process_thumbnails
                ;;
            *)
                echo "Invalid command: $2"
                show_usage
                exit 1
                ;;
        esac
        ;;
    *)
        echo "Invalid command: $1"
        show_usage
        exit 1
        ;;
esac
