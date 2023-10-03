# ConvertToH265 
Program that converts videos or video streams to the h265 encoding format using FFmpeg.

## Requirements
[Install FFmpeg](https://www.ffmpeg.org/download.html)

## Usage

## how to retrieve a m3u8 stream in the browser
Go to your video page, F12 key (or right-click > inspector) > network > search m3u8
![firefoxm3u8](https://raw.githubusercontent.com/tempetflamer/Assets/main/ConvertToH265/flux_video_firefox-min.jpg) ![chromem3u8](https://raw.githubusercontent.com/tempetflamer/Assets/main/ConvertToH265/flux_video_chrome-min.jpg)
As you can see from the two images above, the type is different, on chrome, the video will be found in xhr, while on firefox, it will be found in both xhr and media.

## Why this license
Because FFmpeg is licensed under the GNU Lesser General Public License (LGPL) version 2.1 or later. However, FFmpeg incorporates several optional parts and optimizations that are covered by the GNU General Public License (GPL) version 2 or later. If those parts get used the GPL applies to all of FFmpeg. 