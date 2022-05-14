# Corsica

A simple Reddit API wrapper for Javascript.

This is a JavaScript library specifically made for [arctic](https://github.com/pilcrowOnPaper/arctic) Reddit client. It aims to make interacting with the API easier, as well as making the fetched data easier to work with. Since this library was specifically made for a single purpose, a lot of features are missing for it to be used as a general-use library (use [snoowrap](https://github.com/not-an-aardvark/snoowrap) instead). 

### How is it different from other wrappers?

Well, first here's an example:

```ts
const corsica = new Corsica()
// get a post with id = un038h, and sort the comments by 'new'
const { data, error } = corsica.post('un038h').get({ sort: 'new' })
```
It's pretty simple and bare, but it returns something useful rather than Reddit API's mess:

```ts
// data.post.data
{
  author: {
    name: "-TheRightTree-",
    id: "",
  },
  id: "ebdsce",
  submission_flair: {
    has: true,
    text_color: "dark",
    text: "Feedback",
    background_color: "",
  },
  title: "Happy Fox! - I would've Never Thought I could ever Draw this a Few Months ago",
  score: 1866,
  vote: 0,
  saved: false,
  nsfw: false,
  spoiler: false,
  subreddit: {
    name: "learnart",
    id: "2s6fc",
  },
  created: 1576494428,
  upvote_ratio: 0.99,
  content: {
    type: "image",
    media: [{
      url: "https://i.redd.it/mjqer2ts9z441.png",
      height: 3840,
      width: 3840,
    }],
  },
}
```
Now you can actually tell if the media is an image, a video, or an emebed media.

You can also do simple actions like upvoting and saving posts:
```ts
const { data, error } = corsica.post('un038h').upvote(1)
const { data, error } = corsica.post('un038h').save()
```

## Installation

```
npm i corsica-reddit
```

## Documentation

Coming soon

## Contributing

Well, thank you for considering! I have 0 experience in open-source and managing packages, so any help will be appreciated!
