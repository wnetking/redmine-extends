# Redmine Magic

Enhance your Redmine!

Feature:

- [x] Moving the layout of the task page (Issue).   
- [x] Photos and videos in a modal window without opening a new tab.   
- [x] Additional menu items in the header.   

## Install from store

[https://chrome.google.com/webstore/detail/redmine-magic/](https://chrome.google.com/webstore/detail/redmine-magic/gnemgcfjaiogjmjakeajjnjcdmalgcii)

## Manual install instructions

1. [Download zip](https://github.com/wnetking/redmine-extends/raw/master/magic.zip)
2. Unzip
3. Go to [chrome://extensions/](chrome://extensions/)
4. Click `Load unpacked`
5. Select folder with files from unzipped file

## Files

```
├── /src/                       # 
│   ├── /background/            # background service worker files
│   ├── /contentscript/         # contentscript files
│   ├── /extention/             # manifest, icons
│   ├── /inpage/                # inject inpage script
│   ├── /options/               # options page files
│   ├── /popup/                 # popup files
│   ├── /services/              # app services
│   ├── /sidepanel/             # sidepanel files
│   ├── /types/                 # JSDocs type aliases
│   ├── /utils/                 # 
```

## Contributions info

For contribution you can:

- Add feature request use template [New feature](https://github.com/wnetking/redmine-extends/issues/new?assignees=wnetking&labels=feature&projects=wnetking%2Fredmine-extends&template=feature-request.yaml&title=%5BNew+feature%5D%3A+)
- Make pull request with new feature and description

### Extention data flow

![https://www.freecodecamp.org/news/content/images/2021/02/flowchart.png](https://www.freecodecamp.org/news/content/images/2021/02/flowchart.png)
