from apiclient.discovery import build
import json

DEVELOPER_KEY = "[GET FROM GOOGLE API CONSOLE--YOUTUBE DATA API]"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

nextPageToken = None
maxResults = 50
pages = 5 # `maxResults` number of results each page 

youtube = build(
    YOUTUBE_API_SERVICE_NAME, 
    YOUTUBE_API_VERSION, 
    developerKey=DEVELOPER_KEY
)

for i in range(pages):
    print(i)
    
    channels = youtube.search().list(
        part="snippet",
        order="viewCount",
        type="channel",
        fields="nextPageToken,items(snippet(channelId,channelTitle,description,publishTime))",
        maxResults=maxResults,
        pageToken=nextPageToken,
        regionCode='GB'
    ).execute()    
    nextPageToken = channels['nextPageToken']

    channelIds = [channel['snippet']['channelId'] for channel in channels['items']]
    
    channelsStats = youtube.channels().list(
        part="topicDetails,statistics",
        id=','.join(channelIds),
        maxResults=maxResults+1
    ).execute()

    with open('channels/page_' + str(i) + '.json', 'w') as outfile:
        json.dump(list(zip(channels['items'], channelsStats['items'])), outfile)
