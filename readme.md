# ConvertToH265 
Program that converts videos or video streams to the h265 encoding format using FFmpeg.

## Requirements
[Install FFmpeg](https://www.ffmpeg.org/download.html)

## Usage

## Choose encoding quality (CRF)
The CRF for Constant Rate Factor affects the video quality. The value varies between 0 and 51, where 0 is no quality loss, when 51 is the worst possible quality loss.
For x265, 28 is default quality, when x264 is 23.
At present, the program does not use the preset option to determine compression efficiency. Default is medium.

more infos :
[Encode H.265](https://trac.ffmpeg.org/wiki/Encode/H.265)
[Encode H.264](https://trac.ffmpeg.org/wiki/Encode/H.264)


## how to retrieve a m3u8 stream in the browser
Go to your video page, F12 key (or right-click > inspector) > network > search m3u8
![firefoxm3u8](https://raw.githubusercontent.com/tempetflamer/Assets/main/ConvertToH265/flux_video_firefox-min.jpg) ![chromem3u8](https://raw.githubusercontent.com/tempetflamer/Assets/main/ConvertToH265/flux_video_chrome-min.jpg)
As you can see from the two images above, the type is different, on chrome, the video will be found in xhr, while on firefox, it will be found in both xhr and media.

## Why this license
Because FFmpeg is licensed under the GNU Lesser General Public License (LGPL) version 2.1 or later. However, FFmpeg incorporates several optional parts and optimizations that are covered by the GNU General Public License (GPL) version 2 or later. If those parts get used the GPL applies to all of FFmpeg. 